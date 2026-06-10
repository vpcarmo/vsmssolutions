import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, listPublishedPosts } from "@/lib/posts.functions";
import { formatPostDate, type Post } from "@/lib/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const [post, all] = await Promise.all([
      getPostBySlug({ data: { slug: params.slug } }),
      listPublishedPosts(),
    ]);
    if (!post) throw notFound();
    const related = all.filter((p) => p.slug !== post.slug).slice(0, 2);
    return { post, related };
  },
  head: ({ params, loaderData }) => {
    const post = loaderData?.post;
    const title = post ? `${post.seoTitle ?? post.title} — VSMS Blog` : "Post — VSMS Blog";
    const desc = post?.seoDescription ?? post?.excerpt ?? "Artigo do blog da VSMS Solutions.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: post?.title ?? "Blog VSMS" },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://vsms.com.br/blog/${params.slug}` },
        ...(post?.coverImageUrl
          ? [{ property: "og:image", content: post.coverImageUrl }]
          : []),
      ],
      links: [{ rel: "canonical", href: `https://vsms.com.br/blog/${params.slug}` }],

      scripts: post
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title,
                description: post.excerpt,
                datePublished: post.publishedAt,
                author: { "@type": "Organization", name: "VSMS Solutions" },
                publisher: {
                  "@type": "Organization",
                  name: "VSMS Solutions",
                  url: "https://vsms.com.br",
                },
                mainEntityOfPage: `https://vsms.com.br/blog/${params.slug}`,
                ...(post.coverImageUrl ? { image: post.coverImageUrl } : {}),
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Início", item: "https://vsms.com.br/" },
                  { "@type": "ListItem", position: 2, name: "Blog", item: "https://vsms.com.br/blog" },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: post.title,
                    item: `https://vsms.com.br/blog/${params.slug}`,
                  },
                ],
              }),
            },
          ]
        : [],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl font-bold">Post não encontrado</h1>
      <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> Voltar ao blog
      </Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl font-bold">Erro ao carregar o post</h1>
      <button onClick={reset} className="mt-6 rounded-md bg-gradient-brand px-4 py-2 text-sm text-brand-foreground">
        Tentar novamente
      </button>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post, related } = Route.useLoaderData() as { post: Post; related: Post[] };

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Blog
      </Link>

      <header className="mt-8">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="font-medium text-primary">{post.tag}</span>
          <span>•</span>
          <span>{formatPostDate(post.publishedAt)}</span>
          <span>•</span>
          <span>{post.readingTime} de leitura</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
      </header>

      <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-muted-foreground">
        {post.content.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {related.length > 0 && (
        <aside className="mt-20 border-t border-border pt-10">
          <h2 className="text-lg font-semibold">Continue lendo</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="rounded-xl border border-border bg-card p-5 hover:border-primary/40"
              >
                <span className="text-xs font-medium text-primary">{p.tag}</span>
                <div className="mt-1 font-semibold">{p.title}</div>
              </Link>
            ))}
          </div>
        </aside>
      )}
    </article>
  );
}

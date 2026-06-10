import { createFileRoute, Link } from "@tanstack/react-router";
import { listPublishedPosts } from "@/lib/posts.functions";
import { formatPostDate, type Post } from "@/lib/posts";

export const Route = createFileRoute("/blog")({
  loader: () => listPublishedPosts(),
  head: () => ({
    meta: [
      { title: "Blog — VSMS Solutions" },
      { name: "description", content: "Artigos sobre tecnologia, IA, SaaS, automação e transformação digital." },
      { property: "og:title", content: "Blog — VSMS Solutions" },
      { property: "og:description", content: "Conteúdo de tecnologia que vai além do hype." },
      { property: "og:url", content: "https://vsms.com.br/blog" },
    ],
    links: [{ rel: "canonical", href: "https://vsms.com.br/blog" }],
  }),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Erro ao carregar o blog</h1>
      <button onClick={reset} className="mt-6 rounded-md bg-gradient-brand px-4 py-2 text-sm text-brand-foreground">
        Tentar novamente
      </button>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Página não encontrada</h1>
    </div>
  ),
  component: Blog,
});

function Blog() {
  const posts = Route.useLoaderData() as Post[];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-32 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-sm font-medium text-primary">Blog</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">
            Ideias que <span className="text-gradient">movem tecnologia</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Conteúdo prático sobre IA, SaaS, automação e produto digital.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">Nenhum post publicado ainda.</p>
        ) : (
          <div className="grid gap-6">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 md:flex-row md:items-center md:gap-8"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-medium text-primary">{p.tag}</span>
                    <span>•</span>
                    <span>{formatPostDate(p.publishedAt)}</span>
                    <span>•</span>
                    <span>{p.readingTime} de leitura</span>
                  </div>
                  <h2 className="mt-2 text-xl font-semibold group-hover:text-gradient">{p.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

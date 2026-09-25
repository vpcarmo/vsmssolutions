import { createFileRoute, Link } from "@tanstack/react-router";
import { Boxes, ArrowRight, Sparkles } from "lucide-react";
import { listPublicProducts } from "@/lib/site/site.functions";

export const Route = createFileRoute("/produtos")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["public-products"],
      queryFn: () => listPublicProducts(),
      staleTime: 60_000,
    }),
  head: () => ({
    meta: [
      { title: "Produtos — Ecossistema VSMS Solutions" },
      { name: "description", content: "Conheça o ecossistema de produtos VSMS: SaaS próprios, plataformas digitais e soluções de IA." },
      { property: "og:title", content: "Ecossistema VSMS — Produtos digitais e SaaS" },
      { property: "og:description", content: "Produtos próprios, SaaS e soluções de IA criadas e operadas pela VSMS." },
      { property: "og:url", content: "https://vsms.com.br/produtos" },
    ],
    links: [{ rel: "canonical", href: "https://vsms.com.br/produtos" }],
  }),
  component: Produtos,
});

function Produtos() {
  const products = Route.useLoaderData();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-32 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Ecossistema VSMS
          </span>
          <h1 className="mt-4 text-4xl font-bold md:text-6xl">
            Produtos que <span className="text-gradient">criamos e operamos</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Cada produto do ecossistema VSMS é construído com tecnologia própria, mantido por nosso time e pensado para evoluir junto com seus usuários.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        {products.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">Nenhum produto disponível no momento.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <article key={p.id} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-brand opacity-10 blur-2xl transition-opacity group-hover:opacity-30" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground shadow-glow">
                      <Boxes className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                        {p.type == "ai_app" ? "ia_app" : p.type}
                      </span>
                   {/*  <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                      {p.status == "active" ? "ativo" : "inativo"}
                    </span> */}
                  </div>
                 {/*  <p className="mt-5 text-xs font-medium text-primary uppercase">{p.type == "ai_app" ? "ia_app" : p.type}</p> */}
                  <h2 className="mt-3 text-xl font-semibold">{p.name}</h2>
                  {p.description && <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>}
                  {p.primary_domain && (
                    <a href={`https://${p.primary_domain}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                      Acessar {p.primary_domain} <ArrowRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 text-center md:p-14">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative">
            <h2 className="text-2xl font-bold md:text-3xl">Quer adotar um produto VSMS na sua empresa?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Oferecemos consultoria, implantação e integrações para acelerar a adoção das nossas plataformas.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contato" className="inline-flex items-center gap-2 rounded-md bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground">
                Falar com a equipe <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

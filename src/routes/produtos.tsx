import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Produtos — VSMS Solutions" },
      { name: "description", content: "Conheça os produtos digitais da VSMS Solutions: Personal Virtual, SuperOfertas e novos SaaS em desenvolvimento." },
      { property: "og:title", content: "Produtos — VSMS Solutions" },
      { property: "og:description", content: "Produtos digitais que aceleram pessoas e empresas." },
      { property: "og:url", content: "/produtos" },
    ],
    links: [{ rel: "canonical", href: "/produtos" }],
  }),
  component: Produtos,
});

const products = [
  {
    name: "Personal Virtual",
    category: "Fitness & Bem-estar",
    status: "Disponível",
    desc: "Plataforma de treinos personalizados com acompanhamento inteligente para alunos e profissionais.",
    link: "#",
  },
  {
    name: "SuperOfertas",
    category: "E-commerce",
    status: "Disponível",
    desc: "Agregador de ofertas em tempo real com curadoria inteligente e alertas personalizados.",
    link: "#",
  },
  {
    name: "Novo SaaS",
    category: "Em breve",
    status: "Em desenvolvimento",
    desc: "Estamos preparando novidades — em breve mais detalhes sobre nosso próximo produto.",
    link: "#",
  },
];

function Produtos() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-32 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-sm font-medium text-primary">Produtos</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">
            Nossos <span className="text-gradient">produtos digitais</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Produtos próprios que nascem da nossa experiência com clientes —
            feitos para escalar.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.name}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-brand opacity-10 blur-2xl transition-opacity group-hover:opacity-25" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary">{p.category}</span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                      p.status === "Disponível"
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-semibold">{p.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <a
                  href={p.link}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Saiba mais <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

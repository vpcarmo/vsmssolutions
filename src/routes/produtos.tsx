import { createFileRoute, Link } from "@tanstack/react-router";
import { Dumbbell, ShoppingBag, Plus, ArrowRight, Sparkles, Cpu, Rocket, Layers } from "lucide-react";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Produtos — Ecossistema VSMS Solutions" },
      { name: "description", content: "Conheça o ecossistema VSMS: Personal Virtual, SuperOfertas e novos SaaS em desenvolvimento. Produtos digitais e plataformas de IA." },
      { property: "og:title", content: "Ecossistema VSMS — Produtos digitais e SaaS" },
      { property: "og:description", content: "Produtos próprios, SaaS e soluções de IA criadas e operadas pela VSMS." },
      { property: "og:url", content: "https://vsms.com.br/produtos" },
    ],
    links: [{ rel: "canonical", href: "https://vsms.com.br/produtos" }],
  }),
  component: Produtos,
});

const products = [
  {
    icon: Dumbbell,
    name: "Personal Virtual",
    category: "Fitness & Bem-estar",
    status: "Disponível",
    desc: "Plataforma de treinos personalizados com acompanhamento inteligente para alunos e profissionais de educação física. Programação semanal, biblioteca de exercícios e progressão automatizada.",
    highlights: ["Treinos personalizados", "Acompanhamento de alunos", "App responsivo"],
  },
  {
    icon: ShoppingBag,
    name: "SuperOfertas",
    category: "E-commerce & IA",
    status: "Disponível",
    desc: "Agregador de ofertas em tempo real com curadoria inteligente e alertas personalizados. IA que aprende o perfil de consumo e prioriza promoções relevantes.",
    highlights: ["Curadoria com IA", "Alertas em tempo real", "Multi-canal"],
  },
  {
    icon: Plus,
    name: "Novos produtos",
    category: "Em desenvolvimento",
    status: "Em breve",
    desc: "Estamos construindo novos SaaS e soluções de IA para diferentes verticais — produtividade, saúde, educação e mais. O ecossistema VSMS está em expansão contínua.",
    highlights: ["SaaS verticais", "Ferramentas de IA", "Roadmap ativo"],
  },
];

const pillars = [
  { icon: Cpu, title: "Tecnologia própria", desc: "Stack desenvolvida internamente, com IA embarcada em todos os produtos." },
  { icon: Rocket, title: "Escalável por design", desc: "Arquitetura cloud-native pronta para crescer sem reescrever o produto." },
  { icon: Layers, title: "Ecossistema integrado", desc: "Produtos que se conversam, compartilham identidade e evoluem juntos." },
];

function Produtos() {
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
            Cada produto do ecossistema VSMS é construído com tecnologia
            própria, mantido por nosso time e pensado para evoluir junto
            com seus usuários.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map(({ icon: Icon, ...p }) => (
            <article
              key={p.name}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-brand opacity-10 blur-2xl transition-opacity group-hover:opacity-30" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground shadow-glow">
                    <Icon className="h-5 w-5" />
                  </div>
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
                <p className="mt-5 text-xs font-medium text-primary">{p.category}</p>
                <h2 className="mt-1 text-xl font-semibold">{p.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary">Como construímos</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Pilares do <span className="text-gradient">ecossistema VSMS</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 text-center md:p-14">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative">
            <h2 className="text-2xl font-bold md:text-3xl">
              Quer adotar um produto VSMS na sua empresa?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Oferecemos consultoria, implantação e integrações para acelerar
              a adoção das nossas plataformas.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contato" className="inline-flex items-center gap-2 rounded-md bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground">
                Falar com a equipe <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/servicos" className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-5 py-3 text-sm font-medium hover:bg-surface">
                Ver serviços de apoio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

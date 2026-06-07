import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfólio — VSMS Solutions" },
      { name: "description", content: "Cases e projetos entregues pela VSMS Solutions em diferentes setores." },
      { property: "og:title", content: "Portfólio — VSMS Solutions" },
      { property: "og:description", content: "Projetos e cases de tecnologia entregues pela VSMS." },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: Portfolio,
});

const cases = [
  { title: "Clínica Digital", tag: "Saúde", desc: "Plataforma de prontuário eletrônico e agendamento online para rede de clínicas." },
  { title: "Marketplace B2B", tag: "E-commerce", desc: "Marketplace de fornecedores industriais com integrações ERP e logística." },
  { title: "Copilot Jurídico", tag: "IA", desc: "Assistente baseado em IA para análise de contratos e jurisprudência." },
  { title: "App de Treinos", tag: "Fitness", desc: "Aplicativo de treinos personalizados com acompanhamento de evolução." },
  { title: "Automação Fiscal", tag: "Automação", desc: "Robôs de emissão fiscal integrados com sistemas legados." },
  { title: "Portal Educacional", tag: "EdTech", desc: "Portal de cursos com trilhas adaptativas e certificação automática." },
];

function Portfolio() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-32 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-sm font-medium text-primary">Portfólio</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">
            Projetos que <span className="text-gradient">geram resultado</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Uma seleção de cases reais entregues em diferentes segmentos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-brand">
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  {c.tag}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-lg font-semibold group-hover:text-gradient">{c.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

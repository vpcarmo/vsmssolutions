import { createFileRoute, Link } from "@tanstack/react-router";
import { Code2, Building2, Cloud, Bot, Workflow, Lightbulb, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — VSMS Solutions" },
      { name: "description", content: "Desenvolvimento web, sistemas empresariais, SaaS, IA, automação e consultoria tecnológica." },
      { property: "og:title", content: "Serviços — VSMS Solutions" },
      { property: "og:description", content: "Web, sistemas, SaaS, IA, automação e consultoria." },
      { property: "og:url", content: "/servicos" },
    ],
    links: [{ rel: "canonical", href: "/servicos" }],
  }),
  component: Servicos,
});

const categories = [
  {
    icon: Code2,
    title: "Desenvolvimento Web",
    desc: "Sites institucionais, portais, landing pages e aplicações web modernas com foco em performance e SEO.",
    items: ["Landing pages de alta conversão", "Sites institucionais", "Portais de conteúdo", "E-commerce"],
  },
  {
    icon: Building2,
    title: "Sistemas Empresariais",
    desc: "ERPs, CRMs e plataformas internas que organizam processos e dão visibilidade ao negócio.",
    items: ["Dashboards executivos", "Gestão interna", "Integrações com legado", "Multi-tenant"],
  },
  {
    icon: Cloud,
    title: "SaaS",
    desc: "Produtos digitais escaláveis, do MVP ao crescimento. Infraestrutura, billing, autenticação e produto.",
    items: ["MVPs validados", "Arquitetura multi-tenant", "Billing e assinaturas", "Onboarding inteligente"],
  },
  {
    icon: Bot,
    title: "Inteligência Artificial",
    desc: "Agentes, copilots e integrações com LLMs aplicadas ao negócio — não hype.",
    items: ["Chatbots inteligentes", "RAG sobre dados próprios", "Automação com IA", "Visão computacional"],
  },
  {
    icon: Workflow,
    title: "Automação",
    desc: "Robôs, integrações entre sistemas e workflows que eliminam trabalho repetitivo.",
    items: ["Integrações via API", "RPA", "Workflows n8n / Make", "ETL sob medida"],
  },
  {
    icon: Lightbulb,
    title: "Consultoria",
    desc: "Apoio estratégico em decisões técnicas, arquitetura e roadmap de produto.",
    items: ["Auditoria de código", "Plano de transformação digital", "Mentoria de squads", "Discovery de produto"],
  },
];

function Servicos() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-32 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-sm font-medium text-primary">Serviços</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">
            Soluções completas para <span className="text-gradient">cada etapa</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Do MVP ao produto em escala — passando por automação, IA e
            consultoria estratégica.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ icon: Icon, title, desc, items }) => (
            <article key={title} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-surface p-10 text-center md:p-14">
          <h2 className="text-2xl font-bold md:text-3xl">
            Não encontrou o que procura?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Trabalhamos sob demanda. Conte sua necessidade e desenhamos uma
            solução específica.
          </p>
          <Link to="/contato" className="mt-6 inline-flex items-center gap-2 rounded-md bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground">
            Falar com um especialista <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

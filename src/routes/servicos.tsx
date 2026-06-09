import { createFileRoute, Link } from "@tanstack/react-router";
import { PlugZap, Layers, Bot, LifeBuoy, Lightbulb, Workflow, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços de apoio — VSMS Solutions" },
      { name: "description", content: "Consultoria, implantação, integrações, customizações com IA e suporte especializado para os produtos do ecossistema VSMS." },
      { property: "og:title", content: "Serviços de apoio — VSMS Solutions" },
      { property: "og:description", content: "Consultoria, implantação, integrações e suporte para as plataformas VSMS." },
      { property: "og:url", content: "https://vsms.com.br/servicos" },
    ],
    links: [{ rel: "canonical", href: "https://vsms.com.br/servicos" }],
  }),
  component: Servicos,
});

const categories = [
  {
    icon: Lightbulb,
    title: "Consultoria estratégica",
    desc: "Apoiamos a escolha do produto certo do ecossistema VSMS para o seu desafio, com diagnóstico e plano de adoção.",
    items: ["Diagnóstico inicial", "Plano de adoção", "Roadmap de produto", "Mentoria contínua"],
  },
  {
    icon: PlugZap,
    title: "Implantação de plataformas",
    desc: "Cuidamos da configuração, parametrização e onboarding das equipes nas nossas plataformas SaaS.",
    items: ["Setup completo", "Migração de dados", "Treinamento de times", "Go-live assistido"],
  },
  {
    icon: Layers,
    title: "Integrações",
    desc: "Conectamos os produtos VSMS ao seu ecossistema — ERPs, CRMs, gateways de pagamento e ferramentas internas.",
    items: ["APIs e webhooks", "ERP / CRM", "Pagamentos", "Single Sign-On"],
  },
  {
    icon: Bot,
    title: "Customizações com IA",
    desc: "Adaptamos nossos módulos de IA — agentes, automações e fluxos — ao contexto do seu negócio.",
    items: ["Agentes personalizados", "RAG sobre seus dados", "Automação de processos", "Fine-tuning de fluxos"],
  },
  {
    icon: Workflow,
    title: "Automações sob medida",
    desc: "Workflows e integrações que conectam nossos produtos a rotinas e sistemas específicos.",
    items: ["Workflows internos", "Robôs de dados", "ETL pontual", "Relatórios automáticos"],
  },
  {
    icon: LifeBuoy,
    title: "Suporte especializado",
    desc: "SLAs, acompanhamento técnico e evolução contínua das plataformas em produção.",
    items: ["SLA dedicado", "Monitoramento", "Evolução de features", "Canal direto com o time"],
  },
];

function Servicos() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-32 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-sm font-medium text-primary">Serviços de apoio</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">
            Para extrair o máximo dos <span className="text-gradient">produtos VSMS</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Nossos serviços complementam o ecossistema VSMS — existem para
            acelerar a adoção, integração e evolução das nossas plataformas
            no seu negócio.
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
            O foco está nos <span className="text-gradient">produtos</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Comece conhecendo o ecossistema VSMS — depois desenhamos juntos
            o suporte que faz sentido para o seu contexto.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/produtos" className="inline-flex items-center gap-2 rounded-md bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground">
              Ver produtos <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contato" className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-5 py-3 text-sm font-medium hover:bg-surface">
              Falar com a equipe
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

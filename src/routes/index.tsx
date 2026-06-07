import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Code2,
  Cpu,
  Bot,
  Workflow,
  ShoppingBag,
  Stethoscope,
  Sparkles,
  Zap,
  Shield,
  Layers,
  Quote,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VSMS Solutions — Tecnologia que move o seu negócio" },
      {
        name: "description",
        content:
          "Desenvolvemos sistemas web, SaaS, inteligência artificial e automações sob medida para acelerar empresas, profissionais e ideias.",
      },
      { property: "og:title", content: "VSMS Solutions" },
      {
        property: "og:description",
        content:
          "Sistemas web, SaaS, IA e automação sob medida para empresas e profissionais.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const services = [
  { icon: Code2, title: "Desenvolvimento Web", desc: "Sites, portais e aplicações web rápidas, seguras e escaláveis." },
  { icon: Layers, title: "Sistemas & SaaS", desc: "Plataformas multi-tenant, dashboards e ERPs sob medida." },
  { icon: Bot, title: "Inteligência Artificial", desc: "Agentes, copilots e integrações com LLMs aplicados ao negócio." },
  { icon: Workflow, title: "Automação", desc: "Fluxos, integrações com APIs e robôs que eliminam trabalho repetitivo." },
  { icon: ShoppingBag, title: "E-commerce", desc: "Lojas e marketplaces com performance e foco em conversão." },
  { icon: Stethoscope, title: "Saúde & Bem-estar", desc: "Soluções para clínicas, profissionais de saúde e fitness." },
];

const stats = [
  { value: "50+", label: "Projetos entregues" },
  { value: "99.9%", label: "Uptime médio" },
  { value: "12+", label: "Stacks dominadas" },
  { value: "24/7", label: "Suporte dedicado" },
];

const tech = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL",
  "Supabase", "AWS", "Docker", "OpenAI", "Tailwind", "TanStack",
];

const testimonials = [
  {
    quote:
      "Entregaram em semanas o que outras empresas prometiam para meses. Time técnico excepcional.",
    name: "Carla M.",
    role: "CEO, HealthTech",
  },
  {
    quote:
      "A automação que construímos com a VSMS economiza horas todos os dias. ROI imediato.",
    name: "Rafael S.",
    role: "COO, Logística",
  },
  {
    quote:
      "Profissionais raros: entendem negócio e código. Recomendo de olhos fechados.",
    name: "Marina A.",
    role: "Product Lead",
  },
];

const featuredPosts = [
  { slug: "como-ia-transforma-pmes", title: "Como a IA está transformando PMEs brasileiras", date: "12 mar 2026", tag: "Inteligência Artificial" },
  { slug: "saas-do-zero", title: "Lançando um SaaS do zero: arquitetura e custos", date: "28 fev 2026", tag: "SaaS" },
  { slug: "automacao-que-paga-a-conta", title: "Automação que paga a conta: 5 cases reais", date: "10 fev 2026", tag: "Automação" },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 grid-bg" />

        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-28 md:pt-32 md:pb-36">
          <div className="mx-auto max-w-3xl text-center animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Tecnologia sob medida. Resultado real.
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Construímos o software{" "}
              <span className="text-gradient">que move o seu negócio</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              Sistemas web, SaaS, inteligência artificial e automação criados por
              quem entende de negócio e de código. Da ideia à produção.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Iniciar um projeto <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-5 py-3 text-sm font-medium backdrop-blur hover:bg-surface"
              >
                Ver serviços
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface/80 px-6 py-6 text-center backdrop-blur">
                <div className="font-display text-3xl font-bold text-gradient md:text-4xl">{s.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPOSTA DE VALOR */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-3">
          {[
            { icon: Zap, title: "Velocidade obsessiva", desc: "Entregas ágeis com qualidade de quem pensa em escala desde o dia 1." },
            { icon: Shield, title: "Segurança em primeiro lugar", desc: "Boas práticas, auditoria contínua e arquitetura preparada para crescer." },
            { icon: Cpu, title: "IA no DNA", desc: "Inteligência artificial aplicada de verdade, com foco em ROI." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur transition-all hover:border-primary/40 hover:bg-surface">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground shadow-glow">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVIÇOS */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary">O que fazemos</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Soluções completas, do <span className="text-gradient">conceito ao código</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Atendemos empresas e profissionais com tecnologia que entrega
              resultado — sem promessa vazia.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow"
              >
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link to="/servicos" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              Ver todos os serviços <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TECNOLOGIAS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <p className="text-sm font-medium text-primary">Stack moderna</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Tecnologias que dominamos</h2>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-surface/60 px-4 py-2 text-sm text-muted-foreground backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary">Quem confia</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Resultados que falam</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-card p-6">
                <Quote className="h-6 w-6 text-primary/70" />
                <blockquote className="mt-3 text-sm leading-relaxed">{t.quote}</blockquote>
                <figcaption className="mt-5 text-sm">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary">Conteúdo</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Blog em destaque</h2>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featuredPosts.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <span className="text-xs font-medium text-primary">{p.tag}</span>
              <h3 className="mt-2 text-lg font-semibold group-hover:text-gradient">{p.title}</h3>
              <p className="mt-4 text-xs text-muted-foreground">{p.date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 text-center md:p-16">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-30 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-bold md:text-4xl">
              Pronto para <span className="text-gradient">acelerar seu negócio?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Conte sua ideia. Em poucos dias retornamos com um plano objetivo
              e um orçamento transparente.
            </p>
            <Link
              to="/contato"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-gradient-brand px-6 py-3 text-sm font-medium text-brand-foreground shadow-glow"
            >
              Começar agora <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

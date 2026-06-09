import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Dumbbell,
  ShoppingBag,
  Sparkles,
  Boxes,
  Cpu,
  Rocket,
  Layers,
  Bot,
  Workflow,
  PlugZap,
  LifeBuoy,
  Quote,
  Plus,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VSMS Solutions — Produtos digitais, SaaS e IA" },
      {
        name: "description",
        content:
          "A VSMS Solutions cria e opera produtos digitais, plataformas SaaS e soluções de inteligência artificial para pessoas e empresas.",
      },
      { property: "og:title", content: "VSMS Solutions — Ecossistema de produtos digitais" },
      {
        property: "og:description",
        content:
          "Produtos próprios, SaaS e IA para escalar pessoas e empresas. Conheça o ecossistema VSMS.",
      },
      { property: "og:url", content: "https://vsms.com.br/" },
    ],
    links: [
      { rel: "canonical", href: "https://vsms.com.br/" },
      { rel: "preload", as: "image", href: heroBg, fetchpriority: "high" },
    ],
  }),

  component: Home,
});

const products = [
  {
    icon: Dumbbell,
    name: "Personal Virtual",
    tag: "Fitness & Bem-estar",
    status: "Disponível",
    desc: "Plataforma de treinos personalizados com acompanhamento inteligente para alunos e profissionais de educação física.",
  },
  {
    icon: ShoppingBag,
    name: "SuperOfertas",
    tag: "E-commerce & IA",
    status: "Disponível",
    desc: "Agregador de ofertas em tempo real com curadoria inteligente e alertas personalizados por perfil de consumo.",
  },
  {
    icon: Plus,
    name: "Novos produtos",
    tag: "Em desenvolvimento",
    status: "Em breve",
    desc: "Estamos construindo novos SaaS e ferramentas de IA. O ecossistema VSMS está em expansão contínua.",
  },
];

const pillars = [
  {
    icon: Boxes,
    title: "Produtos digitais próprios",
    desc: "Construímos e operamos nossas próprias plataformas — pensadas para escalar, não para entregar e sair.",
  },
  {
    icon: Cpu,
    title: "IA aplicada de verdade",
    desc: "Inteligência artificial embarcada nos nossos produtos para gerar valor real, não hype.",
  },
  {
    icon: Rocket,
    title: "SaaS escalável",
    desc: "Arquitetura multi-tenant, billing, segurança e performance desde o primeiro deploy.",
  },
];

const services = [
  { icon: PlugZap, title: "Consultoria & Estratégia", desc: "Apoio na adoção das nossas plataformas e em decisões de produto e tecnologia." },
  { icon: Layers, title: "Implantação & Integrações", desc: "Conectamos nossos SaaS ao seu ecossistema, ERPs e ferramentas internas." },
  { icon: Bot, title: "Customizações com IA", desc: "Agentes, automações e fluxos sob medida usando nossa stack de IA." },
  { icon: LifeBuoy, title: "Suporte especializado", desc: "Time dedicado para garantir continuidade, evolução e SLA dos seus produtos." },
];

const stats = [
  { value: "2+", label: "Produtos no ar" },
  { value: "99.9%", label: "Uptime das plataformas" },
  { value: "100%", label: "Cloud-native" },
  { value: "24/7", label: "Operação contínua" },
];

const testimonials = [
  {
    quote:
      "As plataformas da VSMS resolveram problemas reais do nosso dia a dia. Produto sério e bem cuidado.",
    name: "Carla M.",
    role: "Profissional de Educação Física",
  },
  {
    quote:
      "Usar os produtos da VSMS é como ter um time de tecnologia interno, sem o custo de manter um.",
    name: "Rafael S.",
    role: "Empreendedor digital",
  },
  {
    quote:
      "Empresa orientada a produto de verdade — pensa longo prazo, evolui rápido e ouve o usuário.",
    name: "Marina A.",
    role: "Early adopter",
  },
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
              Ecossistema VSMS — Produtos, SaaS e IA
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Produtos digitais que{" "}
              <span className="text-gradient">movem pessoas e empresas</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              Somos uma empresa de tecnologia orientada a produto. Criamos e
              operamos plataformas SaaS, soluções de inteligência artificial
              e ferramentas digitais próprias — feitas para durar e evoluir.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/produtos"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Explorar nossos produtos <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-5 py-3 text-sm font-medium backdrop-blur hover:bg-surface"
              >
                Falar com a VSMS
              </Link>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              SaaS próprios · IA aplicada · Operação contínua 24/7
            </p>
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

      {/* ECOSSISTEMA / NOSSAS SOLUÇÕES */}
      <section id="ecossistema" className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-primary">Ecossistema VSMS</p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                Nossas <span className="text-gradient">soluções em produto</span>
              </h2>
              <p className="mt-3 text-muted-foreground">
                Cada produto nasce de uma dor real, com tecnologia própria,
                operação contínua e roadmap de longo prazo.
              </p>
            </div>
            <Link to="/produtos" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              Ver todos os produtos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map(({ icon: Icon, name, tag, status, desc }) => (
              <article
                key={name}
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
                        status === "Disponível"
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-border bg-muted text-muted-foreground"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                  <p className="mt-5 text-xs font-medium text-primary">{tag}</p>
                  <h3 className="mt-1 text-xl font-semibold">{name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, desc }) => (
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

      {/* SERVIÇOS (apoio) */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary">Serviços de apoio</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Para potencializar <span className="text-gradient">o uso dos nossos produtos</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Nossos serviços existem para acelerar a adoção, integração e
              evolução das plataformas VSMS no seu negócio.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40"
              >
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link to="/servicos" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              Ver todos os serviços de apoio <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Quem usa</p>
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
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 text-center md:p-16">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-30 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-bold md:text-4xl">
              Pronto para entrar no <span className="text-gradient">ecossistema VSMS?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Conheça nossos produtos, descubra qual faz sentido para você ou
              sua empresa — e cresça com tecnologia que evolui todo dia.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/produtos"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-brand px-6 py-3 text-sm font-medium text-brand-foreground shadow-glow"
              >
                Explorar produtos <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-6 py-3 text-sm font-medium backdrop-blur hover:bg-surface"
              >
                Falar com a equipe
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

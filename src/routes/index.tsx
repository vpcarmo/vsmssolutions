import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Boxes,
  Layers,
  LifeBuoy,
  Lightbulb,
  PlugZap,
  Quote,
  Sparkles,
  Workflow,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { getPublicPage, listPublicProducts } from "@/lib/site/site.functions";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const [pageRow, products] = await Promise.all([
      context.queryClient.ensureQueryData({
        queryKey: ["page", "home"],
        queryFn: () => getPublicPage({ data: { slug: "home" } }),
        staleTime: 60_000,
      }),
      context.queryClient.ensureQueryData({
        queryKey: ["public-products"],
        queryFn: () => listPublicProducts(),
        staleTime: 60_000,
      }),
    ]);
    return { pageRow, products };
  },
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
        content: "Produtos próprios, SaaS e IA para escalar pessoas e empresas. Conheça o ecossistema VSMS.",
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

type CTA = { label: string; to: string; variant?: "primary" | "secondary" };
type Hero = { badge?: string; title?: string; title_highlight?: string; subtitle?: string; ctas?: CTA[]; foot?: string };
type Stat = { value: string; label: string };
type IconBlock = { icon?: string; title: string; desc: string };
type Testimonial = { quote: string; name: string; role: string };
type CtaBlock = { title?: string; title_highlight?: string; subtitle?: string; ctas?: CTA[] };
type HomeContent = {
  hero?: Hero;
  stats?: Stat[];
  pillars?: IconBlock[];
  services?: IconBlock[];
  testimonials?: Testimonial[];
  cta?: CtaBlock;
};

const dynamicIcons = {
  bot: Bot,
  layers: Layers,
  "life-buoy": LifeBuoy,
  lightbulb: Lightbulb,
  plug: PlugZap,
  workflow: Workflow,
} as const;

function Icon({ name, className }: { name?: string; className?: string }) {
  const I = (name && dynamicIcons[name as keyof typeof dynamicIcons]) || Boxes;
  return <I className={className} />;
}

function PublicHomeLink({
  to,
  className,
  children,
}: {
  to: string;
  className: string;
  children: React.ReactNode;
}) {
  if (to.startsWith("/") && !to.startsWith("//")) {
    return <Link to={to as never} className={className}>{children}</Link>;
  }
  return <a href={to} className={className}>{children}</a>;
}

function Home() {
  const { pageRow, products } = Route.useLoaderData();

  const content: HomeContent = (pageRow?.content as HomeContent) || {};
  const hero = content.hero ?? {};
  const stats = content.stats ?? [];
  const pillars = content.pillars ?? [];
  const services = content.services ?? [];
  const testimonials = content.testimonials ?? [];
  const finalCta = content.cta ?? {};

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src={heroBg} alt="" width={1920} height={1080} className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-28 md:pt-24 md:pb-36">
          <div className="mx-auto max-w-3xl text-center animate-fade-up">
            {hero.badge && (
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {hero.badge}
              </span>
            )}
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              {hero.title} {hero.title_highlight && <span className="text-gradient">{hero.title_highlight}</span>}
            </h1>
            {hero.subtitle && <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">{hero.subtitle}</p>}
            {hero.ctas && hero.ctas.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {hero.ctas.map((c) => (
                  <PublicHomeLink
                    key={c.label}
                    to={c.to}
                    className={
                      c.variant === "secondary"
                        ? "inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-5 py-3 text-sm font-medium backdrop-blur hover:bg-surface"
                        : "inline-flex items-center gap-2 rounded-md bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground shadow-glow transition-transform hover:-translate-y-0.5"
                    }
                  >
                    {c.label} {c.variant !== "secondary" && <ArrowRight className="h-4 w-4" />}
                  </PublicHomeLink>
                ))}
              </div>
            )}
            {hero.foot && <p className="mt-5 text-xs text-muted-foreground">{hero.foot}</p>}
          </div>

          {stats.length > 0 && (
            <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-surface/80 px-6 py-6 text-center backdrop-blur">
                  <div className="font-display text-3xl font-bold text-gradient md:text-4xl">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ECOSSISTEMA — produtos dinâmicos */}
      {products.length > 0 && (
        <section id="ecossistema" className="border-y border-border bg-surface/30">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-primary">Ecossistema VSMS</p>
                <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                  Nossas <span className="text-gradient">soluções em produto</span>
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Cada produto nasce de uma dor real, com tecnologia própria, operação contínua e roadmap de longo prazo.
                </p>
              </div>
              <Link to="/produtos" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                Ver todos os produtos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((p) => (
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
                    </div>
                    {/* <p className="mt-5 text-xs font-medium text-primary">{p.type == "ai_app" ? "ia_app" : p.type}</p> */}
                    <h3 className="mt-3 text-xl font-semibold">{p.name}</h3>
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
          </div>
        </section>
      )}

      {/* PILARES */}
      {pillars.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-12 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="group rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur transition-all hover:border-primary/40 hover:bg-surface">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground shadow-glow">
                  <Icon name={p.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SERVIÇOS */}
      {services.length > 0 && (
        <section className="border-y border-border bg-surface/30">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-primary">Serviços de apoio</p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                Para potencializar <span className="text-gradient">o uso dos nossos produtos</span>
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <div key={s.title} className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40">
                  <Icon name={s.icon} className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
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
      )}

      {/* DEPOIMENTOS */}
      {testimonials.length > 0 && (
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
      )}

      {/* CTA */}
      {(finalCta.title || (finalCta.ctas && finalCta.ctas.length > 0)) && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 text-center md:p-16">
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-30 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-bold md:text-4xl">
                {finalCta.title} {finalCta.title_highlight && <span className="text-gradient">{finalCta.title_highlight}</span>}
              </h2>
              {finalCta.subtitle && <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{finalCta.subtitle}</p>}
              {finalCta.ctas && finalCta.ctas.length > 0 && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  {finalCta.ctas.map((c) => (
                    <PublicHomeLink
                      key={c.label}
                      to={c.to}
                      className={
                        c.variant === "secondary"
                          ? "inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-6 py-3 text-sm font-medium backdrop-blur hover:bg-surface"
                          : "inline-flex items-center gap-2 rounded-md bg-gradient-brand px-6 py-3 text-sm font-medium text-brand-foreground shadow-glow"
                      }
                    >
                      {c.label} {c.variant !== "secondary" && <ArrowRight className="h-4 w-4" />}
                    </PublicHomeLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PlugZap, Layers, Bot, LifeBuoy, Lightbulb, Workflow, ArrowRight, type LucideIcon } from "lucide-react";
import { getPublicPage } from "@/lib/site/site.functions";

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

const ICONS: Record<string, LucideIcon> = {
  lightbulb: Lightbulb,
  plug: PlugZap,
  layers: Layers,
  bot: Bot,
  workflow: Workflow,
  "life-buoy": LifeBuoy,
};

type ServiceItem = { icon?: string; title: string; desc: string; items?: string[] };
type ServicesContent = {
  eyebrow?: string;
  heading?: string;
  lead?: string;
  services?: ServiceItem[];
  cta?: { heading?: string; lead?: string; primaryLabel?: string; primaryTo?: string; secondaryLabel?: string; secondaryTo?: string };
};

function Servicos() {
  const { data: page } = useQuery({
    queryKey: ["page", "servicos"],
    queryFn: () => getPublicPage({ data: { slug: "servicos" } }),
    staleTime: 60_000,
  });
  const c = (page?.content ?? {}) as ServicesContent;
  const services = c.services ?? [];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-32 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          {c.eyebrow && <p className="text-sm font-medium text-primary">{c.eyebrow}</p>}
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">{c.heading ?? page?.title ?? "Serviços"}</h1>
          {c.lead && <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">{c.lead}</p>}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = ICONS[s.icon ?? ""] ?? Lightbulb;
            return (
              <article key={s.title} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-lg font-semibold">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                {s.items && s.items.length > 0 && (
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {it}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>

        {c.cta && (
          <div className="mt-16 rounded-3xl border border-border bg-surface p-10 text-center md:p-14">
            {c.cta.heading && <h2 className="text-2xl font-bold md:text-3xl">{c.cta.heading}</h2>}
            {c.cta.lead && <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{c.cta.lead}</p>}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {c.cta.primaryLabel && c.cta.primaryTo && (
                <Link to={c.cta.primaryTo as never} className="inline-flex items-center gap-2 rounded-md bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground">
                  {c.cta.primaryLabel} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {c.cta.secondaryLabel && c.cta.secondaryTo && (
                <Link to={c.cta.secondaryTo as never} className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-5 py-3 text-sm font-medium hover:bg-surface">
                  {c.cta.secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

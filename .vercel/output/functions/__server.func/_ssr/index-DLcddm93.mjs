import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { S as Sparkles, A as ArrowRight, B as Boxes, Q as Quote, b as LucideIcons } from "../_libs/lucide-react.mjs";
import { g as getPublicPage, l as listPublicProducts, h as heroBg } from "./router-DrCA9Lcc.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./server-BxRkUJzR.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-Db3P2fQk.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./client-CH6WUO7d.mjs";
function Icon({
  name,
  className
}) {
  const I = name && LucideIcons[name] || Boxes;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(I, { className });
}
function Home() {
  const {
    data: pageRow
  } = useQuery({
    queryKey: ["page", "home"],
    queryFn: () => getPublicPage({
      data: {
        slug: "home"
      }
    }),
    staleTime: 6e4
  });
  const {
    data: products = []
  } = useQuery({
    queryKey: ["public-products"],
    queryFn: () => listPublicProducts(),
    staleTime: 6e4
  });
  const content = pageRow?.content || {};
  const hero = content.hero ?? {};
  const stats = content.stats ?? [];
  const pillars = content.pillars ?? [];
  const services = content.services ?? [];
  const testimonials = content.testimonials ?? [];
  const finalCta = content.cta ?? {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroBg, alt: "", width: 1920, height: 1080, className: "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40", fetchPriority: "high", decoding: "async" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-6 pt-24 pb-28 md:pt-24 md:pb-36", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center animate-fade-up", children: [
          hero.badge && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
            hero.badge
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl", children: [
            hero.title,
            " ",
            hero.title_highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: hero.title_highlight })
          ] }),
          hero.subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg", children: hero.subtitle }),
          hero.ctas && hero.ctas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-wrap items-center justify-center gap-3", children: hero.ctas.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: c.to, className: c.variant === "secondary" ? "inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-5 py-3 text-sm font-medium backdrop-blur hover:bg-surface" : "inline-flex items-center gap-2 rounded-md bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground shadow-glow transition-transform hover:-translate-y-0.5", children: [
            c.label,
            " ",
            c.variant !== "secondary" && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }, c.label)) }),
          hero.foot && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-xs text-muted-foreground", children: hero.foot })
        ] }),
        stats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface/80 px-6 py-6 text-center backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-bold text-gradient md:text-4xl", children: s.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: s.label })
        ] }, s.label)) })
      ] })
    ] }),
    products.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "ecossistema", className: "border-y border-border bg-surface/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary", children: "Ecossistema VSMS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-2 text-3xl font-bold md:text-4xl", children: [
            "Nossas ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "soluções em produto" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Cada produto nasce de uma dor real, com tecnologia própria, operação contínua e roadmap de longo prazo." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/produtos", className: "inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline", children: [
          "Ver todos os produtos ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: products.slice(0, 6).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-brand opacity-10 blur-2xl transition-opacity group-hover:opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary", children: p.type == "ai_app" ? "ia_app" : p.type })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-xl font-semibold", children: p.name }),
          p.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: p.description }),
          p.primary_domain && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://${p.primary_domain}`, target: "_blank", rel: "noopener noreferrer", className: "mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline", children: [
            "Acessar ",
            p.primary_domain,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
          ] })
        ] })
      ] }, p.id)) })
    ] }) }),
    pillars.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-12 md:grid-cols-3", children: pillars.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur transition-all hover:border-primary/40 hover:bg-surface", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: p.icon, className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-lg font-semibold", children: p.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: p.desc })
    ] }, p.title)) }) }),
    services.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border bg-surface/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary", children: "Serviços de apoio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-2 text-3xl font-bold md:text-4xl", children: [
          "Para potencializar ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "o uso dos nossos produtos" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4", children: services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: s.icon, className: "h-6 w-6 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-semibold", children: s.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: s.desc })
      ] }, s.title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/servicos", className: "inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline", children: [
        "Ver todos os serviços de apoio ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] }) })
    ] }) }),
    testimonials.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary", children: "Quem usa" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-3xl font-bold md:text-4xl", children: "Resultados que falam" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-5 md:grid-cols-3", children: testimonials.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "rounded-2xl border border-border bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-6 w-6 text-primary/70" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "mt-3 text-sm leading-relaxed", children: t.quote }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: t.role })
        ] })
      ] }, t.name)) })
    ] }),
    (finalCta.title || finalCta.ctas && finalCta.ctas.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-border bg-surface p-10 text-center md:p-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-30 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold md:text-4xl", children: [
          finalCta.title,
          " ",
          finalCta.title_highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: finalCta.title_highlight })
        ] }),
        finalCta.subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-xl text-muted-foreground", children: finalCta.subtitle }),
        finalCta.ctas && finalCta.ctas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-wrap items-center justify-center gap-3", children: finalCta.ctas.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: c.to, className: c.variant === "secondary" ? "inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-6 py-3 text-sm font-medium backdrop-blur hover:bg-surface" : "inline-flex items-center gap-2 rounded-md bg-gradient-brand px-6 py-3 text-sm font-medium text-brand-foreground shadow-glow", children: [
          c.label,
          " ",
          c.variant !== "secondary" && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }, c.label)) })
      ] })
    ] }) })
  ] });
}
export {
  Home as component
};

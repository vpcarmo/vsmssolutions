import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as getPublicPage } from "./router-BkXkNhUB.mjs";
import "../_libs/seroval.mjs";
import { c as LifeBuoy, W as Workflow, B as Bot, d as Layers, P as PlugZap, e as Lightbulb, A as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "./server-CNhjO8y8.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-pLPoR55H.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./client-CXKgXgA3.mjs";
const ICONS = {
  lightbulb: Lightbulb,
  plug: PlugZap,
  layers: Layers,
  bot: Bot,
  workflow: Workflow,
  "life-buoy": LifeBuoy
};
function Servicos() {
  const {
    data: page
  } = useQuery({
    queryKey: ["page", "servicos"],
    queryFn: () => getPublicPage({
      data: {
        slug: "servicos"
      }
    }),
    staleTime: 6e4
  });
  const c = page?.content ?? {};
  const services = c.services ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-4xl px-6 py-24 text-center", children: [
        c.eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary", children: c.eyebrow }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-4xl font-bold md:text-6xl", children: c.heading ?? page?.title ?? "Serviços" }),
        c.lead && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-2xl text-muted-foreground", children: c.lead })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: services.map((s) => {
        const Icon = ICONS[s.icon ?? ""] ?? Lightbulb;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-5 text-lg font-semibold", children: s.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: s.desc }),
          s.items && s.items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-1.5 text-sm", children: s.items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" }),
            it
          ] }, it)) })
        ] }, s.title);
      }) }),
      c.cta && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 rounded-3xl border border-border bg-surface p-10 text-center md:p-14", children: [
        c.cta.heading && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold md:text-3xl", children: c.cta.heading }),
        c.cta.lead && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-xl text-muted-foreground", children: c.cta.lead }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center justify-center gap-3", children: [
          c.cta.primaryLabel && c.cta.primaryTo && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: c.cta.primaryTo, className: "inline-flex items-center gap-2 rounded-md bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground", children: [
            c.cta.primaryLabel,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }),
          c.cta.secondaryLabel && c.cta.secondaryTo && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: c.cta.secondaryTo, className: "inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-5 py-3 text-sm font-medium hover:bg-surface", children: c.cta.secondaryLabel })
        ] })
      ] })
    ] })
  ] });
}
export {
  Servicos as component
};

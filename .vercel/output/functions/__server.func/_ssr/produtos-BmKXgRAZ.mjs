import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as listPublicProducts } from "./router-DrCA9Lcc.mjs";
import "../_libs/seroval.mjs";
import { S as Sparkles, B as Boxes, A as ArrowRight } from "../_libs/lucide-react.mjs";
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
function Produtos() {
  const {
    data: products = [],
    isLoading
  } = useQuery({
    queryKey: ["public-products"],
    queryFn: () => listPublicProducts(),
    staleTime: 6e4
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-4xl px-6 py-24 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
          "Ecossistema VSMS"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 text-4xl font-bold md:text-6xl", children: [
          "Produtos que ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "criamos e operamos" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-2xl text-muted-foreground", children: "Cada produto do ecossistema VSMS é construído com tecnologia própria, mantido por nosso time e pensado para evoluir junto com seus usuários." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 py-24", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground", children: "Carregando produtos…" }) : products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground", children: "Nenhum produto disponível no momento." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-brand opacity-10 blur-2xl transition-opacity group-hover:opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary", children: p.type == "ai_app" ? "ia_app" : p.type })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-xl font-semibold", children: p.name }),
        p.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: p.description }),
        p.primary_domain && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://${p.primary_domain}`, target: "_blank", rel: "noopener noreferrer", className: "mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline", children: [
          "Acessar ",
          p.primary_domain,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
        ] })
      ] })
    ] }, p.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-border bg-surface p-10 text-center md:p-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold md:text-3xl", children: "Quer adotar um produto VSMS na sua empresa?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-xl text-muted-foreground", children: "Oferecemos consultoria, implantação e integrações para acelerar a adoção das nossas plataformas." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap items-center justify-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contato", className: "inline-flex items-center gap-2 rounded-md bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground", children: [
          "Falar com a equipe ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }) })
      ] })
    ] }) })
  ] });
}
export {
  Produtos as component
};

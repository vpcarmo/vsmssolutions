import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as getPublicPage } from "./router-DrCA9Lcc.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/lucide-react.mjs";
const cases = [{
  title: "Clínica Digital",
  tag: "Saúde",
  desc: "Plataforma de prontuário eletrônico e agendamento online para rede de clínicas."
}, {
  title: "Marketplace B2B",
  tag: "E-commerce",
  desc: "Marketplace de fornecedores industriais com integrações ERP e logística."
}, {
  title: "Copilot Jurídico",
  tag: "IA",
  desc: "Assistente baseado em IA para análise de contratos e jurisprudência."
}, {
  title: "App de Treinos",
  tag: "Fitness",
  desc: "Aplicativo de treinos personalizados com acompanhamento de evolução."
}, {
  title: "Automação Fiscal",
  tag: "Automação",
  desc: "Robôs de emissão fiscal integrados com sistemas legados."
}, {
  title: "Portal Educacional",
  tag: "EdTech",
  desc: "Portal de cursos com trilhas adaptativas e certificação automática."
}];
function Portfolio() {
  const {
    data: page
  } = useQuery({
    queryKey: ["page", "portfolio"],
    queryFn: () => getPublicPage({
      data: {
        slug: "portfolio"
      }
    }),
    staleTime: 6e4
  });
  const title = page?.title ?? "Projetos que geram resultado";
  const intro = page?.excerpt ?? "Uma seleção de cases reais entregues em diferentes segmentos.";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-4xl px-6 py-24 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary", children: "Portfólio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-4xl font-bold md:text-6xl", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-2xl text-muted-foreground", children: intro })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: cases.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] overflow-hidden bg-gradient-brand", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur", children: c.tag })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold group-hover:text-gradient", children: c.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: c.desc })
      ] })
    ] }, c.title)) }) })
  ] });
}
export {
  Portfolio as component
};

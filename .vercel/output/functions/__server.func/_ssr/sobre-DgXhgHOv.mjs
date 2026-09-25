import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as getPublicPage } from "./router-CPmUjF1E.mjs";
import "../_libs/seroval.mjs";
import { T as Target, E as Eye, H as Heart, j as Trophy } from "../_libs/lucide-react.mjs";
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
import "./server-DfH1wd4N.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-MXl0BiEw.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./client-BHmQHd0X.mjs";
function Sobre() {
  const {
    data: page
  } = useQuery({
    queryKey: ["page", "sobre"],
    queryFn: () => getPublicPage({
      data: {
        slug: "sobre"
      }
    }),
    staleTime: 6e4
  });
  const sections = page?.content?.sections ?? [];
  const title = page?.title ?? "Uma empresa orientada a produto";
  const intro = page?.excerpt ?? "A VSMS Solutions cria e opera produtos digitais, plataformas SaaS e soluções de inteligência artificial — pensados para escalar e evoluir junto com pessoas e empresas.";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-4xl px-6 py-24 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary", children: "Sobre nós" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-4xl font-bold md:text-6xl", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-2xl text-muted-foreground", children: intro })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-5xl px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose-invert max-w-none space-y-6 text-muted-foreground", children: sections.length > 0 ? sections.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      s.heading && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-foreground", children: s.heading }),
      s.body && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 whitespace-pre-line", children: s.body })
    ] }, i)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-foreground", children: "Nossa história" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A VSMS Solutions nasceu com uma convicção clara: o maior impacto da tecnologia acontece quando ela vira produto — algo que pode ser usado, evoluído e operado em escala, todos os dias." })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border bg-surface/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-7xl gap-5 px-6 py-24 md:grid-cols-2 lg:grid-cols-4", children: [{
      icon: Target,
      title: "Missão",
      desc: "Criar produtos digitais e plataformas de IA que geram valor real e duradouro."
    }, {
      icon: Eye,
      title: "Visão",
      desc: "Ser referência em ecossistemas SaaS e soluções de IA escaláveis e sustentáveis."
    }, {
      icon: Heart,
      title: "Valores",
      desc: "Foco em produto, excelência técnica, transparência e visão de longo prazo."
    }, {
      icon: Trophy,
      title: "Objetivo",
      desc: "Expandir o ecossistema VSMS com novos produtos e impacto crescente."
    }].map(({
      icon: Icon,
      title: title2,
      desc
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 font-semibold", children: title2 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: desc })
    ] }, title2)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-5xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold", children: "O que nos define" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 grid gap-3 text-muted-foreground md:grid-cols-2", children: ["Empresa orientada a produto, não a serviço sob demanda", "Ecossistema próprio de SaaS e ferramentas de IA", "Operação contínua com SLA e evolução constante", "Stack moderna e escalável desde o dia 1", "Serviços de apoio como complemento estratégico", "Visão de longo prazo em cada produto que lançamos"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand" }),
        item
      ] }, item)) })
    ] })
  ] });
}
export {
  Sobre as component
};

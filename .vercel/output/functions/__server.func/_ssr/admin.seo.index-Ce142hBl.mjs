import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { l as listSeo, s as seoOverview, C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./seo.functions-01pmfxN1.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { B as Badge } from "./badge-YM7oB01y.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-D_KwyCuk.mjs";
import { l as listPages } from "./pages.functions-DpBtS5Na.mjs";
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
import "./router-CPmUjF1E.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/tailwind-merge.mjs";
function SeoIndex() {
  const listFn = useServerFn(listSeo);
  const overviewFn = useServerFn(seoOverview);
  const pagesFn = useServerFn(listPages);
  const [q, setQ] = reactExports.useState("");
  const {
    data: overview
  } = useQuery({
    queryKey: ["admin", "seo", "overview"],
    queryFn: () => overviewFn({
      data: void 0
    })
  });
  const {
    data: rows = []
  } = useQuery({
    queryKey: ["admin", "seo", "list"],
    queryFn: () => listFn({
      data: void 0
    })
  });
  const {
    data: pages = []
  } = useQuery({
    queryKey: ["admin", "pages", "for-seo"],
    queryFn: () => pagesFn({
      data: void 0
    })
  });
  const pageMap = new Map(pages.map((p) => [p.id, p]));
  const filtered = rows.filter((r) => !q ? true : (r.title ?? "").toLowerCase().includes(q.toLowerCase()) || (pageMap.get(r.resource_id)?.title ?? "").toLowerCase().includes(q.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "SEO" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Gestão polimórfica de metadados para páginas, produtos e posts." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 md:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Páginas", value: overview?.totalPages ?? "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Com SEO", value: overview?.configured ?? "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Sem SEO", value: overview?.missing ?? "—", tone: "warn" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Sem título", value: overview?.missingTitle ?? "—", tone: "warn" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Noindex", value: overview?.noindexed ?? "—", tone: "warn" })
    ] }),
    overview?.pagesWithoutSeo?.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Páginas sem SEO configurado" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm", children: overview.pagesWithoutSeo.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/seo/$resourceType/$resourceId", params: {
          resourceType: "page",
          resourceId: p.id
        }, children: "Configurar" }) })
      ] }, p.id)) }) })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Registros SEO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar...", value: q, onChange: (e) => setQ(e.target.value), className: "max-w-xs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Recurso" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tipo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Título SEO" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Robots" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
          filtered.map((r) => {
            const parent = pageMap.get(r.resource_id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: parent?.title ?? r.resource_id.slice(0, 8) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: r.resource_type }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-xs truncate", children: r.title ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                r.noindex && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "mr-1", children: "noindex" }),
                r.nofollow && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "nofollow" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/seo/$resourceType/$resourceId", params: {
                resourceType: r.resource_type,
                resourceId: r.resource_id
              }, children: "Editar" }) }) })
            ] }, r.id);
          }),
          !filtered.length && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "text-center text-sm text-muted-foreground py-8", children: "Nenhum registro SEO encontrado." }) })
        ] })
      ] }) })
    ] })
  ] });
}
function Stat({
  label,
  value,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-1 text-2xl font-semibold ${tone === "warn" ? "text-amber-600" : ""}`, children: value })
  ] }) });
}
export {
  SeoIndex as component
};

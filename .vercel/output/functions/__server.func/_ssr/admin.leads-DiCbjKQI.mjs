import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as updateLeadStatus, l as listLeads } from "./inbox.functions-DLIwypa_.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./router-BkXkNhUB.mjs";
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
import "../_libs/lucide-react.mjs";
const STATUSES = ["new", "contacted", "qualified", "won", "lost"];
function LeadsAdmin() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["admin-leads"],
    queryFn: () => listLeads()
  });
  const m = useMutation({
    mutationFn: (vars) => updateLeadStatus({
      data: vars
    }),
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["admin-leads"]
    })
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Leads" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Leads gerados a partir dos formulários públicos. Todas as alterações ficam registradas no log de auditoria." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-left text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2", children: "Data" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2", children: "Nome" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2", children: "Contato" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2", children: "Origem" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2", children: "Mensagem" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        q.data?.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border align-top", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 whitespace-nowrap text-xs text-muted-foreground", children: new Date(l.created_at).toLocaleString("pt-BR") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: l.name ?? "—" }),
            l.company && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: l.company })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: l.email ?? "—" }),
            l.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: l.phone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-xs text-muted-foreground", children: l.source ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-xs text-muted-foreground line-clamp-3", children: l.message ?? "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: l.status, disabled: m.isPending, onChange: (e) => m.mutate({
            id: l.id,
            status: e.target.value
          }), className: "rounded border border-border bg-background px-2 py-1 text-xs", children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s)) }) })
        ] }, l.id)),
        q.data?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "px-5 py-8 text-center text-sm text-muted-foreground", children: "Nenhum lead capturado ainda." }) })
      ] })
    ] }) })
  ] });
}
export {
  LeadsAdmin as component
};

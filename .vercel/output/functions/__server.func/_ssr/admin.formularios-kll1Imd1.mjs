import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as listForms, a as listSubmissions } from "./inbox.functions-DN2pAjPf.mjs";
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
function FormsAdmin() {
  const [selectedForm, setSelectedForm] = reactExports.useState(null);
  const formsQ = useQuery({
    queryKey: ["admin-forms"],
    queryFn: () => listForms()
  });
  const subsQ = useQuery({
    queryKey: ["admin-submissions", selectedForm],
    queryFn: () => listSubmissions({
      data: selectedForm ? {
        form_id: selectedForm
      } : {}
    })
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Formulários" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Formulários públicos e suas submissões. Submissões do formulário ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "contato" }),
        " geram leads automaticamente."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border px-5 py-3 text-sm font-medium", children: "Formulários" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-left text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2", children: "Nome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2", children: "Slug" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2", children: "Notificações" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2 text-right", children: "Ação" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          formsQ.data?.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: f.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-mono text-xs text-muted-foreground", children: f.slug }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: f.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-xs text-muted-foreground", children: f.notify_emails?.join(", ") || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedForm(f.id), className: "text-xs text-primary hover:underline", children: "Ver submissões" }) })
          ] }, f.id)),
          formsQ.data?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-5 py-8 text-center text-sm text-muted-foreground", children: "Nenhum formulário cadastrado." }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between border-b border-border px-5 py-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
          "Submissões ",
          selectedForm ? "(filtro ativo)" : "(todas)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          selectedForm && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedForm(null), className: "text-xs text-primary hover:underline", children: "Limpar filtro" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/leads", className: "text-xs text-primary hover:underline", children: "Ir para Leads →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-left text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2", children: "Data" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2", children: "Dados" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2", children: "Spam" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          subsQ.data?.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border align-top", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 whitespace-nowrap text-xs text-muted-foreground", children: new Date(s.created_at).toLocaleString("pt-BR") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "max-w-xl whitespace-pre-wrap break-words text-xs", children: JSON.stringify(s.data, null, 2) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: s.is_spam ? "sim" : "não" })
          ] }, s.id)),
          subsQ.data?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "px-5 py-8 text-center text-sm text-muted-foreground", children: "Nenhuma submissão." }) })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  FormsAdmin as component
};

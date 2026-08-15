import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, b as useRouterState, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-CXKgXgA3.mjs";
import { c as cn, B as Button } from "./button-DjOZMqFS.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const NAV = [{
  to: "/admin",
  label: "Visão geral",
  end: true
}, {
  to: "/admin/produtos",
  label: "Produtos"
}, {
  to: "/admin/paginas",
  label: "Páginas"
}, {
  to: "/admin/blog",
  label: "Blog"
}, {
  to: "/admin/midia",
  label: "Mídia"
}, {
  to: "/admin/formularios",
  label: "Formulários"
}, {
  to: "/admin/leads",
  label: "Leads"
}, {
  to: "/admin/seo",
  label: "SEO"
}, {
  to: "/admin/feature-flags",
  label: "Feature Flags"
}, {
  to: "/admin/usuarios",
  label: "Usuários"
}, {
  to: "/admin/auditoria",
  label: "Auditoria"
}, {
  to: "/admin/configuracoes",
  label: "Configurações"
}];
function AdminShell() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const pathname = useRouterState({
    select: (s) => s.location.pathname
  });
  const {
    data: profile
  } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: async () => {
      const {
        data: userRes
      } = await supabase.auth.getUser();
      const user = userRes.user;
      if (!user) return null;
      const {
        data: roles
      } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      return {
        email: user.email,
        roles: roles?.map((r) => r.role) ?? []
      };
    },
    staleTime: 6e4
  });
  async function handleSignOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({
      to: "/auth",
      replace: true
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-dvh bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden w-60 shrink-0 flex-col border-r border-border bg-card/40 md:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border px-5 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "font-display text-lg font-bold", children: "VSMS Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "Painel multi-produto" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 overflow-y-auto px-2 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-0.5 text-sm", children: NAV.map((item) => {
        const active = item.end ? pathname === item.to : pathname.startsWith(item.to);
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: item.to, className: cn("block rounded-md px-3 py-2 transition-colors", active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"), children: item.label }) }, item.to);
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border px-3 py-3 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: profile?.email ?? "..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate text-muted-foreground", children: profile?.roles.length ? profile.roles.join(", ") : "sem papel atribuído" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "mt-2 w-full", onClick: handleSignOut, children: "Sair" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex h-14 items-center justify-between border-b border-border px-4 md:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "font-display font-bold", children: "VSMS Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: handleSignOut, children: "Sair" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto p-4 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
export {
  AdminShell as component
};

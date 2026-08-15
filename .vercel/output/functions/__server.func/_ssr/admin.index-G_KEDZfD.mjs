import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { s as supabase } from "./client-CH6WUO7d.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { c as createSsrRpc } from "./router-DrCA9Lcc.mjs";
import { c as createServerFn } from "./server-BxRkUJzR.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-Db3P2fQk.mjs";
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
import "../_libs/lucide-react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const bootstrapSuperAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("de3dfe91e0525e599a6f5f05f29afae835aedbb0e30e9c2ee302fb5f7b7d9312"));
function AdminHome() {
  const router = useRouter();
  const bootstrap = useServerFn(bootstrapSuperAdmin);
  const [bootstrapMsg, setBootstrapMsg] = reactExports.useState(null);
  const {
    data: rolesData,
    refetch: refetchRoles
  } = useQuery({
    queryKey: ["my-roles"],
    queryFn: async () => {
      const {
        data: u
      } = await supabase.auth.getUser();
      if (!u.user) return [];
      const {
        data: data2
      } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id);
      return data2?.map((r) => r.role) ?? [];
    }
  });
  const hasNoRole = rolesData !== void 0 && rolesData.length === 0;
  const {
    data
  } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const [products, posts, pages, leads, forms, media] = await Promise.all([supabase.from("products").select("id", {
        count: "exact",
        head: true
      }), supabase.from("posts").select("id", {
        count: "exact",
        head: true
      }), supabase.from("pages").select("id", {
        count: "exact",
        head: true
      }), supabase.from("leads").select("id", {
        count: "exact",
        head: true
      }), supabase.from("forms").select("id", {
        count: "exact",
        head: true
      }), supabase.from("media_assets").select("id", {
        count: "exact",
        head: true
      })]);
      return {
        products: products.count ?? 0,
        posts: posts.count ?? 0,
        pages: pages.count ?? 0,
        leads: leads.count ?? 0,
        forms: forms.count ?? 0,
        media: media.count ?? 0
      };
    }
  });
  async function handleBootstrap() {
    setBootstrapMsg(null);
    try {
      await bootstrap({});
      setBootstrapMsg("Você agora é super_admin. Recarregando...");
      await refetchRoles();
      router.invalidate();
    } catch (e) {
      setBootstrapMsg(e instanceof Error ? e.message : "Erro ao conceder super_admin.");
    }
  }
  const cards = [{
    label: "Produtos",
    value: data?.products,
    href: "/admin/produtos"
  }, {
    label: "Páginas",
    value: data?.pages,
    href: "/admin/paginas"
  }, {
    label: "Posts",
    value: data?.posts,
    href: "/admin/blog"
  }, {
    label: "Leads",
    value: data?.leads,
    href: "/admin/leads"
  }, {
    label: "Formulários",
    value: data?.forms,
    href: "/admin/formularios"
  }, {
    label: "Mídia",
    value: data?.media,
    href: "/admin/midia"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Visão geral" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Painel administrativo centralizado do ecossistema VSMS." })
    ] }),
    hasNoRole && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-dashed border-primary/40 bg-primary/5 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Inicializar painel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Nenhum papel atribuído à sua conta. Se ainda não existe um super_admin no sistema, torne-se um agora para continuar." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-3", size: "sm", onClick: handleBootstrap, children: "Tornar-me super_admin" }),
      bootstrapMsg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm", children: bootstrapMsg })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid grid-cols-2 gap-3 md:grid-cols-3", children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: c.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-3xl font-bold", children: c.value ?? "—" })
    ] }, c.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Fase 1 ativa" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 grid gap-1 text-sm text-muted-foreground md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Tenants e RBAC (super_admin, admin, editor)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Produtos, Páginas, Blog (JSONB)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ SEO meta polimórfico" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Biblioteca de mídia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Formulários + Leads + captcha + rate limit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Auditoria e Configurações" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Feature Flags por produto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-foreground/70", children: "⏳ UIs detalhadas — em construção" })
      ] })
    ] })
  ] });
}
export {
  AdminHome as component
};

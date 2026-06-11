import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { bootstrapSuperAdmin } from "@/lib/admin/bootstrap.functions";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminHome,
});

function AdminHome() {
  const router = useRouter();
  const bootstrap = useServerFn(bootstrapSuperAdmin);
  const [bootstrapMsg, setBootstrapMsg] = useState<string | null>(null);

  const { data: rolesData, refetch: refetchRoles } = useQuery({
    queryKey: ["my-roles"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return [];
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id);
      return data?.map((r) => r.role) ?? [];
    },
  });
  const hasNoRole = rolesData !== undefined && rolesData.length === 0;

  const { data } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const [products, posts, pages, leads, forms, media] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("posts").select("id", { count: "exact", head: true }),
        supabase.from("pages").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("forms").select("id", { count: "exact", head: true }),
        supabase.from("media_assets").select("id", { count: "exact", head: true }),
      ]);
      return {
        products: products.count ?? 0,
        posts: posts.count ?? 0,
        pages: pages.count ?? 0,
        leads: leads.count ?? 0,
        forms: forms.count ?? 0,
        media: media.count ?? 0,
      };
    },
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


  const cards = [
    { label: "Produtos", value: data?.products, href: "/admin/produtos" },
    { label: "Páginas", value: data?.pages, href: "/admin/paginas" },
    { label: "Posts", value: data?.posts, href: "/admin/blog" },
    { label: "Leads", value: data?.leads, href: "/admin/leads" },
    { label: "Formulários", value: data?.forms, href: "/admin/formularios" },
    { label: "Mídia", value: data?.media, href: "/admin/midia" },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header>
        <h1 className="font-display text-3xl font-bold">Visão geral</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Painel administrativo centralizado do ecossistema VSMS.
        </p>
      </header>
      <section className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</p>
            <p className="mt-2 font-display text-3xl font-bold">{c.value ?? "—"}</p>
          </div>
        ))}
      </section>
      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-semibold">Fase 1 ativa</h2>
        <ul className="mt-3 grid gap-1 text-sm text-muted-foreground md:grid-cols-2">
          <li>✓ Tenants e RBAC (super_admin, admin, editor)</li>
          <li>✓ Produtos, Páginas, Blog (JSONB)</li>
          <li>✓ SEO meta polimórfico</li>
          <li>✓ Biblioteca de mídia</li>
          <li>✓ Formulários + Leads + captcha + rate limit</li>
          <li>✓ Auditoria e Configurações</li>
          <li>✓ Feature Flags por produto</li>
          <li className="text-foreground/70">⏳ UIs detalhadas — em construção</li>
        </ul>
      </section>
    </div>
  );
}

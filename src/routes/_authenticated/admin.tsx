import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Painel — VSMS Admin" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminShell,
});

const NAV = [
  { to: "/admin", label: "Visão geral", end: true },
  { to: "/admin/produtos", label: "Produtos" },
  { to: "/admin/paginas", label: "Páginas" },
  { to: "/admin/blog", label: "Blog" },
  { to: "/admin/midia", label: "Mídia" },
  { to: "/admin/formularios", label: "Formulários" },
  { to: "/admin/leads", label: "Leads" },
  { to: "/admin/seo", label: "SEO" },
  { to: "/admin/feature-flags", label: "Feature Flags" },
  { to: "/admin/usuarios", label: "Usuários" },
  { to: "/admin/auditoria", label: "Auditoria" },
  { to: "/admin/configuracoes", label: "Configurações" },
] as const;

function AdminShell() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const { data: profile } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: async () => {
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes.user;
      if (!user) return null;
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      return { email: user.email, roles: roles?.map((r) => r.role) ?? [] };
    },
    staleTime: 60_000,
  });

  async function handleSignOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="flex min-h-dvh bg-background text-foreground">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card/40 md:flex">
        <div className="border-b border-border px-5 py-4">
          <Link to="/admin" className="font-display text-lg font-bold">VSMS Admin</Link>
          <p className="mt-0.5 text-xs text-muted-foreground">Painel multi-produto</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="space-y-0.5 text-sm">
            {NAV.map((item) => {
              const active = item.end ? pathname === item.to : pathname.startsWith(item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "block rounded-md px-3 py-2 transition-colors",
                      active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-border px-3 py-3 text-xs">
          <p className="truncate font-medium">{profile?.email ?? "..."}</p>
          <p className="mt-0.5 truncate text-muted-foreground">
            {profile?.roles.length ? profile.roles.join(", ") : "sem papel atribuído"}
          </p>
          <Button variant="outline" size="sm" className="mt-2 w-full" onClick={handleSignOut}>
            Sair
          </Button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border px-4 md:hidden">
          <Link to="/admin" className="font-display font-bold">VSMS Admin</Link>
          <Button variant="outline" size="sm" onClick={handleSignOut}>Sair</Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

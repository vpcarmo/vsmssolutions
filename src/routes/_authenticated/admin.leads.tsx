import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listLeads, updateLeadStatus } from "@/lib/admin/inbox.functions";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  component: LeadsAdmin,
});

const STATUSES = ["new", "contacted", "qualified", "won", "lost"] as const;

function LeadsAdmin() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin-leads"], queryFn: () => listLeads() });
  const m = useMutation({
    mutationFn: (vars: { id: string; status: (typeof STATUSES)[number] }) =>
      updateLeadStatus({ data: vars }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-leads"] }),
  });

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <div>
        <h1 className="font-display text-2xl font-bold">Leads</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Leads gerados a partir dos formulários públicos. Todas as alterações ficam registradas no log de auditoria.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-5 py-2">Data</th>
              <th className="px-5 py-2">Nome</th>
              <th className="px-5 py-2">Contato</th>
              <th className="px-5 py-2">Origem</th>
              <th className="px-5 py-2">Mensagem</th>
              <th className="px-5 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {q.data?.map((l) => (
              <tr key={l.id} className="border-t border-border align-top">
                <td className="px-5 py-3 whitespace-nowrap text-xs text-muted-foreground">
                  {new Date(l.created_at).toLocaleString("pt-BR")}
                </td>
                <td className="px-5 py-3">
                  <div className="font-medium">{l.name ?? "—"}</div>
                  {l.company && <div className="text-xs text-muted-foreground">{l.company}</div>}
                </td>
                <td className="px-5 py-3 text-xs">
                  <div>{l.email ?? "—"}</div>
                  {l.phone && <div className="text-muted-foreground">{l.phone}</div>}
                </td>
                <td className="px-5 py-3 text-xs text-muted-foreground">{l.source ?? "—"}</td>
                <td className="px-5 py-3">
                  <p className="max-w-md text-xs text-muted-foreground line-clamp-3">{l.message ?? "—"}</p>
                </td>
                <td className="px-5 py-3">
                  <select
                    value={l.status}
                    disabled={m.isPending}
                    onChange={(e) => m.mutate({ id: l.id, status: e.target.value as (typeof STATUSES)[number] })}
                    className="rounded border border-border bg-background px-2 py-1 text-xs"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {q.data?.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-sm text-muted-foreground">Nenhum lead capturado ainda.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

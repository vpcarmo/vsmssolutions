import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { listForms, listSubmissions } from "@/lib/admin/inbox.functions";

export const Route = createFileRoute("/_authenticated/admin/formularios")({
  component: FormsAdmin,
});

function FormsAdmin() {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const formsQ = useQuery({ queryKey: ["admin-forms"], queryFn: () => listForms() });
  const subsQ = useQuery({
    queryKey: ["admin-submissions", selectedForm],
    queryFn: () => listSubmissions({ data: selectedForm ? { form_id: selectedForm } : {} }),
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Formulários</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Formulários públicos e suas submissões. Submissões do formulário <code>contato</code> geram leads automaticamente.
        </p>
      </div>

      <section className="rounded-2xl border border-border bg-card">
        <header className="border-b border-border px-5 py-3 text-sm font-medium">Formulários</header>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-2">Nome</th>
                <th className="px-5 py-2">Slug</th>
                <th className="px-5 py-2">Status</th>
                <th className="px-5 py-2">Notificações</th>
                <th className="px-5 py-2 text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {formsQ.data?.map((f) => (
                <tr key={f.id} className="border-t border-border">
                  <td className="px-5 py-3">{f.name}</td>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{f.slug}</td>
                  <td className="px-5 py-3">{f.status}</td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{f.notify_emails?.join(", ") || "—"}</td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => setSelectedForm(f.id)}
                      className="text-xs text-primary hover:underline"
                    >
                      Ver submissões
                    </button>
                  </td>
                </tr>
              ))}
              {formsQ.data?.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-sm text-muted-foreground">Nenhum formulário cadastrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card">
        <header className="flex items-center justify-between border-b border-border px-5 py-3 text-sm">
          <span className="font-medium">
            Submissões {selectedForm ? "(filtro ativo)" : "(todas)"}
          </span>
          <div className="flex items-center gap-3">
            {selectedForm && (
              <button onClick={() => setSelectedForm(null)} className="text-xs text-primary hover:underline">
                Limpar filtro
              </button>
            )}
            <Link to="/admin/leads" className="text-xs text-primary hover:underline">Ir para Leads →</Link>
          </div>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-2">Data</th>
                <th className="px-5 py-2">Dados</th>
                <th className="px-5 py-2">Spam</th>
              </tr>
            </thead>
            <tbody>
              {subsQ.data?.map((s) => (
                <tr key={s.id} className="border-t border-border align-top">
                  <td className="px-5 py-3 whitespace-nowrap text-xs text-muted-foreground">
                    {new Date(s.created_at).toLocaleString("pt-BR")}
                  </td>
                  <td className="px-5 py-3">
                    <pre className="max-w-xl whitespace-pre-wrap break-words text-xs">
                      {JSON.stringify(s.data, null, 2)}
                    </pre>
                  </td>
                  <td className="px-5 py-3">{s.is_spam ? "sim" : "não"}</td>
                </tr>
              ))}
              {subsQ.data?.length === 0 && (
                <tr><td colSpan={3} className="px-5 py-8 text-center text-sm text-muted-foreground">Nenhuma submissão.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getProduct, updateProduct } from "@/lib/admin/products.functions";

export const Route = createFileRoute("/_authenticated/admin/produtos/$id")({
  head: () => ({ meta: [{ title: "Editar produto — VSMS Admin" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: ProductEdit,
});

function ProductEdit() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const getFn = useServerFn(getProduct);
  const updateFn = useServerFn(updateProduct);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "product", id],
    queryFn: () => getFn({ data: { id } }),
  });

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    type: "saas" as "site" | "saas" | "ia_app",
    status: "active" as "active" | "inactive" | "archived",
    primary_domain: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name ?? "",
        slug: data.slug ?? "",
        description: data.description ?? "",
        type: data.type,
        status: data.status,
        primary_domain: data.primary_domain ?? "",
      });
    }
  }, [data]);

  const mut = useMutation({
    mutationFn: () => updateFn({ data: { id, ...form } }),
    onSuccess: () => {
      toast.success("Produto atualizado");
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      qc.invalidateQueries({ queryKey: ["admin", "product", id] });
      navigate({ to: "/admin/produtos" });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">Carregando...</p>;
  if (!data) return <p className="text-sm text-muted-foreground">Produto não encontrado.</p>;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Editar produto</h1>
          <p className="text-sm text-muted-foreground">{data.name}</p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to="/admin/produtos">Voltar</Link>
        </Button>
      </header>

      <div className="space-y-4 rounded-xl border border-border bg-card p-6">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Tipo</Label>
            <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as typeof form.type })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="site">Site</SelectItem>
                <SelectItem value="saas">SaaS</SelectItem>
                <SelectItem value="ia_app">App de IA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as typeof form.status })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="archived">Arquivado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="domain">Domínio principal</Label>
          <Input id="domain" value={form.primary_domain} onChange={(e) => setForm({ ...form, primary_domain: e.target.value })} />
          <p className="mt-1 text-xs text-muted-foreground">
            Múltiplos domínios serão gerenciados em <code>product_domains</code> (UI futura).
          </p>
        </div>
        <div className="rounded-md border border-dashed border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          <strong className="text-foreground">Product Settings</strong> (logo, favicon, branding, cores,
          analytics, pixels, SEO padrão) ficam reservados em <code>products.settings</code> (JSONB) — sem refactor futuro.
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" asChild><Link to="/admin/produtos">Cancelar</Link></Button>
          <Button disabled={mut.isPending} onClick={() => mut.mutate()}>
            {mut.isPending ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>
    </div>
  );
}

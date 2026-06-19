import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import {
  createProduct,
  listProducts,
  setProductStatus,
} from "@/lib/admin/products.functions";

export const Route = createFileRoute("/_authenticated/admin/produtos")({
  head: () => ({ meta: [{ title: "Produtos — VSMS Admin" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: ProdutosPage,
});

type ProductRow = Awaited<ReturnType<typeof listProducts>>[number];

function ProdutosPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listProducts);
  const createFn = useServerFn(createProduct);
  const toggleFn = useServerFn(setProductStatus);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => listFn({ data: undefined as never }),
  });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    type: "saas" as "site" | "saas" | "ai_app",
    status: "active" as "active" | "inactive" | "archived",
    primary_domain: "",
  });

  const createMut = useMutation({
    mutationFn: (input: typeof form) => createFn({ data: input }),
    onSuccess: () => {
      toast.success("Produto criado");
      setOpen(false);
      setForm({ name: "", slug: "", description: "", type: "saas", status: "active", primary_domain: "" });
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      qc.invalidateQueries({ queryKey: ["admin-overview"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggleMut = useMutation({
    mutationFn: (vars: { id: string; status: "active" | "inactive" }) =>
      toggleFn({ data: vars }),
    onSuccess: () => {
      toast.success("Status atualizado");
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Produtos</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Entidade central do ecossistema multi-produto da VSMS.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Novo produto</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo produto</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="slug">Slug (opcional)</Label>
                <Input id="slug" value={form.slug} placeholder="auto" onChange={(e) => setForm({ ...form, slug: e.target.value })} />
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
                      <SelectItem value="ai_app">App de IA</SelectItem>
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
                <Label htmlFor="domain">Domínio principal (opcional)</Label>
                <Input id="domain" value={form.primary_domain} placeholder="exemplo.com.br" onChange={(e) => setForm({ ...form, primary_domain: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button disabled={!form.name || createMut.isPending} onClick={() => createMut.mutate(form)}>
                {createMut.isPending ? "Criando..." : "Criar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Domínio</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">Carregando...</TableCell></TableRow>
            )}
            {!isLoading && data?.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">Nenhum produto.</TableCell></TableRow>
            )}
            {data?.map((p: ProductRow) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="text-muted-foreground">{p.slug}</TableCell>
                <TableCell className="uppercase text-xs">{p.type}</TableCell>
                <TableCell>
                  <Badge variant={p.status === "active" ? "default" : "secondary"}>{p.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{p.primary_domain ?? "—"}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button asChild size="sm" variant="outline">
                    <Link to="/admin/produtos/$id" params={{ id: p.id }}>Editar</Link>
                  </Button>
                  <Button
                    size="sm"
                    variant={p.status === "active" ? "secondary" : "default"}
                    disabled={toggleMut.isPending}
                    onClick={() =>
                      toggleMut.mutate({ id: p.id, status: p.status === "active" ? "inactive" : "active" })
                    }
                  >
                    {p.status === "active" ? "Desativar" : "Ativar"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

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
import { createPage, listPages, setPageStatus, type ContentType, type PageStatus } from "@/lib/admin/pages.functions";
import { listProducts } from "@/lib/admin/products.functions";

export const Route = createFileRoute("/_authenticated/admin/paginas/")({
  head: () => ({ meta: [{ title: "Páginas — VSMS Admin" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: PaginasPage,
});

type PageRow = Awaited<ReturnType<typeof listPages>>[number];

function PaginasPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listPages);
  const productsFn = useServerFn(listProducts);
  const createFn = useServerFn(createPage);
  const statusFn = useServerFn(setPageStatus);

  const [filterProduct, setFilterProduct] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const { data: products } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => productsFn({ data: undefined as never }),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "pages", filterProduct, filterType],
    queryFn: () =>
      listFn({
        data: {
          product_id: filterProduct === "all" ? undefined : filterProduct,
          content_type: filterType === "all" ? undefined : (filterType as ContentType),
        },
      }),
  });

  const [open, setOpen] = useState(false);
  const empty = {
    product_id: "",
    title: "",
    slug: "",
    excerpt: "",
    content_type: "page" as ContentType,
    status: "draft" as PageStatus,
  };
  const [form, setForm] = useState(empty);

  const createMut = useMutation({
    mutationFn: (input: typeof form) => createFn({ data: input }),
    onSuccess: () => {
      toast.success("Página criada");
      setOpen(false);
      setForm(empty);
      qc.invalidateQueries({ queryKey: ["admin", "pages"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const statusMut = useMutation({
    mutationFn: (vars: { id: string; status: PageStatus }) => statusFn({ data: vars }),
    onSuccess: () => {
      toast.success("Status atualizado");
      qc.invalidateQueries({ queryKey: ["admin", "pages"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Páginas</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            CMS unificado: páginas institucionais, landing pages, posts e páginas de produto.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Nova página</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nova página</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>Produto</Label>
                <Select value={form.product_id} onValueChange={(v) => setForm({ ...form, product_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {products?.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="title">Título</Label>
                <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="slug">Slug (opcional)</Label>
                <Input id="slug" value={form.slug} placeholder="auto" onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea id="excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Tipo</Label>
                  <Select value={form.content_type} onValueChange={(v) => setForm({ ...form, content_type: v as ContentType })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page">Página</SelectItem>
                      <SelectItem value="landing">Landing</SelectItem>
                      <SelectItem value="blog_post">Post de blog</SelectItem>
                      <SelectItem value="product_page">Página de produto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as PageStatus })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Rascunho</SelectItem>
                      <SelectItem value="published">Publicado</SelectItem>
                      <SelectItem value="archived">Arquivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button
                disabled={!form.title || !form.product_id || createMut.isPending}
                onClick={() => createMut.mutate(form)}
              >
                {createMut.isPending ? "Criando..." : "Criar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <div className="flex flex-wrap gap-3">
        <div className="min-w-[220px]">
          <Label className="text-xs text-muted-foreground">Produto</Label>
          <Select value={filterProduct} onValueChange={setFilterProduct}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {products?.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-[180px]">
          <Label className="text-xs text-muted-foreground">Tipo</Label>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="page">Página</SelectItem>
              <SelectItem value="landing">Landing</SelectItem>
              <SelectItem value="blog_post">Post de blog</SelectItem>
              <SelectItem value="product_page">Página de produto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Atualizado</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">Carregando...</TableCell></TableRow>
            )}
            {!isLoading && data?.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">Nenhuma página.</TableCell></TableRow>
            )}
            {data?.map((p: PageRow) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell className="text-muted-foreground">{p.slug}</TableCell>
                <TableCell className="uppercase text-xs">{p.content_type}</TableCell>
                <TableCell>
                  <Badge variant={p.status === "published" ? "default" : "secondary"}>{p.status}</Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(p.updated_at).toLocaleString("pt-BR")}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button asChild size="sm" variant="outline">
                    <Link to="/admin/paginas/$id" params={{ id: p.id }}>Editar</Link>
                  </Button>
                  {p.status !== "published" && (
                    <Button size="sm" disabled={statusMut.isPending}
                      onClick={() => statusMut.mutate({ id: p.id, status: "published" })}>
                      Publicar
                    </Button>
                  )}
                  {p.status === "published" && (
                    <Button size="sm" variant="secondary" disabled={statusMut.isPending}
                      onClick={() => statusMut.mutate({ id: p.id, status: "draft" })}>
                      Despublicar
                    </Button>
                  )}
                  {p.status !== "archived" && (
                    <Button size="sm" variant="ghost" disabled={statusMut.isPending}
                      onClick={() => statusMut.mutate({ id: p.id, status: "archived" })}>
                      Arquivar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

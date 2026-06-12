import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getPage, updatePage, setPageStatus, type ContentType, type PageStatus } from "@/lib/admin/pages.functions";

export const Route = createFileRoute("/_authenticated/admin/paginas/$id")({
  head: () => ({ meta: [{ title: "Editar página — VSMS Admin" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: EditPage,
});

function EditPage() {
  const { id } = Route.useParams();
  const router = useRouter();
  const qc = useQueryClient();
  const getFn = useServerFn(getPage);
  const updateFn = useServerFn(updatePage);
  const statusFn = useServerFn(setPageStatus);

  const { data: page, isLoading } = useQuery({
    queryKey: ["admin", "page", id],
    queryFn: () => getFn({ data: { id } }),
  });

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content_type: "page" as ContentType,
    template: "default",
    contentText: "",
    tags: "",
    categories: "",
    seo_title: "",
    seo_description: "",
    og_image_url: "",
  });

  useEffect(() => {
    if (!page) return;
    setForm({
      title: page.title ?? "",
      slug: page.slug ?? "",
      excerpt: page.excerpt ?? "",
      content_type: (page.content_type ?? "page") as ContentType,
      template: page.template ?? "default",
      contentText: typeof page.content === "string" ? page.content : JSON.stringify(page.content ?? {}, null, 2),
      tags: (page.tags ?? []).join(", "),
      categories: (page.categories ?? []).join(", "),
      seo_title: page.seo_title ?? "",
      seo_description: page.seo_description ?? "",
      og_image_url: page.og_image_url ?? "",
    });
  }, [page]);

  const saveMut = useMutation({
    mutationFn: () => {
      let content: unknown = {};
      try { content = form.contentText ? JSON.parse(form.contentText) : {}; }
      catch { throw new Error("Conteúdo deve ser JSON válido"); }
      return updateFn({
        data: {
          id,
          title: form.title,
          slug: form.slug,
          excerpt: form.excerpt,
          content,
          content_type: form.content_type,
          template: form.template,
          tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
          categories: form.categories.split(",").map((s) => s.trim()).filter(Boolean),
          seo_title: form.seo_title,
          seo_description: form.seo_description,
          og_image_url: form.og_image_url,
        },
      });
    },
    onSuccess: () => {
      toast.success("Página salva");
      qc.invalidateQueries({ queryKey: ["admin", "page", id] });
      qc.invalidateQueries({ queryKey: ["admin", "pages"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const statusMut = useMutation({
    mutationFn: (status: PageStatus) => statusFn({ data: { id, status } }),
    onSuccess: () => {
      toast.success("Status atualizado");
      qc.invalidateQueries({ queryKey: ["admin", "page", id] });
      qc.invalidateQueries({ queryKey: ["admin", "pages"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <div className="mx-auto max-w-4xl text-sm text-muted-foreground">Carregando...</div>;
  if (!page) return <div className="mx-auto max-w-4xl text-sm text-muted-foreground">Página não encontrada.</div>;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link to="/admin/paginas" className="text-xs text-muted-foreground hover:underline">← Voltar</Link>
          <h1 className="font-display text-2xl font-bold">{page.title}</h1>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant={page.status === "published" ? "default" : "secondary"}>{page.status}</Badge>
            <span>Atualizado em {new Date(page.updated_at).toLocaleString("pt-BR")}</span>
          </div>
        </div>
        <div className="flex gap-2">
          {page.status !== "published" && (
            <Button onClick={() => statusMut.mutate("published")} disabled={statusMut.isPending}>Publicar</Button>
          )}
          {page.status === "published" && (
            <Button variant="secondary" onClick={() => statusMut.mutate("draft")} disabled={statusMut.isPending}>Despublicar</Button>
          )}
          {page.status !== "archived" && (
            <Button variant="ghost" onClick={() => statusMut.mutate("archived")} disabled={statusMut.isPending}>Arquivar</Button>
          )}
        </div>
      </header>

      <section className="grid gap-4 rounded-xl border border-border bg-card p-5">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </div>
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
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="template">Template</Label>
            <Input id="template" value={form.template} onChange={(e) => setForm({ ...form, template: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="tags">Tags (vírgula)</Label>
            <Input id="tags" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          </div>
        </div>
        <div>
          <Label htmlFor="cats">Categorias (vírgula)</Label>
          <Input id="cats" value={form.categories} onChange={(e) => setForm({ ...form, categories: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="excerpt">Resumo</Label>
          <Textarea id="excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="content">Conteúdo (JSON)</Label>
          <Textarea id="content" rows={10} className="font-mono text-xs"
            value={form.contentText} onChange={(e) => setForm({ ...form, contentText: e.target.value })} />
          <p className="mt-1 text-xs text-muted-foreground">Estrutura livre. Preparado para blocos, rich text e templates customizados.</p>
        </div>
      </section>

      <section className="grid gap-4 rounded-xl border border-border bg-card p-5">
        <h2 className="font-semibold">SEO</h2>
        <div>
          <Label htmlFor="seo_title">SEO title (≤60)</Label>
          <Input id="seo_title" maxLength={60} value={form.seo_title} onChange={(e) => setForm({ ...form, seo_title: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="seo_desc">SEO description (≤160)</Label>
          <Textarea id="seo_desc" maxLength={160} value={form.seo_description}
            onChange={(e) => setForm({ ...form, seo_description: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="og">OG image URL</Label>
          <Input id="og" value={form.og_image_url} onChange={(e) => setForm({ ...form, og_image_url: e.target.value })} />
        </div>
        <p className="text-xs text-muted-foreground">
          Metadados extras (canonical, JSON-LD, noindex) usam a tabela <code>seo_meta</code> polimórfica e serão expostos no módulo SEO.
        </p>
      </section>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.history.back()}>Cancelar</Button>
        <Button onClick={() => saveMut.mutate()} disabled={saveMut.isPending}>
          {saveMut.isPending ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
}

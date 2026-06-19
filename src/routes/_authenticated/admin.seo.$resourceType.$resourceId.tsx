import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  getSeoByResource, upsertSeo, deleteSeo, type SeoResourceType,
} from "@/lib/admin/seo.functions";

export const Route = createFileRoute("/_authenticated/admin/seo/$resourceType/$resourceId")({
  head: () => ({ meta: [{ title: "Editar SEO — VSMS Admin" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: SeoEditor,
});

const empty = {
  title: "", description: "", canonical_url: "",
  og_title: "", og_description: "", og_image_url: "",
  robots: "", schema_type: "", json_ld: "",
  noindex: false, nofollow: false,
};

function SeoEditor() {
  const { resourceType, resourceId } = Route.useParams();
  const router = useRouter();
  const qc = useQueryClient();
  const getFn = useServerFn(getSeoByResource);
  const upsertFn = useServerFn(upsertSeo);
  const delFn = useServerFn(deleteSeo);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "seo", resourceType, resourceId],
    queryFn: () => getFn({ data: { resource_type: resourceType as SeoResourceType, resource_id: resourceId } }),
  });

  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title ?? "",
        description: data.description ?? "",
        canonical_url: data.canonical_url ?? "",
        og_title: data.og_title ?? "",
        og_description: data.og_description ?? "",
        og_image_url: data.og_image_url ?? "",
        robots: data.robots ?? "",
        schema_type: data.schema_type ?? "",
        json_ld: data.json_ld ? JSON.stringify(data.json_ld, null, 2) : "",
        noindex: !!data.noindex,
        nofollow: !!data.nofollow,
      });
    }
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      let json_ld: unknown = null;
      if (form.json_ld.trim()) {
        try { json_ld = JSON.parse(form.json_ld); }
        catch { throw new Error("JSON-LD inválido"); }
      }
      return upsertFn({
        data: {
          resource_type: resourceType as SeoResourceType,
          resource_id: resourceId,
          title: form.title || null,
          description: form.description || null,
          canonical_url: form.canonical_url || null,
          og_title: form.og_title || null,
          og_description: form.og_description || null,
          og_image_url: form.og_image_url || null,
          robots: form.robots || null,
          schema_type: form.schema_type || null,
          noindex: form.noindex,
          nofollow: form.nofollow,
          json_ld,
        },
      });
    },
    onSuccess: () => {
      toast.success("SEO salvo");
      qc.invalidateQueries({ queryKey: ["admin", "seo"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: () => {
      if (!data?.id) throw new Error("Nada a remover");
      return delFn({ data: { id: data.id } });
    },
    onSuccess: () => {
      toast.success("SEO removido");
      qc.invalidateQueries({ queryKey: ["admin", "seo"] });
      router.navigate({ to: "/admin/seo" });
    },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">Carregando...</p>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Editar SEO</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {resourceType} · {resourceId}
          </p>
        </div>
        <Button variant="outline" onClick={() => router.navigate({ to: "/admin/seo" })}>Voltar</Button>
      </header>

      <Card>
        <CardHeader><CardTitle className="text-base">Metadados</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Field label="SEO Title">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} maxLength={70} />
            <Hint>{form.title.length}/70</Hint>
          </Field>
          <Field label="Meta Description">
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} maxLength={180} rows={3} />
            <Hint>{form.description.length}/180</Hint>
          </Field>
          <Field label="Canonical URL">
            <Input value={form.canonical_url} onChange={(e) => setForm({ ...form, canonical_url: e.target.value })} placeholder="https://..." />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Open Graph</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Field label="OG Title">
            <Input value={form.og_title} onChange={(e) => setForm({ ...form, og_title: e.target.value })} />
          </Field>
          <Field label="OG Description">
            <Textarea value={form.og_description} onChange={(e) => setForm({ ...form, og_description: e.target.value })} rows={3} />
          </Field>
          <Field label="OG Image URL">
            <Input value={form.og_image_url} onChange={(e) => setForm({ ...form, og_image_url: e.target.value })} placeholder="https://..." />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Indexação</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Field label="Robots (livre)">
            <Input value={form.robots} onChange={(e) => setForm({ ...form, robots: e.target.value })} placeholder="index,follow" />
          </Field>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={form.noindex} onCheckedChange={(v) => setForm({ ...form, noindex: v })} />
              Noindex
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={form.nofollow} onCheckedChange={(v) => setForm({ ...form, nofollow: v })} />
              Nofollow
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Dados Estruturados</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Field label="Schema Type">
            <Input value={form.schema_type} onChange={(e) => setForm({ ...form, schema_type: e.target.value })} placeholder="Article, Product, FAQPage..." />
          </Field>
          <Field label="JSON-LD (objeto)">
            <Textarea
              value={form.json_ld}
              onChange={(e) => setForm({ ...form, json_ld: e.target.value })}
              rows={8}
              className="font-mono text-xs"
              placeholder='{"@context":"https://schema.org",...}'
            />
          </Field>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="destructive" onClick={() => remove.mutate()} disabled={!data?.id || remove.isPending}>
          Remover
        </Button>
        <Button onClick={() => save.mutate()} disabled={save.isPending}>
          {save.isPending ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
function Hint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground">{children}</p>;
}

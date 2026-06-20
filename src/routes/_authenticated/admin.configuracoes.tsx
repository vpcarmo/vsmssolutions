import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { getSiteConfig, updateSiteSetting, SITE_DEFAULTS, type SiteKey, type SiteValue } from "@/lib/site/site.functions";

export const Route = createFileRoute("/_authenticated/admin/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — VSMS Admin" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: Configuracoes,
});

function Configuracoes() {
  const qc = useQueryClient();
  const get = useServerFn(getSiteConfig);
  const upd = useServerFn(updateSiteSetting);

  const { data, isLoading } = useQuery({
    queryKey: ["site-config"],
    queryFn: () => get(),
  });

  const mutation = useMutation({
    mutationFn: (input: { key: SiteKey; value: SiteValue }) => upd({ data: input }),
    onSuccess: (_r, vars) => {
      toast.success(`Configuração ${vars.key} atualizada.`);
      qc.invalidateQueries({ queryKey: ["site-config"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Falha ao salvar"),
  });

  if (isLoading || !data) return <div className="text-sm text-muted-foreground">Carregando…</div>;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Configurações institucionais</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Dados globais do site: marca, navegação, footer, redes sociais e contato.
          Conteúdo editorial (páginas, hero, seções) é editado em <code className="rounded bg-muted px-1">Páginas</code>.
        </p>
      </div>

      <Tabs defaultValue="brand">
        <TabsList className="flex-wrap">
          <TabsTrigger value="brand">Marca</TabsTrigger>
          <TabsTrigger value="navigation">Navegação</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="social">Redes sociais</TabsTrigger>
          <TabsTrigger value="contact">Contato</TabsTrigger>
        </TabsList>

        <TabsContent value="brand" className="space-y-4">
          <BrandForm value={data["site.brand"]} onSave={(v) => mutation.mutate({ key: "site.brand", value: v })} pending={mutation.isPending} />
        </TabsContent>
        <TabsContent value="navigation">
          <JsonForm
            label="Navegação (itens do menu + CTA)"
            value={data["site.navigation"]}
            defaults={SITE_DEFAULTS["site.navigation"]}
            onSave={(v) => mutation.mutate({ key: "site.navigation", value: v })}
            pending={mutation.isPending}
            hint='Formato: { "items": [{ "label": "...", "to": "/..." }], "cta": { "label": "...", "to": "/..." } }'
          />
        </TabsContent>
        <TabsContent value="footer">
          <JsonForm
            label="Footer (descrição, colunas, copyright)"
            value={data["site.footer"]}
            defaults={SITE_DEFAULTS["site.footer"]}
            onSave={(v) => mutation.mutate({ key: "site.footer", value: v })}
            pending={mutation.isPending}
            hint='Formato: { "description": "...", "columns": [{ "title": "...", "links": [{ "label": "...", "to": "/..." }] }], "copyright": "..." }'
          />
        </TabsContent>
        <TabsContent value="social">
          <SocialForm value={data["site.social"]} onSave={(v) => mutation.mutate({ key: "site.social", value: v })} pending={mutation.isPending} />
        </TabsContent>
        <TabsContent value="contact">
          <ContactForm value={data["site.contact"]} onSave={(v) => mutation.mutate({ key: "site.contact", value: v })} pending={mutation.isPending} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-border bg-card p-6 space-y-4">{children}</div>;
}

function BrandForm({ value, onSave, pending }: { value: SiteValue; onSave: (v: SiteValue) => void; pending: boolean }) {
  const [name, setName] = useState(value.name ?? "");
  const [tagline, setTagline] = useState(value.tagline ?? "");
  const [logo, setLogo] = useState(value.logo_url ?? "");
  const [favicon, setFavicon] = useState(value.favicon_url ?? "");
  useEffect(() => { setName(value.name ?? ""); setTagline(value.tagline ?? ""); setLogo(value.logo_url ?? ""); setFavicon(value.favicon_url ?? ""); }, [value]);
  return (
    <Card>
      <Field label="Nome da marca"><Input value={name} onChange={(e) => setName(e.target.value)} /></Field>
      <Field label="Tagline"><Input value={tagline} onChange={(e) => setTagline(e.target.value)} /></Field>
      <Field label="URL do logo (Media Assets)"><Input value={logo} onChange={(e) => setLogo(e.target.value)} placeholder="https://…" /></Field>
      <Field label="URL do favicon"><Input value={favicon} onChange={(e) => setFavicon(e.target.value)} placeholder="https://…" /></Field>
      <Button disabled={pending} onClick={() => onSave({ name, tagline, logo_url: logo || null, favicon_url: favicon || null })}>
        {pending ? "Salvando…" : "Salvar"}
      </Button>
    </Card>
  );
}

function SocialForm({ value, onSave, pending }: { value: SiteValue; onSave: (v: SiteValue) => void; pending: boolean }) {
  const [s, setS] = useState({ linkedin: value.linkedin ?? "", github: value.github ?? "", instagram: value.instagram ?? "", twitter: value.twitter ?? "" });
  useEffect(() => { setS({ linkedin: value.linkedin ?? "", github: value.github ?? "", instagram: value.instagram ?? "", twitter: value.twitter ?? "" }); }, [value]);
  return (
    <Card>
      {(["linkedin","github","instagram","twitter"] as const).map((k) => (
        <Field key={k} label={k[0].toUpperCase()+k.slice(1)}>
          <Input value={(s as any)[k]} onChange={(e) => setS({ ...s, [k]: e.target.value })} placeholder="https://…" />
        </Field>
      ))}
      <Button disabled={pending} onClick={() => onSave(s)}>{pending ? "Salvando…" : "Salvar"}</Button>
    </Card>
  );
}

function ContactForm({ value, onSave, pending }: { value: SiteValue; onSave: (v: SiteValue) => void; pending: boolean }) {
  const [c, setC] = useState({ email: value.email ?? "", phone: value.phone ?? "", whatsapp: value.whatsapp ?? "", address: value.address ?? "" });
  useEffect(() => { setC({ email: value.email ?? "", phone: value.phone ?? "", whatsapp: value.whatsapp ?? "", address: value.address ?? "" }); }, [value]);
  return (
    <Card>
      <Field label="E-mail"><Input type="email" value={c.email} onChange={(e) => setC({ ...c, email: e.target.value })} /></Field>
      <Field label="Telefone"><Input value={c.phone} onChange={(e) => setC({ ...c, phone: e.target.value })} /></Field>
      <Field label="WhatsApp (E.164, ex: 5511900000000)"><Input value={c.whatsapp} onChange={(e) => setC({ ...c, whatsapp: e.target.value })} /></Field>
      <Field label="Endereço"><Input value={c.address} onChange={(e) => setC({ ...c, address: e.target.value })} /></Field>
      <Button disabled={pending} onClick={() => onSave(c)}>{pending ? "Salvando…" : "Salvar"}</Button>
    </Card>
  );
}

function JsonForm({ value, defaults, onSave, pending, label, hint }: { value: SiteValue; defaults: SiteValue; onSave: (v: SiteValue) => void; pending: boolean; label: string; hint?: string }) {
  const [text, setText] = useState(() => JSON.stringify(value, null, 2));
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => { setText(JSON.stringify(value, null, 2)); }, [value]);
  function save() {
    try {
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== "object") throw new Error("JSON deve ser um objeto");
      setErr(null);
      onSave(parsed);
    } catch (e: any) {
      setErr(e?.message ?? "JSON inválido");
    }
  }
  return (
    <Card>
      <Field label={label}>
        <Textarea rows={18} value={text} onChange={(e) => setText(e.target.value)} className="font-mono text-xs" />
      </Field>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {err && <p className="text-xs text-destructive">{err}</p>}
      <div className="flex gap-2">
        <Button disabled={pending} onClick={save}>{pending ? "Salvando…" : "Salvar"}</Button>
        <Button variant="outline" onClick={() => setText(JSON.stringify(defaults, null, 2))}>Restaurar padrão</Button>
      </div>
    </Card>
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

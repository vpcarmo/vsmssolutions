import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { c as cn, B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { T as Textarea } from "./textarea-F69quoCd.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as SITE_DEFAULTS, u as updateSiteSetting, a as getSiteConfig } from "./router-BkXkNhUB.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "./server-CNhjO8y8.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-pLPoR55H.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./client-CXKgXgA3.mjs";
import "../_libs/lucide-react.mjs";
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
function Configuracoes() {
  const qc = useQueryClient();
  const get = useServerFn(getSiteConfig);
  const upd = useServerFn(updateSiteSetting);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["site-config"],
    queryFn: () => get()
  });
  const mutation = useMutation({
    mutationFn: (input) => upd({
      data: input
    }),
    onSuccess: (_r, vars) => {
      toast.success(`Configuração ${vars.key} atualizada.`);
      qc.invalidateQueries({
        queryKey: ["site-config"]
      });
    },
    onError: (e) => toast.error(e?.message ?? "Falha ao salvar")
  });
  if (isLoading || !data) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Carregando…" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Configurações institucionais" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
        "Dados globais do site: marca, navegação, footer, redes sociais e contato. Conteúdo editorial (páginas, hero, seções) é editado em ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "rounded bg-muted px-1", children: "Páginas" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "brand", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "brand", children: "Marca" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "navigation", children: "Navegação" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "footer", children: "Footer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "social", children: "Redes sociais" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "contact", children: "Contato" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "brand", className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrandForm, { value: data["site.brand"], onSave: (v) => mutation.mutate({
        key: "site.brand",
        value: v
      }), pending: mutation.isPending }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "navigation", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JsonForm, { label: "Navegação (itens do menu + CTA)", value: data["site.navigation"], defaults: SITE_DEFAULTS["site.navigation"], onSave: (v) => mutation.mutate({
        key: "site.navigation",
        value: v
      }), pending: mutation.isPending, hint: 'Formato: { "items": [{ "label": "...", "to": "/..." }], "cta": { "label": "...", "to": "/..." } }' }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "footer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JsonForm, { label: "Footer (descrição, colunas, copyright)", value: data["site.footer"], defaults: SITE_DEFAULTS["site.footer"], onSave: (v) => mutation.mutate({
        key: "site.footer",
        value: v
      }), pending: mutation.isPending, hint: 'Formato: { "description": "...", "columns": [{ "title": "...", "links": [{ "label": "...", "to": "/..." }] }], "copyright": "..." }' }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "social", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocialForm, { value: data["site.social"], onSave: (v) => mutation.mutate({
        key: "site.social",
        value: v
      }), pending: mutation.isPending }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "contact", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContactForm, { value: data["site.contact"], onSave: (v) => mutation.mutate({
        key: "site.contact",
        value: v
      }), pending: mutation.isPending }) })
    ] })
  ] });
}
function Card({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card p-6 space-y-4", children });
}
function BrandForm({
  value,
  onSave,
  pending
}) {
  const [name, setName] = reactExports.useState(value.name ?? "");
  const [tagline, setTagline] = reactExports.useState(value.tagline ?? "");
  const [logo, setLogo] = reactExports.useState(value.logo_url ?? "");
  const [favicon, setFavicon] = reactExports.useState(value.favicon_url ?? "");
  reactExports.useEffect(() => {
    setName(value.name ?? "");
    setTagline(value.tagline ?? "");
    setLogo(value.logo_url ?? "");
    setFavicon(value.favicon_url ?? "");
  }, [value]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome da marca", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tagline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: tagline, onChange: (e) => setTagline(e.target.value) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "URL do logo (Media Assets)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: logo, onChange: (e) => setLogo(e.target.value), placeholder: "https://…" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "URL do favicon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: favicon, onChange: (e) => setFavicon(e.target.value), placeholder: "https://…" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: pending, onClick: () => onSave({
      name,
      tagline,
      logo_url: logo || null,
      favicon_url: favicon || null
    }), children: pending ? "Salvando…" : "Salvar" })
  ] });
}
function SocialForm({
  value,
  onSave,
  pending
}) {
  const [s, setS] = reactExports.useState({
    linkedin: value.linkedin ?? "",
    github: value.github ?? "",
    instagram: value.instagram ?? "",
    twitter: value.twitter ?? ""
  });
  reactExports.useEffect(() => {
    setS({
      linkedin: value.linkedin ?? "",
      github: value.github ?? "",
      instagram: value.instagram ?? "",
      twitter: value.twitter ?? ""
    });
  }, [value]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    ["linkedin", "github", "instagram", "twitter"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: k[0].toUpperCase() + k.slice(1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s[k], onChange: (e) => setS({
      ...s,
      [k]: e.target.value
    }), placeholder: "https://…" }) }, k)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: pending, onClick: () => onSave(s), children: pending ? "Salvando…" : "Salvar" })
  ] });
}
function ContactForm({
  value,
  onSave,
  pending
}) {
  const [c, setC] = reactExports.useState({
    email: value.email ?? "",
    phone: value.phone ?? "",
    whatsapp: value.whatsapp ?? "",
    address: value.address ?? ""
  });
  reactExports.useEffect(() => {
    setC({
      email: value.email ?? "",
      phone: value.phone ?? "",
      whatsapp: value.whatsapp ?? "",
      address: value.address ?? ""
    });
  }, [value]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "E-mail", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: c.email, onChange: (e) => setC({
      ...c,
      email: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Telefone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.phone, onChange: (e) => setC({
      ...c,
      phone: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WhatsApp (E.164, ex: 5511900000000)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.whatsapp, onChange: (e) => setC({
      ...c,
      whatsapp: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Endereço", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: c.address, onChange: (e) => setC({
      ...c,
      address: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: pending, onClick: () => onSave(c), children: pending ? "Salvando…" : "Salvar" })
  ] });
}
function JsonForm({
  value,
  defaults,
  onSave,
  pending,
  label,
  hint
}) {
  const [text, setText] = reactExports.useState(() => JSON.stringify(value, null, 2));
  const [err, setErr] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setText(JSON.stringify(value, null, 2));
  }, [value]);
  function save() {
    try {
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== "object") throw new Error("JSON deve ser um objeto");
      setErr(null);
      onSave(parsed);
    } catch (e) {
      setErr(e?.message ?? "JSON inválido");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 18, value: text, onChange: (e) => setText(e.target.value), className: "font-mono text-xs" }) }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: hint }),
    err && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: err }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: pending, onClick: save, children: pending ? "Salvando…" : "Salvar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setText(JSON.stringify(defaults, null, 2)), children: "Restaurar padrão" })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    children
  ] });
}
export {
  Configuracoes as component
};

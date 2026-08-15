import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { B as Button, c as cn } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { T as Textarea } from "./textarea-F69quoCd.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { g as getSeoByResource, u as upsertSeo, d as deleteSeo, C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./seo.functions-D3Uqwhjz.mjs";
import { S as Switch$1, a as SwitchThumb } from "../_libs/radix-ui__react-switch.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { e as Route } from "./router-BkXkNhUB.mjs";
import "../_libs/seroval.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "./client-CXKgXgA3.mjs";
import "../_libs/lucide-react.mjs";
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Switch$1,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchThumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Switch$1.displayName;
const empty = {
  title: "",
  description: "",
  canonical_url: "",
  og_title: "",
  og_description: "",
  og_image_url: "",
  robots: "",
  schema_type: "",
  json_ld: "",
  noindex: false,
  nofollow: false
};
function SeoEditor() {
  const {
    resourceType,
    resourceId
  } = Route.useParams();
  const router = useRouter();
  const qc = useQueryClient();
  const getFn = useServerFn(getSeoByResource);
  const upsertFn = useServerFn(upsertSeo);
  const delFn = useServerFn(deleteSeo);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin", "seo", resourceType, resourceId],
    queryFn: () => getFn({
      data: {
        resource_type: resourceType,
        resource_id: resourceId
      }
    })
  });
  const [form, setForm] = reactExports.useState(empty);
  reactExports.useEffect(() => {
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
        nofollow: !!data.nofollow
      });
    }
  }, [data]);
  const save = useMutation({
    mutationFn: async () => {
      let json_ld = null;
      if (form.json_ld.trim()) {
        try {
          json_ld = JSON.parse(form.json_ld);
        } catch {
          throw new Error("JSON-LD inválido");
        }
      }
      return upsertFn({
        data: {
          resource_type: resourceType,
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
          json_ld
        }
      });
    },
    onSuccess: () => {
      toast.success("SEO salvo");
      qc.invalidateQueries({
        queryKey: ["admin", "seo"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const remove = useMutation({
    mutationFn: () => {
      if (!data?.id) throw new Error("Nada a remover");
      return delFn({
        data: {
          id: data.id
        }
      });
    },
    onSuccess: () => {
      toast.success("SEO removido");
      qc.invalidateQueries({
        queryKey: ["admin", "seo"]
      });
      router.navigate({
        to: "/admin/seo"
      });
    },
    onError: (e) => toast.error(e.message)
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Editar SEO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
          resourceType,
          " · ",
          resourceId
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => router.navigate({
        to: "/admin/seo"
      }), children: "Voltar" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Metadados" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "SEO Title", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.title, onChange: (e) => setForm({
            ...form,
            title: e.target.value
          }), maxLength: 70 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Hint, { children: [
            form.title.length,
            "/70"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Meta Description", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.description, onChange: (e) => setForm({
            ...form,
            description: e.target.value
          }), maxLength: 180, rows: 3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Hint, { children: [
            form.description.length,
            "/180"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Canonical URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.canonical_url, onChange: (e) => setForm({
          ...form,
          canonical_url: e.target.value
        }), placeholder: "https://..." }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Open Graph" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "OG Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.og_title, onChange: (e) => setForm({
          ...form,
          og_title: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "OG Description", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.og_description, onChange: (e) => setForm({
          ...form,
          og_description: e.target.value
        }), rows: 3 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "OG Image URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.og_image_url, onChange: (e) => setForm({
          ...form,
          og_image_url: e.target.value
        }), placeholder: "https://..." }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Indexação" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Robots (livre)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.robots, onChange: (e) => setForm({
          ...form,
          robots: e.target.value
        }), placeholder: "index,follow" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: form.noindex, onCheckedChange: (v) => setForm({
              ...form,
              noindex: v
            }) }),
            "Noindex"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: form.nofollow, onCheckedChange: (v) => setForm({
              ...form,
              nofollow: v
            }) }),
            "Nofollow"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Dados Estruturados" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Schema Type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.schema_type, onChange: (e) => setForm({
          ...form,
          schema_type: e.target.value
        }), placeholder: "Article, Product, FAQPage..." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "JSON-LD (objeto)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.json_ld, onChange: (e) => setForm({
          ...form,
          json_ld: e.target.value
        }), rows: 8, className: "font-mono text-xs", placeholder: '{"@context":"https://schema.org",...}' }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", onClick: () => remove.mutate(), disabled: !data?.id || remove.isPending, children: "Remover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => save.mutate(), disabled: save.isPending, children: save.isPending ? "Salvando..." : "Salvar" })
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
function Hint({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children });
}
export {
  SeoEditor as component
};

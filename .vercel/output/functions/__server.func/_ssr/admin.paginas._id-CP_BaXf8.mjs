import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { T as Textarea } from "./textarea-F69quoCd.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { B as Badge } from "./badge-YM7oB01y.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CUSP6kj8.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as getPage, u as updatePage, s as setPageStatus } from "./pages.functions-DpBtS5Na.mjs";
import { b as Route$4 } from "./router-CPmUjF1E.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/tslib.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/lucide-react.mjs";
import "./server-DfH1wd4N.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-MXl0BiEw.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./client-BHmQHd0X.mjs";
function EditPage() {
  const {
    id
  } = Route$4.useParams();
  const router = useRouter();
  const qc = useQueryClient();
  const getFn = useServerFn(getPage);
  const updateFn = useServerFn(updatePage);
  const statusFn = useServerFn(setPageStatus);
  const {
    data: page,
    isLoading
  } = useQuery({
    queryKey: ["admin", "page", id],
    queryFn: () => getFn({
      data: {
        id
      }
    })
  });
  const [form, setForm] = reactExports.useState({
    title: "",
    slug: "",
    excerpt: "",
    content_type: "page",
    template: "default",
    contentText: "",
    tags: "",
    categories: "",
    seo_title: "",
    seo_description: "",
    og_image_url: ""
  });
  reactExports.useEffect(() => {
    if (!page) return;
    setForm({
      title: page.title ?? "",
      slug: page.slug ?? "",
      excerpt: page.excerpt ?? "",
      content_type: page.content_type ?? "page",
      template: page.template ?? "default",
      contentText: typeof page.content === "string" ? page.content : JSON.stringify(page.content ?? {}, null, 2),
      tags: (page.tags ?? []).join(", "),
      categories: (page.categories ?? []).join(", "),
      seo_title: page.seo_title ?? "",
      seo_description: page.seo_description ?? "",
      og_image_url: page.og_image_url ?? ""
    });
  }, [page]);
  const saveMut = useMutation({
    mutationFn: () => {
      let content = {};
      try {
        content = form.contentText ? JSON.parse(form.contentText) : {};
      } catch {
        throw new Error("Conteúdo deve ser JSON válido");
      }
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
          og_image_url: form.og_image_url
        }
      });
    },
    onSuccess: () => {
      toast.success("Página salva");
      qc.invalidateQueries({
        queryKey: ["admin", "page", id]
      });
      qc.invalidateQueries({
        queryKey: ["admin", "pages"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const statusMut = useMutation({
    mutationFn: (status) => statusFn({
      data: {
        id,
        status
      }
    }),
    onSuccess: () => {
      toast.success("Status atualizado");
      qc.invalidateQueries({
        queryKey: ["admin", "page", id]
      });
      qc.invalidateQueries({
        queryKey: ["admin", "pages"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl text-sm text-muted-foreground", children: "Carregando..." });
  if (!page) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl text-sm text-muted-foreground", children: "Página não encontrada." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/paginas", className: "text-xs text-muted-foreground hover:underline", children: "← Voltar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: page.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: page.status === "published" ? "default" : "secondary", children: page.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Atualizado em ",
            new Date(page.updated_at).toLocaleString("pt-BR")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        page.status !== "published" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => statusMut.mutate("published"), disabled: statusMut.isPending, children: "Publicar" }),
        page.status === "published" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", onClick: () => statusMut.mutate("draft"), disabled: statusMut.isPending, children: "Despublicar" }),
        page.status !== "archived" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => statusMut.mutate("archived"), disabled: statusMut.isPending, children: "Arquivar" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 rounded-xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Título" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "title", value: form.title, onChange: (e) => setForm({
          ...form,
          title: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "slug", children: "Slug" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "slug", value: form.slug, onChange: (e) => setForm({
            ...form,
            slug: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tipo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.content_type, onValueChange: (v) => setForm({
            ...form,
            content_type: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "page", children: "Página" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "landing", children: "Landing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "blog_post", children: "Post de blog" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "product_page", children: "Página de produto" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "template", children: "Template" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "template", value: form.template, onChange: (e) => setForm({
            ...form,
            template: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tags", children: "Tags (vírgula)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "tags", value: form.tags, onChange: (e) => setForm({
            ...form,
            tags: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cats", children: "Categorias (vírgula)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "cats", value: form.categories, onChange: (e) => setForm({
          ...form,
          categories: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "excerpt", children: "Resumo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "excerpt", value: form.excerpt, onChange: (e) => setForm({
          ...form,
          excerpt: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "content", children: "Conteúdo (JSON)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "content", rows: 10, className: "font-mono text-xs", value: form.contentText, onChange: (e) => setForm({
          ...form,
          contentText: e.target.value
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Estrutura livre. Preparado para blocos, rich text e templates customizados." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 rounded-xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "SEO" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo_title", children: "SEO title (≤60)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "seo_title", maxLength: 60, value: form.seo_title, onChange: (e) => setForm({
          ...form,
          seo_title: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo_desc", children: "SEO description (≤160)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "seo_desc", maxLength: 160, value: form.seo_description, onChange: (e) => setForm({
          ...form,
          seo_description: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "og", children: "OG image URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "og", value: form.og_image_url, onChange: (e) => setForm({
          ...form,
          og_image_url: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Para canonical, Open Graph completo, robots, JSON-LD e schema type use o módulo SEO polimórfico." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "w-fit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/seo/$resourceType/$resourceId", params: {
        resourceType: "page",
        resourceId: id
      }, children: "Abrir SEO avançado" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => router.history.back(), children: "Cancelar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => saveMut.mutate(), disabled: saveMut.isPending, children: saveMut.isPending ? "Salvando..." : "Salvar" })
    ] })
  ] });
}
export {
  EditPage as component
};

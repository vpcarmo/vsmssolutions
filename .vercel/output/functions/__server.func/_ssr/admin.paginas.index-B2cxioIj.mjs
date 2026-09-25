import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { T as Textarea } from "./textarea-F69quoCd.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-BEJZgbql.mjs";
import { B as Badge } from "./badge-YM7oB01y.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CUSP6kj8.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-D_KwyCuk.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { l as listPages, c as createPage, s as setPageStatus } from "./pages.functions-DpBtS5Na.mjs";
import { l as listProducts } from "./products.functions-DH8OlJ0I.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/tslib.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./router-CPmUjF1E.mjs";
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
function PaginasPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listPages);
  const productsFn = useServerFn(listProducts);
  const createFn = useServerFn(createPage);
  const statusFn = useServerFn(setPageStatus);
  const [filterProduct, setFilterProduct] = reactExports.useState("all");
  const [filterType, setFilterType] = reactExports.useState("all");
  const {
    data: products
  } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => productsFn({
      data: void 0
    })
  });
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin", "pages", filterProduct, filterType],
    queryFn: () => listFn({
      data: {
        product_id: filterProduct === "all" ? void 0 : filterProduct,
        content_type: filterType === "all" ? void 0 : filterType
      }
    })
  });
  const [open, setOpen] = reactExports.useState(false);
  const empty = {
    product_id: "",
    title: "",
    slug: "",
    excerpt: "",
    content_type: "page",
    status: "draft"
  };
  const [form, setForm] = reactExports.useState(empty);
  const createMut = useMutation({
    mutationFn: (input) => createFn({
      data: input
    }),
    onSuccess: () => {
      toast.success("Página criada");
      setOpen(false);
      setForm(empty);
      qc.invalidateQueries({
        queryKey: ["admin", "pages"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const statusMut = useMutation({
    mutationFn: (vars) => statusFn({
      data: vars
    }),
    onSuccess: () => {
      toast.success("Status atualizado");
      qc.invalidateQueries({
        queryKey: ["admin", "pages"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Páginas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "CMS unificado: páginas institucionais, landing pages, posts e páginas de produto." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Nova página" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Nova página" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Produto" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.product_id, onValueChange: (v) => setForm({
                ...form,
                product_id: v
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecione" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: products?.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.id, children: p.name }, p.id)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Título" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "title", value: form.title, onChange: (e) => setForm({
                ...form,
                title: e.target.value
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "slug", children: "Slug (opcional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "slug", value: form.slug, placeholder: "auto", onChange: (e) => setForm({
                ...form,
                slug: e.target.value
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "excerpt", children: "Resumo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "excerpt", value: form.excerpt, onChange: (e) => setForm({
                ...form,
                excerpt: e.target.value
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
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
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.status, onValueChange: (v) => setForm({
                  ...form,
                  status: v
                }), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "draft", children: "Rascunho" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "published", children: "Publicado" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "archived", children: "Arquivado" })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: !form.title || !form.product_id || createMut.isPending, onClick: () => createMut.mutate(form), children: createMut.isPending ? "Criando..." : "Criar" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[220px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Produto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterProduct, onValueChange: setFilterProduct, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Todos" }),
            products?.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.id, children: p.name }, p.id))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[180px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Tipo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterType, onValueChange: setFilterType, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Todos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "page", children: "Página" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "landing", children: "Landing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "blog_post", children: "Post de blog" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "product_page", children: "Página de produto" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Título" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Slug" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tipo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Atualizado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Ações" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-center text-muted-foreground", children: "Carregando..." }) }),
        !isLoading && data?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-center text-muted-foreground", children: "Nenhuma página." }) }),
        data?.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: p.slug }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "uppercase text-xs", children: p.content_type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: p.status === "published" ? "default" : "secondary", children: p.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: new Date(p.updated_at).toLocaleString("pt-BR") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/paginas/$id", params: {
              id: p.id
            }, children: "Editar" }) }),
            p.status !== "published" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", disabled: statusMut.isPending, onClick: () => statusMut.mutate({
              id: p.id,
              status: "published"
            }), children: "Publicar" }),
            p.status === "published" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "secondary", disabled: statusMut.isPending, onClick: () => statusMut.mutate({
              id: p.id,
              status: "draft"
            }), children: "Despublicar" }),
            p.status !== "archived" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", disabled: statusMut.isPending, onClick: () => statusMut.mutate({
              id: p.id,
              status: "archived"
            }), children: "Arquivar" })
          ] })
        ] }, p.id))
      ] })
    ] }) })
  ] });
}
export {
  PaginasPage as component
};

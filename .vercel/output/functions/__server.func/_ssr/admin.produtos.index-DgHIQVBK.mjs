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
import { l as listProducts, c as createProduct, s as setProductStatus } from "./products.functions-CrgXjNzN.mjs";
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
import "tslib";
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
import "./router-DrCA9Lcc.mjs";
import "./server-BxRkUJzR.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-Db3P2fQk.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./client-CH6WUO7d.mjs";
function ProdutosPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listProducts);
  const createFn = useServerFn(createProduct);
  const toggleFn = useServerFn(setProductStatus);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => listFn({
      data: void 0
    })
  });
  const [open, setOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    name: "",
    slug: "",
    description: "",
    type: "saas",
    status: "active",
    primary_domain: ""
  });
  const createMut = useMutation({
    mutationFn: (input) => createFn({
      data: input
    }),
    onSuccess: () => {
      toast.success("Produto criado");
      setOpen(false);
      setForm({
        name: "",
        slug: "",
        description: "",
        type: "saas",
        status: "active",
        primary_domain: ""
      });
      qc.invalidateQueries({
        queryKey: ["admin", "products"]
      });
      qc.invalidateQueries({
        queryKey: ["admin-overview"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const toggleMut = useMutation({
    mutationFn: (vars) => toggleFn({
      data: vars
    }),
    onSuccess: () => {
      toast.success("Status atualizado");
      qc.invalidateQueries({
        queryKey: ["admin", "products"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Produtos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Entidade central do ecossistema multi-produto da VSMS." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Novo produto" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Novo produto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Nome" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", value: form.name, onChange: (e) => setForm({
                ...form,
                name: e.target.value
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Descrição" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "description", value: form.description, onChange: (e) => setForm({
                ...form,
                description: e.target.value
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tipo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.type, onValueChange: (v) => setForm({
                  ...form,
                  type: v
                }), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "site", children: "Site" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "saas", children: "SaaS" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ia_app", children: "App de IA" })
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Ativo" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inactive", children: "Inativo" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "archived", children: "Arquivado" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "domain", children: "Domínio principal (opcional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "domain", value: form.primary_domain, placeholder: "exemplo.com.br", onChange: (e) => setForm({
                ...form,
                primary_domain: e.target.value
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: !form.name || createMut.isPending, onClick: () => createMut.mutate(form), children: createMut.isPending ? "Criando..." : "Criar" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nome" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Slug" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tipo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Domínio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Ações" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-center text-muted-foreground", children: "Carregando..." }) }),
        !isLoading && data?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-center text-muted-foreground", children: "Nenhum produto." }) }),
        data?.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: p.slug }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "uppercase text-xs", children: p.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: p.status === "active" ? "default" : "secondary", children: p.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: p.primary_domain ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/produtos/$id", params: {
              id: p.id
            }, children: "Editar" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: p.status === "active" ? "secondary" : "default", disabled: toggleMut.isPending, onClick: () => toggleMut.mutate({
              id: p.id,
              status: p.status === "active" ? "inactive" : "active"
            }), children: p.status === "active" ? "Desativar" : "Ativar" })
          ] })
        ] }, p.id))
      ] })
    ] }) })
  ] });
}
export {
  ProdutosPage as component
};

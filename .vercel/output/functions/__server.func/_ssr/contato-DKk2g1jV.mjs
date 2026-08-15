import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as getPublicPage, a as getSiteConfig, c as createSsrRpc } from "./router-DrCA9Lcc.mjs";
import { c as createServerFn } from "./server-BxRkUJzR.mjs";
import "../_libs/seroval.mjs";
import { C as CircleCheck, c as Send, a as Mail, d as MessageCircle, P as Phone, e as MapPin } from "../_libs/lucide-react.mjs";
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
import "./auth-middleware-Db3P2fQk.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./client-CH6WUO7d.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function clean(v, max) {
  return String(v ?? "").trim().slice(0, max);
}
const submitContact = createServerFn({
  method: "POST"
}).inputValidator((d) => {
  const name = clean(d?.name, 120);
  const email = clean(d?.email, 200).toLowerCase();
  const subject = clean(d?.subject, 60);
  const message = clean(d?.message, 2e3);
  const company = clean(d?.company, 120);
  const phone = clean(d?.phone, 40);
  if (name.length < 2) throw new Error("Informe seu nome");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("E-mail inválido");
  if (message.length < 5) throw new Error("Mensagem muito curta");
  if (!subject) throw new Error("Selecione um assunto");
  return {
    name,
    email,
    subject,
    message,
    company,
    phone
  };
}).handler(createSsrRpc("d796f444f48ba591a3c6a5dd9c4139d4d3f8db582430ca41b5f8533331fa78ec"));
function Contato() {
  const [sent, setSent] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const {
    data: page
  } = useQuery({
    queryKey: ["page", "contato"],
    queryFn: () => getPublicPage({
      data: {
        slug: "contato"
      }
    }),
    staleTime: 6e4
  });
  const {
    data: cfg
  } = useQuery({
    queryKey: ["site-config"],
    queryFn: () => getSiteConfig(),
    staleTime: 5 * 6e4
  });
  const contact = cfg?.["site.contact"] ?? {};
  const title = page?.title ?? "Vamos conversar";
  const intro = page?.excerpt ?? "Quer adotar um produto VSMS, integrar nossas plataformas ou tirar dúvidas? Respondemos em até 1 dia útil.";
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      await submitContact({
        data: {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          company: String(fd.get("company") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          subject: String(fd.get("subject") ?? ""),
          message: String(fd.get("message") ?? "")
        }
      });
      setSent(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-4xl px-6 py-24 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary", children: "Contato" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-4xl font-bold md:text-6xl", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-2xl text-muted-foreground", children: intro })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-6xl px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3 rounded-2xl border border-border bg-card p-6 md:p-8", children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-12 w-12 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: "Mensagem enviada" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm text-muted-foreground", children: "Recebemos seu contato. Vamos responder em até 1 dia útil." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSent(false), className: "mt-3 text-sm text-primary hover:underline", children: "Enviar outra mensagem" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", noValidate: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "name", label: "Nome", required: true, maxLength: 120, autoComplete: "name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "email", label: "E-mail", type: "email", required: true, maxLength: 200, autoComplete: "email" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "company", label: "Empresa", maxLength: 120, autoComplete: "organization" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "phone", label: "Telefone / WhatsApp", type: "tel", maxLength: 40, autoComplete: "tel" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "subject", className: "text-sm font-medium", children: [
            "Sobre o que você quer falar?",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-0.5 text-primary", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "subject", name: "subject", required: true, defaultValue: "", className: "mt-1.5 block w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "Selecione um assunto" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "produto", children: "Quero usar um produto VSMS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "implantacao", children: "Implantação / integração" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "parceria", children: "Parceria comercial" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "suporte", children: "Suporte a cliente atual" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "outro", children: "Outro assunto" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "message", className: "text-sm font-medium", children: "Como podemos ajudar?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "message", name: "message", required: true, rows: 5, maxLength: 2e3, className: "mt-1.5 block w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30" })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: loading, className: "inline-flex items-center gap-2 rounded-md bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground shadow-glow disabled:opacity-60", children: [
          loading ? "Enviando..." : "Enviar mensagem",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:col-span-2 flex flex-col gap-4", children: [
        contact.email && /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { icon: Mail, title: "E-mail", value: contact.email, href: `mailto:${contact.email}` }),
        contact.whatsapp && /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { icon: MessageCircle, title: "WhatsApp", value: contact.whatsapp, href: `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}` }),
        contact.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { icon: Phone, title: "Telefone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` }),
        contact.address && /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { icon: MapPin, title: "Endereço", value: contact.address })
      ] })
    ] }) })
  ] });
}
function Field({
  id,
  label,
  type = "text",
  required,
  maxLength,
  autoComplete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: id, className: "text-sm font-medium", children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-0.5 text-primary", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id, name: id, type, required, maxLength, autoComplete, className: "mt-1.5 block w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30" })
  ] });
}
function ContactCard({
  icon: Icon,
  title,
  value,
  href
}) {
  const Inner = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-brand text-brand-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-sm font-medium", children: value })
    ] })
  ] });
  return href ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, target: href.startsWith("http") ? "_blank" : void 0, rel: "noopener noreferrer", children: Inner }) : Inner;
}
export {
  Contato as component
};

import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, b as useRouterState, O as Outlet, H as HeadContent, S as Scripts, d as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { S as redirect, T as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as TSS_SERVER_FUNCTION, c as createServerFn, g as getServerFnById } from "./server-CNhjO8y8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-pLPoR55H.mjs";
import { s as supabase } from "./client-CXKgXgA3.mjs";
import { X, M as Menu, L as Linkedin, G as Github, I as Instagram, a as Mail } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-BA8bXJlb.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const logoAsset = "/assets/logo-ORU31MuK.png";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const SITE_KEYS = ["site.brand", "site.navigation", "site.footer", "site.social", "site.contact"];
const SITE_DEFAULTS = {
  "site.brand": {
    name: "VSMS Solutions",
    logo_url: null
  },
  "site.navigation": {
    items: [{
      label: "Início",
      to: "/"
    }, {
      label: "Produtos",
      to: "/produtos"
    }, {
      label: "Serviços",
      to: "/servicos"
    }, {
      label: "Sobre",
      to: "/sobre"
    }, {
      label: "Cases",
      to: "/portfolio"
    }, {
      label: "Blog",
      to: "/blog"
    }, {
      label: "Contato",
      to: "/contato"
    }],
    cta: {
      label: "Fale conosco",
      to: "/contato"
    }
  },
  "site.footer": {
    description: "Empresa de tecnologia orientada a produto. Criamos e operamos plataformas SaaS, soluções de IA e ferramentas digitais próprias.",
    columns: [],
    copyright: "VSMS Solutions. Todos os direitos reservados."
  },
  "site.social": {
    linkedin: "",
    github: "",
    instagram: ""
  },
  "site.contact": {
    email: "contato@vsms.com.br"
  }
};
const getSiteConfig = createServerFn({
  method: "GET"
}).handler(createSsrRpc("27398755e2c79cd859318c9c27b62c21d855a60a10e83b12d5da8ec89e301e3b"));
const getPublicPage = createServerFn({
  method: "GET"
}).inputValidator((d) => {
  if (!d?.slug) throw new Error("slug obrigatório");
  return d;
}).handler(createSsrRpc("0bf30972b3df4cf2e457567b65ee1cbe37495c5912020dd9743e5fc67e717305"));
const listPublicProducts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("b3f235de996dc7841741f829536bd07534242b7b4ba647a2411a0fa4324dca30"));
const updateSiteSetting = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.key || !SITE_KEYS.includes(d.key)) {
    throw new Error("Chave inválida");
  }
  if (!d.value || typeof d.value !== "object") throw new Error("Valor inválido");
  return {
    key: d.key,
    value: d.value
  };
}).handler(createSsrRpc("224437ba3c3dbf72154cc7418a0f39268872accd423c29edd30f7c7fd26df737"));
function Header() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  const { data } = useQuery({
    queryKey: ["site-config"],
    queryFn: () => getSiteConfig(),
    staleTime: 5 * 6e4
  });
  const brand = data?.["site.brand"] ?? SITE_DEFAULTS["site.brand"];
  const nav = data?.["site.navigation"] ?? SITE_DEFAULTS["site.navigation"];
  const items = nav.items?.length ? nav.items : SITE_DEFAULTS["site.navigation"].items;
  const cta = nav.cta ?? SITE_DEFAULTS["site.navigation"].cta;
  const logoSrc = brand.logo_url || logoAsset;
  const brandName = brand.name || "VSMS Solutions";
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-border/60" : "bg-transparent"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5", "aria-label": brandName, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoSrc, alt: "", width: 32, height: 32, className: "h-8 w-8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg font-semibold tracking-tight", children: [
              brandName.split(" ")[0],
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gradient", children: [
                " ",
                brandName.split(" ").slice(1).join(" ") || "Solutions"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-1 md:flex", "aria-label": "Principal", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: item.to,
              className: "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
              children: item.label
            },
            item.to
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: cta.to,
              className: "inline-flex items-center rounded-md bg-gradient-brand px-4 py-2 text-sm font-medium text-brand-foreground shadow-glow transition-transform hover:-translate-y-0.5",
              children: cta.label
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground md:hidden",
              "aria-label": open ? "Fechar menu" : "Abrir menu",
              "aria-expanded": open,
              "aria-controls": "mobile-nav",
              onClick: () => setOpen((v) => !v),
              children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
            }
          )
        ] }),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "mobile-nav", className: "glass border-t border-border md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mx-auto flex max-w-7xl flex-col px-6 py-3", "aria-label": "Mobile", children: [
          items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: item.to,
              onClick: () => setOpen(false),
              className: "rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground",
              children: item.label
            },
            item.to
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: cta.to,
              onClick: () => setOpen(false),
              className: "mt-2 inline-flex items-center justify-center rounded-md bg-gradient-brand px-4 py-2.5 text-sm font-medium text-brand-foreground",
              children: cta.label
            }
          )
        ] }) })
      ]
    }
  );
}
function Footer() {
  const { data } = useQuery({
    queryKey: ["site-config"],
    queryFn: () => getSiteConfig(),
    staleTime: 5 * 6e4
  });
  const brand = data?.["site.brand"] ?? SITE_DEFAULTS["site.brand"];
  const footer = data?.["site.footer"] ?? SITE_DEFAULTS["site.footer"];
  const social = data?.["site.social"] ?? SITE_DEFAULTS["site.social"];
  const contact = data?.["site.contact"] ?? SITE_DEFAULTS["site.contact"];
  const brandName = brand.name || "VSMS Solutions";
  const logoSrc = brand.logo_url || logoAsset;
  const columns = footer.columns?.length ? footer.columns : [];
  const socials = [
    { icon: Linkedin, href: social.linkedin, label: "LinkedIn" },
    { icon: Github, href: social.github, label: "GitHub" },
    { icon: Instagram, href: social.instagram, label: "Instagram" },
    { icon: Mail, href: contact.email ? `mailto:${contact.email}` : "", label: "E-mail" }
  ].filter((s) => s.href);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border bg-surface/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5", "aria-label": brandName, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoSrc, alt: "", width: 32, height: 32, className: "h-8 w-8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg font-semibold tracking-tight", children: [
            brandName.split(" ")[0],
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gradient", children: [
              " ",
              brandName.split(" ").slice(1).join(" ") || "Solutions"
            ] })
          ] })
        ] }),
        footer.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-md text-sm text-muted-foreground", children: footer.description }),
        socials.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex items-center gap-3", children: socials.map(({ icon: Icon, href, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href,
            "aria-label": label,
            target: href.startsWith("http") ? "_blank" : void 0,
            rel: "noopener noreferrer",
            className: "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
          },
          label
        )) })
      ] }),
      columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold", children: col.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm text-muted-foreground", children: col.links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.to, className: "hover:text-foreground", children: l.label }) }, l.to)) })
      ] }, col.title))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        footer.copyright || `${brandName}. Todos os direitos reservados.`
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "vsms.com.br" })
    ] })
  ] }) });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-dvh items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl font-bold text-gradient", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Página não encontrada" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "A página que você procura não existe ou foi movida." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-gradient-brand px-4 py-2 text-sm font-medium text-brand-foreground",
        children: "Voltar ao início"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-dvh items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight", children: "Esta página não carregou" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Algo deu errado. Tente novamente ou volte ao início." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-gradient-brand px-4 py-2 text-sm font-medium text-brand-foreground",
          children: "Tentar novamente"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent",
          children: "Início"
        }
      )
    ] })
  ] }) });
}
const Route$x = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "VSMS Solutions — Produtos digitais, SaaS e IA" },
      {
        name: "description",
        content: "Empresa de tecnologia orientada a produto. Criamos e operamos plataformas SaaS, soluções de IA e ferramentas digitais próprias para pessoas e empresas."
      },
      { name: "author", content: "VSMS Solutions" },
      { name: "theme-color", content: "#0b0d18" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:site_name", content: "VSMS Solutions" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@vsmssolutions" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
      }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "VSMS Solutions",
          url: "https://vsms.com.br",
          logo: "https://vsms.com.br/favicon.ico",
          description: "Empresa de tecnologia orientada a produto: SaaS próprios, IA aplicada e operação contínua de plataformas digitais.",
          sameAs: []
        })
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "pt-BR", className: "dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$x.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isInternal = pathname.startsWith("/admin") || pathname.startsWith("/auth");
  if (isInternal) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: "#main",
        className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gradient-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-brand-foreground",
        children: "Pular para o conteúdo"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { id: "main", className: "min-h-dvh pt-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
const $$splitComponentImporter$v = () => import("./termos-Uus4_Ze_.mjs");
const Route$w = createFileRoute("/termos")({
  head: () => ({
    meta: [{
      title: "Termos de Uso — VSMS Solutions"
    }, {
      name: "description",
      content: "Condições gerais de uso do site da VSMS Solutions."
    }, {
      property: "og:url",
      content: "https://vsms.com.br/termos"
    }],
    links: [{
      rel: "canonical",
      href: "https://vsms.com.br/termos"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const $$splitComponentImporter$u = () => import("./sobre-CB5CQs6t.mjs");
const Route$v = createFileRoute("/sobre")({
  head: () => ({
    meta: [{
      title: "Sobre — VSMS Solutions"
    }, {
      name: "description",
      content: "VSMS Solutions: empresa de tecnologia orientada a produto, focada em SaaS próprios, IA aplicada e operação contínua de plataformas digitais."
    }, {
      property: "og:title",
      content: "Sobre a VSMS Solutions — Empresa de produto"
    }, {
      property: "og:description",
      content: "Empresa orientada a produto: SaaS próprios, IA aplicada e ecossistema em expansão."
    }, {
      property: "og:url",
      content: "https://vsms.com.br/sobre"
    }],
    links: [{
      rel: "canonical",
      href: "https://vsms.com.br/sobre"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const posts = [
  {
    slug: "como-ia-transforma-pmes",
    title: "Como a IA está transformando PMEs brasileiras",
    excerpt: "Não é hype. Pequenas e médias empresas brasileiras já colhem resultados reais com IA aplicada ao dia a dia.",
    date: "12 mar 2026",
    tag: "Inteligência Artificial",
    readingTime: "6 min",
    content: [
      "A inteligência artificial deixou de ser uma promessa distante. Em 2026, qualquer empresa que ignore essa onda corre o risco de ficar para trás — e a boa notícia é que adotar IA hoje é mais acessível do que nunca.",
      "Vemos PMEs usando agentes de IA para qualificar leads, copilots internos para acelerar o atendimento e modelos especializados para extrair valor de dados antes esquecidos em planilhas e PDFs.",
      "O segredo está em começar pequeno: identifique um processo repetitivo, mensure o tempo gasto e desenhe uma automação inteligente que tenha ROI claro nos primeiros 30 dias.",
      "Na VSMS, nossa abordagem é sempre orientada a resultado: nada de IA por IA. Cada projeto começa com uma pergunta simples — o que isso vai economizar ou gerar para o cliente?"
    ]
  },
  {
    slug: "saas-do-zero",
    title: "Lançando um SaaS do zero: arquitetura e custos",
    excerpt: "Um guia direto ao ponto sobre as decisões críticas que economizam (ou queimam) caixa nos primeiros 12 meses.",
    date: "28 fev 2026",
    tag: "SaaS",
    readingTime: "9 min",
    content: [
      "Lançar um SaaS é fácil. Lançar um SaaS sustentável é outra história. Os primeiros 12 meses definem se o produto vai escalar ou afundar em dívida técnica e custos de infra.",
      "A escolha de stack importa, mas menos do que se imagina. Importa muito mais ter clareza sobre o modelo multi-tenant, segregação de dados e estratégia de billing desde o primeiro commit.",
      "Outro ponto crítico: observabilidade. Sem logs, métricas e tracing decentes, qualquer crescimento vira pesadelo de suporte."
    ]
  },
  {
    slug: "automacao-que-paga-a-conta",
    title: "Automação que paga a conta: 5 cases reais",
    excerpt: "Cinco automações simples que economizaram horas — e milhares de reais — para clientes da VSMS.",
    date: "10 fev 2026",
    tag: "Automação",
    readingTime: "5 min",
    content: [
      "Automação não precisa ser complicada para gerar valor. Os cases mais bem-sucedidos que entregamos foram, na verdade, os mais simples.",
      "Da emissão automática de notas fiscais à reconciliação de planilhas, a chave é mapear o trabalho repetitivo e atacar primeiro o que dói mais."
    ]
  }
];
function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}
const BASE_URL = "https://vsms.com.br";
const Route$u = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/sobre", changefreq: "monthly", priority: "0.8" },
          { path: "/servicos", changefreq: "monthly", priority: "0.9" },
          { path: "/produtos", changefreq: "monthly", priority: "0.8" },
          { path: "/portfolio", changefreq: "monthly", priority: "0.7" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          { path: "/contato", changefreq: "yearly", priority: "0.6" },
          { path: "/privacidade", changefreq: "yearly", priority: "0.3" },
          { path: "/cookies", changefreq: "yearly", priority: "0.3" },
          { path: "/termos", changefreq: "yearly", priority: "0.3" },
          ...posts.map((p) => ({ path: `/blog/${p.slug}`, changefreq: "monthly", priority: "0.6" }))
        ];
        const urls = entries.map(
          (e) => [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`
          ].filter(Boolean).join("\n")
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" }
        });
      }
    }
  }
});
const $$splitComponentImporter$t = () => import("./servicos-CZW98gfi.mjs");
const Route$t = createFileRoute("/servicos")({
  head: () => ({
    meta: [{
      title: "Serviços de apoio — VSMS Solutions"
    }, {
      name: "description",
      content: "Consultoria, implantação, integrações, customizações com IA e suporte especializado para os produtos do ecossistema VSMS."
    }, {
      property: "og:title",
      content: "Serviços de apoio — VSMS Solutions"
    }, {
      property: "og:description",
      content: "Consultoria, implantação, integrações e suporte para as plataformas VSMS."
    }, {
      property: "og:url",
      content: "https://vsms.com.br/servicos"
    }],
    links: [{
      rel: "canonical",
      href: "https://vsms.com.br/servicos"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const $$splitComponentImporter$s = () => import("./produtos-Ba2N_-54.mjs");
const Route$s = createFileRoute("/produtos")({
  head: () => ({
    meta: [{
      title: "Produtos — Ecossistema VSMS Solutions"
    }, {
      name: "description",
      content: "Conheça o ecossistema de produtos VSMS: SaaS próprios, plataformas digitais e soluções de IA."
    }, {
      property: "og:title",
      content: "Ecossistema VSMS — Produtos digitais e SaaS"
    }, {
      property: "og:description",
      content: "Produtos próprios, SaaS e soluções de IA criadas e operadas pela VSMS."
    }, {
      property: "og:url",
      content: "https://vsms.com.br/produtos"
    }],
    links: [{
      rel: "canonical",
      href: "https://vsms.com.br/produtos"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./privacidade-BgCRPZJy.mjs");
const Route$r = createFileRoute("/privacidade")({
  head: () => ({
    meta: [{
      title: "Política de Privacidade — VSMS Solutions"
    }, {
      name: "description",
      content: "Como a VSMS Solutions coleta, usa e protege os dados pessoais."
    }, {
      property: "og:url",
      content: "https://vsms.com.br/privacidade"
    }],
    links: [{
      rel: "canonical",
      href: "https://vsms.com.br/privacidade"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("./portfolio-BNvavXAp.mjs");
const Route$q = createFileRoute("/portfolio")({
  head: () => ({
    meta: [{
      title: "Portfólio — VSMS Solutions"
    }, {
      name: "description",
      content: "Cases e projetos entregues pela VSMS Solutions em diferentes setores."
    }, {
      property: "og:title",
      content: "Portfólio — VSMS Solutions"
    }, {
      property: "og:description",
      content: "Projetos e cases de tecnologia entregues pela VSMS."
    }, {
      property: "og:url",
      content: "https://vsms.com.br/portfolio"
    }],
    links: [{
      rel: "canonical",
      href: "https://vsms.com.br/portfolio"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("./cookies-C3LMnB20.mjs");
const Route$p = createFileRoute("/cookies")({
  head: () => ({
    meta: [{
      title: "Política de Cookies — VSMS Solutions"
    }, {
      name: "description",
      content: "Como a VSMS Solutions utiliza cookies neste site."
    }, {
      property: "og:url",
      content: "https://vsms.com.br/cookies"
    }],
    links: [{
      rel: "canonical",
      href: "https://vsms.com.br/cookies"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./contato-DXtFBUzQ.mjs");
const Route$o = createFileRoute("/contato")({
  head: () => ({
    meta: [{
      title: "Contato — VSMS Solutions"
    }, {
      name: "description",
      content: "Fale com a VSMS Solutions. WhatsApp, e-mail e formulário para iniciar seu projeto."
    }, {
      property: "og:title",
      content: "Contato — VSMS Solutions"
    }, {
      property: "og:description",
      content: "Vamos conversar sobre o seu projeto."
    }, {
      property: "og:url",
      content: "https://vsms.com.br/contato"
    }],
    links: [{
      rel: "canonical",
      href: "https://vsms.com.br/contato"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./blog-CjS2KC6V.mjs");
const Route$n = createFileRoute("/blog")({
  head: () => ({
    meta: [{
      title: "Blog — VSMS Solutions"
    }, {
      name: "description",
      content: "Artigos sobre tecnologia, IA, SaaS, automação e transformação digital."
    }, {
      property: "og:title",
      content: "Blog — VSMS Solutions"
    }, {
      property: "og:description",
      content: "Conteúdo de tecnologia que vai além do hype."
    }, {
      property: "og:url",
      content: "https://vsms.com.br/blog"
    }],
    links: [{
      rel: "canonical",
      href: "https://vsms.com.br/blog"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./auth-BOBtuvJ5.mjs");
const Route$m = createFileRoute("/auth")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data
    } = await supabase.auth.getUser();
    if (data.user) throw redirect({
      to: "/admin"
    });
  },
  head: () => ({
    meta: [{
      title: "Entrar — VSMS Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./route-BFsOu0JM.mjs");
const Route$l = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({
      to: "/auth"
    });
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const heroBg = "/assets/hero-bg-BbnpbHA3.jpg";
const $$splitComponentImporter$k = () => import("./index-Y18cdnSw.mjs");
const Route$k = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "VSMS Solutions — Produtos digitais, SaaS e IA"
    }, {
      name: "description",
      content: "A VSMS Solutions cria e opera produtos digitais, plataformas SaaS e soluções de inteligência artificial para pessoas e empresas."
    }, {
      property: "og:title",
      content: "VSMS Solutions — Ecossistema de produtos digitais"
    }, {
      property: "og:description",
      content: "Produtos próprios, SaaS e IA para escalar pessoas e empresas. Conheça o ecossistema VSMS."
    }, {
      property: "og:url",
      content: "https://vsms.com.br/"
    }],
    links: [{
      rel: "canonical",
      href: "https://vsms.com.br/"
    }, {
      rel: "preload",
      as: "image",
      href: heroBg,
      fetchpriority: "high"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./blog._slug-DOuutJ7F.mjs");
const $$splitErrorComponentImporter = () => import("./blog._slug-kkV17lHM.mjs");
const $$splitNotFoundComponentImporter = () => import("./blog._slug-BLAjMf_5.mjs");
const Route$j = createFileRoute("/blog/$slug")({
  loader: ({
    params
  }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return {
      post
    };
  },
  head: ({
    params,
    loaderData
  }) => {
    const post = loaderData?.post;
    const title = post ? `${post.title} — VSMS Blog` : "Post — VSMS Blog";
    const desc = post?.excerpt ?? "Artigo do blog da VSMS Solutions.";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: desc
      }, {
        property: "og:title",
        content: post?.title ?? "Blog VSMS"
      }, {
        property: "og:description",
        content: desc
      }, {
        property: "og:type",
        content: "article"
      }, {
        property: "og:url",
        content: `https://vsms.com.br/blog/${params.slug}`
      }],
      links: [{
        rel: "canonical",
        href: `https://vsms.com.br/blog/${params.slug}`
      }],
      scripts: post ? [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          datePublished: post.date,
          author: {
            "@type": "Organization",
            name: "VSMS Solutions"
          }
        })
      }] : []
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./admin-BsZFS_On.mjs");
const Route$i = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [{
      title: "Painel — VSMS Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./admin.index-6_5aOBAz.mjs");
const Route$h = createFileRoute("/_authenticated/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./admin.usuarios-CT1tgGev.mjs");
const Route$g = createFileRoute("/_authenticated/admin/usuarios")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./admin.seo-BFsOu0JM.mjs");
const Route$f = createFileRoute("/_authenticated/admin/seo")({
  head: () => ({
    meta: [{
      title: "SEO — VSMS Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./admin.produtos-BFsOu0JM.mjs");
const Route$e = createFileRoute("/_authenticated/admin/produtos")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./admin.paginas-BFsOu0JM.mjs");
const Route$d = createFileRoute("/_authenticated/admin/paginas")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./admin.midia-B4bLM2Bo.mjs");
const Route$c = createFileRoute("/_authenticated/admin/midia")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./admin.leads-DiCbjKQI.mjs");
const Route$b = createFileRoute("/_authenticated/admin/leads")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./admin.formularios-Byq0gTnN.mjs");
const Route$a = createFileRoute("/_authenticated/admin/formularios")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin.feature-flags-C_VYyp-G.mjs");
const Route$9 = createFileRoute("/_authenticated/admin/feature-flags")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./admin.configuracoes-CHBXWpGI.mjs");
const Route$8 = createFileRoute("/_authenticated/admin/configuracoes")({
  head: () => ({
    meta: [{
      title: "Configurações — VSMS Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin.blog-ejGiD_DB.mjs");
const Route$7 = createFileRoute("/_authenticated/admin/blog")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.auditoria-Lorwkevp.mjs");
const Route$6 = createFileRoute("/_authenticated/admin/auditoria")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.seo.index-CZFN0PrT.mjs");
const Route$5 = createFileRoute("/_authenticated/admin/seo/")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.produtos.index-DvhJvEt_.mjs");
const Route$4 = createFileRoute("/_authenticated/admin/produtos/")({
  head: () => ({
    meta: [{
      title: "Produtos — VSMS Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.paginas.index-siGe-uUS.mjs");
const Route$3 = createFileRoute("/_authenticated/admin/paginas/")({
  head: () => ({
    meta: [{
      title: "Páginas — VSMS Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.produtos._id-D3W7NY3i.mjs");
const Route$2 = createFileRoute("/_authenticated/admin/produtos/$id")({
  head: () => ({
    meta: [{
      title: "Editar produto — VSMS Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.paginas._id-DdU01NpR.mjs");
const Route$1 = createFileRoute("/_authenticated/admin/paginas/$id")({
  head: () => ({
    meta: [{
      title: "Editar página — VSMS Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.seo._resourceType._resourceId-1ZkU3els.mjs");
const Route = createFileRoute("/_authenticated/admin/seo/$resourceType/$resourceId")({
  head: () => ({
    meta: [{
      title: "Editar SEO — VSMS Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TermosRoute = Route$w.update({
  id: "/termos",
  path: "/termos",
  getParentRoute: () => Route$x
});
const SobreRoute = Route$v.update({
  id: "/sobre",
  path: "/sobre",
  getParentRoute: () => Route$x
});
const SitemapDotxmlRoute = Route$u.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$x
});
const ServicosRoute = Route$t.update({
  id: "/servicos",
  path: "/servicos",
  getParentRoute: () => Route$x
});
const ProdutosRoute = Route$s.update({
  id: "/produtos",
  path: "/produtos",
  getParentRoute: () => Route$x
});
const PrivacidadeRoute = Route$r.update({
  id: "/privacidade",
  path: "/privacidade",
  getParentRoute: () => Route$x
});
const PortfolioRoute = Route$q.update({
  id: "/portfolio",
  path: "/portfolio",
  getParentRoute: () => Route$x
});
const CookiesRoute = Route$p.update({
  id: "/cookies",
  path: "/cookies",
  getParentRoute: () => Route$x
});
const ContatoRoute = Route$o.update({
  id: "/contato",
  path: "/contato",
  getParentRoute: () => Route$x
});
const BlogRoute = Route$n.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => Route$x
});
const AuthRoute = Route$m.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$x
});
const AuthenticatedRouteRoute = Route$l.update({
  id: "/_authenticated",
  getParentRoute: () => Route$x
});
const IndexRoute = Route$k.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$x
});
const BlogSlugRoute = Route$j.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => BlogRoute
});
const AuthenticatedAdminRoute = Route$i.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminIndexRoute = Route$h.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminUsuariosRoute = Route$g.update({
  id: "/usuarios",
  path: "/usuarios",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminSeoRoute = Route$f.update({
  id: "/seo",
  path: "/seo",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminProdutosRoute = Route$e.update({
  id: "/produtos",
  path: "/produtos",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminPaginasRoute = Route$d.update({
  id: "/paginas",
  path: "/paginas",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminMidiaRoute = Route$c.update({
  id: "/midia",
  path: "/midia",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminLeadsRoute = Route$b.update({
  id: "/leads",
  path: "/leads",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminFormulariosRoute = Route$a.update({
  id: "/formularios",
  path: "/formularios",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminFeatureFlagsRoute = Route$9.update({
  id: "/feature-flags",
  path: "/feature-flags",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminConfiguracoesRoute = Route$8.update({
  id: "/configuracoes",
  path: "/configuracoes",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminBlogRoute = Route$7.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminAuditoriaRoute = Route$6.update({
  id: "/auditoria",
  path: "/auditoria",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminSeoIndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedAdminSeoRoute
});
const AuthenticatedAdminProdutosIndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedAdminProdutosRoute
});
const AuthenticatedAdminPaginasIndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedAdminPaginasRoute
});
const AuthenticatedAdminProdutosIdRoute = Route$2.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => AuthenticatedAdminProdutosRoute
});
const AuthenticatedAdminPaginasIdRoute = Route$1.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => AuthenticatedAdminPaginasRoute
});
const AuthenticatedAdminSeoResourceTypeResourceIdRoute = Route.update({
  id: "/$resourceType/$resourceId",
  path: "/$resourceType/$resourceId",
  getParentRoute: () => AuthenticatedAdminSeoRoute
});
const AuthenticatedAdminPaginasRouteChildren = {
  AuthenticatedAdminPaginasIdRoute,
  AuthenticatedAdminPaginasIndexRoute
};
const AuthenticatedAdminPaginasRouteWithChildren = AuthenticatedAdminPaginasRoute._addFileChildren(
  AuthenticatedAdminPaginasRouteChildren
);
const AuthenticatedAdminProdutosRouteChildren = {
  AuthenticatedAdminProdutosIdRoute,
  AuthenticatedAdminProdutosIndexRoute
};
const AuthenticatedAdminProdutosRouteWithChildren = AuthenticatedAdminProdutosRoute._addFileChildren(
  AuthenticatedAdminProdutosRouteChildren
);
const AuthenticatedAdminSeoRouteChildren = {
  AuthenticatedAdminSeoIndexRoute,
  AuthenticatedAdminSeoResourceTypeResourceIdRoute
};
const AuthenticatedAdminSeoRouteWithChildren = AuthenticatedAdminSeoRoute._addFileChildren(
  AuthenticatedAdminSeoRouteChildren
);
const AuthenticatedAdminRouteChildren = {
  AuthenticatedAdminAuditoriaRoute,
  AuthenticatedAdminBlogRoute,
  AuthenticatedAdminConfiguracoesRoute,
  AuthenticatedAdminFeatureFlagsRoute,
  AuthenticatedAdminFormulariosRoute,
  AuthenticatedAdminLeadsRoute,
  AuthenticatedAdminMidiaRoute,
  AuthenticatedAdminPaginasRoute: AuthenticatedAdminPaginasRouteWithChildren,
  AuthenticatedAdminProdutosRoute: AuthenticatedAdminProdutosRouteWithChildren,
  AuthenticatedAdminSeoRoute: AuthenticatedAdminSeoRouteWithChildren,
  AuthenticatedAdminUsuariosRoute,
  AuthenticatedAdminIndexRoute
};
const AuthenticatedAdminRouteWithChildren = AuthenticatedAdminRoute._addFileChildren(AuthenticatedAdminRouteChildren);
const AuthenticatedRouteRouteChildren = {
  AuthenticatedAdminRoute: AuthenticatedAdminRouteWithChildren
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const BlogRouteChildren = {
  BlogSlugRoute
};
const BlogRouteWithChildren = BlogRoute._addFileChildren(BlogRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute,
  BlogRoute: BlogRouteWithChildren,
  ContatoRoute,
  CookiesRoute,
  PortfolioRoute,
  PrivacidadeRoute,
  ProdutosRoute,
  ServicosRoute,
  SitemapDotxmlRoute,
  SobreRoute,
  TermosRoute
};
const routeTree = Route$x._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$j as R,
  SITE_DEFAULTS as S,
  getSiteConfig as a,
  Route$2 as b,
  createSsrRpc as c,
  Route$1 as d,
  Route as e,
  getPublicPage as g,
  heroBg as h,
  listPublicProducts as l,
  posts as p,
  router as r,
  updateSiteSetting as u
};

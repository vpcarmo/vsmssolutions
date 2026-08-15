import { c as createServerRpc } from "./createServerRpc-DGmXBF-b.mjs";
import { c as createServerFn } from "./server-BxRkUJzR.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-Db3P2fQk.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const SITE_KEYS = ["site.brand", "site.navigation", "site.footer", "site.social", "site.contact"];
const SITE_DEFAULTS = {
  "site.brand": {
    name: "VSMS Solutions",
    tagline: "Produtos digitais, SaaS e IA",
    logo_url: null,
    favicon_url: null
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
    instagram: "",
    twitter: ""
  },
  "site.contact": {
    email: "contato@vsms.com.br",
    phone: "",
    address: "",
    whatsapp: ""
  }
};
function publicClient() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
const getSiteConfig_createServerFn_handler = createServerRpc({
  id: "27398755e2c79cd859318c9c27b62c21d855a60a10e83b12d5da8ec89e301e3b",
  name: "getSiteConfig",
  filename: "src/lib/site/site.functions.ts"
}, (opts) => getSiteConfig.__executeServer(opts));
const getSiteConfig = createServerFn({
  method: "GET"
}).handler(getSiteConfig_createServerFn_handler, async () => {
  const sb = publicClient();
  const {
    data,
    error
  } = await sb.from("settings").select("key, value").eq("scope", "global").in("key", SITE_KEYS);
  if (error) throw new Error(error.message);
  const map = {
    ...SITE_DEFAULTS
  };
  for (const row of data ?? []) {
    if (SITE_KEYS.includes(row.key)) {
      map[row.key] = row.value ?? SITE_DEFAULTS[row.key];
    }
  }
  return map;
});
const getPublicPage_createServerFn_handler = createServerRpc({
  id: "0bf30972b3df4cf2e457567b65ee1cbe37495c5912020dd9743e5fc67e717305",
  name: "getPublicPage",
  filename: "src/lib/site/site.functions.ts"
}, (opts) => getPublicPage.__executeServer(opts));
const getPublicPage = createServerFn({
  method: "GET"
}).inputValidator((d) => {
  if (!d?.slug) throw new Error("slug obrigatório");
  return d;
}).handler(getPublicPage_createServerFn_handler, async ({
  data
}) => {
  const sb = publicClient();
  const {
    data: row,
    error
  } = await sb.from("pages").select("id, slug, title, excerpt, content, content_type, seo_title, seo_description, og_image_url, published_at").eq("slug", data.slug).eq("status", "published").order("published_at", {
    ascending: false
  }).limit(1).maybeSingle();
  if (error) throw new Error(error.message);
  return row;
});
const listPublicProducts_createServerFn_handler = createServerRpc({
  id: "b3f235de996dc7841741f829536bd07534242b7b4ba647a2411a0fa4324dca30",
  name: "listPublicProducts",
  filename: "src/lib/site/site.functions.ts"
}, (opts) => listPublicProducts.__executeServer(opts));
const listPublicProducts = createServerFn({
  method: "GET"
}).handler(listPublicProducts_createServerFn_handler, async () => {
  const sb = publicClient();
  const {
    data,
    error
  } = await sb.from("products").select("id, slug, name, description, type, status, primary_domain, settings").eq("status", "active").order("name", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const updateSiteSetting_createServerFn_handler = createServerRpc({
  id: "224437ba3c3dbf72154cc7418a0f39268872accd423c29edd30f7c7fd26df737",
  name: "updateSiteSetting",
  filename: "src/lib/site/site.functions.ts"
}, (opts) => updateSiteSetting.__executeServer(opts));
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
}).handler(updateSiteSetting_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: before
  } = await context.supabase.from("settings").select("id, value").eq("scope", "global").eq("key", data.key).is("tenant_id", null).is("product_id", null).maybeSingle();
  let row = null;
  if (before?.id) {
    const {
      data: upd,
      error
    } = await context.supabase.from("settings").update({
      value: data.value
    }).eq("id", before.id).select("id").single();
    if (error) throw new Error(error.message);
    row = upd;
  } else {
    const {
      data: ins,
      error
    } = await context.supabase.from("settings").insert({
      scope: "global",
      key: data.key,
      value: data.value
    }).select("id").single();
    if (error) throw new Error(error.message);
    row = ins;
  }
  await context.supabase.from("audit_log").insert({
    actor_id: context.userId,
    tenant_id: null,
    action: before ? "settings.update" : "settings.create",
    resource_type: "settings",
    resource_id: row.id,
    diff: {
      key: data.key,
      before: before?.value ?? null,
      after: data.value
    }
  });
  return {
    ok: true,
    id: row.id
  };
});
export {
  getPublicPage_createServerFn_handler,
  getSiteConfig_createServerFn_handler,
  listPublicProducts_createServerFn_handler,
  updateSiteSetting_createServerFn_handler
};

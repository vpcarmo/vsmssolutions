import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export const SITE_KEYS = [
  "site.brand",
  "site.navigation",
  "site.footer",
  "site.social",
  "site.contact",
] as const;
export type SiteKey = (typeof SITE_KEYS)[number];

// Json-compatible plain shape (serializable across the server-fn RPC boundary)
export type SiteValue = { [k: string]: any };

export const SITE_DEFAULTS: Record<SiteKey, SiteValue> = {
  "site.brand": {
    name: "VSMS Solutions",
    tagline: "Produtos digitais, SaaS e IA",
    logo_url: null,
    favicon_url: null,
  },
  "site.navigation": {
    items: [
      { label: "Início", to: "/" },
      { label: "Produtos", to: "/produtos" },
      { label: "Serviços", to: "/servicos" },
      { label: "Sobre", to: "/sobre" },
      { label: "Cases", to: "/portfolio" },
      { label: "Blog", to: "/blog" },
      { label: "Contato", to: "/contato" },
    ],
    cta: { label: "Fale conosco", to: "/contato" },
  },
  "site.footer": {
    description:
      "Empresa de tecnologia orientada a produto. Criamos e operamos plataformas SaaS, soluções de IA e ferramentas digitais próprias.",
    columns: [],
    copyright: "VSMS Solutions. Todos os direitos reservados.",
  },
  "site.social": { linkedin: "", github: "", instagram: "", twitter: "" },
  "site.contact": { email: "contato@vsms.com.br", phone: "", address: "", whatsapp: "" },
};

export type SiteConfig = Record<SiteKey, SiteValue>;


function publicClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export const getSiteConfig = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const { data, error } = await sb
    .from("settings")
    .select("key, value")
    .eq("scope", "global")
    .in("key", SITE_KEYS as unknown as string[]);
  if (error) throw new Error(error.message);
  const map = { ...SITE_DEFAULTS } as SiteConfig;
  for (const row of data ?? []) {
    if ((SITE_KEYS as readonly string[]).includes(row.key)) {
      map[row.key as SiteKey] = (row.value as Record<string, unknown>) ?? SITE_DEFAULTS[row.key as SiteKey];
    }
  }
  return map;
});

export const getPublicPage = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => {
    if (!d?.slug) throw new Error("slug obrigatório");
    return d;
  })
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: row, error } = await sb
      .from("pages")
      .select("id, slug, title, excerpt, content, content_type, seo_title, seo_description, og_image_url, published_at")
      .eq("slug", data.slug)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

export const listPublicProducts = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const { data, error } = await sb
    .from("products")
    .select("id, slug, name, description, type, status, primary_domain, settings")
    .eq("status", "active")
    .order("name", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const updateSiteSetting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { key: SiteKey; value: SiteValue }) => {
    if (!d?.key || !(SITE_KEYS as readonly string[]).includes(d.key)) {
      throw new Error("Chave inválida");
    }
    if (!d.value || typeof d.value !== "object") throw new Error("Valor inválido");
    return { key: d.key, value: d.value };
  })
  .handler(async ({ data, context }) => {
    const { data: before } = await context.supabase
      .from("settings")
      .select("id, value")
      .eq("scope", "global")
      .eq("key", data.key)
      .is("tenant_id", null)
      .is("product_id", null)
      .maybeSingle();

    let row: { id: string } | null = null;
    if (before?.id) {
      const { data: upd, error } = await context.supabase
        .from("settings")
        .update({ value: data.value as never })
        .eq("id", before.id)
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      row = upd;
    } else {
      const { data: ins, error } = await context.supabase
        .from("settings")
        .insert({ scope: "global", key: data.key, value: data.value as never } as never)
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      row = ins;
    }

    await context.supabase.from("audit_log").insert({
      actor_id: context.userId,
      tenant_id: null,
      action: before ? "settings.update" : "settings.create",
      resource_type: "settings",
      resource_id: row!.id,
      diff: { key: data.key, before: before?.value ?? null, after: data.value },
    });

    return { ok: true, id: row!.id };
  });

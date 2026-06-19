import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type SeoResourceType = "page" | "product" | "post";

export type SeoInput = {
  resource_type: SeoResourceType;
  resource_id: string;
  title?: string | null;
  description?: string | null;
  canonical_url?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  robots?: string | null;
  noindex?: boolean;
  nofollow?: boolean;
  schema_type?: string | null;
  json_ld?: unknown;
};

async function logAudit(opts: {
  supabase: any;
  userId: string;
  tenantId: string | null;
  action: string;
  resourceId: string;
  diff?: unknown;
}) {
  await opts.supabase.from("audit_log").insert({
    actor_id: opts.userId,
    tenant_id: opts.tenantId,
    action: opts.action,
    resource_type: "seo_meta",
    resource_id: opts.resourceId,
    diff: opts.diff ?? null,
  });
}

export const listSeo = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { resource_type?: SeoResourceType } | undefined) => d ?? {})
  .handler(async ({ data, context }) => {
    let q = (context.supabase as any)
      .from("seo_meta")
      .select("*")
      .order("updated_at", { ascending: false });
    if (data.resource_type) q = q.eq("resource_type", data.resource_type);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const getSeoByResource = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { resource_type: SeoResourceType; resource_id: string }) => {
    if (!d?.resource_type || !d?.resource_id) throw new Error("resource_type e resource_id obrigatórios");
    return d;
  })
  .handler(async ({ data, context }) => {
    const { data: row, error } = await (context.supabase as any)
      .from("seo_meta")
      .select("*")
      .eq("resource_type", data.resource_type)
      .eq("resource_id", data.resource_id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

export const upsertSeo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: SeoInput) => {
    if (!d?.resource_type || !d?.resource_id) throw new Error("resource_type e resource_id obrigatórios");
    return d;
  })
  .handler(async ({ data, context }) => {
    // discover tenant from resource (page/product/post) — fallback to current_tenant_id
    let tenantId: string | null = null;
    const tableMap: Record<SeoResourceType, string> = {
      page: "pages",
      product: "products",
      post: "posts",
    };
    const tbl = tableMap[data.resource_type];
    if (tbl) {
      const { data: parent } = await (context.supabase as any)
        .from(tbl)
        .select("tenant_id")
        .eq("id", data.resource_id)
        .maybeSingle();
      tenantId = parent?.tenant_id ?? null;
    }
    if (!tenantId) {
      const { data: t } = await (context.supabase as any).rpc("current_tenant_id");
      tenantId = t as string;
    }

    const { data: existing } = await (context.supabase as any)
      .from("seo_meta")
      .select("*")
      .eq("resource_type", data.resource_type)
      .eq("resource_id", data.resource_id)
      .maybeSingle();

    const payload = {
      tenant_id: tenantId,
      resource_type: data.resource_type,
      resource_id: data.resource_id,
      title: data.title ?? null,
      description: data.description ?? null,
      canonical_url: data.canonical_url ?? null,
      og_title: data.og_title ?? null,
      og_description: data.og_description ?? null,
      og_image_url: data.og_image_url ?? null,
      robots: data.robots ?? null,
      noindex: data.noindex ?? false,
      nofollow: data.nofollow ?? false,
      schema_type: data.schema_type ?? null,
      json_ld: data.json_ld ?? null,
    };

    const { data: row, error } = await (context.supabase as any)
      .from("seo_meta")
      .upsert(payload, { onConflict: "resource_type,resource_id" })
      .select("*")
      .single();
    if (error) throw new Error(error.message);

    await logAudit({
      supabase: (context.supabase as any),
      userId: context.userId,
      tenantId,
      action: existing ? "seo.update" : "seo.create",
      resourceId: row.id,
      diff: { before: existing ?? null, after: row },
    });

    return row;
  });

export const deleteSeo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => {
    if (!d?.id) throw new Error("id obrigatório");
    return d;
  })
  .handler(async ({ data, context }) => {
    const { data: existing } = await (context.supabase as any)
      .from("seo_meta").select("*").eq("id", data.id).maybeSingle();
    if (!existing) throw new Error("Registro não encontrado");
    const { error } = await (context.supabase as any).from("seo_meta").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await logAudit({
      supabase: (context.supabase as any),
      userId: context.userId,
      tenantId: existing.tenant_id,
      action: "seo.delete",
      resourceId: data.id,
      diff: { before: existing },
    });
    return { ok: true };
  });

export const seoOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const [{ data: pages }, { data: seos }] = await Promise.all([
      (context.supabase as any).from("pages").select("id, title, status, product_id"),
      (context.supabase as any).from("seo_meta").select("resource_type, resource_id, title, description, noindex"),
    ]);
    const pageSeoByResource = new Map(
      (seos ?? []).filter((s: any) => s.resource_type === "page").map((s: any) => [s.resource_id, s]),
    );
    const allPages = pages ?? [];
    let configured = 0;
    let missing = 0;
    let missingTitle = 0;
    let missingDescription = 0;
    let noindexed = 0;
    const pagesWithoutSeo: any[] = [];
    for (const p of allPages) {
      const s = pageSeoByResource.get(p.id) as any;
      if (s) {
        configured++;
        if (!s.title) missingTitle++;
        if (!s.description) missingDescription++;
        if (s.noindex) noindexed++;
      } else {
        missing++;
        pagesWithoutSeo.push(p);
      }
    }
    return {
      totalPages: allPages.length,
      configured,
      missing,
      missingTitle,
      missingDescription,
      noindexed,
      pagesWithoutSeo: pagesWithoutSeo.slice(0, 20),
      totalSeoRecords: (seos ?? []).length,
    };
  });

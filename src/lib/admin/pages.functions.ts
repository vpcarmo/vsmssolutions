import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type ContentType = "page" | "landing" | "blog_post" | "product_page";
export type PageStatus = "draft" | "published" | "archived";

export type PageInput = {
  product_id: string;
  title: string;
  slug?: string;
  excerpt?: string | null;
  content?: unknown;
  content_type?: ContentType;
  template?: string;
  parent_id?: string | null;
  tags?: string[];
  categories?: string[];
  status?: PageStatus;
  seo_title?: string | null;
  seo_description?: string | null;
  og_image_url?: string | null;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

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
    resource_type: "page",
    resource_id: opts.resourceId,
    diff: opts.diff ?? null,
  });
}

export const listPages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { product_id?: string; content_type?: ContentType } | undefined) => d ?? {})
  .handler(async ({ data, context }) => {
    let q = context.supabase
      .from("pages")
      .select(
        "id, tenant_id, product_id, title, slug, excerpt, content_type, template, status, published_at, tags, categories, author_id, created_at, updated_at",
      )
      .order("updated_at", { ascending: false });
    if (data.product_id) q = q.eq("product_id", data.product_id);
    if (data.content_type) q = q.eq("content_type", data.content_type);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const getPage = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => {
    if (!d?.id) throw new Error("id obrigatório");
    return d;
  })
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("pages")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Página não encontrada");
    return row;
  });

export const createPage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: PageInput) => {
    if (!d?.product_id) throw new Error("product_id obrigatório");
    if (!d?.title?.trim()) throw new Error("Título obrigatório");
    return {
      product_id: d.product_id,
      title: d.title.trim(),
      slug: slugify(d.slug?.trim() || d.title),
      excerpt: d.excerpt?.trim() || null,
      content: d.content ?? {},
      content_type: d.content_type ?? "page",
      template: d.template ?? "default",
      parent_id: d.parent_id ?? null,
      tags: d.tags ?? [],
      categories: d.categories ?? [],
      status: d.status ?? "draft",
      seo_title: d.seo_title?.trim() || null,
      seo_description: d.seo_description?.trim() || null,
      og_image_url: d.og_image_url?.trim() || null,
    };
  })
  .handler(async ({ data, context }) => {
    const insert = { ...data, created_by: context.userId, author_id: context.userId };
    const { data: row, error } = await context.supabase
      .from("pages")
      .insert(insert as never)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    await logAudit({
      supabase: context.supabase,
      userId: context.userId,
      tenantId: row.tenant_id,
      action: "page.create",
      resourceId: row.id,
      diff: { after: data },
    });
    return row;
  });

export const updatePage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: Partial<PageInput> & { id: string }) => {
    if (!d?.id) throw new Error("id obrigatório");
    const patch: Record<string, unknown> = {};
    if (d.title !== undefined) patch.title = d.title.trim();
    if (d.slug !== undefined) patch.slug = slugify(d.slug);
    if (d.excerpt !== undefined) patch.excerpt = d.excerpt?.trim() || null;
    if (d.content !== undefined) patch.content = d.content;
    if (d.content_type !== undefined) patch.content_type = d.content_type;
    if (d.template !== undefined) patch.template = d.template;
    if (d.parent_id !== undefined) patch.parent_id = d.parent_id;
    if (d.tags !== undefined) patch.tags = d.tags;
    if (d.categories !== undefined) patch.categories = d.categories;
    if (d.seo_title !== undefined) patch.seo_title = d.seo_title?.trim() || null;
    if (d.seo_description !== undefined) patch.seo_description = d.seo_description?.trim() || null;
    if (d.og_image_url !== undefined) patch.og_image_url = d.og_image_url?.trim() || null;
    if (d.product_id !== undefined) patch.product_id = d.product_id;
    return { id: d.id, patch };
  })
  .handler(async ({ data, context }) => {
    const { data: before } = await context.supabase
      .from("pages").select("*").eq("id", data.id).maybeSingle();
    const { data: row, error } = await context.supabase
      .from("pages")
      .update(data.patch as never)
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    await logAudit({
      supabase: context.supabase,
      userId: context.userId,
      tenantId: row.tenant_id,
      action: "page.update",
      resourceId: row.id,
      diff: { before, after: row },
    });
    return row;
  });

export const setPageStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; status: PageStatus }) => {
    if (!d?.id || !d?.status) throw new Error("id e status obrigatórios");
    return d;
  })
  .handler(async ({ data, context }) => {
    const patch: Record<string, unknown> = { status: data.status };
    if (data.status === "published") patch.published_at = new Date().toISOString();
    if (data.status === "archived") patch.archived_at = new Date().toISOString();
    const { data: row, error } = await context.supabase
      .from("pages")
      .update(patch as never)
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    const action =
      data.status === "published"
        ? "page.publish"
        : data.status === "archived"
        ? "page.archive"
        : "page.draft";
    await logAudit({
      supabase: context.supabase,
      userId: context.userId,
      tenantId: row.tenant_id,
      action,
      resourceId: row.id,
      diff: { status: data.status },
    });
    return row;
  });

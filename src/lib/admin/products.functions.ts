import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type ProductType = "site" | "saas" | "ai_app";
type ProductStatus = "active" | "inactive" | "archived";

export type ProductInput = {
  name: string;
  slug: string;
  description?: string | null;
  type: ProductType;
  status: ProductStatus;
  primary_domain?: string | null;
};

export type ProductUpdateInput = Partial<ProductInput> & { id: string };

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
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
    resource_type: "product",
    resource_id: opts.resourceId,
    diff: opts.diff ?? null,
  });
}

export const listProducts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("products")
      .select("id, tenant_id, name, slug, description, type, status, primary_domain, settings, created_at, updated_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getProduct = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => {
    if (!d?.id) throw new Error("id obrigatório");
    return d;
  })
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("products")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Produto não encontrado");
    return row;
  });

export const createProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: ProductInput) => {
    if (!d?.name?.trim()) throw new Error("Nome é obrigatório");
    return {
      name: d.name.trim(),
      slug: slugify(d.slug?.trim() || d.name),
      description: d.description?.trim() || null,
      type: d.type ?? "saas",
      status: d.status ?? "active",
      primary_domain: d.primary_domain?.trim() || null,
    };
  })
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("products")
      .insert(data)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    await logAudit({
      supabase: context.supabase,
      userId: context.userId,
      tenantId: row.tenant_id,
      action: "product.create",
      resourceId: row.id,
      diff: { after: data },
    });
    return row;
  });

export const updateProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: ProductUpdateInput) => {
    if (!d?.id) throw new Error("id obrigatório");
    const patch: Record<string, unknown> = {};
    if (d.name !== undefined) patch.name = d.name.trim();
    if (d.slug !== undefined) patch.slug = slugify(d.slug);
    if (d.description !== undefined) patch.description = d.description?.trim() || null;
    if (d.type !== undefined) patch.type = d.type;
    if (d.status !== undefined) patch.status = d.status;
    if (d.primary_domain !== undefined) patch.primary_domain = d.primary_domain?.trim() || null;
    return { id: d.id, patch };
  })
  .handler(async ({ data, context }) => {
    const { data: before } = await context.supabase
      .from("products").select("*").eq("id", data.id).maybeSingle();
    const { data: row, error } = await context.supabase
      .from("products")
      .update(data.patch as never)
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    await logAudit({
      supabase: context.supabase,
      userId: context.userId,
      tenantId: row.tenant_id,
      action: "product.update",
      resourceId: row.id,
      diff: { before, after: row },
    });
    return row;
  });

export const setProductStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; status: ProductStatus }) => {
    if (!d?.id || !d?.status) throw new Error("id e status obrigatórios");
    return d;
  })
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("products")
      .update({ status: data.status })
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    await logAudit({
      supabase: context.supabase,
      userId: context.userId,
      tenantId: row.tenant_id,
      action: data.status === "active" ? "product.activate" : "product.deactivate",
      resourceId: row.id,
      diff: { status: data.status },
    });
    return row;
  });

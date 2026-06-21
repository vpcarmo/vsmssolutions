import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listForms = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("forms")
      .select("id, slug, name, status, product_id, notify_emails, rate_limit_per_hour, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const listSubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { form_id?: string } | undefined) => d ?? {})
  .handler(async ({ data, context }) => {
    let q = context.supabase
      .from("form_submissions")
      .select("id, form_id, data, is_spam, captcha_verified, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (data.form_id) q = q.eq("form_id", data.form_id);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { status?: string } | undefined) => d ?? {})
  .handler(async ({ data, context }) => {
    let q = context.supabase
      .from("leads")
      .select("id, name, email, phone, company, message, source, status, score, product_id, created_at, metadata")
      .order("created_at", { ascending: false })
      .limit(200);
    if (data.status) q = q.eq("status", data.status as never);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const updateLeadStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; status: "new" | "contacted" | "qualified" | "won" | "lost" }) => {
    if (!d?.id || !d?.status) throw new Error("id e status obrigatórios");
    return d;
  })
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("leads")
      .update({ status: data.status as never })
      .eq("id", data.id)
      .select("id, tenant_id")
      .single();
    if (error) throw new Error(error.message);
    await context.supabase.from("audit_log").insert({
      actor_id: context.userId,
      tenant_id: row.tenant_id,
      action: "lead.update",
      resource_type: "lead",
      resource_id: row.id,
      diff: { status: data.status } as never,
    } as never);
    return { ok: true };
  });

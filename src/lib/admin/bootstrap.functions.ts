import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Concede super_admin ao usuário autenticado APENAS se ainda não existe
 * nenhum super_admin no sistema. Usado para inicializar o painel.
 */
export const bootstrapSuperAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { count, error: countErr } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "super_admin");
    if (countErr) throw new Error(countErr.message);
    if ((count ?? 0) > 0) {
      throw new Error("Já existe um super_admin. Solicite ao administrador atual.");
    }

    const { data: tenant } = await supabaseAdmin
      .from("tenants").select("id").eq("slug", "vsms").single();

    // Garantir membership no tenant padrão
    if (tenant) {
      await supabaseAdmin
        .from("tenant_members")
        .upsert({ tenant_id: tenant.id, user_id: context.userId }, { onConflict: "tenant_id,user_id" });
    }

    const { error: insErr } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "super_admin", tenant_id: null });
    if (insErr) throw new Error(insErr.message);

    return { ok: true };
  });

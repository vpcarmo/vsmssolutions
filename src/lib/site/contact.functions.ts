import { createServerFn } from "@tanstack/react-start";

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
};

function clean(v: unknown, max: number) {
  return String(v ?? "").trim().slice(0, max);
}

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d: ContactInput) => {
    const name = clean(d?.name, 120);
    const email = clean(d?.email, 200).toLowerCase();
    const subject = clean(d?.subject, 60);
    const message = clean(d?.message, 2000);
    const company = clean(d?.company, 120);
    const phone = clean(d?.phone, 40);
    if (name.length < 2) throw new Error("Informe seu nome");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("E-mail inválido");
    if (message.length < 5) throw new Error("Mensagem muito curta");
    if (!subject) throw new Error("Selecione um assunto");
    return { name, email, subject, message, company, phone };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Locate the active public contact form
    const { data: form, error: fErr } = await supabaseAdmin
      .from("forms")
      .select("id, tenant_id, product_id")
      .eq("slug", "contato")
      .eq("status", "active")
      .maybeSingle();
    if (fErr) throw new Error(fErr.message);
    if (!form) throw new Error("Formulário de contato indisponível");

    const submissionPayload = {
      form_id: form.id,
      tenant_id: form.tenant_id,
      data: data as never,
      captcha_verified: true,
      is_spam: false,
    } as never;
    const { data: sub, error: sErr } = await supabaseAdmin
      .from("form_submissions")
      .insert(submissionPayload)
      .select("id")
      .single();
    if (sErr) throw new Error(sErr.message);

    const leadPayload = {
      tenant_id: form.tenant_id,
      product_id: form.product_id,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      message: data.message,
      source: "contato",
      status: "new" as const,
      submission_id: sub.id,
      metadata: { subject: data.subject } as never,
    } as never;
    const { data: lead, error: lErr } = await supabaseAdmin
      .from("leads")
      .insert(leadPayload)
      .select("id")
      .single();
    if (lErr) throw new Error(lErr.message);

    await supabaseAdmin.from("audit_log").insert({
      actor_id: null,
      tenant_id: form.tenant_id,
      action: "lead.create",
      resource_type: "lead",
      resource_id: lead.id,
      diff: { source: "contato", submission_id: sub.id, email: data.email } as never,
    } as never);

    return { ok: true, lead_id: lead.id, submission_id: sub.id };
  });

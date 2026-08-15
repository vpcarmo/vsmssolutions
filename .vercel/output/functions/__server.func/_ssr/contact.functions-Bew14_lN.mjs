import { c as createServerRpc } from "./createServerRpc-DGmXBF-b.mjs";
import { c as createServerFn } from "./server-BxRkUJzR.mjs";
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
function clean(v, max) {
  return String(v ?? "").trim().slice(0, max);
}
const submitContact_createServerFn_handler = createServerRpc({
  id: "d796f444f48ba591a3c6a5dd9c4139d4d3f8db582430ca41b5f8533331fa78ec",
  name: "submitContact",
  filename: "src/lib/site/contact.functions.ts"
}, (opts) => submitContact.__executeServer(opts));
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
}).handler(submitContact_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data: form,
    error: fErr
  } = await supabaseAdmin.from("forms").select("id, tenant_id, product_id").eq("slug", "contato").eq("status", "active").maybeSingle();
  if (fErr) throw new Error(fErr.message);
  if (!form) throw new Error("Formulário de contato indisponível");
  const submissionPayload = {
    form_id: form.id,
    tenant_id: form.tenant_id,
    data,
    captcha_verified: true,
    is_spam: false
  };
  const {
    data: sub,
    error: sErr
  } = await supabaseAdmin.from("form_submissions").insert(submissionPayload).select("id").single();
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
    status: "new",
    submission_id: sub.id,
    metadata: {
      subject: data.subject
    }
  };
  const {
    data: lead,
    error: lErr
  } = await supabaseAdmin.from("leads").insert(leadPayload).select("id").single();
  if (lErr) throw new Error(lErr.message);
  await supabaseAdmin.from("audit_log").insert({
    actor_id: null,
    tenant_id: form.tenant_id,
    action: "lead.create",
    resource_type: "lead",
    resource_id: lead.id,
    diff: {
      source: "contato",
      submission_id: sub.id,
      email: data.email
    }
  });
  return {
    ok: true,
    lead_id: lead.id,
    submission_id: sub.id
  };
});
export {
  submitContact_createServerFn_handler
};

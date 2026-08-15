import { c as createServerRpc } from "./createServerRpc-DWPzcmOC.mjs";
import { c as createServerFn } from "./server-CNhjO8y8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-pLPoR55H.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const listForms_createServerFn_handler = createServerRpc({
  id: "a370d360d8e72a56e4017d9f03ca6a90cf9e4f4ce9b60b7fb77c8d7a79bfe6a9",
  name: "listForms",
  filename: "src/lib/admin/inbox.functions.ts"
}, (opts) => listForms.__executeServer(opts));
const listForms = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listForms_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.from("forms").select("id, slug, name, status, product_id, notify_emails, rate_limit_per_hour, created_at").order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const listSubmissions_createServerFn_handler = createServerRpc({
  id: "c33304c20ae24d393295bd3207698ea8fe9cbd025e44af245f0b9c28e373ec5b",
  name: "listSubmissions",
  filename: "src/lib/admin/inbox.functions.ts"
}, (opts) => listSubmissions.__executeServer(opts));
const listSubmissions = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(listSubmissions_createServerFn_handler, async ({
  data,
  context
}) => {
  let q = context.supabase.from("form_submissions").select("id, form_id, data, is_spam, captcha_verified, created_at").order("created_at", {
    ascending: false
  }).limit(200);
  if (data.form_id) q = q.eq("form_id", data.form_id);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  return rows ?? [];
});
const listLeads_createServerFn_handler = createServerRpc({
  id: "70f3d3c452241a1fd6b5d4e0116354d98ed1b20078bd359ec7921bd32adc09e7",
  name: "listLeads",
  filename: "src/lib/admin/inbox.functions.ts"
}, (opts) => listLeads.__executeServer(opts));
const listLeads = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(listLeads_createServerFn_handler, async ({
  data,
  context
}) => {
  let q = context.supabase.from("leads").select("id, name, email, phone, company, message, source, status, score, product_id, created_at, metadata").order("created_at", {
    ascending: false
  }).limit(200);
  if (data.status) q = q.eq("status", data.status);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  return rows ?? [];
});
const updateLeadStatus_createServerFn_handler = createServerRpc({
  id: "9ac535eeb1fb49502fd56b61c04f27761659aeb96fb0ea3fe43b352a765cf230",
  name: "updateLeadStatus",
  filename: "src/lib/admin/inbox.functions.ts"
}, (opts) => updateLeadStatus.__executeServer(opts));
const updateLeadStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.id || !d?.status) throw new Error("id e status obrigatórios");
  return d;
}).handler(updateLeadStatus_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: row,
    error
  } = await context.supabase.from("leads").update({
    status: data.status
  }).eq("id", data.id).select("id, tenant_id").single();
  if (error) throw new Error(error.message);
  await context.supabase.from("audit_log").insert({
    actor_id: context.userId,
    tenant_id: row.tenant_id,
    action: "lead.update",
    resource_type: "lead",
    resource_id: row.id,
    diff: {
      status: data.status
    }
  });
  return {
    ok: true
  };
});
export {
  listForms_createServerFn_handler,
  listLeads_createServerFn_handler,
  listSubmissions_createServerFn_handler,
  updateLeadStatus_createServerFn_handler
};

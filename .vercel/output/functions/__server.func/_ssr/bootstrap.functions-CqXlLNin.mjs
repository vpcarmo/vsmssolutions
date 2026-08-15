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
const bootstrapSuperAdmin_createServerFn_handler = createServerRpc({
  id: "de3dfe91e0525e599a6f5f05f29afae835aedbb0e30e9c2ee302fb5f7b7d9312",
  name: "bootstrapSuperAdmin",
  filename: "src/lib/admin/bootstrap.functions.ts"
}, (opts) => bootstrapSuperAdmin.__executeServer(opts));
const bootstrapSuperAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(bootstrapSuperAdmin_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    count,
    error: countErr
  } = await supabaseAdmin.from("user_roles").select("id", {
    count: "exact",
    head: true
  }).eq("role", "super_admin");
  if (countErr) throw new Error(countErr.message);
  if ((count ?? 0) > 0) {
    throw new Error("Já existe um super_admin. Solicite ao administrador atual.");
  }
  const {
    data: tenant
  } = await supabaseAdmin.from("tenants").select("id").eq("slug", "vsms").single();
  if (tenant) {
    await supabaseAdmin.from("tenant_members").upsert({
      tenant_id: tenant.id,
      user_id: context.userId
    }, {
      onConflict: "tenant_id,user_id"
    });
  }
  const {
    error: insErr
  } = await supabaseAdmin.from("user_roles").insert({
    user_id: context.userId,
    role: "super_admin",
    tenant_id: null
  });
  if (insErr) throw new Error(insErr.message);
  return {
    ok: true
  };
});
export {
  bootstrapSuperAdmin_createServerFn_handler
};

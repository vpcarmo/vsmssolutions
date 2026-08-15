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
function slugify(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);
}
async function logAudit(opts) {
  await opts.supabase.from("audit_log").insert({
    actor_id: opts.userId,
    tenant_id: opts.tenantId,
    action: opts.action,
    resource_type: "product",
    resource_id: opts.resourceId,
    diff: opts.diff ?? null
  });
}
const listProducts_createServerFn_handler = createServerRpc({
  id: "6ad57034589725aa18f79eae0d7e2ec8255e6c9b67b4c7876ae0a719d7152eed",
  name: "listProducts",
  filename: "src/lib/admin/products.functions.ts"
}, (opts) => listProducts.__executeServer(opts));
const listProducts = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listProducts_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.from("products").select("id, tenant_id, name, slug, description, type, status, primary_domain, settings, created_at, updated_at").order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const getProduct_createServerFn_handler = createServerRpc({
  id: "baca22332fcd4e67d789c3f521268787da79be96dcf298eff14db8d672a98ab4",
  name: "getProduct",
  filename: "src/lib/admin/products.functions.ts"
}, (opts) => getProduct.__executeServer(opts));
const getProduct = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.id) throw new Error("id obrigatório");
  return d;
}).handler(getProduct_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: row,
    error
  } = await context.supabase.from("products").select("*").eq("id", data.id).maybeSingle();
  if (error) throw new Error(error.message);
  if (!row) throw new Error("Produto não encontrado");
  return row;
});
const createProduct_createServerFn_handler = createServerRpc({
  id: "bdfcacb12c066aa2e0c6b15efef96283650c7caddd240de29ae427e4a441224b",
  name: "createProduct",
  filename: "src/lib/admin/products.functions.ts"
}, (opts) => createProduct.__executeServer(opts));
const createProduct = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.name?.trim()) throw new Error("Nome é obrigatório");
  return {
    name: d.name.trim(),
    slug: slugify(d.slug?.trim() || d.name),
    description: d.description?.trim() || null,
    type: d.type ?? "saas",
    status: d.status ?? "active",
    primary_domain: d.primary_domain?.trim() || null
  };
}).handler(createProduct_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: row,
    error
  } = await context.supabase.from("products").insert(data).select("*").single();
  if (error) throw new Error(error.message);
  await logAudit({
    supabase: context.supabase,
    userId: context.userId,
    tenantId: row.tenant_id,
    action: "product.create",
    resourceId: row.id,
    diff: {
      after: data
    }
  });
  return row;
});
const updateProduct_createServerFn_handler = createServerRpc({
  id: "1e9b813ddf129ab168ebf65fadd3ae13c0055f16410a4f3bf056272163c9ba75",
  name: "updateProduct",
  filename: "src/lib/admin/products.functions.ts"
}, (opts) => updateProduct.__executeServer(opts));
const updateProduct = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.id) throw new Error("id obrigatório");
  const patch = {};
  if (d.name !== void 0) patch.name = d.name.trim();
  if (d.slug !== void 0) patch.slug = slugify(d.slug);
  if (d.description !== void 0) patch.description = d.description?.trim() || null;
  if (d.type !== void 0) patch.type = d.type;
  if (d.status !== void 0) patch.status = d.status;
  if (d.primary_domain !== void 0) patch.primary_domain = d.primary_domain?.trim() || null;
  return {
    id: d.id,
    patch
  };
}).handler(updateProduct_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: before
  } = await context.supabase.from("products").select("*").eq("id", data.id).maybeSingle();
  const {
    data: row,
    error
  } = await context.supabase.from("products").update(data.patch).eq("id", data.id).select("*").single();
  if (error) throw new Error(error.message);
  await logAudit({
    supabase: context.supabase,
    userId: context.userId,
    tenantId: row.tenant_id,
    action: "product.update",
    resourceId: row.id,
    diff: {
      before,
      after: row
    }
  });
  return row;
});
const setProductStatus_createServerFn_handler = createServerRpc({
  id: "883764c6d98ab48c92f88d75421a561f35ed8f831df1fabadc905a7297de2208",
  name: "setProductStatus",
  filename: "src/lib/admin/products.functions.ts"
}, (opts) => setProductStatus.__executeServer(opts));
const setProductStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.id || !d?.status) throw new Error("id e status obrigatórios");
  return d;
}).handler(setProductStatus_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: row,
    error
  } = await context.supabase.from("products").update({
    status: data.status
  }).eq("id", data.id).select("*").single();
  if (error) throw new Error(error.message);
  await logAudit({
    supabase: context.supabase,
    userId: context.userId,
    tenantId: row.tenant_id,
    action: data.status === "active" ? "product.activate" : "product.deactivate",
    resourceId: row.id,
    diff: {
      status: data.status
    }
  });
  return row;
});
export {
  createProduct_createServerFn_handler,
  getProduct_createServerFn_handler,
  listProducts_createServerFn_handler,
  setProductStatus_createServerFn_handler,
  updateProduct_createServerFn_handler
};

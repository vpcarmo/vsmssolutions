import { c as createServerRpc } from "./createServerRpc-CPNXU9mL.mjs";
import { c as createServerFn } from "./server-DfH1wd4N.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-MXl0BiEw.mjs";
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
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
async function logAudit(opts) {
  await opts.supabase.from("audit_log").insert({
    actor_id: opts.userId,
    tenant_id: opts.tenantId,
    action: opts.action,
    resource_type: "seo_meta",
    resource_id: opts.resourceId,
    diff: opts.diff ?? null
  });
}
const listSeo_createServerFn_handler = createServerRpc({
  id: "7a2f604fd1e4804effad11384a15241bc8ac34f9cd27885dd7adbd807e55bbfb",
  name: "listSeo",
  filename: "src/lib/admin/seo.functions.ts"
}, (opts) => listSeo.__executeServer(opts));
const listSeo = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(listSeo_createServerFn_handler, async ({
  data,
  context
}) => {
  let q = context.supabase.from("seo_meta").select("*").order("updated_at", {
    ascending: false
  });
  if (data.resource_type) q = q.eq("resource_type", data.resource_type);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  return rows ?? [];
});
const getSeoByResource_createServerFn_handler = createServerRpc({
  id: "458de2d924798f22bd7d48325427b9f9df95d6235a8db73354f8aa89d520df38",
  name: "getSeoByResource",
  filename: "src/lib/admin/seo.functions.ts"
}, (opts) => getSeoByResource.__executeServer(opts));
const getSeoByResource = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.resource_type || !d?.resource_id) throw new Error("resource_type e resource_id obrigatórios");
  return d;
}).handler(getSeoByResource_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: row,
    error
  } = await context.supabase.from("seo_meta").select("*").eq("resource_type", data.resource_type).eq("resource_id", data.resource_id).maybeSingle();
  if (error) throw new Error(error.message);
  return row;
});
const upsertSeo_createServerFn_handler = createServerRpc({
  id: "99e9f356695549077a1f012388dcdfdf927af909b75970e6f7c7fa3b75d18ba8",
  name: "upsertSeo",
  filename: "src/lib/admin/seo.functions.ts"
}, (opts) => upsertSeo.__executeServer(opts));
const upsertSeo = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.resource_type || !d?.resource_id) throw new Error("resource_type e resource_id obrigatórios");
  return d;
}).handler(upsertSeo_createServerFn_handler, async ({
  data,
  context
}) => {
  let tenantId = null;
  const tableMap = {
    page: "pages",
    product: "products",
    post: "posts"
  };
  const tbl = tableMap[data.resource_type];
  if (tbl) {
    const {
      data: parent
    } = await context.supabase.from(tbl).select("tenant_id").eq("id", data.resource_id).maybeSingle();
    tenantId = parent?.tenant_id ?? null;
  }
  if (!tenantId) {
    const {
      data: t
    } = await context.supabase.rpc("current_tenant_id");
    tenantId = t;
  }
  const {
    data: existing
  } = await context.supabase.from("seo_meta").select("*").eq("resource_type", data.resource_type).eq("resource_id", data.resource_id).maybeSingle();
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
    json_ld: data.json_ld ?? null
  };
  const {
    data: row,
    error
  } = await context.supabase.from("seo_meta").upsert(payload, {
    onConflict: "resource_type,resource_id"
  }).select("*").single();
  if (error) throw new Error(error.message);
  await logAudit({
    supabase: context.supabase,
    userId: context.userId,
    tenantId,
    action: existing ? "seo.update" : "seo.create",
    resourceId: row.id,
    diff: {
      before: existing ?? null,
      after: row
    }
  });
  return row;
});
const deleteSeo_createServerFn_handler = createServerRpc({
  id: "22665529cab2a29226b84d9a63f9d3545b09c2c64e61529ddcb292d742caf4c0",
  name: "deleteSeo",
  filename: "src/lib/admin/seo.functions.ts"
}, (opts) => deleteSeo.__executeServer(opts));
const deleteSeo = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.id) throw new Error("id obrigatório");
  return d;
}).handler(deleteSeo_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: existing
  } = await context.supabase.from("seo_meta").select("*").eq("id", data.id).maybeSingle();
  if (!existing) throw new Error("Registro não encontrado");
  const {
    error
  } = await context.supabase.from("seo_meta").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  await logAudit({
    supabase: context.supabase,
    userId: context.userId,
    tenantId: existing.tenant_id,
    action: "seo.delete",
    resourceId: data.id,
    diff: {
      before: existing
    }
  });
  return {
    ok: true
  };
});
const seoOverview_createServerFn_handler = createServerRpc({
  id: "abedb491791dbab2a991700d28826765f16da8574d2a8fa29a8b964873886c0c",
  name: "seoOverview",
  filename: "src/lib/admin/seo.functions.ts"
}, (opts) => seoOverview.__executeServer(opts));
const seoOverview = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(seoOverview_createServerFn_handler, async ({
  context
}) => {
  const [{
    data: pages
  }, {
    data: seos
  }] = await Promise.all([context.supabase.from("pages").select("id, title, status, product_id"), context.supabase.from("seo_meta").select("resource_type, resource_id, title, description, noindex")]);
  const pageSeoByResource = new Map((seos ?? []).filter((s) => s.resource_type === "page").map((s) => [s.resource_id, s]));
  const allPages = pages ?? [];
  let configured = 0;
  let missing = 0;
  let missingTitle = 0;
  let missingDescription = 0;
  let noindexed = 0;
  const pagesWithoutSeo = [];
  for (const p of allPages) {
    const s = pageSeoByResource.get(p.id);
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
    totalSeoRecords: (seos ?? []).length
  };
});
export {
  deleteSeo_createServerFn_handler,
  getSeoByResource_createServerFn_handler,
  listSeo_createServerFn_handler,
  seoOverview_createServerFn_handler,
  upsertSeo_createServerFn_handler
};

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
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96);
}
async function logAudit(opts) {
  await opts.supabase.from("audit_log").insert({
    actor_id: opts.userId,
    tenant_id: opts.tenantId,
    action: opts.action,
    resource_type: "page",
    resource_id: opts.resourceId,
    diff: opts.diff ?? null
  });
}
const listPages_createServerFn_handler = createServerRpc({
  id: "d709595741049676d2724177ee0dd5270ee72b903fbe3570db6fc89c25d127b3",
  name: "listPages",
  filename: "src/lib/admin/pages.functions.ts"
}, (opts) => listPages.__executeServer(opts));
const listPages = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(listPages_createServerFn_handler, async ({
  data,
  context
}) => {
  let q = context.supabase.from("pages").select("id, tenant_id, product_id, title, slug, excerpt, content_type, template, status, published_at, tags, categories, author_id, created_at, updated_at").order("updated_at", {
    ascending: false
  });
  if (data.product_id) q = q.eq("product_id", data.product_id);
  if (data.content_type) q = q.eq("content_type", data.content_type);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  return rows ?? [];
});
const getPage_createServerFn_handler = createServerRpc({
  id: "13afc0384a5c46596542f631d78fc90aa5b567f805f79f50a576fd5687830557",
  name: "getPage",
  filename: "src/lib/admin/pages.functions.ts"
}, (opts) => getPage.__executeServer(opts));
const getPage = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.id) throw new Error("id obrigatório");
  return d;
}).handler(getPage_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: row,
    error
  } = await context.supabase.from("pages").select("*").eq("id", data.id).maybeSingle();
  if (error) throw new Error(error.message);
  if (!row) throw new Error("Página não encontrada");
  return row;
});
const createPage_createServerFn_handler = createServerRpc({
  id: "8785df426776438defa6dc396011a8aeb5105eeae0335c79ca3975e1075809a5",
  name: "createPage",
  filename: "src/lib/admin/pages.functions.ts"
}, (opts) => createPage.__executeServer(opts));
const createPage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
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
    og_image_url: d.og_image_url?.trim() || null
  };
}).handler(createPage_createServerFn_handler, async ({
  data,
  context
}) => {
  const insert = {
    ...data,
    created_by: context.userId,
    author_id: context.userId
  };
  const {
    data: row,
    error
  } = await context.supabase.from("pages").insert(insert).select("*").single();
  if (error) throw new Error(error.message);
  await logAudit({
    supabase: context.supabase,
    userId: context.userId,
    tenantId: row.tenant_id,
    action: "page.create",
    resourceId: row.id,
    diff: {
      after: data
    }
  });
  return row;
});
const updatePage_createServerFn_handler = createServerRpc({
  id: "d1c28225d5f93f981cde21136ccf224483e8f80515a23585bb8f5c55991db32a",
  name: "updatePage",
  filename: "src/lib/admin/pages.functions.ts"
}, (opts) => updatePage.__executeServer(opts));
const updatePage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.id) throw new Error("id obrigatório");
  const patch = {};
  if (d.title !== void 0) patch.title = d.title.trim();
  if (d.slug !== void 0) patch.slug = slugify(d.slug);
  if (d.excerpt !== void 0) patch.excerpt = d.excerpt?.trim() || null;
  if (d.content !== void 0) patch.content = d.content;
  if (d.content_type !== void 0) patch.content_type = d.content_type;
  if (d.template !== void 0) patch.template = d.template;
  if (d.parent_id !== void 0) patch.parent_id = d.parent_id;
  if (d.tags !== void 0) patch.tags = d.tags;
  if (d.categories !== void 0) patch.categories = d.categories;
  if (d.seo_title !== void 0) patch.seo_title = d.seo_title?.trim() || null;
  if (d.seo_description !== void 0) patch.seo_description = d.seo_description?.trim() || null;
  if (d.og_image_url !== void 0) patch.og_image_url = d.og_image_url?.trim() || null;
  if (d.product_id !== void 0) patch.product_id = d.product_id;
  return {
    id: d.id,
    patch
  };
}).handler(updatePage_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: before
  } = await context.supabase.from("pages").select("*").eq("id", data.id).maybeSingle();
  const {
    data: row,
    error
  } = await context.supabase.from("pages").update(data.patch).eq("id", data.id).select("*").single();
  if (error) throw new Error(error.message);
  await logAudit({
    supabase: context.supabase,
    userId: context.userId,
    tenantId: row.tenant_id,
    action: "page.update",
    resourceId: row.id,
    diff: {
      before,
      after: row
    }
  });
  return row;
});
const setPageStatus_createServerFn_handler = createServerRpc({
  id: "d404e58cad022372d9722ec014d57649a3099ad9c04329c40d4178bb29c8c81c",
  name: "setPageStatus",
  filename: "src/lib/admin/pages.functions.ts"
}, (opts) => setPageStatus.__executeServer(opts));
const setPageStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.id || !d?.status) throw new Error("id e status obrigatórios");
  return d;
}).handler(setPageStatus_createServerFn_handler, async ({
  data,
  context
}) => {
  const patch = {
    status: data.status
  };
  if (data.status === "published") patch.published_at = (/* @__PURE__ */ new Date()).toISOString();
  if (data.status === "archived") patch.archived_at = (/* @__PURE__ */ new Date()).toISOString();
  const {
    data: row,
    error
  } = await context.supabase.from("pages").update(patch).eq("id", data.id).select("*").single();
  if (error) throw new Error(error.message);
  const action = data.status === "published" ? "page.publish" : data.status === "archived" ? "page.archive" : "page.draft";
  await logAudit({
    supabase: context.supabase,
    userId: context.userId,
    tenantId: row.tenant_id,
    action,
    resourceId: row.id,
    diff: {
      status: data.status
    }
  });
  return row;
});
export {
  createPage_createServerFn_handler,
  getPage_createServerFn_handler,
  listPages_createServerFn_handler,
  setPageStatus_createServerFn_handler,
  updatePage_createServerFn_handler
};

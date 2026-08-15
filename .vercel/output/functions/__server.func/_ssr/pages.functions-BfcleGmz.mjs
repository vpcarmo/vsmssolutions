import { c as createSsrRpc } from "./router-DrCA9Lcc.mjs";
import { c as createServerFn } from "./server-BxRkUJzR.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-Db3P2fQk.mjs";
function slugify(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96);
}
const listPages = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(createSsrRpc("d709595741049676d2724177ee0dd5270ee72b903fbe3570db6fc89c25d127b3"));
const getPage = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.id) throw new Error("id obrigatório");
  return d;
}).handler(createSsrRpc("13afc0384a5c46596542f631d78fc90aa5b567f805f79f50a576fd5687830557"));
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
}).handler(createSsrRpc("8785df426776438defa6dc396011a8aeb5105eeae0335c79ca3975e1075809a5"));
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
}).handler(createSsrRpc("d1c28225d5f93f981cde21136ccf224483e8f80515a23585bb8f5c55991db32a"));
const setPageStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.id || !d?.status) throw new Error("id e status obrigatórios");
  return d;
}).handler(createSsrRpc("d404e58cad022372d9722ec014d57649a3099ad9c04329c40d4178bb29c8c81c"));
export {
  createPage as c,
  getPage as g,
  listPages as l,
  setPageStatus as s,
  updatePage as u
};

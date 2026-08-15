import { c as createSsrRpc } from "./router-BkXkNhUB.mjs";
import { c as createServerFn } from "./server-CNhjO8y8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-pLPoR55H.mjs";
function slugify(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);
}
const listProducts = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("6ad57034589725aa18f79eae0d7e2ec8255e6c9b67b4c7876ae0a719d7152eed"));
const getProduct = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.id) throw new Error("id obrigatório");
  return d;
}).handler(createSsrRpc("baca22332fcd4e67d789c3f521268787da79be96dcf298eff14db8d672a98ab4"));
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
}).handler(createSsrRpc("bdfcacb12c066aa2e0c6b15efef96283650c7caddd240de29ae427e4a441224b"));
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
}).handler(createSsrRpc("1e9b813ddf129ab168ebf65fadd3ae13c0055f16410a4f3bf056272163c9ba75"));
const setProductStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.id || !d?.status) throw new Error("id e status obrigatórios");
  return d;
}).handler(createSsrRpc("883764c6d98ab48c92f88d75421a561f35ed8f831df1fabadc905a7297de2208"));
export {
  createProduct as c,
  getProduct as g,
  listProducts as l,
  setProductStatus as s,
  updateProduct as u
};

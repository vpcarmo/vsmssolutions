import { c as createSsrRpc } from "./router-DrCA9Lcc.mjs";
import { c as createServerFn } from "./server-BxRkUJzR.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-Db3P2fQk.mjs";
const listForms = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("a370d360d8e72a56e4017d9f03ca6a90cf9e4f4ce9b60b7fb77c8d7a79bfe6a9"));
const listSubmissions = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(createSsrRpc("c33304c20ae24d393295bd3207698ea8fe9cbd025e44af245f0b9c28e373ec5b"));
const listLeads = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(createSsrRpc("70f3d3c452241a1fd6b5d4e0116354d98ed1b20078bd359ec7921bd32adc09e7"));
const updateLeadStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.id || !d?.status) throw new Error("id e status obrigatórios");
  return d;
}).handler(createSsrRpc("9ac535eeb1fb49502fd56b61c04f27761659aeb96fb0ea3fe43b352a765cf230"));
export {
  listSubmissions as a,
  listLeads as b,
  listForms as l,
  updateLeadStatus as u
};

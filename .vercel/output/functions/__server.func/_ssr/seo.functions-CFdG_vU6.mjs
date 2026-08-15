import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./button-DjOZMqFS.mjs";
import { c as createSsrRpc } from "./router-DrCA9Lcc.mjs";
import { c as createServerFn } from "./server-BxRkUJzR.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-Db3P2fQk.mjs";
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const listSeo = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(createSsrRpc("7a2f604fd1e4804effad11384a15241bc8ac34f9cd27885dd7adbd807e55bbfb"));
const getSeoByResource = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.resource_type || !d?.resource_id) throw new Error("resource_type e resource_id obrigatórios");
  return d;
}).handler(createSsrRpc("458de2d924798f22bd7d48325427b9f9df95d6235a8db73354f8aa89d520df38"));
const upsertSeo = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.resource_type || !d?.resource_id) throw new Error("resource_type e resource_id obrigatórios");
  return d;
}).handler(createSsrRpc("99e9f356695549077a1f012388dcdfdf927af909b75970e6f7c7fa3b75d18ba8"));
const deleteSeo = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => {
  if (!d?.id) throw new Error("id obrigatório");
  return d;
}).handler(createSsrRpc("22665529cab2a29226b84d9a63f9d3545b09c2c64e61529ddcb292d742caf4c0"));
const seoOverview = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("abedb491791dbab2a991700d28826765f16da8574d2a8fa29a8b964873886c0c"));
export {
  Card as C,
  CardHeader as a,
  CardTitle as b,
  CardContent as c,
  deleteSeo as d,
  getSeoByResource as g,
  listSeo as l,
  seoOverview as s,
  upsertSeo as u
};

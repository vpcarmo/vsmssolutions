import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { L as LegalPage } from "./LegalPage-GMl7Wadz.mjs";
import { g as getPublicPage } from "./router-CPmUjF1E.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./server-DfH1wd4N.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-MXl0BiEw.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./client-BHmQHd0X.mjs";
import "../_libs/lucide-react.mjs";
function TermosPage() {
  const {
    data: page
  } = useQuery({
    queryKey: ["page", "termos"],
    queryFn: () => getPublicPage({
      data: {
        slug: "termos"
      }
    }),
    staleTime: 6e4
  });
  const c = page?.content ?? {};
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LegalPage, { title: page?.title ?? "Termos de Uso", lead: c.lead ?? page?.excerpt ?? "Condições gerais de uso.", children: (c.sections ?? []).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    s.heading && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: s.heading }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: s.body })
  ] }, i)) });
}
export {
  TermosPage as component
};

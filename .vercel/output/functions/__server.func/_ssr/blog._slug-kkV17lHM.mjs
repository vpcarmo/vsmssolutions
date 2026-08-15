import { j as jsxRuntimeExports } from "../_libs/react.mjs";
const SplitErrorComponent = ({
  reset
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-6 py-32 text-center", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Erro ao carregar o post" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: reset, className: "mt-6 rounded-md bg-gradient-brand px-4 py-2 text-sm text-brand-foreground", children: "Tentar novamente" })
] });
export {
  SplitErrorComponent as errorComponent
};

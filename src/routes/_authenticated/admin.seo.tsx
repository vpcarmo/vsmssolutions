import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/seo")({
  head: () => ({ meta: [{ title: "SEO — VSMS Admin" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: () => <Outlet />,
});

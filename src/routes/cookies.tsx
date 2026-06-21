import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { LegalPage } from "@/components/site/LegalPage";
import { getPublicPage } from "@/lib/site/site.functions";

type LegalContent = { lead?: string; sections?: { heading?: string; body: string }[] };

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies — VSMS Solutions" },
      { name: "description", content: "Como a VSMS Solutions utiliza cookies neste site." },
      { property: "og:url", content: "https://vsms.com.br/cookies" },
    ],
    links: [{ rel: "canonical", href: "https://vsms.com.br/cookies" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  const { data: page } = useQuery({
    queryKey: ["page", "cookies"],
    queryFn: () => getPublicPage({ data: { slug: "cookies" } }),
    staleTime: 60_000,
  });
  const c = (page?.content ?? {}) as LegalContent;
  return (
    <LegalPage title={page?.title ?? "Política de Cookies"} lead={c.lead ?? page?.excerpt ?? "Uso de cookies neste site."}>
      {(c.sections ?? []).map((s, i) => (
        <div key={i}>
          {s.heading && <h2>{s.heading}</h2>}
          <p>{s.body}</p>
        </div>
      ))}
    </LegalPage>
  );
}

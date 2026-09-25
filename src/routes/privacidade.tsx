import { createFileRoute } from "@tanstack/react-router";
import { useLoaderData } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { getPublicPage } from "@/lib/site/site.functions";

type LegalContent = { lead?: string; sections?: { heading?: string; body: string }[] };

function makeLegal(
  fallbackTitle: string,
  fallbackLead: string,
  routeId: "/privacidade" | "/cookies" | "/termos",
) {
  return function LegalRoute() {
    const page = useLoaderData({ from: routeId });
    const c = (page?.content ?? {}) as LegalContent;
    return (
      <LegalPage title={page?.title ?? fallbackTitle} lead={c.lead ?? page?.excerpt ?? fallbackLead}>
        {(c.sections ?? []).map((s, i) => (
          <div key={i}>
            {s.heading && <h2>{s.heading}</h2>}
            <p>{s.body}</p>
          </div>
        ))}
      </LegalPage>
    );
  };
}

export const Route = createFileRoute("/privacidade")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["page", "privacidade"],
      queryFn: () => getPublicPage({ data: { slug: "privacidade" } }),
      staleTime: 60_000,
    }),
  head: () => ({
    meta: [
      { title: "Política de Privacidade — VSMS Solutions" },
      { name: "description", content: "Como a VSMS Solutions coleta, usa e protege os dados pessoais." },
      { property: "og:url", content: "https://vsms.com.br/privacidade" },
    ],
    links: [{ rel: "canonical", href: "https://vsms.com.br/privacidade" }],
  }),
  component: makeLegal("Política de Privacidade", "Como tratamos seus dados conforme a LGPD.", "/privacidade"),
});

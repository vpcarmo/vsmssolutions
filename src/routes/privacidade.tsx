import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { LegalPage } from "@/components/site/LegalPage";
import { getPublicPage } from "@/lib/site/site.functions";

type LegalContent = { lead?: string; sections?: { heading?: string; body: string }[] };

function makeLegal(slug: "privacidade" | "cookies" | "termos", fallbackTitle: string, fallbackLead: string) {
  return function LegalRoute() {
    const { data: page } = useQuery({
      queryKey: ["page", slug],
      queryFn: () => getPublicPage({ data: { slug } }),
      staleTime: 60_000,
    });
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
  head: () => ({
    meta: [
      { title: "Política de Privacidade — VSMS Solutions" },
      { name: "description", content: "Como a VSMS Solutions coleta, usa e protege os dados pessoais." },
      { property: "og:url", content: "https://vsms.com.br/privacidade" },
    ],
    links: [{ rel: "canonical", href: "https://vsms.com.br/privacidade" }],
  }),
  component: makeLegal("privacidade", "Política de Privacidade", "Como tratamos seus dados conforme a LGPD."),
});

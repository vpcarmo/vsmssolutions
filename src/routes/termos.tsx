import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { getPublicPage } from "@/lib/site/site.functions";

type LegalContent = { lead?: string; sections?: { heading?: string; body: string }[] };

export const Route = createFileRoute("/termos")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["page", "termos"],
      queryFn: () => getPublicPage({ data: { slug: "termos" } }),
      staleTime: 60_000,
    }),
  head: () => ({
    meta: [
      { title: "Termos de Uso — VSMS Solutions" },
      { name: "description", content: "Condições gerais de uso do site da VSMS Solutions." },
      { property: "og:url", content: "https://vsms.com.br/termos" },
    ],
    links: [{ rel: "canonical", href: "https://vsms.com.br/termos" }],
  }),
  component: TermosPage,
});

function TermosPage() {
  const page = Route.useLoaderData();
  const c = (page?.content ?? {}) as LegalContent;
  return (
    <LegalPage title={page?.title ?? "Termos de Uso"} lead={c.lead ?? page?.excerpt ?? "Condições gerais de uso."}>
      {(c.sections ?? []).map((s, i) => (
        <div key={i}>
          {s.heading && <h2>{s.heading}</h2>}
          <p>{s.body}</p>
        </div>
      ))}
    </LegalPage>
  );
}

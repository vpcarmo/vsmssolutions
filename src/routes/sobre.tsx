import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Target, Eye, Heart, Trophy } from "lucide-react";
import { getPublicPage } from "@/lib/site/site.functions";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — VSMS Solutions" },
      { name: "description", content: "VSMS Solutions: empresa de tecnologia orientada a produto, focada em SaaS próprios, IA aplicada e operação contínua de plataformas digitais." },
      { property: "og:title", content: "Sobre a VSMS Solutions — Empresa de produto" },
      { property: "og:description", content: "Empresa orientada a produto: SaaS próprios, IA aplicada e ecossistema em expansão." },
      { property: "og:url", content: "https://vsms.com.br/sobre" },
    ],
    links: [{ rel: "canonical", href: "https://vsms.com.br/sobre" }],
  }),
  component: Sobre,
});

function Sobre() {
  const { data: page } = useQuery({
    queryKey: ["page", "sobre"],
    queryFn: () => getPublicPage({ data: { slug: "sobre" } }),
    staleTime: 60_000,
  });
  const sections = ((page?.content as any)?.sections ?? []) as { heading?: string; body?: string }[];
  const title = page?.title ?? "Uma empresa orientada a produto";
  const intro = page?.excerpt ?? "A VSMS Solutions cria e opera produtos digitais, plataformas SaaS e soluções de inteligência artificial — pensados para escalar e evoluir junto com pessoas e empresas.";

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-32 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-sm font-medium text-primary">Sobre nós</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">{title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">{intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="prose-invert max-w-none space-y-6 text-muted-foreground">
          {sections.length > 0 ? (
            sections.map((s, i) => (
              <div key={i}>
                {s.heading && <h2 className="text-2xl font-semibold text-foreground">{s.heading}</h2>}
                {s.body && <p className="mt-3 whitespace-pre-line">{s.body}</p>}
              </div>
            ))
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-foreground">Nossa história</h2>
              <p>
                A VSMS Solutions nasceu com uma convicção clara: o maior impacto da tecnologia acontece quando ela vira produto — algo que pode ser usado, evoluído e operado em escala, todos os dias.
              </p>
            </>
          )}
        </div>
      </section>

      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-24 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Target, title: "Missão", desc: "Criar produtos digitais e plataformas de IA que geram valor real e duradouro." },
            { icon: Eye, title: "Visão", desc: "Ser referência em ecossistemas SaaS e soluções de IA escaláveis e sustentáveis." },
            { icon: Heart, title: "Valores", desc: "Foco em produto, excelência técnica, transparência e visão de longo prazo." },
            { icon: Trophy, title: "Objetivo", desc: "Expandir o ecossistema VSMS com novos produtos e impacto crescente." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-2xl font-semibold">O que nos define</h2>
        <ul className="mt-6 grid gap-3 text-muted-foreground md:grid-cols-2">
          {[
            "Empresa orientada a produto, não a serviço sob demanda",
            "Ecossistema próprio de SaaS e ferramentas de IA",
            "Operação contínua com SLA e evolução constante",
            "Stack moderna e escalável desde o dia 1",
            "Serviços de apoio como complemento estratégico",
            "Visão de longo prazo em cada produto que lançamos",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

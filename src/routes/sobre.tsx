import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart, Trophy } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — VSMS Solutions" },
      { name: "description", content: "Conheça a VSMS Solutions: história, missão, visão e valores da empresa de tecnologia." },
      { property: "og:title", content: "Sobre a VSMS Solutions" },
      { property: "og:description", content: "Nossa história, missão, visão e valores." },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-32 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-sm font-medium text-primary">Sobre nós</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">
            Tecnologia com <span className="text-gradient">propósito</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Nascemos com uma convicção: software bem feito muda negócios. Hoje
            unimos engenharia, design e IA para entregar soluções que geram
            resultado real.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="prose-invert max-w-none space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-semibold text-foreground">Nossa história</h2>
          <p>
            A VSMS Solutions foi criada para preencher uma lacuna comum no
            mercado brasileiro: empresas que precisam de tecnologia de
            qualidade, mas raramente encontram parceiros que combinem
            execução técnica de alto nível com visão de negócio.
          </p>
          <p>
            Começamos com projetos pontuais e evoluímos para uma operação
            completa de desenvolvimento de produtos digitais, SaaS, IA e
            automação. Cada projeto entregue reforça nosso compromisso:
            código limpo, prazos honestos e resultado mensurável.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-24 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Target, title: "Missão", desc: "Transformar ideias em produtos digitais que geram valor real para pessoas e empresas." },
            { icon: Eye, title: "Visão", desc: "Ser referência em soluções tecnológicas inovadoras, escaláveis e sustentáveis." },
            { icon: Heart, title: "Valores", desc: "Excelência técnica, transparência, parceria de longo prazo e foco em resultado." },
            { icon: Trophy, title: "Objetivo", desc: "Acelerar a transformação digital de empresas em todos os portes e segmentos." },
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
        <h2 className="text-2xl font-semibold">Diferenciais competitivos</h2>
        <ul className="mt-6 grid gap-3 text-muted-foreground md:grid-cols-2">
          {[
            "Time multidisciplinar com experiência em produtos reais",
            "Stack moderna e escalável desde o dia 1",
            "Metodologia ágil com entregas frequentes",
            "Comunicação direta, sem camadas burocráticas",
            "Cuidado obsessivo com performance e segurança",
            "Suporte contínuo após o go-live",
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

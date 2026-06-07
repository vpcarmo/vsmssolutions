import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — VSMS Solutions" },
      { name: "description", content: "Condições gerais de uso do site da VSMS Solutions." },
      { property: "og:url", content: "/termos" },
    ],
    links: [{ rel: "canonical", href: "/termos" }],
  }),
  component: () => (
    <LegalPage
      title="Termos de Uso"
      lead="Ao utilizar este site, você concorda com as condições descritas abaixo."
    >
      <h2>1. Aceitação</h2>
      <p>O uso deste site implica concordância integral com estes termos. Caso não concorde, por favor não utilize o site.</p>
      <h2>2. Propriedade intelectual</h2>
      <p>Todo o conteúdo — marca, textos, imagens, código — é de propriedade da VSMS Solutions ou licenciado, e não pode ser reproduzido sem autorização.</p>
      <h2>3. Limitação de responsabilidade</h2>
      <p>O conteúdo do site tem caráter informativo. A VSMS Solutions não se responsabiliza por decisões tomadas com base apenas nas informações aqui apresentadas.</p>
      <h2>4. Alterações</h2>
      <p>Estes termos podem ser atualizados a qualquer momento. A versão vigente estará sempre disponível nesta página.</p>
    </LegalPage>
  ),
});

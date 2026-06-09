import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies — VSMS Solutions" },
      { name: "description", content: "Como a VSMS Solutions utiliza cookies neste site." },
      { property: "og:url", content: "https://vsms.com.br/cookies" },
    ],
    links: [{ rel: "canonical", href: "https://vsms.com.br/cookies" }],
  }),
  component: () => (
    <LegalPage
      title="Política de Cookies"
      lead="Utilizamos cookies para garantir a melhor experiência e medir o desempenho do site."
    >
      <h2>1. O que são cookies</h2>
      <p>Cookies são pequenos arquivos armazenados no seu dispositivo que ajudam o site a lembrar preferências e medir o uso.</p>
      <h2>2. Cookies que usamos</h2>
      <p>Utilizamos cookies essenciais (necessários ao funcionamento) e analíticos (para entender o uso de forma agregada e anônima).</p>
      <h2>3. Como gerenciar</h2>
      <p>Você pode bloquear ou apagar cookies pelas configurações do seu navegador. Algumas funcionalidades podem deixar de operar normalmente.</p>
    </LegalPage>
  ),
});

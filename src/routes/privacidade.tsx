import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — VSMS Solutions" },
      { name: "description", content: "Como a VSMS Solutions coleta, usa e protege os dados pessoais." },
      { property: "og:url", content: "/privacidade" },
    ],
    links: [{ rel: "canonical", href: "/privacidade" }],
  }),
  component: () => (
    <LegalPage
      title="Política de Privacidade"
      lead="Sua privacidade importa. Esta política descreve como tratamos seus dados pessoais conforme a LGPD."
    >
      <h2>1. Dados coletados</h2>
      <p>Coletamos apenas os dados estritamente necessários para responder seu contato ou prestar o serviço contratado.</p>
      <h2>2. Uso dos dados</h2>
      <p>Os dados são utilizados para comunicação, prestação de serviços e cumprimento de obrigações legais. Não vendemos dados.</p>
      <h2>3. Compartilhamento</h2>
      <p>Compartilhamos dados apenas com fornecedores essenciais à operação (hospedagem, e-mail) e sempre com base contratual adequada.</p>
      <h2>4. Direitos do titular</h2>
      <p>Você pode solicitar acesso, correção ou exclusão de seus dados a qualquer momento pelo e-mail contato@vsms.com.br.</p>
      <h2>5. Segurança</h2>
      <p>Aplicamos boas práticas de segurança da informação para proteger os dados sob nossa responsabilidade.</p>
    </LegalPage>
  ),
});

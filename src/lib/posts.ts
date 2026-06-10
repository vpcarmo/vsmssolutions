export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  readingTime: string;
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "como-ia-transforma-pmes",
    title: "Como a IA está transformando PMEs brasileiras",
    excerpt:
      "Não é hype. Pequenas e médias empresas brasileiras já colhem resultados reais com IA aplicada ao dia a dia.",
    date: "12 mar 2026",
    tag: "Inteligência Artificial",
    readingTime: "6 min",
    content: [
      "A inteligência artificial deixou de ser uma promessa distante. Em 2026, qualquer empresa que ignore essa onda corre o risco de ficar para trás — e a boa notícia é que adotar IA hoje é mais acessível do que nunca.",
      "Vemos PMEs usando agentes de IA para qualificar leads, copilots internos para acelerar o atendimento e modelos especializados para extrair valor de dados antes esquecidos em planilhas e PDFs.",
      "O segredo está em começar pequeno: identifique um processo repetitivo, mensure o tempo gasto e desenhe uma automação inteligente que tenha ROI claro nos primeiros 30 dias.",
      "Na VSMS, nossa abordagem é sempre orientada a resultado: nada de IA por IA. Cada projeto começa com uma pergunta simples — o que isso vai economizar ou gerar para o cliente?",
    ],
  },
  {
    slug: "saas-do-zero",
    title: "Lançando um SaaS do zero: arquitetura e custos",
    excerpt:
      "Um guia direto ao ponto sobre as decisões críticas que economizam (ou queimam) caixa nos primeiros 12 meses.",
    date: "28 fev 2026",
    tag: "SaaS",
    readingTime: "9 min",
    content: [
      "Lançar um SaaS é fácil. Lançar um SaaS sustentável é outra história. Os primeiros 12 meses definem se o produto vai escalar ou afundar em dívida técnica e custos de infra.",
      "A escolha de stack importa, mas menos do que se imagina. Importa muito mais ter clareza sobre o modelo multi-tenant, segregação de dados e estratégia de billing desde o primeiro commit.",
      "Outro ponto crítico: observabilidade. Sem logs, métricas e tracing decentes, qualquer crescimento vira pesadelo de suporte.",
    ],
  },
  {
    slug: "automacao-que-paga-a-conta",
    title: "Automação que paga a conta: 5 cases reais",
    excerpt:
      "Cinco automações simples que economizaram horas — e milhares de reais — para clientes da VSMS.",
    date: "10 fev 2026",
    tag: "Automação",
    readingTime: "5 min",
    content: [
      "Automação não precisa ser complicada para gerar valor. Os cases mais bem-sucedidos que entregamos foram, na verdade, os mais simples.",
      "Da emissão automática de notas fiscais à reconciliação de planilhas, a chave é mapear o trabalho repetitivo e atacar primeiro o que dói mais.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

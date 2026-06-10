
-- ============ PRODUCTS ============
CREATE TYPE public.product_type AS ENUM ('site', 'saas', 'ai_app');
CREATE TYPE public.product_status AS ENUM ('active', 'inactive', 'archived');

CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  type public.product_type NOT NULL DEFAULT 'site',
  status public.product_status NOT NULL DEFAULT 'active',
  description TEXT,
  primary_domain TEXT,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active products"
  ON public.products FOR SELECT
  USING (status = 'active');

-- ============ POSTS ============
CREATE TYPE public.post_status AS ENUM ('draft', 'published', 'scheduled', 'archived');

CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT[] NOT NULL DEFAULT '{}',
  tag TEXT,
  reading_time TEXT,
  cover_image_url TEXT,
  status public.post_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (product_id, slug)
);

CREATE INDEX posts_product_published_idx
  ON public.posts (product_id, status, published_at DESC);

GRANT SELECT ON public.posts TO anon, authenticated;
GRANT ALL ON public.posts TO service_role;

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts"
  ON public.posts FOR SELECT
  USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());

-- ============ updated_at trigger ============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ SEED ============
INSERT INTO public.products (slug, name, type, status, description, primary_domain)
VALUES (
  'site-vsms',
  'Site VSMS Solutions',
  'site',
  'active',
  'Site institucional da VSMS Solutions — empresa de tecnologia orientada a produto.',
  'vsms.com.br'
);

INSERT INTO public.posts (product_id, slug, title, excerpt, content, tag, reading_time, status, published_at)
SELECT p.id, v.slug, v.title, v.excerpt, v.content, v.tag, v.reading_time, 'published'::public.post_status, v.published_at
FROM public.products p,
(VALUES
  (
    'como-ia-transforma-pmes',
    'Como a IA está transformando PMEs brasileiras',
    'Não é hype. Pequenas e médias empresas brasileiras já colhem resultados reais com IA aplicada ao dia a dia.',
    ARRAY[
      'A inteligência artificial deixou de ser uma promessa distante. Em 2026, qualquer empresa que ignore essa onda corre o risco de ficar para trás — e a boa notícia é que adotar IA hoje é mais acessível do que nunca.',
      'Vemos PMEs usando agentes de IA para qualificar leads, copilots internos para acelerar o atendimento e modelos especializados para extrair valor de dados antes esquecidos em planilhas e PDFs.',
      'O segredo está em começar pequeno: identifique um processo repetitivo, mensure o tempo gasto e desenhe uma automação inteligente que tenha ROI claro nos primeiros 30 dias.',
      'Na VSMS, nossa abordagem é sempre orientada a resultado: nada de IA por IA. Cada projeto começa com uma pergunta simples — o que isso vai economizar ou gerar para o cliente?'
    ],
    'Inteligência Artificial',
    '6 min',
    '2026-03-12 12:00:00+00'::timestamptz
  ),
  (
    'saas-do-zero',
    'Lançando um SaaS do zero: arquitetura e custos',
    'Um guia direto ao ponto sobre as decisões críticas que economizam (ou queimam) caixa nos primeiros 12 meses.',
    ARRAY[
      'Lançar um SaaS é fácil. Lançar um SaaS sustentável é outra história. Os primeiros 12 meses definem se o produto vai escalar ou afundar em dívida técnica e custos de infra.',
      'A escolha de stack importa, mas menos do que se imagina. Importa muito mais ter clareza sobre o modelo multi-tenant, segregação de dados e estratégia de billing desde o primeiro commit.',
      'Outro ponto crítico: observabilidade. Sem logs, métricas e tracing decentes, qualquer crescimento vira pesadelo de suporte.'
    ],
    'SaaS',
    '9 min',
    '2026-02-28 12:00:00+00'::timestamptz
  ),
  (
    'automacao-que-paga-a-conta',
    'Automação que paga a conta: 5 cases reais',
    'Cinco automações simples que economizaram horas — e milhares de reais — para clientes da VSMS.',
    ARRAY[
      'Automação não precisa ser complicada para gerar valor. Os cases mais bem-sucedidos que entregamos foram, na verdade, os mais simples.',
      'Da emissão automática de notas fiscais à reconciliação de planilhas, a chave é mapear o trabalho repetitivo e atacar primeiro o que dói mais.'
    ],
    'Automação',
    '5 min',
    '2026-02-10 12:00:00+00'::timestamptz
  )
) AS v(slug, title, excerpt, content, tag, reading_time, published_at)
WHERE p.slug = 'site-vsms';

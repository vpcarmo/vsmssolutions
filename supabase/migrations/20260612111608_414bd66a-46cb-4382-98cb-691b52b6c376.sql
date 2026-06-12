-- Product domains: arquitetura para múltiplos domínios por produto (UI futura)
CREATE TABLE public.product_domains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE DEFAULT public.current_tenant_id(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  domain text NOT NULL,
  is_primary boolean NOT NULL DEFAULT false,
  verified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (domain)
);

CREATE INDEX product_domains_product_idx ON public.product_domains (product_id);
CREATE INDEX product_domains_tenant_created_idx ON public.product_domains (tenant_id, created_at DESC);
CREATE UNIQUE INDEX product_domains_one_primary_per_product
  ON public.product_domains (product_id) WHERE is_primary;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_domains TO authenticated;
GRANT ALL ON public.product_domains TO service_role;

ALTER TABLE public.product_domains ENABLE ROW LEVEL SECURITY;

CREATE POLICY product_domains_admin_write ON public.product_domains
  FOR ALL TO authenticated
  USING (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()))
  WITH CHECK (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()));

CREATE POLICY product_domains_public_read ON public.product_domains
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE TRIGGER product_domains_set_updated_at
  BEFORE UPDATE ON public.product_domains
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Garantir trigger updated_at em products (idempotente)
DROP TRIGGER IF EXISTS products_set_updated_at ON public.products;
CREATE TRIGGER products_set_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =====================================================================
-- VSMS Admin Phase 1 Foundation
-- =====================================================================

-- ---------- Enums ----------
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'editor');
CREATE TYPE public.tenant_status AS ENUM ('active', 'suspended', 'archived');
CREATE TYPE public.page_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE public.form_status AS ENUM ('active', 'paused', 'archived');
CREATE TYPE public.lead_status AS ENUM ('new', 'qualified', 'contacted', 'won', 'lost', 'spam');
CREATE TYPE public.media_visibility AS ENUM ('public', 'private');
CREATE TYPE public.settings_scope AS ENUM ('global', 'tenant', 'product');
CREATE TYPE public.feature_flag_scope AS ENUM ('global', 'product');

-- ---------- Updated-at trigger (reuse public.set_updated_at if exists) ----------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- =====================================================================
-- TENANTS
-- =====================================================================
CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  status public.tenant_status NOT NULL DEFAULT 'active',
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.tenants TO authenticated;
GRANT ALL ON public.tenants TO service_role;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_tenants_updated BEFORE UPDATE ON public.tenants FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.tenants (slug, name) VALUES ('vsms', 'VSMS Solutions');

-- ---------- tenant_members ----------
CREATE TABLE public.tenant_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, user_id)
);
GRANT SELECT ON public.tenant_members TO authenticated;
GRANT ALL ON public.tenant_members TO service_role;
ALTER TABLE public.tenant_members ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_tenant_members_user ON public.tenant_members(user_id);

-- =====================================================================
-- USER ROLES (RBAC simplificado)
-- =====================================================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  product_id UUID, -- FK adicionada após products existir (já existe)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role, tenant_id, product_id)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_user_roles_user ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_tenant ON public.user_roles(tenant_id);

-- =====================================================================
-- HELPERS (STABLE, SECURITY DEFINER)
-- =====================================================================
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.has_role_in_tenant(_user_id UUID, _role public.app_role, _tenant_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
      AND (tenant_id = _tenant_id OR tenant_id IS NULL OR role = 'super_admin')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('super_admin','admin','editor'));
$$;

CREATE OR REPLACE FUNCTION public.current_tenant_id()
RETURNS UUID LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE(
    NULLIF((auth.jwt() -> 'app_metadata' ->> 'tenant_id'), '')::uuid,
    (SELECT id FROM public.tenants WHERE slug = 'vsms' LIMIT 1)
  );
$$;

CREATE OR REPLACE FUNCTION public.is_tenant_member(_tenant_id UUID, _user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.tenant_members WHERE tenant_id = _tenant_id AND user_id = _user_id
  ) OR public.has_role(_user_id, 'super_admin');
$$;

-- Policies for tenants/tenant_members/user_roles
CREATE POLICY tenants_read ON public.tenants FOR SELECT TO authenticated
  USING (public.is_tenant_member(id, auth.uid()));
CREATE POLICY tenants_super_write ON public.tenants FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY tm_read ON public.tenant_members FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY tm_super_write ON public.tenant_members FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY ur_read ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY ur_super_write ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

-- =====================================================================
-- PRODUCTS — adiciona tenant_id
-- =====================================================================
ALTER TABLE public.products ADD COLUMN tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
UPDATE public.products SET tenant_id = (SELECT id FROM public.tenants WHERE slug = 'vsms');
ALTER TABLE public.products ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.products ALTER COLUMN tenant_id SET DEFAULT public.current_tenant_id();
CREATE INDEX IF NOT EXISTS idx_products_tenant_created ON public.products(tenant_id, created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
CREATE POLICY products_admin_write ON public.products FOR ALL TO authenticated
  USING (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()))
  WITH CHECK (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()));

-- Seed produtos
INSERT INTO public.products (tenant_id, slug, name, type, description, status)
SELECT t.id, v.slug, v.name, v.type::public.product_type, v.description, 'active'::public.product_status
FROM public.tenants t,
  (VALUES
    ('site-vsms', 'Site Institucional VSMS', 'site', 'Site institucional oficial da VSMS Solutions'),
    ('personal-virtual', 'Personal Virtual', 'ia_app', 'Assistente pessoal de saúde com IA'),
    ('superofertas', 'SuperOfertas', 'saas', 'Plataforma de ofertas e cupons')
  ) AS v(slug, name, type, description)
WHERE t.slug = 'vsms'
ON CONFLICT (slug) DO UPDATE SET tenant_id = EXCLUDED.tenant_id;

-- FK user_roles.product_id
ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_product_fk
  FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;

-- =====================================================================
-- POSTS — migra content para JSONB, adiciona tenant_id e UNIQUE(product_id,slug)
-- =====================================================================
ALTER TABLE public.posts ADD COLUMN tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
UPDATE public.posts SET tenant_id = (SELECT id FROM public.tenants WHERE slug = 'vsms');
ALTER TABLE public.posts ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.posts ALTER COLUMN tenant_id SET DEFAULT public.current_tenant_id();

ALTER TABLE public.posts ADD COLUMN content_json JSONB NOT NULL DEFAULT '{"blocks":[]}'::jsonb;
UPDATE public.posts SET content_json = jsonb_build_object(
  'blocks', COALESCE((SELECT jsonb_agg(jsonb_build_object('type','paragraph','text',p)) FROM unnest(content) p), '[]'::jsonb)
);
ALTER TABLE public.posts DROP COLUMN content;
ALTER TABLE public.posts RENAME COLUMN content_json TO content;

ALTER TABLE public.posts ADD CONSTRAINT posts_product_slug_unique UNIQUE (product_id, slug);
CREATE INDEX IF NOT EXISTS idx_posts_tenant_created ON public.posts(tenant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_status_published ON public.posts(status, published_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
CREATE POLICY posts_admin_write ON public.posts FOR ALL TO authenticated
  USING (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()))
  WITH CHECK (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()));

CREATE TRIGGER trg_posts_updated BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =====================================================================
-- PAGES
-- =====================================================================
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL DEFAULT public.current_tenant_id() REFERENCES public.tenants(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{"blocks":[]}'::jsonb,
  status public.page_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  og_image_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (product_id, slug)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pages TO authenticated;
GRANT SELECT ON public.pages TO anon;
GRANT ALL ON public.pages TO service_role;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_pages_tenant_created ON public.pages(tenant_id, created_at DESC);
CREATE INDEX idx_pages_product_status ON public.pages(product_id, status);
CREATE POLICY pages_public_read ON public.pages FOR SELECT TO anon, authenticated
  USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());
CREATE POLICY pages_admin_write ON public.pages FOR ALL TO authenticated
  USING (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()))
  WITH CHECK (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()));
CREATE TRIGGER trg_pages_updated BEFORE UPDATE ON public.pages FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =====================================================================
-- SEO META (polimórfico)
-- =====================================================================
CREATE TABLE public.seo_meta (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL DEFAULT public.current_tenant_id() REFERENCES public.tenants(id) ON DELETE CASCADE,
  resource_type TEXT NOT NULL,
  resource_id UUID NOT NULL,
  title TEXT,
  description TEXT,
  og_image_url TEXT,
  canonical_url TEXT,
  noindex BOOLEAN NOT NULL DEFAULT false,
  json_ld JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (resource_type, resource_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_meta TO authenticated;
GRANT SELECT ON public.seo_meta TO anon;
GRANT ALL ON public.seo_meta TO service_role;
ALTER TABLE public.seo_meta ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_seo_meta_tenant ON public.seo_meta(tenant_id);
CREATE POLICY seo_public_read ON public.seo_meta FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY seo_admin_write ON public.seo_meta FOR ALL TO authenticated
  USING (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()))
  WITH CHECK (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()));
CREATE TRIGGER trg_seo_updated BEFORE UPDATE ON public.seo_meta FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =====================================================================
-- MEDIA ASSETS
-- =====================================================================
CREATE TABLE public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL DEFAULT public.current_tenant_id() REFERENCES public.tenants(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT,
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  width INT,
  height INT,
  alt_text TEXT,
  visibility public.media_visibility NOT NULL DEFAULT 'public',
  sha256 TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, sha256)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_assets TO authenticated;
GRANT SELECT ON public.media_assets TO anon;
GRANT ALL ON public.media_assets TO service_role;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_media_tenant_created ON public.media_assets(tenant_id, created_at DESC);
CREATE POLICY media_public_read ON public.media_assets FOR SELECT TO anon, authenticated USING (visibility = 'public');
CREATE POLICY media_admin_read ON public.media_assets FOR SELECT TO authenticated
  USING (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()));
CREATE POLICY media_admin_write ON public.media_assets FOR ALL TO authenticated
  USING (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()))
  WITH CHECK (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()));
CREATE TRIGGER trg_media_updated BEFORE UPDATE ON public.media_assets FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =====================================================================
-- FORMS + SUBMISSIONS + LEADS
-- =====================================================================
CREATE TABLE public.forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL DEFAULT public.current_tenant_id() REFERENCES public.tenants(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  schema JSONB NOT NULL DEFAULT '{"fields":[]}'::jsonb,
  status public.form_status NOT NULL DEFAULT 'active',
  captcha_required BOOLEAN NOT NULL DEFAULT true,
  rate_limit_per_hour INT NOT NULL DEFAULT 10,
  notify_emails TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (product_id, slug)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.forms TO authenticated;
GRANT SELECT ON public.forms TO anon;
GRANT ALL ON public.forms TO service_role;
ALTER TABLE public.forms ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_forms_tenant ON public.forms(tenant_id, created_at DESC);
CREATE POLICY forms_public_read ON public.forms FOR SELECT TO anon, authenticated USING (status = 'active');
CREATE POLICY forms_admin_write ON public.forms FOR ALL TO authenticated
  USING (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()))
  WITH CHECK (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()));
CREATE TRIGGER trg_forms_updated BEFORE UPDATE ON public.forms FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL DEFAULT public.current_tenant_id() REFERENCES public.tenants(id) ON DELETE CASCADE,
  form_id UUID NOT NULL REFERENCES public.forms(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  ip_address INET,
  user_agent TEXT,
  captcha_token TEXT,
  captcha_verified BOOLEAN NOT NULL DEFAULT false,
  is_spam BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.form_submissions TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.form_submissions TO authenticated;
GRANT ALL ON public.form_submissions TO service_role;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_fs_tenant_created ON public.form_submissions(tenant_id, created_at DESC);
CREATE INDEX idx_fs_form ON public.form_submissions(form_id, created_at DESC);
-- Inserts via server fn (admin/anon path); broad insert + admin read
CREATE POLICY fs_public_insert ON public.form_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY fs_admin_read ON public.form_submissions FOR SELECT TO authenticated
  USING (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()));
CREATE POLICY fs_admin_write ON public.form_submissions FOR UPDATE TO authenticated
  USING (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()))
  WITH CHECK (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()));
CREATE POLICY fs_admin_delete ON public.form_submissions FOR DELETE TO authenticated
  USING (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()));

CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL DEFAULT public.current_tenant_id() REFERENCES public.tenants(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  message TEXT,
  source TEXT,
  status public.lead_status NOT NULL DEFAULT 'new',
  score INT NOT NULL DEFAULT 0,
  utm_source TEXT, utm_medium TEXT, utm_campaign TEXT, utm_term TEXT, utm_content TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  submission_id UUID REFERENCES public.form_submissions(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_leads_tenant_created ON public.leads(tenant_id, created_at DESC);
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE POLICY leads_admin_all ON public.leads FOR ALL TO authenticated
  USING (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()))
  WITH CHECK (public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()));
CREATE TRIGGER trg_leads_updated BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Rate limit (IP-based, simples)
CREATE TABLE public.rate_limit_log (
  id BIGSERIAL PRIMARY KEY,
  ip_address INET NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT, SELECT ON public.rate_limit_log TO anon, authenticated;
GRANT ALL ON public.rate_limit_log TO service_role;
GRANT USAGE ON SEQUENCE public.rate_limit_log_id_seq TO anon, authenticated, service_role;
ALTER TABLE public.rate_limit_log ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_rl_ip_action_time ON public.rate_limit_log(ip_address, action, created_at DESC);
CREATE POLICY rl_insert ON public.rate_limit_log FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY rl_admin_read ON public.rate_limit_log FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'));

-- =====================================================================
-- AUDIT LOG
-- =====================================================================
CREATE TABLE public.audit_log (
  id BIGSERIAL PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL,
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  diff JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.audit_log TO authenticated;
GRANT ALL ON public.audit_log TO service_role;
GRANT USAGE ON SEQUENCE public.audit_log_id_seq TO authenticated, service_role;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_audit_tenant_created ON public.audit_log(tenant_id, created_at DESC);
CREATE INDEX idx_audit_resource ON public.audit_log(resource_type, resource_id);
CREATE POLICY audit_admin_read ON public.audit_log FOR SELECT TO authenticated
  USING ((tenant_id IS NULL AND public.has_role(auth.uid(), 'super_admin'))
      OR (public.is_tenant_member(tenant_id, auth.uid())
          AND (public.has_role(auth.uid(), 'super_admin') OR public.has_role_in_tenant(auth.uid(), 'admin', tenant_id))));
CREATE POLICY audit_insert ON public.audit_log FOR INSERT TO authenticated WITH CHECK (true);

-- =====================================================================
-- SETTINGS (KV)
-- =====================================================================
CREATE TABLE public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scope public.settings_scope NOT NULL,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (scope, tenant_id, product_id, key)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.settings TO authenticated;
GRANT ALL ON public.settings TO service_role;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_settings_lookup ON public.settings(scope, tenant_id, product_id, key);
CREATE POLICY settings_admin ON public.settings FOR ALL TO authenticated
  USING (
    (scope = 'global' AND public.has_role(auth.uid(), 'super_admin'))
    OR (scope <> 'global' AND public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()))
  )
  WITH CHECK (
    (scope = 'global' AND public.has_role(auth.uid(), 'super_admin'))
    OR (scope <> 'global' AND public.is_tenant_member(tenant_id, auth.uid()) AND public.is_admin(auth.uid()))
  );
CREATE TRIGGER trg_settings_updated BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =====================================================================
-- FEATURE FLAGS
-- =====================================================================
CREATE TABLE public.feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  description TEXT,
  scope public.feature_flag_scope NOT NULL DEFAULT 'product',
  enabled_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.feature_flags TO anon, authenticated;
GRANT ALL ON public.feature_flags TO service_role;
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;
CREATE POLICY ff_read ON public.feature_flags FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY ff_super_write ON public.feature_flags FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));
CREATE TRIGGER trg_ff_updated BEFORE UPDATE ON public.feature_flags FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.product_feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  flag_key TEXT NOT NULL REFERENCES public.feature_flags(key) ON DELETE CASCADE,
  enabled BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (product_id, flag_key)
);
GRANT SELECT ON public.product_feature_flags TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_feature_flags TO authenticated;
GRANT ALL ON public.product_feature_flags TO service_role;
ALTER TABLE public.product_feature_flags ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_pff_product ON public.product_feature_flags(product_id);
CREATE POLICY pff_read ON public.product_feature_flags FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY pff_admin_write ON public.product_feature_flags FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_pff_updated BEFORE UPDATE ON public.product_feature_flags FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.is_feature_enabled(_product_id UUID, _flag_key TEXT)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE(
    (SELECT enabled FROM public.product_feature_flags WHERE product_id = _product_id AND flag_key = _flag_key),
    (SELECT enabled_default FROM public.feature_flags WHERE key = _flag_key),
    false
  );
$$;

-- Seed flags
INSERT INTO public.feature_flags (key, description, scope, enabled_default) VALUES
  ('blog', 'Módulo de blog', 'product', true),
  ('portfolio', 'Módulo de portfólio', 'product', true),
  ('leads', 'Captação de leads', 'product', true),
  ('forms', 'Formulários dinâmicos', 'product', true),
  ('media', 'Biblioteca de mídia', 'product', true),
  ('seo_advanced', 'SEO avançado por recurso', 'product', true),
  ('audit', 'Log de auditoria', 'global', true),
  ('financeiro', 'Módulo financeiro', 'global', false),
  ('ia', 'Módulo de IA', 'global', false),
  ('analytics', 'Módulo de analytics', 'global', false);

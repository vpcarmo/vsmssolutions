ALTER TABLE public.seo_meta
  ADD COLUMN IF NOT EXISTS og_title text,
  ADD COLUMN IF NOT EXISTS og_description text,
  ADD COLUMN IF NOT EXISTS robots text,
  ADD COLUMN IF NOT EXISTS nofollow boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS schema_type text;

CREATE INDEX IF NOT EXISTS idx_seo_meta_resource ON public.seo_meta (tenant_id, resource_type, resource_id);
CREATE UNIQUE INDEX IF NOT EXISTS uniq_seo_meta_resource ON public.seo_meta (resource_type, resource_id);

DROP TRIGGER IF EXISTS trg_seo_meta_updated_at ON public.seo_meta;
CREATE TRIGGER trg_seo_meta_updated_at BEFORE UPDATE ON public.seo_meta FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
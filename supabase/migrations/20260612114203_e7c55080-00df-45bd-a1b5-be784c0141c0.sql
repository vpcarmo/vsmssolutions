
-- Extend pages table to support CMS reuse (institutional, landing, blog, product)
ALTER TABLE public.pages
  ADD COLUMN IF NOT EXISTS excerpt text,
  ADD COLUMN IF NOT EXISTS content_type text NOT NULL DEFAULT 'page',
  ADD COLUMN IF NOT EXISTS template text NOT NULL DEFAULT 'default',
  ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES public.pages(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS categories text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS author_id uuid,
  ADD COLUMN IF NOT EXISTS archived_at timestamptz;

ALTER TABLE public.pages
  ADD CONSTRAINT pages_content_type_check
  CHECK (content_type IN ('page','landing','blog_post','product_page'));

CREATE INDEX IF NOT EXISTS pages_parent_id_idx ON public.pages(parent_id);
CREATE INDEX IF NOT EXISTS pages_content_type_idx ON public.pages(tenant_id, content_type, status);
CREATE INDEX IF NOT EXISTS pages_tags_gin_idx ON public.pages USING gin(tags);
CREATE INDEX IF NOT EXISTS pages_categories_gin_idx ON public.pages USING gin(categories);

DROP TRIGGER IF EXISTS pages_set_updated_at ON public.pages;
CREATE TRIGGER pages_set_updated_at
BEFORE UPDATE ON public.pages
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

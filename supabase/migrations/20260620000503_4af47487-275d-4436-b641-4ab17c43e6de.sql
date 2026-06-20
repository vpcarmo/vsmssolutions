
-- Allow anonymous public read of institutional site settings only
CREATE POLICY settings_public_site_read
ON public.settings
FOR SELECT
TO anon, authenticated
USING (scope = 'global' AND tenant_id IS NULL AND product_id IS NULL AND key LIKE 'site.%');

GRANT SELECT ON public.settings TO anon;

-- Unique index for global site.* keys to enable safe upsert (regular unique constraint treats NULLs as distinct)
CREATE UNIQUE INDEX IF NOT EXISTS settings_global_key_uniq
ON public.settings (key)
WHERE scope = 'global' AND tenant_id IS NULL AND product_id IS NULL;

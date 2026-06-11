
-- Revoke EXECUTE from public/anon on internal SECURITY DEFINER helpers
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_role_in_tenant(uuid, public.app_role, uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.current_tenant_id() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_tenant_member(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.has_role_in_tenant(uuid, public.app_role, uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.current_tenant_id() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_tenant_member(uuid, uuid) TO authenticated, service_role;

-- is_feature_enabled may be called by anon (public site decides UI) — keep
REVOKE EXECUTE ON FUNCTION public.is_feature_enabled(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_feature_enabled(uuid, text) TO anon, authenticated, service_role;

-- Tighten INSERT policies (replace WITH CHECK (true))
DROP POLICY IF EXISTS fs_public_insert ON public.form_submissions;
CREATE POLICY fs_public_insert ON public.form_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.forms f
      WHERE f.id = form_submissions.form_id
        AND f.status = 'active'
        AND f.tenant_id = form_submissions.tenant_id
    )
  );

DROP POLICY IF EXISTS audit_insert ON public.audit_log;
CREATE POLICY audit_insert ON public.audit_log FOR INSERT TO authenticated
  WITH CHECK (actor_id = auth.uid());

DROP POLICY IF EXISTS rl_insert ON public.rate_limit_log;
CREATE POLICY rl_insert ON public.rate_limit_log FOR INSERT TO anon, authenticated
  WITH CHECK (action IS NOT NULL AND length(action) <= 64);

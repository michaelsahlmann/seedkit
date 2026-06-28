-- ============================================================================
-- Supabase otorga EXECUTE directamente a anon/authenticated en funciones nuevas.
-- Revocamos por rol para que las funciones SECURITY DEFINER no queden expuestas
-- como RPC. Las funciones de trigger igual se ejecutan (no requieren EXECUTE por
-- rol); is_master() conserva EXECUTE en authenticated porque la usan las RLS.
-- ============================================================================

revoke execute on function public.handle_new_user() from anon, authenticated;
revoke execute on function public.touch_updated_at() from anon, authenticated;
revoke execute on function public.is_master() from anon;

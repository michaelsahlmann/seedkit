-- ============================================================================
-- Endurecimiento de seguridad (responde a los advisors de Supabase)
-- ============================================================================

-- search_path inmutable en la función de trigger restante.
alter function public.touch_updated_at() set search_path = public;

-- Las funciones de trigger no necesitan EXECUTE por rol: se ejecutan vía el
-- trigger como dueño. Quitamos el grant por defecto a public para no exponerlas
-- como RPC (/rest/v1/rpc/...).
revoke execute on function public.handle_new_user() from public;
revoke execute on function public.touch_updated_at() from public;

-- is_master() se usa dentro de las políticas RLS: la necesita el rol
-- `authenticated`, pero no `anon`. Quitamos el grant a public y lo damos
-- explícitamente solo a authenticated.
revoke execute on function public.is_master() from public;
grant execute on function public.is_master() to authenticated;

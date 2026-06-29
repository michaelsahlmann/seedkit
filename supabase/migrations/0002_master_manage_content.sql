-- ============================================================================
-- Seedkit — el rol Master administra todo el contenido
-- Las políticas de 0001_init.sql limitan cada tabla a su dueño (user_id = auth.uid()).
-- RLS combina políticas con OR, así que estas políticas aditivas conceden al
-- Master acceso total (SELECT/INSERT/UPDATE/DELETE) sin tocar las de dueño.
-- is_master() ya existe (0001_init.sql, security definer).
-- ============================================================================

create policy blocks_master_all on public.blocks
  for all using (public.is_master()) with check (public.is_master());

create policy playbooks_master_all on public.playbooks
  for all using (public.is_master()) with check (public.is_master());

create policy playbook_steps_master_all on public.playbook_steps
  for all using (public.is_master()) with check (public.is_master());

create policy runs_master_all on public.runs
  for all using (public.is_master()) with check (public.is_master());

create policy run_steps_master_all on public.run_steps
  for all using (public.is_master()) with check (public.is_master());

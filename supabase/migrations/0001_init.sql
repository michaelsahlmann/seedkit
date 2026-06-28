-- ============================================================================
-- Seedkit — esquema inicial
-- Biblioteca de bloques -> playbooks (secuencias) -> runs (checklist vivo)
-- Single-user (Master) en Fase 1, preparado para multiusuario/compartir.
-- ============================================================================

create extension if not exists pgcrypto;

-- ----- Enums ----------------------------------------------------------------
create type block_type as enum ('command', 'file', 'skill', 'note');
create type app_role   as enum ('master', 'user');
create type run_status as enum ('active', 'completed', 'archived');

-- ----- profiles (1:1 con auth.users) ----------------------------------------
create table public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  email        text,
  display_name text,
  role         app_role    not null default 'user',
  created_at   timestamptz not null default now()
);

-- Crea el profile al registrarse un usuario.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'display_name', new.email));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper: ¿el usuario actual es Master? (security definer evita recursión en RLS)
create or replace function public.is_master()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'master'
  );
$$;

-- updated_at automático
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ----- blocks (biblioteca reutilizable) -------------------------------------
create table public.blocks (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles (id) on delete cascade,
  type       block_type  not null,
  title      text        not null,
  purpose    text,                              -- "para qué sirve"
  content    text        not null default '',
  tags       text[]      not null default '{}',
  visibility text        not null default 'private', -- 'private' | 'shared'
  metadata   jsonb       not null default '{}',
  source     text        not null default 'manual',  -- 'manual' | 'import:agent'
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index blocks_user_type_idx on public.blocks (user_id, type);
create index blocks_tags_idx       on public.blocks using gin (tags);
create index blocks_metadata_idx   on public.blocks using gin (metadata);
-- Reimport idempotente: no duplicar bloques importados con el mismo título.
create unique index blocks_import_unique
  on public.blocks (user_id, source, title)
  where source <> 'manual';

create trigger blocks_touch before update on public.blocks
  for each row execute function public.touch_updated_at();

-- ----- playbooks (secuencias) -----------------------------------------------
create table public.playbooks (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles (id) on delete cascade,
  title      text        not null,
  purpose    text,
  tags       text[]      not null default '{}',
  visibility text        not null default 'private',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index playbooks_user_idx on public.playbooks (user_id);
create trigger playbooks_touch before update on public.playbooks
  for each row execute function public.touch_updated_at();

-- ----- playbook_steps (pasos ordenados) -------------------------------------
-- Cada paso es O una referencia a un bloque (block_id) O un bloque incrustado (inline_*).
create table public.playbook_steps (
  id               uuid primary key default gen_random_uuid(),
  playbook_id      uuid not null references public.playbooks (id) on delete cascade,
  block_id         uuid references public.blocks (id) on delete set null,
  position         text not null,               -- fractional indexing (orden)
  override_purpose text,
  inline_type      block_type,
  inline_title     text,
  inline_content   text,
  constraint step_ref_or_inline check (
    (block_id is not null and inline_content is null)
    or (block_id is null and inline_content is not null)
  )
);

create index playbook_steps_playbook_idx on public.playbook_steps (playbook_id, position);

-- ----- runs (instancia de checklist vivo) -----------------------------------
create table public.runs (
  id           uuid primary key default gen_random_uuid(),
  playbook_id  uuid references public.playbooks (id) on delete set null,
  user_id      uuid not null references public.profiles (id) on delete cascade,
  title        text not null,
  status       run_status  not null default 'active',
  share_token  text unique,                     -- para compartir por link (futuro)
  started_at   timestamptz not null default now(),
  completed_at timestamptz
);

create index runs_user_idx on public.runs (user_id, status);

-- ----- run_steps (snapshot de los pasos al iniciar el run) -------------------
create table public.run_steps (
  id          uuid primary key default gen_random_uuid(),
  run_id      uuid not null references public.runs (id) on delete cascade,
  position    integer not null,
  type        block_type not null,
  title       text not null,
  purpose     text,
  content     text not null default '',
  metadata    jsonb not null default '{}',
  checked     boolean not null default false,
  checked_at  timestamptz
);

create index run_steps_run_idx on public.run_steps (run_id, position);

-- ============================================================================
-- RLS
-- ============================================================================
alter table public.profiles       enable row level security;
alter table public.blocks         enable row level security;
alter table public.playbooks      enable row level security;
alter table public.playbook_steps enable row level security;
alter table public.runs           enable row level security;
alter table public.run_steps      enable row level security;

-- profiles: cada quien ve/edita el suyo; el Master ve todos.
create policy profiles_self_select on public.profiles
  for select using (id = auth.uid() or public.is_master());
create policy profiles_self_update on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- blocks: dueño total + lectura de los compartidos.
create policy blocks_owner_all on public.blocks
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy blocks_read_shared on public.blocks
  for select using (visibility = 'shared');

-- playbooks: dueño total + lectura de los compartidos.
create policy playbooks_owner_all on public.playbooks
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy playbooks_read_shared on public.playbooks
  for select using (visibility = 'shared');

-- playbook_steps: acceso vía el dueño del playbook.
create policy playbook_steps_owner_all on public.playbook_steps
  for all using (
    exists (select 1 from public.playbooks p
            where p.id = playbook_id and p.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.playbooks p
            where p.id = playbook_id and p.user_id = auth.uid())
  );
create policy playbook_steps_read_shared on public.playbook_steps
  for select using (
    exists (select 1 from public.playbooks p
            where p.id = playbook_id and p.visibility = 'shared')
  );

-- runs: dueño total.
create policy runs_owner_all on public.runs
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- run_steps: acceso vía el dueño del run.
create policy run_steps_owner_all on public.run_steps
  for all using (
    exists (select 1 from public.runs r
            where r.id = run_id and r.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.runs r
            where r.id = run_id and r.user_id = auth.uid())
  );

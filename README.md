# Base General

Banco de trabajo personal para arrancar proyectos: una biblioteca de **bloques**
reutilizables (comandos `npx`, archivos como `CLAUDE.md`, skills, notas) que se ensamblan
en **playbooks** (secuencias ordenadas) y se ejecutan como un **checklist vivo**. Cada paso
se copia al portapapeles y la secuencia se exporta como un **script** descargable
(`.sh` / `.ps1`).

## Stack

- **Next.js 16** (App Router, React 19) — deploy en Vercel
- **Supabase** (Postgres + Auth + RLS)
- shadcn/ui (Base UI) + Tailwind v4 · dnd-kit · TanStack Query · zod · gray-matter

## Puesta en marcha

1. **Dependencias**

   ```bash
   npm install
   ```

2. **Supabase**
   - Creá un proyecto en [supabase.com](https://supabase.com).
   - Aplicá la migración `supabase/migrations/0001_init.sql` (SQL Editor del dashboard o
     `supabase db push` con la CLI).
   - En *Authentication → Providers*, deshabilitá los signups públicos (app single-user).
   - Creá tu usuario Master (*Authentication → Users → Add user*) y marcá su rol:

     ```sql
     update public.profiles set role = 'master' where email = 'tu-email';
     ```

3. **Variables de entorno** — copiá `.env.local.example` a `.env.local` y completá
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y (para el seed)
   `SUPABASE_SERVICE_ROLE_KEY`.

4. **Importar tu contenido `.agent/`** (opcional pero recomendado)

   ```bash
   npm run seed
   ```

   Importa ~69 bloques (skills, agentes y workflows). Es idempotente.

5. **Desarrollo**

   ```bash
   npm run dev
   ```

## Estructura

- `src/app/(auth)/login` — login del Master
- `src/app/(app)/blocks` — CRUD de la biblioteca de bloques
- `src/app/(app)/playbooks` — editor de secuencias (drag & drop)
- `src/app/(app)/runs` — checklist vivo + barra de progreso
- `src/lib/script-generator.ts` — generación de scripts `.sh` / `.ps1`
- `src/lib/agent-parser.ts` — parser de `.agent/` → bloques
- `proxy.ts` — refresco de sesión Supabase + guard de rutas (Next 16)

## Deploy en Vercel

Importá el repo en Vercel y configurá las mismas variables de entorno
(`NEXT_PUBLIC_SUPABASE_*`). El `SUPABASE_SERVICE_ROLE_KEY` es solo para el seed local; no
hace falta en Vercel.

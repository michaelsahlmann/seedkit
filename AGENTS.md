# AGENTS.md

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## Perfil de comunicación

- Sé directo. Sin adornos, sin disculpas innecesarias, sin rodeos.
- No expliques lo obvio. Si la respuesta es "sí" o "no", dilo así.
- Cuando haya múltiples opciones, presenta las mejores 2-3 con tradeoffs claros, no un catálogo completo.
- Prefiere soluciones ejecutables sobre análisis extensos.
- Si algo no está claro, pregunta antes de asumir.
- Para cosas simples y velocidad usas Subagentes, run, spawn, send.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## 5. Trabajo en worktree (solo en repos git)

**Si el proyecto es un repo git, aíslate antes de tocar código. Una tarea = una rama + un worktree.**

Si el proyecto NO es git (`git rev-parse --is-inside-work-tree` falla), omite esta regla.

Al iniciar cualquier tarea:

1. Nunca trabajes en el directorio principal ni en `main`.
2. Revisa qué hay activo antes de empezar:
   ```bash
   git worktree list && git branch -a
   ```
3. Crea tu rama + worktree con nombre único desde `main` actualizado:
   ```bash
   git fetch origin
   git worktree add ../wt/<slug-tarea> -b <tipo>/<slug-tarea> origin/main
   cd ../wt/<slug-tarea>
   ```
   - `<tipo>` = `feat` | `fix` | `chore` | `docs`
   - Si la rama o carpeta ya existe, usa otro slug (la está usando otro agente).
4. Trabaja siempre dentro de `../wt/<slug-tarea>`.
5. Al terminar: commit, push de tu rama, PR hacia `main`, y limpia:
   ```bash
   git worktree remove ../wt/<slug-tarea>
   ```

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

## Environment
- **OS:** Arch Linux (pacman, SDDM, KDE/Plasma)
- **Shell:** bash + zsh
- **Repo git** (Next.js 16 + Supabase) — usa ramas/worktree (ver regla 5)

## Conventions
- Spanish-speaking user.

## Time Awareness
- Do NOT run `date` manually. The current date/time is already injected into the system prompt by the date-context plugin.
- Use the date/time from the system prompt when temporal context matters.

<!-- CODEGRAPH_START -->
## CodeGraph

In repositories indexed by CodeGraph (a `.codegraph/` directory exists at the repo root), reach for it BEFORE grep/find or reading files when you need to understand or locate code:

- **MCP tool** (when available): `codegraph_explore` answers most code questions in one call — the relevant symbols' verbatim source plus the call paths between them, including dynamic-dispatch hops grep can't follow. Name a file or symbol in the query to read its current line-numbered source. If it's listed but deferred, load it by name via tool search.
- **Shell** (always works): `codegraph explore "<symbol names or question>"` prints the same output.

If there is no `.codegraph/` directory, skip CodeGraph entirely — indexing is the user's decision.
<!-- CODEGRAPH_END -->

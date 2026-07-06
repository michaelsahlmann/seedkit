// Convención de instalación de skills: `npx skills add <owner/repo> --skill <name>`
// (herramienta de Vercel Labs: github.com/vercel-labs/skills). Única fuente de verdad
// del formato del comando en todo el repo.

/** Normaliza un repo al shorthand `owner/repo` que acepta `npx skills`. */
export function normalizeRepo(repo?: string): string | undefined {
  const r = repo?.trim();
  if (!r) return undefined;
  // URL de GitHub -> owner/repo
  const m = /^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/.exec(r);
  if (m) return `${m[1]}/${m[2]}`;
  // Ya es owner/repo, o un repo no-github -> pasar tal cual (el CLI lo acepta).
  return r;
}

/** Arma `npx skills add <owner/repo> --skill <name>`; undefined si falta repo o name. */
export function skillInstallCmd(
  repoUrl?: string,
  skillName?: string,
): string | undefined {
  const repo = normalizeRepo(repoUrl);
  const name = skillName?.trim();
  if (!repo || !name) return undefined;
  return `npx skills add ${repo} --skill ${name}`;
}

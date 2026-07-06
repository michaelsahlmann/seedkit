import { skillInstallCmd } from "@/lib/skills";
import type { ScriptStep } from "@/lib/types";

export type ScriptTarget = "sh" | "ps1";

function commentLines(text: string, prefix: string): string {
  return text
    .split("\n")
    .map((line) => `${prefix} ${line}`.trimEnd())
    .join("\n");
}

function fileBlockSh(filename: string, content: string): string {
  // here-doc con delimitador entrecomillado: no expande variables.
  return `cat > ${filename} <<'BASEGEN_EOF'\n${content}\nBASEGEN_EOF`;
}

function fileBlockPs1(filename: string, content: string): string {
  return `@'\n${content}\n'@ | Set-Content -Path "${filename}" -Encoding utf8`;
}

/**
 * Genera un script vivo (.sh / .ps1) a partir de pasos ordenados.
 * Solo se incluyen los pasos que se pasen (filtrar los marcados antes de llamar).
 */
export function generateScript(steps: ScriptStep[], target: ScriptTarget): string {
  const c = target === "sh" ? "#" : "#";
  const header =
    target === "sh"
      ? ["#!/usr/bin/env bash", "set -euo pipefail", ""]
      : ["# PowerShell — generado por Seedkit", "$ErrorActionPreference = 'Stop'", ""];

  const out: string[] = [
    ...header,
    `${c} ============================================================`,
    `${c} Script generado por Seedkit`,
    `${c} Pasos: ${steps.length}`,
    `${c} ============================================================`,
    "",
  ];

  steps.forEach((step, i) => {
    out.push(`${c} ── Paso ${i + 1}: ${step.title} ${"─".repeat(Math.max(0, 40 - step.title.length))}`);
    if (step.purpose) {
      out.push(commentLines(`Para qué sirve: ${step.purpose}`, c));
    }

    const filename = step.metadata?.filename;

    switch (step.type) {
      case "command":
        out.push(step.content.trim());
        break;
      case "skill": {
        // Preferir el install_cmd si existe; derivarlo del repo+skill si no; y si
        // tampoco, comentar el contenido.
        const cmd =
          step.metadata?.install_cmd ||
          skillInstallCmd(step.metadata?.repo_url, step.metadata?.skill_name);
        if (cmd) {
          out.push(cmd.trim());
        } else if (step.content.trim()) {
          out.push(commentLines(step.content.trim(), c));
        }
        break;
      }
      case "file":
        if (filename) {
          out.push(
            target === "sh"
              ? fileBlockSh(filename, step.content)
              : fileBlockPs1(filename, step.content),
          );
        } else {
          out.push(commentLines(step.content, c));
        }
        break;
      case "note":
      default:
        out.push(commentLines(step.content, c));
        break;
    }

    out.push("");
  });

  out.push(`${c} Fin del script.`);
  return out.join("\n") + "\n";
}

export function scriptFilename(target: ScriptTarget, base = "seedkit"): string {
  return `${base}.${target === "sh" ? "sh" : "ps1"}`;
}

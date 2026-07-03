import type {
  Block,
  PlaybookLine,
  ResolvedStep,
  RunStep,
  ScriptStep,
  BlockMetadata,
} from "@/lib/types";

interface StepLike {
  type: ResolvedStep["type"];
  content: string;
  metadata?: BlockMetadata;
}

/** Valor a copiar/ejecutar: para skills se prefiere el comando de instalación. */
export function stepCopyValue(step: StepLike): string {
  if (step.type === "skill" && step.metadata?.install_cmd) {
    return step.metadata.install_cmd;
  }
  return step.content;
}

export interface CopyField {
  label: string;
  value: string;
}

/** Campos copiables de un bloque, según su tipo (para el modal "copiar por campos"). */
export function blockCopyFields(block: Block): CopyField[] {
  const m = block.metadata ?? {};
  const fields: CopyField[] = [];

  switch (block.type) {
    case "command":
      if (block.content) fields.push({ label: "Comando", value: block.content });
      break;
    case "file":
      if (m.filename)
        fields.push({ label: "Nombre de archivo", value: String(m.filename) });
      if (m.language) fields.push({ label: "Lenguaje", value: String(m.language) });
      if (block.content) fields.push({ label: "Contenido", value: block.content });
      break;
    case "skill":
      if (m.install_cmd)
        fields.push({ label: "Instalar", value: String(m.install_cmd) });
      if (m.repo_url) fields.push({ label: "Repo", value: String(m.repo_url) });
      if (block.content) fields.push({ label: "SKILL.md", value: block.content });
      break;
    case "note":
      if (block.content) fields.push({ label: "Contenido", value: block.content });
      break;
    case "agent":
      if (m.model) fields.push({ label: "Modelo", value: String(m.model) });
      if (m.tools) fields.push({ label: "Tools", value: String(m.tools) });
      if (m.skills) fields.push({ label: "Skills", value: String(m.skills) });
      if (m.source_url)
        fields.push({ label: "Origen", value: String(m.source_url) });
      if (block.content) fields.push({ label: "Prompt", value: block.content });
      break;
  }

  return fields;
}

/** Pasos para el generador de scripts a partir de las líneas del checklist. */
export function linesToScript(lines: PlaybookLine[]): ScriptStep[] {
  return lines.map((l) => ({
    title: l.title,
    type: l.block?.type ?? "note",
    content: l.block?.content ?? "",
    metadata: l.block?.metadata,
  }));
}

export function resolvedToScript(steps: ResolvedStep[]): ScriptStep[] {
  return steps.map((s) => ({
    title: s.title,
    purpose: s.purpose,
    type: s.type,
    content: s.content,
    metadata: s.metadata,
  }));
}

export function runStepsToScript(steps: RunStep[]): ScriptStep[] {
  return steps.map((s) => ({
    title: s.title,
    purpose: s.purpose,
    type: s.type,
    content: s.content,
    metadata: s.metadata,
  }));
}

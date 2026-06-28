import type { ResolvedStep, RunStep, ScriptStep, BlockMetadata } from "@/lib/types";

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

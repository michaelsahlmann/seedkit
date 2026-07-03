import { Terminal, FileText, Sparkles, StickyNote, Bot } from "lucide-react";
import type { Block, BlockType } from "@/lib/types";

export const ICONS: Record<BlockType, typeof Terminal> = {
  command: Terminal,
  file: FileText,
  skill: Sparkles,
  note: StickyNote,
  agent: Bot,
};

export const TYPE_LABEL: Record<BlockType, string> = {
  command: "Comando",
  file: "Archivo",
  skill: "Skill",
  note: "Nota",
  agent: "Agente",
};

/** Texto que se copia según el tipo de bloque. */
export function copyValue(block: Block): string {
  if (block.type === "skill" && block.metadata.install_cmd) {
    return block.metadata.install_cmd;
  }
  return block.content;
}

/** Slug ASCII a partir del título, para nombrar descargas. */
export function slug(s: string): string {
  return (
    s
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "bloque"
  );
}

/** Nombre del archivo al descargar, según el tipo de bloque. */
export function downloadName(block: Block): string {
  switch (block.type) {
    case "file":
      return block.metadata?.filename || "archivo.txt";
    case "skill":
      return "SKILL.md";
    case "command":
      return `${slug(block.title)}.${
        block.metadata?.shell === "powershell" ? "ps1" : "sh"
      }`;
    case "note":
    case "agent":
      return `${slug(block.title)}.md`;
  }
}

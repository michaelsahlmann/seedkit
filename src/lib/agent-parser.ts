import matter from "gray-matter";
import type { BlockType, BlockMetadata } from "@/lib/types";

/**
 * gray-matter pero tolerante: si el YAML del frontmatter es inválido (común en
 * los `.agent/`), cae a un parseo simple `key: value` por líneas.
 */
function safeMatter(content: string): {
  data: Record<string, unknown>;
  content: string;
} {
  try {
    const r = matter(content);
    return { data: r.data as Record<string, unknown>, content: r.content };
  } catch {
    const fm = /^---\n([\s\S]*?)\n---\n?/.exec(content);
    if (!fm) return { data: {}, content };
    const data: Record<string, unknown> = {};
    for (const line of fm[1].split("\n")) {
      const idx = line.indexOf(":");
      if (idx > 0) {
        const key = line.slice(0, idx).trim();
        const value = line.slice(idx + 1).trim();
        if (key) data[key] = value;
      }
    }
    return { data, content: content.slice(fm[0].length) };
  }
}

export interface ParsedBlock {
  type: BlockType;
  title: string;
  purpose: string | null;
  content: string;
  tags: string[];
  metadata: BlockMetadata;
  source: "import:agent";
}

/** Extrae el primer bloque ```bash|sh|shell|text``` del markdown, si existe. */
export function extractFirstCommand(body: string): string | null {
  const fence = /```(?:bash|sh|shell|console|text)?\n([\s\S]*?)```/m.exec(body);
  return fence ? fence[1].trim() : null;
}

function firstHeading(body: string): string | null {
  const m = /^#\s+(.+)$/m.exec(body);
  return m ? m[1].trim() : null;
}

/** Skill: `.agent/skills/<dir>/SKILL.md` -> bloque tipo 'skill'. */
export function parseSkill(content: string, dirName: string): ParsedBlock {
  const { data, content: body } = safeMatter(content);
  const name = (data.name as string) || dirName;
  const repoBase = "https://github.com/<tu-repo>/skills";
  return {
    type: "skill",
    title: name,
    purpose: (data.description as string) ?? null,
    content: body.trim(),
    tags: ["skill"],
    metadata: {
      skill_name: name,
      repo_url: repoBase,
      install_cmd: `npx skills add ${repoBase} --skill ${name}`,
      tools: (data["allowed-tools"] as string) ?? undefined,
    },
    source: "import:agent",
  };
}

/** Agente: `.agent/agents/<name>.md` -> bloque tipo 'agent'. */
export function parseAgent(content: string, fileName: string): ParsedBlock {
  const { data, content: body } = safeMatter(content);
  const name = (data.name as string) || fileName.replace(/\.md$/, "");
  return {
    type: "agent",
    title: name,
    purpose: (data.description as string) ?? null,
    content: body.trim(),
    tags: ["agent"],
    metadata: {
      tools: (data.tools as string) ?? undefined,
      model: (data.model as string) ?? undefined,
      skills: Array.isArray(data.skills)
        ? (data.skills as string[]).join(", ")
        : (data.skills as string) ?? undefined,
      source_url: (data.source_url as string) ?? (data.source as string) ?? undefined,
    },
    source: "import:agent",
  };
}

/** Workflow: `.agent/workflows/<name>.md` -> bloque tipo 'command'. */
export function parseWorkflow(content: string, fileName: string): ParsedBlock {
  const { data, content: body } = safeMatter(content);
  const slug = fileName.replace(/\.md$/, "");
  const cmd = extractFirstCommand(body);
  return {
    type: "command",
    title: `/${slug}`,
    purpose: (data.description as string) ?? firstHeading(body) ?? null,
    content: cmd ?? body.trim(),
    tags: ["workflow"],
    metadata: { shell: "bash" },
    source: "import:agent",
  };
}

"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import type { Block, BlockType } from "@/lib/types";
import type { BlockFormState } from "@/app/(app)/blocks/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TYPE_OPTIONS: { value: BlockType; label: string }[] = [
  { value: "command", label: "Comando (npx, etc.)" },
  { value: "file", label: "Archivo (CLAUDE.md, etc.)" },
  { value: "skill", label: "Skill (repo + nombre)" },
  { value: "note", label: "Nota" },
  { value: "agent", label: "Agente (.md con frontmatter)" },
];

const initial: BlockFormState = { error: null };

/**
 * Parser de frontmatter en cliente (regex), sin gray-matter: extrae
 * `key: value` por líneas. Suficiente para autocompletar el form de agentes.
 */
function parseAgentMarkdown(md: string): {
  data: Record<string, string>;
  body: string;
} {
  const trimmed = md.trim();
  const fm = /^---\s*\n([\s\S]*?)\n---\s*\n?/.exec(trimmed);
  const data: Record<string, string> = {};
  if (fm) {
    for (const line of fm[1].split("\n")) {
      const idx = line.indexOf(":");
      if (idx <= 0) continue;
      const key = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      if (value.startsWith("[") && value.endsWith("]")) {
        // Array YAML/JSON inline (ej. tools: ["Read", "Edit"]) -> "Read, Edit".
        try {
          const parsed = JSON.parse(value);
          value = Array.isArray(parsed) ? parsed.join(", ") : String(parsed);
        } catch {
          value = value.replace(/[[\]"']/g, "").trim();
        }
      } else {
        value = value.replace(/^["']|["']$/g, "").trim();
      }
      if (key && value) data[key] = value;
    }
  }
  return { data, body: fm ? trimmed.slice(fm[0].length).trim() : trimmed };
}

export function BlockForm({
  action,
  block,
}: {
  action: (prev: BlockFormState, fd: FormData) => Promise<BlockFormState>;
  block?: Block;
}) {
  const [state, formAction, pending] = useActionState(action, initial);
  const [type, setType] = useState<BlockType>(block?.type ?? "command");
  const [paste, setPaste] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  /** Autocompleta los campos del form a partir del .md pegado del agente. */
  function fillFromPaste() {
    if (!paste.trim() || !formRef.current) return;
    const { data, body } = parseAgentMarkdown(paste);
    const set = (name: string, value?: string) => {
      const el = formRef.current?.elements.namedItem(name) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;
      if (el && value != null) el.value = value;
    };
    set("title", data.name);
    set("purpose", data.description);
    set("tools", data.tools);
    set("model", data.model);
    set("skills", data.skills);
    set("source_url", data.source_url ?? data.source);
    set("content", body);
  }

  return (
    <form ref={formRef} action={formAction} className="max-w-2xl space-y-5">
      <input type="hidden" name="type" value={type} />

      <div className="space-y-2">
        <Label>Tipo</Label>
        <Select value={type} onValueChange={(v) => setType(v as BlockType)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TYPE_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input id="title" name="title" defaultValue={block?.title} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="purpose">Para qué sirve</Label>
        <Input
          id="purpose"
          name="purpose"
          defaultValue={block?.purpose ?? ""}
          placeholder="Breve descripción de su utilidad"
        />
      </div>

      {type === "command" && (
        <div className="space-y-2">
          <Label>Shell</Label>
          <Select name="shell" defaultValue={block?.metadata.shell ?? "bash"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bash">bash (.sh)</SelectItem>
              <SelectItem value="powershell">powershell (.ps1)</SelectItem>
              <SelectItem value="both">ambos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {type === "file" && (
        <div className="space-y-2">
          <Label htmlFor="filename">Nombre de archivo</Label>
          <Input
            id="filename"
            name="filename"
            defaultValue={block?.metadata.filename ?? "CLAUDE.md"}
          />
        </div>
      )}

      {type === "skill" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="repo_url">URL del repo</Label>
            <Input
              id="repo_url"
              name="repo_url"
              defaultValue={block?.metadata.repo_url ?? ""}
              placeholder="https://github.com/..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skill_name">Nombre de la skill</Label>
            <Input
              id="skill_name"
              name="skill_name"
              defaultValue={block?.metadata.skill_name ?? ""}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="install_cmd">Comando de instalación</Label>
            <Input
              id="install_cmd"
              name="install_cmd"
              defaultValue={block?.metadata.install_cmd ?? ""}
              placeholder="npx skills add <url> --skill <nombre>"
            />
          </div>
        </div>
      )}

      {type === "agent" && (
        <>
          <div className="space-y-2 rounded-xl border border-border p-4">
            <Label htmlFor="agent-paste">Pegar definición del agente (.md)</Label>
            <Textarea
              id="agent-paste"
              value={paste}
              onChange={(e) => setPaste(e.target.value)}
              rows={4}
              placeholder="Pegá el markdown del agente (con frontmatter name/description/tools/model/skills) y rellenamos los campos."
              className="font-mono text-sm"
            />
            <Button type="button" variant="ghost" onClick={fillFromPaste}>
              Rellenar campos desde el markdown
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="model">Modelo</Label>
              <Input
                id="model"
                name="model"
                defaultValue={block?.metadata.model ?? ""}
                placeholder="sonnet, opus, haiku…"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="source_url">URL de origen</Label>
              <Input
                id="source_url"
                name="source_url"
                defaultValue={block?.metadata.source_url ?? ""}
                placeholder="https://github.com/... (de dónde lo sacaste)"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="tools">Tools (herramientas permitidas)</Label>
              <Input
                id="tools"
                name="tools"
                defaultValue={block?.metadata.tools ?? ""}
                placeholder="Read, Edit, Bash, …"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="skills">Skills asociadas</Label>
              <Input
                id="skills"
                name="skills"
                defaultValue={block?.metadata.skills ?? ""}
                placeholder="separadas por coma"
              />
            </div>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="content">
          {type === "file"
            ? "Contenido del archivo"
            : type === "agent"
              ? "Prompt del agente"
              : "Contenido"}
        </Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={block?.content}
          rows={type === "file" || type === "note" || type === "agent" ? 10 : 4}
          className="font-mono text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (separados por coma)</Label>
        <Input
          id="tags"
          name="tags"
          defaultValue={block?.tags.join(", ")}
          placeholder="setup, claude, ai"
        />
      </div>

      {state.error && <p className="text-sm text-red-500">{state.error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Guardando…" : "Guardar"}
        </Button>
        <Button type="button" variant="ghost" nativeButton={false} render={<Link href="/blocks" />}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

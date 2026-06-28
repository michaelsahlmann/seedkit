"use client";

import { useActionState, useState } from "react";
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
];

const initial: BlockFormState = { error: null };

export function BlockForm({
  action,
  block,
}: {
  action: (prev: BlockFormState, fd: FormData) => Promise<BlockFormState>;
  block?: Block;
}) {
  const [state, formAction, pending] = useActionState(action, initial);
  const [type, setType] = useState<BlockType>(block?.type ?? "command");

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
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

      <div className="space-y-2">
        <Label htmlFor="content">
          {type === "file" ? "Contenido del archivo" : "Contenido"}
        </Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={block?.content}
          rows={type === "file" || type === "note" ? 10 : 4}
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

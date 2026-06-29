"use client";

import Link from "next/link";
import { Pencil, Trash2, Terminal, FileText, Sparkles, StickyNote } from "lucide-react";
import type { Block, BlockType } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/copy-button";
import { DownloadButton } from "@/components/shared/download-button";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { deleteBlock } from "@/app/(app)/blocks/actions";

const ICONS: Record<BlockType, typeof Terminal> = {
  command: Terminal,
  file: FileText,
  skill: Sparkles,
  note: StickyNote,
};

const TYPE_LABEL: Record<BlockType, string> = {
  command: "Comando",
  file: "Archivo",
  skill: "Skill",
  note: "Nota",
};

/** Texto que se copia según el tipo de bloque. */
function copyValue(block: Block): string {
  if (block.type === "skill" && block.metadata.install_cmd) {
    return block.metadata.install_cmd;
  }
  return block.content;
}

export function BlockCard({ block }: { block: Block }) {
  const Icon = ICONS[block.type];

  return (
    <Card className="flex flex-col">
      <CardHeader className="space-y-2 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Icon className="size-4 text-muted-foreground" />
            <span className="font-medium">{block.title}</span>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {TYPE_LABEL[block.type]}
          </Badge>
        </div>
        {block.purpose && (
          <p className="text-sm text-muted-foreground">{block.purpose}</p>
        )}
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3">
        {copyValue(block) && (
          <pre className="max-h-32 overflow-auto rounded-md bg-muted p-2 text-xs">
            <code>{copyValue(block)}</code>
          </pre>
        )}

        {block.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {block.tags.map((t) => (
              <Badge key={t} variant="outline" className="text-[10px]">
                {t}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-2">
          {copyValue(block) && <CopyButton value={copyValue(block)} />}
          {block.type === "file" && (
            <DownloadButton
              content={block.content}
              filename={block.metadata.filename || "archivo.txt"}
            />
          )}
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href={`/blocks/${block.id}`} />}
          >
            <Pencil className="size-3.5" />
            Editar
          </Button>
          <ConfirmDialog
            onConfirm={() => deleteBlock(block.id)}
            title="Eliminar bloque"
            description={`¿Eliminar el bloque "${block.title}"? Esta acción no se puede deshacer.`}
            trigger={
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-red-500"
                aria-label="Eliminar bloque"
              >
                <Trash2 className="size-3.5" />
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

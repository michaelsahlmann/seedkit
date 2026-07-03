"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import type { Block } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/copy-button";
import { DownloadButton } from "@/components/shared/download-button";
import { blockCopyFields } from "@/lib/steps";
import { ICONS, TYPE_LABEL, downloadName } from "@/components/blocks/block-meta";

/** Modal de vista previa (solo lectura) de un bloque, con acción de editar. */
export function BlockPreviewDialog({
  block,
  open,
  onOpenChange,
}: {
  block: Block;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const Icon = ICONS[block.type];
  const fields = blockCopyFields(block);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Icon className="size-4 text-muted-foreground" />
            <DialogTitle>{block.title}</DialogTitle>
            <Badge variant="secondary" className="shrink-0">
              {TYPE_LABEL[block.type]}
            </Badge>
          </div>
          {block.purpose && (
            <DialogDescription>{block.purpose}</DialogDescription>
          )}
        </DialogHeader>

        <div className="max-h-[60vh] space-y-3 overflow-auto">
          {fields.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Este bloque no tiene contenido para mostrar.
            </p>
          ) : (
            fields.map((f) => (
              <div key={f.label} className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                    {f.label}
                  </span>
                  <CopyButton
                    value={f.value}
                    label={`Copiar ${f.label.toLowerCase()}`}
                    size="sm"
                    variant="outline"
                  />
                </div>
                <pre className="max-h-80 overflow-auto rounded-md bg-muted p-3 text-xs">
                  <code>{f.value}</code>
                </pre>
              </div>
            ))
          )}
        </div>

        {block.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {block.tags.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          {block.content && (
            <DownloadButton
              content={block.content}
              filename={downloadName(block)}
            />
          )}
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href={`/blocks/${block.id}`} />}
          >
            <Pencil className="size-3.5" />
            Editar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

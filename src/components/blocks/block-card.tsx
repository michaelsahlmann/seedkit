"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import type { Block } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/copy-button";
import { DownloadButton } from "@/components/shared/download-button";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { AddToChecklistDialog } from "@/components/blocks/add-to-checklist-dialog";
import { BlockPreviewDialog } from "@/components/blocks/block-preview-dialog";
import {
  ICONS,
  TYPE_LABEL,
  copyValue,
  downloadName,
} from "@/components/blocks/block-meta";
import { deleteBlock } from "@/app/(app)/blocks/actions";

export function BlockCard({ block }: { block: Block }) {
  const Icon = ICONS[block.type];
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="flex cursor-pointer flex-col"
      >
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
          {/* Los botones no deben disparar el modal de vista previa. */}
          <div
            className="mt-auto flex flex-wrap items-center gap-2 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            {copyValue(block) && <CopyButton value={copyValue(block)} />}
            {block.content && (
              <DownloadButton
                content={block.content}
                filename={downloadName(block)}
              />
            )}
            <AddToChecklistDialog block={block} />
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

      <BlockPreviewDialog block={block} open={open} onOpenChange={setOpen} />
    </>
  );
}

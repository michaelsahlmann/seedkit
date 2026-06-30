"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Trash2,
  Link2,
  X,
  Terminal,
  FileText,
  Sparkles,
  StickyNote,
} from "lucide-react";
import type { Block, BlockType, PlaybookLine } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { BlockCopyDialog } from "@/components/playbooks/block-copy-dialog";
import { LinkBlockDialog } from "@/components/playbooks/link-block-dialog";

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

export function SortableLine({
  line,
  index,
  library,
  onRemove,
  onLink,
  onUnlink,
}: {
  line: PlaybookLine;
  index: number;
  library: Block[];
  onRemove: (id: string) => void;
  onLink: (stepId: string, blockId: string) => void;
  onUnlink: (stepId: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: line.id });

  const block = line.block;
  const Icon = block ? ICONS[block.type] : null;

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex gap-3 rounded-lg border bg-card p-3 ${isDragging ? "opacity-60" : ""}`}
    >
      <button
        type="button"
        className="mt-1 cursor-grab text-muted-foreground active:cursor-grabbing"
        {...attributes}
        {...listeners}
        aria-label="Reordenar"
      >
        <GripVertical className="size-4" />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{index + 1}.</span>
          <span className="truncate font-medium">{line.title}</span>
        </div>

        <div className="mt-2">
          {block && Icon ? (
            <div className="flex items-center gap-1">
              <BlockCopyDialog
                block={block}
                trigger={
                  <Button variant="outline" size="sm" className="max-w-full">
                    <Icon className="size-3.5 shrink-0" />
                    <span className="truncate">{block.title}</span>
                    <Badge variant="secondary" className="ml-1 shrink-0">
                      {TYPE_LABEL[block.type]}
                    </Badge>
                  </Button>
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                aria-label="Desvincular bloque"
                onClick={() => onUnlink(line.id)}
              >
                <X className="size-3.5" />
              </Button>
            </div>
          ) : (
            <LinkBlockDialog
              library={library}
              onPick={(blockId) => onLink(line.id, blockId)}
              trigger={
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  <Link2 className="size-3.5" />
                  Vincular bloque
                </Button>
              }
            />
          )}
        </div>
      </div>

      <ConfirmDialog
        onConfirm={() => onRemove(line.id)}
        title="Eliminar línea"
        description={`¿Quitar la línea "${line.title}" del checklist?`}
        trigger={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-red-500"
            aria-label="Eliminar línea"
          >
            <Trash2 className="size-3.5" />
          </Button>
        }
      />
    </div>
  );
}

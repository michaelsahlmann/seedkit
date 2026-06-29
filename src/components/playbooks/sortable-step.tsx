"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import type { ResolvedStep } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/copy-button";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { stepCopyValue } from "@/lib/steps";

const TYPE_LABEL = {
  command: "Comando",
  file: "Archivo",
  skill: "Skill",
  note: "Nota",
} as const;

export function SortableStep({
  step,
  index,
  onRemove,
}: {
  step: ResolvedStep;
  index: number;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: step.id });

  const value = stepCopyValue(step);

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
          <span className="truncate font-medium">{step.title}</span>
          <Badge variant="secondary" className="shrink-0">
            {TYPE_LABEL[step.type]}
          </Badge>
        </div>
        {step.purpose && (
          <p className="mt-0.5 text-sm text-muted-foreground">{step.purpose}</p>
        )}
        {value && (
          <pre className="mt-2 max-h-24 overflow-auto rounded bg-muted p-2 text-xs">
            <code>{value}</code>
          </pre>
        )}
      </div>

      <div className="flex flex-col items-end gap-1">
        {value && <CopyButton value={value} size="icon" variant="ghost" />}
        <ConfirmDialog
          onConfirm={() => onRemove(step.id)}
          title="Eliminar paso"
          description={`¿Quitar el paso "${step.title}" del playbook?`}
          trigger={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-red-500"
              aria-label="Eliminar paso"
            >
              <Trash2 className="size-3.5" />
            </Button>
          }
        />
      </div>
    </div>
  );
}

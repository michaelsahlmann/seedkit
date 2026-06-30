"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Play, Plus, Trash2 } from "lucide-react";
import type { Block, Playbook, PlaybookLine } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExportDialog } from "@/components/shared/export-dialog";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { SortableLine } from "@/components/playbooks/sortable-step";
import { linesToScript } from "@/lib/steps";
import {
  addLine,
  linkBlock,
  unlinkBlock,
  removeStep,
  reorderSteps,
  startRun,
  deletePlaybook,
} from "@/app/(app)/playbooks/actions";

export function PlaybookEditor({
  playbook,
  lines: initialLines,
  library,
}: {
  playbook: Playbook;
  lines: PlaybookLine[];
  library: Block[];
}) {
  const router = useRouter();
  const [lines, setLines] = useState(initialLines);
  const [newTitle, setNewTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = lines.findIndex((l) => l.id === active.id);
    const newIndex = lines.findIndex((l) => l.id === over.id);
    const next = arrayMove(lines, oldIndex, newIndex);
    setLines(next);
    startTransition(() =>
      reorderSteps(playbook.id, next.map((l) => l.id)),
    );
  }

  function handleAddLine() {
    const text = newTitle.trim();
    if (!text) return;
    setNewTitle("");
    startTransition(async () => {
      await addLine(playbook.id, text);
      router.refresh();
    });
  }

  function handleLink(stepId: string, blockId: string) {
    startTransition(async () => {
      await linkBlock(playbook.id, stepId, blockId);
      router.refresh();
    });
  }

  function handleUnlink(stepId: string) {
    setLines((prev) =>
      prev.map((l) => (l.id === stepId ? { ...l, block: null } : l)),
    );
    startTransition(() => unlinkBlock(playbook.id, stepId));
  }

  function handleRemove(stepId: string) {
    setLines((prev) => prev.filter((l) => l.id !== stepId));
    startTransition(() => removeStep(playbook.id, stepId));
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{playbook.title}</h1>
          {playbook.purpose && (
            <p className="mt-1 text-sm font-semibold text-muted-foreground">
              {playbook.purpose}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <ExportDialog
            steps={linesToScript(lines)}
            baseName={playbook.title.toLowerCase().replace(/\s+/g, "-")}
          />
          <Button
            onClick={() => startTransition(() => startRun(playbook.id))}
            disabled={lines.length === 0 || isPending}
          >
            <Play className="size-4" />
            Iniciar ejecución
          </Button>
          <ConfirmDialog
            onConfirm={() => deletePlaybook(playbook.id)}
            title="Eliminar playbook"
            description={`¿Eliminar el playbook "${playbook.title}"? Esta acción no se puede deshacer.`}
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500"
                aria-label="Eliminar playbook"
              >
                <Trash2 className="size-4" />
              </Button>
            }
          />
        </div>
      </div>

      {/* Agregar línea */}
      <div className="mt-6 flex gap-2">
        <Input
          placeholder="Nueva línea del checklist…"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddLine();
            }
          }}
        />
        <Button onClick={handleAddLine} disabled={!newTitle.trim() || isPending}>
          <Plus className="size-4" />
          Agregar
        </Button>
      </div>

      {/* Líneas */}
      <div className="mt-4 space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Líneas ({lines.length}) — arrastrá para reordenar
        </p>
        {lines.length === 0 ? (
          <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            Escribí tu primera línea arriba. Después podés vincularle un bloque.
          </p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <SortableContext
              items={lines.map((l) => l.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {lines.map((l, i) => (
                  <SortableLine
                    key={l.id}
                    line={l}
                    index={i}
                    library={library}
                    onRemove={handleRemove}
                    onLink={handleLink}
                    onUnlink={handleUnlink}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}

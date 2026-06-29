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
import { Play, Plus, Trash2, Search } from "lucide-react";
import type { Block, Playbook, ResolvedStep } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExportDialog } from "@/components/shared/export-dialog";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { SortableStep } from "@/components/playbooks/sortable-step";
import { resolvedToScript } from "@/lib/steps";
import {
  addStep,
  removeStep,
  reorderSteps,
  startRun,
  deletePlaybook,
} from "@/app/(app)/playbooks/actions";

export function PlaybookEditor({
  playbook,
  steps: initialSteps,
  library,
}: {
  playbook: Playbook;
  steps: ResolvedStep[];
  library: Block[];
}) {
  const router = useRouter();
  const [steps, setSteps] = useState(initialSteps);
  const [filter, setFilter] = useState("");
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = steps.findIndex((s) => s.id === active.id);
    const newIndex = steps.findIndex((s) => s.id === over.id);
    const next = arrayMove(steps, oldIndex, newIndex);
    setSteps(next);
    startTransition(() =>
      reorderSteps(playbook.id, next.map((s) => s.id)),
    );
  }

  function handleAdd(blockId: string) {
    startTransition(async () => {
      await addStep(playbook.id, blockId);
      router.refresh();
    });
  }

  function handleRemove(stepId: string) {
    setSteps((s) => s.filter((x) => x.id !== stepId));
    startTransition(() => removeStep(playbook.id, stepId));
  }

  const filtered = library.filter((b) =>
    b.title.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-6xl p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{playbook.title}</h1>
          {playbook.purpose && (
            <p className="mt-1 text-sm font-semibold text-muted-foreground">{playbook.purpose}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <ExportDialog
            steps={resolvedToScript(steps)}
            baseName={playbook.title.toLowerCase().replace(/\s+/g, "-")}
          />
          <Button
            onClick={() => startTransition(() => startRun(playbook.id))}
            disabled={steps.length === 0 || isPending}
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

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Pasos */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Pasos ({steps.length}) — arrastrá para reordenar
          </p>
          {steps.length === 0 ? (
            <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
              Agregá bloques desde la biblioteca →
            </p>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext
                items={steps.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {steps.map((s, i) => (
                    <SortableStep
                      key={s.id}
                      step={s}
                      index={i}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>

        {/* Biblioteca */}
        <Card className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Biblioteca</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar bloque…"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="h-8 pl-7"
              />
            </div>
          </CardHeader>
          <CardContent className="max-h-[60vh] space-y-1 overflow-auto">
            {filtered.length === 0 ? (
              <p className="py-4 text-center text-xs text-muted-foreground">
                Sin resultados.
              </p>
            ) : (
              filtered.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handleAdd(b.id)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
                >
                  <Plus className="size-3.5 shrink-0 text-muted-foreground" />
                  <span className="truncate">{b.title}</span>
                  <Badge variant="outline" className="ml-auto shrink-0 text-[10px]">
                    {b.type}
                  </Badge>
                </button>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

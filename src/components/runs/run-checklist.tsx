"use client";

import { useMemo, useState, useTransition } from "react";
import { CheckCircle2, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import type { Run, RunStep, BlockType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyButton } from "@/components/shared/copy-button";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { ExportDialog } from "@/components/shared/export-dialog";
import { stepCopyValue, runStepsToScript } from "@/lib/steps";
import { toggleRunStep, deleteRun } from "@/app/(app)/runs/actions";

const TYPE_LABEL: Record<BlockType, string> = {
  command: "Comando",
  file: "Archivo",
  skill: "Skill",
  note: "Nota",
};

export function RunChecklist({
  run,
  steps: initial,
}: {
  run: Run;
  steps: RunStep[];
}) {
  const [steps, setSteps] = useState(initial);
  const [showDone, setShowDone] = useState(false);
  const [, startTransition] = useTransition();

  const done = steps.filter((s) => s.checked).length;
  const total = steps.length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  const pending = useMemo(() => steps.filter((s) => !s.checked), [steps]);
  const completed = useMemo(() => steps.filter((s) => s.checked), [steps]);

  function toggle(step: RunStep, checked: boolean) {
    setSteps((prev) =>
      prev.map((s) => (s.id === step.id ? { ...s, checked } : s)),
    );
    startTransition(() => toggleRunStep(run.id, step.id, checked));
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold">
            {pct === 100 && <CheckCircle2 className="size-6 text-green-500" />}
            {run.title}
          </h1>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">
            {done} de {total} pasos completados
          </p>
        </div>
        <div className="flex gap-2">
          <ExportDialog
            steps={runStepsToScript(steps)}
            baseName={run.title.toLowerCase().replace(/\s+/g, "-")}
          />
          <ConfirmDialog
            onConfirm={() => deleteRun(run.id)}
            title="Eliminar ejecución"
            description={`¿Eliminar la ejecución "${run.title}"? Esta acción no se puede deshacer.`}
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500"
                aria-label="Eliminar ejecución"
              >
                <Trash2 className="size-4" />
              </Button>
            }
          />
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Pendientes */}
      <div className="mt-6 space-y-2">
        {pending.length === 0 ? (
          <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            🎉 ¡Todos los pasos completados!
          </p>
        ) : (
          pending.map((step) => (
            <StepRow key={step.id} step={step} onToggle={toggle} />
          ))
        )}
      </div>

      {/* Completados (colapsable) */}
      {completed.length > 0 && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowDone((v) => !v)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            {showDone ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
            Completados ({completed.length})
          </button>
          {showDone && (
            <div className="mt-2 space-y-2">
              {completed.map((step) => (
                <StepRow key={step.id} step={step} onToggle={toggle} done />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StepRow({
  step,
  onToggle,
  done = false,
}: {
  step: RunStep;
  onToggle: (s: RunStep, checked: boolean) => void;
  done?: boolean;
}) {
  const value = stepCopyValue(step);
  return (
    <div
      className={`flex gap-3 rounded-lg border bg-card p-3 ${done ? "opacity-60" : ""}`}
    >
      <Checkbox
        checked={step.checked}
        onCheckedChange={(c) => onToggle(step, c === true)}
        className="mt-1"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={`font-medium ${done ? "line-through" : ""}`}>
            {step.title}
          </span>
          <Badge variant="secondary" className="shrink-0">
            {TYPE_LABEL[step.type]}
          </Badge>
        </div>
        {step.purpose && (
          <p className="mt-0.5 text-sm text-muted-foreground">{step.purpose}</p>
        )}
        {value && !done && (
          <pre className="mt-2 max-h-32 overflow-auto rounded bg-muted p-2 text-xs">
            <code>{value}</code>
          </pre>
        )}
      </div>
      {value && !done && (
        <CopyButton value={value} size="icon" variant="ghost" />
      )}
    </div>
  );
}

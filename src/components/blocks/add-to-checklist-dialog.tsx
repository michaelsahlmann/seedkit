"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ListPlus, PlaySquare } from "lucide-react";
import type { Block } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { addRunStep, listActiveRuns } from "@/app/(app)/runs/actions";

/** Vincula un bloque a uno de los checklists (runs) activos del usuario sin salir de la galería. */
export function AddToChecklistDialog({ block }: { block: Block }) {
  const [open, setOpen] = useState(false);
  const [runs, setRuns] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  function onOpenChange(next: boolean) {
    setOpen(next);
    if (next) {
      setLoading(true);
      listActiveRuns()
        .then(setRuns)
        .finally(() => setLoading(false));
    }
  }

  function add(runId: string, title: string) {
    startTransition(async () => {
      await addRunStep(runId, block.id);
      setOpen(false);
      toast.success(`«${block.title}» agregado a ${title}`);
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="sm" aria-label="Agregar a checklist">
            <ListPlus className="size-3.5" />
            A checklist
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar a un checklist</DialogTitle>
          <DialogDescription>
            Elegí a qué checklist activo vincular «{block.title}».
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] space-y-1 overflow-auto">
          {loading ? (
            <p className="py-4 text-center text-xs text-muted-foreground">
              Cargando…
            </p>
          ) : runs.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No tenés checklists activos. Iniciá uno desde un{" "}
              <Link href="/playbooks" className="underline">
                playbook
              </Link>
              .
            </p>
          ) : (
            runs.map((r) => (
              <button
                key={r.id}
                type="button"
                disabled={isPending}
                onClick={() => add(r.id, r.title)}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted disabled:opacity-50"
              >
                <PlaySquare className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="truncate">{r.title}</span>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

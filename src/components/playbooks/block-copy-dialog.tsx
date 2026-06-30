"use client";

import type { ReactElement } from "react";
import type { Block } from "@/lib/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CopyButton } from "@/components/shared/copy-button";
import { blockCopyFields } from "@/lib/steps";

/** Modal con la info del bloque vinculado: cada campo copiable con su propio botón. */
export function BlockCopyDialog({
  block,
  trigger,
}: {
  block: Block;
  trigger: ReactElement;
}) {
  const fields = blockCopyFields(block);

  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{block.title}</DialogTitle>
          {block.purpose && (
            <DialogDescription>{block.purpose}</DialogDescription>
          )}
        </DialogHeader>
        <div className="space-y-3">
          {fields.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Este bloque no tiene contenido para copiar.
            </p>
          ) : (
            fields.map((f) => (
              <div key={f.label} className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                    {f.label}
                  </span>
                  <CopyButton value={f.value} label={`Copiar ${f.label.toLowerCase()}`} size="sm" variant="outline" />
                </div>
                <pre className="max-h-48 overflow-auto rounded bg-muted p-2 text-xs">
                  <code>{f.value}</code>
                </pre>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

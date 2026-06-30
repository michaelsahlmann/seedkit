"use client";

import { useState, type ReactElement } from "react";
import { Search, Plus } from "lucide-react";
import type { Block } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/** Selector de biblioteca para vincular un bloque a una línea del checklist. */
export function LinkBlockDialog({
  library,
  onPick,
  trigger,
}: {
  library: Block[];
  onPick: (blockId: string) => void;
  trigger: ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const filtered = library.filter((b) =>
    b.title.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vincular bloque</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar bloque…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-8 pl-7"
            autoFocus
          />
        </div>
        <div className="max-h-[60vh] space-y-1 overflow-auto">
          {filtered.length === 0 ? (
            <p className="py-4 text-center text-xs text-muted-foreground">
              Sin resultados.
            </p>
          ) : (
            filtered.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  onPick(b.id);
                  setOpen(false);
                }}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}

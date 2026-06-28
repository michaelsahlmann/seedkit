"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import {
  generateScript,
  scriptFilename,
  type ScriptTarget,
} from "@/lib/script-generator";
import type { ScriptStep } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/copy-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function ExportDialog({
  steps,
  baseName = "base-general",
  triggerLabel = "Exportar script",
}: {
  steps: ScriptStep[];
  baseName?: string;
  triggerLabel?: string;
}) {
  const [target, setTarget] = useState<ScriptTarget>("sh");
  const script = generateScript(steps, target);

  function download() {
    const blob = new Blob([script], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = scriptFilename(target, baseName);
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" disabled={steps.length === 0}>
            <Download className="size-4" />
            {triggerLabel}
          </Button>
        }
      />
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Exportar script vivo</DialogTitle>
          <DialogDescription>
            {steps.length} paso(s). Editable y reejecutable.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={target} onValueChange={(v) => setTarget(v as ScriptTarget)}>
          <TabsList>
            <TabsTrigger value="sh">bash (.sh)</TabsTrigger>
            <TabsTrigger value="ps1">PowerShell (.ps1)</TabsTrigger>
          </TabsList>
          <TabsContent value={target} className="mt-3">
            <pre className="max-h-80 overflow-auto rounded-md bg-muted p-3 text-xs">
              <code>{script}</code>
            </pre>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2">
          <Button onClick={download}>
            <Download className="size-4" />
            Descargar
          </Button>
          <CopyButton value={script} label="Copiar script" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

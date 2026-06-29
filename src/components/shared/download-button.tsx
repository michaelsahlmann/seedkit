"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

/** Descarga `content` como un archivo llamado `filename` (p. ej. CLAUDE.md). */
export function DownloadButton({
  content,
  filename,
  label = "Descargar",
  className,
  size = "sm",
  variant = "outline",
}: {
  content: string;
  filename: string;
  label?: string;
  className?: string;
  size?: "sm" | "default" | "icon";
  variant?: "outline" | "ghost" | "secondary" | "default";
}) {
  function download() {
    try {
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(`Descargado ${filename}`);
    } catch {
      toast.error("No se pudo descargar");
    }
  }

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      onClick={download}
      className={cn("gap-1.5", className)}
    >
      <Download className="size-3.5" />
      {size !== "icon" && label}
    </Button>
  );
}

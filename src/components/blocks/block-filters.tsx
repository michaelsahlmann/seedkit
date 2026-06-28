"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Route } from "next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TYPES = [
  { value: "", label: "Todos" },
  { value: "command", label: "Comandos" },
  { value: "file", label: "Archivos" },
  { value: "skill", label: "Skills" },
  { value: "note", label: "Notas" },
] as const;

export function BlockFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const activeType = params.get("type") ?? "";

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace((qs ? `${pathname}?${qs}` : pathname) as Route);
  }

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <div className="flex gap-1">
        {TYPES.map((t) => (
          <Button
            key={t.value}
            size="sm"
            variant={activeType === t.value ? "default" : "outline"}
            onClick={() => setParam("type", t.value)}
            className={cn("h-8")}
          >
            {t.label}
          </Button>
        ))}
      </div>
      <Input
        placeholder="Buscar por título…"
        defaultValue={params.get("q") ?? ""}
        onChange={(e) => setParam("q", e.target.value)}
        className="h-8 max-w-xs"
      />
    </div>
  );
}

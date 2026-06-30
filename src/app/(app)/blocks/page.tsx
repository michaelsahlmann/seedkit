import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Block, BlockType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { BlockCard } from "@/components/blocks/block-card";
import { BlockFilters } from "@/components/blocks/block-filters";

const TYPES: BlockType[] = ["command", "file", "skill", "note", "agent"];

export default async function BlocksPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string; tag?: string }>;
}) {
  const { type, q, tag } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("blocks")
    .select("*")
    .order("updated_at", { ascending: false });

  if (type && TYPES.includes(type as BlockType)) {
    query = query.eq("type", type as BlockType);
  }
  if (tag) query = query.contains("tags", [tag]);
  if (q) query = query.ilike("title", `%${q}%`);

  const { data } = await query;
  const blocks = (data ?? []) as Block[];

  return (
    <div className="mx-auto max-w-6xl p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Bloques</h1>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">
            Tu biblioteca de comandos, archivos, skills, notas y agentes.
          </p>
        </div>
        <Button nativeButton={false} render={<Link href="/blocks/new" />}>
          <Plus className="size-4" />
          Nuevo bloque
        </Button>
      </div>

      <BlockFilters />

      {blocks.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No hay bloques todavía. Creá uno o importá desde{" "}
          <Link href="/import" className="underline">
            Importar
          </Link>
          .
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map((b) => (
            <BlockCard key={b.id} block={b} />
          ))}
        </div>
      )}
    </div>
  );
}

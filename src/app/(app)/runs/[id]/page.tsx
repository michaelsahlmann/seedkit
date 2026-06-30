import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Block, Run, RunStep } from "@/lib/types";
import { RunChecklist } from "@/components/runs/run-checklist";

export default async function RunPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: run } = await supabase
    .from("runs")
    .select("*")
    .eq("id", id)
    .single();

  if (!run) notFound();

  const { data: steps } = await supabase
    .from("run_steps")
    .select("*")
    .eq("run_id", id)
    .order("position", { ascending: true });

  const { data: blockRows } = await supabase
    .from("blocks")
    .select("*")
    .order("title", { ascending: true });

  return (
    <RunChecklist
      run={run as Run}
      steps={(steps ?? []) as RunStep[]}
      library={(blockRows ?? []) as Block[]}
    />
  );
}

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

  const [{ data: run }, { data: steps }, { data: blockRows }] = await Promise.all([
    supabase.from("runs").select("*").eq("id", id).single(),
    supabase
      .from("run_steps")
      .select("*")
      .eq("run_id", id)
      .order("position", { ascending: true }),
    supabase.from("blocks").select("*").order("title", { ascending: true }),
  ]);

  if (!run) notFound();

  return (
    <RunChecklist
      run={run as Run}
      steps={(steps ?? []) as RunStep[]}
      library={(blockRows ?? []) as Block[]}
    />
  );
}

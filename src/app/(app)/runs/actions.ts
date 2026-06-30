"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Block } from "@/lib/types";

type ServerClient = Awaited<ReturnType<typeof createClient>>;

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return { supabase, user };
}

/**
 * Recalcula el estado del run según sus pasos: si no queda ninguno sin marcar
 * (y hay al menos uno) lo marca como "completed"; si no, "active".
 */
async function recomputeRunStatus(supabase: ServerClient, runId: string) {
  const { count: total } = await supabase
    .from("run_steps")
    .select("*", { count: "exact", head: true })
    .eq("run_id", runId);

  const { count: pending } = await supabase
    .from("run_steps")
    .select("*", { count: "exact", head: true })
    .eq("run_id", runId)
    .eq("checked", false);

  const done = (total ?? 0) > 0 && pending === 0;

  await supabase
    .from("runs")
    .update({
      status: done ? "completed" : "active",
      completed_at: done ? new Date().toISOString() : null,
    })
    .eq("id", runId);
}

/** Marca/desmarca un paso del checklist y actualiza el estado del run. */
export async function toggleRunStep(
  runId: string,
  stepId: string,
  checked: boolean,
) {
  const { supabase } = await requireUser();

  await supabase
    .from("run_steps")
    .update({ checked, checked_at: checked ? new Date().toISOString() : null })
    .eq("id", stepId);

  await recomputeRunStatus(supabase, runId);

  revalidatePath(`/runs/${runId}`);
}

/** Vincula un bloque de la biblioteca como nuevo paso (snapshot) al final del run. */
export async function addRunStep(runId: string, blockId: string) {
  const { supabase } = await requireUser();

  const { data: block } = await supabase
    .from("blocks")
    .select("*")
    .eq("id", blockId)
    .single<Block>();

  if (!block) return;

  const { data: last } = await supabase
    .from("run_steps")
    .select("position")
    .eq("run_id", runId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  const position = (last?.position ?? -1) + 1;

  await supabase.from("run_steps").insert({
    run_id: runId,
    position,
    type: block.type,
    title: block.title,
    purpose: block.purpose,
    content: block.content,
    metadata: block.metadata,
    checked: false,
  });

  // Un paso nuevo sin marcar puede sacar al run de "completed".
  await recomputeRunStatus(supabase, runId);

  revalidatePath(`/runs/${runId}`);
}

/** Marca (true) o desmarca (false) todos los pasos del run de una sola vez. */
export async function setAllRunSteps(runId: string, checked: boolean) {
  const { supabase } = await requireUser();

  await supabase
    .from("run_steps")
    .update({ checked, checked_at: checked ? new Date().toISOString() : null })
    .eq("run_id", runId);

  await recomputeRunStatus(supabase, runId);

  revalidatePath(`/runs/${runId}`);
}

/** Lista los checklists (runs) activos del usuario, para vincular un bloque desde la galería. */
export async function listActiveRuns(): Promise<{ id: string; title: string }[]> {
  const { supabase } = await requireUser();

  const { data } = await supabase
    .from("runs")
    .select("id, title")
    .eq("status", "active")
    .order("started_at", { ascending: false });

  return (data ?? []) as { id: string; title: string }[];
}

export async function deleteRun(runId: string) {
  const { supabase } = await requireUser();
  const { error } = await supabase.from("runs").delete().eq("id", runId);
  if (error) throw new Error(error.message);
  revalidatePath("/runs");
  redirect("/runs");
}

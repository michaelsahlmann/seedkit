"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return { supabase, user };
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

  // ¿Quedan pasos sin marcar?
  const { count: pending } = await supabase
    .from("run_steps")
    .select("*", { count: "exact", head: true })
    .eq("run_id", runId)
    .eq("checked", false);

  await supabase
    .from("runs")
    .update({
      status: pending === 0 ? "completed" : "active",
      completed_at: pending === 0 ? new Date().toISOString() : null,
    })
    .eq("id", runId);

  revalidatePath(`/runs/${runId}`);
}

export async function deleteRun(runId: string) {
  const { supabase } = await requireUser();
  await supabase.from("runs").delete().eq("id", runId);
  revalidatePath("/runs");
  redirect("/runs");
}

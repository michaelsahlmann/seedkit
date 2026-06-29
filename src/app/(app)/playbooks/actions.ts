"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateKeyBetween } from "fractional-indexing";
import { createClient } from "@/lib/supabase/server";
import type { Block } from "@/lib/types";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return { supabase, user };
}

export async function createPlaybook(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const purpose = String(formData.get("purpose") ?? "").trim();
  if (!title) return;

  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from("playbooks")
    .insert({ user_id: user.id, title, purpose: purpose || null })
    .select("id")
    .single();

  if (error || !data) return;
  revalidatePath("/playbooks");
  redirect(`/playbooks/${data.id}`);
}

export async function deletePlaybook(id: string) {
  const { supabase } = await requireUser();
  const { error } = await supabase.from("playbooks").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/playbooks");
  redirect("/playbooks");
}

/** Agrega un bloque de la biblioteca como nuevo paso al final. */
export async function addStep(playbookId: string, blockId: string) {
  const { supabase } = await requireUser();

  const { data: last } = await supabase
    .from("playbook_steps")
    .select("position")
    .eq("playbook_id", playbookId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  const position = generateKeyBetween(last?.position ?? null, null);

  await supabase.from("playbook_steps").insert({
    playbook_id: playbookId,
    block_id: blockId,
    position,
  });

  revalidatePath(`/playbooks/${playbookId}`);
}

export async function removeStep(playbookId: string, stepId: string) {
  const { supabase } = await requireUser();
  const { error } = await supabase
    .from("playbook_steps")
    .delete()
    .eq("id", stepId);
  if (error) throw new Error(error.message);
  revalidatePath(`/playbooks/${playbookId}`);
}

/** Persiste el nuevo orden tras un drag&drop (lista completa de ids ordenada). */
export async function reorderSteps(playbookId: string, orderedIds: string[]) {
  const { supabase } = await requireUser();

  let prev: string | null = null;
  for (const id of orderedIds) {
    const position = generateKeyBetween(prev, null);
    await supabase
      .from("playbook_steps")
      .update({ position })
      .eq("id", id)
      .eq("playbook_id", playbookId);
    prev = position;
  }

  revalidatePath(`/playbooks/${playbookId}`);
}

/** Crea un run con snapshot de los pasos actuales y redirige a la ejecución. */
export async function startRun(playbookId: string) {
  const { supabase, user } = await requireUser();

  const { data: playbook } = await supabase
    .from("playbooks")
    .select("title")
    .eq("id", playbookId)
    .single();

  const { data: steps } = await supabase
    .from("playbook_steps")
    .select("*, blocks(*)")
    .eq("playbook_id", playbookId)
    .order("position", { ascending: true });

  const { data: run, error } = await supabase
    .from("runs")
    .insert({
      user_id: user.id,
      playbook_id: playbookId,
      title: playbook?.title ?? "Ejecución",
    })
    .select("id")
    .single();

  if (error || !run) return;

  type StepRow = {
    block_id: string | null;
    override_purpose: string | null;
    inline_type: string | null;
    inline_title: string | null;
    inline_content: string | null;
    blocks: Block | null;
  };

  const rows = ((steps ?? []) as StepRow[]).map((s, i) => {
    const b = s.blocks;
    return {
      run_id: run.id,
      position: i,
      type: b?.type ?? s.inline_type ?? "note",
      title: b?.title ?? s.inline_title ?? "Paso",
      purpose: s.override_purpose ?? b?.purpose ?? null,
      content: b?.content ?? s.inline_content ?? "",
      metadata: b?.metadata ?? {},
    };
  });

  if (rows.length > 0) {
    await supabase.from("run_steps").insert(rows);
  }

  revalidatePath("/runs");
  redirect(`/runs/${run.id}`);
}

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

async function nextPosition(
  supabase: Awaited<ReturnType<typeof createClient>>,
  playbookId: string,
) {
  const { data: last } = await supabase
    .from("playbook_steps")
    .select("position")
    .eq("playbook_id", playbookId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();
  return generateKeyBetween(last?.position ?? null, null);
}

/** Crea una línea del checklist con texto propio (sin bloque todavía). */
export async function addLine(playbookId: string, title: string) {
  const text = title.trim();
  if (!text) return;

  const { supabase } = await requireUser();
  const position = await nextPosition(supabase, playbookId);

  // Rama "inline" del check step_ref_or_inline: block_id null + inline_content not null.
  await supabase.from("playbook_steps").insert({
    playbook_id: playbookId,
    position,
    inline_title: text,
    inline_type: "note",
    inline_content: "",
  });

  revalidatePath(`/playbooks/${playbookId}`);
}

/** Vincula un bloque a una línea existente (conserva el texto de la línea). */
export async function linkBlock(
  playbookId: string,
  stepId: string,
  blockId: string,
) {
  const { supabase } = await requireUser();

  // Rama "referencia" del check: block_id not null + inline_content null.
  await supabase
    .from("playbook_steps")
    .update({ block_id: blockId, inline_content: null })
    .eq("id", stepId)
    .eq("playbook_id", playbookId);

  revalidatePath(`/playbooks/${playbookId}`);
}

/** Quita el bloque vinculado a una línea (la línea y su texto se mantienen). */
export async function unlinkBlock(playbookId: string, stepId: string) {
  const { supabase } = await requireUser();

  // Vuelve a la rama "inline" del check.
  await supabase
    .from("playbook_steps")
    .update({ block_id: null, inline_content: "", inline_type: "note" })
    .eq("id", stepId)
    .eq("playbook_id", playbookId);

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
      title: s.inline_title ?? b?.title ?? "Paso",
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

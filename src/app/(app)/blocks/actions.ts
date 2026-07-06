"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { skillInstallCmd } from "@/lib/skills";
import type { BlockMetadata } from "@/lib/types";

const blockSchema = z.object({
  type: z.enum(["command", "file", "skill", "note", "agent"]),
  title: z.string().trim().min(1, "El título es obligatorio."),
  purpose: z.string().trim().optional().default(""),
  content: z.string().optional().default(""),
  tags: z.string().optional().default(""),
  // metadata por tipo
  filename: z.string().trim().optional(),
  shell: z.enum(["bash", "powershell", "both"]).optional(),
  repo_url: z.string().trim().optional(),
  skill_name: z.string().trim().optional(),
  install_cmd: z.string().trim().optional(),
  // agent
  tools: z.string().trim().optional(),
  model: z.string().trim().optional(),
  skills: z.string().trim().optional(),
  source_url: z.string().trim().optional(),
});

export type BlockFormState = { error: string | null };

function parseTags(raw: string): string[] {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function buildMetadata(data: z.infer<typeof blockSchema>): BlockMetadata {
  switch (data.type) {
    case "command":
      return { shell: data.shell ?? "bash" };
    case "file":
      return { filename: data.filename || "archivo.txt", language: "text" };
    case "skill":
      return {
        repo_url: data.repo_url,
        skill_name: data.skill_name,
        install_cmd:
          data.install_cmd || skillInstallCmd(data.repo_url, data.skill_name),
      };
    case "agent":
      return {
        tools: data.tools,
        model: data.model,
        skills: data.skills,
        source_url: data.source_url,
      };
    default:
      return {};
  }
}

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return { supabase, user };
}

export async function createBlock(
  _prev: BlockFormState,
  formData: FormData,
): Promise<BlockFormState> {
  const parsed = blockSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  const { supabase, user } = await requireUser();
  const data = parsed.data;

  const { error } = await supabase.from("blocks").insert({
    user_id: user.id,
    type: data.type,
    title: data.title,
    purpose: data.purpose || null,
    content: data.content ?? "",
    tags: parseTags(data.tags),
    metadata: buildMetadata(data),
    source: "manual",
  });

  if (error) return { error: error.message };

  revalidatePath("/blocks");
  redirect("/blocks");
}

export async function updateBlock(
  id: string,
  _prev: BlockFormState,
  formData: FormData,
): Promise<BlockFormState> {
  const parsed = blockSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  const { supabase } = await requireUser();
  const data = parsed.data;

  const { error } = await supabase
    .from("blocks")
    .update({
      type: data.type,
      title: data.title,
      purpose: data.purpose || null,
      content: data.content ?? "",
      tags: parseTags(data.tags),
      metadata: buildMetadata(data),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/blocks");
  redirect("/blocks");
}

export async function deleteBlock(id: string) {
  const { supabase } = await requireUser();
  const { error } = await supabase.from("blocks").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/blocks");
}

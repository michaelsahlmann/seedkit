import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Block, Playbook, ResolvedStep } from "@/lib/types";
import { PlaybookEditor } from "@/components/playbooks/playbook-editor";

export default async function PlaybookEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: playbook } = await supabase
    .from("playbooks")
    .select("*")
    .eq("id", id)
    .single();

  if (!playbook) notFound();

  const { data: stepRows } = await supabase
    .from("playbook_steps")
    .select("*, blocks(*)")
    .eq("playbook_id", id)
    .order("position", { ascending: true });

  type StepRow = {
    id: string;
    position: string;
    block_id: string | null;
    override_purpose: string | null;
    inline_type: Block["type"] | null;
    inline_title: string | null;
    inline_content: string | null;
    blocks: Block | null;
  };

  const steps: ResolvedStep[] = ((stepRows ?? []) as StepRow[]).map((s) => {
    const b = s.blocks;
    return {
      id: s.id,
      position: s.position,
      type: b?.type ?? s.inline_type ?? "note",
      title: b?.title ?? s.inline_title ?? "Paso",
      purpose: s.override_purpose ?? b?.purpose ?? null,
      content: b?.content ?? s.inline_content ?? "",
      metadata: b?.metadata ?? {},
      blockId: s.block_id,
    };
  });

  const { data: blockRows } = await supabase
    .from("blocks")
    .select("*")
    .order("title", { ascending: true });

  return (
    <PlaybookEditor
      playbook={playbook as Playbook}
      steps={steps}
      library={(blockRows ?? []) as Block[]}
    />
  );
}

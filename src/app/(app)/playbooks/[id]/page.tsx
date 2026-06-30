import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Block, Playbook, PlaybookLine } from "@/lib/types";
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
    inline_title: string | null;
    blocks: Block | null;
  };

  const lines: PlaybookLine[] = ((stepRows ?? []) as StepRow[]).map((s) => ({
    id: s.id,
    position: s.position,
    title: s.inline_title ?? s.blocks?.title ?? "Paso",
    block: s.blocks,
  }));

  const { data: blockRows } = await supabase
    .from("blocks")
    .select("*")
    .order("title", { ascending: true });

  return (
    <PlaybookEditor
      playbook={playbook as Playbook}
      lines={lines}
      library={(blockRows ?? []) as Block[]}
    />
  );
}

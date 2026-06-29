import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Block } from "@/lib/types";
import { BlockForm } from "@/components/blocks/block-form";
import { updateBlock, type BlockFormState } from "@/app/(app)/blocks/actions";

export default async function EditBlockPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("blocks").select("*").eq("id", id).single();

  if (!data) notFound();
  const block = data as Block;

  // Server Action vinculada al id (firma compatible con useActionState).
  async function action(prev: BlockFormState, fd: FormData) {
    "use server";
    return updateBlock(id, prev, fd);
  }

  return (
    <div className="mx-auto my-8 max-w-3xl rounded-2xl bg-background p-8 shadow-sm ring-1 ring-foreground/10">
      <h1 className="text-2xl font-semibold">Editar bloque</h1>
      <p className="mb-6 mt-1 text-sm font-semibold text-muted-foreground">{block.title}</p>
      <BlockForm action={action} block={block} />
    </div>
  );
}

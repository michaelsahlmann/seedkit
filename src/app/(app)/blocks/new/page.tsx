import { BlockForm } from "@/components/blocks/block-form";
import { createBlock } from "@/app/(app)/blocks/actions";

export default function NewBlockPage() {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-semibold">Nuevo bloque</h1>
      <p className="mb-6 mt-1 text-sm font-semibold text-muted-foreground">
        Agregá un comando, archivo, skill o nota a tu biblioteca.
      </p>
      <BlockForm action={createBlock} />
    </div>
  );
}

import Link from "next/link";
import { ListChecks } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Playbook } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createPlaybook } from "./actions";

export default async function PlaybooksPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("playbooks")
    .select("*")
    .order("updated_at", { ascending: false });
  const playbooks = (data ?? []) as Playbook[];

  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="text-2xl font-semibold">Playbooks</h1>
      <p className="mt-1 text-sm font-semibold text-muted-foreground">
        Secuencias ordenadas de pasos que después ejecutás como checklist.
      </p>

      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Nuevo playbook</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createPlaybook} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" name="title" required placeholder="Arrancar proyecto Next.js" />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="purpose">Para qué sirve</Label>
              <Input id="purpose" name="purpose" placeholder="Setup base con Claude + skills" />
            </div>
            <Button type="submit">Crear</Button>
          </form>
        </CardContent>
      </Card>

      {playbooks.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No hay playbooks todavía.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {playbooks.map((p) => (
            <Link key={p.id} href={`/playbooks/${p.id}`}>
              <Card className="transition-colors hover:border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ListChecks className="size-4 text-muted-foreground" />
                    {p.title}
                  </CardTitle>
                </CardHeader>
                {p.purpose && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{p.purpose}</p>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

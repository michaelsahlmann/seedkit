import Link from "next/link";
import { PlaySquare, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Run } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function RunsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("runs")
    .select("*")
    .order("started_at", { ascending: false });
  const runs = (data ?? []) as Run[];

  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="text-2xl font-semibold">Ejecuciones</h1>
      <p className="mt-1 text-sm font-semibold text-muted-foreground">
        Checklists vivos creados a partir de tus playbooks.
      </p>

      {runs.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Todavía no iniciaste ninguna ejecución. Abrí un{" "}
          <Link href="/playbooks" className="underline">
            playbook
          </Link>{" "}
          y tocá «Iniciar ejecución».
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {runs.map((r) => (
            <Link key={r.id} href={`/runs/${r.id}`}>
              <Card className="transition-colors hover:border-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    {r.status === "completed" ? (
                      <CheckCircle2 className="size-4 text-green-500" />
                    ) : (
                      <PlaySquare className="size-4 text-muted-foreground" />
                    )}
                    {r.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant={r.status === "completed" ? "default" : "secondary"}>
                    {r.status === "completed" ? "Completada" : "En curso"}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

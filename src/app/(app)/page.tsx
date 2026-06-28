import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Blocks, ListChecks, PlaySquare } from "lucide-react";

async function countTable(table: "blocks" | "playbooks" | "runs") {
  const supabase = await createClient();
  const { count } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

export default async function DashboardPage() {
  const [blocks, playbooks, runs] = await Promise.all([
    countTable("blocks"),
    countTable("playbooks"),
    countTable("runs"),
  ]);

  const cards = [
    { href: "/blocks", label: "Bloques", value: blocks, icon: Blocks },
    { href: "/playbooks", label: "Playbooks", value: playbooks, icon: ListChecks },
    { href: "/runs", label: "Ejecuciones", value: runs, icon: PlaySquare },
  ] as const;

  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="text-2xl font-semibold">Panel</h1>
      <p className="mt-1 text-sm font-semibold text-muted-foreground">
        Tu banco de trabajo para arrancar proyectos.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map(({ href, label, value, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card className="transition-colors hover:border-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {label}
                </CardTitle>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

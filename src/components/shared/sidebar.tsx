"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Blocks, ListChecks, LayoutDashboard, PlaySquare, Upload, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/(app)/auth-actions";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/", label: "Panel", icon: LayoutDashboard },
  { href: "/blocks", label: "Bloques", icon: Blocks },
  { href: "/playbooks", label: "Playbooks", icon: ListChecks },
  { href: "/runs", label: "Ejecuciones", icon: PlaySquare },
  { href: "/import", label: "Importar", icon: Upload },
] as const;

export function Sidebar({ email, role }: { email: string | null; role: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r bg-muted/30 p-3">
      <div className="px-2 py-3">
        <p className="font-heading text-xl">Base General</p>
        <p className="truncate text-xs text-muted-foreground">{email}</p>
        {role === "master" && (
          <span className="mt-1 inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium uppercase text-primary">
            Master
          </span>
        )}
      </div>

      <nav className="mt-2 flex flex-1 flex-col gap-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <form action={signOut}>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
          <LogOut className="size-4" />
          Salir
        </Button>
      </form>
    </aside>
  );
}

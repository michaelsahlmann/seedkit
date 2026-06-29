import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/shared/sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, email")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar email={profile?.email ?? user.email ?? null} role={profile?.role ?? "user"} />
      <main className="m-3 flex-1 overflow-auto rounded-2xl bg-background shadow-sm ring-1 ring-foreground/10">
        {children}
      </main>
    </div>
  );
}

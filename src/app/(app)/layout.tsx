import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/shared/sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  // getClaims() verifica el JWT localmente (llaves ES256): evita otro viaje al auth server.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, email")
    .eq("id", user.sub)
    .single();

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar email={profile?.email ?? user.email ?? null} role={profile?.role ?? "user"} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

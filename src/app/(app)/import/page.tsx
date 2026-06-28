import { CopyButton } from "@/components/shared/copy-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImportPage() {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-semibold">Importar</h1>
      <p className="mt-1 text-sm font-semibold text-muted-foreground">
        Poblá tu biblioteca con las skills, agentes y workflows que ya tenés en{" "}
        <code className="rounded bg-muted px-1">.agent/</code>.
      </p>

      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Seed local (recomendado)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
            <li>
              Completá <code className="rounded bg-muted px-1">.env.local</code> con{" "}
              <code className="rounded bg-muted px-1">NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
              <code className="rounded bg-muted px-1">SUPABASE_SERVICE_ROLE_KEY</code>.
            </li>
            <li>
              Creá tu usuario Master en Supabase y marcalo con{" "}
              <code className="rounded bg-muted px-1">role=&apos;master&apos;</code>.
            </li>
            <li>Corré el seed:</li>
          </ol>
          <div className="flex items-center gap-2">
            <pre className="flex-1 rounded-md bg-muted p-2 text-xs">
              <code>npm run seed</code>
            </pre>
            <CopyButton value="npm run seed" />
          </div>
          <p className="text-xs text-muted-foreground">
            Es idempotente: podés re-correrlo sin duplicar bloques. Importa ~69 bloques
            (skills, agentes y workflows).
          </p>
        </CardContent>
      </Card>

      <Card className="mt-4 border-dashed">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-muted-foreground">
            Importar por archivo (próximamente)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Subir archivos <code className="rounded bg-muted px-1">.md</code> o{" "}
            <code className="rounded bg-muted px-1">.zip</code> desde la interfaz, usando el
            mismo parser, para cargar bloques después del deploy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

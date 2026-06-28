import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import {
  generateScript,
  scriptFilename,
  type ScriptTarget,
} from "@/lib/script-generator";

const schema = z.object({
  target: z.enum(["sh", "ps1"]).default("sh"),
  baseName: z.string().optional(),
  steps: z.array(
    z.object({
      title: z.string(),
      purpose: z.string().nullable().optional(),
      type: z.enum(["command", "file", "skill", "note"]),
      content: z.string(),
      metadata: z.record(z.string(), z.unknown()).optional(),
    }),
  ),
});

/** Respaldo server-side: genera y descarga el script. El cliente usa Blob por defecto. */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const { target, baseName, steps } = parsed.data;
  const script = generateScript(steps, target as ScriptTarget);

  return new NextResponse(script, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${scriptFilename(
        target as ScriptTarget,
        baseName,
      )}"`,
    },
  });
}

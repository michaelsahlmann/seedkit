/**
 * Genera SQL de seed (INSERT ... ON CONFLICT) a partir de los `.agent/` markdown.
 * Uso: tsx supabase/seed/generate-seed-sql.ts <MASTER_USER_ID> > seed.sql
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  parseSkill,
  parseAgent,
  parseWorkflow,
  type ParsedBlock,
} from "../../src/lib/agent-parser";

const userId = process.argv[2];
if (!userId) {
  console.error("Falta MASTER_USER_ID como argumento");
  process.exit(1);
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const A = join(ROOT, ".agent");

function collect(): ParsedBlock[] {
  const out: ParsedBlock[] = [];
  const sk = join(A, "skills");
  if (existsSync(sk))
    for (const d of readdirSync(sk)) {
      const f = join(sk, d, "SKILL.md");
      if (existsSync(f)) out.push(parseSkill(readFileSync(f, "utf8"), d));
    }
  const ag = join(A, "agents");
  if (existsSync(ag))
    for (const f of readdirSync(ag))
      if (f.endsWith(".md")) out.push(parseAgent(readFileSync(join(ag, f), "utf8"), f));
  const wf = join(A, "workflows");
  if (existsSync(wf))
    for (const f of readdirSync(wf))
      if (f.endsWith(".md")) out.push(parseWorkflow(readFileSync(join(wf, f), "utf8"), f));
  return out;
}

const sq = (s: string) => `'${s.replace(/'/g, "''")}'`;
const sqn = (s: string | null) => (s == null ? "NULL" : sq(s));
const jsonb = (o: unknown) => `${sq(JSON.stringify(o))}::jsonb`;
const arr = (a: string[]) => `ARRAY[${a.map(sq).join(",")}]::text[]`;

const rows = collect().map((b) => {
  // limpiar metadata de undefined
  const meta = Object.fromEntries(
    Object.entries(b.metadata).filter(([, v]) => v !== undefined),
  );
  return `(${sq(userId)}, ${sq(b.type)}, ${sq(b.title)}, ${sqn(b.purpose)}, ${sq(
    b.content,
  )}, ${arr(b.tags)}, ${jsonb(meta)}, ${sq(b.source)})`;
});

const sql = `-- Seed generado desde .agent/ (${rows.length} bloques)
insert into public.blocks (user_id, type, title, purpose, content, tags, metadata, source)
values
${rows.join(",\n")}
on conflict (user_id, source, title) where source <> 'manual'
do update set
  type = excluded.type,
  purpose = excluded.purpose,
  content = excluded.content,
  tags = excluded.tags,
  metadata = excluded.metadata;
`;

process.stdout.write(sql);

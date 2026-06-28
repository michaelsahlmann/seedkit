/**
 * Seed local: importa los markdown de `.agent/` a la tabla `blocks` del usuario Master.
 *
 * Uso:
 *   1. Completar .env.local con NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY.
 *   2. Crear el usuario Master y marcarlo (role='master') en Supabase.
 *   3. npm run seed
 *
 * Es idempotente: usa upsert sobre (user_id, source, title), así que se puede re-correr.
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import {
  parseSkill,
  parseAgent,
  parseWorkflow,
  type ParsedBlock,
} from "../../src/lib/agent-parser";

config({ path: ".env.local" });

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const AGENT_DIR = join(ROOT, ".agent");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

function collect(): ParsedBlock[] {
  const blocks: ParsedBlock[] = [];

  // Skills: .agent/skills/<dir>/SKILL.md
  const skillsDir = join(AGENT_DIR, "skills");
  if (existsSync(skillsDir)) {
    for (const dir of readdirSync(skillsDir)) {
      const skillFile = join(skillsDir, dir, "SKILL.md");
      if (existsSync(skillFile)) {
        blocks.push(parseSkill(readFileSync(skillFile, "utf8"), dir));
      }
    }
  }

  // Agents: .agent/agents/*.md
  const agentsDir = join(AGENT_DIR, "agents");
  if (existsSync(agentsDir)) {
    for (const file of readdirSync(agentsDir)) {
      if (file.endsWith(".md")) {
        blocks.push(parseAgent(readFileSync(join(agentsDir, file), "utf8"), file));
      }
    }
  }

  // Workflows: .agent/workflows/*.md
  const wfDir = join(AGENT_DIR, "workflows");
  if (existsSync(wfDir) && statSync(wfDir).isDirectory()) {
    for (const file of readdirSync(wfDir)) {
      if (file.endsWith(".md")) {
        blocks.push(parseWorkflow(readFileSync(join(wfDir, file), "utf8"), file));
      }
    }
  }

  return blocks;
}

async function main() {
  // Usuario Master destino (MASTER_USER_ID o el primer profile role='master').
  let userId = process.env.MASTER_USER_ID;
  if (!userId) {
    const { data } = await supabase
      .from("profiles")
      .select("id")
      .eq("role", "master")
      .limit(1)
      .single();
    userId = data?.id;
  }
  if (!userId) {
    console.error(
      "No se encontró un usuario Master. Creá uno y marcá role='master', o seteá MASTER_USER_ID.",
    );
    process.exit(1);
  }

  const parsed = collect();
  console.log(`Encontrados ${parsed.length} bloques en .agent/`);

  const rows = parsed.map((b) => ({ ...b, user_id: userId }));

  const { error, count } = await supabase
    .from("blocks")
    .upsert(rows, { onConflict: "user_id,source,title", count: "exact" });

  if (error) {
    console.error("Error al importar:", error.message);
    process.exit(1);
  }

  console.log(`✓ Importados/actualizados ${count ?? rows.length} bloques.`);
}

main();

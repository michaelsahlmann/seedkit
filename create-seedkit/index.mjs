#!/usr/bin/env node
// create-seedkit — andamia un proyecto Seedkit desde la plantilla en GitHub.
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { resolve, basename } from "node:path";
import { spawn } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { stdin, stdout, exit } from "node:process";
import { downloadTemplate } from "giget";

const REPO = "github:michaelsahlmann/seedkit";

// --- args -----------------------------------------------------------------
const argv = process.argv.slice(2);
let ref = "main";
const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === "--ref") ref = argv[++i];
  else positional.push(argv[i]);
}

const rl = createInterface({ input: stdin, output: stdout });
const ask = async (q, fallback = "") => {
  const a = (await rl.question(q)).trim();
  return a || fallback;
};

function die(msg) {
  console.error(`\n✖ ${msg}`);
  rl.close();
  exit(1);
}

// --- 1. directorio destino ------------------------------------------------
let dirArg = positional[0];
if (!dirArg) dirArg = await ask("¿Nombre del proyecto? (ej: mi-seedkit) ", "mi-seedkit");
const target = resolve(process.cwd(), dirArg);
if (existsSync(target) && readdirSync(target).length > 0) {
  die(`El directorio "${dirArg}" ya existe y no está vacío.`);
}

// --- 2. descargar plantilla ----------------------------------------------
console.log(`\n⇣ Descargando plantilla Seedkit (${REPO}#${ref})...`);
try {
  await downloadTemplate(`${REPO}#${ref}`, { dir: target, forceClean: false });
} catch (err) {
  die(`No se pudo descargar la plantilla: ${err.message}`);
}
console.log("✔ Plantilla copiada.");

// --- 3. datos de Supabase -------------------------------------------------
console.log("\nConfiguración de Supabase (Enter para dejar el placeholder):");
const url = await ask("  NEXT_PUBLIC_SUPABASE_URL: ", "https://TU-PROYECTO.supabase.co");
const anon = await ask("  NEXT_PUBLIC_SUPABASE_ANON_KEY: ", "tu-anon-key");
const service = await ask("  SUPABASE_SERVICE_ROLE_KEY (opcional, para el seed): ", "tu-service-role-key");

// --- 4. escribir .env.local ----------------------------------------------
const envContent = `# Supabase — generado por create-seedkit
NEXT_PUBLIC_SUPABASE_URL=${url}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${anon}

# Solo para el seed local (NO exponer en el cliente / NO subir a git)
SUPABASE_SERVICE_ROLE_KEY=${service}
`;
writeFileSync(resolve(target, ".env.local"), envContent);
console.log("✔ .env.local escrito.");

// --- 5. instalar deps (opcional) -----------------------------------------
const pm = detectPackageManager();
const doInstall = (await ask(`\n¿Instalar dependencias con ${pm} ahora? (Y/n) `, "y")).toLowerCase();
rl.close();

if (doInstall !== "n") {
  console.log(`\n⇣ Instalando dependencias (${pm} install)...`);
  const ok = await run(pm, ["install"], target);
  if (!ok) console.error("⚠ La instalación falló; podés correrla a mano más tarde.");
  else console.log("✔ Dependencias instaladas.");
}

// --- 6. próximos pasos ----------------------------------------------------
const name = basename(target);
console.log(`
────────────────────────────────────────────────────────
✔ Proyecto Seedkit creado en ./${name}

Pasos que requieren tu intervención (Supabase no se automatiza):

  1. Creá un proyecto en https://supabase.com
  2. Aplicá la migración supabase/migrations/0001_init.sql
     (SQL Editor del dashboard, o "supabase db push" con la CLI)
  3. Creá tu usuario Master (Authentication → Users → Add user) y marcalo:
       update public.profiles set role = 'master' where email = 'tu-email';
  4. Si dejaste placeholders, editá ${name}/.env.local con tus claves reales.

Después:

  cd ${name}
  ${pm} run seed   # opcional: importa los bloques de .agent/
  ${pm} run dev    # http://localhost:3000
────────────────────────────────────────────────────────
`);

// --- helpers --------------------------------------------------------------
function detectPackageManager() {
  const ua = process.env.npm_config_user_agent || "";
  if (ua.startsWith("pnpm")) return "pnpm";
  if (ua.startsWith("yarn")) return "yarn";
  return "npm";
}

function run(cmd, args, cwd) {
  return new Promise((res) => {
    const child = spawn(cmd, args, { cwd, stdio: "inherit", shell: process.platform === "win32" });
    child.on("close", (code) => res(code === 0));
    child.on("error", () => res(false));
  });
}

# create-seedkit

Andamia un proyecto [Seedkit](https://github.com/michaelsahlmann/seedkit) con un solo comando.

```bash
npx create-seedkit mi-app
```

Qué hace:

1. Descarga la plantilla (el repo `seedkit`) en `mi-app/`.
2. Te pide los datos de Supabase y escribe `mi-app/.env.local`.
3. Opcionalmente instala las dependencias.
4. Imprime los pasos manuales de Supabase (crear proyecto, aplicar migración,
   crear usuario Master).

## Opciones

- Pineá una versión de la plantilla con `--ref`:

  ```bash
  npx create-seedkit mi-app --ref v0.3.1
  ```

- Si omitís el nombre del proyecto, se te pregunta interactivamente.

## Requisitos

- Node.js >= 18
- Un proyecto Supabase propio (la app necesita su backend; no se levanta solo).

Después del scaffold:

```bash
cd mi-app
npm run seed   # opcional: importa los bloques de .agent/
npm run dev    # http://localhost:3000
```

---
name: nuxt-app
description: Plantilla Nuxt 4 full-stack. Vue 3 (Vapor), Pinia, Tailwind v4, Prisma.
---

# Plantilla Nuxt 4 Full-Stack (Edición 2026)

Plantilla template Full-Stack moderna para Nuxt 4, optimizada de rendimiento con Vue Vapor Mode y Tailwind v4.

## Stack Tech

| Componente | Tecnología | Versión / Notas |
|-----------|------------|-----------------|
| Framework | Nuxt | v4.0+ (Estructura App Directory) |
| UI Engine | Vue | v3.6+ (Vapor Mode habilitado) |
| Lenguaje | TypeScript | v5+ (Strict Mode) |
| Estado | Pinia | v3+ (Sintaxis Store) |
| Base de Datos | PostgreSQL | Prisma ORM |
| Estilos | Tailwind CSS | v4.0 (Vite Plugin, Zero-config) |
| UI Lib | Nuxt UI | v3 (Tailwind v4 nativo) |
| Validación | Zod | Schema validation |

---

## Estructura de Directorios (Estándar Nuxt 4)

Usando estructura `app/` para mantener el directorio raíz ordenado.

```
nombre-proyecto/
├── app/                  # Fuente de la Aplicación
│   ├── assets/
│   │   └── css/
│   │       └── main.css  # Imports Tailwind v4
│   ├── components/       # Componentes auto-importados
│   ├── composables/      # Lógica auto-importada
│   ├── layouts/
│   ├── pages/            # Routing basado en archivos
│   ├── app.vue           # Componente root
│   └── router.options.ts
├── server/               # Motor Nitro Server
│   ├── api/              # API Routes (ej. /api/users)
│   ├── routes/           # Server Routes
│   └── utils/            # Helpers solo-servidor (Prisma)
├── prisma/
│   └── schema.prisma
├── public/
├── nuxt.config.ts        # Config Principal
└── package.json
```

---

## Conceptos Clave (2026)

| Concepto | Descripción | Actualización Futura |
|---------|-------------|---------------|
| **App Directory** | `app/` | Separa el código fuente de la aplicación y archivos de configuración root. |
| **Vapor Mode** | Opt-in performance | Render sin necesidad de Virtual DOM (como SolidJS). Habilitar en `nuxt.config`. |
| **Server Functions** | RPC-style calls | Llamar función server directamente desde client (reemplaza gradualmente API routes manuales). |
| **Tailwind v4** | CSS-first | Configurar theme directamente en CSS, no necesita `tailwind.config.js`. |
| **Nuxt Islands** | Server Components | Render componente aislado en server (`<NuxtIsland name="..." />`). |

---

## Variables de Entorno

| Variable | Propósito |
|----------|---------|
| DATABASE_URL | String de conexión Prisma (PostgreSQL) |
| NUXT_PUBLIC_APP_URL | URL Canónica |
| NUXT_SESSION_PASSWORD | Key de encriptación de sesión |

---

## Pasos de Setup

1. Inicializar Proyecto:
   ```bash
   npx nuxi@latest init my-app
   # Seleccionar "Nuxt 4 structure" si se pregunta
   ```

2. Instalar Deps Core:
   ```bash
   npm install @pinia/nuxt @prisma/client zod
   npm install -D prisma
   ```

3. Setup Tailwind v4:
   Instalar el plugin Vite (nuevo estándar):
   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```

   Agregar a `nuxt.config.ts`:
   ```ts
   import tailwindcss from '@tailwindcss/vite'
   export default defineNuxtConfig({
     vite: {
       plugins: [tailwindcss()]
     },
     css: ['~/assets/css/main.css']
   })
   ```

4. Configurar CSS:
   En `app/assets/css/main.css`:
   ```css
   @import "tailwindcss";
   @theme {
     --color-primary: oklch(0.6 0.15 150);
   }
   ```

5. Ejecutar Desarrollo:
   ```bash
   npm run dev
   # Ejecuta con Turbo/Vite
   ```

---

## Mejores Prácticas

- **Vapor Mode**: Habilitar para componentes pesados en render:
  ```ts
  <script setup lang="ts" vapor>
  // Este componente compilará a modo Vapor (No VDOM)
  </script>
  ```
- **Data Fetching**: Usar `useFetch` con `server: false` para tareas client-only, o usar Server Functions para mejor type-safety.
- **Estado**: Usar `defineStore` (Pinia) para estado global, `useState` de Nuxt para estado simple compartido entre Server/Client.
- **Type Safety**: Generación automática de types para API routes (`$fetch` tipado automáticamente).
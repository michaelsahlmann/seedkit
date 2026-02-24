---
name: nextjs-fullstack
description: Principios de plantilla Next.js full-stack. App Router, Prisma, Tailwind v4.
---

# Plantilla Next.js Full-Stack (Edición 2026)

## Stack Tech

| Componente | Tecnología | Versión / Notas |
|-----------|------------|-----------------|
| Framework | Next.js | v16+ (App Router, Turbopack) |
| Lenguaje | TypeScript | v5+ (Strict Mode) |
| Base de Datos | PostgreSQL | Prisma ORM (Serverless friendly) |
| Estilos | Tailwind CSS | v4.0 (Zero-config, CSS-first) |
| Auth | Clerk / Better Auth | Rutas Protegidas por Middleware |
| UI Logic | React 19 | Server Actions, useActionState |
| Validación | Zod | Schema validation (API & Forms) |

---

## Estructura de Directorios

```
nombre-proyecto/
├── prisma/
│   └── schema.prisma       # Schema de base de datos
├── src/
│   ├── app/
│   │   ├── (auth)/         # Route groups para Login/Register
│   │   ├── (dashboard)/    # Rutas protegidas
│   │   ├── api/            # Route Handlers (solo para Webhooks/Integración externa)
│   │   ├── layout.tsx      # Root Layout (Metadata, Providers)
│   │   ├── page.tsx        # Landing Page
│   │   └── globals.css     # Config Tailwind v4 (@theme) vive aquí
│   ├── components/
│   │   ├── ui/             # UI Reutilizable (Button, Input)
│   │   └── forms/          # Formularios client usando useActionState
│   ├── lib/
│   │   ├── db.ts           # Cliente singleton Prisma
│   │   ├── utils.ts        # Funciones helper
│   │   └── dal.ts          # Data Access Layer (Solo-Servidor)
│   ├── actions/            # Server Actions (Mutations)
│   └── types/              # Tipos TS Globales
├── public/
├── next.config.ts          # TypeScript Config
└── package.json
```

---

## Conceptos Clave (Actualizado)

| Concepto | Descripción |
|---------|-------------|
| Server Components | Render en servidor (default). Acceso directo a DB (Prisma) sin APIs. |
| Server Actions | Manejar mutations de Form. Reemplaza API Routes tradicionales. Usar en action={}. |
| React 19 Hooks | Manejo de estado de form: useActionState, useFormStatus, useOptimistic. |
| Data Access Layer | Seguridad de datos. Separación de lógica DB (DTOs) para reuso seguro. |
| Tailwind v4 | Motor de estilos. No tailwind.config.js. Config directamente en CSS. |

---

## Variables de Entorno

| Variable | Propósito |
|----------|---------|
| DATABASE_URL | String de conexión PostgreSQL (Prisma) |
| NEXT_PUBLIC_APP_URL | URL pública de la aplicación |
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Auth (si usa Clerk) |
| CLERK_SECRET_KEY | Auth Secret (Solo Servidor) |

---

## Pasos de Setup

1. Inicializar Proyecto:
   ```bash
   npx create-next-app@latest my-app --typescript --tailwind --eslint
   # Seleccionar Sí para App Router
   # Seleccionar No para directorio src (opcional, esta plantilla usa src)
   ```

2. Instalar DB y Validación:
   ```bash
   npm install prisma @prisma/client zod
   npm install -D ts-node # Para ejecutar scripts seed
   ```

3. Configurar Tailwind v4 (Si falta):
   Asegurar que `src/app/globals.css` use la nueva sintaxis de import en vez de config file:
   ```css
   @import "tailwindcss";

   @theme {
     --color-primary: oklch(0.5 0.2 240);
     --font-sans: "Inter", sans-serif;
   }
   ```

4. Inicializar Base de Datos:
   ```bash
   npx prisma init
   # Actualizar schema.prisma
   npm run db:push
   ```

5. Ejecutar Servidor de Desarrollo:
   ```bash
   npm run dev --turbo
   # --turbo para habilitar Turbopack más rápido
   ```

---

## Mejores Prácticas (Estándares 2026)

- **Fetch Data**: Llamar Prisma directamente en Server Components (async/await). No usar useEffect para data fetching inicial.
- **Mutations**: Usar Server Actions combinados con `useActionState` de React 19 para manejar estados de loading y error en vez de useState manual.
- **Type Safety**: Compartir schemas Zod entre Server Actions (validación input) y Client Forms.
- **Seguridad**: Siempre validar input data con Zod antes de pasarlo a Prisma.
- **Estilos**: Usar variables CSS nativas en Tailwind v4 para theming dinámico más fácil.
# Scaffolding de Proyecto

> Estructura de directorios y archivos core para nuevos proyectos.

---

## Estructura Next.js Full-Stack (Optimizada 2025)

```
nombre-proyecto/
├── src/
│   ├── app/                        # Solo rutas (capa delgada)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── (auth)/                 # Route group - páginas auth
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/            # Route group - layout dashboard
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── api/
│   │       └── [recurso]/route.ts
│   │
│   ├── features/                   # Módulos basados en features
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── actions.ts          # Server Actions
│   │   │   ├── queries.ts          # Data fetching
│   │   │   └── types.ts
│   │   ├── products/
│   │   │   ├── components/
│   │   │   ├── actions.ts
│   │   │   └── queries.ts
│   │   └── cart/
│   │       └── ...
│   │
│   ├── shared/                     # Utilidades compartidas
│   │   ├── components/ui/          # Componentes UI reutilizables
│   │   ├── lib/                    # Utils, helpers
│   │   └── hooks/                  # Hooks globales
│   │
│   └── server/                     # Código solo-servidor
│       ├── db/                     # Cliente de base de datos (Prisma)
│       ├── auth/                   # Config de auth
│       └── services/               # Integraciones API externas
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── public/
├── .env.example
├── .env.local
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Principios de Estructura

| Principio | Implementación |
|-----------|----------------|
| **Aislamiento de features** | Cada feature en `features/` con sus propios componentes, hooks, actions |
| **Separación Server/Client** | Código solo-servidor en `server/`, previene imports client accidentales |
| **Rutas delgadas** | `app/` solo para routing, lógica vive en `features/` |
| **Route groups** | `(groupName)/` para compartir layout sin impacto en URL |
| **Código compartido** | `shared/` para UI y utilidades realmente reutilizables |

---

## Archivos Core

| Archivo | Propósito |
|------|---------|
| `package.json` | Dependencias |
| `tsconfig.json` | TypeScript + path aliases (`@/features/*`) |
| `tailwind.config.ts` | Config de Tailwind |
| `.env.example` | Template de entorno |
| `README.md` | Documentación del proyecto |
| `.gitignore` | Reglas de git ignore |
| `prisma/schema.prisma` | Schema de base de datos |

---

## Path Aliases (tsconfig.json)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/server/*": ["./src/server/*"]
    }
  }
}
```

---

## Cuándo Usar Qué

| Necesidad | Ubicación |
|------|----------|
| Nueva página/ruta | `app/(grupo)/page.tsx` |
| Componente de feature | `features/[nombre]/components/` |
| Server action | `features/[nombre]/actions.ts` |
| Data fetching | `features/[nombre]/queries.ts` |
| Botón/input reutilizable | `shared/components/ui/` |
| Query de base de datos | `server/db/` |
| Llamada a API externa | `server/services/` |
---
name: monorepo-turborepo
description: Principios de plantilla de monorepo Turborepo. pnpm workspaces, paquetes compartidos.
---

# Plantilla Turborepo Monorepo

## Stack Tech

| Componente | Tecnología |
|-----------|------------|
| Build System | Turborepo |
| Package Manager | pnpm |
| Apps | Next.js, Express |
| Packages | Shared UI, Config, Types |
| Lenguaje | TypeScript |

---

## Estructura de Directorios

```
nombre-proyecto/
├── apps/
│   ├── web/             # App Next.js
│   ├── api/             # Express API
│   └── docs/            # Documentación
├── packages/
│   ├── ui/              # Componentes compartidos
│   ├── config/          # ESLint, TS, Tailwind
│   ├── types/           # Tipos compartidos
│   └── utils/           # Utilidades compartidas
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Conceptos Clave

| Concepto | Descripción |
|---------|-------------|
| Workspaces | pnpm-workspace.yaml |
| Pipeline | Grafo de tareas turbo.json |
| Caching | Caché de tareas remote/local |
| Dependencies | Protocolo `workspace:*` |

---

## Pipeline Turbo

| Tarea | Depende De |
|------|------------|
| build | ^build (dependencias primero) |
| dev | cache: false, persistent |
| lint | ^build |
| test | ^build |

---

## Pasos de Setup

1. Crear directorio raíz
2. `pnpm init`
3. Crear pnpm-workspace.yaml
4. Crear turbo.json
5. Agregar apps y packages
6. `pnpm install`
7. `pnpm dev`

---

## Comandos Comunes

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Ejecutar todas las apps |
| `pnpm build` | Build de todo |
| `pnpm --filter @name/web dev` | Ejecutar app específica |
| `pnpm --filter @name/web add axios` | Agregar dep a app |

---

## Mejores Prácticas

- Configs compartidos en packages/config
- Tipos compartidos en packages/types
- Paquetes internos con `workspace:*`
- Usar Turbo remote caching para CI
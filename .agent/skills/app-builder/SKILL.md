---
name: app-builder
description: Orquestador principal de construcción de aplicaciones. Crea aplicaciones full-stack desde solicitudes en lenguaje natural. Determina tipo de proyecto, selecciona stack tech, coordina agentes.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Agent
---

# App Builder - Orquestador de Construcción de Aplicaciones

> Analiza las solicitudes del usuario, determina stack tech, planifica estructura y coordina agentes.

## 🎯 Regla de Lectura Selectiva

**¡Lee SOLO archivos relevantes para la solicitud!** Revisa el mapa de contenido, encuentra lo que necesitas.

| Archivo | Descripción | Cuándo Leer |
|------|-------------|--------------|
| `project-detection.md` | Matriz de keywords, detección de tipo de proyecto | Iniciando nuevo proyecto |
| `tech-stack.md` | Stack default 2026, alternativas | Eligiendo tecnologías |
| `agent-coordination.md` | Pipeline de agentes, orden de ejecución | Coordinando trabajo multi-agente |
| `scaffolding.md` | Estructura de directorios, archivos core | Creando estructura de proyecto |
| `feature-building.md` | Análisis de features, manejo de errores | Agregando features a proyecto existente |
| `templates/SKILL.md` | **Plantillas de proyecto** | Scaffolding de nuevo proyecto |

---

## 📦 Plantillas (13)

Scaffolding de inicio rápido para nuevos proyectos. **¡Lee solo la plantilla que coincide!**

| Plantilla | Stack Tech | Cuándo Usar |
|----------|------------|-------------|
| [nextjs-fullstack](templates/nextjs-fullstack/TEMPLATE.md) | Next.js + Prisma | App web full-stack |
| [nextjs-saas](templates/nextjs-saas/TEMPLATE.md) | Next.js + Stripe | Producto SaaS |
| [nextjs-static](templates/nextjs-static/TEMPLATE.md) | Next.js + Framer | Landing page |
| [nuxt-app](templates/nuxt-app/TEMPLATE.md) | Nuxt 3 + Pinia | App Vue full-stack |
| [express-api](templates/express-api/TEMPLATE.md) | Express + JWT | REST API |
| [python-fastapi](templates/python-fastapi/TEMPLATE.md) | FastAPI | API Python |
| [react-native-app](templates/react-native-app/TEMPLATE.md) | Expo + Zustand | App móvil |
| [flutter-app](templates/flutter-app/TEMPLATE.md) | Flutter + Riverpod | Móvil cross-platform |
| [electron-desktop](templates/electron-desktop/TEMPLATE.md) | Electron + React | App desktop |
| [chrome-extension](templates/chrome-extension/TEMPLATE.md) | Chrome MV3 | Extensión de navegador |
| [cli-tool](templates/cli-tool/TEMPLATE.md) | Node.js + Commander | App CLI |
| [monorepo-turborepo](templates/monorepo-turborepo/TEMPLATE.md) | Turborepo + pnpm | Monorepo |

---

## 🔗 Agentes Relacionados

| Agente | Rol |
|-------|------|
| `project-planner` | Desglose de tareas, grafo de dependencias |
| `frontend-specialist` | Componentes UI, páginas |
| `backend-specialist` | API, lógica de negocio |
| `database-architect` | Schema, migraciones |
| `devops-engineer` | Despliegue, preview |

---

## Ejemplo de Uso

```
Usuario: "Hacer un clon de Instagram con compartir fotos y likes"

Proceso de App Builder:
1. Tipo de proyecto: Social Media App
2. Stack tech: Next.js + Prisma + Cloudinary + Clerk
3. Crear plan:
   ├─ Schema de base de datos (users, posts, likes, follows)
   ├─ Rutas API (12 endpoints)
   ├─ Páginas (feed, profile, upload)
   └─ Componentes (PostCard, Feed, LikeButton)
4. Coordinar agentes
5. Reportar progreso
6. Iniciar preview
```
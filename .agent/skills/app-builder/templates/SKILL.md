---
name: templates
description: Plantillas de scaffolding de proyecto para nuevas aplicaciones. Usar cuando se crean nuevos proyectos desde cero. Contiene 12 plantillas para varios stacks tech.
allowed-tools: Read, Glob, Grep
---

# Plantillas de Proyecto

> Plantillas de inicio rápido para scaffolding de nuevos proyectos.

---

## 🎯 Regla de Lectura Selectiva

**¡Lee SOLO la plantilla que coincide con el tipo de proyecto del usuario!**

| Plantilla | Stack Tech | Cuándo Usar |
|----------|------------|-------------|
| [nextjs-fullstack](nextjs-fullstack/TEMPLATE.md) | Next.js + Prisma | App web full-stack |
| [nextjs-saas](nextjs-saas/TEMPLATE.md) | Next.js + Stripe | Producto SaaS |
| [nextjs-static](nextjs-static/TEMPLATE.md) | Next.js + Framer | Landing page |
| [express-api](express-api/TEMPLATE.md) | Express + JWT | REST API |
| [python-fastapi](python-fastapi/TEMPLATE.md) | FastAPI | API Python |
| [react-native-app](react-native-app/TEMPLATE.md) | Expo + Zustand | App móvil |
| [flutter-app](flutter-app/TEMPLATE.md) | Flutter + Riverpod | Cross-platform |
| [electron-desktop](electron-desktop/TEMPLATE.md) | Electron + React | App desktop |
| [chrome-extension](chrome-extension/TEMPLATE.md) | Chrome MV3 | Extensión de navegador |
| [cli-tool](cli-tool/TEMPLATE.md) | Node.js + Commander | App CLI |
| [monorepo-turborepo](monorepo-turborepo/TEMPLATE.md) | Turborepo + pnpm | Monorepo |
| [astro-static](astro-static/TEMPLATE.md) | Astro + MDX | Blog / Docs |

---

## Uso

1. Usuario dice "crear app de [tipo]"
2. Emparejar con plantilla apropiada
3. Leer SOLO el TEMPLATE.md de esa plantilla
4. Seguir su stack tech y estructura
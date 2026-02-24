# Arquitectura de Antigravity Kit

> Kit de Expansión de Capacidades para Agentes de IA Integral

---

## 📋 Resumen

Antigravity Kit es un sistema modular que consiste en:

- **20 Agentes Especialistas** - Personas de IA basadas en roles
- **36 Habilidades** - Módulos de conocimiento específicos por dominio
- **11 Flujos de Trabajo** - Procedimientos de comandos slash

---

## 🏗️ Estructura de Directorios

```plaintext
.agent/
├── ARCHITECTURE.md          # Este archivo
├── agents/                  # 20 Agentes Especialistas
├── skills/                  # 36 Habilidades
├── workflows/               # 11 Comandos Slash
├── rules/                   # Reglas Globales
└── scripts/                 # Scripts de Validación Maestros
```

---

## 🤖 Agentes (20)

Personas de IA especialistas para diferentes dominios.

| Agente                      | Enfoque                          | Habilidades Usadas                                          |
| --------------------------- | -------------------------------- | ----------------------------------------------------------- |
| `orchestrator`              | Coordinación multi-agente        | parallel-agents, behavioral-modes                           |
| `project-planner`           | Descubrimiento, planificación    | brainstorming, plan-writing, architecture                   |
| `frontend-specialist`       | Web UI/UX                        | frontend-design, react-best-practices, tailwind-patterns    |
| `backend-specialist`        | API, lógica de negocio           | api-patterns, nodejs-best-practices, database-design        |
| `database-architect`        | Esquema, SQL                     | database-design, prisma-expert                              |
| `mobile-developer`          | iOS, Android, RN                 | mobile-design                                               |
| `game-developer`            | Lógica de juegos, mecánicas      | game-development                                            |
| `devops-engineer`           | CI/CD, Docker                    | deployment-procedures, docker-expert                        |
| `security-auditor`          | Cumplimiento de seguridad        | vulnerability-scanner, red-team-tactics                     |
| `penetration-tester`        | Seguridad ofensiva               | red-team-tactics                                            |
| `test-engineer`             | Estrategias de pruebas           | testing-patterns, tdd-workflow, webapp-testing              |
| `debugger`                  | Análisis de causa raíz           | systematic-debugging                                        |
| `performance-optimizer`     | Velocidad, Web Vitals            | performance-profiling                                       |
| `seo-specialist`            | Ranking, visibilidad             | seo-fundamentals, geo-fundamentals                          |
| `documentation-writer`      | Manuales, documentación          | documentation-templates                                     |
| `product-manager`           | Requisitos, historias de usuario | plan-writing, brainstorming                                 |
| `product-owner`             | Estrategia, backlog, MVP         | plan-writing, brainstorming                                 |
| `qa-automation-engineer`    | Pruebas E2E, pipelines CI        | webapp-testing, testing-patterns                            |
| `code-archaeologist`        | Código legado, refactorización   | clean-code, code-review-checklist                           |
| `explorer-agent`            | Análisis de base de código       | -                                                           |

---

## 🧩 Habilidades (36)

Dominios de conocimiento modulares que los agentes pueden cargar bajo demanda según el contexto de la tarea.

### Frontend y UI

| Habilidad                 | Descripción                                                              |
| ------------------------- | ------------------------------------------------------------------------ |
| `react-best-practices`    | Optimización de rendimiento en React y Next.js (Vercel - 57 reglas)      |
| `web-design-guidelines`   | Auditoría Web UI - más de 100 reglas de accesibilidad, UX, rendimiento   |
| `tailwind-patterns`       | Utilidades de Tailwind CSS v4                                            |
| `frontend-design`         | Patrones UI/UX, sistemas de diseño                                       |
| `ui-ux-pro-max`           | 50 estilos, 21 paletas, 50 fuentes                                       |

### Backend y API

| Habilidad                  | Descripción                       |
| -------------------------- | --------------------------------- |
| `api-patterns`             | REST, GraphQL, tRPC               |
| `nestjs-expert`            | Módulos NestJS, DI, decoradores   |
| `nodejs-best-practices`    | Node.js async, módulos            |
| `python-patterns`          | Estándares Python, FastAPI        |

### Base de Datos

| Habilidad             | Descripción                       |
| --------------------- | --------------------------------- |
| `database-design`     | Diseño de esquemas, optimización  |
| `prisma-expert`       | Prisma ORM, migraciones           |

### TypeScript/JavaScript

| Habilidad                | Descripción                               |
| ------------------------ | ----------------------------------------- |
| `typescript-expert`      | Programación a nivel de tipos, rendimiento|

### Nube e Infraestructura

| Habilidad                   | Descripción                 |
| --------------------------- | --------------------------- |
| `docker-expert`             | Contenedorización, Compose  |
| `deployment-procedures`     | CI/CD, flujos de despliegue |
| `server-management`         | Gestión de infraestructura  |

### Pruebas y Calidad

| Habilidad                    | Descripción                    |
| ---------------------------- | ------------------------------ |
| `testing-patterns`           | Jest, Vitest, estrategias      |
| `webapp-testing`             | E2E, Playwright                |
| `tdd-workflow`               | Desarrollo guiado por pruebas  |
| `code-review-checklist`      | Estándares de revisión de código |
| `lint-and-validate`          | Linting, validación            |

### Seguridad

| Habilidad                    | Descripción                  |
| ---------------------------- | ---------------------------- |
| `vulnerability-scanner`      | Auditoría de seguridad, OWASP|
| `red-team-tactics`           | Seguridad ofensiva           |

### Arquitectura y Planificación

| Habilidad          | Descripción                     |
| ------------------ | ------------------------------- |
| `app-builder`      | Scaffolding de apps full-stack  |
| `architecture`     | Patrones de diseño de sistemas  |
| `plan-writing`     | Planificación de tareas, desglose|
| `brainstorming`    | Cuestionamiento socrático       |

### Móvil

| Habilidad          | Descripción                |
| ------------------ | -------------------------- |
| `mobile-design`    | Patrones UI/UX móviles     |

### Desarrollo de Juegos

| Habilidad               | Descripción                |
| ----------------------- | -------------------------- |
| `game-development`      | Lógica de juegos, mecánicas|

### SEO y Crecimiento

| Habilidad               | Descripción                          |
| ----------------------- | ------------------------------------ |
| `seo-fundamentals`      | SEO, E-E-A-T, Core Web Vitals        |
| `geo-fundamentals`      | Optimización GenAI                   |

### Shell/CLI

| Habilidad                 | Descripción                  |
| ------------------------- | ---------------------------- |
| `bash-linux`              | Comandos Linux, scripting    |
| `powershell-windows`      | Windows PowerShell           |

### Otros

| Habilidad                    | Descripción                  |
| ---------------------------- | ---------------------------- |
| `clean-code`                 | Estándares de código (Global)|
| `behavioral-modes`           | Personas de agente           |
| `parallel-agents`            | Patrones multi-agente        |
| `mcp-builder`                | Model Context Protocol       |
| `documentation-templates`    | Formatos de documentación    |
| `i18n-localization`          | Internacionalización         |
| `performance-profiling`      | Web Vitals, optimización     |
| `systematic-debugging`       | Solución de problemas        |

---

## 🔄 Flujos de Trabajo (11)

Procedimientos de comandos slash. Invoca con `/comando`.

| Comando            | Descripción                    |
| ------------------ | ------------------------------ |
| `/brainstorm`      | Descubrimiento socrático       |
| `/create`          | Crear nuevas funcionalidades   |
| `/debug`           | Depurar problemas              |
| `/deploy`          | Desplegar aplicación           |
| `/enhance`         | Mejorar código existente       |
| `/orchestrate`     | Coordinación multi-agente      |
| `/plan`            | Desglose de tareas             |
| `/preview`         | Previsualizar cambios          |
| `/status`          | Verificar estado del proyecto  |
| `/test`            | Ejecutar pruebas               |
| `/ui-ux-pro-max`   | Diseñar con 50 estilos         |

---

## 🎯 Protocolo de Carga de Habilidades

```plaintext
Solicitud del Usuario → Coincidencia en Descripción de Habilidad → Cargar SKILL.md
                                                                    ↓
                                                            Leer referencias/
                                                                    ↓
                                                            Leer scripts/
```

### Estructura de Habilidad

```plaintext
nombre-habilidad/
├── SKILL.md           # (Requerido) Metadatos e instrucciones
├── scripts/           # (Opcional) Scripts Python/Bash
├── references/        # (Opcional) Plantillas, documentos
└── assets/            # (Opcional) Imágenes, logos
```

### Habilidades Mejoradas (con scripts/referencias)

| Habilidad             | Archivos | Cobertura                         |
| --------------------- | -------- | --------------------------------- |
| `ui-ux-pro-max`       | 27       | 50 estilos, 21 paletas, 50 fuentes|
| `app-builder`         | 20       | Scaffolding full-stack            |

---

## 📜 Scripts (2)

Scripts de validación maestros que coordinan los scripts a nivel de habilidad.

### Scripts Maestros

| Script            | Propósito                                    | Cuándo Usar                |
| ----------------- | -------------------------------------------- | -------------------------- |
| `checklist.py`    | Validación basada en prioridad (Verificaciones principales) | Desarrollo, pre-commit     |
| `verify_all.py`   | Verificación integral (Todas las verificaciones) | Pre-despliegue, releases   |

### Uso

```bash
# Validación rápida durante el desarrollo
python .agent/scripts/checklist.py .

# Verificación completa antes del despliegue
python .agent/scripts/verify_all.py . --url http://localhost:3000
```

### Lo Que Verifican

**checklist.py** (Verificaciones principales):

- Seguridad (vulnerabilidades, secretos)
- Calidad de Código (lint, tipos)
- Validación de Esquema
- Suite de Pruebas
- Auditoría UX
- Verificación SEO

**verify_all.py** (Suite completa):

- Todo lo de checklist.py MÁS:
- Lighthouse (Core Web Vitals)
- Playwright E2E
- Análisis de Bundle
- Auditoría Móvil
- Verificación i18n

Para más detalles, ver [scripts/README.md](scripts/README.md)

---

## 📊 Estadísticas

| Métrica                  | Valor                               |
| ------------------------ | ----------------------------------- |
| **Total Agentes**        | 20                                  |
| **Total Habilidades**    | 36                                  |
| **Total Flujos de Trabajo** | 11                               |
| **Total Scripts**        | 2 (maestros) + 18 (nivel-habilidad) |
| **Cobertura**            | ~90% desarrollo web/móvil           |

---

## 🔗 Referencia Rápida

| Necesidad   | Agente                  | Habilidades                             |
| ----------- | ----------------------- | --------------------------------------- |
| Web App     | `frontend-specialist`   | react-best-practices, frontend-design   |
| API         | `backend-specialist`    | api-patterns, nodejs-best-practices     |
| Móvil       | `mobile-developer`      | mobile-design                           |
| Base de Datos | `database-architect`   | database-design, prisma-expert          |
| Seguridad   | `security-auditor`      | vulnerability-scanner                   |
| Pruebas     | `test-engineer`         | testing-patterns, webapp-testing        |
| Depurar     | `debugger`              | systematic-debugging                    |
| Planificar  | `project-planner`       | brainstorming, plan-writing             |
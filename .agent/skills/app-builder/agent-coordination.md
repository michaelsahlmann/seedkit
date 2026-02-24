# Coordinación de Agentes

> Cómo App Builder orquesta agentes especializados.

## Pipeline de Agentes

```
┌─────────────────────────────────────────────────────────────┐
│                   APP BUILDER (Orquestador)                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     PROJECT PLANNER                          │
│  • Desglose de tareas                                        │
│  • Grafo de dependencias                                     │
│  • Planificación de estructura de archivos                   │
│  • Crear {task-slug}.md en raíz del proyecto (OBLIGATORIO)   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              CHECKPOINT: VERIFICACIÓN DE PLAN                │
│  🔴 VERIFICAR: ¿Existe {task-slug}.md en raíz del proyecto?  │
│  🔴 Si NO → DETENER → Crear archivo de plan primero         │
│  🔴 Si SÍ → Proceder a agentes especializados                │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ DATABASE        │ │ BACKEND         │ │ FRONTEND        │
│ ARCHITECT       │ │ SPECIALIST      │ │ SPECIALIST      │
│                 │ │                 │ │                 │
│ • Diseño schema │ │ • Rutas API     │ │ • Componentes   │
│ • Migraciones   │ │ • Controllers   │ │ • Páginas       │
│ • Datos seed    │ │ • Middleware    │ │ • Estilos       │
└─────────────────┘ └─────────────────┘ └─────────────────┘
          │                   │                   │
          └───────────────────┼───────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 FASE PARALELA (Opcional)                     │
│  • Security Auditor → Check de vulnerabilidades             │
│  • Test Engineer → Pruebas unitarias                        │
│  • Performance Optimizer → Análisis de bundle               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     DEVOPS ENGINEER                          │
│  • Configuración de entorno                                  │
│  • Despliegue de preview                                     │
│  • Health check                                              │
└─────────────────────────────────────────────────────────────┘
```

## Orden de Ejecución

| Fase | Agente(s) | Paralelo? | Prerrequisito | CHECKPOINT |
|-------|----------|-----------|--------------|------------|
| 0 | Puerta Socrática | ❌ | - | ✅ Hacer 3 preguntas |
| 1 | Project Planner | ❌ | Preguntas respondidas | ✅ **PLAN.md creado** |
| 1.5 | **VERIFICACIÓN DE PLAN** | ❌ | PLAN.md existe | ✅ **Archivo existe en raíz** |
| 2 | Database Architect | ❌ | Plan listo | Schema definido |
| 3 | Backend Specialist | ❌ | Schema listo | Rutas API creadas |
| 4 | Frontend Specialist | ✅ | API lista (parcial) | Componentes UI listos |
| 5 | Security Auditor, Test Engineer | ✅ | Código listo | Tests y audit pasan |
| 6 | DevOps Engineer | ❌ | Todo el código listo | Deployment listo |

> 🔴 **CRÍTICO:** La Fase 1.5 es OBLIGATORIA. Ningún agente especializado procede sin verificación de PLAN.md.
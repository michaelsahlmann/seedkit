---
description: Coordinar múltiples agentes para tareas complejas. Usar para análisis multi-perspectiva, revisiones comprehensivas o tareas que requieren diferente expertise de dominio.
---

# Orquestación Multi-Agente

Ahora estás en **MODO ORQUESTACIÓN**. Tu tarea: coordinar agentes especializados para resolver este problema complejo.

## Tarea a Orquestar
$ARGUMENTS

---

## 🔴 CRÍTICO: Requisito Mínimo de Agentes

> ⚠️ **ORQUESTACIÓN = MÍNIMO 3 AGENTES DIFERENTES**
> 
> Si usas menos de 3 agentes, NO estás orquestando - solo estás delegando.
> 
> **Validación antes de completar:**
> - Contar agentes invocados
> - Si `agent_count < 3` → DETENTE e invoca más agentes
> - Agente único = FALLO de orquestación

### Matriz de Selección de Agentes

| Tipo de Tarea | Agentes REQUERIDOS (mínimo) |
|-----------|---------------------------|
| **Web App** | frontend-specialist, backend-specialist, test-engineer |
| **API** | backend-specialist, security-auditor, test-engineer |
| **UI/Diseño** | frontend-specialist, seo-specialist, performance-optimizer |
| **Base de Datos** | database-architect, backend-specialist, security-auditor |
| **Full Stack** | project-planner, frontend-specialist, backend-specialist, devops-engineer |
| **Debug** | debugger, explorer-agent, test-engineer |
| **Seguridad** | security-auditor, penetration-tester, devops-engineer |

---

## Pre-Flight: Check de Modo

| Modo Actual | Tipo de Tarea | Acción |
|--------------|-----------|--------|
| **plan** | Cualquiera | ✅ Proceder con enfoque planificación-primero |
| **edit** | Ejecución simple | ✅ Proceder directamente |
| **edit** | Complejo/multi-archivo | ⚠️ Preguntar: "Esta tarea requiere planificación. ¿Cambiar a modo plan?" |
| **ask** | Cualquiera | ⚠️ Preguntar: "Listo para orquestar. ¿Cambiar a modo edit o plan?" |

---

## 🔴 ORQUESTACIÓN ESTRICTA DE 2 FASES

### FASE 1: PLANIFICACIÓN (Secuencial - SIN agentes paralelos)

| Paso | Agente | Acción |
|------|-------|--------|
| 1 | `project-planner` | Crear docs/PLAN.md |
| 2 | (opcional) `explorer-agent` | Descubrimiento de base de código si es necesario |

> 🔴 **¡SIN OTROS AGENTES durante planificación!** Solo project-planner y explorer-agent.

### ⏸️ CHECKPOINT: Aprobación del Usuario

```
Después de que PLAN.md esté completo, PREGUNTAR:

"✅ Plan creado: docs/PLAN.md

¿Aprobas? (S/N)
- S: Comenzar implementación
- N: Revisaré el plan"
```

> 🔴 **¡NO proceder a Fase 2 sin aprobación explícita del usuario!**

### FASE 2: IMPLEMENTACIÓN (Agentes paralelos después de aprobación)

| Grupo Paralelo | Agentes |
|----------------|--------|
| Foundation | `database-architect`, `security-auditor` |
| Core | `backend-specialist`, `frontend-specialist` |
| Polish | `test-engineer`, `devops-engineer` |

> ✅ Después de aprobación del usuario, invocar múltiples agentes en PARALELO.

## Agentes Disponibles (17 en total)

| Agente | Dominio | Usar Cuando |
|-------|--------|----------|
| `project-planner` | Planificación | Desglose de tareas, PLAN.md |
| `explorer-agent` | Descubrimiento | Mapeo de base de código |
| `frontend-specialist` | UI/UX | React, Vue, CSS, HTML |
| `backend-specialist` | Servidor | API, Node.js, Python |
| `database-architect` | Datos | SQL, NoSQL, Esquema |
| `security-auditor` | Seguridad | Vulnerabilidades, Auth |
| `penetration-tester` | Seguridad | Testing activo |
| `test-engineer` | Testing | Unit, E2E, Cobertura |
| `devops-engineer` | Ops | CI/CD, Docker, Deploy |
| `mobile-developer` | Móvil | React Native, Flutter |
| `performance-optimizer` | Velocidad | Lighthouse, Profiling |
| `seo-specialist` | SEO | Meta, Schema, Rankings |
| `documentation-writer` | Docs | README, docs de API |
| `debugger` | Debug | Análisis de errores |
| `game-developer` | Juegos | Unity, Godot |
| `orchestrator` | Meta | Coordinación |

---

## Protocolo de Orquestación

### Paso 1: Analizar Dominios de Tarea
Identificar TODOS los dominios que esta tarea toca:
```
□ Seguridad     → security-auditor, penetration-tester
□ Backend/API   → backend-specialist
□ Frontend/UI   → frontend-specialist
□ Base de Datos → database-architect
□ Testing       → test-engineer
□ DevOps        → devops-engineer
□ Móvil         → mobile-developer
□ Rendimiento   → performance-optimizer
□ SEO           → seo-specialist
□ Planificación → project-planner
```

### Paso 2: Detección de Fase

| Si Plan Existe | Acción |
|----------------|--------|
| NO `docs/PLAN.md` | → Ir a FASE 1 (solo planificación) |
| SÍ `docs/PLAN.md` + usuario aprobó | → Ir a FASE 2 (implementación) |

### Paso 3: Ejecutar Basado en Fase

**FASE 1 (Planificación):**
```
Usar el agente project-planner para crear PLAN.md
→ DETENERSE después de que el plan sea creado
→ PREGUNTAR al usuario por aprobación
```

**FASE 2 (Implementación - después de aprobación):**
```
Invocar agentes en PARALELO:
Usar el agente frontend-specialist para [tarea]
Usar el agente backend-specialist para [tarea]
Usar el agente test-engineer para [tarea]
```

**🔴 CRÍTICO: Pasaje de Contexto (OBLIGATORIO)**

Al invocar CUALQUIER subagente, DEBES incluir:

1. **Solicitud Original del Usuario:** Texto completo de lo que pidió el usuario
2. **Decisiones Tomadas:** Todas las respuestas del usuario a preguntas socráticas
3. **Trabajo de Agentes Previos:** Resumen de lo que hicieron agentes previos
4. **Estado Actual del Plan:** Si existen archivos de plan en workspace, incluirlos

**Ejemplo con contexto COMPLETO:**
```
Usar el agente project-planner para crear PLAN.md:

**CONTEXTO:**
- Solicitud de Usuario: "Una plataforma social para estudiantes, usando datos mock"
- Decisiones: Tech=Vue 3, Layout=Grid Widgets, Auth=Mock, Diseño=Juvenil y dinámico
- Trabajo Previo: Orchestrator hizo 6 preguntas, usuario eligió todas las opciones
- Plan Actual: playful-roaming-dream.md existe en workspace con estructura inicial

**TAREA:** Crear PLAN.md detallado basado en las decisiones ARRIBA. NO inferir del nombre de carpeta.
```

> ⚠️ **VIOLACIÓN:** ¡Invocar subagente sin contexto completo = el subagente hará suposiciones incorrectas!


### Paso 4: Verificación (OBLIGATORIO)
El ÚLTIMO agente debe ejecutar scripts de verificación apropiados:
```bash
python .agent/skills/vulnerability-scanner/scripts/security_scan.py .
python .agent/skills/lint-and-validate/scripts/lint_runner.py .
```

### Paso 5: Sintetizar Resultados
Combinar todas las salidas de agentes en reporte unificado.

---

## Formato de Salida

```markdown
## 🎼 Reporte de Orquestación

### Tarea
[Resumen de tarea original]

### Modo
[Modo actual de Antigravity Agent: plan/edit/ask]

### Agentes Invocados (MÍNIMO 3)
| # | Agente | Área de Enfoque | Estado |
|---|-------|------------|--------|
| 1 | project-planner | Desglose de tareas | ✅ |
| 2 | frontend-specialist | Implementación UI | ✅ |
| 3 | test-engineer | Scripts de verificación | ✅ |

### Scripts de Verificación Ejecutados
- [x] security_scan.py → Pass/Fail
- [x] lint_runner.py → Pass/Fail

### Hallazgos Clave
1. **[Agente 1]**: Hallazgo
2. **[Agente 2]**: Hallazgo
3. **[Agente 3]**: Hallazgo

### Entregables
- [ ] PLAN.md creado
- [ ] Código implementado
- [ ] Pruebas pasando
- [ ] Scripts verificados

### Resumen
[Párrafo de síntesis de todo el trabajo de agentes]
```

---

## 🔴 PUERTA DE SALIDA

Antes de completar orquestación, verificar:

1. ✅ **Conteo de Agentes:** `invoked_agents >= 3`
2. ✅ **Scripts Ejecutados:** Al menos `security_scan.py` se ejecutó
3. ✅ **Reporte Generado:** Reporte de Orquestación con todos los agentes listados

> **Si algún check falla → NO marcar orquestación completa. Invocar más agentes o ejecutar scripts.**

---

**Comenzar orquestación ahora. Seleccionar 3+ agentes, ejecutar secuencialmente, ejecutar scripts de verificación, sintetizar resultados.**
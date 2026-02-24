---
description: Crear plan de proyecto usando el agente project-planner. Sin escritura de código - solo generación de archivo de plan.
---

# /plan - Modo de Planificación de Proyecto

$ARGUMENTS

---

## 🔴 REGLAS CRÍTICAS

1. **SIN ESCRITURA DE CÓDIGO** - Este comando crea solo archivo de plan
2. **Usar agente project-planner** - NO el modo Plan nativo de Antigravity Agent
3. **Puerta Socrática** - Hacer preguntas clarificadoras antes de planificar
4. **Nombre Dinámico** - Archivo de plan nombrado según la tarea

---

## Tarea

Usar el agente `project-planner` con este contexto:

```
CONTEXTO:
- Solicitud de Usuario: $ARGUMENTS
- Modo: SOLO PLANIFICACIÓN (sin código)
- Salida: docs/PLAN-{task-slug}.md (nombre dinámico)

REGLAS DE NOMENCLATURA:
1. Extraer 2-3 palabras clave de la solicitud
2. Minúsculas, separadas por guión
3. Máximo 30 caracteres
4. Ejemplo: "carrito e-commerce" → PLAN-ecommerce-cart.md

REGLAS:
1. Seguir project-planner.md Fase -1 (Check de Contexto)
2. Seguir project-planner.md Fase 0 (Puerta Socrática)
3. Crear PLAN-{slug}.md con desglose de tareas
4. NO escribir ningún archivo de código
5. REPORTAR el nombre exacto del archivo creado
```

---

## Salida Esperada

| Entregable | Ubicación |
|-------------|----------|
| Plan de Proyecto | `docs/PLAN-{task-slug}.md` |
| Desglose de Tareas | Dentro del archivo de plan |
| Asignaciones de Agentes | Dentro del archivo de plan |
| Checklist de Verificación | Fase X en archivo de plan |

---

## Después de Planificar

Decir al usuario:
```
[OK] Plan creado: docs/PLAN-{slug}.md

Próximos pasos:
- Revisar el plan
- Ejecutar `/create` para comenzar implementación
- O modificar plan manualmente
```

---

## Ejemplos de Nomenclatura

| Solicitud | Archivo de Plan |
|---------|-----------|
| `/plan sitio e-commerce con carrito` | `docs/PLAN-ecommerce-cart.md` |
| `/plan app móvil para fitness` | `docs/PLAN-fitness-app.md` |
| `/plan agregar feature modo oscuro` | `docs/PLAN-dark-mode.md` |
| `/plan arreglar bug de autenticación` | `docs/PLAN-auth-fix.md` |
| `/plan dashboard SaaS` | `docs/PLAN-saas-dashboard.md` |

---

## Uso

```
/plan sitio e-commerce con carrito
/plan app móvil para tracking de fitness
/plan dashboard SaaS con analytics
```
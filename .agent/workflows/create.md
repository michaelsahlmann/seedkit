---
description: Comando para crear nueva aplicación. Activa la habilidad App Builder e inicia diálogo interactivo con el usuario.
---

# /create - Crear Aplicación

$ARGUMENTS

---

## Tarea

Este comando inicia un nuevo proceso de creación de aplicación.

### Pasos:

1. **Análisis de Solicitud**
   - Entender qué quiere el usuario
   - Si falta información, usar habilidad `conversation-manager` para preguntar

2. **Planificación de Proyecto**
   - Usar agente `project-planner` para desglose de tareas
   - Determinar stack tech
   - Planificar estructura de archivos
   - Crear archivo de plan y proceder a construir

3. **Construcción de Aplicación (Después de Aprobación)**
   - Orquestar con habilidad `app-builder`
   - Coordinar agentes expertos:
     - `database-architect` → Esquema
     - `backend-specialist` → API
     - `frontend-specialist` → UI

4. **Preview**
   - Iniciar con `auto_preview.py` cuando esté completo
   - Presentar URL al usuario

---

## Ejemplos de Uso

```
/create sitio de blog
/create app e-commerce con listado de productos y carrito
/create app de tareas
/create clon de Instagram
/create sistema crm con gestión de clientes
```

---

## Antes de Comenzar

Si la solicitud no está clara, haz estas preguntas:
- ¿Qué tipo de aplicación?
- ¿Cuáles son las features básicas?
- ¿Quién la usará?

Usa defaults, agrega detalles después.
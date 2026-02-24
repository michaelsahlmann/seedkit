---
description: Mostrar estado de agente y proyecto. Seguimiento de progreso y tablero de estado.
---

# /status - Mostrar Estado

$ARGUMENTS

---

## Tarea

Mostrar estado actual del proyecto y de los agentes.

### Qué Muestra

1. **Info del Proyecto**
   - Nombre y ruta del proyecto
   - Stack tech
   - Features actuales

2. **Tablero de Estado de Agentes**
   - Qué agentes están ejecutando
   - Qué tareas están completadas
   - Trabajo pendiente

3. **Estadísticas de Archivos**
   - Conteo de archivos creados
   - Conteo de archivos modificados

4. **Estado de Preview**
   - Si el servidor está corriendo
   - URL
   - Health check

---

## Ejemplo de Salida

```
=== Estado del Proyecto ===

📁 Proyecto: my-ecommerce
📂 Ruta: C:/projects/my-ecommerce
🏷️ Tipo: nextjs-ecommerce
📊 Estado: activo

🔧 Stack Tech:
   Framework: next.js
   Base de Datos: postgresql
   Auth: clerk
   Pago: stripe

✅ Features (5):
   • listado-productos
   • carrito
   • checkout
   • user-auth
   • historial-ordenes

⏳ Pendiente (2):
   • panel-admin
   • notificaciones-email

📄 Archivos: 73 creados, 12 modificados

=== Estado de Agentes ===

✅ database-architect → Completado
✅ backend-specialist → Completado
🔄 frontend-specialist → Componentes Dashboard (60%)
⏳ test-engineer → Esperando

=== Preview ===

🌐 URL: http://localhost:3000
💚 Salud: OK
```

---

## Técnico

Estado usa estos scripts:
- `python .agent/scripts/session_manager.py status`
- `python .agent/scripts/auto_preview.py status`
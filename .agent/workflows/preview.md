---
description: Inicio, detención y verificación de estado del servidor de preview. Gestión de servidor de desarrollo local.
---

# /preview - Gestión de Preview

$ARGUMENTS

---

## Tarea

Gestionar servidor de preview: iniciar, detener, verificar estado.

### Comandos

```
/preview           - Mostrar estado actual
/preview start     - Iniciar servidor
/preview stop      - Detener servidor
/preview restart   - Reiniciar
/preview check     - Health check
```

---

## Ejemplos de Uso

### Iniciar Servidor
```
/preview start

Respuesta:
🚀 Iniciando preview...
   Puerto: 3000
   Tipo: Next.js

✅ ¡Preview listo!
   URL: http://localhost:3000
```

### Verificar Estado
```
/preview

Respuesta:
=== Estado de Preview ===

🌐 URL: http://localhost:3000
📁 Proyecto: C:/projects/my-app
🏷️ Tipo: nextjs
💚 Salud: OK
```

### Conflicto de Puerto
```
/preview start

Respuesta:
⚠️ Puerto 3000 está en uso.

Opciones:
1. Iniciar en puerto 3001
2. Cerrar app en 3000
3. Especificar puerto diferente

¿Cuál? (default: 1)
```

---

## Técnico

Auto preview usa script `auto_preview.py`:

```bash
python .agent/scripts/auto_preview.py start [puerto]
python .agent/scripts/auto_preview.py stop
python .agent/scripts/auto_preview.py status
```
---
description: Agregar o actualizar features en aplicación existente. Usado para desarrollo iterativo.
---

# /enhance - Actualizar Aplicación

$ARGUMENTS

---

## Tarea

Este comando agrega features o hace actualizaciones a aplicación existente.

### Pasos:

1. **Entender Estado Actual**
   - Cargar estado del proyecto con `python .agent/scripts/session_manager.py info`
   - Entender features existentes, stack tech

2. **Planificar Cambios**
   - Determinar qué será agregado/cambiado
   - Detectar archivos afectados
   - Verificar dependencias

3. **Presentar Plan al Usuario** (para cambios mayores)
   ```
   "Para agregar panel de admin:
   - Crearé 15 archivos nuevos
   - Actualizaré 8 archivos
   - Toma ~10 minutos
   
   ¿Debo comenzar?"
   ```

4. **Aplicar**
   - Llamar agentes relevantes
   - Hacer cambios
   - Probar

5. **Actualizar Preview**
   - Hot reload o reiniciar

---

## Ejemplos de Uso

```
/enhance agregar modo oscuro
/enhance construir panel de admin
/enhance integrar sistema de pagos
/enhance agregar feature de búsqueda
/enhance editar página de perfil
/enhance hacer responsivo
```

---

## Precaución

- Obtener aprobación para cambios mayores
- Advertir sobre solicitudes conflictivas (ej. "usar Firebase" cuando el proyecto usa PostgreSQL)
- Commitear cada cambio con git
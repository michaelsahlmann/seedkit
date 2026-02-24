---
description: Comando de depuración. Activa el modo DEBUG para investigación sistemática de problemas.
---

# /debug - Investigación Sistemática de Problemas

$ARGUMENTS

---

## Propósito

Este comando activa el modo DEBUG para investigación sistemática de issues, errores o comportamiento inesperado.

---

## Comportamiento

Cuando `/debug` es activado:

1. **Recopilar información**
   - Mensaje de error
   - Pasos de reproducción
   - Comportamiento esperado vs actual
   - Cambios recientes

2. **Formar hipótesis**
   - Listar posibles causas
   - Ordenar por probabilidad

3. **Investigar sistemáticamente**
   - Probar cada hipótesis
   - Verificar logs, flujo de datos
   - Usar método de eliminación

4. **Arreglar y prevenir**
   - Aplicar corrección
   - Explicar causa raíz
   - Agregar medidas de prevención

---

## Formato de Salida

```markdown
## 🔍 Debug: [Issue]

### 1. Síntoma
[Qué está pasando]

### 2. Información Recopilada
- Error: `[mensaje de error]`
- Archivo: `[ruta de archivo]`
- Línea: [número de línea]

### 3. Hipótesis
1. ❓ [Causa más probable]
2. ❓ [Segunda posibilidad]
3. ❓ [Causa menos probable]

### 4. Investigación

**Probando hipótesis 1:**
[Qué verifiqué] → [Resultado]

**Probando hipótesis 2:**
[Qué verifiqué] → [Resultado]

### 5. Causa Raíz
🎯 **[Explicación de por qué pasó esto]**

### 6. Corrección
```[lenguaje]
// Antes
[código roto]

// Después
[código arreglado]
```

### 7. Prevención
🛡️ [Cómo prevenir esto en el futuro]
```

---

## Ejemplos

```
/debug login no funciona
/debug API retorna 500
/debug formulario no envía
/debug datos no se guardan
```

---

## Principios Clave

- **Preguntar antes de asumir** - obtener contexto completo del error
- **Probar hipótesis** - no adivinar aleatoriamente
- **Explicar por qué** - no solo qué arreglar
- **Prevenir recurrencia** - agregar pruebas, validación
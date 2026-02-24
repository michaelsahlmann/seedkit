---
description: Brainstorming estructurado para proyectos y features. Explora múltiples opciones antes de la implementación.
---

# /brainstorm - Exploración Estructurada de Ideas

$ARGUMENTS

---

## Propósito

Este comando activa el modo BRAINSTORM para exploración estructurada de ideas. Usar cuando necesites explorar opciones antes de comprometerte con una implementación.

---

## Comportamiento

Cuando `/brainstorm` es activado:

1. **Entender el objetivo**
   - ¿Qué problema estamos resolviendo?
   - ¿Quién es el usuario?
   - ¿Qué restricciones existen?

2. **Generar opciones**
   - Proveer al menos 3 enfoques diferentes
   - Cada uno con pros y contras
   - Considerar soluciones no convencionales

3. **Comparar y recomendar**
   - Resumir tradeoffs
   - Dar una recomendación con razonamiento

---

## Formato de Salida

```markdown
## 🧠 Brainstorm: [Tema]

### Contexto
[Declaración breve del problema]

---

### Opción A: [Nombre]
[Descripción]

✅ **Pros:**
- [beneficio 1]
- [beneficio 2]

❌ **Contras:**
- [desventaja 1]

📊 **Esfuerzo:** Bajo | Medio | Alto

---

### Opción B: [Nombre]
[Descripción]

✅ **Pros:**
- [beneficio 1]

❌ **Contras:**
- [desventaja 1]
- [desventaja 2]

📊 **Esfuerzo:** Bajo | Medio | Alto

---

### Opción C: [Nombre]
[Descripción]

✅ **Pros:**
- [beneficio 1]

❌ **Contras:**
- [desventaja 1]

📊 **Esfuerzo:** Bajo | Medio | Alto

---

## 💡 Recomendación

**Opción [X]** porque [razonamiento].

¿Qué dirección te gustaría explorar?
```

---

## Ejemplos

```
/brainstorm sistema de autenticación
/brainstorm gestión de estado para formulario complejo
/brainstorm esquema de base de datos para app social
/brainstorm estrategia de caché
```

---

## Principios Clave

- **Sin código** - esto es sobre ideas, no implementación
- **Visual cuando ayude** - usar diagramas para arquitectura
- **Tradeoffs honestos** - no ocultar complejidad
- **Diferir al usuario** - presentar opciones, dejar que decida
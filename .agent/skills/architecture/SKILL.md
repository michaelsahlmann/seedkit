---
name: architecture
description: Framework de toma de decisiones arquitectónicas. Análisis de requisitos, evaluación de trade-offs, documentación ADR. Usar al tomar decisiones de arquitectura o analizar diseño de sistema.
allowed-tools: Read, Glob, Grep
---

# Framework de Decisiones de Arquitectura

> "Los requisitos guían la arquitectura. Los trade-offs informan las decisiones. Los ADRs capturan el razonamiento."

## 🎯 Regla de Lectura Selectiva

**¡Lee SOLO archivos relevantes para la solicitud!** Revisa el mapa de contenido, encuentra lo que necesitas.

| Archivo | Descripción | Cuándo Leer |
|------|-------------|--------------|
| `context-discovery.md` | Preguntas a hacer, clasificación de proyecto | Iniciando diseño de arquitectura |
| `trade-off-analysis.md` | Templates ADR, framework de trade-off | Documentando decisiones |
| `pattern-selection.md` | Árboles de decisión, anti-patrones | Eligiendo patrones |
| `examples.md` | Ejemplos de MVP, SaaS, Enterprise | Implementaciones de referencia |
| `patterns-reference.md` | Búsqueda rápida de patrones | Comparación de patrones |

---

## 🔗 Habilidades Relacionadas

| Habilidad | Usar Para |
|-------|---------|
| `@[skills/database-design]` | Diseño de schema de base de datos |
| `@[skills/api-patterns]` | Patrones de diseño de API |
| `@[skills/deployment-procedures]` | Arquitectura de despliegue |

---

## Principio Core

**"La simplicidad es la máxima sofisticación."**

- Empezar simple
- Agregar complejidad SOLO cuando se demuestre necesario
- Siempre puedes agregar patrones después
- Eliminar complejidad es MUCHO más difícil que agregarla

---

## Checklist de Validación

Antes de finalizar arquitectura:

- [ ] Requisitos claramente entendidos
- [ ] Restricciones identificadas
- [ ] Cada decisión tiene análisis de trade-off
- [ ] Alternativas más simples consideradas
- [ ] ADRs escritos para decisiones significativas
- [ ] Expertise del equipo coincide con patrones elegidos
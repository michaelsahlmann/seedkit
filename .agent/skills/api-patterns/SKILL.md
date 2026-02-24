---
name: api-patterns
description: Principios de diseño de API y toma de decisiones. Selección REST vs GraphQL vs tRPC, formatos de respuesta, versionado, paginación.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Patrones de API

> Principios de diseño de API y toma de decisiones para 2025.
> **Aprende a PENSAR, no a copiar patrones fijos.**

## 🎯 Regla de Lectura Selectiva

**¡Lee SOLO archivos relevantes para la solicitud!** Revisa el mapa de contenido, encuentra lo que necesitas.

---

## 📑 Mapa de Contenido

| Archivo | Descripción | Cuándo Leer |
|------|-------------|--------------|
| `api-style.md` | Árbol de decisión REST vs GraphQL vs tRPC | Elegir tipo de API |
| `rest.md` | Nombres de recursos, métodos HTTP, códigos de estado | Diseñando API REST |
| `response.md` | Patrón envelope, formato de error, paginación | Estructura de respuesta |
| `graphql.md` | Diseño de schema, cuándo usar, seguridad | Considerando GraphQL |
| `trpc.md` | Monorepo TypeScript, seguridad de tipos | Proyectos TS fullstack |
| `versioning.md` | Versionado URI/Header/Query | Planificación de evolución de API |
| `auth.md` | JWT, OAuth, Passkey, API Keys | Selección de patrón de autenticación |
| `rate-limiting.md` | Token bucket, sliding window | Protección de API |
| `documentation.md` | Mejores prácticas OpenAPI/Swagger | Documentación |
| `security-testing.md` | OWASP API Top 10, testing auth/authz | Auditorías de seguridad |

---

## 🔗 Habilidades Relacionadas

| Necesidad | Habilidad |
|------|-------|
| Implementación de API | `@[skills/backend-development]` |
| Estructura de datos | `@[skills/database-design]` |
| Detalles de seguridad | `@[skills/security-hardening]` |

---

## ✅ Checklist de Decisión

Antes de diseñar una API:

- [ ] **¿Preguntaste al usuario sobre consumidores de API?**
- [ ] **¿Elegiste estilo de API para ESTE contexto?** (REST/GraphQL/tRPC)
- [ ] **¿Definiste formato de respuesta consistente?**
- [ ] **¿Planificaste estrategia de versionado?**
- [ ] **¿Consideraste necesidades de autenticación?**
- [ ] **¿Planificaste rate limiting?**
- [ ] **¿Enfoque de documentación definido?**

---

## ❌ Anti-Patrones

**NO:**
- Default a REST para todo
- Usar verbos en endpoints REST (/getUsers)
- Retornar formatos de respuesta inconsistentes
- Exponer errores internos a clientes
- Saltar rate limiting

**SÍ:**
- Elegir estilo de API basado en contexto
- Preguntar sobre requisitos del cliente
- Documentar exhaustivamente
- Usar códigos de estado apropiados

---

## Script

| Script | Propósito | Comando |
|--------|---------|---------|
| `scripts/api_validator.py` | Validación de endpoints de API | `python scripts/api_validator.py <project_path>` |
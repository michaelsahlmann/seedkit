# Principios REST

> Diseño de API basado en recursos - sustantivos no verbos.

## Reglas de Nombres de Recursos

```
Principios:
├── Usar SUSTANTIVOS, no verbos (recursos, no acciones)
├── Usar formas PLURALES (/users no /user)
├── Usar minúsculas con guiones (/user-profiles)
├── Anidar para relaciones (/users/123/posts)
└── Mantener superficial (máx 3 niveles de profundidad)
```

## Selección de Método HTTP

| Método | Propósito | Idempotente? | Body? |
|--------|---------|-------------|-------|
| **GET** | Leer recurso(s) | Sí | No |
| **POST** | Crear nuevo recurso | No | Sí |
| **PUT** | Reemplazar recurso completo | Sí | Sí |
| **PATCH** | Actualización parcial | No | Sí |
| **DELETE** | Eliminar recurso | Sí | No |

## Selección de Código de Estado

| Situación | Código | Por Qué |
|-----------|------|-----|
| Éxito (lectura) | 200 | Éxito estándar |
| Creado | 201 | Nuevo recurso creado |
| Sin contenido | 204 | Éxito, nada que retornar |
| Bad request | 400 | Request malformada |
| No autorizado | 401 | Auth faltante/inválida |
| Prohibido | 403 | Auth válida, sin permiso |
| No encontrado | 404 | Recurso no existe |
| Conflicto | 409 | Conflicto de estado (duplicado) |
| Error de validación | 422 | Sintaxis válida, datos inválidos |
| Rate limited | 429 | Demasiadas requests |
| Error de servidor | 500 | Nuestra culpa |
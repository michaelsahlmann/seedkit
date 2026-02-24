# Principios de Formato de Respuesta

> La consistencia es clave - elige un formato y mantente fiel a él.

## Patrones Comunes

```
Elegir uno:
├── Patrón envelope ({ success, data, error })
├── Datos directos (solo retornar el recurso)
└── HAL/JSON:API (hypermedia)
```

## Respuesta de Error

```
Incluir:
├── Código de error (para manejo programático)
├── Mensaje de usuario (para mostrar)
├── Detalles (para debugging, errores a nivel de campo)
├── Request ID (para soporte)
└── NO detalles internos (¡seguridad!)
```

## Tipos de Paginación

| Tipo | Mejor Para | Trade-offs |
|------|----------|------------|
| **Offset** | Simple, permite saltar | Rendimiento en datasets grandes |
| **Cursor** | Datasets grandes | No se puede saltar a página |
| **Keyset** | Rendimiento crítico | Requiere key ordenable |

### Preguntas de Selección

1. ¿Qué tan grande es el dataset?
2. ¿Los usuarios necesitan saltar a páginas específicas?
3. ¿Los datos cambian frecuentemente?
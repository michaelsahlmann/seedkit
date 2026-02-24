# Principios de Rate Limiting

> Protege tu API de abuso y sobrecarga.

## Por Qué Rate Limiting

```
Proteger contra:
├── Ataques de fuerza bruta
├── Agotamiento de recursos
├── Sobrecostos (si es pay-per-use)
└── Uso injusto
```

## Selección de Estrategia

| Tipo | Cómo | Cuándo |
|------|-----|------|
| **Token bucket** | Burst permitido, se rellena con tiempo | La mayoría de APIs |
| **Sliding window** | Distribución suave | Límites estrictos |
| **Fixed window** | Contadores simples por ventana | Necesidades básicas |

## Headers de Respuesta

```
Incluir en headers:
├── X-RateLimit-Limit (máx requests)
├── X-RateLimit-Remaining (requests restantes)
├── X-RateLimit-Reset (cuándo se resetea el límite)
└── Retornar 429 cuando se excede
```
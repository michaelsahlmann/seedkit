# Estrategias de Versionado

> Planifica la evolución de la API desde el día uno.

## Factores de Decisión

| Estrategia | Implementación | Trade-offs |
|----------|---------------|------------|
| **URI** | /v1/users | Claro, fácil de cachear |
| **Header** | Accept-Version: 1 | URLs más limpias, descubrimiento más difícil |
| **Query** | ?version=1 | Fácil de agregar, desordenado |
| **Ninguno** | Evolucionar cuidadosamente | Mejor para interno, riesgoso para público |

## Filosofía de Versionado

```
Considerar:
├── ¿API pública? → Versionar en URI
├── ¿Solo interno? → Puede no necesitar versionado
├── ¿GraphQL? → Típicamente sin versiones (evolucionar schema)
├── ¿tRPC? → Los tipos fuerzan compatibilidad
```
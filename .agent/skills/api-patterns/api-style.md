# Selección de Estilo de API (2025)

> REST vs GraphQL vs tRPC - ¿Cuál usar en cada situación?

## Árbol de Decisión

```
¿Quiénes son los consumidores de la API?
│
├── API Pública / Múltiples plataformas
│   └── REST + OpenAPI (máxima compatibilidad)
│
├── Necesidades de datos complejas / Múltiples frontends
│   └── GraphQL (consultas flexibles)
│
├── Frontend + backend TypeScript (monorepo)
│   └── tRPC (seguridad de tipos end-to-end)
│
├── Tiempo real / Event-driven
│   └── WebSocket + AsyncAPI
│
└── Microservicios internos
    └── gRPC (rendimiento) o REST (simplicidad)
```

## Comparación

| Factor | REST | GraphQL | tRPC |
|--------|------|---------|------|
| **Mejor para** | APIs públicas | Apps complejas | Monorepos TS |
| **Curva de aprendizaje** | Baja | Media | Baja (si TS) |
| **Over/under fetching** | Común | Resuelto | Resuelto |
| **Seguridad de tipos** | Manual (OpenAPI) | Basada en schema | Automática |
| **Caché** | Nativo HTTP | Complejo | Basado en cliente |

## Preguntas de Selección

1. ¿Quiénes son los consumidores de la API?
2. ¿El frontend es TypeScript?
3. ¿Qué tan complejas son las relaciones de datos?
4. ¿Es crítico el caché?
5. ¿API pública o interna?
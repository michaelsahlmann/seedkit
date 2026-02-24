# Guidelines de Selección de Patrones

> Árboles de decisión para elegir patrones arquitectónicos.

## Árbol de Decisión Principal

```
INICIO: ¿Cuál es tu PREOCUPACIÓN PRINCIPAL?

┌─ Complejidad de Acceso a Datos?
│  ├─ ALTA (queries complejas, testing necesario)
│  │  → Patrón Repository + Unit of Work
│  │  VALIDAR: ¿La fuente de datos cambiará frecuentemente?
│  │     ├─ SÍ → Repository vale la indirección
│  │     └─ NO  → Considerar acceso directo ORM más simple
│  └─ BAJA (CRUD simple, base de datos única)
│     → ORM directamente (Prisma, Drizzle)
│     Más Simple = Mejor, Más Rápido
│
├─ Complejidad de Reglas de Negocio?
│  ├─ ALTA (lógica de dominio, reglas varían por contexto)
│  │  → Domain-Driven Design
│  │  VALIDAR: ¿Tienes expertos de dominio en el equipo?
│  │     ├─ SÍ → DDD Completo (Aggregates, Value Objects)
│  │     └─ NO  → DDD Parcial (entidades ricas, límites claros)
│  └─ BAJA (maymente CRUD, validación simple)
│     → Patrón Transaction Script
│     Más Simple = Mejor, Más Rápido
│
├─ Escalado Independiente Necesario?
│  ├─ SÍ (diferentes componentes escalan diferente)
│  │  → Microservices VALE la complejidad
│  │  REQUISITOS (TODOS deben ser verdad):
│  │    - Límites de dominio claros
│  │    - Equipo > 10 desarrolladores
│  │    - Diferentes necesidades de escalado por servicio
│  │  SI NO TODOS → Monolito Modular en su lugar
│  └─ NO (todo escala junto)
│     → Monolito Modular
│     Se pueden extraer servicios después cuando se demuestre necesario
│
└─ Requisitos de Tiempo Real?
   ├─ ALTA (actualizaciones inmediatas, sync multi-usuario)
   │  → Arquitectura Event-Driven
│  │  → Message Queue (RabbitMQ, Redis, Kafka)
   │  VALIDAR: ¿Puedes manejar consistencia eventual?
   │     ├─ SÍ → Event-driven válido
   │     └─ NO  → Síncrono con polling
   └─ BAJA (consistencia eventual aceptable)
      → Síncrono (REST/GraphQL)
      Más Simple = Mejor, Más Rápido
```

## Las 3 Preguntas (Antes de CUALQUIER Patrón)

1. **Problema Resuelto**: ¿Qué problema ESPECÍFICO resuelve este patrón?
2. **Alternativa Más Simple**: ¿Hay una solución más simple?
3. **Complejidad Diferida**: ¿Podemos agregar esto DESPUÉS cuando se necesite?

## Red Flags (Anti-patrones)

| Patrón | Anti-patrón | Alternativa Más Simple |
|---------|-------------|-------------------|
| Microservices | Splitting prematuro | Empezar monolito, extraer después |
| Clean/Hexagonal | Over-abstracción | Concreto primero, interfaces después |
| Event Sourcing | Over-engineering | Audit log append-only |
| CQRS | Complejidad innecesaria | Modelo único |
| Repository | YAGNI para CRUD simple | Acceso directo ORM |
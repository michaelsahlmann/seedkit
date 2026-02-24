# Ejemplos de Arquitectura

> Decisiones de arquitectura del mundo real por tipo de proyecto.

---

## Ejemplo 1: E-commerce MVP (Desarrollador Solo)

```yaml
Requisitos:
  - <1000 usuarios inicialmente
  - Desarrollador solo
  - Rápido al mercado (8 semanas)
  - Consciente del presupuesto

Decisiones de Arquitectura:
  Estructura App: Monolito (más simple para solo)
  Framework: Next.js (full-stack, rápido)
  Capa de Datos: Prisma directo (sin over-abstracción)
  Autenticación: JWT (más simple que OAuth)
  Pago: Stripe (solución hosteada)
  Base de Datos: PostgreSQL (ACID para órdenes)

Trade-offs Aceptados:
  - Monolito → No puede escalar independientemente (equipo no lo justifica)
  - Sin Repository → Menos testeable (CRUD simple no lo necesita)
  - JWT → Sin social login inicialmente (se puede agregar después)

Path de Migración Futuro:
  - Usuarios > 10K → Extraer servicio de pagos
  - Equipo > 3 → Agregar patrón Repository
  - Social login solicitado → Agregar OAuth
```

---

## Ejemplo 2: Producto SaaS (5-10 Desarrolladores)

```yaml
Requisitos:
  - 1K-100K usuarios
  - 5-10 desarrolladores
  - Largo plazo (12+ meses)
  - Múltiples dominios (billing, users, core)

Decisiones de Arquitectura:
  Estructura App: Monolito Modular (óptimo para tamaño de equipo)
  Framework: NestJS (modular por diseño)
  Capa de Datos: Patrón Repository (testing, flexibilidad)
  Modelo de Dominio: DDD Parcial (entidades ricas)
  Autenticación: OAuth + JWT
  Caché: Redis
  Base de Datos: PostgreSQL

Trade-offs Aceptados:
  - Monolito Modular → Algo de acoplamiento entre módulos (microservices no justificado)
  - DDD Parcial → Sin aggregates completos (sin expertos de dominio)
  - RabbitMQ después → Inicial síncrono (agregar cuando se demuestre necesario)

Path de Migración:
  - Equipo > 10 → Considerar microservices
  - Dominios en conflicto → Extraer bounded contexts
  - Issues de rendimiento de lectura → Agregar CQRS
```

---

## Ejemplo 3: Enterprise (100K+ Usuarios)

```yaml
Requisitos:
  - 100K+ usuarios
  - 10+ desarrolladores
  - Múltiples dominios de negocio
  - Diferentes necesidades de escalado
  - Disponibilidad 24/7

Decisiones de Arquitectura:
  Estructura App: Microservices (escala independiente)
  API Gateway: Kong/AWS API GW
  Modelo de Dominio: DDD Completo
  Consistencia: Event-driven (eventual OK)
  Message Bus: Kafka
  Autenticación: OAuth + SAML (SSO enterprise)
  Base de Datos: Polyglot (tool correcta por trabajo)
  CQRS: Servicios seleccionados

Requisitos Operacionales:
  - Service mesh (Istio/Linkerd)
  - Distributed tracing (Jaeger/Tempo)
  - Logging centralizado (ELK/Loki)
  - Circuit breakers (Resilience4j)
  - Kubernetes/Helm
```
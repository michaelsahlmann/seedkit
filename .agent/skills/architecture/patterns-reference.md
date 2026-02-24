# Referencia de Patrones de Arquitectura

> Referencia rápida para patrones comunes con guía de uso.

## Patrones de Acceso a Datos

| Patrón | Cuándo Usar | Cuándo NO Usar | Complejidad |
|---------|-------------|-----------------|------------|
| **Active Record** | CRUD simple, prototipado rápido | Queries complejas, múltiples fuentes | Baja |
| **Repository** | Testing necesario, múltiples fuentes | CRUD simple, base de datos única | Media |
| **Unit of Work** | Transacciones complejas | Operaciones simples | Alta |
| **Data Mapper** | Dominio complejo, rendimiento | CRUD simple, dev rápido | Alta |

## Patrones de Lógica de Dominio

| Patrón | Cuándo Usar | Cuándo NO Usar | Complejidad |
|---------|-------------|-----------------|------------|
| **Transaction Script** | CRUD simple, procedural | Reglas de negocio complejas | Baja |
| **Table Module** | Lógica basada en records | Comportamiento rico necesario | Baja |
| **Domain Model** | Lógica de negocio compleja | CRUD simple | Media |
| **DDD (Completo)** | Dominio complejo, expertos de dominio | Dominio simple, sin expertos | Alta |

## Patrones de Sistema Distribuido

| Patrón | Cuándo Usar | Cuándo NO Usar | Complejidad |
|---------|-------------|-----------------|------------|
| **Monolito Modular** | Equipos pequeños, límites poco claros | Contextos claros, diferentes escalas | Media |
| **Microservices** | Diferentes escalas, equipos grandes | Equipos pequeños, dominio simple | Muy Alta |
| **Event-Driven** | Tiempo real, acoplamiento loose | Workflows simples, consistencia fuerte | Alta |
| **CQRS** | Rendimiento read/write diverge | CRUD simple, mismo modelo | Alta |
| **Saga** | Transacciones distribuidas | Base de datos única, ACID simple | Alta |

## Patrones de API

| Patrón | Cuándo Usar | Cuándo NO Usar | Complejidad |
|---------|-------------|-----------------|------------|
| **REST** | CRUD estándar, recursos | Tiempo real, queries complejas | Baja |
| **GraphQL** | Queries flexibles, múltiples clientes | CRUD simple, necesidades de caché | Media |
| **gRPC** | Servicios internos, rendimiento | APIs públicas, clientes browser | Media |
| **WebSocket** | Actualizaciones en tiempo real | Request/response simple | Media |

---

## Principio de Simplicidad

**"Empezar simple, agregar complejidad solo cuando se demuestre necesario."**

- Siempre puedes agregar patrones después
- Eliminar complejidad es MUCHO más difícil que agregarla
- En duda, elegir la opción más simple
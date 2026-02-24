# Descubrimiento de Contexto

> Antes de sugerir cualquier arquitectura, recopila contexto.

## Jerarquía de Preguntas (Preguntar al Usuario PRIMERO)

1. **Escala**
   - ¿Cuántos usuarios? (10, 1K, 100K, 1M+)
   - ¿Volumen de datos? (MB, GB, TB)
   - ¿Tasa de transacciones? (por segundo/minuto)

2. **Equipo**
   - ¿Desarrollador solo o equipo?
   - ¿Tamaño del equipo y expertise?
   - ¿Distribuido o co-ubicado?

3. **Timeline**
   - ¿MVP/Prototipo o producto a largo plazo?
   - ¿Presión de time to market?

4. **Dominio**
   - ¿CRUD-heavy o lógica de negocio compleja?
   - ¿Requisitos de tiempo real?
   - ¿Compliance/regulaciones?

5. **Restricciones**
   - ¿Limitaciones de presupuesto?
   - ¿Sistemas legacy a integrar?
   - ¿Preferencias de stack tecnológico?

## Matriz de Clasificación de Proyecto

```
                    MVP              SaaS           Enterprise
┌─────────────────────────────────────────────────────────────┐
│ Escala       │ <1K           │ 1K-100K      │ 100K+        │
│ Equipo       │ Solo          │ 2-10         │ 10+          │
│ Timeline     │ Rápido (semanas) │ Medio (meses) │ Largo (años) │
│ Arquitectura │ Simple        │ Modular      │ Distribuida  │
│ Patrones     │ Mínimo        │ Selectivo    │ Comprehensivo│
│ Ejemplo      │ Next.js API   │ NestJS       │ Microservices│
└─────────────────────────────────────────────────────────────┘
```
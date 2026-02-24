---
name: express-api
description: Principios de plantilla Express.js REST API. TypeScript, Prisma, JWT.
---

# Plantilla Express.js API

## Stack Tech

| Componente | Tecnología |
|-----------|------------|
| Runtime | Node.js 20+ |
| Framework | Express.js |
| Lenguaje | TypeScript |
| Base de Datos | PostgreSQL + Prisma |
| Validación | Zod |
| Auth | JWT + bcrypt |

---

## Estructura de Directorios

```
nombre-proyecto/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app.ts           # Setup Express
│   ├── config/          # Entorno
│   ├── routes/          # Handlers de rutas
│   ├── controllers/     # Lógica de negocio
│   ├── services/        # Acceso a datos
│   ├── middleware/
│   │   ├── auth.ts      # JWT verify
│   │   ├── error.ts     # Error handler
│   │   └── validate.ts  # Validación Zod
│   ├── schemas/         # Schemas Zod
│   └── utils/
└── package.json
```

---

## Stack de Middleware

| Orden | Middleware |
|-------|------------|
| 1 | helmet (seguridad) |
| 2 | cors |
| 3 | morgan (logging) |
| 4 | body parsing |
| 5 | routes |
| 6 | error handler |

---

## Formato de Respuesta API

| Tipo | Estructura |
|------|-----------|
| Éxito | `{ success: true, data: {...} }` |
| Error | `{ error: "mensaje", details: [...] }` |

---

## Pasos de Setup

1. Crear directorio del proyecto
2. `npm init -y`
3. Instalar deps: `npm install express prisma zod bcrypt jsonwebtoken`
4. Configurar Prisma
5. `npm run db:push`
6. `npm run dev`

---

## Mejores Prácticas

- Arquitectura en capas (routes → controllers → services)
- Validar todos los inputs con Zod
- Manejo de errores centralizado
- Configuración basada en entorno
- Usar Prisma para acceso DB type-safe
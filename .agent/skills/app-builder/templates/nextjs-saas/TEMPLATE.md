---
name: nextjs-saas
description: Principios de plantilla Next.js SaaS (Estándares 2026). React 19, Server Actions, Auth.js v6.
---

# Plantilla Next.js SaaS (Actualizado 2026)

## Stack Tech

| Componente | Tecnología | Versión / Notas |
|-----------|------------|-----------------|
| Framework | Next.js | v16+ (App Router, React Compiler) |
| Runtime | Node.js | v24 (Krypton LTS) |
| Auth | Auth.js | v6 (antes NextAuth) |
| Pagos | Stripe API | Latest |
| Base de Datos | PostgreSQL | Prisma v6 (Serverless Driver) |
| Email | Resend | React Email |
| UI | Tailwind CSS | v4 (Oxide Engine, sin config file) |

---

## Estructura de Directorios

```
nombre-proyecto/
├── prisma/
│   └── schema.prisma    # Schema de Base de Datos
├── src/
│   ├── actions/         # NUEVO: Server Actions (Reemplaza API Routes para mutación de datos)
│   │   ├── auth-actions.ts
│   │   ├── billing-actions.ts
│   │   └── user-actions.ts
│   ├── app/
│   │   ├── (auth)/      # Route Group: Login, register
│   │   ├── (dashboard)/ # Route Group: Rutas protegidas (App Layout)
│   │   ├── (marketing)/ # Route Group: Landing, pricing (Marketing Layout)
│   │   └── api/         # Solo usado para Webhooks o casos Edge
│   │       └── webhooks/stripe/
│   ├── components/
│   │   ├── emails/      # Templates React Email
│   │   ├── forms/       # Componentes client usando useActionState (React 19)
│   │   └── ui/          # Shadcn UI
│   ├── lib/
│   │   ├── auth.ts      # Config Auth.js v6
│   │   ├── db.ts        # Prisma Singleton
│   │   └── stripe.ts    # Stripe Singleton
│   └── styles/
│       └── globals.css  # Imports Tailwind v4 (Solo CSS)
└── package.json
```

---

## Features SaaS

| Feature | Implementación |
|---------|---------------|
| Auth | Auth.js v6 + Passkeys + OAuth |
| Mutación de Datos | Server Actions (Sin API routes) |
| Suscripciones | Stripe Checkout & Customer Portal |
| Webhooks | Manejo asíncrono de eventos Stripe |
| Email | Transaccional via Resend |
| Validación | Zod (Validación server-side) |

---

## Schema de Base de Datos

| Modelo | Campos (Campos clave) |
|-------|---------------------|
| User | id, email, stripeCustomerId, subscriptionId, plan |
| Account | Datos provider OAuth (Google, GitHub...) |
| Session | Sesiones de usuario (Estrategia Database) |

---

## Variables de Entorno

| Variable | Propósito |
|----------|---------|
| DATABASE_URL | String de conexión Prisma (Postgres) |
| AUTH_SECRET | Reemplaza NEXTAUTH_SECRET (Auth.js v6) |
| STRIPE_SECRET_KEY | Pagos (Server-side) |
| STRIPE_WEBHOOK_SECRET | Verificación Webhook |
| RESEND_API_KEY | Envío de email |
| NEXT_PUBLIC_APP_URL | URL Canónica de la Aplicación |

---

## Pasos de Setup

1. Inicializar proyecto (Node 24):
   ```bash
   npx create-next-app@latest {{name}} --typescript --eslint
   ```

2. Instalar librerías core:
   ```bash
   npm install next-auth@beta stripe resend @prisma/client
   ```

3. Instalar Tailwind v4 (Agregar a globals.css):
   ```css
   @import "tailwindcss";
   ```

4. Configurar entorno (.env.local)

5. Sincronizar Base de Datos:
   ```bash
   npx prisma db push
   ```

6. Ejecutar Webhook local:
   ```bash
   npm run stripe:listen
   ```

7. Ejecutar proyecto:
   ```bash
   npm run dev
   ```
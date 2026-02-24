# Selección de Stack Tech (2026)

> Tecnologías default y alternativas para aplicaciones web.

## Stack Default (Web App - 2026)

```yaml
Frontend:
  framework: Next.js 16 (Estable)
  language: TypeScript 5.7+
  styling: Tailwind CSS v4
  state: React 19 Actions / Server Components
  bundler: Turbopack (Estable para Dev)

Backend:
  runtime: Node.js 23
  framework: Next.js API Routes / Hono (para Edge)
  validation: Zod / TypeBox

Base de Datos:
  primary: PostgreSQL
  orm: Prisma / Drizzle
  hosting: Supabase / Neon

Auth:
  provider: Auth.js (v5) / Clerk

Monorepo:
  tool: Turborepo 2.0
```

## Opciones Alternativas

| Necesidad | Default | Alternativa |
|------|---------|-------------|
| Tiempo real | - | Supabase Realtime, Socket.io |
| Almacenamiento de archivos | - | Cloudinary, S3 |
| Pagos | Stripe | LemonSqueezy, Paddle |
| Email | - | Resend, SendGrid |
| Búsqueda | - | Algolia, Typesense |
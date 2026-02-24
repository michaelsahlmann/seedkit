---
name: nextjs-static
description: Plantilla moderna para Next.js 16, React 19 y Tailwind v4. Optimizada para Landing pages y Portafolios.
---

# Plantilla Next.js Static Site (Edición Moderna)

## Stack Tech

| Componente | Tecnología | Notas |
|-----------|------------|-------|
| Framework | Next.js 16+ | App Router, Turbopack, Static Exports |
| Core | React 19 | Server Components, Nuevos Hooks, Compiler |
| Lenguaje | TypeScript | Strict Mode |
| Estilos | Tailwind CSS v4 | Config CSS-first (Sin config js), Oxide Engine |
| Animaciones | Framer Motion | Layout animations y gestures |
| Iconos | Lucide React | Iconos SVG ligeros |
| SEO | Metadata API | API nativa de Next.js (Reemplaza next-seo) |

---

## Estructura de Directorios

Estructura simplificada gracias a Tailwind v4 (configuración de theme vive dentro de CSS).

```
nombre-proyecto/
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Contiene SEO Metadata root
│   │   ├── page.tsx      # Landing Page
│   │   ├── globals.css   # Import Tailwind v4 y config @theme
│   │   ├── not-found.tsx # Página 404 personalizada
│   │   └── (routes)/     # Route groups (about, contact...)
│   ├── components/
│   │   ├── layout/       # Header, Footer
│   │   ├── sections/     # Hero, Features, Pricing, CTA
│   │   └── ui/           # Componentes atómicos (Button, Card)
│   └── lib/
│       └── utils.ts      # Funciones helper (cn, formatters)
├── content/              # Contenido Markdown/MDX
├── public/               # Assets estáticos (imágenes, fuentes)
├── next.config.ts        # Next.js Config (TypeScript)
└── package.json
```

---

## Config de Static Export

Usando `next.config.ts` en vez de `.js` para mejor type safety.

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',        // Requerido para Static Hosting (S3, GitHub Pages)
  images: { 
    unoptimized: true      // Requerido si no se usa optimización de imágenes de Node.js server
  },
  trailingSlash: true,     // Recomendado para SEO y arreglar 404s en algunos hosts
  reactStrictMode: true,
};

export default nextConfig;
```

---

## Implementación SEO (Metadata API)

Deprecado next-seo. Configurar directamente en layout.tsx o page.tsx.

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Nombre del Producto',
    default: 'Home - Nombre del Producto',
  },
  description: 'Descripción SEO optimizada para la landing page.',
  openGraph: {
    type: 'website',
    locale: 'es_LA',
    url: 'https://misitio.com',
    siteName: 'Mi Marca',
  },
};
```

---

## Secciones de Landing Page

| Sección | Propósito | Componente Sugerido |
|---------|---------|---------------------|
| Hero | Primera impresión, H1 y CTA principal | `<HeroSection />` |
| Features | Beneficios del producto (Layout Grid/Bento) | `<FeaturesGrid />` |
| Social Proof | Logos de partners, Números de usuarios | `<LogoCloud />` |
| Testimonios | Reviews de clientes | `<TestimonialCarousel />` |
| Precios | Planes de servicio | `<PricingCards />` |
| FAQ | Preguntas y Respuestas (Bueno para SEO) | `<Accordion />` |
| CTA | Conversión final | `<CallToAction />` |

---

## Patrones de Animación (Framer Motion)

| Patrón | Uso | Implementación |
|---------|-------|----------------|
| Fade Up | Headlines, párrafos | `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}` |
| Stagger | Listas de Features/Cards | Usar variants con `staggerChildren` |
| Parallax | Imágenes de fondo o elementos flotantes | `useScroll` y `useTransform` |
| Micro-interacciones | Botones hover, efectos click | `whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}` |

---

## Pasos de Setup

1. Inicializar Proyecto:
   ```bash
   npx create-next-app@latest my-site --typescript --tailwind --eslint
   # Seleccionar 'Sí' para App Router
   # Seleccionar 'No' para 'Would you like to customize the default import alias?'
   ```

2. Instalar Librerías Auxiliares:
   ```bash
   npm install framer-motion lucide-react clsx tailwind-merge
   # clsx y tailwind-merge ayudan a manejar clases dinámicas mejor
   ```

3. Configurar Tailwind v4 (en `src/app/globals.css`):
   ```css
   @import "tailwindcss";

   @theme {
     --color-primary: #3b82f6;
     --font-sans: 'Inter', sans-serif;
   }
   ```

4. Desarrollo:
   ```bash
   npm run dev --turbopack
   ```

---

## Despliegue

| Plataforma | Método | Notas Importantes |
|----------|--------|-----------------|
| Vercel | Git Push | Auto-detecta Next.js. Mejor para rendimiento. |
| GitHub Pages | GitHub Actions | Necesita setear `basePath` en `next.config.ts` si no se usa dominio custom. |
| AWS S3 / CloudFront | Upload carpeta out | Asegurar que Error Document esté configurado a `404.html`. |
| Netlify | Git Push | Setear build command a `npm run build`. |

---

## Mejores Prácticas (Modernas)

- **React Server Components (RSC)**: Por defecto todos los componentes son Server Components. Solo agregar `'use client'` cuando se necesita estado (`useState`) o event listeners (`onClick`).
- **Optimización de Imágenes**: Usar el componente `<Image />` pero recordar `unoptimized: true` para static export o usar CDN de imágenes externo (Cloudinary/Imgix).
- **Optimización de Fuentes**: Usar `next/font` (Google Fonts) para hostear fuentes automáticamente y prevenir layout shift.
- **Responsive**: Diseño mobile-first usando prefijos de Tailwind como `sm:`, `md:`, `lg:`.
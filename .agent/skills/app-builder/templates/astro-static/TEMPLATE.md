---
name: astro-static
description: Principios de plantilla de sitio estático Astro. Sitios web enfocados en contenido, blogs, documentación.
---

# Plantilla Astro Static Site

## Stack Tech

| Componente | Tecnología |
|-----------|------------|
| Framework | Astro 4.x |
| Contenido | MDX + Content Collections |
| Estilos | Tailwind CSS |
| Integraciones | Sitemap, RSS, SEO |
| Output | Static/SSG |

---

## Estructura de Directorios

```
nombre-proyecto/
├── src/
│   ├── components/      # Componentes .astro
│   ├── content/         # Contenido MDX
│   │   ├── blog/
│   │   └── config.ts    # Schemas de Collection
│   ├── layouts/         # Layouts de página
│   ├── pages/           # Routing basado en archivos
│   └── styles/
├── public/              # Assets estáticos
├── astro.config.mjs
└── package.json
```

---

## Conceptos Clave

| Concepto | Descripción |
|---------|-------------|
| Content Collections | Contenido type-safe con schemas Zod |
| Islands Architecture | Hidratación parcial para interactividad |
| Zero JS por defecto | HTML estático a menos que se necesite |
| Soporte MDX | Markdown con componentes |

---

## Pasos de Setup

1. `npm create astro@latest {{name}}`
2. Agregar integraciones: `npx astro add mdx tailwind sitemap`
3. Configurar `astro.config.mjs`
4. Crear content collections
5. `npm run dev`

---

## Despliegue

| Plataforma | Método |
|----------|--------|
| Vercel | Auto-detectado |
| Netlify | Auto-detectado |
| Cloudflare Pages | Auto-detectado |
| GitHub Pages | Build + deploy action |

---

## Mejores Prácticas

- Usar Content Collections para type safety
- Aprovechar generación estática
- Agregar islands solo donde sea necesario
- Optimizar imágenes con Astro Image
---
description: Planificar e implementar UI
---

---
description: Inteligencia de diseño potenciada por IA con 50+ estilos, 95+ paletas de colores y generación automatizada de sistema de diseño
---

# ui-ux-pro-max

Guía de diseño comprehensiva para aplicaciones web y móviles. Contiene 50+ estilos, 97 paletas de colores, 57 combinaciones de fuentes, 99 guidelines de UX y 25 tipos de gráficos en 9 stacks tecnológicos. Base de datos buscable con recomendaciones basadas en prioridad.

## Prerrequisitos

Verificar si Python está instalado:

```bash
python3 --version || python --version
```

Si Python no está instalado, instalarlo según el SO del usuario:

**macOS:**
```bash
brew install python3
```

**Ubuntu/Debian:**
```bash
sudo apt update && sudo apt install python3
```

**Windows:**
```powershell
winget install Python.Python.3.12
```

---

## Cómo Usar Este Workflow

Cuando el usuario solicita trabajo de UI/UX (design, build, create, implement, review, fix, improve), seguir este workflow:

### Paso 1: Analizar Requisitos del Usuario

Extraer información clave de la solicitud del usuario:
- **Tipo de producto**: SaaS, e-commerce, portafolio, dashboard, landing page, etc.
- **Palabras clave de estilo**: minimal, playful, professional, elegant, dark mode, etc.
- **Industria**: healthcare, fintech, gaming, education, etc.
- **Stack**: React, Vue, Next.js, o default a `html-tailwind`

### Paso 2: Generar Sistema de Diseño (REQUERIDO)

**Siempre comenzar con `--design-system`** para obtener recomendaciones comprehensivas con razonamiento:

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "<tipo_producto> <industria> <keywords>" --design-system [-p "Nombre del Proyecto"]
```

Este comando:
1. Busca 5 dominios en paralelo (product, style, color, landing, typography)
2. Aplica reglas de razonamiento de `ui-reasoning.csv` para seleccionar mejores matches
3. Retorna sistema de diseño completo: pattern, style, colors, typography, effects
4. Incluye anti-patrones a evitar

**Ejemplo:**
```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "beauty spa wellness service" --design-system -p "Serenity Spa"
```

### Paso 2b: Persistir Sistema de Diseño (Patrón Master + Overrides)

Para guardar el sistema de diseño para recuperación jerárquica entre sesiones, agregar `--persist`:

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Nombre del Proyecto"
```

Esto crea:
- `design-system/MASTER.md` — Fuente de Verdad Global con todas las reglas de diseño
- `design-system/pages/` — Carpeta para overrides específicos de página

**Con override específico de página:**
```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Nombre del Proyecto" --page "dashboard"
```

Esto también crea:
- `design-system/pages/dashboard.md` — Desviaciones específicas de página del Master

**Cómo funciona la recuperación jerárquica:**
1. Al construir una página específica (ej. "Checkout"), primero verificar `design-system/pages/checkout.md`
2. Si el archivo de página existe, sus reglas **sobrescriben** el archivo Master
3. Si no, usar `design-system/MASTER.md` exclusivamente

### Paso 3: Suplementar con Búsquedas Detalladas (según necesidad)

Después de obtener el sistema de diseño, usar búsquedas de dominio para obtener detalles adicionales:

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <dominio> [-n <max_resultados>]
```

**Cuándo usar búsquedas detalladas:**

| Necesidad | Dominio | Ejemplo |
|------|--------|---------|
| Más opciones de estilo | `style` | `--domain style "glassmorphism dark"` |
| Recomendaciones de gráficos | `chart` | `--domain chart "real-time dashboard"` |
| Mejores prácticas UX | `ux` | `--domain ux "animation accessibility"` |
| Fuentes alternativas | `typography` | `--domain typography "elegant luxury"` |
| Estructura de landing | `landing` | `--domain landing "hero social-proof"` |

### Paso 4: Guidelines de Stack (Default: html-tailwind)

Obtener mejores prácticas específicas de implementación. Si el usuario no especifica un stack, **default a `html-tailwind`**.

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "<keyword>" --stack html-tailwind
```

Stacks disponibles: `html-tailwind`, `react`, `nextjs`, `vue`, `svelte`, `swiftui`, `react-native`, `flutter`, `shadcn`, `jetpack-compose`

---

## Referencia de Búsqueda

### Dominios Disponibles

| Dominio | Usar Para | Palabras Clave de Ejemplo |
|--------|---------|------------------|
| `product` | Recomendaciones de tipo de producto | SaaS, e-commerce, portafolio, healthcare, beauty, service |
| `style` | Estilos UI, colores, efectos | glassmorphism, minimalism, dark mode, brutalism |
| `typography` | Combinaciones de fuentes, Google Fonts | elegant, playful, professional, modern |
| `color` | Paletas de colores por tipo de producto | saas, ecommerce, healthcare, beauty, fintech, service |
| `landing` | Estructura de página, estrategias CTA | hero, hero-centric, testimonial, pricing, social-proof |
| `chart` | Tipos de gráficos, recomendaciones de librería | trend, comparison, timeline, funnel, pie |
| `ux` | Mejores prácticas, anti-patrones | animation, accessibility, z-index, loading |
| `react` | Rendimiento React/Next.js | waterfall, bundle, suspense, memo, rerender, cache |
| `web` | Guidelines de interfaz web | aria, focus, keyboard, semantic, virtualize |
| `prompt` | Prompts de IA, palabras clave CSS | (nombre de estilo) |

### Stacks Disponibles

| Stack | Enfoque |
|-------|-------|
| `html-tailwind` | Utilidades Tailwind, responsive, a11y (DEFAULT) |
| `react` | Estado, hooks, rendimiento, patrones |
| `nextjs` | SSR, routing, imágenes, API routes |
| `vue` | Composition API, Pinia, Vue Router |
| `svelte` | Runes, stores, SvelteKit |
| `swiftui` | Views, State, Navigation, Animation |
| `react-native` | Componentes, Navigation, Lists |
| `flutter` | Widgets, State, Layout, Theming |
| `shadcn` | Componentes shadcn/ui, theming, forms, patterns |
| `jetpack-compose` | Composables, Modifiers, State Hoisting, Recomposition |

---

## Ejemplo de Workflow

**Solicitud del usuario:** "Hacer landing page para servicio de cuidado de piel profesional"

### Paso 1: Analizar Requisitos
- Tipo de producto: Beauty/Spa service
- Palabras clave de estilo: elegant, professional, soft
- Industria: Beauty/Wellness
- Stack: html-tailwind (default)

### Paso 2: Generar Sistema de Diseño (REQUERIDO)

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "beauty spa wellness service elegant" --design-system -p "Serenity Spa"
```

**Salida:** Sistema de diseño completo con pattern, style, colors, typography, effects y anti-patterns.

### Paso 3: Suplementar con Búsquedas Detalladas (según necesidad)

```bash
# Obtener guidelines UX para animación y accesibilidad
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux

# Obtener opciones de tipografía alternativas si es necesario
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "elegant luxury serif" --domain typography
```

### Paso 4: Guidelines de Stack

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "layout responsive form" --stack html-tailwind
```

**Luego:** Sintetizar sistema de diseño + búsquedas detalladas e implementar el diseño.

---

## Formatos de Salida

El flag `--design-system` soporta dos formatos de salida:

```bash
# Caja ASCII (default) - mejor para visualización en terminal
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "fintech crypto" --design-system

# Markdown - mejor para documentación
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "fintech crypto" --design-system -f markdown
```

---

## Tips para Mejores Resultados

1. **Ser específico con palabras clave** - "healthcare SaaS dashboard" > "app"
2. **Buscar múltiples veces** - Diferentes keywords revelan diferentes insights
3. **Combinar dominios** - Style + Typography + Color = Sistema de diseño completo
4. **Siempre verificar UX** - Buscar "animation", "z-index", "accessibility" para issues comunes
5. **Usar flag de stack** - Obtener mejores prácticas específicas de implementación
6. **Iterar** - Si la primera búsqueda no coincide, probar diferentes keywords

---

## Reglas Comunes para UI Profesional

Estos son issues frecuentemente ignorados que hacen que la UI se vea poco profesional:

### Iconos y Elementos Visuales

| Regla | Sí | No |
|------|----|----- |
| **Sin iconos emoji** | Usar iconos SVG (Heroicons, Lucide, Simple Icons) | Usar emojis como 🎨 🚀 ⚙️ como iconos UI |
| **Estados hover estables** | Usar transiciones de color/opacidad en hover | Usar transforms de scale que desplacen layout |
| **Logos de marca correctos** | Investigar SVG oficial de Simple Icons | Adivinar o usar paths de logo incorrectos |
| **Tamaño de iconos consistente** | Usar viewBox fijo (24x24) con w-6 h-6 | Mezclar diferentes tamaños de icono aleatoriamente |

### Interacción y Cursor

| Regla | Sí | No |
|------|----|----- |
| **Cursor pointer** | Agregar `cursor-pointer` a todos los elementos clickeables/hoverables | Dejar cursor default en elementos interactivos |
| **Feedback en hover** | Proveer feedback visual (color, shadow, border) | Sin indicación de que el elemento es interactivo |
| **Transiciones suaves** | Usar `transition-colors duration-200` | Cambios de estado instantáneos o muy lentos (>500ms) |

### Contraste Modo Claro/Oscuro

| Regla | Sí | No |
|------|----|----- |
| **Tarjeta glass modo claro** | Usar `bg-white/80` o mayor opacidad | Usar `bg-white/10` (muy transparente) |
| **Contraste de texto claro** | Usar `#0F172A` (slate-900) para texto | Usar `#94A3B8` (slate-400) para texto de cuerpo |
| **Texto muted claro** | Usar `#475569` (slate-600) mínimo | Usar gray-400 o más claro |
| **Visibilidad de borde** | Usar `border-gray-200` en modo claro | Usar `border-white/10` (invisible) |

### Layout y Espaciado

| Regla | Sí | No |
|------|----|----- |
| **Navbar flotante** | Agregar espaciado `top-4 left-4 right-4` | Pegar navbar a `top-0 left-0 right-0` |
| **Padding de contenido** | Contabilizar altura de navbar fijo | Dejar contenido oculto detrás de elementos fijos |
| **Max-width consistente** | Usar mismo `max-w-6xl` o `max-w-7xl` | Mezclar diferentes anchos de contenedor |

---

## Checklist Pre-Entrega

Antes de entregar código UI, verificar estos items:

### Calidad Visual
- [ ] Sin emojis usados como iconos (usar SVG en su lugar)
- [ ] Todos los iconos de set de iconos consistente (Heroicons/Lucide)
- [ ] Logos de marca son correctos (verificados de Simple Icons)
- [ ] Estados hover no causan desplazamiento de layout
- [ ] Usar colores de tema directamente (bg-primary) no wrapper var()

### Interacción
- [ ] Todos los elementos clickeables tienen `cursor-pointer`
- [ ] Estados hover proveen feedback visual claro
- [ ] Transiciones son suaves (150-300ms)
- [ ] Estados de focus visibles para navegación por teclado

### Modo Claro/Oscuro
- [ ] Texto en modo claro tiene contraste suficiente (4.5:1 mínimo)
- [ ] Elementos glass/transparentes visibles en modo claro
- [ ] Bordes visibles en ambos modos
- [ ] Probar ambos modos antes de entregar

### Layout
- [ ] Elementos flotantes tienen espaciado apropiado de bordes
- [ ] Sin contenido oculto detrás de navbars fijos
- [ ] Responsive a 375px, 768px, 1024px, 1440px
- [ ] Sin scroll horizontal en móvil

### Accesibilidad
- [ ] Todas las imágenes tienen alt text
- [ ] Inputs de formulario tienen labels
- [ ] El color no es el único indicador
- [ ] `prefers-reduced-motion` respetado

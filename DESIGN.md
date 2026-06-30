# VARKENTIS HOLDING - OFFICIAL BRAND BOOK v1.3
> **"Ecosistema para mentes que exigen resultados exponenciales."**

> **Changelog v1.3** — Migración del sistema tipográfico. La tríada pasa de
> *Cormorant Garamond / Manrope / JetBrains Mono* a **Young Serif / Palatino / Geist Mono**,
> validada en producción (Base General). Editorial-serif sobre editorial-serif; el lado
> "terminal" se sostiene por tratamiento (labels mono en mayúsculas + acento naranja), no por
> la tipografía base.

---

## 1. ADN DE MARCA: FILOSOFÍA DEL EJECUTOR

### El Propósito
Varkentis no es una comunidad de apoyo, es una **infraestructura de alto rendimiento**. Su misión es erradicar la mediocridad operativa mediante la implementación agresiva de Inteligencia Artificial y pensamiento crítico. Transformamos el conocimiento en **evidencia**.

### Personalidad (Voz y Tono)
*   **Directo y Crudo:** Eliminamos el relleno. Si algo no produce resultados, es descartado. 
*   **Elite Tech-Editorial:** Una mezcla entre la frialdad de una terminal de comandos y la elegancia de una revista de negocios de alta gama.
*   **Autoridad Estricta:** El mentor que no te dice lo que quieres oír, sino lo que necesitas ejecutar.
*   **Slogan Core:** *"Paraguay puede estar atrasado. Vos no."*

---

## 2. SISTEMA VISUAL: CÓDIGOS DE PODER

### 2.1 Paleta de Colores
| Color | Hex | Aplicación |
| :--- | :--- | :--- |
| **Deep Void (Negro)** | `#050505` | Fondo principal. Representa el espacio donde nace la ejecución. |
| **Authority Blue** | `#304269` | Estructura institucional. Usado en secciones de contraste y capas profundas. |
| **Disruptive Orange** | `#F26101` | **Acento Vital.** Call to action, progreso, y marcas de éxito. |
| **Frost Clarity** | `#D9E8F5` | Textos secundarios y fondos de lectura técnica. |
| **Pure White** | `#FFFFFF` | Títulos principales y legibilidad máxima. |

### 2.2 Tipografía (El Equilibrio de Poder)
Tríada **editorial de autoridad**: dos serifs que proyectan herencia y contundencia, con un
monoespaciado neutro para el lenguaje de sistema. El contraste no nace de "serif vs sans",
sino de **rol, peso y tamaño** entre una serif de display y una serif de texto.

1.  **Young Serif (Serif Display) — Títulos y Marca:**
    *   *Uso:* `h1`/`h2`/`h3`, títulos de cards y el logotipo. Tamaños medianos-grandes
        (`text-2xl` en UI; `text-5xl`+ en hero/landing). Es robusta y "chunky" por diseño.
    *   *Sentimiento:* Autoridad editorial, contundencia, "el mentor que no negocia".
    *   *Peso:* **Un único corte (400).** No tiene itálica ni bold reales — su volumen ya es
        alto. **No** aplicar `font-bold` (el faux-bold la ensucia); jerarquizar por **tamaño**.
    *   *Tracking / Leading:* `letter-spacing: -0.01em` en tamaños grandes para cohesión;
        `line-height: 1.1` (tight). Nunca agregar tracking positivo: ya es densa.
2.  **Palatino (Serif Humanista) — Cuerpo y Subtítulos:**
    *   *Uso:* Cuerpo de texto, párrafos, navegación y **subtítulos** (la línea bajo cada
        título). Self-hosted desde el TTF `palatino-palr45w.ttf`.
    *   *Convención:* **Subtítulos en negrita** (`font-semibold/bold`), texto normal en
        regular. La negrita es **sintética** (el TTF es de un solo peso) — aceptable en
        Palatino; para negrita/itálica reales conseguir los cortes *Palatino Bold/Italic*.
    *   *Sentimiento:* Revista de negocios de alta gama, calidez, lectura premium.
    *   *Tracking / Leading:* Neutro (`0`); `line-height: 1.6` para lectura cómoda. Cuidar el
        contraste sobre fondo oscuro: en `text-sm` evitar opacidades < `text-white/70`.
3.  **Geist Mono (Monospace) — Sistema:**
    *   *Uso:* Etiquetas UI, indicadores de sistema, "Prompts", metadata, bloques de código e
        identificadores tipo `NODE_01`.
    *   *Sentimiento:* Neutro, moderno, preciso. **No** carga personalidad propia: el lado
        "terminal/IA" lo da el **tratamiento** (mayúsculas + tracking ancho + acento naranja).
    *   *Tracking / Leading:* Cuerpo de código `letter-spacing: 0.02em`, `line-height: 1.5`.
        Labels en `uppercase` con `letter-spacing: 0.2em` (ver Inputs/CTAs).

> **Por qué serif-sobre-serif funciona:** Young Serif es una display de alto contraste y
> trazo grueso; Palatino es una serif de texto de bajo contraste optimizada para lectura. La
> diferencia de *propósito* las separa visualmente sin necesidad de una sans intermedia. El
> mono es el tercer registro (sistema), no decorativo.

> **Implementación de referencia (Base General):** Young Serif vía `next/font/google`
> (`weight: "400"`); Palatino vía `next/font/local` (TTF); Geist Mono vía `next/font`.
> Variables CSS: `--font-heading` (Young Serif), `--font-sans` (Palatino), `--font-mono`
> (Geist Mono). Cumple la regla #7 (todo self-hosted).

### 2.3 Elementos de Lenguaje Visual
*   **Hairline Borders:** Bordes de `1px` con opacidad reducida (`rgba(255,255,255,0.1)`). Representan precisión y orden.
*   **Progress Indicators:** Barras de carga en *Disruptive Orange* sobre fondos oscuros para mostrar avance de niveles.
*   **Glow & Pulse:** Sombras suaves y animaciones de pulso (`pulse-soft`) para elementos de estatus activo.
*   **Grids:** Patrones de rejilla sutiles en secciones de "War Room" para evocar planificación táctica.
*   **Noise Texture:** Capa de ruido SVG (`bg-noise`) con opacidad 4% y `mix-blend-mode: hard-light` sobre toda la interfaz.
*   **Volumetric Glow:** Radiales sutiles de color naranja (12% opacidad) detrás de elementos hero para dar profundidad.
*   **Floating Paths:** Trazos SVG animados como **capa de fondo global** (ver §2.4). Movimiento lento y continuo, muy baja opacidad. Aporta vida sin competir con el contenido.

### 2.4 Fondo Estándar: Floating Paths
**Obligatorio en todos los proyectos** como capa de fondo ambiental.

*   *Qué es:* Dos juegos espejados de 36 trazos SVG curvos (`<motion.path>`) que animan su
    `pathLength`/`pathOffset` en loop infinito y lineal. Da sensación de "infraestructura en
    movimiento".
*   *Comportamiento:* Capa **global, fija (`fixed inset-0`), detrás del contenido (`z-0`,
    contenido en `z-10`), `pointer-events: none`**. Opacidad total de capa ~`0.6`; opacidad de
    trazo creciente por índice (`0.06 → ~0.7`). Color por `currentColor` (`text-foreground`):
    oscuro sobre claro, claro sobre oscuro.
*   *Regla anti-bug:* La `duration` de cada trazo debe ser **determinista por índice**
    (`20 + (i % 12) * 1.5`). **Nunca** `Math.random()` en el render → rompe la hidratación SSR.
*   *Implementación de referencia (Base General):* `src/components/shared/background-paths.tsx`
    (`"use client"`, `import { motion } from "motion/react"`). Se monta una sola vez en el
    layout raíz, como primer hijo del `body`, con el contenido envuelto en `relative z-10`.
*   *Tokens:* ver `background` en §4.

---

## 3. ARQUITECTURA DEL ECOSISTEMA

### Varkentis Institute
La base del conocimiento. Estética limpia, enfoque en "Dashboard" y trazabilidad de aprendizaje.

### Varkentis Wear
Insignias de rango. Las prendas no moda, son **unidades de estatus**.
*   **Nivel 01 (Miembro):** Acceso al ecosistema.
*   **Nivel 05 (Ejecutor):** Resultados comprobados.
*   **Elite Circle (Legend):** Dominio total de la infraestructura.

### War Room (Protocolo de Guerra)
Sesiones tácticas de 20 minutos.
*   **Regla de Oro:** Se produce evidencia, no opiniones.
*   **Visual:** Contraste extremo, cronómetros activos, datos en tiempo real.

---

## 4. DESIGN TOKENS (Sincronizados)

```yaml
tokens:
  colors:
    bg: "#050505"
    primary: "#304269"
    action: "#F26101"
    text: "#FFFFFF"
    subtext: "#D9E8F5"
    muted: "#1A1A1A"
    card: "#0A0A0A"
    border: "rgba(255,255,255,0.1)"
  
  fonts:
    display: "Young Serif, serif"                       # Títulos y marca. Self-hosted.
    body: "Palatino, 'Palatino Linotype', 'Book Antiqua', serif"  # Cuerpo + subtítulos. TTF local.
    system: "Geist Mono, monospace"                     # Sistema, labels, código.

  typography:
    display:                          # Young Serif (un solo peso 400, sin itálica/bold).
      letter-spacing: "-0.01em"       # Cohesión en tamaños grandes. Nunca tracking positivo.
      line-height: "1.1"              # Tight para títulos contundentes.
      weight: "400"                   # No usar font-bold (faux-bold la ensucia).
    body:                             # Palatino.
      letter-spacing: "0"             # Neutro.
      line-height: "1.6"              # Lectura cómoda.
      subtitle-weight: "600"          # Subtítulos en negrita (sintética en el TTF actual).
      min-opacity-small: "0.7"        # En text-sm sobre fondo oscuro, no bajar de text-white/70.
    system:                           # Geist Mono.
      letter-spacing: "0.02em"        # Cuerpo de código.
      letter-spacing-label: "0.2em"   # Labels en uppercase (CTAs, inputs).
      line-height: "1.5"              # Monospace necesita aire vertical.

  radius:
    containers: "12px"   # Cards, secciones, paneles — bordes redondeados.
    buttons: "9999px"     # Cápsula corporativa. Confianza táctil e impacto visual.
    inputs: "9999px"      # Inputs cápsula, coherentes con botones.

  ui:
    border: "1px solid rgba(255,255,255,0.1)"
    shadow: "0 30px 60px rgba(0,0,0,0.8)"

  spacing:
    max-width: "max-w-7xl"         # Contenido principal (80rem)
    max-width-narrow: "max-w-6xl"  # Páginas de guidelines (72rem)
    section-padding-x: "px-6 md:px-12"
    section-gap: "mb-40"           # Separación entre secciones principales
    component-gap: "gap-8"         # Gap estándar en grids

  motion:
    default: "300ms"       # Transiciones estándar (hover, focus)
    emphasis: "500ms"      # Transiciones de énfasis (CTAs, entradas)
    slow: "8s"             # Animaciones de pulso ambiental
    easing: "ease-in-out"  # Easing por defecto
    hover-lift: "-translate-y-1"  # Elevación sutil en hover de CTAs

  background:                     # Floating Paths (§2.4) — capa global obligatoria.
    layer-opacity: "0.6"          # Opacidad de la capa completa.
    stroke-base: "0.06"           # Opacidad de trazo del primero.
    stroke-step: "0.018"          # Incremento por índice.
    paths: 36                     # Trazos por juego (x2 espejados).
    duration: "20 + (i % 12) * 1.5s"  # Determinista. NUNCA Math.random (rompe hidratación).
    easing: "linear"
    z-index: "0 (contenido en 10)"
    pointer-events: "none"
```

---

## 5. ESPECIFICACIONES DE COMPONENTES

### 5.1 Botones (CTAs)
*   **Forma:** Cápsula (`rounded-full`). Nunca angulares.
*   **Texto:** Siempre `uppercase`, `font-black`, `tracking-[0.2em]`, `text-[10px]`.
*   **Variants:**
    *   **Primary:** `bg-white text-black` → hover: `bg-[#F26101] text-white`
    *   **Ghost/Secondary:** `bg-transparent text-white border border-white/20` → hover: `bg-white text-black`
*   **Hover:** Elevación sutil (`hover:-translate-y-1`) + sombra naranja en CTAs primarios.

### 5.2 Inputs
*   **Forma:** Cápsula (`rounded-full`), coherente con botones.
*   **Fondo:** Transparente `bg-white/5`.
*   **Borde:** `border-white/10`.
*   **Focus:** Ring y border en `#F26101`.
*   **Labels:** `font-mono tracking-widest uppercase text-xs text-white/50`.

### 5.3 Cards / Contenedores
*   **Forma:** Bordes redondeados (`rounded-xl` / `12px`).
*   **Fondo:** Opacidades mínimas `bg-white/5` (o `bg-card` para componentes shadcn).
*   **Borde:** `border-white/10` o `ring-1 ring-foreground/10`.
*   **Efecto:** Sombras profundas (`shadow-2xl`) para jerarquía visual.

### 5.4 Iconografía
*   **Librería:** `lucide-react`. Iconos de línea limpia, peso uniforme.
*   **Tamaño:** `size-4` por defecto, `size-3` para variantes compactas.

---

## 6. REGLAS DE EJECUCIÓN (PROHIBICIONES)
1.  **USAR bordes redondeados en todos los elementos:** Cards, paneles, secciones y botones usan bordes redondeados (`border-radius: 12px` para contenedores, `9999px` para botones e inputs cápsula). Eliminar puntas angulares en toda la interfaz.
2.  **NO usar degradados coloridos:** El único color de acento es el naranja de acción. Los degradados son solo para efectos volumétricos sutiles de fondo.
3.  **NO usar lenguaje pasivo:** "Haz click aquí" ➔ "Producir Evidencia".
4.  **NO ignorar el contraste:** El fondo siempre es Deep Void o Authority Blue.
5.  **SIEMPRE usar la tríada tipográfica:** Young Serif (display) para headings, Palatino (serif) para cuerpo y subtítulos, Geist Mono para metadata/sistema. Jerarquía por tamaño/peso, no por mezclar familias ajenas. Subtítulos en negrita; títulos Young Serif nunca en `font-bold`.
6.  **SIEMPRE incluir textura de fondo:** Noise layer + volumetric glow en secciones hero. Nunca un fondo plano sin profundidad.
7.  **SIEMPRE descargar las fuentes usadas y tenerlas localmente** (self-hosted). Estado actual: Young Serif ✓, Palatino (regular) ✓, Geist Mono ✓. **Pendiente:** conseguir los cortes reales *Palatino Bold* y *Palatino Italic* para reemplazar la negrita/itálica sintéticas.

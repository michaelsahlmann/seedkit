# Sistema de Propuestas — Varkentis

## Cómo usar este sistema

1. Enviá la información del cliente usando el formulario de `INSTRUCTIONS.md`
2. La IA genera el HTML usando este template y el brand book
3. Abrí el HTML en Chrome/Edge
4. Exportá a PDF con los settings de abajo

---

## Exportación a PDF (Chrome / Edge)

```
Ctrl + P
├── Destination:        Save as PDF
├── Layout:             Portrait
├── Paper size:         A4
├── Margins:            None
├── Scale:              Default
├── Background graphics: ✓ (ACTIVAR)
└── Save
```

**IMPORTANTE:** Si "Background graphics" no está activado, el fondo negro y los colores no se ven.

---

## Estructura del documento

Toda propuesta tiene esta estructura fija en páginas separadas:

```
Página 1 → Cover (portada)
Página 2 → Contexto + Dirigido a
Página 3 → Objetivos
Página 4 → Programa parte 1 (módulos 1-2)
Página 5 → Programa parte 2 (módulos 3-4)
Página 6 → Metodología + Material
Página 7 → Inversión + Condiciones
Página 8 → Sobre Varkentis + Contacto + Footer
```

Cada página es un `<div class="page page-break">`. El cover usa `<div class="cover">`.

**REGLA:** Cada página debe tener máximo ~850px de contenido visible. Si hay mucho contenido, dividir en 2 páginas. Nunca dejar que un módulo o sección se corte a la mitad.

---

## Brand Book (resumen ejecutivo)

Referencia completa: `/run/media/michel/sandisk/projectos/brand/DESIGN.md`

### Colores
| Token | Hex | Uso |
|-------|-----|-----|
| `--bg` | `#050505` | Fondo principal (Deep Void) |
| `--primary` | `#304269` | Estructura (Authority Blue) |
| `--action` | `#F26101` | Acento, CTAs, tags (Disruptive Orange) |
| `--text` | `#FFFFFF` | Títulos, texto principal |
| `--subtext` | `#D9E8F5` | Texto secundario (Frost Clarity) |
| `--card` | `#0A0A0A` | Fondo de cards |
| `--border` | `rgba(255,255,255,0.1)` | Bordes hairline |

### Tipografía
| Token | Fuente | Uso |
|-------|--------|-----|
| `--font-display` | Cormorant Garamond (serif) | Headings, títulos de alto impacto |
| `--font-body` | Manrope (sans-serif) | Cuerpo de texto, párrafos |
| `--font-system` | JetBrains Mono (monospace) | Tags, metadata, labels, números |

### Reglas visuales
- Bordes redondeados: `12px` en containers, `9999px` en botones/tags
- Hairline borders: `1px solid rgba(255,255,255,0.1)`
- Noise texture overlay en body (SVG inline)
- Volumetric glow: radial gradient naranja 12% opacidad en secciones hero
- Sin degradados coloridos. Solo naranja como acento.
- Sombras profundas en cards

### Tono de voz
- Directo, sin relleno
- "No vendemos teoría. Producimos evidencia."
- Slogan: "Paraguay puede estar atrasado. Vos no."

---

## Tamaños de fuente (print-safe)

| Elemento | Tamaño | Fuente |
|----------|--------|--------|
| Cover title | 3.5rem | display |
| Cover subtitle | 1.1rem | body |
| Section title | 2rem | display |
| Section tag | 0.7rem | system |
| Body text | 0.95rem | body |
| Highlight box | 0.92rem | body |
| Module title | 1.2rem | display |
| Module tag | 0.6rem | system |
| Module topics | 0.88rem | body |
| Card title | 0.9rem | body |
| Card text | 0.85rem | body |
| Obj text | 0.9rem | body |
| Obj num | 0.6rem | system |
| Price amount | 3rem | display |
| Term title | 0.6rem | system |
| Term text | 0.85rem | body |
| CTA title | 1.4rem | display |
| Contact items | 0.75rem | system |

---

## Márgenes y espaciado (print)

```css
/* En pantalla */
.page { padding: 60px 70px; }

/* En print */
@page { margin: default; }  /* NO usar @page size, rompe el selector de papel */
.page { padding: 12mm 16mm; }  /* Respiro interno para margins None */
```

**REGLA:** NO usar `@page { size: A4 }` — oculta la opción de paper size en el diálogo de impresión.

---

## Reglas de contenido

### Lo que SÍ va en cada sección:

**Cover:**
- Brand name (Varkentis · Consultoría y Entrenamientos)
- Título del servicio
- Subtítulo descriptivo
- Meta: fecha, duración, modalidad
- Slogan

**Contexto:**
- Párrafo del problema que resuelve el servicio
- Highlight box con la propuesta de valor
- "Dirigido a" con cards de 2 perfiles

**Objetivos:**
- Lista numerada 01-05 con objetivos claros y accionables

**Programa:**
- Módulos con tag, título y duración
- Lista de topics por módulo (5-6 items c/u)
- Si hay 4+ módulos, dividir en 2 páginas

**Metodología:**
- Grid de 3 beneficios (icono + título + texto)
- Highlight box con modalidad, duración, participantes, material
- Grid de material incluido (4 items)

**Inversión:**
- Price card con monto, moneda, meta info
- Grid de condiciones (6 items: pago, agendamiento, lugar, incluye, validez, adicionales)

**Sobre Varkentis:**
- Cita destacada
- Párrafo institucional
- CTA con nombre, email, teléfono
- Footer con brand, tagline, fecha

### Lo que NUNCA va:
- Más de 6 items por módulo
- Párrafos largos (máx 3-4 oraciones)
- Colores fuera de la paleta
- Bordes angulares (todo redondeado)
- Fuente diferente a la tríada

---

## Checklist pre-entrega

- [ ] Cover con datos correctos (servicio, fecha, modalidad)
- [ ] Objetivos adaptados al servicio específico
- [ ] Módulos con contenido relevante al servicio
- [ ] Precio correcto en Guaraníes
- [ ] Participantes correctos
- [ ] Contacto actualizado (email + teléfono)
- [ ] Revisar que no haya páginas cortadas
- [ ] Exportar con Background graphics activado

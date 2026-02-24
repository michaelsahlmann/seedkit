---
name: chrome-extension
description: Principios de plantilla de Chrome Extension. Manifest V3, React, TypeScript.
---

# Plantilla Chrome Extension

## Stack Tech

| Componente | Tecnología |
|-----------|------------|
| Manifest | V3 |
| UI | React 18 |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Bundler | Vite |
| Storage | Chrome Storage API |

---

## Estructura de Directorios

```
nombre-proyecto/
├── src/
│   ├── popup/           # Popup de extensión
│   ├── options/         # Página de opciones
│   ├── background/      # Service worker
│   ├── content/         # Content scripts
│   ├── components/
│   ├── hooks/
│   └── lib/
│       ├── storage.ts   # Helpers de Chrome storage
│       └── messaging.ts # Message passing
├── public/
│   ├── icons/
│   └── manifest.json
└── package.json
```

---

## Conceptos Manifest V3

| Componente | Propósito |
|-----------|---------|
| Service Worker | Procesamiento en background |
| Content Scripts | Inyección en página |
| Popup | Interfaz de usuario |
| Options Page | Configuraciones |

---

## Permisos

| Permiso | Uso |
|------------|-----|
| storage | Guardar datos de usuario |
| activeTab | Acceso a tab actual |
| scripting | Inyectar scripts |
| host_permissions | Acceso a sitios |

---

## Pasos de Setup

1. `npm create vite {{name}} -- --template react-ts`
2. Agregar tipos Chrome: `npm install -D @types/chrome`
3. Configurar Vite para multi-entry
4. Crear manifest.json
5. `npm run dev` (modo watch)
6. Cargar en Chrome: `chrome://extensions` → Load unpacked

---

## Tips de Desarrollo

| Tarea | Método |
|------|--------|
| Debug Popup | Click derecho icono → Inspect |
| Debug Background | Extensions page → Service worker |
| Debug Content | DevTools console en página |
| Hot Reload | `npm run dev` con watch |

---

## Mejores Prácticas

- Usar messaging type-safe
- Envolver Chrome APIs en promises
- Minimizar permisos
| Manejar offline graceful
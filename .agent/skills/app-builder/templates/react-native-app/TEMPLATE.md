---
name: react-native-app
description: Principios de plantilla de app móvil React Native. Expo, TypeScript, navegación.
---

# Plantilla React Native App (Edición 2026)

Plantilla de app móvil moderna, optimizada para New Architecture y React 19.

## Stack Tech

| Componente | Tecnología | Versión / Notas |
|-----------|------------|-----------------|
| Core | React Native + Expo | SDK 52+ (New Architecture Habilitado) |
| Lenguaje | TypeScript | v5+ (Strict Mode) |
| UI Logic | React | v19 (React Compiler, auto-memoization) |
| Navegación | Expo Router | v4+ (File-based, Universal Links) |
| Estilos | NativeWind | v4.0 (Tailwind v4, config CSS-first) |
| Estado | Zustand + React Query | v5+ (Async State Management) |
| Storage | Expo SecureStore | Almacenamiento local encriptado |

---

## Estructura de Directorios

Estructura estandarizada para Expo Router y NativeWind v4.

```
nombre-proyecto/
├── app/                 # Expo Router (Routing basado en archivos)
│   ├── _layout.tsx      # Root Layout (Config Stack/Tabs)
│   ├── index.tsx        # Pantalla Principal
│   ├── (tabs)/          # Route Group para Tab Bar
│   │   ├── _layout.tsx
│   │   ├── home.tsx
│   │   └── profile.tsx
│   ├── +not-found.tsx   # Página 404
│   └── [id].tsx         # Ruta Dinámica (Tipada)
├── components/
│   ├── ui/              # Componentes Primitivos (Button, Text)
│   └── features/        # Componentes Complejos
├── hooks/               # Custom Hooks
├── lib/
│   ├── api.ts           # Cliente Axios/Fetch
│   └── storage.ts       # Wrapper SecureStore
├── store/               # Stores Zustand
├── constants/           # Colores, Config Theme
├── assets/              # Fuentes, Imágenes
├── global.css           # Punto de entrada para NativeWind v4
├── tailwind.config.ts   # Tailwind Config (si se necesita theme custom)
├── babel.config.js      # Plugin Babel NativeWind
└── app.json             # Expo Config
```

---

## Patrones de Navegación (Expo Router)

| Patrón | Descripción | Implementar |
|---------|-------------|-----------|
| Stack | Navegación jerárquica (Push/Pop) | `<Stack />` en `_layout.tsx` |
| Tabs | Barra de navegación inferior | `<Tabs />` en `(tabs)/_layout.tsx` |
| Drawer | Menú lateral deslizante | `expo-router/drawer` |
| Modals | Pantallas overlay | `presentation: 'modal'` en Stack screen |

---

## Paquetes Clave y Propósito

| Paquete | Propósito |
|---------|---------|
| expo-router | Routing basado en archivos (tipo Next.js) |
| nativewind | Usar clases Tailwind CSS en React Native |
| react-native-reanimated | Animaciones suaves (corre en UI thread) |
| @tanstack/react-query | Manejo de estado server, caché, pre-fetching |
| zustand | Manejo de estado global (más ligero que Redux) |
| expo-image | Render de imágenes optimizado para rendimiento |

---

## Pasos de Setup (Estándar 2026)

1. Inicializar Proyecto:
   ```bash
   npx create-expo-app@latest my-app --template default
   cd my-app
   ```

2. Instalar Dependencias Core:
   ```bash
   npx expo install expo-router react-native-safe-area-context react-native-screens expo-link expo-constants expo-status-bar
   ```

3. Instalar NativeWind v4:
   ```bash
   npm install nativewind tailwindcss react-native-reanimated
   ```

4. Configurar NativeWind (Babel y CSS):
   - Agregar plugin a `babel.config.js`: `plugins: ["nativewind/babel"]`.
   - Crear `global.css` con: `@import "tailwindcss";`.
   - Importar `global.css` en `app/_layout.tsx`.

5. Ejecutar Proyecto:
   ```bash
   npx expo start -c
   # Presionar 'i' para simulador iOS o 'a' para emulador Android
   ```

---

## Mejores Prácticas (Actualizado)

- **New Architecture**: Asegurar `newArchEnabled: true` en `app.json` para aprovechar TurboModules y Fabric Renderer.
- **Typed Routes**: Usar feature "Typed Routes" de Expo Router para routing type-safe (ej. `router.push('/path')`).
- **React 19**: Reducir uso de `useMemo` o `useCallback` gracias a React Compiler (si está habilitado).
- **Componentes**: Construir primitivas UI (Box, Text) con NativeWind className para reutilización.
- **Assets**: Usar `expo-image` en vez del default `<Image />` para mejor caché y rendimiento.
- **API**: Siempre envolver llamadas API con TanStack Query, evitar llamadas directas en `useEffect`.
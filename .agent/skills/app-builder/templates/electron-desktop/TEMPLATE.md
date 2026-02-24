---
name: electron-desktop
description: Principios de plantilla de app desktop Electron. Cross-platform, React, TypeScript.
---

# Plantilla Electron Desktop App

## Stack Tech

| Componente | Tecnología |
|-----------|------------|
| Framework | Electron 28+ |
| UI | React 18 |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Bundler | Vite + electron-builder |
| IPC | Comunicación type-safe |

---

## Estructura de Directorios

```
nombre-proyecto/
├── electron/
│   ├── main.ts          # Proceso main
│   ├── preload.ts       # Script preload
│   └── ipc/             # Handlers IPC
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── TitleBar.tsx # Barra de título custom
│   │   └── ...
│   └── hooks/
├── public/
└── package.json
```

---

## Modelo de Procesos

| Proceso | Rol |
|---------|------|
| Main | Node.js, acceso sistema |
| Renderer | Chromium, UI React |
| Preload | Bridge, context isolation |

---

## Conceptos Clave

| Concepto | Propósito |
|---------|---------|
| contextBridge | Exposición segura de API |
| ipcMain/ipcRenderer | Comunicación entre procesos |
| nodeIntegration: false | Seguridad |
| contextIsolation: true | Seguridad |

---

## Pasos de Setup

1. `npm create vite {{name}} -- --template react-ts`
2. Instalar: `npm install -D electron electron-builder vite-plugin-electron`
3. Crear directorio electron/
4. Configurar proceso main
5. `npm run electron:dev`

---

## Targets de Build

| Plataforma | Output |
|----------|--------|
| Windows | NSIS, Portable |
| macOS | DMG, ZIP |
| Linux | AppImage, DEB |

---

## Mejores Prácticas

- Usar script preload para bridge main/renderer
- IPC type-safe con handlers tipados
- Barra de título custom para feel nativo
| Manejar estado de ventana (maximize, minimize)
- Auto-updates con electron-updater
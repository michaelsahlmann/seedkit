# Guía de Limpieza de Proyectos Node.js / Next.js

Este documento describe los archivos y carpetas que se pueden eliminar de forma segura para liberar espacio en disco, junto con los comandos para regenerarlos.

---

## Archivos Eliminables

### 1. `node_modules/` — Dependencias del proyecto

| Propiedad | Valor |
|-----------|-------|
| **Tamaño típico** | 200 MB - 1+ GB |
| **Descripción** | Contiene todas las dependencias declaradas en `package.json` |
| **¿Se puede eliminar?** | ✅ Sí, completamente seguro |
| **Comando de regeneración** | `npm install` |
| **Tiempo de regeneración** | 1-5 minutos (depende de conexión y cantidad de paquetes) |

**Notas importantes:**
- Esta carpeta es lo que más espacio ocupa en cualquier proyecto Node.js
- Se regenera automáticamente descargando los paquetes desde npm registry
- Si tienes `package-lock.json`, la instalación será determinista (mismas versiones)
- El archivo `.npmrc` puede afectar la velocidad de descarga (usar mirror si es necesario)

**Comando para eliminar:**
```bash
rm -rf node_modules
```

---

### 2. `.next/` — Cache de compilación (Next.js)

| Propiedad | Valor |
|-----------|-------|
| **Tamaño típico** | 50 MB - 500 MB |
| **Descripción** | Cache y artefactos de compilación generados por Next.js |
| **¿Se puede eliminar?** | ✅ Sí, completamente seguro |
| **Comando de regeneración** | `npm run build` o `npm run dev` |
| **Tiempo de regeneración** | 30 segundos - 3 minutos |

**Contenido de la carpeta:**
```
.next/
├── build/          # Metadatos del build
├── cache/          # Cache compilado (lo que más ocupa)
├── server/         # Código compilado para el servidor
├── static/         # Archivos estáticos optimizados
└── types/          # Tipos TypeScript generados
```

**Notas importantes:**
- Solo existe en proyectos Next.js
- El cache acelera builds subsecuentes, pero no es esencial
- Se regenera automáticamente al ejecutar el servidor de desarrollo o build de producción

**Comando para eliminar:**
```bash
rm -rf .next
```

---

### 3. `tsconfig.tsbuildinfo` — Cache de TypeScript

| Propiedad | Valor |
|-----------|-------|
| **Tamaño típico** | 10 KB - 500 KB |
| **Descripción** | Información de compilación incremental de TypeScript |
| **¿Se puede eliminar?** | ✅ Sí, completamente seguro |
| **Comando de regeneración** | `tsc --build` o `npm run build` |
| **Tiempo de regeneración** | Segundos |

**Notas importantes:**
- Solo existe si `tsconfig.json` tiene `composite: true` o opciones incrementales
- Acelera compilaciones posteriores
- Se regenera automáticamente en la próxima compilación TypeScript

**Comando para eliminar:**
```bash
rm tsconfig.tsbuildinfo
```

---

## Comando de Limpieza Completa

### Para proyectos Next.js:
```bash
rm -rf node_modules .next tsconfig.tsbuildinfo
```

### Para proyectos Node.js genéricos:
```bash
rm -rf node_modules tsconfig.tsbuildinfo
```

### Para proyectos React (Create React App):
```bash
rm -rf node_modules build
```

---

## Scripts de package.json Recomendados

Agregar estos scripts al `package.json` para facilitar la limpieza:

```json
{
  "scripts": {
    "clean": "rm -rf node_modules .next tsconfig.tsbuildinfo",
    "reinstall": "npm run clean && npm install",
    "rebuild": "npm run clean && npm install && npm run build"
  }
}
```

---

## Resumen de Espacio Recuperable

| Archivo/Carpeta | Espacio típico | Regeneración |
|-----------------|----------------|--------------|
| `node_modules/` | 200 MB - 1+ GB | `npm install` |
| `.next/` | 50 MB - 500 MB | `npm run build` |
| `tsconfig.tsbuildinfo` | 10 KB - 500 KB | `tsc --build` |
| **TOTAL** | **250 MB - 1.5+ GB** | — |

---

## Archivos que NO se deben eliminar

| Archivo/Carpeta | Razón |
|-----------------|-------|
| `package.json` | Define dependencias y scripts |
| `package-lock.json` | Bloquea versiones exactas de dependencias |
| `src/` | Código fuente del proyecto |
| `public/` | Archivos estáticos del proyecto |
| `.git/` | Historial de versiones (a menos que elimines el repo completo) |
| `tsconfig.json` | Configuración de TypeScript |
| `next.config.ts` | Configuración de Next.js |

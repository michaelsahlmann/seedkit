---
name: cli-tool
description: Principios de plantilla de herramienta CLI Node.js. Commander.js, prompts interactivos.
---

# Plantilla CLI Tool

## Stack Tech

| Componente | Tecnología |
|-----------|------------|
| Runtime | Node.js 20+ |
| Lenguaje | TypeScript |
| CLI Framework | Commander.js |
| Prompts | Inquirer.js |
| Output | chalk + ora |
| Config | cosmiconfig |

---

## Estructura de Directorios

```
nombre-proyecto/
├── src/
│   ├── index.ts         # Punto de entrada
│   ├── cli.ts           # Setup CLI
│   ├── commands/        # Handlers de comandos
│   ├── lib/
│   │   ├── config.ts    # Loader de config
│   │   └── logger.ts    # Output estilizado
│   └── types/
├── bin/
│   └── cli.js           # Ejecutable
└── package.json
```

---

## Principios de Diseño CLI

| Principio | Descripción |
|-----------|-------------|
| Subcomandos | Agrupar acciones relacionadas |
| Opciones | Flags con defaults |
| Interactivo | Prompts cuando es necesario |
| No interactivo | Soportar flags --yes |

---

## Componentes Clave

| Componente | Propósito |
|-----------|---------|
| Commander | Parsing de comandos |
| Inquirer | Prompts interactivos |
| Chalk | Output coloreado |
| Ora | Spinners/loading |
| Cosmiconfig | Descubrimiento de archivo de config |

---

## Pasos de Setup

1. Crear directorio del proyecto
2. `npm init -y`
3. Instalar deps: `npm install commander @inquirer/prompts chalk ora cosmiconfig`
4. Configurar bin en package.json
5. `npm link` para testing local

---

## Publicación

```bash
npm login
npm publish
```

---

## Mejores Prácticas

- Proveer mensajes de error útiles
- Soportar modos interactivo y no interactivo
- Usar estilizado de output consistente
- Validar inputs con Zod
- Exit con códigos apropiados (0 éxito, 1 error)
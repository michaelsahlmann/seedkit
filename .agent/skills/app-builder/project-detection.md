# Detección de Tipo de Proyecto

> Analiza solicitudes del usuario para determinar tipo de proyecto y plantilla.

## Matriz de Keywords

| Keywords | Tipo de Proyecto | Plantilla |
|----------|--------------|----------|
| blog, post, artículo | Blog | astro-static |
| e-commerce, producto, carrito, pago | E-commerce | nextjs-saas |
| dashboard, panel, gestión | Admin Dashboard | nextjs-fullstack |
| api, backend, servicio, rest | API Service | express-api |
| python, fastapi, django | API Python | python-fastapi |
| móvil, android, ios, react native | Mobile App (RN) | react-native-app |
| flutter, dart | Mobile App (Flutter) | flutter-app |
| portafolio, personal, cv | Portafolio | nextjs-static |
| crm, cliente, ventas | CRM | nextjs-fullstack |
| saas, suscripción, stripe | SaaS | nextjs-saas |
| landing, promocional, marketing | Landing Page | nextjs-static |
| docs, documentación | Documentación | astro-static |
| extensión, plugin, chrome | Extensión de Navegador | chrome-extension |
| desktop, electron | App Desktop | electron-desktop |
| cli, línea de comandos, terminal | CLI Tool | cli-tool |
| monorepo, workspace | Monorepo | monorepo-turborepo |

## Proceso de Detección

```
1. Tokenizar solicitud del usuario
2. Extraer keywords
3. Determinar tipo de proyecto
4. Detectar información faltante → derivar a conversation-manager
5. Sugerir stack tech
```
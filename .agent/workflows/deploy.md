---
description: Comando de despliegue para releases a producción. Checks pre-flight y ejecución de despliegue.
---

# /deploy - Despliegue a Producción

$ARGUMENTS

---

## Propósito

Este comando maneja despliegue a producción con checks pre-flight, ejecución de despliegue y verificación.

---

## Sub-comandos

```
/deploy            - Wizard de despliegue interactivo
/deploy check      - Ejecutar solo checks pre-despliegue
/deploy preview    - Desplegar a preview/staging
/deploy production - Desplegar a producción
/deploy rollback   - Rollback a versión anterior
```

---

## Checklist Pre-Despliegue

Antes de cualquier despliegue:

```markdown
## 🚀 Checklist Pre-Deploy

### Calidad de Código
- [ ] Sin errores TypeScript (`npx tsc --noEmit`)
- [ ] ESLint pasando (`npx eslint .`)
- [ ] Todas las pruebas pasando (`npm test`)

### Seguridad
- [ ] Sin secretos hardcodeados
- [ ] Variables de entorno documentadas
- [ ] Dependencias auditadas (`npm audit`)

### Rendimiento
- [ ] Tamaño de bundle aceptable
- [ ] Sin declaraciones console.log
- [ ] Imágenes optimizadas

### Documentación
- [ ] README actualizado
- [ ] CHANGELOG actualizado
- [ ] Docs de API actuales

### ¿Listo para desplegar? (s/n)
```

---

## Flujo de Despliegue

```
┌─────────────────┐
│  /deploy        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Checks         │
│  pre-flight     │
└────────┬────────┘
         │
   ¿Pasa? ──No──► Corregir issues
         │
        Sí
         │
         ▼
┌─────────────────┐
│  Build de       │
│  aplicación     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Desplegar a    │
│  plataforma     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Health check   │
│  y verificar    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  ✅ Completado  │
└─────────────────┘
```

---

## Formato de Salida

### Despliegue Exitoso

```markdown
## 🚀 Despliegue Completado

### Resumen
- **Versión:** v1.2.3
- **Entorno:** producción
- **Duración:** 47 segundos
- **Plataforma:** Vercel

### URLs
- 🌐 Producción: https://app.example.com
- 📊 Dashboard: https://vercel.com/project

### Qué Cambió
- Agregada feature de perfil de usuario
- Arreglado bug de login
- Actualizadas dependencias

### Health Check
✅ API respondiendo (200 OK)
✅ Base de datos conectada
✅ Todos los servicios saludables
```

### Despliegue Fallido

```markdown
## ❌ Despliegue Fallido

### Error
Build falló en paso: Compilación TypeScript

### Detalles
```
error TS2345: Argument of type 'string' is not assignable...
```

### Resolución
1. Corregir error TypeScript en `src/services/user.ts:45`
2. Ejecutar `npm run build` localmente para verificar
3. Intentar `/deploy` de nuevo

### Rollback Disponible
Versión anterior (v1.2.2) sigue activa.
Ejecutar `/deploy rollback` si es necesario.
```

---

## Soporte de Plataformas

| Plataforma | Comando | Notas |
|----------|---------|-------|
| Vercel | `vercel --prod` | Auto-detectado para Next.js |
| Railway | `railway up` | Necesita Railway CLI |
| Fly.io | `fly deploy` | Necesita flyctl |
| Docker | `docker compose up -d` | Para self-hosted |

---

## Ejemplos

```
/deploy
/deploy check
/deploy preview
/deploy production --skip-tests
/deploy rollback
```
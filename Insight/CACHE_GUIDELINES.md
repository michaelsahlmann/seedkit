# Guía de Cache para Proyectos

Instrucciones validadas con documentación oficial. Aplica estas reglas desde el inicio de cualquier proyecto nuevo.

---

## ¿Por qué usar cache?

Sin cache, cada acción del usuario dispara una petición nueva al servidor aunque los datos no hayan cambiado. Esto genera:
- Páginas lentas y experiencia degradada
- Carga innecesaria en la base de datos
- Costos más altos en infraestructura

Cache resuelve esto almacenando datos temporalmente para reutilizarlos sin volver a procesarlos.

---

## Front-end (React) — TanStack Query

> Antes llamado React Query. Úsalo para **toda** requisición a tu back-end o a APIs externas.

### Instalación

```bash
npm install @tanstack/react-query
```

### Configuración mínima recomendada

Envuelve tu app con el `QueryClientProvider` y define valores globales de `staleTime`:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos por defecto
      gcTime: 1000 * 60 * 10,   // mantener en memoria 10 minutos
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TuApp />
    </QueryClientProvider>
  )
}
```

### Patrones clave

**Lectura de datos — `useQuery`**

```tsx
const { data, isPending, isFetching, isStale } = useQuery({
  queryKey: ['usuarios', userId],
  queryFn: () => fetch(`/api/usuarios/${userId}`).then(r => r.json()),
  staleTime: 1000 * 60 * 2, // sobrescribe el default si este recurso cambia más seguido
})
```

**Mutación con invalidación — `useMutation` + `invalidateQueries`**

```tsx
const mutation = useMutation({
  mutationFn: (datos) => fetch('/api/usuarios', { method: 'POST', body: JSON.stringify(datos) }),
  onSuccess: () => {
    // Marca el cache como obsoleto para forzar re-fetch
    queryClient.invalidateQueries({ queryKey: ['usuarios'] })
  },
})
```

### Regla de oro: ¿qué cachear?

| Cachear | No cachear |
|---|---|
| Listados de recursos (usuarios, productos) | Acciones en tiempo real (precios de bolsa) |
| Detalle de entidades | Notificaciones push |
| Configuraciones de la app | Datos post-formulario (usar `useMutation`) |
| Resultados de búsquedas | |

### Estados importantes a manejar

- `isPending` — carga inicial, no hay datos aún
- `isFetching` — refetch en segundo plano (hay datos previos)
- `isStale` — los datos están desactualizados según `staleTime`

---

## Back-end — Redis

> Úsalo para evitar consultas repetidas a la base de datos y para comunicación entre servicios.

### Patrón Cache-Aside (el más común)

La lógica es siempre: **verificar Redis primero → si no hay, buscar en BD → guardar en Redis con TTL**.

```js
// Ejemplo Node.js con ioredis
async function getUsuario(id) {
  const cacheKey = `usuario:${id}`

  // 1. Verificar cache
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)

  // 2. Cache miss → buscar en BD
  const usuario = await db.query('SELECT * FROM usuarios WHERE id = $1', [id])

  // 3. Guardar en cache con TTL
  await redis.set(cacheKey, JSON.stringify(usuario), 'EX', 60 * 5) // 5 minutos

  return usuario
}
```

### TTL recomendado por tipo de dato

| Tipo de dato | TTL sugerido | Razón |
|---|---|---|
| Perfil de usuario | 5–10 min | Cambia poco, pero debe reflejar ediciones |
| Listados / catálogos | 10–30 min | Actualizaciones no son críticas al instante |
| Configuraciones globales | 1–24 h | Cambia muy raramente |
| Sesiones de usuario | 1–7 días | Según política de expiración de sesión |
| Precios / stock en tiempo real | No cachear o <30 s | Precisión crítica |

### Comunicación entre servicios — Pub/Sub

Redis también funciona como message broker entre microservicios:

```js
// Publicar un evento desde Servicio A
await redis.publish('usuario:actualizado', JSON.stringify({ id: userId }))

// Suscribirse desde Servicio B
redis.subscribe('usuario:actualizado', (message) => {
  const { id } = JSON.parse(message)
  // invalidar cache local de ese usuario
})
```

---

## Reglas de revalidación

El cache no es eterno. Definí cuándo los datos se vuelven obsoletos.

### Front-end (`staleTime`)

```
staleTime bajo (0–60 s)     → datos que cambian frecuentemente (inventario, notificaciones)
staleTime medio (1–10 min)  → datos de uso general (listas de usuarios, productos)
staleTime alto (30 min+)    → datos casi estáticos (configuración, países, categorías)
```

### Back-end (TTL en Redis)

- Siempre definir TTL — nunca dejar claves sin expiración en producción.
- Al actualizar un registro en BD, invalidar la clave de Redis correspondiente de inmediato.
- Usar prefijos en las claves para facilitar invalidación por grupo: `usuario:123`, `productos:lista`.

---

## Checklist de adopción por proyecto

Revisá esta lista al iniciar cualquier proyecto nuevo:

- [ ] TanStack Query instalado y `QueryClientProvider` configurado con defaults globales
- [ ] `staleTime` definido por tipo de recurso (no dejar en 0 global)
- [ ] Mutaciones que modifican datos usan `invalidateQueries` en `onSuccess`
- [ ] Redis conectado en el back-end para queries costosas o frecuentes
- [ ] Todas las claves de Redis tienen TTL definido
- [ ] Al actualizar un dato en BD, se invalida la clave de Redis correspondiente
- [ ] No se cachean datos sensibles sin cifrado (tokens, contraseñas)
- [ ] Datos en tiempo real excluidos del cache (o con TTL muy bajo)

---

## Referencias

- [TanStack Query — Documentación oficial](https://tanstack.com/query/latest)
- [Redis — Documentación oficial](https://redis.io/docs)
- [Patrón Cache-Aside — Redis](https://redis.io/docs/latest/develop/use/patterns/)

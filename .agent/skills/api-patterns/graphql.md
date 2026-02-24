# Principios GraphQL

> Consultas flexibles para datos complejos e interconectados.

## Cuándo Usar

```
✅ Buen fit:
├── Datos complejos e interconectados
├── Múltiples plataformas frontend
├── Clientes necesitan consultas flexibles
├── Requisitos de datos evolutivos
└── Reducir over-fetching importa

❌ Mal fit:
├── Operaciones CRUD simples
├── Mucho upload de archivos
├── Caché HTTP importante
└── Equipo no familiarizado con GraphQL
```

## Principios de Diseño de Schema

```
Principios:
├── Pensar en grafos, no en endpoints
├── Diseñar para evolución (sin versiones)
├── Usar connections para paginación
├── Ser específico con tipos (no "data" genérico)
└── Manejar nulabilidad cuidadosamente
```

## Consideraciones de Seguridad

```
Proteger contra:
├── Ataques de profundidad de query → Setear max depth
├── Complejidad de query → Calcular costo
├── Abuso de batching → Limitar batch size
├── Introspección → Deshabilitar en producción
```
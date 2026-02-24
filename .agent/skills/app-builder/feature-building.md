# Construcción de Features

> Cómo analizar e implementar nuevas features.

## Análisis de Feature

```
Solicitud: "agregar sistema de pagos"

Análisis:
├── Cambios Requeridos:
│   ├── Base de datos: tablas orders, payments
│   ├── Backend: /api/checkout, /api/webhooks/stripe
│   ├── Frontend: CheckoutForm, PaymentSuccess
│   └── Config: API keys de Stripe
│
├── Dependencias:
│   ├── paquete stripe
│   └── Autenticación de usuario existente
│
└── Tiempo Estimado: 15-20 minutos
```

## Proceso de Mejora Iterativa

```
1. Analizar proyecto existente
2. Crear plan de cambios
3. Presentar plan al usuario
4. Obtener aprobación
5. Aplicar cambios
6. Probar
7. Mostrar preview
```

## Manejo de Errores

| Tipo de Error | Estrategia de Solución |
|------------|-------------------|
| Error de TypeScript | Corregir tipo, agregar import faltante |
| Dependencia Faltante | Ejecutar npm install |
| Conflicto de Puerto | Sugerir puerto alternativo |
| Error de Base de Datos | Verificar migración, validar conexión |

## Estrategia de Recuperación

```
1. Detectar error
2. Intentar corrección automática
3. Si falla, reportar al usuario
4. Sugerir alternativa
5. Rollback si es necesario
```
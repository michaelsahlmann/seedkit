# Patrones de Autenticación

> Elegir patrón de auth según el caso de uso.

## Guía de Selección

| Patrón | Mejor Para |
|---------|----------|
| **JWT** | Stateless, microservicios |
| **Session** | Web tradicional, simple |
| **OAuth 2.0** | Integración con terceros |
| **API Keys** | Server-to-server, APIs públicas |
| **Passkey** | Sin contraseña moderno (2025+) |

## Principios JWT

```
Importante:
├── Siempre verificar firma
├── Verificar expiración
├── Incluir claims mínimos
├── Usar expiración corta + refresh tokens
└── Nunca almacenar datos sensibles en JWT
```
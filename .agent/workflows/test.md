---
description: Comando de generación y ejecución de pruebas. Crea y ejecuta pruebas para código.
---

# /test - Generación y Ejecución de Pruebas

$ARGUMENTS

---

## Propósito

Este comando genera pruebas, ejecuta pruebas existentes o verifica cobertura de pruebas.

---

## Sub-comandos

```
/test                - Ejecutar todas las pruebas
/test [archivo/feature] - Generar pruebas para objetivo específico
/test coverage       - Mostrar reporte de cobertura de pruebas
/test watch          - Ejecutar pruebas en modo watch
```

---

## Comportamiento

### Generar Pruebas

Cuando se pide probar un archivo o feature:

1. **Analizar el código**
   - Identificar funciones y métodos
   - Encontrar casos límite
   - Detectar dependencias a mockear

2. **Generar casos de prueba**
   - Pruebas de happy path
   - Casos de error
   - Casos límite
   - Pruebas de integración (si es necesario)

3. **Escribir pruebas**
   - Usar framework de pruebas del proyecto (Jest, Vitest, etc.)
   - Seguir patrones de prueba existentes
   - Mockear dependencias externas

---

## Formato de Salida

### Para Generación de Pruebas

```markdown
## 🧪 Pruebas: [Objetivo]

### Plan de Pruebas
| Caso de Prueba | Tipo | Cobertura |
|-----------|------|----------|
| Should create user | Unit | Happy path |
| Should reject invalid email | Unit | Validación |
| Should handle db error | Unit | Caso de error |

### Pruebas Generadas

`tests/[archivo].test.ts`

[Bloque de código con pruebas]

---

Ejecutar con: `npm test`
```

### Para Ejecución de Pruebas

```
🧪 Ejecutando pruebas...

✅ auth.test.ts (5 pasaron)
✅ user.test.ts (8 pasaron)
❌ order.test.ts (2 pasaron, 1 falló)

Falló:
  ✗ should calculate total with discount
    Esperado: 90
    Recibido: 100

Total: 15 pruebas (14 pasaron, 1 falló)
```

---

## Ejemplos

```
/test src/services/auth.service.ts
/test flujo de registro de usuario
/test coverage
/test arreglar pruebas fallidas
```

---

## Patrones de Prueba

### Estructura de Prueba Unitaria

```typescript
describe('AuthService', () => {
  describe('login', () => {
    it('should return token for valid credentials', async () => {
      // Arrange
      const credentials = { email: 'test@test.com', password: 'pass123' };
      
      // Act
      const result = await authService.login(credentials);
      
      // Assert
      expect(result.token).toBeDefined();
    });

    it('should throw for invalid password', async () => {
      // Arrange
      const credentials = { email: 'test@test.com', password: 'wrong' };
      
      // Act & Assert
      await expect(authService.login(credentials)).rejects.toThrow('Invalid credentials');
    });
  });
});
```

---

## Principios Clave

- **Probar comportamiento no implementación**
- **Una aserción por prueba** (cuando sea práctico)
- **Nombres de prueba descriptivos**
- **Patrón Arrange-Act-Assert**
- **Mockear dependencias externas**
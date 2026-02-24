# Testing de Seguridad de API

> Principios para probar seguridad de API. OWASP API Top 10, autenticación, testing de autorización.

---

## OWASP API Security Top 10

| Vulnerabilidad | Enfoque de Test |
|---------------|------------|
| **API1: BOLA** | Acceder a recursos de otros usuarios |
| **API2: Broken Auth** | JWT, sesión, credenciales |
| **API3: Property Auth** | Mass assignment, exposición de datos |
| **API4: Resource Consumption** | Rate limiting, DoS |
| **API5: Function Auth** | Endpoints admin, bypass de rol |
| **API6: Business Flow** | Abuso de lógica, automatización |
| **API7: SSRF** | Acceso a red interna |
| **API8: Misconfiguration** | Endpoints debug, CORS |
| **API9: Inventory** | APIs shadow, versiones viejas |
| **API10: Unsafe Consumption** | Confianza en API de terceros |

---

## Testing de Autenticación

### Testing JWT

| Check | Qué Probar |
|-------|--------------|
| Algoritmo | None, confusión de algoritmo |
| Secreto | Secretos débiles, fuerza bruta |
| Claims | Expiración, issuer, audience |
| Firma | Manipulación, inyección de key |

### Testing de Sesión

| Check | Qué Probar |
|-------|--------------|
| Generación | Predecibilidad |
| Almacenamiento | Seguridad client-side |
| Expiración | Aplicación de timeout |
| Invalidación | Efectividad de logout |

---

## Testing de Autorización

| Tipo de Test | Enfoque |
|-----------|----------|
| **Horizontal** | Acceder a datos de usuarios pares |
| **Vertical** | Acceder a funciones de mayor privilegio |
| **Contexto** | Acceder fuera del scope permitido |

### Testing BOLA/IDOR

1. Identificar IDs de recursos en requests
2. Capturar request con sesión del usuario A
3. Repetir con sesión del usuario B
4. Verificar acceso no autorizado

---

## Testing de Validación de Input

| Tipo de Inyección | Enfoque de Test |
|----------------|------------|
| SQL | Manipulación de query |
| NoSQL | Queries de documentos |
| Command | Comandos de sistema |
| LDAP | Queries de directorio |

**Enfoque:** Probar todos los parámetros, intentar type coercion, probar límites, verificar mensajes de error.

---

## Testing de Rate Limiting

| Aspecto | Check |
|--------|-------|
| Existencia | ¿Hay algún límite? |
| Bypass | Headers, rotación de IP |
| Scope | Por usuario, por IP, global |

**Técnicas de bypass:** X-Forwarded-For, diferentes métodos HTTP, variaciones de case, versionado de API.

---

## Seguridad GraphQL

| Test | Enfoque |
|------|-------|
| Introspección | Divulgación de schema |
| Batching | Query DoS |
| Nesting | DoS basado en profundidad |
| Autorización | Acceso a nivel de campo |

---

## Checklist de Testing de Seguridad

**Autenticación:**
- [ ] Probar bypass
- [ ] Verificar fortaleza de credenciales
- [ ] Verificar seguridad de token

**Autorización:**
- [ ] Probar BOLA/IDOR
- [ ] Verificar escalada de privilegios
- [ ] Verificar acceso a funciones

**Input:**
- [ ] Probar todos los parámetros
- [ ] Verificar inyecciones

**Config:**
- [ ] Verificar CORS
- [ ] Verificar headers
- [ ] Probar manejo de errores

---

> **Recuerda:** Las APIs son la columna vertebral de las apps modernas. Pruébalas como lo harán los atacantes.
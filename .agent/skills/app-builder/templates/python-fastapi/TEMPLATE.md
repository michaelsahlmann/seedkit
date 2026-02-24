---
name: python-fastapi
description: Principios de plantilla FastAPI REST API. SQLAlchemy, Pydantic, Alembic.
---

# Plantilla FastAPI API

## Stack Tech

| Componente | Tecnología |
|-----------|------------|
| Framework | FastAPI |
| Lenguaje | Python 3.11+ |
| ORM | SQLAlchemy 2.0 |
| Validación | Pydantic v2 |
| Migraciones | Alembic |
| Auth | JWT + passlib |

---

## Estructura de Directorios

```
nombre-proyecto/
├── alembic/             # Migraciones
├── app/
│   ├── main.py          # App FastAPI
│   ├── config.py        # Settings
│   ├── database.py      # Conexión DB
│   ├── models/          # Modelos SQLAlchemy
│   ├── schemas/         # Schemas Pydantic
│   ├── routers/         # Rutas API
│   ├── services/        # Lógica de negocio
│   ├── dependencies/    # DI
│   └── utils/
├── tests/
├── .env.example
└── requirements.txt
```

---

## Conceptos Clave

| Concepto | Descripción |
|---------|-------------|
| Async | async/await en todo |
| Dependency Injection | FastAPI Depends |
| Pydantic v2 | Validación + serialización |
| SQLAlchemy 2.0 | Sesiones async |

---

## Estructura API

| Capa | Responsabilidad |
|-------|---------------|
| Routers | Manejo HTTP |
| Dependencies | Auth, validación |
| Services | Lógica de negocio |
| Models | Entidades de base de datos |
| Schemas | Request/response |

---

## Pasos de Setup

1. `python -m venv venv`
2. `source venv/bin/activate`
3. `pip install fastapi uvicorn sqlalchemy alembic pydantic`
4. Crear `.env`
5. `alembic upgrade head`
6. `uvicorn app.main:app --reload`

---

## Mejores Prácticas

- Usar async en todo
- Pydantic v2 para validación
| SQLAlchemy 2.0 sesiones async
- Alembic para migraciones
- pytest-asyncio para tests
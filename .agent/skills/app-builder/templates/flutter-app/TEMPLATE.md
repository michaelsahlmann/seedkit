---
name: flutter-app
description: Principios de plantilla de app móvil Flutter. Riverpod, Go Router, clean architecture.
---

# Plantilla Flutter App

## Stack Tech

| Componente | Tecnología |
|-----------|------------|
| Framework | Flutter 3.x |
| Lenguaje | Dart 3.x |
| Estado | Riverpod 2.0 |
| Navegación | Go Router |
| HTTP | Dio |
| Storage | Hive |

---

## Estructura de Directorios

```
nombre_proyecto/
├── lib/
│   ├── main.dart
│   ├── app.dart
│   ├── core/
│   │   ├── constants/
│   │   ├── theme/
│   │   ├── router/
│   │   └── utils/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── data/
│   │   │   ├── domain/
│   │   │   └── presentation/
│   │   └── home/
│   ├── shared/
│   │   ├── widgets/
│   │   └── providers/
│   └── services/
│       ├── api/
│       └── storage/
├── test/
└── pubspec.yaml
```

---

## Capas de Arquitectura

| Capa | Contenidos |
|-------|----------|
| Presentation | Screens, Widgets, Providers |
| Domain | Entities, Use Cases |
| Data | Repositories, Models |

---

## Paquetes Clave

| Paquete | Propósito |
|---------|---------|
| flutter_riverpod | Manejo de estado |
| riverpod_annotation | Generación de código |
| go_router | Navegación |
| dio | Cliente HTTP |
| freezed | Modelos inmutables |
| hive | Almacenamiento local |

---

## Pasos de Setup

1. `flutter create {{name}} --org com.{{bundle}}`
2. Actualizar `pubspec.yaml`
3. `flutter pub get`
4. Ejecutar generación de código: `dart run build_runner build`
5. `flutter run`

---

## Mejores Prácticas

- Estructura de carpetas feature-first
- Riverpod para estado, patrón React Query para estado server
- Freezed para data classes inmutables
- Go Router para navegación declarativa
- Theming Material 3
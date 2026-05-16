# Memoria — Pack de Producción iOS / SwiftUI

## Contexto del dominio

Un desarrollador SwiftUI envía features componiendo structs pequeños de `View` que leen estado y devuelven más views. Día a día se mueven entre Xcode (el IDE), el Simulator (o un dispositivo real por cable), Instruments (para performance) y la UI web de App Store Connect (para builds, TestFlight y submission). La mayoría envía una app a la vez, muchas veces solos o en un equipo de dos o tres.

El ciclo de trabajo es: escribir una view, Cmd+R, ver el Canvas preview redibujar, arreglar un bug de layout, agregar estado, persistirlo con SwiftData, sincronizarlo vía CloudKit, escribir un snapshot test, subir a TestFlight, recibir feedback, iterar. Las partes lentas son: App Store Review (24-48 horas), build times en codebases grandes, y descifrar por qué una view de SwiftUI no se actualiza cuando esperabas que sí.

A los devs indies les importan los rankings del App Store, el ASO, los screenshots, las reviews y el loop de rejection-resubmission. A los devs de equipo les importa la arquitectura modular, la cobertura de tests, la velocidad de build y el onboarding de ingenieros nuevos sin un ritual de iniciación de "conocimiento tribal de Xcode".

## Vocabulario que la IA debe conocer

- **HIG**: Human Interface Guidelines — las reglas de diseño de Apple. Se actualizan anualmente en la WWDC.
- **WWDC**: Worldwide Developer Conference. Cada junio. Nuevo OS, nuevas APIs.
- **SF Symbols**: la librería de iconos de Apple, ~5,000 símbolos, disponible vía `Image(systemName: "heart.fill")`.
- **TestFlight**: la distribución beta de Apple. Hasta 100 testers internos, 10,000 externos. El build expira a los 90 días.
- **App Store Connect**: la UI web donde manejas builds, metadata, pricing, TestFlight, App Store Review.
- **`@Observable`**: macro de Swift (iOS 17+) que reemplaza `ObservableObject` + `@Published`. Trackea las lecturas de propiedades automáticamente.
- **SwiftData**: el framework de persistencia de Apple (iOS 17+), sucesor de Core Data. Clases `@Model`, lecturas `@Query`.
- **CloudKit**: el sync en la nube de Apple, gratis para usuarios, tier gratuito generoso (1GB/usuario). Se empareja con SwiftData vía `cloudKitDatabase: .automatic`.
- **modifier `.task`**: corre una tarea async con scope al lifetime de la view. Cancela en disappear.
- **Privacy manifest (`PrivacyInfo.xcprivacy`)**: un archivo XML que declara el uso de APIs required-reason y la recolección de datos de SDKs de terceros. Obligatorio para submission al App Store desde mayo 2024.
- **App Store Review Guidelines**: las reglas reales que los reviewers aplican. Las secciones 2 (Performance), 4 (Design), 5 (Legal) son donde ocurren la mayoría de los rechazos.
- **StoreKit 2**: la API moderna de in-app purchases. `Product`, `Transaction`, async-first.
- **ProMotion**: pantallas de 120Hz. Algunas animaciones necesitan `.animation(.smooth, value:)` explícito para sentirse bien.
- **Catalyst**: correr apps de iPad en Mac. Idioms distintos — pointer hover, menu bar, redimensionar ventanas.
- **visionOS**: el OS del headset. Apps volumétricas vs. ventana. No es lo mismo que iOS.

## Flujos comunes

- **Agregar una pantalla con persistencia**: definir un `@Model`, agregar una `View` con `@Query`, agregar un destino vía `NavigationLink(value:)`, conectarlo desde `.navigationDestination(for:)` del padre.
- **Agregar sync de CloudKit**: habilitar las capabilities CloudKit + Background Modes → poner `cloudKitDatabase: .automatic` en `ModelConfiguration` → hacer que todas las propiedades del modelo tengan default o sean opcionales → testear en dos dispositivos firmados al mismo iCloud.
- **Enviar a TestFlight**: subir el build number → Archive → upload vía Xcode Organizer → esperar el processing (~10 min) → agregar a internal testing → invitar testers → esperar feedback.
- **Enviar para App Store Review**: llenar la sección App Privacy → subir screenshots (6.7", 6.1", iPad 12.9" obligatorios) → escribir un What's New → enviar → responder las preguntas del reviewer en 24 horas.
- **Diagnosticar un bug de render de SwiftUI**: agregar `.id(value)` para forzar re-creación, o `let _ = Self._printChanges()` dentro del body para ver qué disparó el redraw.

## Qué evitar / errores comunes

- Mezclar `ObservableObject` y `@Observable` en el mismo proyecto sin razón. Elige uno — `@Observable` en iOS 17+.
- Escribir `Task { @MainActor in ... }` en todos lados en vez de marcar el modelo `@MainActor` una sola vez.
- Guardar valores derivados (`var fullName: String`) como `@State`. Calcúlalos. `var fullName: String { "\(first) \(last)" }`.
- Usar `GeometryReader` para layout cuando un `HStack` + `Spacer` + alignment guides alcanzarían. `GeometryReader` es un fallback, no un default.
- Force-unwrappear `URL(string: "https://...")`. Es opcional por una razón. Falla cerrado.
- Olvidar que SwiftUI re-crea todo el body de la view en cada cambio de estado — haz el body barato. Mueve los cómputos caros afuera.
- Hardcodear hex colors cuando el asset catalog soporta variantes light/dark + chequeadas con WCAG.
- Saltarse el privacy manifest porque "la app no recolecta datos". Si tocas `UserDefaults`, timestamps de `FileManager`, system boot time, o disk free space — API required-reason. Necesitas el manifest.

## Tono / registro

Un desarrollador iOS real habla en términos de "shipping" y "el build". Citan sesiones de WWDC por número ("la sesión sobre observation, 10149"). Desconfían de dependencias de terceros porque cada una agrega riesgo de App Store. Prefieren los frameworks de Apple aun cuando estén ásperos. Dicen "el Simulator está mintiendo" cuando algo funciona en device pero no en el preview de Xcode. Usan Logger antes que print. Ya los lastimó la confusión del lifecycle del AppDelegate. Te van a decir absolutamente que SwiftUI es mejor que UIKit para trabajo nuevo, y después calladamente escribirán un bridge de UIKit cuando el text view de SwiftUI no alcance.

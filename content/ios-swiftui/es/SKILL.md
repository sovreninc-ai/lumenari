# Pack de Producción iOS / SwiftUI

> La doc de Apple cubre la API. Este kit cubre las decisiones: cuándo usar `@Observable` vs. environment, dónde se rompe SwiftData a escala, qué está revisando realmente el reviewer del App Store, y los gotchas de SwiftUI que envían en cada release.

**Optimizado para:** Claude · Claude Code · Cursor.

---

## Modo de operación

Estás haciendo pair programming en una app SwiftUI de producción destinada al App Store. Supuestos por defecto:

- **Swift 5.9+** y la **macro `@Observable`**. Nada de `ObservableObject` / `@Published` salvo que el target deployment lo obligue.
- **NavigationStack**, no el deprecado `NavigationView`.
- **SwiftData** para persistencia local. **CloudKit** para sync cross-device gratis vía el modifier `cloudKitDatabase` en el model container.
- **Concurrencia estructurada** — `async`/`await`, `Task`, actors. Nada de `DispatchQueue.main.async` salvo que estés dentro de una API por callback.
- **El privacy manifest (`PrivacyInfo.xcprivacy`) no es opcional** desde mayo 2024. Los reviewers rechazan sin él.
- **Las App Store Review Guidelines son la spec.** Si la IA sugiere algo que falla la 2.1, 4.2 o 5.1.1, empújalo de vuelta.

Si el usuario pide código que parezca Android o React Native — `Provider`, `BLoC`, observable subjects, prop drilling — tradúcelo al idiom de Swift. SwiftUI premia pensar en views + state + environment, no en streams.

---

## El modelo mental

```
[ View (struct, value type) ]
        │
        ├── @State para verdad local a la view
        ├── @Bindable para binding bidireccional a un modelo @Observable
        ├── @Environment(\.thing) para dependencias ambient
        └── @Query para lecturas de SwiftData (vivas, observadas)

[ Model (class, @Observable) ]
        │
        └── Tiene el estado de negocio. Mutado solo vía métodos.

[ ModelContainer (SwiftData) ]
        │
        └── Uno por app, configurado en @main. CloudKit-enabled o no.
```

La view es una función del estado. No guardes valores derivados — calcúlalos. No pelees con el layout system — usa `Layout` o `GeometryReader` solo cuando agotaste stacks + alignment guides.

---

## El ejemplo canónico view + model + SwiftData

Esta es la forma que la IA debería seguir para cualquier pedido de "agregar una feature con persistencia y una pantalla".

```swift
// MARK: - Model
import SwiftData

@Model
final class Workout {
    var id: UUID
    var title: String
    var startedAt: Date
    var durationSeconds: Int
    var notes: String

    init(title: String, durationSeconds: Int = 0, notes: String = "") {
        self.id = UUID()
        self.title = title
        self.startedAt = .now
        self.durationSeconds = durationSeconds
        self.notes = notes
    }
}

// MARK: - ViewModel (solo cuando la lógica > "setear una propiedad")
@Observable
final class WorkoutEditor {
    var title: String = ""
    var duration: Int = 0
    var notes: String = ""

    var isValid: Bool {
        !title.trimmingCharacters(in: .whitespaces).isEmpty && duration > 0
    }

    func build() -> Workout {
        Workout(title: title, durationSeconds: duration, notes: notes)
    }
}

// MARK: - View
struct WorkoutListView: View {
    @Environment(\.modelContext) private var context
    @Query(sort: \Workout.startedAt, order: .reverse) private var workouts: [Workout]
    @State private var showingEditor = false

    var body: some View {
        NavigationStack {
            List {
                ForEach(workouts) { workout in
                    NavigationLink(value: workout) {
                        WorkoutRow(workout: workout)
                    }
                }
                .onDelete(perform: delete)
            }
            .navigationTitle("Workouts")
            .navigationDestination(for: Workout.self) { WorkoutDetailView(workout: $0) }
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button("Add", systemImage: "plus") { showingEditor = true }
                }
            }
            .sheet(isPresented: $showingEditor) {
                WorkoutEditorView()
            }
            .overlay {
                if workouts.isEmpty {
                    ContentUnavailableView(
                        "No workouts yet",
                        systemImage: "figure.run",
                        description: Text("Tap Add to log your first one.")
                    )
                }
            }
        }
    }

    private func delete(at offsets: IndexSet) {
        for index in offsets {
            context.delete(workouts[index])
        }
    }
}

struct WorkoutEditorView: View {
    @Environment(\.modelContext) private var context
    @Environment(\.dismiss) private var dismiss
    @State private var editor = WorkoutEditor()

    var body: some View {
        NavigationStack {
            Form {
                TextField("Title", text: $editor.title)
                Stepper("Duration: \(editor.duration) min",
                        value: $editor.duration, in: 0...240, step: 5)
                TextField("Notes", text: $editor.notes, axis: .vertical)
                    .lineLimit(3...6)
            }
            .navigationTitle("New Workout")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        context.insert(editor.build())
                        dismiss()
                    }
                    .disabled(!editor.isValid)
                }
            }
        }
    }
}
```

Algunos no-negociables en esta forma:

1. **`@Query` no `FetchRequest`.** La lectura reactiva de SwiftData.
2. **`NavigationLink(value:)` + `.navigationDestination`** — el patrón de nav value-driven. No uses el init deprecado que toma una destination view directamente.
3. **`ContentUnavailableView`** para empty states. Los reviewers notan cuando una app tiene una pantalla en blanco sin explicación.
4. **`@Bindable` no hace falta acá** porque el editor es `@State`-owned y se accede vía `$editor.title`. Usa `@Bindable` cuando un modelo `@Observable` se pasa a una child view.

---

## El setup de `@main` (CloudKit-ready)

```swift
import SwiftUI
import SwiftData

@main
struct WorkoutsApp: App {
    let container: ModelContainer

    init() {
        do {
            let config = ModelConfiguration(
                schema: Schema([Workout.self]),
                isStoredInMemoryOnly: false,
                cloudKitDatabase: .automatic   // usa el container en entitlements
            )
            container = try ModelContainer(for: Workout.self, configurations: config)
        } catch {
            fatalError("Failed to create ModelContainer: \(error)")
        }
    }

    var body: some Scene {
        WindowGroup {
            WorkoutListView()
        }
        .modelContainer(container)
    }
}
```

Gotchas de CloudKit sobre los que la IA debería avisar:

- Cada propiedad en un `@Model` tiene que tener un default O ser opcional cuando CloudKit está activo. CloudKit no soporta campos required-on-create-only.
- Sin constraints únicos en modelos sincronizados con CloudKit. Aplica la unicidad en código.
- Las relaciones tienen que ser opcionales o tener un default. Las relaciones inversas son obligatorias.
- El ID del container de CloudKit en entitlements tiene que matchear el bundle ID exactamente. `iCloud.com.yourdomain.workouts`.

---

## Concurrencia — las reglas que importan

```swift
// Bueno: concurrencia estructurada, aislamiento en MainActor donde vive la UI.
@Observable
@MainActor
final class FeedLoader {
    var items: [FeedItem] = []
    var isLoading = false
    var error: Error?

    func load() async {
        isLoading = true
        defer { isLoading = false }
        do {
            items = try await FeedAPI.fetch()
        } catch {
            self.error = error
        }
    }
}

// En la view:
.task { await loader.load() }
```

Reglas:

1. **`.task` cancela cuando la view se va.** Úsalo para trabajo async con scope de pantalla. No lances `Task { }` desde `.onAppear` salvo que tengas razón.
2. **`@MainActor` en el modelo** si lo lee SwiftUI. Sáltate las danzas manuales de `await MainActor.run { }`.
3. **Actors para estado mutable compartido** fuera de la UI — un cache, un manager de websocket. No para view models.
4. **`async let` para trabajo en paralelo**, `withTaskGroup` para fan-out dinámico, `Task.detached` solo cuando realmente necesitas un dominio de aislamiento separado (casi nunca).

---

## Accesibilidad — las cuatro cosas que los reviewers chequean

1. **Labels de VoiceOver.** Los botones solo-ícono necesitan `.accessibilityLabel("Add workout")`. Los SF Symbols no llevan significado a VoiceOver.
2. **Dynamic Type.** Usa `.font(.body)`, `.font(.headline)`. No hardcodees `.system(size: 17)`. Prueba en AX5 (el tamaño de accesibilidad más grande).
3. **Contraste.** Usa `Color.primary`, `Color.secondary`, colores semánticos. Los colores custom tienen que cumplir WCAG AA (4.5:1 para body text).
4. **Reduced motion.** Envuelve las animaciones grandes en `@Environment(\.accessibilityReduceMotion)` y ofrece un fallback de cross-fade.

---

## Lo que este kit rechaza

- Sugerir `ObservableObject` + `@Published` cuando se apunta a iOS 17+. Usa `@Observable`.
- Escribir `NavigationView` en código nuevo. Está deprecado.
- Usar publishers de `Combine` para view state. SwiftUI tiene su propio sistema de observación.
- Saltarse el privacy manifest. Las apps sin `PrivacyInfo.xcprivacy` son rechazadas si llaman APIs required-reason (file timestamp, user defaults, system boot time, disk space, active keyboards).
- Recomendar `force-unwrap` en URLs, nombres de assets o IDs de modelo. Usa `URL(string:)` devolviendo optional, falla cerrado.
- Escribir tests que peguen a la red real. Mockea la capa de API.

---

## Docs complementarios

- `patterns/swiftui-idioms.md` — Observable, environment, navigation, sheets, la lista de gotchas de SwiftUI
- `patterns/swiftdata-cloudkit.md` — schemas, relaciones, predicates, migración, entitlements de CloudKit
- `checklists/app-store-readiness.md` — privacy manifest, screenshots, App Privacy details, TestFlight, razones comunes de rechazo

---

## Checklist de sanity antes de mergear cualquier PR de SwiftUI

- [ ] Todas las views son `struct`, todos los modelos son `final class`
- [ ] Sin `ObservableObject` en código que apunte a iOS 17+
- [ ] `NavigationStack` en todos lados, no `NavigationView`
- [ ] El trabajo async usa `.task`, no `Task { }` en `.onAppear`
- [ ] Los empty states renderizan `ContentUnavailableView`
- [ ] Labels de VoiceOver en botones solo-ícono
- [ ] Dynamic Type funciona en AX5 sin truncamiento
- [ ] El privacy manifest existe y lista cada API required-reason usada
- [ ] Sin `print(...)` dejado en código de envío — usa `Logger`

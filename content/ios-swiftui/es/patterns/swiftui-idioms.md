# Idioms de SwiftUI

Los patrones que aparecen en cada codebase de SwiftUI, y los gotchas que muerden en cada release. Escritos asumiendo Swift 5.9+ e iOS 17+ como piso.

---

## State, observación y binding — qué usar

| Situación | Usa |
| --- | --- |
| Una view es dueña de un poco de state que nadie más necesita | `@State` |
| Una child view necesita mutar el `@State` del padre | Pasa `$value` como `Binding` |
| Un view-model con propiedades computadas o métodos | `@Observable final class` + `@State private var vm = VM()` |
| Un view-model del cual el padre es dueño, usado por el child para binding bidireccional | Padre: `@State var vm = VM()`. Child: `@Bindable var vm: VM` |
| Dependencia ambient (p. ej., una sesión, un theme) | `@Environment(\.thing)` + extensión de `EnvironmentValues` |
| Leer filas de SwiftData | `@Query(sort: \Model.field, order: .reverse) var items: [Model]` |
| UserDefaults reactivo | `@AppStorage("key") var thing: String = "default"` |
| Leer un objeto de SwiftData pasado desde un padre | Propiedad: `var item: Item` (lectura) o `@Bindable var item: Item` (escritura) |

Error común: usar `@StateObject` en iOS 17+. Con `@Observable`, el pairing correcto es `@State` (para ownership) + `@Bindable` (para binding bidireccional en un child). `@StateObject` es para el mundo viejo de `ObservableObject`.

---

## Navegación — value-driven, no view-driven

```swift
struct RootView: View {
    @State private var path = NavigationPath()

    var body: some View {
        NavigationStack(path: $path) {
            List {
                NavigationLink("Settings", value: Route.settings)
                NavigationLink("Profile", value: Route.profile(userID: currentUser.id))
            }
            .navigationDestination(for: Route.self) { route in
                switch route {
                case .settings: SettingsView()
                case .profile(let id): ProfileView(userID: id)
                }
            }
        }
    }
}

enum Route: Hashable {
    case settings
    case profile(userID: UUID)
}
```

Por qué: la navegación programática se vuelve trivial (`path.append(Route.profile(...))`), el deep linking es solo un decoder de `NavigationPath`, y el deprecado `NavigationLink(destination:)` desapareció.

Para sheets y full-screen covers: usa `.sheet(item:)` con un Identifiable opcional, no `.sheet(isPresented:)` más un `@State` lateral para el item.

```swift
@State private var editing: Workout?

// ...
.sheet(item: $editing) { workout in
    WorkoutEditor(workout: workout)
}
```

---

## Sheets que necesitan mutar al padre

```swift
struct ParentView: View {
    @State private var name = ""
    @State private var showingEditor = false

    var body: some View {
        VStack {
            Text(name)
            Button("Edit") { showingEditor = true }
        }
        .sheet(isPresented: $showingEditor) {
            NameEditor(name: $name)
        }
    }
}

struct NameEditor: View {
    @Binding var name: String
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        Form {
            TextField("Name", text: $name)
        }
        .toolbar {
            ToolbarItem(placement: .confirmationAction) {
                Button("Done") { dismiss() }
            }
        }
    }
}
```

No pases un closure callback como `onSave: (String) -> Void`. Los bindings son la forma SwiftUI.

---

## Lists — performance + UX

```swift
List {
    ForEach(workouts) { workout in
        WorkoutRow(workout: workout)
    }
    .onDelete { offsets in
        for i in offsets { context.delete(workouts[i]) }
    }
}
.listStyle(.insetGrouped)
.refreshable {
    await viewModel.reload()
}
.searchable(text: $query)
```

Gotchas:

- **No pongas cómputos caros adentro del row.** Calcula una vez en el modelo.
- **`Identifiable` importa.** Si los items no tienen IDs estables, `ForEach` redibuja todo.
- **`.refreshable` es async.** No dispares un `Task { }` — `await` directo.
- **`LazyVStack` dentro de un `ScrollView`** es la alternativa cuando necesitas más control de layout que el que da `List`. List es más rápido y bonito por default — úsalo salvo que tengas razón.

---

## Forms — los primitivos correctos

```swift
Form {
    Section("Basics") {
        TextField("Title", text: $title)
        DatePicker("Date", selection: $date, displayedComponents: .date)
        Toggle("Reminder", isOn: $reminder)
    }
    Section("Notes") {
        TextField("Notes", text: $notes, axis: .vertical)
            .lineLimit(3...8)
    }
    if !isValid {
        Section { } footer: {
            Text("Title is required.")
                .foregroundStyle(.red)
        }
    }
}
.scrollDismissesKeyboard(.interactively)
.toolbar {
    ToolbarItemGroup(placement: .keyboard) {
        Spacer()
        Button("Done") { focusedField = nil }
    }
}
```

`Form` te da el look inset grouped gratis. Usa headers y footers de `Section` para hints y mensajes de validación. Esconde el teclado con `.scrollDismissesKeyboard(.interactively)`.

---

## Animaciones — los cuatro modifiers que vale la pena conocer

| Modifier | Usa cuando |
| --- | --- |
| `.animation(.smooth, value: state)` | Animar cuando `state` cambia (preferido desde iOS 17) |
| `withAnimation { state = ... }` | Animar una mutación de state específica |
| `.transition(.move(edge: .bottom))` | Animación de insert/remove para una view condicional |
| `.matchedGeometryEffect(id:in:)` | Animaciones hero entre dos views |

Respeta reduced motion:

```swift
@Environment(\.accessibilityReduceMotion) var reduceMotion

// ...
.animation(reduceMotion ? .none : .smooth, value: state)
```

---

## Gotchas que envían en cada release

1. **El body de la view corre muchas veces.** No pongas debug con `print(...)` ahí — usa `let _ = Self._printChanges()`, que logea *por qué* pasó un redraw.

2. **Los inicializadores de `@State` corren una vez, no por redraw.** `@State private var thing = expensiveCompute()` está bien. Pero si `expensiveCompute()` depende de una prop pasada a la view, no se va a re-correr cuando la prop cambie — usa `.onChange(of: prop)` o pasa a un view-model.

3. **`if let` en bodies de views es sintaxis de unwrap, no un shortcut de binding.** Para bindear a un opcional, usa `Binding(get:set:)` o los nuevos patrones `$value.unwrapped` vía property wrappers custom.

4. **Las lecturas de `@Environment` tienen que matchear el tipo exactamente.** `@Environment(\.modelContext)` devuelve `ModelContext`. `@Environment(\.dismiss)` devuelve `DismissAction`. Los environment values custom necesitan que tanto la key como el value type se alineen.

5. **La cancelación de `Task` es cooperativa.** Dentro de una función async, llama a `try Task.checkCancellation()` en los puntos de iteración. El modifier `.task` de SwiftUI cancela por ti cuando la view desaparece, pero solo si chequeas.

6. **TextField con `axis: .vertical` necesita `lineLimit(_...:)`** para que realmente crezca. El default es una sola línea.

7. **`onAppear` corre una vez. `onChange` corre en cada cambio.** Si necesitas ambos, usa `.task(id:)` — corre en appear y se re-corre cuando el id cambia.

8. **Evita `GeometryReader` para dimensionar children.** Se expande para llenar el espacio disponible y frecuentemente rompe el layout. Prefiere el protocolo `Layout` o alignment guides para layout custom.

---

## Cheat sheet de placements de toolbar

| Placement | Qué hace |
| --- | --- |
| `.primaryAction` | Botón primario arriba a la derecha (Add, Save) |
| `.confirmationAction` | Confirmación de sheet/modal (Done, Save) |
| `.cancellationAction` | Cancel de sheet/modal |
| `.navigation` | Área del back-button, lado izquierdo |
| `.topBarLeading` / `.topBarTrailing` | Posicionamiento explícito cuando hace falta |
| `.keyboard` | Encima del teclado (botón Done para text fields) |
| `.bottomBar` | Toolbar de abajo (iOS) |

No pongas un botón en `.navigation` si es una acción primaria. Usa `.primaryAction`.

---

## Cuándo SwiftUI no alcanza

Los bridges a UIKit a veces son la jugada correcta. Usa `UIViewRepresentable` o `UIViewControllerRepresentable`:

- Un text view custom con render de attributed string que nadie matchea en SwiftUI
- Picker de cámara o foto (aunque los wrappers de SwiftUI de `PhotosPicker` + `AVCaptureSession` cubren la mayoría)
- Un SDK de terceros que expone un `UIView` o `UIViewController` y se niega a ser reemplazado

No bridgees por cosas que SwiftUI ya maneja nativamente: maps (`Map`), web views (`WebView` viene, bridge a `WKWebView` hasta entonces), photo picker (`PhotosPicker`), share sheet (`ShareLink`).

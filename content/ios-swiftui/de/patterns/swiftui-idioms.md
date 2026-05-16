# SwiftUI-Idiome

Die Patterns, die in jeder SwiftUI-Codebasis auftauchen, und die Gotchas, die bei jedem Release beißen. Geschrieben unter der Annahme Swift 5.9+ und iOS 17+ als Boden.

---

## State, Observation und Binding — wozu greifen

| Situation | Greife zu |
| --- | --- |
| Eine View besitzt ein kleines Stück State, das niemand sonst braucht | `@State` |
| Eine Child-View muss den `@State` eines Parents mutieren | `$value` als `Binding` weitergeben |
| Ein View-Model mit Computed Properties oder Methods | `@Observable final class` + `@State private var vm = VM()` |
| Ein View-Model, vom Parent besessen, vom Child für Two-Way-Binding genutzt | Parent: `@State var vm = VM()`. Child: `@Bindable var vm: VM` |
| Ambient Dependency (z.B. eine Session, ein Theme) | `@Environment(\.thing)` + `EnvironmentValues`-Extension |
| SwiftData-Zeilen lesen | `@Query(sort: \Model.field, order: .reverse) var items: [Model]` |
| Reaktive UserDefaults | `@AppStorage("key") var thing: String = "default"` |
| Ein SwiftData-Objekt lesen, das von einem Parent reingereicht wird | Property: `var item: Item` (Read) oder `@Bindable var item: Item` (Write) |

Häufiger Fehler: `@StateObject` in iOS 17+ nutzen. Mit `@Observable` ist die korrekte Paarung `@State` (für Ownership) + `@Bindable` (für Two-Way-Binding in einem Child). `@StateObject` ist für die alte `ObservableObject`-Welt.

---

## Navigation — wert-getrieben, nicht view-getrieben

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

Warum: programmatische Navigation wird trivial (`path.append(Route.profile(...))`), Deep-Linking ist nur ein `NavigationPath`-Decoder, und der deprecated `NavigationLink(destination:)` ist weg.

Für Sheets und Full-Screen-Covers: nutze `.sheet(item:)` mit einem optionalen Identifiable, nicht `.sheet(isPresented:)` plus ein Side-`@State` für das Item.

```swift
@State private var editing: Workout?

// ...
.sheet(item: $editing) { workout in
    WorkoutEditor(workout: workout)
}
```

---

## Sheets, die den Parent mutieren müssen

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

Reiche keinen Closure-Callback wie `onSave: (String) -> Void` durch. Bindings sind der SwiftUI-Weg.

---

## Lists — Performance + UX

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

- **Setze keine teuren Berechnungen in die Row.** Berechne einmal im Model.
- **`Identifiable` zählt.** Wenn Items keine stabilen IDs haben, redraws `ForEach` alles.
- **`.refreshable` ist async.** Kicke kein `Task { }` ab — `await` direkt.
- **`LazyVStack` innerhalb eines `ScrollView`** ist die Alternative, wenn du mehr Layout-Kontrolle brauchst, als `List` bietet. List ist standardmäßig schneller und schöner — nutze es, außer du hast einen Grund.

---

## Formulare — die richtigen Primitives

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

`Form` gibt dir das Inset-Grouped-Look kostenlos. Nutze `Section`-Header und -Footer für Hints und Validation-Messages. Verstecke die Tastatur mit `.scrollDismissesKeyboard(.interactively)`.

---

## Animationen — die vier wissenswerten Modifier

| Modifier | Nutzen, wenn |
| --- | --- |
| `.animation(.smooth, value: state)` | Animieren, wenn `state` sich ändert (bevorzugt seit iOS 17) |
| `withAnimation { state = ... }` | Eine spezifische State-Mutation animieren |
| `.transition(.move(edge: .bottom))` | Insert/Remove-Animation für eine bedingte View |
| `.matchedGeometryEffect(id:in:)` | Hero-Animationen zwischen zwei Views |

Respektiere Reduced Motion:

```swift
@Environment(\.accessibilityReduceMotion) var reduceMotion

// ...
.animation(reduceMotion ? .none : .smooth, value: state)
```

---

## Gotchas, die jedes Release mitliefern

1. **Der View-Body läuft viele Male.** Setze dort kein `print(...)`-Debugging — nutze stattdessen `let _ = Self._printChanges()`, das loggt, *warum* ein Redraw passierte.

2. **`@State`-Initialisierer laufen einmal, nicht pro Redraw.** `@State private var thing = expensiveCompute()` ist okay. Aber wenn `expensiveCompute()` von einem in die View weitergegebenen Prop abhängt, läuft es nicht erneut, wenn der Prop sich ändert — nutze `.onChange(of: prop)` oder verschiebe zu einem View-Model.

3. **`if let` in View-Bodies ist Unwrapping-Syntax, kein Binding-Shortcut.** Um an ein Optional zu binden, nutze `Binding(get:set:)` oder die neuen `$value.unwrapped`-Patterns via Custom-Property-Wrapper.

4. **`@Environment`-Reads müssen den Type exakt matchen.** `@Environment(\.modelContext)` returnt `ModelContext`. `@Environment(\.dismiss)` returnt `DismissAction`. Custom-Environment-Values brauchen sowohl Key als auch Value-Type, die übereinstimmen.

5. **`Task`-Cancellation ist kooperativ.** Innerhalb einer Async-Function, rufe `try Task.checkCancellation()` an Iterations-Points auf. SwiftUIs `.task`-Modifier cancelt für dich, wenn die View disappeared, aber nur wenn du checkst.

6. **TextField mit `axis: .vertical` braucht `lineLimit(_...:)`**, damit es tatsächlich wächst. Default ist Single-Line.

7. **`onAppear` läuft einmal. `onChange` läuft bei jeder Änderung.** Wenn du beide brauchst, nutze `.task(id:)` — es läuft beim Appear und re-läuft, wenn die id sich ändert.

8. **Vermeide `GeometryReader` fürs Sizing von Children.** Es expandiert, um verfügbaren Platz zu füllen, und bricht häufig das Layout. Bevorzuge das `Layout`-Protokoll oder Alignment-Guides für Custom-Layout.

---

## Toolbar-Placement-Cheat-Sheet

| Placement | Was es tut |
| --- | --- |
| `.primaryAction` | Top-Right Primary-Button (Add, Save) |
| `.confirmationAction` | Sheet/Modal-Confirmation (Done, Save) |
| `.cancellationAction` | Sheet/Modal-Cancel |
| `.navigation` | Back-Button-Area, linke Seite |
| `.topBarLeading` / `.topBarTrailing` | Explizites Positioning, wenn nötig |
| `.keyboard` | Über der Tastatur (Done-Button für Text-Fields) |
| `.bottomBar` | Bottom-Toolbar (iOS) |

Setze keinen Button in `.navigation`, wenn er eine Primary-Action ist. Nutze `.primaryAction`.

---

## Wenn SwiftUI nicht genug ist

Brücken zu UIKit sind manchmal die richtige Wahl. Nutze `UIViewRepresentable` oder `UIViewControllerRepresentable`:

- Eine Custom Text-View mit Attributed-String-Rendering, das niemand in SwiftUI matchen kann
- Kamera oder Photo-Picker (obwohl `PhotosPicker` + `AVCaptureSession` SwiftUI-Wrapper die meisten Cases abdecken)
- Ein Third-Party-SDK, das eine `UIView` oder `UIViewController` exposed und sich weigert, ersetzt zu werden

Brücke nicht für Dinge, die SwiftUI jetzt nativ handhabt: Maps (`Map`), Web-Views (`WebView` kommt, `WKWebView`-Brücke bis dahin), Photo-Picker (`PhotosPicker`), Share-Sheet (`ShareLink`).

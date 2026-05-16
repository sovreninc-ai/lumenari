# SwiftUI Idioms

The patterns that show up in every SwiftUI codebase, and the gotchas that bite at every release. Written assuming Swift 5.9+ and iOS 17+ as the floor.

---

## State, observation, and binding — what to reach for

| Situation | Reach for |
| --- | --- |
| A view owns a small piece of state nobody else needs | `@State` |
| A child view needs to mutate a parent's `@State` | Pass `$value` as a `Binding` |
| A view-model with computed properties or methods | `@Observable final class` + `@State private var vm = VM()` |
| A view-model owned by the parent, used by the child for two-way binding | Parent: `@State var vm = VM()`. Child: `@Bindable var vm: VM` |
| Ambient dependency (e.g. a session, a theme) | `@Environment(\.thing)` + `EnvironmentValues` extension |
| Reading SwiftData rows | `@Query(sort: \Model.field, order: .reverse) var items: [Model]` |
| Reactive UserDefaults | `@AppStorage("key") var thing: String = "default"` |
| Reading a SwiftData object passed in from a parent | Property: `var item: Item` (read) or `@Bindable var item: Item` (write) |

Common mistake: using `@StateObject` in iOS 17+. With `@Observable`, the correct pairing is `@State` (for ownership) + `@Bindable` (for two-way binding in a child). `@StateObject` is for the old `ObservableObject` world.

---

## Navigation — value-driven, not view-driven

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

Why: programmatic navigation becomes trivial (`path.append(Route.profile(...))`), deep linking is just a `NavigationPath` decoder, and the deprecated `NavigationLink(destination:)` is gone.

For sheets and full-screen covers: use `.sheet(item:)` with an optional Identifiable, not `.sheet(isPresented:)` plus a side `@State` for the item.

```swift
@State private var editing: Workout?

// ...
.sheet(item: $editing) { workout in
    WorkoutEditor(workout: workout)
}
```

---

## Sheets that need to mutate the parent

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

Don't pass a closure callback like `onSave: (String) -> Void`. Bindings are the SwiftUI way.

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

- **Don't put expensive computations inside the row.** Compute once in the model.
- **`Identifiable` matters.** If items lack stable IDs, `ForEach` redraws everything.
- **`.refreshable` is async.** Don't kick off a `Task { }` — just `await` directly.
- **`LazyVStack` inside a `ScrollView`** is the alternative when you need more layout control than `List` provides. List is faster and prettier by default — use it unless you have a reason.

---

## Forms — the right primitives

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

`Form` gives you the inset grouped look for free. Use `Section` headers and footers for hints and validation messages. Hide the keyboard with `.scrollDismissesKeyboard(.interactively)`.

---

## Animations — the four modifiers worth knowing

| Modifier | Use when |
| --- | --- |
| `.animation(.smooth, value: state)` | Animate when `state` changes (preferred since iOS 17) |
| `withAnimation { state = ... }` | Animate a specific state mutation |
| `.transition(.move(edge: .bottom))` | Insert/remove animation for a conditional view |
| `.matchedGeometryEffect(id:in:)` | Hero animations between two views |

Respect reduced motion:

```swift
@Environment(\.accessibilityReduceMotion) var reduceMotion

// ...
.animation(reduceMotion ? .none : .smooth, value: state)
```

---

## Gotchas that ship every release

1. **The view body runs many times.** Don't put `print(...)` debugging there — use `let _ = Self._printChanges()` instead, which logs *why* a redraw happened.

2. **`@State` initializers run once, not per redraw.** `@State private var thing = expensiveCompute()` is fine. But if `expensiveCompute()` depends on a prop passed into the view, it won't re-run when the prop changes — use `.onChange(of: prop)` or move to a view-model.

3. **`if let` in view bodies is unwrapping syntax, not a binding shortcut.** To bind to an optional, use `Binding(get:set:)` or the new `$value.unwrapped` patterns via custom property wrappers.

4. **`@Environment` reads must match the type exactly.** `@Environment(\.modelContext)` returns `ModelContext`. `@Environment(\.dismiss)` returns `DismissAction`. Custom environment values need both the key and the value type to align.

5. **`Task` cancellation is cooperative.** Inside an async function, call `try Task.checkCancellation()` at iteration points. SwiftUI's `.task` modifier cancels for you when the view disappears, but only if you check.

6. **TextField with `axis: .vertical` needs `lineLimit(_...:)`** for it to actually grow. Default is single-line.

7. **`onAppear` runs once. `onChange` runs on every change.** If you need both, use `.task(id:)` — it runs on appear and re-runs when the id changes.

8. **Avoid `GeometryReader` for sizing children.** It expands to fill available space and frequently breaks layout. Prefer `Layout` protocol or alignment guides for custom layout.

---

## Toolbar placement cheat sheet

| Placement | What it does |
| --- | --- |
| `.primaryAction` | Top-right primary button (Add, Save) |
| `.confirmationAction` | Sheet/modal confirmation (Done, Save) |
| `.cancellationAction` | Sheet/modal cancel |
| `.navigation` | Back-button area, left side |
| `.topBarLeading` / `.topBarTrailing` | Explicit positioning when needed |
| `.keyboard` | Above the keyboard (Done button for text fields) |
| `.bottomBar` | Bottom toolbar (iOS) |

Don't put a button in `.navigation` if it's a primary action. Use `.primaryAction`.

---

## When SwiftUI isn't enough

Bridges to UIKit are sometimes the right call. Use `UIViewRepresentable` or `UIViewControllerRepresentable`:

- A custom text view with attributed string rendering nobody can match in SwiftUI
- Camera or photo picker (though `PhotosPicker` + `AVCaptureSession` SwiftUI wrappers cover most cases)
- A third-party SDK that exposes a `UIView` or `UIViewController` and refuses to be replaced

Don't bridge for things SwiftUI now handles natively: maps (`Map`), web views (`WebView` coming, `WKWebView` bridge until then), photo picker (`PhotosPicker`), share sheet (`ShareLink`).

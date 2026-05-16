# iOS / SwiftUI Production Pack

> The Apple docs cover the API. This kit covers the decisions: when to use `@Observable` vs. environment, where SwiftData breaks down at scale, what the App Store reviewer is actually checking, and the SwiftUI gotchas that ship every release.

**Optimized for:** Claude · Claude Code · Cursor.

---

## Operating mode

You are pairing on a production SwiftUI app destined for the App Store. Default assumptions:

- **Swift 5.9+** and the **`@Observable` macro**. No `ObservableObject` / `@Published` unless the target deployment forces it.
- **NavigationStack**, not the deprecated `NavigationView`.
- **SwiftData** for local persistence. **CloudKit** for free cross-device sync via the `cloudKitDatabase` modifier on the model container.
- **Structured concurrency** — `async`/`await`, `Task`, actors. No `DispatchQueue.main.async` unless you're inside a callback API.
- **Privacy manifest (`PrivacyInfo.xcprivacy`) is non-optional** as of May 2024. Reviewers will reject without it.
- **App Store Review Guidelines** are the spec. If the AI suggests something that fails 2.1, 4.2, or 5.1.1, push back.

If the user asks for code that looks like Android or React Native — `Provider`, `BLoC`, observable subjects, prop drilling — translate it to the Swift idiom instead. SwiftUI rewards thinking in views + state + environment, not in streams.

---

## The mental model

```
[ View (struct, value type) ]
        │
        ├── @State for view-local truth
        ├── @Bindable for two-way binding to an @Observable model
        ├── @Environment(\.thing) for ambient dependencies
        └── @Query for SwiftData reads (live, observed)

[ Model (class, @Observable) ]
        │
        └── Holds business state. Mutated only via methods.

[ ModelContainer (SwiftData) ]
        │
        └── One per app, configured at @main. CloudKit-enabled or not.
```

The view is a function of state. Don't store derived values — compute them. Don't fight the layout system — use `Layout` or `GeometryReader` only when you've exhausted stacks + alignment guides.

---

## The canonical view + model + SwiftData example

This is the shape the AI should follow for any "add a feature with persistence and a screen" request.

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

// MARK: - ViewModel (only when logic > "set a property")
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

A few non-negotiables in this shape:

1. **`@Query` not `FetchRequest`.** SwiftData's reactive read.
2. **`NavigationLink(value:)` + `.navigationDestination`** — the value-driven nav pattern. Don't use the deprecated init that takes a destination view directly.
3. **`ContentUnavailableView`** for empty states. Reviewers notice when an app has a blank screen with no explanation.
4. **`@Bindable` is not needed here** because the editor is `@State`-owned and accessed via `$editor.title`. Use `@Bindable` when an `@Observable` model is passed into a child view.

---

## The `@main` setup (CloudKit-ready)

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
                cloudKitDatabase: .automatic   // uses the container in entitlements
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

CloudKit gotchas the AI should warn about:

- Every property on a `@Model` must have a default value OR be optional when CloudKit is on. CloudKit doesn't support required-on-create-only fields.
- No unique constraints on CloudKit-synced models. Enforce uniqueness in code.
- Relationships must be optional or have a default. Inverse relationships are mandatory.
- The CloudKit container ID in entitlements has to match the bundle ID exactly. `iCloud.com.yourdomain.workouts`.

---

## Concurrency — the rules that matter

```swift
// Good: structured concurrency, MainActor isolation where the UI lives.
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

// In the view:
.task { await loader.load() }
```

Rules:

1. **`.task` cancels when the view goes away.** Use it for screen-scoped async work. Don't spawn `Task { }` from `.onAppear` unless you have a reason.
2. **`@MainActor` on the model** if it's read by SwiftUI. Skip the manual `await MainActor.run { }` dances.
3. **Actors for shared mutable state** outside the UI — a cache, a websocket manager. Not for view models.
4. **`async let` for parallel work**, `withTaskGroup` for dynamic fan-out, `Task.detached` only when you really need a separate isolation domain (almost never).

---

## Accessibility — the four things reviewers spot-check

1. **VoiceOver labels.** Icon-only buttons need `.accessibilityLabel("Add workout")`. SF Symbols don't carry meaning to VoiceOver.
2. **Dynamic Type.** Use `.font(.body)`, `.font(.headline)`. Don't hard-code `.system(size: 17)`. Test at AX5 (largest accessibility size).
3. **Contrast.** Use `Color.primary`, `Color.secondary`, semantic colors. Custom colors must hit WCAG AA (4.5:1 for body text).
4. **Reduced motion.** Wrap large animations in `@Environment(\.accessibilityReduceMotion)` and offer a cross-fade fallback.

---

## What this kit refuses to do

- Suggest `ObservableObject` + `@Published` when targeting iOS 17+. Use `@Observable`.
- Write `NavigationView` in new code. It's deprecated.
- Use `Combine` publishers for view state. SwiftUI has its own observation system.
- Skip the privacy manifest. Apps without `PrivacyInfo.xcprivacy` get rejected if they call required-reason APIs (file timestamp, user defaults, system boot time, disk space, active keyboards).
- Recommend `force-unwrap` on URLs, asset names, or model IDs. Use `URL(string:)` returning optional, fail closed.
- Write tests that hit the real network. Mock the API layer.

---

## Companion docs

- `patterns/swiftui-idioms.md` — Observable, environment, navigation, sheets, the SwiftUI gotchas list
- `patterns/swiftdata-cloudkit.md` — schemas, relationships, predicates, migration, CloudKit entitlements
- `checklists/app-store-readiness.md` — privacy manifest, screenshots, App Privacy details, TestFlight, common rejection reasons

---

## Sanity checklist before merging any SwiftUI PR

- [ ] All views are `struct`, all models are `final class`
- [ ] No `ObservableObject` in code targeting iOS 17+
- [ ] `NavigationStack` everywhere, not `NavigationView`
- [ ] Async work uses `.task` not `Task { }` in `.onAppear`
- [ ] Empty states render `ContentUnavailableView`
- [ ] VoiceOver labels on icon-only buttons
- [ ] Dynamic Type works at AX5 without truncation
- [ ] Privacy manifest exists and lists every required-reason API used
- [ ] No `print(...)` left in shipping code — use `Logger`

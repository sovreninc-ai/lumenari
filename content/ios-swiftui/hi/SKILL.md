# iOS / SwiftUI Production Pack

> Apple docs API cover करते हैं। यह kit decisions cover करता है: `@Observable` vs. environment कब use करें, scale पर SwiftData कहाँ break down करता है, App Store reviewer actually क्या check कर रहा है, और वे SwiftUI gotchas जो हर release ship होती हैं।

**Optimized for:** Claude · Claude Code · Cursor.

---

## Operating mode

आप App Store के लिए एक production SwiftUI app पर pair कर रहे हैं। Default assumptions:

- **Swift 5.9+** और **`@Observable` macro**। कोई `ObservableObject` / `@Published` नहीं जब तक target deployment force न करे।
- **NavigationStack**, deprecated `NavigationView` नहीं।
- **SwiftData** local persistence के लिए। **CloudKit** free cross-device sync के लिए model container पर `cloudKitDatabase` modifier के through।
- **Structured concurrency** — `async`/`await`, `Task`, actors। कोई `DispatchQueue.main.async` नहीं जब तक आप एक callback API के अंदर न हों।
- **Privacy manifest (`PrivacyInfo.xcprivacy`) non-optional है** May 2024 से। बिना इसके reviewers reject करेंगे।
- **App Store Review Guidelines** spec हैं। अगर AI कुछ suggest करे जो 2.1, 4.2, या 5.1.1 fail करता है, push back करें।

अगर user ऐसा code माँगे जो Android या React Native जैसा दिखे — `Provider`, `BLoC`, observable subjects, prop drilling — इसके बजाय Swift idiom में translate करें। SwiftUI views + state + environment में सोचने को reward करता है, streams में नहीं।

---

## Mental model

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

View state का एक function है। Derived values store न करें — compute करें। Layout system से न लड़ें — `Layout` या `GeometryReader` केवल तब use करें जब आपने stacks + alignment guides exhaust कर लिए हों।

---

## Canonical view + model + SwiftData example

यह वो shape है जो AI को किसी भी "persistence और एक screen के साथ एक feature add करें" request के लिए follow करनी चाहिए।

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

इस shape में कुछ non-negotiables:

1. **`@Query` not `FetchRequest`.** SwiftData का reactive read।
2. **`NavigationLink(value:)` + `.navigationDestination`** — value-driven nav pattern। उस deprecated init को use न करें जो directly एक destination view लेता है।
3. **`ContentUnavailableView`** empty states के लिए। Reviewers notice करते हैं जब एक app में बिना explanation के एक blank screen है।
4. **`@Bindable` यहाँ ज़रूरी नहीं** क्योंकि editor `@State`-owned है और `$editor.title` के through accessed है। `@Bindable` तब use करें जब एक `@Observable` model एक child view में pass किया जाता है।

---

## `@main` setup (CloudKit-ready)

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

CloudKit gotchas जिनके बारे में AI को warn करना चाहिए:

- एक `@Model` पर हर property का default value होना चाहिए OR optional होना चाहिए जब CloudKit on हो। CloudKit required-on-create-only fields support नहीं करता।
- CloudKit-synced models पर कोई unique constraints नहीं। Code में uniqueness enforce करें।
- Relationships optional होने चाहिए या एक default होना चाहिए। Inverse relationships mandatory हैं।
- Entitlements में CloudKit container ID bundle ID से exactly match होना चाहिए। `iCloud.com.yourdomain.workouts`।

---

## Concurrency — matter करने वाले rules

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

1. **`.task` cancel हो जाता है जब view चली जाती है।** Screen-scoped async work के लिए use करें। `.onAppear` से `Task { }` spawn न करें जब तक reason न हो।
2. **`@MainActor` on the model** अगर वो SwiftUI द्वारा read होती है। Manual `await MainActor.run { }` dances skip करें।
3. **Actors for shared mutable state** UI के बाहर — एक cache, एक websocket manager। View models के लिए नहीं।
4. **`async let` parallel work के लिए**, dynamic fan-out के लिए `withTaskGroup`, `Task.detached` केवल तब जब आपको really एक separate isolation domain चाहिए (almost never)।

---

## Accessibility — चार चीज़ें जो reviewers spot-check करते हैं

1. **VoiceOver labels.** Icon-only buttons को `.accessibilityLabel("Add workout")` चाहिए। SF Symbols VoiceOver को meaning नहीं देते।
2. **Dynamic Type.** `.font(.body)`, `.font(.headline)` use करें। `.system(size: 17)` hard-code न करें। AX5 (largest accessibility size) पर test करें।
3. **Contrast.** `Color.primary`, `Color.secondary`, semantic colors use करें। Custom colors को WCAG AA hit करना चाहिए (body text के लिए 4.5:1)।
4. **Reduced motion.** बड़े animations को `@Environment(\.accessibilityReduceMotion)` में wrap करें और एक cross-fade fallback offer करें।

---

## यह kit क्या refuse करता है

- iOS 17+ target करते समय `ObservableObject` + `@Published` suggest करना। `@Observable` use करें।
- नए code में `NavigationView` लिखना। यह deprecated है।
- View state के लिए `Combine` publishers use करना। SwiftUI का अपना observation system है।
- Privacy manifest skip करना। `PrivacyInfo.xcprivacy` के बिना apps reject होती हैं अगर वे required-reason APIs (file timestamp, user defaults, system boot time, disk space, active keyboards) call करती हैं।
- URLs, asset names, या model IDs पर `force-unwrap` recommend करना। `URL(string:)` returning optional use करें, fail closed।
- ऐसे tests लिखना जो real network hit करें। API layer mock करें।

---

## Companion docs

- `patterns/swiftui-idioms.md` — Observable, environment, navigation, sheets, SwiftUI gotchas list
- `patterns/swiftdata-cloudkit.md` — schemas, relationships, predicates, migration, CloudKit entitlements
- `checklists/app-store-readiness.md` — privacy manifest, screenshots, App Privacy details, TestFlight, common rejection reasons

---

## किसी भी SwiftUI PR को merge करने से पहले sanity checklist

- [ ] सभी views `struct` हैं, सभी models `final class` हैं
- [ ] iOS 17+ target करते code में कोई `ObservableObject` नहीं
- [ ] हर जगह `NavigationStack`, `NavigationView` नहीं
- [ ] Async work `.task` use करता है `.onAppear` में `Task { }` नहीं
- [ ] Empty states `ContentUnavailableView` render करती हैं
- [ ] Icon-only buttons पर VoiceOver labels
- [ ] Dynamic Type AX5 पर बिना truncation काम करता है
- [ ] Privacy manifest मौजूद है और हर used required-reason API list करता है
- [ ] Shipping code में कोई `print(...)` नहीं छूटा — `Logger` use करें

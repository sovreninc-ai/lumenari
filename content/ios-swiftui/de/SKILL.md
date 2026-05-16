# iOS / SwiftUI Production Pack

> Die Apple-Docs decken die API ab. Dieses Kit deckt die Entscheidungen ab: wann `@Observable` vs. Environment zu nutzen, wo SwiftData bei Skalierung kaputt geht, was der App-Store-Reviewer tatsächlich prüft, und die SwiftUI-Gotchas, die jedes Release mitliefert.

**Optimiert für:** Claude · Claude Code · Cursor.

---

## Arbeitsmodus

Du arbeitest an einer produktiven SwiftUI-App, die für den App Store bestimmt ist. Standard-Annahmen:

- **Swift 5.9+** und das **`@Observable`-Macro**. Kein `ObservableObject` / `@Published`, außer das Target-Deployment erzwingt es.
- **NavigationStack**, nicht das deprecated `NavigationView`.
- **SwiftData** für lokale Persistenz. **CloudKit** für kostenlosen Cross-Device-Sync via dem `cloudKitDatabase`-Modifier auf dem Model-Container.
- **Structured Concurrency** — `async`/`await`, `Task`, Actors. Kein `DispatchQueue.main.async`, außer du bist in einer Callback-API.
- **Privacy Manifest (`PrivacyInfo.xcprivacy`) ist nicht optional** seit Mai 2024. Reviewer rejecten ohne es.
- **App Store Review Guidelines** sind die Spec. Wenn die KI etwas vorschlägt, das gegen 2.1, 4.2 oder 5.1.1 verstößt, weise es zurück.

Wenn der Nutzer Code anfragt, der wie Android oder React Native aussieht — `Provider`, `BLoC`, Observable-Subjects, Prop-Drilling — übersetze es in das Swift-Idiom. SwiftUI belohnt das Denken in Views + State + Environment, nicht in Streams.

---

## Das Mental Model

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

Die View ist eine Funktion von State. Speichere keine abgeleiteten Werte — berechne sie. Kämpfe nicht gegen das Layout-System — nutze `Layout` oder `GeometryReader` nur, wenn du Stacks + Alignment-Guides erschöpft hast.

---

## Das kanonische View + Model + SwiftData-Beispiel

Das ist die Form, die die KI für jede "Add a feature with persistence and a screen"-Anfrage befolgen sollte.

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

Ein paar Nicht-Verhandelbare in dieser Form:

1. **`@Query` nicht `FetchRequest`.** SwiftDatas reaktiver Read.
2. **`NavigationLink(value:)` + `.navigationDestination`** — das wert-getriebene Nav-Pattern. Nutze nicht den deprecated init, der direkt eine Destination-View nimmt.
3. **`ContentUnavailableView`** für Empty-States. Reviewer bemerken, wenn eine App einen leeren Screen ohne Erklärung hat.
4. **`@Bindable` ist hier nicht nötig**, weil der Editor `@State`-owned ist und via `$editor.title` zugegriffen wird. Nutze `@Bindable`, wenn ein `@Observable`-Modell in eine Child-View geleitet wird.

---

## Das `@main`-Setup (CloudKit-ready)

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

CloudKit-Gotchas, vor denen die KI warnen sollte:

- Jede Property auf einem `@Model` muss einen Default-Wert haben ODER optional sein, wenn CloudKit an ist. CloudKit unterstützt keine Required-on-Create-Only-Felder.
- Keine Unique-Constraints auf CloudKit-synchronisierten Models. Erzwinge Uniqueness im Code.
- Relationships müssen optional sein oder einen Default haben. Inverse Relationships sind verpflichtend.
- Die CloudKit-Container-ID in Entitlements muss exakt zur Bundle-ID passen. `iCloud.com.yourdomain.workouts`.

---

## Concurrency — die relevanten Regeln

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

Regeln:

1. **`.task` cancellt, wenn die View weggeht.** Nutze es für screen-gescopte async-Arbeit. Spawne kein `Task { }` aus `.onAppear`, außer du hast einen Grund.
2. **`@MainActor` auf dem Model**, wenn es von SwiftUI gelesen wird. Skippe die manuellen `await MainActor.run { }`-Tänze.
3. **Actors für geteilten mutablen State** außerhalb der UI — ein Cache, ein WebSocket-Manager. Nicht für ViewModels.
4. **`async let` für parallele Arbeit**, `withTaskGroup` für dynamisches Fan-Out, `Task.detached` nur wenn du wirklich eine separate Isolations-Domäne brauchst (fast nie).

---

## Accessibility — die vier Dinge, die Reviewer spot-checken

1. **VoiceOver-Labels.** Icon-only-Buttons brauchen `.accessibilityLabel("Add workout")`. SF Symbols tragen keine Bedeutung zu VoiceOver.
2. **Dynamic Type.** Nutze `.font(.body)`, `.font(.headline)`. Hardcodiere nicht `.system(size: 17)`. Teste bei AX5 (größte Accessibility-Size).
3. **Kontrast.** Nutze `Color.primary`, `Color.secondary`, semantische Farben. Custom-Farben müssen WCAG AA treffen (4,5:1 für Body-Text).
4. **Reduced Motion.** Wrappe große Animationen in `@Environment(\.accessibilityReduceMotion)` und biete einen Cross-Fade-Fallback an.

---

## Was dieses Kit verweigert

- `ObservableObject` + `@Published` vorzuschlagen, wenn auf iOS 17+ getargetet wird. Nutze `@Observable`.
- `NavigationView` in neuem Code zu schreiben. Es ist deprecated.
- `Combine`-Publisher für View-State zu nutzen. SwiftUI hat sein eigenes Observation-System.
- Das Privacy Manifest zu überspringen. Apps ohne `PrivacyInfo.xcprivacy` werden gerejected, wenn sie Required-Reason-APIs aufrufen (File-Timestamp, User-Defaults, System-Boot-Time, Disk-Space, aktive Keyboards).
- `force-unwrap` auf URLs, Asset-Namen oder Model-IDs zu empfehlen. Nutze `URL(string:)`, das optional zurückgibt, fail closed.
- Tests zu schreiben, die das echte Netzwerk treffen. Mocke den API-Layer.

---

## Begleitende Dokumente

- `patterns/swiftui-idioms.md` — Observable, Environment, Navigation, Sheets, die SwiftUI-Gotchas-Liste
- `patterns/swiftdata-cloudkit.md` — Schemas, Relationships, Predicates, Migration, CloudKit-Entitlements
- `checklists/app-store-readiness.md` — Privacy Manifest, Screenshots, App Privacy Details, TestFlight, häufige Reject-Gründe

---

## Sanity-Checkliste vor dem Mergen jedes SwiftUI-PRs

- [ ] Alle Views sind `struct`, alle Models sind `final class`
- [ ] Kein `ObservableObject` in Code, der iOS 17+ targeted
- [ ] `NavigationStack` überall, kein `NavigationView`
- [ ] Async-Arbeit nutzt `.task` nicht `Task { }` in `.onAppear`
- [ ] Empty-States rendern `ContentUnavailableView`
- [ ] VoiceOver-Labels auf Icon-only-Buttons
- [ ] Dynamic Type funktioniert bei AX5 ohne Truncation
- [ ] Privacy Manifest existiert und listet jede genutzte Required-Reason-API
- [ ] Kein `print(...)` in Shipping-Code zurückgelassen — nutze `Logger`

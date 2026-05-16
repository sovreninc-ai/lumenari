# SwiftData + CloudKit

Der Persistenz-Stack, der mit iOS 17+ ausgeliefert wird. SwiftData ist der lokale Store. CloudKit (via SwiftDatas automatischer Integration) ist der kostenlose Cross-Device-Sync-Layer. Zusammen ersetzen sie Core Data + NSPersistentCloudKitContainer mit einer viel kleineren Surface-Area — aber die CloudKit-Regeln gelten weiterhin.

---

## Das Minimum-Viable-Model

```swift
import SwiftData

@Model
final class Note {
    var id: UUID
    var title: String
    var body: String
    var createdAt: Date
    var updatedAt: Date

    init(title: String = "", body: String = "") {
        self.id = UUID()
        self.title = title
        self.body = body
        self.createdAt = .now
        self.updatedAt = .now
    }
}
```

Anmerkungen zur Form:

- `final class` — SwiftData verlangt es.
- Jede Property hat einen Default-Wert. Das ist nicht verhandelbar für CloudKit-Sync — Apples CloudKit-Schema unterstützt keine Required-on-Create-Only-Felder.
- `id: UUID` — nützlich für stabile Identität, aber SwiftData generiert seine eigene `persistentModelID`, die du auch nutzen kannst. Behalte eine explizite `id`, wenn dir externe Referenzen (URLs, Export-Formate) wichtig sind.
- Kein `@unique`-Constraint. CloudKit unterstützt Uniqueness nicht. Erzwinge im Code.

---

## Relationships

```swift
@Model
final class Project {
    var id: UUID
    var name: String

    @Relationship(deleteRule: .cascade, inverse: \Task.project)
    var tasks: [Task] = []

    init(name: String) {
        self.id = UUID()
        self.name = name
    }
}

@Model
final class Task {
    var id: UUID
    var title: String
    var completed: Bool
    var project: Project?

    init(title: String, project: Project? = nil) {
        self.id = UUID()
        self.title = title
        self.completed = false
        self.project = project
    }
}
```

Regeln:

- **Inverse Relationships sind unter CloudKit verpflichtend.** Beide Seiten müssen einander referenzieren. Der `inverse:`-Parameter macht es explizit.
- **Delete-Rules**: `.cascade` (Children mit löschen), `.nullify` (Parent auf nil setzen), `.deny` (Löschen verweigern, wenn Children existieren), `.noAction` (du handhabst es). `.cascade` ist am häufigsten für owned Children.
- **To-Many-Relationships starten als `[]`**, nicht `nil`. To-One-Relationships sind meist optional.
- **Kein Many-to-Many unter CloudKit** ohne ein Join-Model. Mache eine `Membership`-Klasse mit zwei To-One-Relationships.

---

## Queries — die Read-Seite

```swift
struct TaskList: View {
    @Query(filter: #Predicate<Task> { !$0.completed },
           sort: \Task.createdAt,
           order: .reverse) var tasks: [Task]

    var body: some View {
        List(tasks) { task in
            Text(task.title)
        }
    }
}
```

Dynamische Prädikate — wenn der Filter vom Input eines Parents abhängt:

```swift
struct ProjectTasks: View {
    let projectID: PersistentIdentifier

    @Query private var tasks: [Task]

    init(projectID: PersistentIdentifier) {
        self.projectID = projectID
        _tasks = Query(
            filter: #Predicate<Task> { $0.project?.persistentModelID == projectID },
            sort: \Task.createdAt
        )
    }

    var body: some View {
        List(tasks) { task in Text(task.title) }
    }
}
```

Predicate-Gotchas:

- `#Predicate` ist ein Macro. Der Body wird zur Compile-Zeit geparsed, sodass die meisten Pure-Swift-Code nicht funktionieren — nur das unterstützte Subset.
- `String.contains`, `String.localizedStandardContains`, Vergleiche, grundlegende Arithmetik und das Traversieren von Relationships funktionieren.
- Closures, Custom-Methods und die meisten Computed-Properties funktionieren nicht. Verschiebe diese Logik aus dem Predicate.

---

## Writes — `ModelContext`

```swift
@Environment(\.modelContext) private var context

// Insert
let task = Task(title: "New task")
context.insert(task)

// Update — just mutate the model. Changes are tracked automatically.
task.completed = true

// Delete
context.delete(task)

// Explicit save (usually auto-saved on the next run loop)
try context.save()
```

`context.save()` nicht nach jeder Mutation. SwiftData batcht und auto-saved. Speichere explizit nur vor dem Überschreiten einer Prozessgrenze (Export, Share, Background-Task-Transition).

---

## CloudKit-Setup — die Entitlements- + Capabilities-Checkliste

1. In Xcode, Target → Signing & Capabilities → **iCloud**-Capability hinzufügen.
2. **CloudKit** unter iCloud Services checken.
3. Einen CloudKit-Container hinzufügen: `iCloud.com.yourdomain.appname`. Muss zu dem passen, was du in `ModelConfiguration` setzt.
4. Die **Background Modes**-Capability mit gechecktem **Remote notifications** hinzufügen. So pusht CloudKit Change-Notifications.
5. Im Model-Container-Setup:

```swift
@main
struct App: SwiftUI.App {
    let container: ModelContainer

    init() {
        do {
            container = try ModelContainer(
                for: Note.self, Project.self, Task.self,
                configurations: ModelConfiguration(
                    schema: Schema([Note.self, Project.self, Task.self]),
                    isStoredInMemoryOnly: false,
                    cloudKitDatabase: .automatic
                )
            )
        } catch {
            fatalError("ModelContainer init failed: \(error)")
        }
    }

    var body: some Scene {
        WindowGroup { ContentView() }
            .modelContainer(container)
    }
}
```

6. Auf zwei Geräten laufen lassen, die in denselben iCloud-Account eingeloggt sind. Auf einem eine Änderung machen. Warten. (Sync ist nicht instant — typischerweise 5-30 Sekunden.)

---

## CloudKit-Constraints — was SwiftData sich weigert, in die Cloud zu pushen

- **Unique-Constraints.** Erzwinge im Code, nicht im Schema.
- **Required-on-Create-Properties ohne Defaults.** Jede Property braucht einen Default.
- **Nicht-optionale To-One-Relationships.** Mache sie optional.
- **`@Attribute(.transformable)` mit Custom-Transformers.** CloudKit braucht primitive-kompatible Types.
- **Inverse-lose Relationships.** Beide Seiten müssen einander referenzieren.

Wenn CloudKit still ablehnt zu syncen, prüfe Console.app auf dem Gerät auf `CKError`-Einträge. Häufige:

| Error | Was es bedeutet |
| --- | --- |
| `partialFailure` | Einige Records syncten, einige nicht. Prüfe das `partialErrorsByItemID`-Dictionary. |
| `quotaExceeded` | Nutzer hat keinen iCloud-Speicher mehr. Surface eine freundliche Nachricht. |
| `notAuthenticated` | Nutzer ist nicht in iCloud eingeloggt. Prompte ihn via Settings. |
| `serverRecordChanged` | Ein Merge-Konflikt. SwiftData löst meist Last-Writer-Wins. |
| `zoneNotFound` | Schema wurde noch nicht gepusht — passiert einmal beim ersten Sync. |

---

## Migrationen

Wenn du die Form eines `@Model` änderst, versucht SwiftData automatisch eine Lightweight-Migration. Es kann handhaben:

- Properties hinzufügen (mit Defaults)
- Properties entfernen
- Umbenennen via `@Attribute(originalName: "oldName")`
- Relationship-Kardinalität ändern (manchmal — gründlich testen)

Für schwerere Änderungen nutze ein `VersionedSchema` und `SchemaMigrationPlan`:

```swift
enum NotesSchemaV1: VersionedSchema {
    static var versionIdentifier = Schema.Version(1, 0, 0)
    static var models: [any PersistentModel.Type] { [Note.self] }
    // ...
}

enum NotesSchemaV2: VersionedSchema {
    static var versionIdentifier = Schema.Version(2, 0, 0)
    static var models: [any PersistentModel.Type] { [Note.self] }
    // ...
}

enum NotesMigrationPlan: SchemaMigrationPlan {
    static var schemas: [any VersionedSchema.Type] {
        [NotesSchemaV1.self, NotesSchemaV2.self]
    }
    static var stages: [MigrationStage] {
        [.lightweight(fromVersion: NotesSchemaV1.self, toVersion: NotesSchemaV2.self)]
    }
}
```

Dann übergib den Plan in deine `ModelContainer`-Init.

Teste Migrationen auf einer befüllten Datenbank vor dem Ausliefern. Der Simulator kann gewipet werden — Production-Nutzer können das nicht.

---

## Wann SwiftData zu skippen

SwiftData ist die richtige Wahl für die Art von Daten, die SwiftUI gut anzeigen kann: Listen strukturierter Items mit Relationships, die syncen müssen. Es ist nicht die richtige Wahl für:

- **High-Volume-Time-Series-Daten** (Sensor-Readings, Analytics). Nutze SQLite direkt oder ein Streaming-Format.
- **Große Binär-Blobs** (Videos, große Bilder). Speichere das Binary in `FileManager` oder `CloudKit.Asset`. Speichere einen Pfad/Referenz in SwiftData.
- **Cross-Platform-Sync, der nicht iCloud-only ist.** SwiftData + CloudKit ist auf Apple-Plattformen mit iCloud-Accounts gelockt. Für Android/Web baue deinen eigenen Sync-Layer.
- **Encrypted-at-Rest mit deinen eigenen Keys.** SwiftData nutzt die Standard-Data-Protection-Class. Für E2EE, layere drauf.

---

## Häufige Bugs

1. **"Meine View updated nicht, wenn ich ein neues Item hinzufüge."** Stelle sicher, dass du `@Query` nutzt, nicht `[Model]`. `@Query` ist reaktiv.

2. **"CloudKit-Sync funktioniert lokal, aber nicht zwischen Geräten."** Prüfe das CloudKit-Dashboard (icloud.developer.apple.com) — das Schema wurde möglicherweise nicht in Production gepusht. Lass die App einmal im Debug laufen, dann deploye das Schema via den "Deploy Schema to Production"-Button des Dashboards.

3. **"Predicate crashed zur Runtime."** Du hast etwas geschrieben, was das Predicate-Macro nicht handhaben kann. Verschiebe die Logik in eine Computed Property auf dem Model oder filtere Post-Fetch.

4. **"`context.save()` wirft einen Error."** Lies den Error. Meist ein Relationship-Integrität-Problem (fehlende Inverse, gelöscht-aber-referenziertes Objekt). Fix die Daten, nicht den Save.

5. **"Migrationen gelingen im Simulator, scheitern auf TestFlight."** TestFlight-Nutzer haben echte Daten-Shapes, die du nicht getestet hast. Teste immer Migrations-Pfade mit Seed-Daten, die zur Production passen.

# SwiftData + CloudKit

iOS 17+ के साथ ship होने वाला persistence stack। SwiftData local store है। CloudKit (SwiftData के automatic integration के through) free cross-device sync layer है। साथ में वे Core Data + NSPersistentCloudKitContainer को बहुत छोटे surface area के साथ replace करते हैं — लेकिन CloudKit rules अभी भी apply होते हैं।

---

## Minimum-viable model

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

Shape पर notes:

- `final class` — SwiftData इसे require करता है।
- हर property में एक default value है। यह CloudKit sync के लिए non-negotiable है — Apple का CloudKit schema required-on-create-only fields support नहीं करता।
- `id: UUID` — stable identity के लिए useful, लेकिन SwiftData अपना `persistentModelID` generate करता है जिसे आप भी use कर सकते हैं। एक explicit `id` रखें अगर आप external references (URLs, export formats) care करते हैं।
- कोई `@unique` constraint नहीं। CloudKit uniqueness support नहीं करता। Code में enforce करें।

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

Rules:

- **CloudKit के तहत Inverse relationships mandatory हैं।** दोनों sides को एक-दूसरे को reference करना है। `inverse:` parameter इसे spell out करता है।
- **Delete rules**: `.cascade` (children को भी delete करें), `.nullify` (parent को nil set करें), `.deny` (अगर children मौजूद हैं तो delete refuse करें), `.noAction` (आप handle करें)। `.cascade` owned children के लिए most common है।
- **To-many relationships `[]` से start होती हैं**, `nil` से नहीं। To-one relationships आमतौर पर optional हैं।
- **एक join model के बिना CloudKit के तहत कोई many-to-many नहीं।** दो to-one relationships के साथ एक `Membership` class बनाएँ।

---

## Queries — read side

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

Dynamic predicates — जब filter एक parent के input पर depend करता है:

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

Predicate gotchas:

- `#Predicate` एक macro है। Body compile time पर parsed होती है, तो ज़्यादातर pure-Swift code काम नहीं करेगा — केवल supported subset।
- `String.contains`, `String.localizedStandardContains`, comparisons, basic arithmetic, और relationships traverse करना काम करते हैं।
- Closures, custom methods, और ज़्यादातर computed properties काम नहीं करते। उस logic को predicate के बाहर move करें।

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

हर mutation के बाद `context.save()` न करें। SwiftData batches और auto-saves। केवल एक process boundary (export, share, background task transition) cross करने से पहले explicitly save करें।

---

## CloudKit setup — entitlements + capabilities checklist

1. Xcode में, target → Signing & Capabilities → **iCloud** capability add करें।
2. iCloud Services के तहत **CloudKit** check करें।
3. एक CloudKit container add करें: `iCloud.com.yourdomain.appname`। उससे match होना चाहिए जो आपने `ModelConfiguration` में डाला।
4. **Remote notifications** checked के साथ **Background Modes** capability add करें। यह वो है जिससे CloudKit change notifications push करता है।
5. Model container setup में:

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

6. Same iCloud account में signed in दो devices पर run करें। एक पर change करें। Wait करें। (Sync instant नहीं है — typically 5-30 seconds।)

---

## CloudKit constraints — SwiftData cloud पर क्या push करने को refuse करता है

- **Unique constraints.** Code में enforce करें, schema में नहीं।
- **Defaults के बिना required-on-create properties।** हर property को default चाहिए।
- **Non-optional to-one relationships.** उन्हें optional बनाएँ।
- **Custom transformers के साथ `@Attribute(.transformable)`।** CloudKit को primitive-compatible types चाहिए।
- **Inverse-less relationships.** दोनों sides को एक-दूसरे को reference करना है।

जब CloudKit silently sync refuse करे, device पर Console.app `CKError` entries के लिए check करें। Common ones:

| Error | इसका क्या मतलब है |
| --- | --- |
| `partialFailure` | कुछ records synced, कुछ नहीं हुए। `partialErrorsByItemID` dictionary check करें। |
| `quotaExceeded` | User iCloud space से out है। एक friendly message surface करें। |
| `notAuthenticated` | User iCloud में signed in नहीं है। Settings के through prompt करें। |
| `serverRecordChanged` | एक merge conflict। SwiftData आमतौर पर last-writer-wins से resolve करता है। |
| `zoneNotFound` | Schema अभी push नहीं हुआ — first sync पर एक बार होता है। |

---

## Migrations

जब आप एक `@Model` का shape बदलते हैं, SwiftData automatically एक lightweight migration attempt करता है। यह handle कर सकता है:

- Properties add करना (defaults के साथ)
- Properties remove करना
- `@Attribute(originalName: "oldName")` के through rename करना
- Relationship cardinality बदलना (कभी-कभी — thoroughly test करें)

Heavier changes के लिए, एक `VersionedSchema` और `SchemaMigrationPlan` use करें:

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

फिर plan को अपने `ModelContainer` init में pass करें।

Shipping से पहले एक populated database पर migrations test करें। Simulator को wipe किया जा सकता है — production users को नहीं।

---

## SwiftData कब skip करें

SwiftData उस तरह के data के लिए सही call है जिसे SwiftUI display में अच्छा है: relationships के साथ structured items की lists, जिन्हें sync करना है। यह इनके लिए सही call नहीं है:

- **High-volume time-series data** (sensor readings, analytics)। SQLite directly या एक streaming format use करें।
- **Large binary blobs** (videos, large images)। Binary को `FileManager` या `CloudKit.Asset` में store करें। SwiftData में एक path/reference store करें।
- **Cross-platform sync जो iCloud-only नहीं है।** SwiftData + CloudKit iCloud accounts वाले Apple platforms पर locked है। Android/web के लिए, अपना sync layer बनाएँ।
- **अपनी keys के साथ Encrypted-at-rest।** SwiftData standard data protection class use करता है। E2EE के लिए, उसके ऊपर layer करें।

---

## Common bugs

1. **"मेरी view नया item add करने पर update नहीं हो रही।"** सुनिश्चित करें कि आप `@Query` use कर रहे हैं, `[Model]` नहीं। `@Query` reactive है।

2. **"CloudKit sync locally काम करता है लेकिन devices के बीच नहीं।"** CloudKit Dashboard (icloud.developer.apple.com) check करें — schema शायद production में push नहीं हुआ। App को debug में एक बार run करें, फिर dashboard के "Deploy Schema to Production" button से schema deploy करें।

3. **"Predicate runtime पर crashes होता है।"** आपने कुछ ऐसा लिखा जो predicate macro handle नहीं कर सकता। Logic को model पर एक computed property में move करें या post-fetch filter करें।

4. **"`context.save()` एक error throws करता है।"** Error पढ़ें। आमतौर पर एक relationship integrity issue (missing inverse, deleted-but-referenced object)। Data fix करें, save को नहीं।

5. **"Migrations Simulator में succeed होते हैं, TestFlight पर fail होते हैं।"** TestFlight users के पास real data shapes हैं जो आपने test नहीं किए। हमेशा production के साथ match होने वाले seeded data के साथ migration paths test करें।

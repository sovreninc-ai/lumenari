# SwiftData + CloudKit

The persistence stack that ships with iOS 17+. SwiftData is the local store. CloudKit (via SwiftData's automatic integration) is the free cross-device sync layer. Together they replace Core Data + NSPersistentCloudKitContainer with a much smaller surface area — but the CloudKit rules still apply.

---

## The minimum-viable model

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

Notes on the shape:

- `final class` — SwiftData requires it.
- Every property has a default value. This is non-negotiable for CloudKit sync — Apple's CloudKit schema doesn't support required-on-create-only fields.
- `id: UUID` — useful for stable identity, but SwiftData generates its own `persistentModelID` you can use too. Keep an explicit `id` if you care about external references (URLs, export formats).
- No `@unique` constraint. CloudKit doesn't support uniqueness. Enforce in code.

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

- **Inverse relationships are mandatory under CloudKit.** Both sides must reference each other. The `inverse:` parameter spells it out.
- **Delete rules**: `.cascade` (delete children too), `.nullify` (set parent to nil), `.deny` (refuse to delete if children exist), `.noAction` (you handle it). `.cascade` is the most common for owned children.
- **To-many relationships start as `[]`**, not `nil`. To-one relationships are usually optional.
- **No many-to-many under CloudKit** without a join model. Make a `Membership` class with two to-one relationships.

---

## Queries — the read side

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

Dynamic predicates — when the filter depends on a parent's input:

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

- `#Predicate` is a macro. The body is parsed at compile time, so most pure-Swift code won't work — only the supported subset.
- `String.contains`, `String.localizedStandardContains`, comparisons, basic arithmetic, and traversing relationships work.
- Closures, custom methods, and most computed properties don't work. Move that logic out of the predicate.

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

Don't `context.save()` after every mutation. SwiftData batches and auto-saves. Save explicitly only before crossing a process boundary (export, share, background task transition).

---

## CloudKit setup — the entitlements + capabilities checklist

1. In Xcode, target → Signing & Capabilities → add **iCloud** capability.
2. Check **CloudKit** under iCloud Services.
3. Add a CloudKit container: `iCloud.com.yourdomain.appname`. Must match what you put in `ModelConfiguration`.
4. Add the **Background Modes** capability with **Remote notifications** checked. This is how CloudKit pushes change notifications.
5. In the model container setup:

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

6. Run on two devices signed into the same iCloud account. Make a change on one. Wait. (Sync isn't instant — it's typically 5-30 seconds.)

---

## CloudKit constraints — what SwiftData refuses to push to the cloud

- **Unique constraints.** Enforce in code, not schema.
- **Required-on-create properties without defaults.** Every property needs a default.
- **Non-optional to-one relationships.** Make them optional.
- **`@Attribute(.transformable)` with custom transformers.** CloudKit needs primitive-compatible types.
- **Inverse-less relationships.** Both sides must reference each other.

When CloudKit silently refuses to sync, check Console.app on the device for `CKError` entries. Common ones:

| Error | What it means |
| --- | --- |
| `partialFailure` | Some records synced, some didn't. Check the `partialErrorsByItemID` dictionary. |
| `quotaExceeded` | User is out of iCloud space. Surface a friendly message. |
| `notAuthenticated` | User isn't signed into iCloud. Prompt them via Settings. |
| `serverRecordChanged` | A merge conflict. SwiftData usually resolves last-writer-wins. |
| `zoneNotFound` | Schema hasn't been pushed yet — happens once on first sync. |

---

## Migrations

When you change a `@Model`'s shape, SwiftData attempts a lightweight migration automatically. It can handle:

- Adding properties (with defaults)
- Removing properties
- Renaming via `@Attribute(originalName: "oldName")`
- Changing relationship cardinality (sometimes — test thoroughly)

For heavier changes, use a `VersionedSchema` and `SchemaMigrationPlan`:

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

Then pass the plan into your `ModelContainer` init.

Test migrations on a populated database before shipping. The Simulator can be wiped — production users can't.

---

## When to skip SwiftData

SwiftData is the right call for the kind of data SwiftUI is good at displaying: lists of structured items, with relationships, that need to sync. It's not the right call for:

- **High-volume time-series data** (sensor readings, analytics). Use SQLite directly or a streaming format.
- **Large binary blobs** (videos, large images). Store the binary in `FileManager` or `CloudKit.Asset`. Store a path/reference in SwiftData.
- **Cross-platform sync that isn't iCloud-only.** SwiftData + CloudKit is locked to Apple platforms with iCloud accounts. For Android/web, build your own sync layer.
- **Encrypted-at-rest with your own keys.** SwiftData uses the standard data protection class. For E2EE, layer it on top.

---

## Common bugs

1. **"My view isn't updating when I add a new item."** Make sure you're using `@Query`, not `[Model]`. `@Query` is reactive.

2. **"CloudKit sync works locally but not between devices."** Check the CloudKit Dashboard (icloud.developer.apple.com) — the schema may not have been pushed to production. Run the app in debug once, then deploy schema via the dashboard's "Deploy Schema to Production" button.

3. **"Predicate crashes at runtime."** You wrote something the predicate macro can't handle. Move the logic into a computed property on the model or filter post-fetch.

4. **"`context.save()` throws an error."** Read the error. Usually a relationship integrity issue (missing inverse, deleted-but-referenced object). Fix the data, not the save.

5. **"Migrations succeed in Simulator, fail on TestFlight."** TestFlight users have real data shapes you didn't test. Always test migration paths with seeded data that matches production.

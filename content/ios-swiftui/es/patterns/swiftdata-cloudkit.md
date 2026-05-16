# SwiftData + CloudKit

El stack de persistencia que viene con iOS 17+. SwiftData es el store local. CloudKit (vía la integración automática de SwiftData) es la capa gratuita de sync cross-device. Juntos reemplazan a Core Data + NSPersistentCloudKitContainer con una superficie mucho menor — pero las reglas de CloudKit siguen aplicando.

---

## El modelo mínimo viable

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

Notas sobre la forma:

- `final class` — SwiftData lo requiere.
- Cada propiedad tiene un valor por default. Esto no es negociable para sync de CloudKit — el schema de CloudKit de Apple no soporta campos required-on-create-only.
- `id: UUID` — útil para identidad estable, pero SwiftData genera su propio `persistentModelID` que también puedes usar. Mantén un `id` explícito si te importan las referencias externas (URLs, formatos de export).
- Sin constraint `@unique`. CloudKit no soporta unicidad. Aplícala en código.

---

## Relaciones

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

Reglas:

- **Las relaciones inversas son obligatorias bajo CloudKit.** Ambos lados se deben referenciar entre sí. El parámetro `inverse:` lo deletrea.
- **Reglas de delete**: `.cascade` (borra los hijos también), `.nullify` (pone el parent en nil), `.deny` (rechaza el borrado si hay hijos), `.noAction` (tú lo manejas). `.cascade` es el más común para hijos owned.
- **Las relaciones to-many empiezan como `[]`**, no `nil`. Las to-one suelen ser opcionales.
- **Sin many-to-many bajo CloudKit** sin un modelo join. Haz una clase `Membership` con dos relaciones to-one.

---

## Queries — el lado de lectura

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

Predicates dinámicos — cuando el filtro depende del input de un padre:

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

Gotchas de predicates:

- `#Predicate` es una macro. El body se parsea en tiempo de compilación, así que la mayoría del Swift puro no funciona — solo el subset soportado.
- `String.contains`, `String.localizedStandardContains`, comparaciones, aritmética básica y traversar relaciones funciona.
- Closures, métodos custom y la mayoría de propiedades computadas no funcionan. Mueve esa lógica afuera del predicate.

---

## Escrituras — `ModelContext`

```swift
@Environment(\.modelContext) private var context

// Insert
let task = Task(title: "New task")
context.insert(task)

// Update — solo muta el modelo. Los cambios se trackean automáticamente.
task.completed = true

// Delete
context.delete(task)

// Save explícito (normalmente auto-saved en el siguiente run loop)
try context.save()
```

No hagas `context.save()` después de cada mutación. SwiftData batchea y auto-savea. Saveá explícitamente solo antes de cruzar un límite de proceso (export, share, transición a background task).

---

## Setup de CloudKit — checklist de entitlements + capabilities

1. En Xcode, target → Signing & Capabilities → agrega la capability **iCloud**.
2. Marca **CloudKit** bajo iCloud Services.
3. Agrega un container de CloudKit: `iCloud.com.yourdomain.appname`. Debe matchear lo que pongas en `ModelConfiguration`.
4. Agrega la capability **Background Modes** con **Remote notifications** marcado. Así es como CloudKit pushea notificaciones de cambio.
5. En el setup del model container:

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

6. Corre en dos dispositivos firmados a la misma cuenta de iCloud. Haz un cambio en uno. Espera. (El sync no es instantáneo — típicamente 5-30 segundos.)

---

## Restricciones de CloudKit — qué se niega SwiftData a pushear a la nube

- **Constraints únicos.** Aplícalos en código, no en el schema.
- **Propiedades required-on-create sin defaults.** Cada propiedad necesita un default.
- **Relaciones to-one no opcionales.** Hazlas opcionales.
- **`@Attribute(.transformable)` con transformers custom.** CloudKit necesita tipos primitive-compatible.
- **Relaciones sin inversa.** Ambos lados se deben referenciar.

Cuando CloudKit silenciosamente se niega a sincronizar, revisa Console.app en el dispositivo por entradas `CKError`. Los comunes:

| Error | Qué significa |
| --- | --- |
| `partialFailure` | Algunos records sincronizaron, otros no. Revisa el diccionario `partialErrorsByItemID`. |
| `quotaExceeded` | El usuario está sin espacio de iCloud. Surfacea un mensaje amable. |
| `notAuthenticated` | El usuario no está firmado a iCloud. Pídeselo vía Settings. |
| `serverRecordChanged` | Un conflicto de merge. SwiftData usualmente resuelve last-writer-wins. |
| `zoneNotFound` | El schema todavía no fue pusheado — pasa una vez en el primer sync. |

---

## Migraciones

Cuando cambias la forma de un `@Model`, SwiftData intenta una migración liviana automáticamente. Puede manejar:

- Agregar propiedades (con defaults)
- Quitar propiedades
- Renombrar vía `@Attribute(originalName: "oldName")`
- Cambiar la cardinalidad de una relación (a veces — testea a fondo)

Para cambios más pesados, usa `VersionedSchema` y `SchemaMigrationPlan`:

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

Después pasa el plan al init de tu `ModelContainer`.

Testea las migraciones sobre una base de datos poblada antes de enviar. El Simulator se puede borrar — los usuarios de producción no.

---

## Cuándo saltarse SwiftData

SwiftData es la jugada correcta para el tipo de datos que SwiftUI es bueno mostrando: listas de items estructurados, con relaciones, que necesitan sync. No es la jugada correcta para:

- **Data de series de tiempo de alto volumen** (lecturas de sensores, analytics). Usa SQLite directo o un formato de streaming.
- **Blobs binarios grandes** (videos, imágenes grandes). Guarda el binario en `FileManager` o `CloudKit.Asset`. Guarda un path/referencia en SwiftData.
- **Sync cross-platform que no sea solo-iCloud.** SwiftData + CloudKit está locked a plataformas Apple con cuentas de iCloud. Para Android/web, construye tu propia capa de sync.
- **Encriptado at-rest con tus propias keys.** SwiftData usa la clase estándar de data protection. Para E2EE, agrégalo encima.

---

## Bugs comunes

1. **"Mi view no se actualiza cuando agrego un nuevo item."** Asegúrate de estar usando `@Query`, no `[Model]`. `@Query` es reactivo.

2. **"El sync de CloudKit funciona localmente pero no entre dispositivos."** Revisa el CloudKit Dashboard (icloud.developer.apple.com) — puede ser que el schema no se haya pusheado a producción. Corre la app en debug una vez, después despliega el schema vía el botón "Deploy Schema to Production" del dashboard.

3. **"El predicate crashea en runtime."** Escribiste algo que la macro del predicate no puede manejar. Mueve la lógica a una propiedad computada en el modelo o filtra post-fetch.

4. **"`context.save()` tira un error."** Lee el error. Suele ser un problema de integridad de relación (inversa faltante, objeto deleted-but-referenced). Arregla la data, no el save.

5. **"Las migraciones tienen éxito en Simulator, fallan en TestFlight."** Los usuarios de TestFlight tienen formas de data reales que no testeaste. Siempre testea los caminos de migración con data seedeada que matchee producción.

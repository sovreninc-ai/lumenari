# SwiftData + CloudKit

La stack de persistance livrée avec iOS 17+. SwiftData est le store local. CloudKit (via l'intégration automatique de SwiftData) est la couche de sync cross-device gratuite. Ensemble, ils remplacent Core Data + NSPersistentCloudKitContainer avec une bien plus petite surface — mais les règles de CloudKit s'appliquent toujours.

---

## Le modèle minimal viable

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

Remarques sur la forme :

- `final class` — SwiftData l'exige.
- Chaque propriété a une valeur par défaut. C'est non négociable pour la sync CloudKit — le schéma CloudKit d'Apple ne supporte pas les champs requis-à-la-création-seulement.
- `id: UUID` — utile pour une identité stable, mais SwiftData génère son propre `persistentModelID` que vous pouvez aussi utiliser. Gardez un `id` explicite si vous tenez aux références externes (URL, formats d'export).
- Pas de contrainte `@unique`. CloudKit ne supporte pas l'unicité. Faites-la respecter dans le code.

---

## Relations

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

Règles :

- **Les relations inverses sont obligatoires sous CloudKit.** Les deux côtés doivent se référencer. Le paramètre `inverse:` l'explicite.
- **Règles de suppression** : `.cascade` (supprimer aussi les enfants), `.nullify` (mettre le parent à nil), `.deny` (refuser de supprimer si des enfants existent), `.noAction` (vous le gérez). `.cascade` est la plus courante pour les enfants possédés.
- **Les relations to-many démarrent à `[]`**, pas `nil`. Les relations to-one sont en général optionnelles.
- **Pas de many-to-many sous CloudKit** sans un modèle de jointure. Faites une classe `Membership` avec deux relations to-one.

---

## Queries — le côté lecture

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

Prédicats dynamiques — quand le filtre dépend de l'input d'un parent :

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

Pièges des prédicats :

- `#Predicate` est une macro. Le body est parsé à la compilation, donc la plupart du code Swift pur ne fonctionnera pas — seul le sous-ensemble supporté.
- `String.contains`, `String.localizedStandardContains`, comparaisons, arithmétique de base et traversée de relations fonctionnent.
- Les closures, méthodes custom et la plupart des propriétés calculées ne fonctionnent pas. Sortez cette logique du prédicat.

---

## Writes — `ModelContext`

```swift
@Environment(\.modelContext) private var context

// Insert
let task = Task(title: "New task")
context.insert(task)

// Update — il suffit de muter le modèle. Les changements sont trackés automatiquement.
task.completed = true

// Delete
context.delete(task)

// Save explicite (en général auto-saved au prochain run loop)
try context.save()
```

Ne faites pas `context.save()` après chaque mutation. SwiftData batche et auto-save. Sauvegardez explicitement uniquement avant de traverser une frontière de processus (export, share, transition de tâche en background).

---

## Configuration CloudKit — la checklist entitlements + capabilities

1. Dans Xcode, target → Signing & Capabilities → ajoutez la capability **iCloud**.
2. Cochez **CloudKit** sous iCloud Services.
3. Ajoutez un container CloudKit : `iCloud.com.yourdomain.appname`. Doit matcher ce que vous mettez dans `ModelConfiguration`.
4. Ajoutez la capability **Background Modes** avec **Remote notifications** coché. C'est ainsi que CloudKit push les notifications de changement.
5. Dans la configuration du model container :

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

6. Lancez sur deux devices connectés au même compte iCloud. Faites un changement sur l'un. Attendez. (La sync n'est pas instantanée — typiquement 5-30 secondes.)

---

## Contraintes CloudKit — ce que SwiftData refuse de pusher au cloud

- **Contraintes d'unicité.** À appliquer dans le code, pas dans le schéma.
- **Propriétés requises à la création sans default.** Chaque propriété a besoin d'un default.
- **Relations to-one non optionnelles.** Rendez-les optionnelles.
- **`@Attribute(.transformable)` avec des transformers custom.** CloudKit a besoin de types compatibles primitifs.
- **Relations sans inverse.** Les deux côtés doivent se référencer.

Quand CloudKit refuse silencieusement de synchroniser, vérifiez Console.app sur le device pour des entrées `CKError`. Les plus courantes :

| Erreur | Ce que ça veut dire |
| --- | --- |
| `partialFailure` | Certains enregistrements ont sync, d'autres pas. Vérifiez le dictionnaire `partialErrorsByItemID`. |
| `quotaExceeded` | L'utilisateur n'a plus d'espace iCloud. Faites remonter un message amical. |
| `notAuthenticated` | L'utilisateur n'est pas connecté à iCloud. Invitez-le via les Réglages. |
| `serverRecordChanged` | Un conflit de merge. SwiftData résout en général en last-writer-wins. |
| `zoneNotFound` | Le schéma n'a pas encore été pushé — arrive une fois à la première sync. |

---

## Migrations

Quand vous changez la forme d'un `@Model`, SwiftData tente une migration légère automatiquement. Il peut gérer :

- Ajouter des propriétés (avec defaults)
- Supprimer des propriétés
- Renommer via `@Attribute(originalName: "oldName")`
- Changer la cardinalité d'une relation (parfois — testez bien)

Pour des changements plus lourds, utilisez un `VersionedSchema` et un `SchemaMigrationPlan` :

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

Puis passez le plan à l'init de votre `ModelContainer`.

Testez les migrations sur une base peuplée avant de livrer. Le Simulator peut être wipé — pas les utilisateurs en production.

---

## Quand sauter SwiftData

SwiftData est le bon choix pour le genre de données que SwiftUI est doué à afficher : listes d'éléments structurés, avec relations, qui ont besoin de synchroniser. Ce n'est pas le bon choix pour :

- **Données time-series à fort volume** (relevés de capteurs, analytique). Utilisez SQLite directement ou un format streaming.
- **Gros blobs binaires** (vidéos, grosses images). Stockez le binaire dans `FileManager` ou `CloudKit.Asset`. Stockez un chemin/référence dans SwiftData.
- **Sync cross-platform qui n'est pas iCloud-only.** SwiftData + CloudKit est verrouillé aux plateformes Apple avec comptes iCloud. Pour Android/web, construisez votre propre couche de sync.
- **Chiffré au repos avec vos propres clés.** SwiftData utilise la classe de protection de données standard. Pour de l'E2EE, posez-le par-dessus.

---

## Bugs courants

1. **« Ma vue ne se met pas à jour quand j'ajoute un nouvel élément. »** Assurez-vous d'utiliser `@Query`, pas `[Model]`. `@Query` est réactif.

2. **« La sync CloudKit marche en local mais pas entre les devices. »** Vérifiez le CloudKit Dashboard (icloud.developer.apple.com) — le schéma n'a peut-être pas été pushé en production. Lancez l'app en debug une fois, puis déployez le schéma via le bouton « Deploy Schema to Production » du dashboard.

3. **« Le prédicat crash au runtime. »** Vous avez écrit quelque chose que la macro de prédicat ne peut pas gérer. Déplacez la logique dans une propriété calculée sur le modèle ou filtrez après le fetch.

4. **« `context.save()` lance une erreur. »** Lisez l'erreur. C'est en général un problème d'intégrité de relation (inverse manquant, objet supprimé mais référencé). Corrigez les données, pas le save.

5. **« Les migrations passent sur Simulator, échouent sur TestFlight. »** Les utilisateurs TestFlight ont de vraies formes de données que vous n'avez pas testées. Testez toujours les chemins de migration avec des données seedées qui matchent la production.

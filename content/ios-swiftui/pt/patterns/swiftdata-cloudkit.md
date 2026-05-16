# SwiftData + CloudKit

A stack de persistência que veio com iOS 17+. SwiftData é o store local. CloudKit (via integração automática do SwiftData) é a camada gratuita de sync cross-device. Juntos eles substituem Core Data + NSPersistentCloudKitContainer com uma superfície bem menor — mas as regras do CloudKit continuam valendo.

---

## O modelo mínimo viável

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

Notas sobre o formato:

- `final class` — SwiftData exige.
- Toda propriedade tem valor default. Inegociável para sync CloudKit — o schema CloudKit da Apple não suporta campos obrigatórios-só-na-criação.
- `id: UUID` — útil para identidade estável, mas o SwiftData gera o próprio `persistentModelID` que você também pode usar. Mantenha um `id` explícito se importa referência externa (URLs, formatos de export).
- Sem constraint `@unique`. CloudKit não suporta uniqueness. Aplique em código.

---

## Relacionamentos

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

Regras:

- **Relacionamentos inversos são obrigatórios sob CloudKit.** Os dois lados precisam se referenciar. O parâmetro `inverse:` deixa explícito.
- **Delete rules**: `.cascade` (delete children também), `.nullify` (set parent para nil), `.deny` (recuse delete se houver children), `.noAction` (você cuida). `.cascade` é o mais comum para children possuídos.
- **Relacionamentos to-many começam como `[]`**, não `nil`. Relacionamentos to-one geralmente são opcionais.
- **Sem many-to-many sob CloudKit** sem um modelo de join. Faça uma classe `Membership` com dois relacionamentos to-one.

---

## Queries — o lado de leitura

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

Predicates dinâmicos — quando o filtro depende de input do parent:

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

Gotchas de predicate:

- `#Predicate` é um macro. O body é parseado em tempo de compilação, então a maior parte de código Swift puro não vai funcionar — só o subconjunto suportado.
- `String.contains`, `String.localizedStandardContains`, comparações, aritmética básica e traversal de relacionamentos funcionam.
- Closures, métodos custom e a maioria das propriedades computadas não funcionam. Mova essa lógica para fora do predicate.

---

## Escritas — `ModelContext`

```swift
@Environment(\.modelContext) private var context

// Insert
let task = Task(title: "New task")
context.insert(task)

// Update — só mute o modelo. Mudanças são rastreadas automaticamente.
task.completed = true

// Delete
context.delete(task)

// Save explícito (geralmente auto-salvo no próximo run loop)
try context.save()
```

Não `context.save()` depois de cada mutação. SwiftData faz batch e auto-save. Salve explícito só antes de cruzar uma fronteira de processo (export, share, transição para background task).

---

## Setup CloudKit — o checklist de entitlements + capabilities

1. No Xcode, target → Signing & Capabilities → adicione a capability **iCloud**.
2. Marque **CloudKit** sob iCloud Services.
3. Adicione um container CloudKit: `iCloud.com.seudominio.appname`. Precisa bater com o que você colocou no `ModelConfiguration`.
4. Adicione a capability **Background Modes** com **Remote notifications** marcado. É assim que o CloudKit empurra notificações de mudança.
5. No setup do model container:

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

6. Rode em dois devices logados na mesma conta iCloud. Faça uma mudança num. Espere. (Sync não é instantâneo — normalmente 5-30 segundos.)

---

## Restrições do CloudKit — o que o SwiftData recusa empurrar para a nuvem

- **Unique constraints.** Aplique em código, não no schema.
- **Propriedades obrigatórias na criação sem default.** Toda propriedade precisa de default.
- **Relacionamentos to-one não opcionais.** Faça opcionais.
- **`@Attribute(.transformable)` com transformers customizados.** CloudKit precisa de tipos compatíveis com primitivas.
- **Relacionamentos sem inverso.** Os dois lados precisam se referenciar.

Quando o CloudKit silenciosamente se recusa a sincronizar, cheque o Console.app no device por entradas `CKError`. Os comuns:

| Erro | O que significa |
| --- | --- |
| `partialFailure` | Alguns records sincronizaram, outros não. Cheque o dict `partialErrorsByItemID`. |
| `quotaExceeded` | Usuário sem espaço no iCloud. Mostre mensagem amigável. |
| `notAuthenticated` | Usuário não está logado no iCloud. Convide via Settings. |
| `serverRecordChanged` | Conflito de merge. SwiftData normalmente resolve last-writer-wins. |
| `zoneNotFound` | Schema ainda não foi empurrado — acontece uma vez no primeiro sync. |

---

## Migrations

Quando você muda o formato de um `@Model`, o SwiftData tenta uma migration leve automaticamente. Ele lida com:

- Adicionar propriedades (com defaults)
- Remover propriedades
- Renomear via `@Attribute(originalName: "oldName")`
- Mudar cardinalidade de relacionamento (às vezes — teste bem)

Para mudanças mais pesadas, use um `VersionedSchema` e um `SchemaMigrationPlan`:

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

Depois passe o plan no init do seu `ModelContainer`.

Teste migrations num banco populado antes de lançar. O Simulator pode ser limpo — usuários de produção não.

---

## Quando pular o SwiftData

SwiftData é a chamada certa para o tipo de dado que o SwiftUI exibe bem: listas de itens estruturados, com relacionamentos, que precisam sincronizar. Não é a chamada certa para:

- **Dados time-series de alto volume** (leituras de sensor, analytics). Use SQLite direto ou um formato em stream.
- **Blobs binários grandes** (vídeos, imagens grandes). Guarde o binário em `FileManager` ou `CloudKit.Asset`. Guarde um path/referência no SwiftData.
- **Sync cross-platform que não é só iCloud.** SwiftData + CloudKit está travado em plataformas Apple com contas iCloud. Para Android/web, construa sua própria camada de sync.
- **Encriptado-em-repouso com suas próprias keys.** SwiftData usa a classe de proteção de dados padrão. Para E2EE, coloque por cima.

---

## Bugs comuns

1. **"Minha view não atualiza quando adiciono um item novo."** Garanta que está usando `@Query`, não `[Model]`. `@Query` é reativo.

2. **"Sync CloudKit funciona local mas não entre devices."** Cheque o CloudKit Dashboard (icloud.developer.apple.com) — o schema pode não ter sido empurrado para produção. Rode o app em debug uma vez, depois deploy o schema via o botão "Deploy Schema to Production" do dashboard.

3. **"Predicate crasha em runtime."** Você escreveu algo que o macro de predicate não consegue tratar. Mova a lógica para uma propriedade computada no modelo ou filtre pós-fetch.

4. **"`context.save()` lança erro."** Leia o erro. Geralmente é problema de integridade de relacionamento (inverso faltando, objeto deletado-mas-referenciado). Conserte os dados, não o save.

5. **"Migrations passam no Simulator, falham no TestFlight."** Usuários de TestFlight têm formatos de dado reais que você não testou. Sempre teste caminhos de migration com dados seedados que combinam com produção.

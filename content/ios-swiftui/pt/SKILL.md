# Pacote de Produção iOS / SwiftUI

> Os docs da Apple cobrem a API. Este kit cobre as decisões: quando usar `@Observable` vs. environment, onde o SwiftData quebra em escala, o que o revisor da App Store realmente checa e os gotchas do SwiftUI que aparecem em todo release.

**Otimizado para:** Claude, Claude Code, Cursor.

---

## Modo de operação

Você está pareando num app SwiftUI de produção destinado à App Store. Pressupostos padrão:

- **Swift 5.9+** e o **macro `@Observable`**. Sem `ObservableObject` / `@Published` a menos que o deployment target force.
- **NavigationStack**, não o deprecado `NavigationView`.
- **SwiftData** para persistência local. **CloudKit** para sincronização cross-device gratuita via o modificador `cloudKitDatabase` no model container.
- **Concorrência estruturada** — `async`/`await`, `Task`, actors. Sem `DispatchQueue.main.async` a menos que você esteja dentro de uma API de callback.
- **Privacy manifest (`PrivacyInfo.xcprivacy`) não é opcional** desde maio de 2024. Revisores rejeitam sem ele.
- **App Store Review Guidelines** são a spec. Se a IA sugerir algo que falha 2.1, 4.2 ou 5.1.1, empurre de volta.

Se o usuário pedir código que parece Android ou React Native — `Provider`, `BLoC`, observable subjects, prop drilling — traduza para o idioma Swift. SwiftUI recompensa pensar em views + state + environment, não em streams.

---

## O modelo mental

```
[ View (struct, tipo valor) ]
        │
        ├── @State para verdade local da view
        ├── @Bindable para binding de duas vias com um modelo @Observable
        ├── @Environment(\.coisa) para dependências ambientes
        └── @Query para leituras SwiftData (live, observado)

[ Model (class, @Observable) ]
        │
        └── Guarda o state de negócio. Mutado só via métodos.

[ ModelContainer (SwiftData) ]
        │
        └── Um por app, configurado em @main. Com CloudKit ou não.
```

A view é uma função do state. Não armazene valores derivados — calcule. Não brigue com o sistema de layout — use `Layout` ou `GeometryReader` só quando esgotar stacks + alignment guides.

---

## O exemplo canônico view + model + SwiftData

Esse é o formato que a IA deve seguir para qualquer pedido do tipo "adiciona uma feature com persistência e uma tela".

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

// MARK: - ViewModel (só quando lógica > "setar uma propriedade")
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

Alguns inegociáveis nesse formato:

1. **`@Query` não `FetchRequest`.** O read reativo do SwiftData.
2. **`NavigationLink(value:)` + `.navigationDestination`** — o padrão de navegação value-driven. Não use o init deprecado que recebe uma destination view direto.
3. **`ContentUnavailableView`** para empty states. Revisores notam quando um app tem uma tela em branco sem explicação.
4. **`@Bindable` não é necessário aqui** porque o editor pertence ao `@State` e é acessado via `$editor.title`. Use `@Bindable` quando um modelo `@Observable` é passado para uma child view.

---

## O setup `@main` (pronto para CloudKit)

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
                cloudKitDatabase: .automatic   // usa o container nos entitlements
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

Gotchas do CloudKit que a IA deve avisar:

- Toda propriedade num `@Model` precisa ter valor default OU ser opcional quando CloudKit está ligado. CloudKit não suporta campos obrigatórios-só-na-criação.
- Sem unique constraints em modelos sincronizados pelo CloudKit. Garanta uniqueness em código.
- Relacionamentos precisam ser opcionais ou ter default. Relacionamentos inversos são obrigatórios.
- O ID do container CloudKit nos entitlements precisa bater com o bundle ID exatamente. `iCloud.com.seudominio.workouts`.

---

## Concorrência — as regras que importam

```swift
// Bom: concorrência estruturada, isolamento MainActor onde a UI mora.
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

// Na view:
.task { await loader.load() }
```

Regras:

1. **`.task` cancela quando a view sai.** Use para trabalho async com escopo de tela. Não spawn `Task { }` em `.onAppear` a menos que tenha motivo.
2. **`@MainActor` no modelo** se ele é lido pelo SwiftUI. Pule as danças manuais de `await MainActor.run { }`.
3. **Actors para state mutável compartilhado** fora da UI — um cache, um manager de websocket. Não para view models.
4. **`async let` para trabalho paralelo**, `withTaskGroup` para fan-out dinâmico, `Task.detached` só quando realmente precisar de um domínio de isolamento separado (quase nunca).

---

## Acessibilidade — as quatro coisas que revisores checam

1. **Labels de VoiceOver.** Botões só com ícone precisam de `.accessibilityLabel("Add workout")`. SF Symbols não carregam significado para o VoiceOver.
2. **Dynamic Type.** Use `.font(.body)`, `.font(.headline)`. Não hardcode `.system(size: 17)`. Teste em AX5 (maior tamanho de acessibilidade).
3. **Contraste.** Use `Color.primary`, `Color.secondary`, cores semânticas. Cores customizadas precisam bater WCAG AA (4,5:1 para texto de body).
4. **Reduced motion.** Embrulhe animações grandes em `@Environment(\.accessibilityReduceMotion)` e ofereça um fallback de cross-fade.

---

## O que este kit recusa fazer

- Sugerir `ObservableObject` + `@Published` quando o target é iOS 17+. Use `@Observable`.
- Escrever `NavigationView` em código novo. Está deprecado.
- Usar publishers de `Combine` para state de view. SwiftUI tem o próprio sistema de observação.
- Pular o privacy manifest. Apps sem `PrivacyInfo.xcprivacy` são rejeitados se chamam APIs required-reason (file timestamp, user defaults, system boot time, disk space, teclados ativos).
- Recomendar `force-unwrap` em URLs, nomes de assets ou IDs de modelo. Use `URL(string:)` retornando opcional, falhe fechado.
- Escrever testes que batem na rede real. Mocke a camada de API.

---

## Docs complementares

- `patterns/swiftui-idioms.md` — Observable, environment, navigation, sheets, a lista de gotchas do SwiftUI
- `patterns/swiftdata-cloudkit.md` — schemas, relacionamentos, predicates, migration, entitlements CloudKit
- `checklists/app-store-readiness.md` — privacy manifest, screenshots, detalhes de App Privacy, TestFlight, motivos comuns de rejeição

---

## Checklist de sanidade antes de mergear qualquer PR SwiftUI

- [ ] Todas as views são `struct`, todos os modelos são `final class`
- [ ] Sem `ObservableObject` em código com target iOS 17+
- [ ] `NavigationStack` em todo lugar, não `NavigationView`
- [ ] Trabalho async usa `.task` e não `Task { }` em `.onAppear`
- [ ] Empty states renderizam `ContentUnavailableView`
- [ ] Labels de VoiceOver em botões só com ícone
- [ ] Dynamic Type funciona em AX5 sem truncamento
- [ ] Privacy manifest existe e lista toda API required-reason usada
- [ ] Nenhum `print(...)` deixado em código de produção — use `Logger`

# Idiomas do SwiftUI

Os padrões que aparecem em toda base de código SwiftUI, e os gotchas que pegam em todo release. Escrito assumindo Swift 5.9+ e iOS 17+ como piso.

---

## State, observação e binding — para o que pegar

| Situação | Use |
| --- | --- |
| Uma view possui um pequeno pedaço de state que mais ninguém precisa | `@State` |
| Uma child view precisa mutar um `@State` do parent | Passe `$value` como `Binding` |
| Um view-model com propriedades computadas ou métodos | `@Observable final class` + `@State private var vm = VM()` |
| Um view-model do parent, usado pelo child para binding de duas vias | Parent: `@State var vm = VM()`. Child: `@Bindable var vm: VM` |
| Dependência ambiente (ex.: uma sessão, um tema) | `@Environment(\.coisa)` + extensão de `EnvironmentValues` |
| Leitura de linhas SwiftData | `@Query(sort: \Model.field, order: .reverse) var items: [Model]` |
| UserDefaults reativo | `@AppStorage("key") var thing: String = "default"` |
| Leitura de um objeto SwiftData passado pelo parent | Propriedade: `var item: Item` (leitura) ou `@Bindable var item: Item` (escrita) |

Erro comum: usar `@StateObject` em iOS 17+. Com `@Observable`, o pareamento correto é `@State` (para posse) + `@Bindable` (para binding de duas vias num child). `@StateObject` é do mundo antigo `ObservableObject`.

---

## Navegação — value-driven, não view-driven

```swift
struct RootView: View {
    @State private var path = NavigationPath()

    var body: some View {
        NavigationStack(path: $path) {
            List {
                NavigationLink("Settings", value: Route.settings)
                NavigationLink("Profile", value: Route.profile(userID: currentUser.id))
            }
            .navigationDestination(for: Route.self) { route in
                switch route {
                case .settings: SettingsView()
                case .profile(let id): ProfileView(userID: id)
                }
            }
        }
    }
}

enum Route: Hashable {
    case settings
    case profile(userID: UUID)
}
```

Por quê: navegação programática vira trivial (`path.append(Route.profile(...))`), deep linking é só um decoder de `NavigationPath`, e o deprecado `NavigationLink(destination:)` saiu.

Para sheets e full-screen covers: use `.sheet(item:)` com um Identifiable opcional, não `.sheet(isPresented:)` mais um `@State` à parte para o item.

```swift
@State private var editing: Workout?

// ...
.sheet(item: $editing) { workout in
    WorkoutEditor(workout: workout)
}
```

---

## Sheets que precisam mutar o parent

```swift
struct ParentView: View {
    @State private var name = ""
    @State private var showingEditor = false

    var body: some View {
        VStack {
            Text(name)
            Button("Edit") { showingEditor = true }
        }
        .sheet(isPresented: $showingEditor) {
            NameEditor(name: $name)
        }
    }
}

struct NameEditor: View {
    @Binding var name: String
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        Form {
            TextField("Name", text: $name)
        }
        .toolbar {
            ToolbarItem(placement: .confirmationAction) {
                Button("Done") { dismiss() }
            }
        }
    }
}
```

Não passe um callback de closure tipo `onSave: (String) -> Void`. Bindings são o jeito SwiftUI.

---

## Lists — performance + UX

```swift
List {
    ForEach(workouts) { workout in
        WorkoutRow(workout: workout)
    }
    .onDelete { offsets in
        for i in offsets { context.delete(workouts[i]) }
    }
}
.listStyle(.insetGrouped)
.refreshable {
    await viewModel.reload()
}
.searchable(text: $query)
```

Gotchas:

- **Não coloque computações caras dentro da row.** Compute uma vez no modelo.
- **`Identifiable` importa.** Se itens não têm IDs estáveis, `ForEach` redesenha tudo.
- **`.refreshable` é async.** Não dispare um `Task { }` — só `await` direto.
- **`LazyVStack` dentro de um `ScrollView`** é a alternativa quando você precisa de mais controle de layout do que o `List` dá. List é mais rápido e bonito por default — use a menos que tenha motivo.

---

## Forms — as primitivas certas

```swift
Form {
    Section("Basics") {
        TextField("Title", text: $title)
        DatePicker("Date", selection: $date, displayedComponents: .date)
        Toggle("Reminder", isOn: $reminder)
    }
    Section("Notes") {
        TextField("Notes", text: $notes, axis: .vertical)
            .lineLimit(3...8)
    }
    if !isValid {
        Section { } footer: {
            Text("Title is required.")
                .foregroundStyle(.red)
        }
    }
}
.scrollDismissesKeyboard(.interactively)
.toolbar {
    ToolbarItemGroup(placement: .keyboard) {
        Spacer()
        Button("Done") { focusedField = nil }
    }
}
```

`Form` te dá o visual inset grouped de graça. Use headers e footers de `Section` para dicas e mensagens de validação. Esconda o teclado com `.scrollDismissesKeyboard(.interactively)`.

---

## Animações — os quatro modifiers que vale conhecer

| Modifier | Use quando |
| --- | --- |
| `.animation(.smooth, value: state)` | Animar quando `state` muda (preferido desde iOS 17) |
| `withAnimation { state = ... }` | Animar uma mutação de state específica |
| `.transition(.move(edge: .bottom))` | Animação de insert/remove para uma view condicional |
| `.matchedGeometryEffect(id:in:)` | Animações hero entre duas views |

Respeite reduced motion:

```swift
@Environment(\.accessibilityReduceMotion) var reduceMotion

// ...
.animation(reduceMotion ? .none : .smooth, value: state)
```

---

## Gotchas que aparecem em todo release

1. **O body da view roda muitas vezes.** Não bote `print(...)` para debug lá — use `let _ = Self._printChanges()`, que loga *por que* aconteceu um redraw.

2. **Inicializadores `@State` rodam uma vez, não por redraw.** `@State private var thing = expensiveCompute()` está ok. Mas se `expensiveCompute()` depende de uma prop passada para a view, não vai rerodar quando a prop mudar — use `.onChange(of: prop)` ou mova para um view-model.

3. **`if let` em bodies de view é sintaxe de unwrap, não atalho de binding.** Para bindar num opcional, use `Binding(get:set:)` ou os novos padrões `$value.unwrapped` via property wrappers customizados.

4. **Leituras `@Environment` precisam bater no tipo exato.** `@Environment(\.modelContext)` retorna `ModelContext`. `@Environment(\.dismiss)` retorna `DismissAction`. Custom environment values precisam que a key e o tipo do valor batam.

5. **Cancelamento de `Task` é cooperativo.** Dentro de uma função async, chame `try Task.checkCancellation()` em pontos de iteração. O modificador `.task` do SwiftUI cancela para você quando a view some, mas só se você checar.

6. **TextField com `axis: .vertical` precisa de `lineLimit(_...:)`** para realmente crescer. Default é uma linha.

7. **`onAppear` roda uma vez. `onChange` roda em toda mudança.** Se precisar dos dois, use `.task(id:)` — ele roda no appear e re-roda quando o id muda.

8. **Evite `GeometryReader` para dimensionar children.** Ele expande para preencher o espaço disponível e frequentemente quebra layout. Prefira o protocolo `Layout` ou alignment guides para layout customizado.

---

## Cheat sheet de placement de toolbar

| Placement | O que faz |
| --- | --- |
| `.primaryAction` | Botão primário no canto superior direito (Add, Save) |
| `.confirmationAction` | Confirmação de sheet/modal (Done, Save) |
| `.cancellationAction` | Cancelar de sheet/modal |
| `.navigation` | Área do botão back, lado esquerdo |
| `.topBarLeading` / `.topBarTrailing` | Posicionamento explícito quando necessário |
| `.keyboard` | Acima do teclado (botão Done para campos de texto) |
| `.bottomBar` | Toolbar inferior (iOS) |

Não bote um botão em `.navigation` se for ação primária. Use `.primaryAction`.

---

## Quando o SwiftUI não basta

Pontes para UIKit às vezes são a chamada certa. Use `UIViewRepresentable` ou `UIViewControllerRepresentable`:

- Uma text view customizada com renderização de attributed string que ninguém faz no SwiftUI
- Câmera ou photo picker (mas wrappers de `PhotosPicker` + `AVCaptureSession` cobrem a maioria dos casos)
- Um SDK de terceiro que expõe um `UIView` ou `UIViewController` e se recusa a ser substituído

Não pontue para coisas que o SwiftUI agora lida nativamente: mapas (`Map`), web views (`WebView` chegando, ponte com `WKWebView` até lá), photo picker (`PhotosPicker`), share sheet (`ShareLink`).

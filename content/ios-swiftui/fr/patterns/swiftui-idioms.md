# Idiomes SwiftUI

Les patterns qui apparaissent dans chaque codebase SwiftUI, et les pièges qui mordent à chaque release. Écrit en supposant Swift 5.9+ et iOS 17+ comme plancher.

---

## State, observation et binding — vers quoi tendre la main

| Situation | Tendre la main vers |
| --- | --- |
| Une vue possède un petit morceau de state que personne d'autre n'a besoin | `@State` |
| Une vue enfant a besoin de muter le `@State` d'un parent | Passer `$value` comme `Binding` |
| Un view-model avec propriétés calculées ou méthodes | `@Observable final class` + `@State private var vm = VM()` |
| Un view-model possédé par le parent, utilisé par l'enfant pour un binding bidirectionnel | Parent : `@State var vm = VM()`. Enfant : `@Bindable var vm: VM` |
| Dépendance ambiante (par ex. une session, un thème) | `@Environment(\.thing)` + extension `EnvironmentValues` |
| Lecture de lignes SwiftData | `@Query(sort: \Model.field, order: .reverse) var items: [Model]` |
| UserDefaults réactif | `@AppStorage("key") var thing: String = "default"` |
| Lire un objet SwiftData passé depuis un parent | Propriété : `var item: Item` (lecture) ou `@Bindable var item: Item` (écriture) |

Erreur courante : utiliser `@StateObject` en iOS 17+. Avec `@Observable`, l'appariement correct est `@State` (pour la propriété) + `@Bindable` (pour le binding bidirectionnel dans un enfant). `@StateObject` est pour l'ancien monde `ObservableObject`.

---

## Navigation — value-driven, pas view-driven

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

Pourquoi : la navigation programmatique devient triviale (`path.append(Route.profile(...))`), le deep linking n'est qu'un décodeur de `NavigationPath`, et le `NavigationLink(destination:)` déprécié n'est plus là.

Pour les sheets et full-screen covers : utilisez `.sheet(item:)` avec un Identifiable optionnel, pas `.sheet(isPresented:)` plus un `@State` à côté pour l'item.

```swift
@State private var editing: Workout?

// ...
.sheet(item: $editing) { workout in
    WorkoutEditor(workout: workout)
}
```

---

## Sheets qui doivent muter le parent

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

Ne passez pas un callback closure du genre `onSave: (String) -> Void`. Les bindings sont la façon SwiftUI.

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

Pièges :

- **Ne mettez pas de calculs coûteux à l'intérieur de la row.** Calculez une fois dans le modèle.
- **`Identifiable` compte.** Si les items manquent d'IDs stables, `ForEach` redessine tout.
- **`.refreshable` est async.** Ne lancez pas un `Task { }` — `await` directement.
- **`LazyVStack` à l'intérieur d'un `ScrollView`** est l'alternative quand vous avez besoin de plus de contrôle de layout que ce que `List` offre. `List` est plus rapide et plus joli par défaut — utilisez-le sauf raison.

---

## Forms — les bonnes primitives

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

`Form` vous donne le look inset grouped gratuitement. Utilisez les en-têtes et pieds de `Section` pour les hints et messages de validation. Cachez le clavier avec `.scrollDismissesKeyboard(.interactively)`.

---

## Animations — les quatre modifiers qui valent la peine

| Modifier | À utiliser quand |
| --- | --- |
| `.animation(.smooth, value: state)` | Animer quand `state` change (préféré depuis iOS 17) |
| `withAnimation { state = ... }` | Animer une mutation de state spécifique |
| `.transition(.move(edge: .bottom))` | Animation d'insertion/suppression pour une vue conditionnelle |
| `.matchedGeometryEffect(id:in:)` | Animations « hero » entre deux vues |

Respectez reduced motion :

```swift
@Environment(\.accessibilityReduceMotion) var reduceMotion

// ...
.animation(reduceMotion ? .none : .smooth, value: state)
```

---

## Pièges qui sortent à chaque release

1. **Le body de la vue tourne plein de fois.** N'y mettez pas du `print(...)` de debug — utilisez `let _ = Self._printChanges()` à la place, qui logue *pourquoi* un redraw s'est produit.

2. **Les initializers `@State` tournent une fois, pas par redraw.** `@State private var thing = expensiveCompute()` est OK. Mais si `expensiveCompute()` dépend d'une prop passée à la vue, ça ne re-tournera pas quand la prop change — utilisez `.onChange(of: prop)` ou passez à un view-model.

3. **`if let` dans les bodies de vue est de la syntaxe d'unwrapping, pas un raccourci de binding.** Pour binder à un optional, utilisez `Binding(get:set:)` ou les nouveaux patterns `$value.unwrapped` via des property wrappers custom.

4. **Les lectures `@Environment` doivent matcher le type exactement.** `@Environment(\.modelContext)` renvoie un `ModelContext`. `@Environment(\.dismiss)` renvoie une `DismissAction`. Les environment values custom ont besoin que la clé et le type de valeur s'alignent.

5. **L'annulation de `Task` est coopérative.** À l'intérieur d'une fonction async, appelez `try Task.checkCancellation()` aux points d'itération. Le modifier `.task` de SwiftUI annule pour vous quand la vue disparaît, mais seulement si vous vérifiez.

6. **TextField avec `axis: .vertical` a besoin de `lineLimit(_...:)`** pour réellement grandir. Par défaut, c'est single-line.

7. **`onAppear` tourne une fois. `onChange` tourne à chaque changement.** Si vous avez besoin des deux, utilisez `.task(id:)` — il tourne à l'appear et re-tourne quand l'id change.

8. **Évitez `GeometryReader` pour dimensionner les enfants.** Il s'étend pour remplir l'espace disponible et casse fréquemment le layout. Préférez le protocole `Layout` ou les alignment guides pour du layout custom.

---

## Antisèche de placement de toolbar

| Placement | Ce que ça fait |
| --- | --- |
| `.primaryAction` | Bouton principal en haut à droite (Add, Save) |
| `.confirmationAction` | Confirmation de sheet/modal (Done, Save) |
| `.cancellationAction` | Annulation de sheet/modal |
| `.navigation` | Zone du bouton back, côté gauche |
| `.topBarLeading` / `.topBarTrailing` | Positionnement explicite quand nécessaire |
| `.keyboard` | Au-dessus du clavier (bouton Done pour les text fields) |
| `.bottomBar` | Barre du bas (iOS) |

Ne mettez pas un bouton dans `.navigation` si c'est une action principale. Utilisez `.primaryAction`.

---

## Quand SwiftUI ne suffit pas

Les bridges vers UIKit sont parfois le bon choix. Utilisez `UIViewRepresentable` ou `UIViewControllerRepresentable` :

- Une text view custom avec un rendu d'attributed string que personne ne peut matcher en SwiftUI
- Caméra ou photo picker (bien que les wrappers SwiftUI `PhotosPicker` + `AVCaptureSession` couvrent la plupart des cas)
- Un SDK tiers qui expose un `UIView` ou `UIViewController` et refuse d'être remplacé

Ne bridgez pas pour ce que SwiftUI gère désormais nativement : cartes (`Map`), web views (`WebView` à venir, bridge `WKWebView` en attendant), photo picker (`PhotosPicker`), share sheet (`ShareLink`).

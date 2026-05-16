# iOS / SwiftUI Production Pack

> Les docs Apple couvrent l'API. Ce kit couvre les décisions : quand utiliser `@Observable` vs environment, où SwiftData casse à l'échelle, ce que le reviewer de l'App Store regarde vraiment, et les pièges SwiftUI qui sortent à chaque release.

**Optimisé pour :** Claude · Claude Code · Cursor.

---

## Mode opératoire

Vous travaillez en binôme sur une app SwiftUI de production destinée à l'App Store. Hypothèses par défaut :

- **Swift 5.9+** et la **macro `@Observable`**. Pas de `ObservableObject` / `@Published` sauf si la cible de déploiement l'impose.
- **NavigationStack**, pas le `NavigationView` déprécié.
- **SwiftData** pour la persistance locale. **CloudKit** pour la synchronisation cross-device gratuite via le modifier `cloudKitDatabase` sur le model container.
- **Concurrence structurée** — `async`/`await`, `Task`, actors. Pas de `DispatchQueue.main.async` sauf à l'intérieur d'une API à callback.
- **Le privacy manifest (`PrivacyInfo.xcprivacy`) est non optionnel** depuis mai 2024. Les reviewers rejetteront sans.
- **Les App Store Review Guidelines** sont la spec. Si l'IA suggère quelque chose qui échoue à 2.1, 4.2 ou 5.1.1, poussez en sens contraire.

Si l'utilisateur demande du code qui ressemble à de l'Android ou du React Native — `Provider`, `BLoC`, observable subjects, prop drilling — traduisez-le vers l'idiome Swift à la place. SwiftUI récompense la pensée en vues + state + environment, pas en streams.

---

## Le modèle mental

```
[ View (struct, value type) ]
        │
        ├── @State pour la vérité locale à la vue
        ├── @Bindable pour le binding bidirectionnel vers un modèle @Observable
        ├── @Environment(\.thing) pour les dépendances ambiantes
        └── @Query pour les lectures SwiftData (live, observées)

[ Model (class, @Observable) ]
        │
        └── Détient l'état métier. Muté uniquement via des méthodes.

[ ModelContainer (SwiftData) ]
        │
        └── Un par app, configuré dans @main. CloudKit-enabled ou pas.
```

La vue est une fonction du state. Ne stockez pas les valeurs dérivées — calculez-les. Ne combattez pas le système de layout — utilisez `Layout` ou `GeometryReader` uniquement quand vous avez épuisé stacks + alignment guides.

---

## L'exemple canonique view + model + SwiftData

C'est la forme que l'IA doit suivre pour toute demande « ajouter une fonctionnalité avec persistance et un écran ».

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

// MARK: - ViewModel (uniquement quand la logique > "set a property")
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

Quelques non-négociables dans cette forme :

1. **`@Query`, pas `FetchRequest`.** La lecture réactive de SwiftData.
2. **`NavigationLink(value:)` + `.navigationDestination`** — le pattern de navigation value-driven. N'utilisez pas l'init déprécié qui prend une destination view directement.
3. **`ContentUnavailableView`** pour les états vides. Les reviewers remarquent quand une app a un écran blanc sans explication.
4. **`@Bindable` n'est pas nécessaire ici** parce que l'editor est `@State`-owned et accédé via `$editor.title`. Utilisez `@Bindable` quand un modèle `@Observable` est passé à une vue enfant.

---

## La configuration `@main` (prête pour CloudKit)

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
                cloudKitDatabase: .automatic   // utilise le container des entitlements
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

Pièges CloudKit que l'IA doit signaler :

- Chaque propriété sur un `@Model` doit avoir une valeur par défaut OU être optionnelle quand CloudKit est activé. CloudKit ne supporte pas les champs requis-à-la-création-seulement.
- Pas de contraintes d'unicité sur les modèles synchronisés CloudKit. Imposez l'unicité dans le code.
- Les relations doivent être optionnelles ou avoir un default. Les relations inverses sont obligatoires.
- L'ID du container CloudKit dans les entitlements doit matcher l'ID du bundle exactement. `iCloud.com.yourdomain.workouts`.

---

## Concurrence — les règles qui comptent

```swift
// Bon : concurrence structurée, isolation MainActor là où vit l'UI.
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

// Dans la vue :
.task { await loader.load() }
```

Règles :

1. **`.task` est annulé quand la vue disparaît.** Utilisez-le pour le travail async lié à l'écran. Ne spawnez pas `Task { }` depuis `.onAppear` sauf raison particulière.
2. **`@MainActor` sur le modèle** s'il est lu par SwiftUI. Sautez les danses manuelles `await MainActor.run { }`.
3. **Actors pour l'état mutable partagé** en dehors de l'UI — un cache, un gestionnaire de websocket. Pas pour les view models.
4. **`async let` pour le travail parallèle**, `withTaskGroup` pour le fan-out dynamique, `Task.detached` uniquement quand vous avez vraiment besoin d'un domaine d'isolation séparé (presque jamais).

---

## Accessibilité — les quatre choses que les reviewers vérifient

1. **Labels VoiceOver.** Les boutons icon-only ont besoin de `.accessibilityLabel("Add workout")`. Les SF Symbols ne portent pas de sens pour VoiceOver.
2. **Dynamic Type.** Utilisez `.font(.body)`, `.font(.headline)`. Ne hardcodez pas `.system(size: 17)`. Testez à AX5 (la plus grande taille d'accessibilité).
3. **Contraste.** Utilisez `Color.primary`, `Color.secondary`, les couleurs sémantiques. Les couleurs custom doivent passer le WCAG AA (4.5:1 pour le texte de corps).
4. **Reduced motion.** Wrappez les grosses animations dans `@Environment(\.accessibilityReduceMotion)` et proposez un fallback en cross-fade.

---

## Ce que ce kit refuse de faire

- Suggérer `ObservableObject` + `@Published` quand on cible iOS 17+. Utilisez `@Observable`.
- Écrire `NavigationView` dans du nouveau code. C'est déprécié.
- Utiliser des publishers `Combine` pour l'état de vue. SwiftUI a son propre système d'observation.
- Sauter le privacy manifest. Les apps sans `PrivacyInfo.xcprivacy` sont rejetées si elles appellent des API à raison requise (timestamp de fichier, user defaults, system boot time, espace disque, claviers actifs).
- Recommander le `force-unwrap` sur les URL, noms d'assets ou IDs de modèles. Utilisez `URL(string:)` qui renvoie un optional, fail closed.
- Écrire des tests qui frappent le vrai réseau. Mockez la couche API.

---

## Documents compagnons

- `patterns/swiftui-idioms.md` — Observable, environment, navigation, sheets, la liste des pièges SwiftUI
- `patterns/swiftdata-cloudkit.md` — schémas, relations, prédicats, migration, entitlements CloudKit
- `checklists/app-store-readiness.md` — privacy manifest, screenshots, détails App Privacy, TestFlight, raisons de rejet courantes

---

## Checklist de sanité avant de merger toute PR SwiftUI

- [ ] Toutes les vues sont des `struct`, tous les modèles sont des `final class`
- [ ] Pas de `ObservableObject` dans du code ciblant iOS 17+
- [ ] `NavigationStack` partout, pas `NavigationView`
- [ ] Le travail async utilise `.task`, pas `Task { }` dans `.onAppear`
- [ ] Les états vides rendent un `ContentUnavailableView`
- [ ] Labels VoiceOver sur les boutons icon-only
- [ ] Dynamic Type fonctionne à AX5 sans troncature
- [ ] Le privacy manifest existe et liste chaque API à raison requise utilisée
- [ ] Pas de `print(...)` laissé dans le code en production — utilisez `Logger`

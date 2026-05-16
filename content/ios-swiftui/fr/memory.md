# Memory — iOS / SwiftUI Production Pack

## Contexte métier

Un dev SwiftUI livre des fonctionnalités en composant de petits structs `View` qui lisent du state et renvoient d'autres vues. Au quotidien, il navigue entre Xcode (l'IDE), le Simulator (ou un vrai device au câble), Instruments (pour la perf) et l'UI web App Store Connect (pour les builds, TestFlight et la soumission). La plupart livrent une app à la fois, souvent en solo ou dans une équipe de deux ou trois.

Le cycle de travail, c'est : écrire une vue, faire Cmd+R, regarder le Canvas preview se redessiner, corriger un bug de layout, ajouter du state, le persister avec SwiftData, le synchroniser via CloudKit, écrire un snapshot test, uploader sur TestFlight, recevoir le feedback, itérer. Les parties lentes : l'App Store Review (24-48 heures), les temps de build sur les gros codebases, et comprendre pourquoi une vue SwiftUI ne se met pas à jour comme vous l'attendiez.

Les devs indé se soucient des classements App Store, de l'ASO, des screenshots, des avis et de la boucle rejet-resoumission. Les devs en équipe se soucient de l'architecture modulaire, de la couverture de tests, de la vitesse de build et de l'onboarding de nouveaux ingénieurs sans bizutage « tribal knowledge Xcode ».

## Vocabulaire que l'IA doit connaître

- **HIG** : Human Interface Guidelines — les règles de design d'Apple. Mises à jour annuellement au WWDC.
- **WWDC** : Worldwide Developer Conference. Chaque juin. Nouvel OS, nouvelles API.
- **SF Symbols** : la bibliothèque d'icônes d'Apple, ~5 000 symboles, disponibles via `Image(systemName: "heart.fill")`.
- **TestFlight** : la distribution beta d'Apple. Jusqu'à 100 testeurs internes, 10 000 externes. Le build expire après 90 jours.
- **App Store Connect** : l'UI web où vous gérez les builds, metadata, prix, TestFlight, App Store Review.
- **`@Observable`** : macro Swift (iOS 17+) qui remplace `ObservableObject` + `@Published`. Trace automatiquement les lectures de propriété.
- **SwiftData** : le framework de persistance d'Apple (iOS 17+), successeur de Core Data. Classes `@Model`, lectures `@Query`.
- **CloudKit** : la sync cloud d'Apple, gratuite pour les utilisateurs, free tier généreux (1 Go/utilisateur). S'apparie avec SwiftData via `cloudKitDatabase: .automatic`.
- **Modifier `.task`** : exécute une tâche async dont la durée de vie est liée à la vue. S'annule au disappear.
- **Privacy manifest (`PrivacyInfo.xcprivacy`)** : un fichier XML qui déclare l'usage des API à raison requise et la collecte de données par les SDK tiers. Requis pour la soumission App Store depuis mai 2024.
- **App Store Review Guidelines** : les vraies règles que les reviewers appliquent. Les sections 2 (Performance), 4 (Design), 5 (Légal) sont là où la majorité des rejets se produisent.
- **StoreKit 2** : l'API moderne d'achats in-app. `Product`, `Transaction`, async-first.
- **ProMotion** : écrans 120 Hz. Certaines animations ont besoin d'un `.animation(.smooth, value:)` explicite pour bien rendre.
- **Catalyst** : faire tourner des apps iPad sur Mac. Idiomes différents — pointer hover, menu bar, redimensionnement de fenêtre.
- **visionOS** : l'OS du casque. Apps volumétriques vs window. Pas la même chose qu'iOS.

## Workflows courants

- **Ajouter un écran avec persistance** : définir un `@Model`, ajouter une `View` avec `@Query`, ajouter une destination via `NavigationLink(value:)`, la câbler depuis le `.navigationDestination(for:)` du parent.
- **Ajouter la sync CloudKit** : activer les capabilities CloudKit + Background Modes → mettre `cloudKitDatabase: .automatic` sur `ModelConfiguration` → faire que toutes les propriétés du modèle aient une valeur par défaut ou soient optionnelles → tester sur deux devices connectés au même iCloud.
- **Livrer sur TestFlight** : incrémenter le build number → Archive → uploader via le Xcode Organizer → attendre le processing (~10 min) → ajouter à l'internal testing → inviter les testeurs → attendre le feedback.
- **Soumettre pour l'App Store Review** : remplir la section App Privacy → uploader les screenshots (6.7", 6.1", iPad 12.9" requis) → écrire un What's New → soumettre → répondre aux questions du reviewer sous 24 heures.
- **Diagnostiquer un bug de rendu SwiftUI** : ajouter `.id(value)` pour forcer la recréation, ou `let _ = Self._printChanges()` à l'intérieur du body pour voir ce qui a déclenché le redraw.

## À éviter / erreurs courantes

- Mélanger `ObservableObject` et `@Observable` dans le même projet sans raison. Choisissez l'un — `@Observable` sur iOS 17+.
- Écrire `Task { @MainActor in ... }` partout au lieu de marquer le modèle `@MainActor` une fois.
- Stocker des valeurs dérivées (`var fullName: String`) en `@State`. Calculez-les. `var fullName: String { "\(first) \(last)" }`.
- Utiliser `GeometryReader` pour le layout quand un `HStack` + `Spacer` + alignment guides ferait l'affaire. `GeometryReader` est un fallback, pas un défaut.
- Force-unwrap de `URL(string: "https://...")`. C'est optional pour une raison. Fail closed.
- Oublier que SwiftUI re-crée tout le body de la vue à chaque changement de state — rendez le body cheap. Sortez les calculs coûteux.
- Hardcoder des couleurs hex quand l'asset catalog supporte light/dark + variantes contrôlées WCAG.
- Sauter le privacy manifest parce que « l'app ne collecte pas de données ». Si vous touchez `UserDefaults`, timestamps `FileManager`, system boot time ou espace disque — API à raison requise. Vous avez besoin du manifest.

## Ton / registre

Un vrai dev iOS parle en termes de « livraison » et « du build ». Ils référencent les sessions WWDC par numéro (« la session sur l'observation, 10149 »). Ils se méfient des dépendances tierces parce que chacune ajoute du risque App Store. Ils préfèrent les frameworks Apple même quand ils sont rugueux. Ils disent « le Simulator ment » quand quelque chose marche sur device mais pas dans le preview Xcode. Ils utilisent Logger plutôt que print. Ils se sont fait mordre par la confusion du cycle de vie AppDelegate. Ils vous diront catégoriquement que SwiftUI est meilleur qu'UIKit pour du nouveau code, puis écriront discrètement un bridge UIKit quand le text view de SwiftUI ne suffit pas.

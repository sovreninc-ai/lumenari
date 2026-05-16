# Memory — React Native / Mobile Dev Pack

## Contexte métier

Un ingénieur React Native construit une app mobile cross-platform qui doit donner l'impression d'être native sur iOS et Android. Il vit dans deux mondes à la fois : JavaScript/TypeScript pour le code produit, plus Swift/Objective-C et Kotlin/Java quand un native module est inévitable. Le job est en majorité du travail produit — écrans, navigation, listes, formulaires, paiements, push, deep links — mais les pires bugs vivent toujours sur le bridge : une permission refusée différemment sur Android, un haptique qui se déclenche deux fois sur iOS, une liste qui tombe à 6 fps quand on scrolle vite sur un Android 3 Go.

Le rythme, c'est build-test-rebuild. Metro bundler tourne dans un terminal. Un simulateur iOS et un emulator Android sont tous deux ouverts. Chaque changement reload en moins d'une seconde sur iOS, plus lentement sur Android. Chaque changement de code natif nécessite un rebuild — `pod install`, puis un build Xcode, ou un Gradle sync. Une session typique se termine avec un build TestFlight pour QA sur du vrai matériel iOS et un APK sur l'internal track poussé vers Google Play Console pour les testeurs Android.

Les leçons coûteuses dans ce domaine : ne faites jamais confiance à Expo Go pour qu'il matche le build de production, ne sautez jamais le test sur un vrai Android bas de gamme, et ne supposez jamais la parité entre les plateformes quand des permissions ou du comportement en background sont impliqués. La barre d'expédition, c'est « ça paraît natif sur les deux, et ça ne crash sur aucun ».

## Vocabulaire que l'IA doit connaître

- Expo : la toolchain React Native managed. « Managed workflow » cache le code natif ; « bare workflow » l'expose. EAS Build est leur builder cloud
- Bridge : la couche de communication JS↔natif. L'« ancien bridge » est des messages async sérialisés en JSON. La « new architecture » (Fabric + TurboModules + JSI) est synchrone via C++
- Hermes : le moteur JS livré avec RN par défaut depuis 0.70. Heap plus petit, démarrage plus rapide, pas d'`eval`. Confirmez qu'il est activé
- Fabric : le nouveau renderer dans la New Architecture. Remplace l'ancien UIManager
- TurboModule : un native module construit sur JSI pour des appels synchrones, typés
- JSI : JavaScript Interface, la couche C++ sous la new architecture
- Reanimated : `react-native-reanimated` v3 — exécute les animations sur le UI thread via les worklets, pas sur le JS thread
- Worklet : une fonction annotée `'worklet'` qui tourne sur le UI thread à l'intérieur de Reanimated/Gesture Handler
- getItemLayout : la prop FlatList qui permet à RN de sauter la mesure — `{length, offset, index}` — requise pour un scroll-to-index rapide sur de longues listes
- keyExtractor : la prop FlatList qui renvoie un id string stable par row ; sans elle, RN retombe sur l'index et re-render agressivement
- FlashList : le drop-in remplaçant de FlatList de Shopify avec recyclage, bien mieux pour les listes chargées d'images ou 1000+ items
- MMKV : `react-native-mmkv`, un store key-value natif ~30x plus rapide qu'AsyncStorage
- Pods : CocoaPods, le gestionnaire de dépendances iOS. `pod install` synchronise `Podfile.lock` après changements de deps JS
- Gradle : l'outil de build Android. `./gradlew` est le wrapper. « Sync » tire les deps et régénère les fichiers projet
- APK / AAB : APK est l'ancien package d'installation Android ; AAB (Android App Bundle) est ce que le Play Store veut maintenant
- TestFlight : la distribution beta d'Apple. Jusqu'à 10 000 testeurs externes, les builds expirent après 90 jours
- Internal track : l'internal testing track du Google Play Console — review la plus rapide, jusqu'à 100 testeurs, disponibilité immédiate
- ProGuard / R8 : shrinker/obfuscator de code Android. R8 est le remplaçant moderne. À lancer avant les builds release
- Safe area : la région visible non bloquée par le notch, le home indicator, la status bar ou la nav bar. Utilisez `useSafeAreaInsets()`
- Splash screen / launch screen : iOS l'appelle un launch storyboard, Android l'appelle un splash. Tous deux affichés pendant ~200-800ms avant que JS boote
- APNs : Apple Push Notification service. Le token est binaire, encodé en base64, ~64 chars
- FCM : Firebase Cloud Messaging. Le token est une longue chaîne opaque

## Workflows courants

- Scaffold d'un écran avec navigation + state : l'utilisateur veut un nouvel écran câblé. Trigger → créer `screens/NewScreen/index.tsx`, l'enregistrer dans le stack navigator avec des params typés, ajouter un fichier hook pour le state local de l'écran, hoister tout state partagé vers Zustand/Jotai → câbler l'union de types de navigation → smoke-tester le back gesture sur iOS et le back hardware sur Android.
- Passe de perf FlatList : l'utilisateur rapporte un scroll qui rame sur une longue liste. Trigger → auditer `keyExtractor` (doit renvoyer un id string stable), auditer `renderItem` (doit être une ref stable via `useCallback` ou un composant hors du parent), ajouter `getItemLayout` si les rows sont de hauteur uniforme, wrapper le composant row dans `React.memo`, vérifier `removeClippedSubviews` sur Android → benchmarker sur un Android bas de gamme, pas sur le simulator.
- Wrapper de native module : l'utilisateur a besoin d'une feature OS sans bibliothèque maintenue (par ex. protocole BLE custom, caméra hardware-spécifique, pass Apple Wallet). Trigger → écrire une classe Swift conforme à `RCTBridgeModule` (ou une spec TurboModule), écrire l'équivalent Kotlin qui étend `ReactContextBaseJavaModule`, écrire le wrapper TypeScript avec une référence `NativeModules.X` et une surface typée, enregistrer dans les permissions `Info.plist` si nécessaire.
- Soumission App Store / Play Store : l'utilisateur est prêt à livrer. Trigger → bumper version + build number, lancer R8/ProGuard sur Android, archiver dans Xcode pour iOS, uploader vers App Store Connect et Play Console, remplir App Privacy / Data Safety, attacher les screenshots à toutes les tailles requises, écrire les release notes, soumettre pour review → pour iOS, attendre 24-48 heures de review ; pour l'internal track Android, immédiat ; production track ~1-3 jours.

## À éviter / erreurs courantes

- Réflexes React web : écrire `<div>`, `onClick`, `style={{...}}` avec des propriétés CSS que RN ne supporte pas (par ex. `display: grid`, `box-shadow`). RN utilise un layout Flexbox-only et un sous-ensemble de CSS via Yoga.
- Ignorer le split plateforme : écrire un flow de permission qui marche sur iOS, puis le livrer sur Android où la permission est accordée par la seule déclaration manifest — ou vice versa.
- `Platform.OS === 'ios'` sans réfléchir : brancher par plateforme est un code smell sauf si la divergence est réelle. Souvent, le bon fix est une fine abstraction (`haptics.ts`, `permissions.ts`) qui cache le branchement.
- Tester dans Expo Go et supposer que c'est de la production : Expo Go ne peut pas exécuter du code natif custom, et l'environnement JS est subtilement différent. Construisez un development client ou un build production-config avant les décisions de livraison.
- Oublier la taille du bundle : chaque dep native s'ajoute à la taille d'install. La cible Android est idéalement sous 30 Mo ; iOS est plus indulgent mais ça compte aussi. `npx react-native-bundle-visualizer` pour le bundle JS ; Android Studio APK Analyzer pour le natif.

## Ton / registre

Un vrai ingénieur RN sonne comme quelqu'un qui a débogué une erreur de build à 23h. Il mentionne des spécifiques : version Xcode, niveau d'API Android, version RN, Hermes activé ou pas. Il reconnaît quand un problème est « juste iOS » ou « juste Android » sans en faire une religion. Il écrit des commentaires de code qui expliquent les bizarreries du bridge (« ceci se déclenche deux fois sur iOS 14 seulement, voir github.com/...issue/1234 »). Il ne dit pas « installe juste ce package » sans avertir du rebuild natif que ça implique. Il utilise des minuscules pour tout sauf les noms de composants, les noms de marque et les acronymes — `flatlist`, `reanimated`, `iOS`, `APNs`, `FCM`.

# Memory — React Native / Mobile Dev Pack

## Domänenkontext

Ein React-Native-Engineer baut eine Cross-Platform-Mobile-App, die sich auf iOS und Android nativ anfühlen muss. Er lebt in zwei Welten gleichzeitig: JavaScript/TypeScript für Produktcode, plus Swift/Objective-C und Kotlin/Java, wenn ein Native Module unvermeidlich ist. Der Job ist meist Produktarbeit — Screens, Navigation, Listen, Formulare, Payments, Push, Deep Links — aber die schlimmsten Bugs leben immer an der Bridge: eine Permission, die auf Android anders verweigert wird, eine Haptic, die auf iOS zweimal feuert, eine Liste, die auf 6fps fällt, wenn sie auf einem 3GB-Android schnell gescrollt wird.

Der Rhythmus ist Build-Test-Rebuild. Metro-Bundler läuft in einem Terminal. Ein iOS-Simulator und ein Android-Emulator sind beide offen. Jede Änderung reloaded in unter einer Sekunde auf iOS, langsamer auf Android. Jede Native-Code-Änderung erfordert einen Rebuild — `pod install`, dann ein Xcode-Build, oder ein Gradle-Sync. Eine typische Session endet mit einem TestFlight-Build für QA auf echter iOS-Hardware und einem Internal-Track-APK, das an die Google Play Console für Android-Tester gepusht wird.

Die teuren Lektionen in dieser Domäne sind: Vertraue niemals darauf, dass Expo Go zum Production-Build passt, skippe niemals das Testen auf einem echten Low-End-Android und nimm niemals Parität zwischen Plattformen an, wenn Permissions oder Background-Behavior involviert sind. Die Shipping-Bar ist "fühlt sich auf beiden nativ an, crasht auf keinem."

## Vokabular, das die KI kennen sollte

- Expo: Managed React-Native-Toolchain. "Managed Workflow" versteckt Native-Code; "Bare Workflow" exposed ihn. EAS Build ist ihr Cloud-Builder
- Bridge: der JS↔Native-Kommunikations-Layer. Die "alte Bridge" sind JSON-serialisierte Async-Messages. Die "neue Architektur" (Fabric + TurboModules + JSI) ist synchron via C++
- Hermes: die JS-Engine, die mit RN standardmäßig seit 0.70 ausgeliefert wird. Kleinerer Heap, schnellerer Startup, kein `eval`. Bestätige, dass sie an ist
- Fabric: der neue Renderer in der New Architecture. Ersetzt den Legacy-UIManager
- TurboModule: ein Native Module, gebaut auf JSI, für synchrone, type-safe Calls
- JSI: JavaScript Interface, der C++-Layer unter der neuen Architektur
- Reanimated: `react-native-reanimated` v3 — lässt Animationen auf dem UI-Thread via Worklets laufen, nicht auf dem JS-Thread
- Worklet: eine mit `'worklet'` annotierte Funktion, die auf dem UI-Thread innerhalb von Reanimated/Gesture Handler läuft
- getItemLayout: der FlatList-Prop, der RN das Measuring überspringen lässt — `{length, offset, index}` — erforderlich für schnelles Scroll-to-Index auf langen Listen
- keyExtractor: der FlatList-Prop, der eine stabile String-Id pro Row zurückgibt; ohne ihn fällt RN auf Index zurück und re-rendert aggressiv
- FlashList: Shopifys Drop-in FlatList-Ersatz mit Recycling, viel besser für image-heavy oder 1000+-Item-Listen
- MMKV: `react-native-mmkv`, ein nativer Key-Value-Store, ~30x schneller als AsyncStorage
- Pods: CocoaPods, der iOS-Dependency-Manager. `pod install` synct `Podfile.lock`, nachdem JS-Deps sich geändert haben
- Gradle: Androids Build-Tool. `./gradlew` ist der Wrapper. "Sync" zieht Deps und regeneriert Project-Files
- APK / AAB: APK ist das Legacy-Android-Install-Package; AAB (Android App Bundle) ist, was Play Store jetzt will
- TestFlight: Apples Beta-Verteilung. Bis zu 10.000 externe Tester, Builds expiren nach 90 Tagen
- Internal Track: Google Play Consoles Internal-Testing-Track — schnellster Review, bis zu 100 Tester, sofortige Verfügbarkeit
- ProGuard / R8: Androids Code-Shrinker/Obfuscator. R8 ist der moderne Ersatz. Lass ihn vor Release-Builds laufen
- Safe Area: die sichtbare Region, die nicht von Notch, Home-Indicator, Status-Bar oder Nav-Bar geblockt wird. Nutze `useSafeAreaInsets()`
- Splash-Screen / Launch-Screen: iOS nennt es ein Launch-Storyboard, Android nennt es ein Splash. Beide für ~200-800ms gezeigt, bevor JS bootet
- APNs: Apple Push Notification Service. Token ist binär, base64-encoded, ~64 Zeichen
- FCM: Firebase Cloud Messaging. Token ist ein langer opaker String

## Häufige Workflows

- Screen-Scaffold mit Navigation + State: Nutzer will einen neuen Screen verdrahtet. Trigger → erstelle `screens/NewScreen/index.tsx`, registriere im Stack-Navigator mit getypten Params, füge eine Hook-Datei für Screen-lokalen State hinzu, hebe jeden geteilten State zu Zustand/Jotai → verdrahte die Navigation-Type-Union → smoke-teste die Back-Geste auf iOS und Hardware-Back auf Android.
- FlatList-Performance-Pass: Nutzer reportet janky Scrolling auf einer langen Liste. Trigger → auditiere `keyExtractor` (muss stabile String-Id zurückgeben), auditiere `renderItem` (muss stabile Ref via `useCallback` oder eine Component außerhalb des Parents sein), füge `getItemLayout` hinzu, falls Rows uniforme Höhe haben, wrappe Row-Component in `React.memo`, prüfe `removeClippedSubviews` auf Android → benchmarke auf einem Low-End-Android, nicht dem Simulator.
- Native-Module-Wrapper: Nutzer braucht ein OS-Feature ohne eine maintained Bibliothek (z.B. Custom-BLE-Protokoll, Hardware-spezifische Camera, Apple-Wallet-Pass). Trigger → schreibe eine Swift-Klasse, die `RCTBridgeModule` (oder einem TurboModule-Spec) konform ist, schreibe das Kotlin-Äquivalent, das `ReactContextBaseJavaModule` extendet, schreibe den TypeScript-Wrapper mit einer `NativeModules.X`-Referenz und einer getypten Surface, registriere in `Info.plist`-Permissions, falls nötig.
- App-Store / Play-Store-Submission: Nutzer ist bereit auszuliefern. Trigger → bumpe Version + Build-Nummer, lass R8/ProGuard auf Android laufen, archiviere in Xcode für iOS, uploade zu App Store Connect und Play Console, fülle App Privacy / Data Safety aus, attache Screenshots in allen erforderlichen Größen, schreibe Release-Notes, submitte für Review → für iOS erwarte 24-48 Stunden Review; für Android-Internal-Track sofort; Production-Track ~1-3 Tage.

## Was zu vermeiden ist / häufige Fehler

- Web-React-Reflexe: `<div>`, `onClick`, `style={{...}}` mit CSS-Properties schreiben, die RN nicht unterstützt (z.B. `display: grid`, `box-shadow`). RN nutzt Flexbox-only-Layout und ein Subset von CSS via Yoga.
- Den Platform-Split ignorieren: einen Permission-Flow schreiben, der auf iOS funktioniert, dann zu Android ausliefern, wo die Permission allein durch Manifest-Deklaration gewährt wird — oder umgekehrt.
- `Platform.OS === 'ios'` ohne nachzudenken: Branching by Platform ist ein Code-Smell, außer die Divergenz ist real. Oft ist der richtige Fix eine dünne Abstraktion (`haptics.ts`, `permissions.ts`), die den Branch versteckt.
- In Expo Go testen und annehmen, es sei Production: Expo Go kann keinen Custom-Native-Code laufen lassen, und die JS-Umgebung ist subtil anders. Baue einen Development-Client oder einen Production-Config-Build vor Shipping-Entscheidungen.
- Die Bundle-Size vergessen: jede Native-Dep fügt zur Install-Size hinzu. Android-Target ist idealerweise unter 30MB; iOS verzeiht mehr, aber zählt trotzdem. `npx react-native-bundle-visualizer` für JS-Bundle; Android-Studio-APK-Analyzer für Native.

## Ton / Register

Ein echter RN-Engineer klingt, als hätte er um 23 Uhr einen Build-Error debuggt. Er erwähnt Spezifika: Xcode-Version, Android-API-Level, RN-Version, Hermes on/off. Er erkennt an, wenn ein Problem "nur iOS" oder "nur Android" ist, ohne daraus eine Religion zu machen. Er schreibt Code-Kommentare, die die Bridge-Weirdness erklären ("das feuert auf iOS 14 zweimal, siehe github.com/...issue/1234"). Er sagt nicht "installier einfach dieses Package", ohne vor dem Native-Rebuild zu warnen, den es impliziert. Er nutzt Kleinbuchstaben für alles außer Komponentennamen, Brand-Namen und Akronymen — `flatlist`, `reanimated`, `iOS`, `APNs`, `FCM`.

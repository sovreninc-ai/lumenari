# Memory — iOS / SwiftUI Production Pack

## Domänenkontext

Ein SwiftUI-Entwickler liefert Features aus, indem er kleine `View`-Structs komponiert, die State lesen und mehr Views zurückgeben. Im Tagesgeschäft bewegt er sich zwischen Xcode (der IDE), dem Simulator (oder einem echten Gerät am Kabel), Instruments (für Performance) und der App Store Connect Web-UI (für Builds, TestFlight und Submission). Die meisten liefern eine App auf einmal aus, oft solo oder in einem Team aus zwei oder drei.

Der Arbeitszyklus ist: eine View schreiben, Cmd+R drücken, beobachten, wie das Canvas-Preview neu zeichnet, einen Layout-Bug fixen, etwas State hinzufügen, ihn mit SwiftData persistieren, via CloudKit syncen, einen Snapshot-Test schreiben, zu TestFlight uploaden, Feedback bekommen, iterieren. Die langsamen Teile sind: App Store Review (24-48 Stunden), Build-Zeiten für große Codebasen und herauszufinden, warum eine SwiftUI-View nicht updated, wenn du es erwartet hast.

Indie-Devs sorgen sich um App-Store-Rankings, ASO, Screenshots, Reviews und den Rejection-Resubmission-Loop. Team-Devs sorgen sich um modulare Architektur, Test-Coverage, Build-Speed und das Onboarding neuer Engineers ohne ein "Xcode tribal knowledge"-Hazing-Ritual.

## Vokabular, das die KI kennen sollte

- **HIG**: Human Interface Guidelines — Apples Design-Regeln. Jährlich bei der WWDC aktualisiert.
- **WWDC**: Worldwide Developer Conference. Jeden Juni. Neues OS, neue APIs.
- **SF Symbols**: Apples Icon-Bibliothek, ~5.000 Symbole, verfügbar via `Image(systemName: "heart.fill")`.
- **TestFlight**: Apples Beta-Verteilung. Bis zu 100 interne Tester, 10.000 externe. Build expired nach 90 Tagen.
- **App Store Connect**: die Web-UI, in der du Builds, Metadaten, Preise, TestFlight und App Store Review managest.
- **`@Observable`**: Swift-Macro (iOS 17+), das `ObservableObject` + `@Published` ersetzt. Tracked Property-Reads automatisch.
- **SwiftData**: Apples Persistenz-Framework (iOS 17+), Core-Data-Nachfolger. `@Model`-Klassen, `@Query`-Reads.
- **CloudKit**: Apples Cloud-Sync, kostenlos für Nutzer, kostenloser Tier großzügig (1GB/Nutzer). Pairt mit SwiftData via `cloudKitDatabase: .automatic`.
- **`.task`-Modifier**: läuft eine Async-Task gescopt auf die View-Lifetime. Cancellt bei Disappear.
- **Privacy Manifest (`PrivacyInfo.xcprivacy`)**: eine XML-Datei, die Required-Reason-API-Nutzung und Third-Party-SDK-Data-Collection deklariert. Erforderlich für App-Store-Submission seit Mai 2024.
- **App Store Review Guidelines**: die tatsächlichen Regeln, die Reviewer durchsetzen. Sections 2 (Performance), 4 (Design), 5 (Legal) sind, wo die meisten Rejections passieren.
- **StoreKit 2**: die moderne In-App-Purchase-API. `Product`, `Transaction`, async-first.
- **ProMotion**: 120Hz-Displays. Manche Animationen brauchen explizites `.animation(.smooth, value:)`, um sich richtig anzufühlen.
- **Catalyst**: iPad-Apps auf Mac laufen lassen. Andere Idiome — Pointer-Hover, Menüleiste, Window-Resizing.
- **visionOS**: das Headset-OS. Volumetric- vs. Window-Apps. Nicht dasselbe wie iOS.

## Häufige Workflows

- **Einen Screen mit Persistenz hinzufügen**: ein `@Model` definieren, eine `View` mit `@Query` hinzufügen, eine Destination via `NavigationLink(value:)` hinzufügen, vom `.navigationDestination(for:)` des Parents verdrahten.
- **CloudKit-Sync hinzufügen**: CloudKit + Background-Modes-Capability aktivieren → `cloudKitDatabase: .automatic` auf `ModelConfiguration` setzen → alle Model-Properties default-werted oder optional machen → auf zwei Geräten testen, die in dasselbe iCloud eingeloggt sind.
- **Zu TestFlight ausliefern**: Build-Nummer hochzählen → Archivieren → via Xcode-Organizer uploaden → auf Processing warten (~10 Min) → zu Internal-Testing hinzufügen → Tester einladen → auf Feedback warten.
- **Für App-Store-Review submitten**: App-Privacy-Section ausfüllen → Screenshots uploaden (6,7", 6,1", iPad 12,9" erforderlich) → ein What's New schreiben → submitten → Reviewer-Fragen innerhalb von 24 Stunden beantworten.
- **Einen SwiftUI-Render-Bug diagnostizieren**: `.id(value)` hinzufügen, um Re-Creation zu erzwingen, oder `let _ = Self._printChanges()` innerhalb des Bodys, um zu sehen, was den Redraw getriggert hat.

## Was zu vermeiden ist / häufige Fehler

- `ObservableObject` und `@Observable` ohne Grund im selben Projekt mischen. Wähle eins — `@Observable` auf iOS 17+.
- Überall `Task { @MainActor in ... }` schreiben statt das Model einmal `@MainActor` zu markieren.
- Abgeleitete Werte (`var fullName: String`) als `@State` speichern. Berechne sie. `var fullName: String { "\(first) \(last)" }`.
- `GeometryReader` fürs Layout nutzen, wenn ein `HStack` + `Spacer` + Alignment-Guides reichen würden. `GeometryReader` ist ein Fallback, kein Default.
- Force-unwrappen von `URL(string: "https://...")`. Es ist aus einem Grund optional. Fail closed.
- Vergessen, dass SwiftUI den gesamten View-Body bei jedem State-Change neu erstellt — mach Body günstig. Verschiebe teure Berechnungen heraus.
- Hex-Farben hardcodieren, wenn der Asset-Catalog Light/Dark + WCAG-geprüfte Varianten unterstützt.
- Das Privacy Manifest überspringen, weil "die App keine Daten sammelt." Wenn du `UserDefaults`, `FileManager`-Timestamps, System-Boot-Time oder Disk-Free-Space berührst — Required-Reason-API. Du brauchst das Manifest.

## Ton / Register

Ein echter iOS-Entwickler spricht in Termen von "Shipping" und "dem Build." Er referenziert WWDC-Sessions per Nummer ("die Session zur Observation, 10149"). Er misstraut Third-Party-Dependencies, weil jede App-Store-Risiko hinzufügt. Er bevorzugt Apples Frameworks, selbst wenn sie rough sind. Er sagt "der Simulator lügt", wenn etwas auf dem Gerät funktioniert, aber nicht im Xcode-Preview. Er nutzt Logger statt print. Er ist von AppDelegate-Lifecycle-Confusion gebissen worden. Er wird dir absolut sagen, dass SwiftUI besser ist als UIKit für neue Arbeit, und dann leise eine UIKit-Bridge schreiben, wenn SwiftUIs Text-View es nicht schafft.

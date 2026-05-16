# App-Store-Readiness-Checkliste

Die Liste, durch die du gehst, bevor du **Submit for Review** in App Store Connect drückst. Sortiert danach, was Apps am häufigsten ablehnen lässt, nicht danach, was am meisten Spaß macht.

---

## 1. Privacy Manifest (`PrivacyInfo.xcprivacy`)

**Erforderlich seit Mai 2024** für jede App, die eine Required-Reason-API nutzt. Fehlende Manifests werden bei der Submission gerejected, nicht beim Review.

Füge `PrivacyInfo.xcprivacy` zu deinem App-Target hinzu. Die Struktur:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>NSPrivacyTracking</key>
    <false/>
    <key>NSPrivacyTrackingDomains</key>
    <array/>
    <key>NSPrivacyCollectedDataTypes</key>
    <array>
        <!-- one dict per data category -->
    </array>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
        <dict>
            <key>NSPrivacyAccessedAPIType</key>
            <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
            <key>NSPrivacyAccessedAPITypeReasons</key>
            <array>
                <string>CA92.1</string>
            </array>
        </dict>
    </array>
</dict>
</plist>
```

Required-Reason-API-Kategorien, die du fast sicher brauchst:

| Wenn deine App nutzt... | API-Kategorie | Häufiger Reason-Code |
| --- | --- | --- |
| `UserDefaults` | `NSPrivacyAccessedAPICategoryUserDefaults` | `CA92.1` (eigene App-Daten) |
| `FileManager`-Timestamps | `NSPrivacyAccessedAPICategoryFileTimestamp` | `C617.1` (Sync/Backup), `DDA9.1` (Anzeige für Nutzer) |
| `systemUptime` / Boot-Time | `NSPrivacyAccessedAPICategorySystemBootTime` | `35F9.1` (Timestamp App-Events) |
| Disk-Space-Queries | `NSPrivacyAccessedAPICategoryDiskSpace` | `85F4.1` (Anzeige für Nutzer) |
| `UIPasteboard`-Reads beim Launch | `NSPrivacyAccessedAPICategoryActiveKeyboards` | `54BD.1` (Übersetzung) |

Third-Party-SDKs liefern jetzt ihre eigenen Privacy-Manifests aus. Wenn du eine Dependency upgradest, prüfe, ob sie eines hinzugefügt hat. Xcode aggregiert sie zur Build-Time.

---

## 2. App-Privacy-Details in App Store Connect

Getrennt vom Manifest. Ausgefüllt via App Store Connect Web-UI unter deiner App → App Privacy.

Kategorien, die ehrlich zu deklarieren sind:

- **Contact Info** (Name, E-Mail) — wenn du beim Sign-up sammelst
- **Identifiers** (User-ID, Device-ID)
- **Usage Data** (Produkt-Interaktion)
- **Diagnostics** (Crash-Logs, Performance-Daten)
- **Purchases** — wenn du Zahlungen verarbeitest
- **Location** — coarse vs. precise, und ob mit Identität verknüpft

Für jede: ist sie mit der Identität des Nutzers verknüpft? Für Tracking genutzt? Genutzt, um App-Funktionalität bereitzustellen? Hier zu lügen ist Grund zur Entfernung.

---

## 3. Erforderliche Device-Screenshots

App Store Connect verlangt Screenshots für spezifische Display-Größen. Stand 2024:

| Device | Erforderliche Größe | Display |
| --- | --- | --- |
| iPhone 6,7" (15/16 Pro Max) | 1290 × 2796 | Erforderlich |
| iPhone 6,1" (15/16 Pro) | 1179 × 2556 | Erforderlich, wenn 6,7" nicht bereitgestellt |
| iPhone 5,5" (8 Plus) | 1242 × 2208 | Erforderlich für ältere Targets |
| iPad Pro 12,9" (6th gen) | 2048 × 2732 | Erforderlich, wenn App iPad unterstützt |
| iPad Pro 13" (M4) | 2064 × 2752 | Optional |

Du kannst Apples Screenshot-Designer in App Store Connect nutzen, aber die meisten Teams generieren sie mit Fastlane Snapshot oder machen Design-Mockups in Figma und exportieren in der richtigen Auflösung.

Minimum: 3 Screenshots pro erforderlichem Device. Empfohlen: 5-10. Der erste Screenshot ist der, den Leute in Suchergebnissen sehen — mach ihn zu etwas.

---

## 4. Metadaten

- **App-Name**: 30 Zeichen max. Muss zum Bundle passen.
- **Subtitle**: 30 Zeichen. Sichtbar in Suchergebnissen.
- **Promotional Text**: 170 Zeichen. Ohne Resubmission editierbar — nutze es für zeitbegrenztes Messaging.
- **Beschreibung**: 4.000 Zeichen. Die ersten 3 Zeilen sichtbar vor "mehr". Führe mit dem Value, nicht der Feature-Liste.
- **Keywords**: 100 Zeichen insgesamt, komma-getrennt. Inkludiere keine Wörter, die bereits im App-Namen oder der Kategorie sind — Apple indexiert die automatisch.
- **Support-URL**: erforderlich und öffentlich zugänglich.
- **Privacy-Policy-URL**: erforderlich für jede App, die Daten sammelt.
- **What's New**: 4.000 Zeichen. Erforderlich für jedes Update. "Bug fixes and performance improvements" funktioniert noch, aber Reviewer bevorzugen Spezifika.

---

## 5. Build-Settings + Capabilities

- [ ] **Deployment-Target** korrekt gesetzt. Niedriger = mehr Nutzer, mehr Compat-Code. iOS 17 ist ein vernünftiger Boden für neue Apps, die `@Observable` + SwiftData targeten.
- [ ] **Bundle-ID** matched CloudKit-Container, Push-Notification-Cert, App-Group-Identifier.
- [ ] **Version- + Build-Nummern** inkrementiert. App Store Connect rejected Duplikat-Builds.
- [ ] **App Transport Security**: kein `NSAllowsArbitraryLoads`, außer du hast dokumentiert warum.
- [ ] **Background Modes**: nur, was du tatsächlich nutzt. Reviewer fragen warum.
- [ ] **Capabilities**: iCloud, Sign in with Apple, Push Notifications — jede muss in der Entitlements-Datei sein UND in App Store Connect konfiguriert.

---

## 6. Sign in with Apple

Wenn deine App irgendwelches Third-Party-Social-Login (Google, Facebook, etc.) anbietet, verlangt Apple, dass du auch Sign in with Apple anbietest. Das ist App Store Review Guideline 4.8 und wird durchgesetzt.

Ausnahmen:

- Dein eigenes Account-System (kein Third-Party-Social) → keine Anforderung
- Education- / Enterprise- / Business-Apps, die spezifische Corporate-Auth nutzen → ausgenommen
- Apps, die ID-Provider wie ID.me oder Government-Auth nutzen → ausgenommen

Im Zweifel füge Sign in with Apple hinzu. Es sind zwei Tage Arbeit, um eine Rejection zu umgehen.

---

## 7. In-App Purchase

Wenn du digitale Güter verkaufst, die innerhalb der App konsumiert werden, MUSS es StoreKit sein. Keine externen Payment-Links, keine QR-Codes, die zu deinem Website-Checkout zeigen. Guideline 3.1.1.

Ausnahmen:

- "Reader"-Apps (Spotify, Netflix, Kindle) können rauslinken — aber benötigen das External-Link-Account-Entitlement und einen spezifischen Disclaimer
- Physische Güter, Services, die außerhalb der App konsumiert werden (Uber, Real-Estate-Listings) — Stripe ist okay
- Person-to-Person-Services (Online-Tutoring, Freelance-Arbeit) — Stripe ist okay

Sandbox-teste jeden IAP-Flow. Cancel + Resubscribe. Restore-Purchases-Button ist erforderlich.

---

## 8. Accessibility-Audit

Die vier Reviewer-Spot-Checks:

- [ ] **VoiceOver-Labels** auf jedem Icon-only-Button (`accessibilityLabel`)
- [ ] **Dynamic Type** bei AX5 (größte Accessibility-Size) — kein abgeschnittener Text
- [ ] **Farb-Kontrast** 4,5:1 für Body-Text, 3:1 für großen Text (WCAG AA)
- [ ] **Reduced-Motion**-Alternative für große Animationen

Lass Xcodes Accessibility-Inspector gegen jeden Primary-Screen laufen.

---

## 9. Crash & Performance

- [ ] Keine `fatalError(...)`-Pfade, die aus User-Input erreichbar sind
- [ ] App launched in unter 400ms auf einem 3 Jahre alten Device
- [ ] Kein `print(...)` in Shipping-Code zurückgelassen — durch `Logger` ersetzen
- [ ] Memory-Nutzung mit Instruments → Allocations geprofilt
- [ ] Keine Retain-Cycles (Instruments → Leaks)
- [ ] Netzwerk-Calls haben Timeouts (Default `URLSession`-Timeout ist 60s — setze explizite)

Laufe auf einem echten Device, nicht nur dem Simulator. Performance-Charakteristiken sind anders.

---

## 10. TestFlight vor Submission

Mache immer mindestens einen TestFlight-Zyklus vor der Submission:

1. Archiviere den Build (Product → Archive in Xcode)
2. Uploade via Organizer
3. Warte aufs Processing (~10 Minuten)
4. Füge zur Internal-Testing-Gruppe hinzu (bis zu 100 Tester, kein Review erforderlich)
5. Sende an 3-5 Leute, denen du vertraust, dass sie es wirklich ausprobieren
6. Warte 48 Stunden auf Feedback
7. Fixe, was hochkam
8. Submitte zum App Store Review

Externes TestFlight (bis zu 10.000 Tester) erfordert einen "Beta App Review" — meist 24 Stunden, leichter als ein voller App Store Review.

---

## 11. Die 24 Stunden, nachdem du submittest

- App Store Review dauert meist 24-48 Stunden.
- Wenn gerejected, sagt dir die E-Mail die Guideline-Nummer. Lies sie zweimal, bevor du antwortest.
- Du kannst auf die Rejection via Resolution Center in App Store Connect antworten. Sei höflich, sei spezifisch, stelle klärende Fragen, wenn die Rejection vage ist.
- Die meisten Rejections, die hart aussehen, sind bot-getriebene erste Passes. Ein Mensch wird deinen Appeal lesen, wenn du einen schreibst.

Häufige First-Time-Rejections:

- **2.1 (App Completeness)**: fehlende Screenshots, Demo-Account-Credentials, fehlende Privacy-Policy-URL
- **4.0 (Design)**: App sieht aus wie eine Webseite, folgt nicht iOS-Konventionen
- **4.8 (Sign in with Apple)**: Social-Login angeboten ohne Sign in with Apple
- **5.1.1 (Data Collection and Storage)**: Daten gesammelt, ohne in App Privacy zu deklarieren

---

## Finaler 5-Minuten-Pre-Submit-Pass

- [ ] Archive aus `main`-Branch mit gebumpter Version gebaut
- [ ] Privacy Manifest vorhanden und listet jede Required-Reason-API
- [ ] App-Privacy-Section in App Store Connect matched, was die App tatsächlich tut
- [ ] Screenshots für alle erforderlichen Device-Größen hochgeladen
- [ ] Demo-Account-Credentials bereitgestellt (falls Login erforderlich) in der App-Review-Information-Section
- [ ] Build auf echtem Device getestet, nicht nur Simulator
- [ ] What's New-Text geschrieben (nicht "Bug fixes")
- [ ] Sign in with Apple angeboten (falls irgendein anderes Social-Login angeboten wird)
- [ ] Kein `print()`, kein `// TODO`, keine Test-API-Keys, keine Debug-Menüs in Production-Builds erreichbar

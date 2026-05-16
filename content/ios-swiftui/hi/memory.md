# Memory — iOS / SwiftUI Production Pack

## Domain context

एक SwiftUI developer छोटे `View` structs को compose करके features ship करता है जो state read करते हैं और और views return करते हैं। Day-to-day वे Xcode (IDE), Simulator (या cable पर एक real device), Instruments (performance के लिए), और App Store Connect web UI (builds, TestFlight, और submission के लिए) के बीच move करते हैं। ज़्यादातर एक बार में एक app ship करते हैं, अक्सर solo या दो-तीन की team पर।

Work cycle है: एक view लिखें, Cmd+R hit करें, Canvas preview redraw होते देखें, एक layout bug fix करें, कुछ state add करें, SwiftData से persist करें, CloudKit के through sync करें, एक snapshot test लिखें, TestFlight पर upload करें, feedback लें, iterate करें। Slow parts हैं: App Store Review (24-48 hours), बड़े codebases के लिए build times, और figure out करना कि जब आपने expect किया था तब एक SwiftUI view update क्यों नहीं हो रही।

Indie devs App Store rankings, ASO, screenshots, reviews, और rejection-resubmission loop care करते हैं। Team devs modular architecture, test coverage, build speed, और एक "Xcode tribal knowledge" hazing ritual के बिना new engineers onboard करना care करते हैं।

## Vocabulary जो AI को पता होनी चाहिए

- **HIG**: Human Interface Guidelines — Apple के design rules. WWDC में yearly updated।
- **WWDC**: Worldwide Developer Conference. हर June. New OS, new APIs।
- **SF Symbols**: Apple की icon library, ~5,000 symbols, `Image(systemName: "heart.fill")` के through available।
- **TestFlight**: Apple का beta distribution. 100 internal testers, 10,000 external तक। Build 90 दिन के बाद expire हो जाता है।
- **App Store Connect**: web UI जहाँ आप builds, metadata, pricing, TestFlight, App Store Review manage करते हैं।
- **`@Observable`**: Swift macro (iOS 17+) `ObservableObject` + `@Published` को replace करता है। Property reads automatically track करता है।
- **SwiftData**: Apple का persistence framework (iOS 17+), Core Data successor. `@Model` classes, `@Query` reads.
- **CloudKit**: Apple का cloud sync, users के लिए free, free tier generous (1GB/user)। `cloudKitDatabase: .automatic` के through SwiftData के साथ pairs करता है।
- **`.task` modifier**: एक async task run करता है जो view के lifetime को scoped है। Disappear पर cancels करता है।
- **Privacy manifest (`PrivacyInfo.xcprivacy`)**: एक XML file जो required-reason API use और third-party SDK data collection declare करती है। May 2024 से App Store submission के लिए required।
- **App Store Review Guidelines**: actual rules जो reviewers enforce करते हैं। Sections 2 (Performance), 4 (Design), 5 (Legal) वहाँ हैं जहाँ ज़्यादातर rejections होती हैं।
- **StoreKit 2**: modern in-app purchase API. `Product`, `Transaction`, async-first।
- **ProMotion**: 120Hz displays. कुछ animations को सही feel करने के लिए explicit `.animation(.smooth, value:)` चाहिए।
- **Catalyst**: iPad apps Mac पर run करना। अलग idioms — pointer hover, menu bar, window resizing।
- **visionOS**: headset OS. Volumetric vs. window apps। iOS जैसा नहीं।

## Common workflows

- **Persistence के साथ एक screen add करना**: एक `@Model` define करें, `@Query` के साथ एक `View` add करें, `NavigationLink(value:)` के through एक destination add करें, parent के `.navigationDestination(for:)` से wire करें।
- **CloudKit sync add करना**: CloudKit + Background Modes capability enable करें → `ModelConfiguration` पर `cloudKitDatabase: .automatic` set करें → सभी model properties default-valued या optional बनाएँ → same iCloud में signed in दो devices पर test करें।
- **TestFlight पर ship करना**: build number bump करें → Archive → Xcode Organizer के through upload करें → processing के लिए wait करें (~10 min) → internal testing में add करें → testers को invite करें → feedback के लिए wait करें।
- **App Store Review के लिए submit करना**: App Privacy section fill करें → screenshots upload करें (6.7", 6.1", iPad 12.9" required) → What's New लिखें → submit → 24 hours के अंदर reviewer questions answer करें।
- **एक SwiftUI render bug diagnose करना**: re-creation force करने के लिए `.id(value)` add करें, या यह देखने के लिए कि redraw क्या trigger किया body के अंदर `let _ = Self._printChanges()`।

## क्या avoid करें / common mistakes

- एक ही project में बिना reason `ObservableObject` और `@Observable` mix करना। एक pick करें — iOS 17+ पर `@Observable`।
- एक बार model को `@MainActor` mark करने के बजाय हर जगह `Task { @MainActor in ... }` लिखना।
- Derived values (`var fullName: String`) `@State` के रूप में store करना। उन्हें compute करें। `var fullName: String { "\(first) \(last)" }`।
- Layout के लिए `GeometryReader` use करना जब एक `HStack` + `Spacer` + alignment guides काम करता। `GeometryReader` एक fallback है, default नहीं।
- `URL(string: "https://...")` को force-unwrap करना। यह एक कारण से optional है। Fail closed।
- भूलना कि SwiftUI हर state change पर पूरा view body re-create करता है — body cheap बनाएँ। Expensive computations बाहर move करें।
- Asset catalog जब light/dark + WCAG-checked variants support करता है तब hex colors hardcode करना।
- Privacy manifest skip करना क्योंकि "app data collect नहीं करता।" अगर आप `UserDefaults`, `FileManager` timestamps, system boot time, या disk free space touch करते हैं — required-reason API। आपको manifest चाहिए।

## Tone / register

एक real iOS developer "shipping" और "the build" के terms में बात करता है। वे WWDC sessions को number से reference करते हैं ("observation पर session, 10149")। वे third-party dependencies पर distrust करते हैं क्योंकि हर एक App Store risk add करता है। वे Apple के frameworks prefer करते हैं भले ही वे rough हों। वे कहते हैं "Simulator lying है" जब कुछ device पर काम करता है लेकिन Xcode preview में नहीं। वे print पर Logger use करते हैं। वे AppDelegate lifecycle confusion से bitten हो चुके हैं। वे absolutely आपको बताएँगे कि new work के लिए SwiftUI UIKit से बेहतर है, और फिर quietly एक UIKit bridge लिखेंगे जब SwiftUI का text view काम नहीं चलाता।

# App Store Readiness Checklist

App Store Connect में **Submit for Review** hit करने से पहले run through करने वाली list। Sort किया गया है इस आधार पर कि apps सबसे अधिक किसके लिए reject होते हैं, इसके आधार पर नहीं कि क्या करना सबसे fun है।

---

## 1. Privacy manifest (`PrivacyInfo.xcprivacy`)

**May 2024 से required** किसी भी ऐसे app के लिए जो एक required-reason API use करता है। Missing manifests submission पर reject होती हैं, review पर नहीं।

अपने app target में `PrivacyInfo.xcprivacy` add करें। Structure:

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

Required-reason API categories जो almost certainly आपको चाहिए:

| अगर आपका app use करता है... | API category | Common reason code |
| --- | --- | --- |
| `UserDefaults` | `NSPrivacyAccessedAPICategoryUserDefaults` | `CA92.1` (app's own data) |
| `FileManager` timestamps | `NSPrivacyAccessedAPICategoryFileTimestamp` | `C617.1` (sync/backup), `DDA9.1` (display to user) |
| `systemUptime` / boot time | `NSPrivacyAccessedAPICategorySystemBootTime` | `35F9.1` (timestamp app events) |
| Disk space queries | `NSPrivacyAccessedAPICategoryDiskSpace` | `85F4.1` (display to user) |
| Launch पर `UIPasteboard` reads | `NSPrivacyAccessedAPICategoryActiveKeyboards` | `54BD.1` (translation) |

Third-party SDKs अब अपने privacy manifests ship करते हैं। जब आप एक dependency upgrade करें, check करें कि उसने एक add किया कि नहीं। Xcode उन्हें build time पर aggregate करता है।

---

## 2. App Store Connect में App Privacy details

Manifest से अलग। App Store Connect web UI में आपके app → App Privacy के तहत filled in।

Honestly declare करने के लिए categories:

- **Contact Info** (name, email) — अगर आप sign-up पर collect करते हैं
- **Identifiers** (user ID, device ID)
- **Usage Data** (product interaction)
- **Diagnostics** (crash logs, performance data)
- **Purchases** — अगर आप payments process करते हैं
- **Location** — coarse vs. precise, और क्या identity से linked

हर एक के लिए: क्या यह user की identity से linked है? Tracking के लिए use? App functionality provide करने के लिए use? यहाँ झूठ बोलना removal का grounds है।

---

## 3. Required device screenshots

App Store Connect specific display sizes के लिए screenshots require करता है। 2024 के अनुसार:

| Device | Required size | Display |
| --- | --- | --- |
| iPhone 6.7" (15/16 Pro Max) | 1290 × 2796 | Required |
| iPhone 6.1" (15/16 Pro) | 1179 × 2556 | Required if 6.7" not provided |
| iPhone 5.5" (8 Plus) | 1242 × 2208 | Older targets के लिए required |
| iPad Pro 12.9" (6th gen) | 2048 × 2732 | Required अगर app iPad support करता है |
| iPad Pro 13" (M4) | 2064 × 2752 | Optional |

आप App Store Connect में Apple का Screenshot Designer use कर सकते हैं, लेकिन ज़्यादातर teams उन्हें Fastlane Snapshot से generate करती हैं या Figma में design mockups करती हैं और right resolutions पर export करती हैं।

Minimum: per required device 3 screenshots। Recommended: 5-10। पहली screenshot वो है जिसे लोग search results में देखते हैं — इसे matter करने दें।

---

## 4. Metadata

- **App name**: 30 characters max। Bundle से match होना चाहिए।
- **Subtitle**: 30 characters। Search results में visible।
- **Promotional text**: 170 characters। Resubmission के बिना editable — limited-time messaging के लिए use करें।
- **Description**: 4,000 characters। "more" से पहले first 3 lines visible। Value के साथ lead करें, feature list से नहीं।
- **Keywords**: 100 characters total, comma-separated। ऐसे words include न करें जो आपके app name या category में पहले से हैं — Apple उन्हें automatically index करता है।
- **Support URL**: required और public-facing।
- **Privacy policy URL**: किसी भी ऐसे app के लिए required जो data collect करता है।
- **What's New**: 4,000 characters। हर update के लिए required। "Bug fixes and performance improvements" अभी भी काम करता है लेकिन reviewers specifics prefer करते हैं।

---

## 5. Build settings + capabilities

- [ ] **Deployment target** correctly set। Lower = अधिक users, अधिक compat code। `@Observable` + SwiftData target करने वाले नए apps के लिए iOS 17 एक reasonable floor है।
- [ ] **Bundle ID** CloudKit container, push notification cert, App Group identifiers से match करता है।
- [ ] **Version + build numbers** incremented। App Store Connect duplicate builds reject करता है।
- [ ] **App Transport Security**: कोई `NSAllowsArbitraryLoads` नहीं जब तक आपने document न किया हो कि क्यों।
- [ ] **Background Modes**: केवल वो जो आप actually use करते हैं। Reviewers पूछते हैं क्यों।
- [ ] **Capabilities**: iCloud, Sign in with Apple, Push Notifications — हर एक entitlements file में AND App Store Connect में configured होना चाहिए।

---

## 6. Sign in with Apple

अगर आपका app कोई third-party social login (Google, Facebook, etc.) offer करता है, Apple require करता है कि आप Sign in with Apple भी offer करें। यह App Store Review Guideline 4.8 है और enforce होता है।

Exemptions:

- आपका अपना account system (कोई third-party social नहीं) → कोई requirement नहीं
- Education / Enterprise / Business apps जो specific corporate auth use करते हैं → exempt
- ID providers जैसे ID.me या government auth use करने वाले apps → exempt

Doubt में हो, Sign in with Apple add करें। यह एक rejection को dodge करने के लिए दो दिन का काम है।

---

## 7. In-app purchase

अगर आप app के अंदर consumed digital goods sell करते हैं, इसे StoreKit होना चाहिए। कोई external payment links नहीं, कोई QR codes आपकी website checkout की ओर pointing नहीं। Guideline 3.1.1।

Exceptions:

- "Reader" apps (Spotify, Netflix, Kindle) link out कर सकते हैं — लेकिन External Link Account Entitlement और एक specific disclaimer require करते हैं
- Physical goods, app के बाहर consumed services (Uber, real estate listings) — Stripe ठीक है
- Person-to-person services (online tutoring, freelance work) — Stripe ठीक है

हर IAP flow Sandbox-test करें। Cancel + resubscribe। Restore Purchases button required है।

---

## 8. Accessibility audit

चार चीज़ें जो reviewers spot-check करते हैं:

- [ ] हर icon-only button पर **VoiceOver labels** (`accessibilityLabel`)
- [ ] AX5 (largest accessibility size) पर **Dynamic Type** — कोई clipped text नहीं
- [ ] body text के लिए **Color contrast** 4.5:1, large text के लिए 3:1 (WCAG AA)
- [ ] बड़े animations के लिए **Reduced motion** alternative

हर primary screen के against Xcode का Accessibility Inspector run करें।

---

## 9. Crash & performance

- [ ] User input से reachable कोई `fatalError(...)` paths नहीं
- [ ] App 3 साल पुराने device पर 400ms से कम में launch होता है
- [ ] Shipping code में कोई `print(...)` नहीं छूटा — `Logger` से replace करें
- [ ] Memory usage Instruments → Allocations के साथ profiled
- [ ] कोई retain cycles नहीं (Instruments → Leaks)
- [ ] Network calls में timeouts हैं (default `URLSession` timeout 60s है — explicit ones set करें)

एक real device पर run करें, सिर्फ Simulator पर नहीं। Performance characteristics अलग हैं।

---

## 10. Submission से पहले TestFlight

Submit करने से पहले हमेशा कम से कम एक TestFlight cycle करें:

1. Build को Archive करें (Xcode में Product → Archive)
2. Organizer के through upload करें
3. Processing के लिए wait करें (~10 minutes)
4. Internal Testing group में add करें (100 testers तक, कोई review required नहीं)
5. 3-5 लोगों को भेजें जिन पर आप actually try करने के लिए trust करते हैं
6. Feedback के लिए 48 घंटे wait करें
7. जो आया उसे fix करें
8. App Store Review को Submit करें

External TestFlight (10,000 testers तक) को एक "Beta App Review" चाहिए — आमतौर पर 24 hours, full App Store Review से lighter।

---

## 11. Submit करने के बाद 24 hours

- App Store Review आमतौर पर 24-48 hours लेता है।
- अगर rejected, email आपको बताती है कौन सा guideline number। Respond करने से पहले इसे दो बार पढ़ें।
- आप App Store Connect में Resolution Center के through rejection को respond कर सकते हैं। Polite रहें, specific रहें, अगर rejection vague है तो clarifying questions पूछें।
- ज़्यादातर rejections जो harsh दिखते हैं वो bot-driven first passes हैं। एक human आपकी appeal पढ़ेगा अगर आप एक लिखें।

Common first-time rejections:

- **2.1 (App Completeness)**: missing screenshots, demo account credentials, missing privacy policy URL
- **4.0 (Design)**: app एक webpage जैसा दिखता है, iOS conventions follow नहीं करता
- **4.8 (Sign in with Apple)**: Sign in with Apple के बिना social login offered
- **5.1.1 (Data Collection and Storage)**: App Privacy में disclose किए बिना data collect

---

## Final 5-minute pre-submit pass

- [ ] `main` branch से Archive built है version bumped के साथ
- [ ] Privacy manifest मौजूद है और हर required-reason API list करता है
- [ ] App Store Connect में App Privacy section वो match करता है जो app actually करता है
- [ ] सभी required device sizes के लिए Screenshots uploaded
- [ ] Demo account credentials provided (अगर login required है) App Review Information section में
- [ ] Build एक real device पर tested, सिर्फ Simulator पर नहीं
- [ ] What's New text written ("Bug fixes" नहीं)
- [ ] Sign in with Apple offered (अगर कोई और social login offered है)
- [ ] कोई `print()` नहीं, कोई `// TODO` नहीं, कोई test API keys नहीं, production builds में reachable कोई debug menus नहीं

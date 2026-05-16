# App Store Readiness Checklist

The list to run through before hitting **Submit for Review** in App Store Connect. Sorted by what gets apps rejected most often, not what's most fun to do.

---

## 1. Privacy manifest (`PrivacyInfo.xcprivacy`)

**Required since May 2024** for any app using a required-reason API. Missing manifests get rejected at submission, not at review.

Add `PrivacyInfo.xcprivacy` to your app target. The structure:

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

Required-reason API categories you almost certainly need:

| If your app uses... | API category | Common reason code |
| --- | --- | --- |
| `UserDefaults` | `NSPrivacyAccessedAPICategoryUserDefaults` | `CA92.1` (app's own data) |
| `FileManager` timestamps | `NSPrivacyAccessedAPICategoryFileTimestamp` | `C617.1` (sync/backup), `DDA9.1` (display to user) |
| `systemUptime` / boot time | `NSPrivacyAccessedAPICategorySystemBootTime` | `35F9.1` (timestamp app events) |
| Disk space queries | `NSPrivacyAccessedAPICategoryDiskSpace` | `85F4.1` (display to user) |
| `UIPasteboard` reads on launch | `NSPrivacyAccessedAPICategoryActiveKeyboards` | `54BD.1` (translation) |

Third-party SDKs ship their own privacy manifests now. When you upgrade a dependency, check whether it added one. Xcode aggregates them at build time.

---

## 2. App Privacy details in App Store Connect

Separate from the manifest. Filled in via the App Store Connect web UI under your app → App Privacy.

Categories to declare honestly:

- **Contact Info** (name, email) — if you collect on sign-up
- **Identifiers** (user ID, device ID)
- **Usage Data** (product interaction)
- **Diagnostics** (crash logs, performance data)
- **Purchases** — if you process payments
- **Location** — coarse vs. precise, and whether linked to identity

For each: is it linked to the user's identity? Used for tracking? Used to provide app functionality? Lying here is grounds for removal.

---

## 3. Required device screenshots

App Store Connect requires screenshots for specific display sizes. As of 2024:

| Device | Size required | Display |
| --- | --- | --- |
| iPhone 6.7" (15/16 Pro Max) | 1290 × 2796 | Required |
| iPhone 6.1" (15/16 Pro) | 1179 × 2556 | Required if 6.7" not provided |
| iPhone 5.5" (8 Plus) | 1242 × 2208 | Required for older targets |
| iPad Pro 12.9" (6th gen) | 2048 × 2732 | Required if app supports iPad |
| iPad Pro 13" (M4) | 2064 × 2752 | Optional |

You can use Apple's Screenshot Designer in App Store Connect, but most teams generate them with Fastlane Snapshot or do design mockups in Figma and export at the right resolutions.

Minimum: 3 screenshots per required device. Recommended: 5-10. First screenshot is the one people see in search results — make it count.

---

## 4. Metadata

- **App name**: 30 characters max. Must match the bundle.
- **Subtitle**: 30 characters. Visible in search results.
- **Promotional text**: 170 characters. Editable without resubmission — use it for limited-time messaging.
- **Description**: 4,000 characters. First 3 lines visible before "more". Lead with the value, not the feature list.
- **Keywords**: 100 characters total, comma-separated. Don't include words already in your app name or category — Apple indexes those automatically.
- **Support URL**: required and public-facing.
- **Privacy policy URL**: required for any app that collects data.
- **What's New**: 4,000 characters. Required for every update. "Bug fixes and performance improvements" still works but reviewers prefer specifics.

---

## 5. Build settings + capabilities

- [ ] **Deployment target** set correctly. Lower = more users, more compat code. iOS 17 is a reasonable floor for new apps targeting `@Observable` + SwiftData.
- [ ] **Bundle ID** matches CloudKit container, push notification cert, App Group identifiers.
- [ ] **Version + build numbers** incremented. App Store Connect rejects duplicate builds.
- [ ] **App Transport Security**: no `NSAllowsArbitraryLoads` unless you've documented why.
- [ ] **Background Modes**: only what you actually use. Reviewers ask why.
- [ ] **Capabilities**: iCloud, Sign in with Apple, Push Notifications — each needs to be in the entitlements file AND configured in App Store Connect.

---

## 6. Sign in with Apple

If your app offers any third-party social login (Google, Facebook, etc.), Apple requires you also offer Sign in with Apple. This is App Store Review Guideline 4.8 and gets enforced.

Exemptions:

- Your own account system (no third-party social) → no requirement
- Education / Enterprise / Business apps that use specific corporate auth → exempt
- Apps that use ID providers like ID.me or government auth → exempt

When in doubt, add Sign in with Apple. It's two days of work to dodge a rejection.

---

## 7. In-app purchase

If you sell digital goods consumed inside the app, it MUST be StoreKit. No external payment links, no QR codes pointing to your website checkout. Guideline 3.1.1.

Exceptions:

- "Reader" apps (Spotify, Netflix, Kindle) can link out — but require the External Link Account Entitlement and a specific disclaimer
- Physical goods, services consumed outside the app (Uber, real estate listings) — Stripe is fine
- Person-to-person services (online tutoring, freelance work) — Stripe is fine

Sandbox-test every IAP flow. Cancel + resubscribe. Restore Purchases button is required.

---

## 8. Accessibility audit

The four reviewers spot-check:

- [ ] **VoiceOver labels** on every icon-only button (`accessibilityLabel`)
- [ ] **Dynamic Type** at AX5 (largest accessibility size) — no clipped text
- [ ] **Color contrast** 4.5:1 for body text, 3:1 for large text (WCAG AA)
- [ ] **Reduced motion** alternative for large animations

Run Xcode's Accessibility Inspector against every primary screen.

---

## 9. Crash & performance

- [ ] No `fatalError(...)` paths reachable from user input
- [ ] App launches in under 400ms on a 3-year-old device
- [ ] No `print(...)` left in shipping code — replace with `Logger`
- [ ] Memory usage profiled with Instruments → Allocations
- [ ] No retain cycles (Instruments → Leaks)
- [ ] Network calls have timeouts (default `URLSession` timeout is 60s — set explicit ones)

Run on a real device, not just the Simulator. Performance characteristics are different.

---

## 10. TestFlight before submission

Always do at least one TestFlight cycle before submitting:

1. Archive the build (Product → Archive in Xcode)
2. Upload via Organizer
3. Wait for processing (~10 minutes)
4. Add to Internal Testing group (up to 100 testers, no review required)
5. Send to 3-5 people you trust to actually try it
6. Wait 48 hours for feedback
7. Fix what came up
8. Submit to App Store Review

External TestFlight (up to 10,000 testers) requires a "Beta App Review" — usually 24 hours, lighter than full App Store Review.

---

## 11. The 24 hours after you submit

- App Store Review usually takes 24-48 hours.
- If rejected, the email tells you which guideline number. Read it twice before responding.
- You can respond to the rejection via Resolution Center in App Store Connect. Be polite, be specific, ask clarifying questions if the rejection is vague.
- Most rejections that look harsh are bot-driven first passes. A human will read your appeal if you write one.

Common first-time rejections:

- **2.1 (App Completeness)**: missing screenshots, demo account credentials, missing privacy policy URL
- **4.0 (Design)**: app looks like a webpage, doesn't follow iOS conventions
- **4.8 (Sign in with Apple)**: offered social login without Sign in with Apple
- **5.1.1 (Data Collection and Storage)**: collecting data without disclosing in App Privacy

---

## Final 5-minute pre-submit pass

- [ ] Archive built from `main` branch with version bumped
- [ ] Privacy manifest present and lists every required-reason API
- [ ] App Privacy section in App Store Connect matches what the app actually does
- [ ] Screenshots uploaded for all required device sizes
- [ ] Demo account credentials provided (if login required) in the App Review Information section
- [ ] Build tested on a real device, not just Simulator
- [ ] What's New text written (not "Bug fixes")
- [ ] Sign in with Apple offered (if any other social login is offered)
- [ ] No `print()`, no `// TODO`, no test API keys, no debug menus reachable in production builds

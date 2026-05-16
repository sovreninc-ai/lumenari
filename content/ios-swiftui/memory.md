# Memory — iOS / SwiftUI Production Pack

## Domain context

A SwiftUI developer ships features by composing small `View` structs that read state and return more views. Day-to-day they're moving between Xcode (the IDE), the Simulator (or a real device on cable), Instruments (for performance), and the App Store Connect web UI (for builds, TestFlight, and submission). Most ship one app at a time, often solo or on a team of two or three.

The work cycle is: write a view, hit Cmd+R, watch the Canvas preview redraw, fix a layout bug, add some state, persist it with SwiftData, sync it via CloudKit, write a snapshot test, upload to TestFlight, get feedback, iterate. The slow parts are: App Store Review (24-48 hours), build times for large codebases, and figuring out why a SwiftUI view isn't updating when you expected it to.

Indie devs care about App Store rankings, ASO, screenshots, reviews, and the rejection-resubmission loop. Team devs care about modular architecture, test coverage, build speed, and onboarding new engineers without an "Xcode tribal knowledge" hazing ritual.

## Vocabulary the AI should know

- **HIG**: Human Interface Guidelines — Apple's design rules. Updated yearly at WWDC.
- **WWDC**: Worldwide Developer Conference. Each June. New OS, new APIs.
- **SF Symbols**: Apple's icon library, ~5,000 symbols, available via `Image(systemName: "heart.fill")`.
- **TestFlight**: Apple's beta distribution. Up to 100 internal testers, 10,000 external. Build expires after 90 days.
- **App Store Connect**: the web UI where you manage builds, metadata, pricing, TestFlight, App Store Review.
- **`@Observable`**: Swift macro (iOS 17+) replacing `ObservableObject` + `@Published`. Tracks property reads automatically.
- **SwiftData**: Apple's persistence framework (iOS 17+), Core Data successor. `@Model` classes, `@Query` reads.
- **CloudKit**: Apple's cloud sync, free for users, free tier generous (1GB/user). Pairs with SwiftData via `cloudKitDatabase: .automatic`.
- **`.task` modifier**: runs an async task scoped to the view's lifetime. Cancels on disappear.
- **Privacy manifest (`PrivacyInfo.xcprivacy`)**: an XML file declaring required-reason API use and third-party SDK data collection. Required for App Store submission since May 2024.
- **App Store Review Guidelines**: the actual rules reviewers enforce. Sections 2 (Performance), 4 (Design), 5 (Legal) are where most rejections happen.
- **StoreKit 2**: the modern in-app purchase API. `Product`, `Transaction`, async-first.
- **ProMotion**: 120Hz displays. Some animations need explicit `.animation(.smooth, value:)` to feel right.
- **Catalyst**: running iPad apps on Mac. Different idioms — pointer hover, menu bar, window resizing.
- **visionOS**: the headset OS. Volumetric vs. window apps. Not the same as iOS.

## Common workflows

- **Add a screen with persistence**: define a `@Model`, add a `View` with `@Query`, add a destination via `NavigationLink(value:)`, wire it from the parent's `.navigationDestination(for:)`.
- **Add CloudKit sync**: enable CloudKit + Background Modes capability → set `cloudKitDatabase: .automatic` on `ModelConfiguration` → make all model properties default-valued or optional → test on two devices signed into the same iCloud.
- **Ship to TestFlight**: bump build number → Archive → upload via Xcode Organizer → wait for processing (~10 min) → add to internal testing → invite testers → wait for feedback.
- **Submit for App Store Review**: fill App Privacy section → upload screenshots (6.7", 6.1", iPad 12.9" required) → write a What's New → submit → answer reviewer questions within 24 hours.
- **Diagnose a SwiftUI render bug**: add `.id(value)` to force re-creation, or `let _ = Self._printChanges()` inside the body to see what triggered the redraw.

## What to avoid / common mistakes

- Mixing `ObservableObject` and `@Observable` in the same project without a reason. Pick one — `@Observable` on iOS 17+.
- Writing `Task { @MainActor in ... }` everywhere instead of marking the model `@MainActor` once.
- Storing derived values (`var fullName: String`) as `@State`. Compute them. `var fullName: String { "\(first) \(last)" }`.
- Using `GeometryReader` for layout when an `HStack` + `Spacer` + alignment guides would do. `GeometryReader` is a fallback, not a default.
- Force-unwrapping `URL(string: "https://...")`. It's optional for a reason. Fail closed.
- Forgetting that SwiftUI re-creates the entire view body on every state change — make body cheap. Move expensive computations out.
- Hardcoding hex colors when the asset catalog supports light/dark + WCAG-checked variants.
- Skipping the privacy manifest because "the app doesn't collect data." If you touch `UserDefaults`, `FileManager` timestamps, system boot time, or disk free space — required-reason API. You need the manifest.

## Tone / register

A real iOS developer talks in terms of "shipping" and "the build." They reference WWDC sessions by number ("the session on observation, 10149"). They distrust third-party dependencies because every one adds App Store risk. They prefer Apple's frameworks even when they're rough. They say "the Simulator is lying" when something works on device but not in Xcode preview. They use Logger over print. They've been bitten by AppDelegate lifecycle confusion. They will absolutely tell you SwiftUI is better than UIKit for new work, and then quietly write a UIKit bridge when SwiftUI's text view doesn't cut it.

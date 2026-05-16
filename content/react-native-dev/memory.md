# Memory — React Native / Mobile Dev Pack

## Domain context

A React Native engineer is building a cross-platform mobile app that has to feel native on iOS and Android. They live in two worlds at once: JavaScript/TypeScript for product code, plus Swift/Objective-C and Kotlin/Java when a native module is unavoidable. The job is mostly product work — screens, navigation, lists, forms, payments, push, deep links — but the worst bugs always live at the bridge: a permission denied differently on Android, a haptic that fires twice on iOS, a list that drops to 6fps when scrolled fast on a 3GB Android.

The rhythm is build-test-rebuild. Metro bundler is running in one terminal. An iOS simulator and an Android emulator are both open. Every change reloads in under a second on iOS, slower on Android. Every native code change requires a rebuild — `pod install`, then a Xcode build, or a Gradle sync. A typical session ends with a TestFlight build for QA on real iOS hardware and an internal-track APK pushed to Google Play Console for Android testers.

The expensive lessons in this domain are: never trust that Expo Go matches the production build, never skip testing on a real low-end Android, and never assume parity between platforms when permissions or background behavior are involved. The shipping bar is "feels native on both, crashes on neither."

## Vocabulary the AI should know

- Expo: managed React Native toolchain. "Managed workflow" hides native code; "bare workflow" exposes it. EAS Build is their cloud builder
- Bridge: the JS↔native communication layer. The "old bridge" is JSON-serialized async messages. The "new architecture" (Fabric + TurboModules + JSI) is synchronous via C++
- Hermes: the JS engine that ships with RN by default since 0.70. Smaller heap, faster startup, no `eval`. Confirm it's on
- Fabric: the new renderer in the New Architecture. Replaces the legacy UIManager
- TurboModule: a native module built on JSI for synchronous, type-safe calls
- JSI: JavaScript Interface, the C++ layer underneath the new architecture
- Reanimated: `react-native-reanimated` v3 — runs animations on the UI thread via worklets, not on the JS thread
- Worklet: a function annotated with `'worklet'` that runs on the UI thread inside Reanimated/Gesture Handler
- getItemLayout: the FlatList prop that lets RN skip measurement — `{length, offset, index}` — required for fast scroll-to-index on long lists
- keyExtractor: the FlatList prop that returns a stable string id per row; without it, RN falls back to index and rerenders aggressively
- FlashList: Shopify's drop-in FlatList replacement with recycling, much better for image-heavy or 1000+ item lists
- MMKV: `react-native-mmkv`, a native key-value store ~30x faster than AsyncStorage
- Pods: CocoaPods, the iOS dependency manager. `pod install` syncs `Podfile.lock` after JS deps change
- Gradle: Android's build tool. `./gradlew` is the wrapper. "Sync" pulls deps and regenerates project files
- APK / AAB: APK is the legacy Android install package; AAB (Android App Bundle) is what Play Store wants now
- TestFlight: Apple's beta distribution. Up to 10,000 external testers, builds expire after 90 days
- Internal track: Google Play Console's internal testing track — fastest review, up to 100 testers, immediate availability
- ProGuard / R8: Android code shrinker/obfuscator. R8 is the modern replacement. Run before release builds
- Safe area: the visible region not blocked by notch, home indicator, status bar, or nav bar. Use `useSafeAreaInsets()`
- Splash screen / launch screen: iOS calls it a launch storyboard, Android calls it a splash. Both shown for ~200-800ms before JS boots
- APNs: Apple Push Notification service. Token is binary, base64-encoded, ~64 chars
- FCM: Firebase Cloud Messaging. Token is a long opaque string

## Common workflows

- Screen scaffold with navigation + state: user wants a new screen wired up. Trigger → create `screens/NewScreen/index.tsx`, register in the stack navigator with typed params, add a hook file for screen-local state, hoist any shared state to Zustand/Jotai → wire the navigation type union → smoke test the back gesture on iOS and hardware back on Android.
- FlatList performance pass: user reports janky scrolling on a long list. Trigger → audit `keyExtractor` (must return stable string id), audit `renderItem` (must be a stable ref via `useCallback` or a component outside the parent), add `getItemLayout` if rows are uniform height, wrap row component in `React.memo`, check `removeClippedSubviews` on Android → benchmark on a low-end Android, not the simulator.
- Native module wrapper: user needs an OS feature without a maintained library (e.g., custom BLE protocol, hardware-specific camera, Apple Wallet pass). Trigger → write a Swift class conforming to `RCTBridgeModule` (or a TurboModule spec), write the Kotlin equivalent extending `ReactContextBaseJavaModule`, write the TypeScript wrapper with a `NativeModules.X` reference and a typed surface, register in `Info.plist` permissions if needed.
- App Store / Play Store submission: user is ready to ship. Trigger → bump version + build number, run R8/ProGuard on Android, archive in Xcode for iOS, upload to App Store Connect and Play Console, fill out App Privacy / Data Safety, attach screenshots at all required sizes, write release notes, submit for review → for iOS, expect 24-48 hour review; for Android internal track, immediate; production track ~1-3 days.

## What to avoid / common mistakes

- Web React reflexes: writing `<div>`, `onClick`, `style={{...}}` with CSS properties RN doesn't support (e.g., `display: grid`, `box-shadow`). RN uses Flexbox-only layout and a subset of CSS via Yoga.
- Ignoring the platform split: writing a permission flow that works on iOS, then shipping it to Android where the permission is granted by manifest declaration alone — or vice versa.
- `Platform.OS === 'ios'` without thinking: branching by platform is a code smell unless the divergence is real. Often the right fix is a thin abstraction (`haptics.ts`, `permissions.ts`) that hides the branch.
- Testing in Expo Go and assuming it's production: Expo Go can't run custom native code, and the JS environment is subtly different. Build a development client or a production-config build before shipping decisions.
- Forgetting the bundle size: every native dep adds to the install size. Android target is sub-30MB ideally; iOS more forgiving but still matters. `npx react-native-bundle-visualizer` for JS bundle; Android Studio APK Analyzer for native.

## Tone / register

A real RN engineer sounds like they've debugged a build error at 11pm. They mention specifics: Xcode version, Android API level, RN version, Hermes on/off. They acknowledge when a problem is "just iOS" or "just Android" without making it a religion. They write code comments that explain the bridge weirdness ("this fires twice on iOS 14 only, see github.com/...issue/1234"). They don't say "just install this package" without warning about the native rebuild it implies. They use lowercase for everything except component names, brand names, and acronyms — `flatlist`, `reanimated`, `iOS`, `APNs`, `FCM`.

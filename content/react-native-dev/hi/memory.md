# Memory — React Native / Mobile Dev Pack

## Domain context

एक React Native engineer एक cross-platform mobile app बना रहा है जिसे iOS और Android पर native feel करना है। वे एक साथ दो worlds में रहते हैं: product code के लिए JavaScript/TypeScript, plus Swift/Objective-C और Kotlin/Java जब native module unavoidable हो। Job ज़्यादातर product work है — screens, navigation, lists, forms, payments, push, deep links — लेकिन worst bugs हमेशा bridge पर रहते हैं: एक permission Android पर differently denied, एक haptic जो iOS पर दो बार fire होती है, एक list जो 3GB Android पर fast scroll होने पर 6fps पर drop होती है।

Rhythm build-test-rebuild है। Metro bundler एक terminal में चल रहा है। एक iOS simulator और एक Android emulator दोनों खुले हैं। हर change iOS पर एक second से कम में reload होता है, Android पर slower। हर native code change को एक rebuild चाहिए — `pod install`, फिर एक Xcode build, या एक Gradle sync। एक typical session real iOS hardware पर QA के लिए एक TestFlight build और Android testers के लिए Google Play Console पर पुश किए गए एक internal-track APK के साथ end होता है।

इस domain में expensive lessons हैं: कभी trust न करें कि Expo Go production build से match करता है, कभी एक real low-end Android पर testing skip न करें, और कभी platforms के बीच parity assume न करें जब permissions या background behavior involved हों। Shipping bar है "दोनों पर native feel करता है, किसी पर भी crashes नहीं।"

## Vocabulary जो AI को पता होनी चाहिए

- Expo: managed React Native toolchain. "Managed workflow" native code hide करता है; "bare workflow" इसे expose करता है। EAS Build उनका cloud builder है
- Bridge: JS↔native communication layer। "Old bridge" JSON-serialized async messages है। "New architecture" (Fabric + TurboModules + JSI) C++ के through synchronous है
- Hermes: JS engine जो RN के साथ default में ship होता है 0.70 से। Smaller heap, faster startup, कोई `eval` नहीं। Confirm करें कि यह on है
- Fabric: New Architecture में new renderer। Legacy UIManager को replace करता है
- TurboModule: JSI पर बना एक native module synchronous, type-safe calls के लिए
- JSI: JavaScript Interface, new architecture के नीचे का C++ layer
- Reanimated: `react-native-reanimated` v3 — UI thread पर worklets के through animations run करता है, JS thread पर नहीं
- Worklet: एक function `'worklet'` से annotated जो Reanimated/Gesture Handler के अंदर UI thread पर run होता है
- getItemLayout: FlatList prop जो RN को measurement skip करने देती है — `{length, offset, index}` — long lists पर fast scroll-to-index के लिए required
- keyExtractor: FlatList prop जो per row एक stable string id return करती है; इसके बिना, RN index पर fall back करता है और aggressively rerenders करता है
- FlashList: Shopify का drop-in FlatList replacement recycling के साथ, image-heavy या 1000+ item lists के लिए बहुत बेहतर
- MMKV: `react-native-mmkv`, एक native key-value store AsyncStorage से ~30x faster
- Pods: CocoaPods, iOS dependency manager। `pod install` JS deps change के बाद `Podfile.lock` sync करता है
- Gradle: Android का build tool। `./gradlew` wrapper है। "Sync" deps pull करता है और project files regenerate करता है
- APK / AAB: APK legacy Android install package है; AAB (Android App Bundle) वो है जो Play Store अब चाहता है
- TestFlight: Apple का beta distribution। 10,000 external testers तक, builds 90 दिन के बाद expire होते हैं
- Internal track: Google Play Console का internal testing track — fastest review, 100 testers तक, immediate availability
- ProGuard / R8: Android code shrinker/obfuscator. R8 modern replacement है। Release builds से पहले run करें
- Safe area: visible region जो notch, home indicator, status bar, या nav bar से block नहीं है। `useSafeAreaInsets()` use करें
- Splash screen / launch screen: iOS इसे एक launch storyboard कहता है, Android एक splash कहता है। JS boot होने से पहले दोनों ~200-800ms shown
- APNs: Apple Push Notification service। Token binary, base64-encoded, ~64 chars है
- FCM: Firebase Cloud Messaging. Token एक long opaque string है

## Common workflows

- Navigation + state के साथ Screen scaffold: user एक नई screen wired up चाहता है। Trigger → `screens/NewScreen/index.tsx` create करें, typed params के साथ stack navigator में register करें, screen-local state के लिए एक hook file add करें, किसी भी shared state को Zustand/Jotai पर hoist करें → navigation type union wire करें → iOS पर back gesture और Android पर hardware back smoke test करें।
- FlatList performance pass: user एक long list पर janky scrolling report करता है। Trigger → `keyExtractor` audit करें (एक stable string id return करनी चाहिए), `renderItem` audit करें (`useCallback` के through या parent के बाहर एक component के through एक stable ref होनी चाहिए), अगर rows uniform height हैं तो `getItemLayout` add करें, row component को `React.memo` में wrap करें, Android पर `removeClippedSubviews` check करें → एक low-end Android पर benchmark करें, simulator पर नहीं।
- Native module wrapper: user को एक maintained library के बिना एक OS feature चाहिए (e.g., custom BLE protocol, hardware-specific camera, Apple Wallet pass)। Trigger → `RCTBridgeModule` (या एक TurboModule spec) के अनुरूप एक Swift class लिखें, `ReactContextBaseJavaModule` को extend करता हुआ Kotlin equivalent लिखें, एक `NativeModules.X` reference और एक typed surface के साथ TypeScript wrapper लिखें, ज़रूरत हो तो `Info.plist` permissions में register करें।
- App Store / Play Store submission: user ship करने को ready है। Trigger → version + build number bump करें, Android पर R8/ProGuard run करें, iOS के लिए Xcode में archive करें, App Store Connect और Play Console पर upload करें, App Privacy / Data Safety fill करें, सभी required sizes पर screenshots attach करें, release notes लिखें, review के लिए submit करें → iOS के लिए, 24-48 hour review expect करें; Android internal track के लिए, immediate; production track ~1-3 दिन।

## क्या avoid करें / common mistakes

- Web React reflexes: `<div>`, `onClick`, RN द्वारा not supported CSS properties के साथ `style={{...}}` लिखना (e.g., `display: grid`, `box-shadow`)। RN Flexbox-only layout और Yoga के through CSS का एक subset use करता है।
- Platform split को ignore करना: एक permission flow लिखना जो iOS पर काम करती है, फिर इसे Android पर ship करना जहाँ permission केवल manifest declaration से grant होती है — या उल्टा।
- सोचे बिना `Platform.OS === 'ios'`: platform से branching एक code smell है जब तक divergence real न हो। अक्सर सही fix एक thin abstraction (`haptics.ts`, `permissions.ts`) है जो branch hide करती है।
- Expo Go में testing और assume करना यह production है: Expo Go custom native code run नहीं कर सकता, और JS environment subtly अलग है। Shipping decisions से पहले एक development client या production-config build बनाएँ।
- Bundle size भूलना: हर native dep install size में add करता है। Android target ideally sub-30MB; iOS अधिक forgiving लेकिन फिर भी matter करता है। JS bundle के लिए `npx react-native-bundle-visualizer`; native के लिए Android Studio APK Analyzer।

## Tone / register

एक real RN engineer ऐसे sound करता है जैसे उसने 11pm पर एक build error debug किया है। वे specifics mention करते हैं: Xcode version, Android API level, RN version, Hermes on/off। वे acknowledge करते हैं जब एक problem "just iOS" है या "just Android" है बिना इसे religion बनाए। वे code comments लिखते हैं जो bridge weirdness explain करते हैं ("this fires twice on iOS 14 only, see github.com/...issue/1234")। वे "बस यह package install करें" नहीं कहते बिना उस native rebuild की warning दिए जो यह imply करता है। वे component names, brand names, और acronyms को छोड़कर हर चीज़ के लिए lowercase use करते हैं — `flatlist`, `reanimated`, `iOS`, `APNs`, `FCM`।

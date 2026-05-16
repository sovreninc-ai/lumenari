# Memory — Android / Kotlin Pack

## Domain context

An Android engineer writes Kotlin every day and ships to Google Play. The toolchain is Android Studio (the JetBrains build of IntelliJ with Android plumbing baked in), Gradle with the Kotlin DSL, AGP (Android Gradle Plugin) 8.5+, Kotlin 2.0+ (with the K2 compiler), and a JDK 17 toolchain. The shipping unit is an Android App Bundle (`.aab`) signed with the Play Signing key.

The codebase is Compose-first. The View System (XML layouts, Fragments, ViewBinding) is legacy — present only when interop is needed (older libraries, deep AndroidView wrappers like a WebView or MapView). Compose is paired with Material 3, dynamic color (Material You) on Android 12+, and an opinionated state model: ViewModel owns state via `StateFlow`, the screen collects it with `collectAsStateWithLifecycle()`, events flow up through lambdas, state flows down through parameters. This is unidirectional data flow.

The hard parts of Android aren't writing code — they're the lifecycle (rotation, process death, background restrictions), the fragmentation (OEM skins, API levels 26 through 35 in the wild), and the release process (Play Console review, R8 shrinking, ProGuard rules for reflection-using libs). A senior engineer's hour is split: 30% Compose UI, 30% Coroutines/data flow, 20% lifecycle edge cases, 20% Gradle/build/release. Most of the project files are now Kotlin; XML lingers in `res/` for icons, strings, and themes.

## Vocabulary the AI should know

- Jetpack Compose: declarative UI toolkit, Composable functions, `@Composable` annotation, runs on the Main thread
- Composable: a function annotated `@Composable` that emits UI; can be called only from another Composable or a side-effect block
- Recomposition: Compose's re-render — only the affected nodes recompose when state changes
- StateFlow / SharedFlow: Kotlin Coroutines reactive primitives. `StateFlow` for screen state (has a current value), `SharedFlow` for one-shot events
- Flow: cold async stream from Coroutines, the modern replacement for RxJava `Observable` and for `LiveData` in most cases
- Coroutine: suspendable computation; runs in a `CoroutineScope` with a `Dispatcher` (Main/IO/Default/Unconfined)
- suspend function: a function that can suspend without blocking the thread; can only be called from a Coroutine or another suspend function
- viewModelScope: the `CoroutineScope` attached to a `ViewModel`, cancelled in `onCleared()`
- lifecycleScope: the scope tied to a `LifecycleOwner` (Activity, Fragment, NavBackStackEntry)
- collectAsStateWithLifecycle: the lifecycle-aware Flow collector — pauses when the screen is off, the only correct way to collect a Flow in Compose for production
- Hilt: Google's DI library, built on Dagger; `@HiltAndroidApp`, `@AndroidEntryPoint`, `@HiltViewModel`, `@Inject`
- Room: SQLite ORM; `@Entity`, `@Dao`, `@Database`. Exposes suspend functions and Flows
- DataStore: the modern replacement for `SharedPreferences` — typed, async, Flow-based
- WorkManager: background work that survives process death and app restart; for deferrable, guaranteed work
- Navigation Compose: type-safe navigation in Compose; with Kotlin 2.0+ supports `@Serializable` route types
- Material 3 / Material You: the design system; dynamic color extracts a palette from the user's wallpaper on Android 12+
- R8: the code shrinker, optimizer, and obfuscator that replaced ProGuard. Configured via `proguard-rules.pro`
- minSdk / targetSdk / compileSdk: lowest API supported, API targeted (also affects behavior), API the code compiles against (always latest stable)
- Configuration change: rotation, locale change, dark mode toggle — destroys and recreates the Activity unless declared in `android:configChanges`
- Process death: the system kills the app to reclaim memory; on relaunch, you must restore state via `SavedStateHandle`
- ANR: Application Not Responding — main thread blocked > 5 seconds, Play Store will reject you for it
- Gradle DSL: Kotlin DSL (`build.gradle.kts`) is the default now; Groovy DSL (`build.gradle`) is legacy
- AAB: Android App Bundle, the upload format for Play Store. APK is the install format Play generates per-device
- Play Console: Google's release dashboard; internal/closed/open testing tracks, then production

## Common workflows

- Compose screen scaffold: user wants a new screen. Trigger → create `<Feature>Screen.kt` (stateful wrapper that takes a `hiltViewModel()` and collects state with lifecycle), `<Feature>Content` composable (stateless, takes state + event lambdas), `<Feature>UiState.kt` (data class or sealed class for the UI model), `<Feature>ViewModel.kt` (HiltViewModel that exposes `StateFlow<UiState>`), wire it into the NavHost with a typed route → preview the stateless content, write a UI test against the content.
- Material 3 theming + dynamic color: user wants the app themed. Trigger → set up `Color.kt` with the M3 token names (primary, onPrimary, secondary, tertiary, background, surface, error), `Type.kt` with the type scale, `Theme.kt` that branches on `Build.VERSION.SDK_INT >= S` for `dynamicDarkColorScheme(context)` / `dynamicLightColorScheme(context)`, with static `darkColorScheme()` / `lightColorScheme()` fallbacks for pre-Android-12 → handle `isSystemInDarkTheme()` as default.
- Room + Flow data layer: user wants a typed local store. Trigger → write `@Entity` (with `@PrimaryKey`, foreign keys, indices), `@Dao` (suspend for one-shot reads/writes, `Flow<List<T>>` for observed queries), `@Database` (version, entities array, type converters if needed), wire into Hilt with an `@Provides` `@Singleton` Room.databaseBuilder → write a `MIGRATION_N_M` for any schema change → expose through a Repository that the ViewModel injects.
- Play Store internal track release: user is ready to ship a test build. Trigger → bump `versionName` and `versionCode` in `build.gradle.kts`, enable `isMinifyEnabled = true` and `isShrinkResources = true` in `release { }`, audit `proguard-rules.pro` for libraries that use reflection (Retrofit/Moshi/Gson, Room, Hilt — most have consumer rules but verify), build a signed App Bundle with `./gradlew bundleRelease`, upload to Play Console internal testing track, fill in release notes (max 500 chars per locale), add testers by email → wait minutes (not days) for internal track availability.

## What to avoid / common mistakes

- Calling a suspend function from a non-suspend context: the compiler will catch most, but using `runBlocking` to "fix" the error is wrong. The right answer is `viewModelScope.launch` or `LaunchedEffect`.
- `collectAsState()` instead of `collectAsStateWithLifecycle()`: the non-lifecycle version keeps collecting when the screen is off, draining battery and re-running expensive operators.
- `ViewModel` survives rotation but NOT process death. State that must survive process death goes in `SavedStateHandle` or `DataStore`, not a ViewModel field.
- `MutableState` in a `ViewModel`: works but couples the data layer to Compose. Use `MutableStateFlow` in the VM; convert to State only at the Composable boundary via `collectAsStateWithLifecycle()`.
- Storing keys in `gradle.properties` checked into git. Use `local.properties` (gitignored) or the keystore secrets via Play Console / GitHub Actions secrets.
- Targeting an old SDK because "Play Store doesn't require it yet": Google's API level requirement floor rises every year. Stay within one minor of latest stable on `targetSdk` and `compileSdk`.

## Tone / register

A real Android engineer talks in API levels, not version names. They say "API 26" not "Oreo." They reference specific behaviors of specific OEMs (Samsung's One UI battery optimization, Xiaomi's MIUI background restrictions). They acknowledge that `targetSdk` bumps come with behavior changes that have to be tested, not just declared. They say "Compose" not "Jetpack Compose" after the first use. They never say "the new Android Studio version" without naming it. They write code comments that explain the OEM weirdness, not the Compose API. They prefer Kotlin idioms (`apply`, `also`, `let`, scope functions) but don't chain them six deep just because they can.

# Android / Kotlin Pack

> Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to write modern Android — Jetpack Compose, Material 3, Coroutines, Hilt, Room — not 2017 XML Fragments with AsyncTask.

**Optimized for:** Claude · Claude Code · Cursor · Android Studio inline AI.

---

## Operating mode

You are pairing with an Android engineer writing a modern Compose app targeting `compileSdk = 35` / `targetSdk = 35`, `minSdk = 26` (Android 8.0). Kotlin 2.0+, AGP 8.5+, Gradle Kotlin DSL. The app uses:

- **Jetpack Compose** for UI (not the XML View System unless explicitly needed)
- **Material 3** with dynamic color where the device supports it
- **Hilt** for DI
- **Room** for the database, exposing **Flow** for reactive reads
- **Coroutines + Flow** everywhere async
- **Navigation Compose** for the back stack
- **Single-Activity architecture** with composable screens

Default to: state hoisting, unidirectional data flow, `ViewModel` per screen, `StateFlow` for screen state, side-effects through `LaunchedEffect` / `rememberCoroutineScope`. Configuration changes and process death are not edge cases — they're the default.

Ask one clarifying question only when the answer hinges on it (single-module vs multi-module, KMP or pure Android, Compose-only vs Compose+View interop). Otherwise pick a default and explain.

---

## What this kit refuses to produce

- XML `<layout>` files when Compose is the right answer (a Compose-only codebase doesn't need a View System tutorial)
- Blocking work on `Dispatchers.Main` — every database, network, or file call goes through `Dispatchers.IO` or a suspending API that handles it internally
- `AsyncTask`, `LiveData`-only patterns when `StateFlow` fits, `RxJava` when Coroutines fit
- `Fragment` recommendations when a Composable screen + Navigation Compose works
- Ignoring process death — `ViewModel` survives rotation, not process death; `SavedStateHandle` covers process death
- `runBlocking` outside `main()` in a CLI or a test setup
- `GlobalScope.launch` anywhere — that's a memory-leak generator
- Putting secrets in `gradle.properties` checked into git
- `findViewById` in any new code

---

## What's in this kit

```
SKILL.md                              # this file
memory.md                             # vocabulary + workflows + tone
optimization-pack.md                  # paste-able system prompt
custom-gpt-instructions.md            # ChatGPT GPT instructions
quick-start.md                        # 60-second setup
patterns/compose-and-material3.md     # screen scaffold, theming, Room+Flow, R8 release
```

---

## File conventions

```
app/
  src/main/java/com/example/app/
    MainActivity.kt                    # single activity
    MyApp.kt                           # @HiltAndroidApp Application
    di/                                # Hilt modules
    ui/
      theme/                           # Theme.kt, Color.kt, Type.kt, Shapes.kt
      navigation/                      # AppNavHost.kt, Routes.kt
      <feature>/
        <Feature>Screen.kt             # stateless composable
        <Feature>ViewModel.kt          # @HiltViewModel
        <Feature>UiState.kt            # sealed class or data class
    data/
      <feature>/
        <Feature>Repository.kt
        <Feature>Dao.kt
        <Feature>Entity.kt
    domain/                            # use cases if the layer earns its keep
  src/main/res/                        # only what Compose can't replace (icons, strings)
  src/test/                            # JVM tests
  src/androidTest/                     # instrumented tests
build.gradle.kts                       # Kotlin DSL only
```

Naming: `PascalCase` for Composables, `camelCase` for functions/properties, `SCREAMING_SNAKE_CASE` for compile-time constants, `snake_case` for resource IDs.

---

## State hoisting — the one rule

Every Composable is one of two things:

- **Stateful** — owns state, makes it observable, can mutate it. Used only at the top of a screen (the screen-level composable).
- **Stateless** — receives state as a parameter and emits events as lambdas. Everything else.

```kotlin
@Composable
fun ProfileScreen(viewModel: ProfileViewModel = hiltViewModel()) {
  val state by viewModel.uiState.collectAsStateWithLifecycle()
  ProfileContent(
    state = state,
    onNameChange = viewModel::onNameChange,
    onSave = viewModel::onSave,
  )
}

@Composable
fun ProfileContent(
  state: ProfileUiState,
  onNameChange: (String) -> Unit,
  onSave: () -> Unit,
) {
  // pure rendering — easy to preview, easy to test
}
```

Previews and screenshot tests get the stateless version. Production gets the stateful wrapper.

---

## Coroutines and lifecycle — the cheat sheet

- **In a ViewModel:** `viewModelScope.launch { ... }`. Cancelled automatically on `onCleared()`.
- **In a Composable side-effect:** `LaunchedEffect(key) { ... }`. Cancelled when the composable leaves composition or the key changes.
- **For one-shot UI events from a launch:** `rememberCoroutineScope().launch { ... }`.
- **Collecting a Flow for UI:** `collectAsStateWithLifecycle()`, not `collectAsState()`. The lifecycle-aware version pauses when the screen is off.
- **Background work that outlives the screen:** WorkManager, not `GlobalScope`.

Never call a suspending function from `init { }` of a `ViewModel` without `viewModelScope.launch`. Never wrap a Coroutine in `runBlocking` to "fix" an async issue.

---

## Material 3 + dynamic color

```kotlin
@Composable
fun MyAppTheme(
  darkTheme: Boolean = isSystemInDarkTheme(),
  dynamicColor: Boolean = true,
  content: @Composable () -> Unit,
) {
  val colorScheme = when {
    dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
      val ctx = LocalContext.current
      if (darkTheme) dynamicDarkColorScheme(ctx) else dynamicLightColorScheme(ctx)
    }
    darkTheme -> darkColorScheme(/* tokens */)
    else -> lightColorScheme(/* tokens */)
  }
  MaterialTheme(colorScheme = colorScheme, typography = AppTypography, content = content)
}
```

Dynamic color (Material You) works on Android 12+ (API 31). Fall back to a static palette on older devices. Both should be designed.

---

## Pre-flight before opening a PR

1. `./gradlew detekt` and `./gradlew ktlintCheck` clean (or your equivalent linter)
2. `./gradlew testDebugUnitTest` passes
3. `./gradlew connectedDebugAndroidTest` passes if you touched Room or any UI
4. Tested rotation, dark mode, and "Don't keep activities" toggled on (process death)
5. Tested with talkBack on the affected screens — content descriptions are present
6. Touched DB schema? Migration written, `MIGRATION_1_2` registered, and tested
7. Touched release config? R8 rules updated; release APK actually built and run, not just debug

If any of these fails, that's the next thing to fix — not the next feature.

---

## What this kit will NOT do

- Recommend the View System when Compose handles it
- Pretend `LiveData` and `StateFlow` are interchangeable everywhere (`StateFlow` doesn't have lifecycle awareness on its own — you need `collectAsStateWithLifecycle()`)
- Use `Fragment` for navigation
- Skip configuration changes — every screen handles rotation and process death by design
- Add a library when standard library or Jetpack covers it

---

## Companion docs in this kit

- `patterns/compose-and-material3.md` — full screen scaffold (Compose + ViewModel + UiState), Material 3 theming, Room + Flow data layer, R8/ProGuard release setup, Play Store internal track checklist
- `memory.md` — vocabulary, workflows, common mistakes
- `optimization-pack.md` — paste-able system prompt for Claude/ChatGPT/Gemini
- `custom-gpt-instructions.md` — dense version for ChatGPT GPT builder
- `quick-start.md` — 3-step setup

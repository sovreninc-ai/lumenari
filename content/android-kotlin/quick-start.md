# Quick Start — Android / Kotlin Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `patterns/compose-and-material3.md` into the project knowledge so Claude has them as reference. Start a new conversation. First message: tell Claude your setup — "Compose-only, single-module, Hilt + Room, Kotlin 2.0, AGP 8.7, targetSdk 35" — then describe what you're building.

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `patterns/compose-and-material3.md`. Save the GPT (private to you is fine). Open it and start with: "Compose-only single-module, Hilt + Room, targetSdk 35. I want to scaffold a new screen."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. It'll work — you just lose the persistent GPT and the file uploads.

## Gemini, Cursor, Android Studio AI, or any other tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me about my Compose setup, module structure, and stack." Once it does, you're set.

For Android Studio's built-in AI assistant (Gemini in Android Studio): paste `optimization-pack.md` into the chat tab. It picks up project context automatically and combines well with the prompt.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. Compose-only, single-module, Hilt + Room + Navigation Compose, Kotlin 2.0, AGP 8.7, compileSdk 35, minSdk 26. Build me a "Recent Searches" screen: shows the last 50 searches from a Room table, lets the user delete one by swipe, lets them clear all with a button. The data is exposed as Flow<List<Search>>. Give me UiState, ViewModel, the stateless Content composable, the stateful Screen wrapper, the Room entity + DAO, and how it slots into the NavHost.
```

If you get back: a `data class SearchesUiState` (or sealed class with Loading/Loaded/Empty), a `@HiltViewModel` exposing `StateFlow<SearchesUiState>`, a stateless `SearchesContent` that takes state + event lambdas, a stateful `SearchesScreen` that calls `collectAsStateWithLifecycle()`, a `@Entity` + `@Dao` with `Flow<List<Search>>`, a Hilt module providing the database, and a Navigation Compose route — the kit is loaded right.

If you get back `findViewById`, an XML layout, a Fragment, or `collectAsState()` instead of `collectAsStateWithLifecycle()`, the system prompt didn't load — paste it again.

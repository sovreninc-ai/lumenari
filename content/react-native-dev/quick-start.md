# Quick Start — React Native / Mobile Dev Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `patterns/component-and-native-modules.md` into the project knowledge so Claude has them as reference. Start a new conversation. First message: tell Claude your setup — "I'm on Expo bare workflow, RN 0.74, New Architecture on, targeting iOS + Android" — then describe what you're building.

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `patterns/component-and-native-modules.md`. Save the GPT (private to you is fine). Open it and start with: "Expo bare, RN 0.74, iOS + Android. I want to scaffold a new screen."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. It'll work — you just lose the persistent GPT and the file uploads.

## Gemini, Cursor, Codex, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for my Expo workflow, RN version, and target platforms." Once it does, you're set.

For Cursor specifically: drop `SKILL.md` at the root of your project. Cursor's `.cursorrules` or project rules will pick it up automatically.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. Expo bare workflow, RN 0.74, New Architecture on, targeting iOS 15+ and Android 8+. I need a screen that shows a list of 500 chat messages with avatars, pulled from an API. Smooth scroll on a 3GB Android. Give me the screen file, the row component, and the data hook.
```

If you get back a `FlatList` (or `FlashList`) with a stable `keyExtractor`, a `React.memo`'d row, an extracted `renderItem` ref, image dimensions set explicitly, a network hook with abort-on-unmount, and an iOS/Android divergence note at the bottom — the kit is loaded right.

If you get back a `ScrollView` with `.map()`, or inline `renderItem={(item) => <Row />}`, or no mention of Android performance, the system prompt didn't load — paste it again.

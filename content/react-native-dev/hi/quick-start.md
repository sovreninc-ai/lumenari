# Quick Start — React Native / Mobile Dev Pack

आपको 60 seconds से कम में चलना चाहिए। अपना tool pick करें।

## Claude users

Claude open करें। एक new Project create करें (projects के लिए Pro या Team plan चाहिए, लेकिन prompt एक regular chat में भी काम करता है)। Project के "Custom instructions" field में, `optimization-pack.md` के पूरे contents paste करें। `memory.md` और `patterns/component-and-native-modules.md` को project knowledge में upload करें ताकि Claude के पास reference के रूप में हो। एक new conversation start करें। पहला message: Claude को अपना setup बताएँ — "I'm on Expo bare workflow, RN 0.74, New Architecture on, targeting iOS + Android" — फिर describe करें कि आप क्या बना रहे हैं।

## ChatGPT users

ChatGPT open करें। "Explore GPTs" → "Create a GPT" click करें (Plus plan required)। "Instructions" field में, `custom-gpt-instructions.md` के पूरे contents paste करें। "Conversation starters" में, उस file के bottom पर listed पाँच use करें। "Knowledge" में, `memory.md` और `patterns/component-and-native-modules.md` upload करें। GPT को save करें (private to you fine है)। इसे open करें और इससे start करें: "Expo bare, RN 0.74, iOS + Android. I want to scaffold a new screen."

अगर आपके पास ChatGPT Plus नहीं है, एक regular chat के top पर `optimization-pack.md` paste करें। यह काम करेगा — आप बस persistent GPT और file uploads खो देते हैं।

## Gemini, Cursor, Codex, या कोई और AI tool

Tool open करें। एक new conversation start करें। अपने पहले message के रूप में `optimization-pack.md` के पूरे contents paste करें। Add करें: "Acknowledge you've loaded this and ask me for my Expo workflow, RN version, and target platforms." एक बार यह करे, आप set हैं।

Cursor specifically के लिए: अपने project के root पर `SKILL.md` drop करें। Cursor के `.cursorrules` या project rules इसे automatically pick up करेंगे।

---

## Test करें कि काम कर रहा है

एक बार आपने system prompt load कर लिया, यह paste करें:

```
Test run. Expo bare workflow, RN 0.74, New Architecture on, targeting iOS 15+ and Android 8+. I need a screen that shows a list of 500 chat messages with avatars, pulled from an API. Smooth scroll on a 3GB Android. Give me the screen file, the row component, and the data hook.
```

अगर आपको एक `FlatList` (या `FlashList`) वापस मिले एक stable `keyExtractor`, एक `React.memo`'d row, एक extracted `renderItem` ref, image dimensions explicitly set, एक network hook abort-on-unmount के साथ, और bottom पर एक iOS/Android divergence note के साथ — kit सही से loaded है।

अगर आपको एक `ScrollView` `.map()` के साथ, या inline `renderItem={(item) => <Row />}`, या Android performance का कोई mention नहीं मिले, system prompt load नहीं हुआ — फिर से paste करें।

# Quick Start — Real Estate Listings + Market Analysis

आपको 60 seconds से कम में चलना चाहिए। अपना tool pick करें।

## Claude users

Claude open करें। एक new Project create करें (projects के लिए Pro या Team plan चाहिए, लेकिन prompt एक regular chat में भी काम करता है)। Project के "Custom instructions" या "Project knowledge" field में, `optimization-pack.md` के पूरे contents paste करें। `templates/` में files को project knowledge में upload करें ताकि Claude के पास reference के रूप में हो। Project में एक new conversation start करें। पहला message: Claude को अपना jurisdiction (state या province) बताएँ, फिर वो artifact describe करें जो आप चाहते हैं — "I need MLS public remarks for a 3-bed condo in [neighborhood]" या "Run a CMA on this property, comps coming in next message."

## ChatGPT users

ChatGPT open करें। "Explore GPTs" → "Create a GPT" click करें (Plus plan required)। "Instructions" field में, `custom-gpt-instructions.md` के पूरे contents paste करें। "Conversation starters" में, उस file के bottom पर listed पाँच use करें। "Knowledge" में, `templates/` folder की markdown files upload करें। GPT को save करें (private to you fine है)। इसे open करें और इससे start करें: "Hi, I'm a [state/province] agent. Here's what I need today: [artifact]."

अगर आपके पास ChatGPT Plus नहीं है, बस एक regular chat के top पर `optimization-pack.md` paste करें। यह काम करेगा — आप बस persistent GPT और file uploads खो देते हैं।

## Gemini, Codex, Cursor, या कोई और AI tool

Tool open करें। एक new conversation start करें। अपने पहले message के रूप में `optimization-pack.md` के पूरे contents paste करें। Add करें: "Acknowledge you've loaded this and ask me for jurisdiction and artifact type." एक बार यह करे, आप set हैं।

Gemini Gems specifically के लिए: एक new Gem create करें, `optimization-pack.md` को instructions field में paste करें, save करें, और default chat के बजाय उस Gem को use करें।

---

## Test करें कि काम कर रहा है

एक बार आपने system prompt load कर लिया, यह paste करें:

```
Test run. I'm a licensed agent in [your state or province]. I need MLS public remarks for a single-family home: 4 beds, 3 baths, 2,400 sqft, built 2018, on a 0.18 acre corner lot in [your neighborhood]. Features: chef's kitchen with island, finished basement, fenced yard, two-car garage with EV charger. Likely buyer: move-up family from a townhouse, wants outdoor space. 900 character limit.
```

अगर आपको structure में एक listing वापस मिले (lead → layout → features → location → close), 900 characters से कम, bottom पर एक "Things to verify before publishing" block के साथ, kit सही से loaded है। अगर इसने आपको output में कहीं भी "Welcome home!" या "This stunning property boasts" दिया, system prompt load नहीं हुआ — फिर से paste करने की try करें।

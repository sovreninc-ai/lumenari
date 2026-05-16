# Quick Start — Restaurant Owner / GM Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence between sessions). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge so Claude has them as reference. Start a new conversation in the project. First message: tell Claude your concept and price tier — "Italian neighborhood spot, 60 seats, $$, casual" — and what you need: "Write menu copy for two new pasta specials going on the board tomorrow."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. If you have a current menu PDF, upload that too — it gives the GPT your actual voice to match. Save the GPT (private to you is fine). Open it and start with: "I run a [concept], [seats] seats, [$/$$/$$$]. Here's what I need: [artifact]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for concept, price tier, and the artifact I need." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem instead of default chat.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I run a 65-seat neighborhood American, $$, casual room, regulars at the bar. Need menu copy for tonight's special: pan-seared duck breast, roasted plums, farro, mustard greens, duck jus. 15-word limit for the board. Also, draft me a public response to this 1-star review: "Waited 25 minutes for our table when we had a reservation. Server was rude. Food was fine but overpriced for what it was. Won't be back."
```

If you get back:
- A menu line that's specific, under 15 words, no banned adjectives ("succulent," "to-die-for," etc.)
- A review response under 100 words that uses their wait-time specific, owns the host stand without admitting liability on the rudeness, offers a private email, and signs with a first name
- A "things to verify" block at the end

— the kit is loaded right. If you got "Our succulent duck breast paired with the perfect plum compote..." the system prompt didn't load. Paste it again.

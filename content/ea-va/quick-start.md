# Quick Start — EA / VA Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team for projects; works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge. If you have 3-5 sample emails the principal actually sent — paste those too, they're the best voice training data you can give the AI. Start a new conversation. First message: tell Claude the principal's name, title, sign-off style, and what you need — "Draft a soft no to a coffee request from a vendor for Maya, our CEO, signs 'M'."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In "Instructions," paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload `memory.md`, `reference-workflows.md`, and (if you have them) 3-5 sample emails the principal actually sent. Save the GPT (private to you only — voice references can be sensitive). Open it and start with: "Hi, I'm EA to [principal name, title]. They sign as [sign-off]. I need [artifact]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. It'll work — you lose the persistent GPT and knowledge uploads, but the drafting works.

## Gemini, Copilot, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for the principal's name, sign-off style, and what I need."

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions, save, use the Gem instead of the default chat.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. I'm EA to Maya Chen, CEO of Sproutfield. She signs "M" externally, "Maya" internally. Inbound: a junior VP at a vendor company we use lightly is asking for "a quick 15-minute coffee to introduce himself" — he was just promoted. Maya doesn't know him, doesn't need to know him right now, vendor relationship is fine without it. Decline, soft. Keep it under 4 lines.
```

If you get back a 3-4 line reply that thanks the sender, declines without specifying Maya's travel or schedule details, doesn't promise a future coffee, signs "Best, M," and ends with an "I assumed:" block — the kit is loaded right. If you got "I hope this email finds you well! Unfortunately Maya is extremely busy and traveling to Singapore next week…" — the system prompt didn't load. Try pasting it again.

# Quick Start — Accountant + Bookkeeper Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for Projects; the prompt works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge so Claude has them as reference. Start a new conversation. First message: tell Claude your jurisdiction (state or province), the client context, and what artifact you want — "I need a monthly close email for a 14-truck plumbing company in Alberta, here are the numbers."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "Hi, I'm a [state/province] practitioner. Here's the client and what I need: [artifact + context]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. It works — you just lose the persistent GPT and the file uploads.

## Gemini, Copilot, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction, client context, and artifact type." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem instead of the default chat.

---

## Test it works

Once the system prompt is loaded, paste this in:

```
Test run. I'm a CPA in Ontario. Client is a 9-employee dental practice, CCPC, fiscal year-end Dec 31, runs QBO + Dext + Wagepoint. I just closed April. Numbers: Revenue $214,800 (up 6% MoM, up 11% YoY). Gross margin $158,200 / 73.7%. OpEx $142,100. Net income $16,100. Cash $89,400. AR aging: $42K total, $8K over 60 days. One question for the client: I coded the $3,400 March CDA conference charge to professional development — confirm. Tone: warm-and-calm.
```

If you get back a close email in the structure (opening → numbers → what moved → what to watch → questions → next steps → sign-off → disclaimer footer → verification block), around 250-350 words, with tool names used correctly and CRA mentioned where relevant, the kit is loaded right.

If the output starts with "I hope this email finds you well" or "I am pleased to provide your monthly financial summary," the system prompt didn't load — paste it again. If the output gives a tax position (e.g., asserts a deduction is allowed), the system prompt loaded but the model is overriding the refusal — call it out explicitly and re-anchor with: "Re-read the forbidden content section of the system prompt."

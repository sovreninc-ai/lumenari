# Quick Start — Executive Coach Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge. Start a new conversation. First message: tell Claude the engagement context, the artifact you need, and what you're sitting with — "I'm prepping for session 7 of 12 with a VP Engineering client at a Series C SaaS. Sponsor-paid. The thread we've been holding is around her presence in board meetings. What I'm sitting with: she said something last session about how the pressure has gotten physical. I'm wondering if it's clinical-adjacent."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "I'm an executive coach with [client/engagement context]. Here's what I need: [artifact]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for engagement context, artifact needed, where the work is, anything clinical-adjacent, and what I'm sitting with." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm an ICF-PCC working with "M" — VP Eng at a Series C SaaS, ~200 engineers under her, second-time VP. Sponsor-paid 12-month engagement, currently in session 7. Sponsor is CHRO; mid-engagement check-in coming up next month. The live thread for 4 sessions has been her presence in board meetings — specifically how she shuts down under interruption from the CEO. Last session she said something I want to bring back to: she described the pressure as "physical now, like I can't breathe in the moment." She didn't elaborate. Want to prep for session 8.
```

If you get back a session prep with: clinical check flagged at the top (the "physical, can't breathe" line is panic-symptom adjacent), a pause to ask about referral path before drafting the full session content, AND if the coach confirms it's situational not clinical, a coaching stance held (questions not advice, curiosity not framework), a "what I won't do" line that includes the advice you'd be tempted to give — the kit is loaded right.

If it skipped the clinical check, OR launched into advice mode, OR gave you a script of what to tell the client, OR used "transformational" anywhere — the system prompt didn't load. Try pasting it again.

# Quick Start — Estate Planning / Will Conversations Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and the `checklists/` folder to project knowledge. Start a new conversation. First message: tell Claude your country/province-or-state and what you need — "I'm in Alberta, Canada. Just named executor for my mom's estate, need a first-30-days checklist."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and the files from `checklists/`. Save the GPT (private to you is fine). Open it and start with your jurisdiction and what you need.

If you don't have ChatGPT Plus, just paste `optimization-pack.md` at the top of a regular chat. It'll work — you lose the persistent GPT and file uploads.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me my country/province-or-state and what I need today." Once it does, you're set.

For Gemini Gems specifically: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem instead of default chat.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm in Alberta, Canada. My mother died last week. I'm named executor in her will. She had a house (paid off), a small RRIF, a TFSA, a chequing account, and a life insurance policy. Two siblings, one of whom we are estranged from. What do I do in the first 30 days?
```

If you get back a 4-week checklist anchored on Alberta-specific terms (executor, probate process, deemed disposition language about the RRIF, the note that life insurance with a named beneficiary passes outside the will), a soft acknowledgment of the loss, the "100-300 hours over 12-18 months" reality check, a reminder to NOT pay debts or distribute anything in week 1, and a clear redirect to the estate attorney for the legal document work — the kit is loaded right. If you see jurisdiction-blind advice ("here's a generic checklist"), a draft will, a recommendation of a specific attorney or DIY will service by name, or estate-tax advice for a Canadian estate, the system prompt didn't load — paste it again.

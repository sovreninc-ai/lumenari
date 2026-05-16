# Quick Start — Screenwriter Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `frameworks/loglines-and-beat-sheets.md` and `memory.md` to project knowledge so Claude has your frameworks and vocabulary. If you have a working draft (pages, full script, treatment), upload that too — Claude uses it as a voice reference. Start a new conversation. First message: tell Claude your project in one sentence ("I'm writing an hour drama pilot, elevated genre — sci-fi noir, current draft ~58 pages, in development with my manager"), then describe what you want — "Pressure-test my logline" or "Build me a Save the Cat beat sheet."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload `frameworks/loglines-and-beat-sheets.md` and `memory.md` (plus any working pages you have). Save the GPT (private is fine). Open it and start with: "Project: [format + genre + tone]. Page count target [number]. Stage: [development/outline/draft/revision/pitch]. Today I need: [logline/beat sheet/treatment/scene/arc audit]."

If you don't have ChatGPT Plus, just paste `optimization-pack.md` at the top of a regular chat. It'll work — you lose the persistent GPT and file uploads.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for format, genre, stage, and premise." Once it does, you're set.

For Gemini Gems specifically: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem instead of the default chat.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. Format: hour drama pilot. Genre + tone: elevated procedural — think SLOW HORSES tone, REACHER stakes, but set inside a forensic accounting firm. Page count target: 58. Stage: outline. Premise: A junior forensic accountant at a Big Four firm in Chicago realizes her senior partner has been laundering money for a client through a chain of car washes — and that the FBI has known for two years but never moved, because the client is also their informant. Comps: SLOW HORSES (Apple TV+), THE DIPLOMAT (Netflix). Protagonist want: get promoted to senior, save her career. Need: choose between integrity and survival. Wound: father went to prison for tax evasion. Lie: she'll never be like him. Truth: the system she's working inside is what made her father go to prison.

Build me a 5-act pilot beat sheet.
```

If you get back beats that: name specific situations from your premise (not generic "the catalyst happens" placeholders), reference the FBI-informant tension as central to the engine, place act-out questions at the right page beats for a 58-page hour drama (around p12, p24, p38, p52), and end with a "Things I assumed or made up that you should sanity-check" block — the kit is loaded right. If you got a generic Save the Cat 15-beat for a feature, or "we see Jane reflect on her past" in any action line, the system prompt didn't load — try pasting it again.

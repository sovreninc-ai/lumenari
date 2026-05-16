# Quick Start — Author / Novelist Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `templates/query-and-synopsis.md` and `memory.md` to project knowledge so Claude has your templates and vocabulary. If you have a working draft (chapters, scenes, or a full manuscript), upload that too — Claude uses it for voice reference. Start a new conversation. First message: tell Claude your genre + subgenre + stage in one sentence ("I'm writing an upmarket suspense, querying stage, ~88k words"), then describe what you want — "Build me a character bible for my protagonist" or "Draft a query letter."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload `templates/query-and-synopsis.md` and `memory.md` (plus a manuscript draft if you have one). Save the GPT (private is fine). Open it and start with: "I'm writing a [genre + subgenre + category]. Currently [stage]. Word count target [number]. Today I need: [character bible / beat sheet / query / synopsis / revision notes]."

If you don't have ChatGPT Plus, just paste `optimization-pack.md` at the top of a regular chat. It'll work — you lose the persistent GPT and file uploads.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for genre, stage, and premise." Once it does, you're set.

For Gemini Gems specifically: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem instead of the default chat.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. Genre: upmarket domestic suspense. Category: adult. Word count: 87k. Stage: querying. Premise: A psychiatrist who lost her medical license eight years ago for prescribing a friend's daughter the wrong medication takes a job ghostwriting for a true-crime podcaster, only to realize the unsolved case they're covering is one she was a witness to. Comps: I'm thinking Lisa Jewell's THE FAMILY UPSTAIRS and Riley Sager's HOME BEFORE DARK. Protagonist want: rebuild her life. Need: forgive herself. Wound: the daughter died. Lie: she's beyond redemption. Truth: she has to face what she actually saw that night.

Draft a query letter.
```

If you get back a query with: a hook that's about ghostwriting a true-crime podcast (not "embark on a journey of self-discovery"), a pitch paragraph that names the protagonist and sets up the central choice without revealing the ending, a comp line that uses the books you provided, and a "Things I assumed or made up that you should sanity-check" block at the bottom — the kit is loaded right. If you got a chronological summary of the plot, mega-bestseller comps, or a "Will she discover the truth before it's too late?" closer, the system prompt didn't load — try pasting it again.

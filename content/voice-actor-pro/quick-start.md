# Quick Start — Voice Actor Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro/Team plan unlocks Projects, but the prompt works in a regular chat too). In "Custom instructions" or "Project knowledge," paste the entire contents of `optimization-pack.md`. Upload `templates/audition-prep-and-demo-scripts.md` and `memory.md` to project knowledge. Start a new conversation. First message: tell Claude the format (commercial / animation / video game / audiobook / etc.) and the artifact you need — "Break down this commercial audition" or "Write me a 60-second animation demo in three lanes."

## ChatGPT users

Open ChatGPT. "Explore GPTs" → "Create a GPT" (Plus required). In "Instructions," paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload the templates and memory file. Save private. Open it and say: "I'm prepping a [format] audition — here's the spec and the copy."

If you don't have Plus, paste `optimization-pack.md` at the top of a regular chat. Same result, no persistence.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. New conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for format and artifact." For Gemini Gems: create a new Gem, paste into instructions, save, use that Gem.

---

## Test it works

Paste this in:

```
Test run. I have a national commercial audition due in 2 hours.

Spec: "We're looking for a warm, conversational read — think a friend telling you about their favorite weeknight dinner. Female-presenting voice, mid-30s to mid-40s, no announcer energy. Reference: think Aubrey Plaza but warmer."

Copy: "Wednesday at 6:47 PM. The kids are home. The pasta's almost done. And tonight, dinner doesn't have to be a question. Bella Sera weeknight sauces — real ingredients, twenty-minute meals, zero compromises."

Format: :30 TV commercial. Length: I read it in about 22 seconds clean.

Me: 32, alto with a slight rasp, conversational lane. Question I have: the spec says "no announcer" but the copy ends with a tag line that wants to land. How do I sell the close without going announcer?
```

If you get back a one-line intent, three different read directions (NOT all "warm and conversational"), the trap, a markup with intentions per phrase, and a pushback note at the bottom — you're loaded right. If you got "trust your instincts, you've got this!" or three reads that are all "warm but with more energy" — paste the system prompt again. It didn't load.

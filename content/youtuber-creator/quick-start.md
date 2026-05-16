# Quick Start — YouTuber Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" field, paste the entire contents of `optimization-pack.md`. Upload `frameworks/title-and-thumbnail-frameworks.md` and `memory.md` to project knowledge. If you have transcripts of your last 2-3 videos, upload those too — they teach Claude your voice faster than any description. Start a new conversation. First message: tell Claude your channel niche, sub count, and what makes your channel different, then what you need — "Validate this idea against the search-vs-trend filter" or "Draft a script for a 14-min video on [topic]."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed near the bottom of that file. In "Knowledge," upload `frameworks/title-and-thumbnail-frameworks.md`, `memory.md`, and 2-3 of your past video scripts or transcripts. Save the GPT (private to you is fine). Open it and start with: "Channel niche is X, I have Y subs, here's what makes us different: Z. Today I need [artifact]."

If you don't have ChatGPT Plus, just paste `optimization-pack.md` at the top of a regular chat. You lose persistence and file uploads but the prompt still works.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for channel niche, voice, artifact, and premise."

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into instructions, save, and use that Gem.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. Channel is "Cold Numbers," niche is finance history told in a narrative-essay style, 87k subs, average video 14-17 min. Voice: dry, technical, no-bullshit, occasional dark humor. What makes us different: we treat finance disasters as character studies, not abstract market events. Today I need 5 title variants and 3 thumbnail concepts for a video on the 38-line Excel script that mispriced Lehman's mortgage book. Premise: a single junior analyst's spreadsheet error compounded into the biggest bankruptcy in US history.
```

If you get back 5 titles labeled by frame (curiosity / specificity / contrarian / emotional / list) each with what-it-promises and failure-mode notes, plus 3 concrete thumbnail concepts with foreground/secondary/background placement and color palette, and ends with a "Sanity check" block, the kit is loaded right. If it gave you titles with "might" or "could," or thumbnails described as "eye-catching" without specifics, the system prompt didn't load — paste it again.

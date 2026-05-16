# Quick Start — Office Manager Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge so Claude has them as reference. Start a new conversation in the project. First message: tell Claude what you need — "I need a vendor quote request for floor mats" or "Draft the snow day comm for tomorrow morning."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "Hi, I'm the office manager at a [headcount]-person [industry] company in [city]. I need [artifact]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. It'll work — you just lose the persistent GPT and file uploads.

## Gemini, Copilot, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for the artifact and the basics." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions, save, and use the Gem instead of default chat.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. I'm the office manager at a 65-person tech company in Toronto. The landlord is doing HVAC work this Saturday, building closed 8 AM to 2 PM. Need a Slack message to the team going out today (Wednesday). Nobody's allowed on the floor during the window — they're swapping a rooftop unit. Email me too if you want a parallel version for the all-team email.
```

If you get back two short, plain messages — one Slack-formatted, one email-formatted — both leading with the closure window and including a clear "next update by" line, and ending with an "I assumed:" block, the kit is loaded right. If you got "Hi team!! Just wanted to give you a friendly heads-up that we'll be experiencing some exciting building updates this Saturday!" — the system prompt didn't load. Try pasting it again.

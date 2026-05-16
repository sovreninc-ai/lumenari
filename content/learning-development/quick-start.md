# Quick Start — L&D Specialist Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge. Start a new conversation. First message: tell Claude the request as it came in, the actual performance problem if you've inferred one, audience + deadline + budget, and the artifact you need. Example: "HRBP came in asking for 'leadership training for new senior managers' by end of Q3. The real problem I think we have: senior managers (managers-of-managers) don't have a model for how to coach their direct-report managers — they're either doing it themselves or ignoring it. I have 6 weeks and $0 external budget. Help me draft the needs-analysis writeup that pushes back."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "I'm an L&D specialist at a [size] company. Here's the request and what I need: [...]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for the request as it came in, the actual performance problem, audience + deadline + budget, constraints, and what I'm not going to push back on." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm an L&D specialist at a 1,200-person SaaS. HRBP (Maria) just messaged me: "We're seeing too much manager turnover at the senior manager level (people 2 years into the role leaving). We need a senior-manager retention training. Can you build something by end of Q3?" Deadline is 9 weeks out. I have $0 external budget. Senior-manager population is ~80 people across functions. Modality preference: blended (live + async). I haven't pushed back yet; I want to first.

Help me draft the needs-analysis writeup I'll send back to Maria.
```

If you get back a writeup that: (1) does NOT start designing training; (2) asks the four diagnostic questions (what do they do today / what would they do different / what have we ruled out / what business outcome moves); (3) names specific possibilities the real problem could be (it's almost never knowledge — usually it's career-path ambiguity, manager-of-manager support gaps, comp issues, or burnout); (4) recommends a non-training intervention first OR scopes the training to the part that's actually a training problem; (5) ends with what you'd want from Maria to scope it properly — the kit is loaded right.

If it just designed a "senior manager retention training" program with Bloom's-tagged objectives without first pushing back, OR used "transformational" / "best-in-class" anywhere, OR wrote learning objectives with "Learn to" or "Understand" — the system prompt didn't load. Try pasting it again.

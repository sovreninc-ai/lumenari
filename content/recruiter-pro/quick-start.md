# Quick Start — 60-second setup

Three paragraphs, one per platform. Pick yours, paste, test.

---

## Claude (claude.ai or Claude in the API)

Create a new Project. Name it "Recruiter Co-Pilot." In the Project's **Instructions** field, paste the full contents of `optimization-pack.md`. Save. Every chat in that Project now runs in recruiter mode — JD writer, outreach drafter, interview-kit builder, Boolean string generator. For one-off use, paste the optimization pack as the first message in a new chat. Bonus: drop your existing high-performing JDs and the most-replied-to outreach into the Project's knowledge base — the AI will reference your team's actual voice and brand when drafting new ones.

**Test it:** Start a new chat in the Project and paste the test prompt below.

---

## ChatGPT (Custom GPT or one-off chat)

For a Custom GPT (Plus or Team): go to "My GPTs" → "Create a GPT" → "Configure." In the **Instructions** field, paste `custom-gpt-instructions.md`. Name it "Recruiter Co-Pilot." Description: "JDs without the jargon, outreach that gets replies, interview kits, Boolean strings." Save. For one-off use, paste `optimization-pack.md` as the first message in any standard thread.

**Test it:** Open your new GPT and paste the test prompt below.

---

## Gemini, Cursor, Codex (or any other AI)

For **Gemini Advanced**, create a new Gem. Paste the optimization pack into the Gem's instructions field, save, and use that Gem for recruiting work. For **Cursor**, this kit is less applicable (Cursor is for code), but if you write JDs as MDX in a careers-page repo, paste the optimization pack into `.cursorrules`. For **Codex / GitHub Copilot Chat / any other AI**, paste the optimization pack as the first message in a fresh conversation and re-paste it at the start of any new thread.

**Test it:** Use the test prompt below to confirm setup.

---

## Paste-able test prompt

```
I'm hiring a Senior Full-Stack Engineer at a 30-person Series B SaaS. Remote-first, US + Canada. Stack: TypeScript, React, Node, Postgres on AWS. Salary band: USD $170-210K base + 0.05-0.15% equity. The hiring manager wrote a JD and I think it's bad. Here's what they sent:

"We're looking for a passionate rock star full-stack engineer to join our fast-paced, dynamic team. You'll be a 10x developer who thrives in ambiguity and isn't afraid to wear many hats. Must have a Bachelor's degree in Computer Science and 10+ years of experience. We work hard and play hard, and we're like a family here. Competitive salary and benefits."

I need:
1. A bias lint of what they sent (specific flagged phrases and why)
2. A complete rewritten JD using the kit's format
3. An outreach template for cold-DMing senior engineers (3 lines max in the opener)
4. A LinkedIn Recruiter Boolean string for senior engineers with TypeScript + React + Node who've shipped at startups
```

You should get back: a lint pass that flags "passionate," "rock star," "fast-paced," "10x developer," "wear many hats," "Bachelor's degree required," "10+ years," "work hard play hard," and "like a family" — with specific fixes for each. Then a clean ~500-word JD with salary band, real "what you'll do" outcomes, an actual interview process, and a working arrangement section. Then a three-line outreach that names a real-feeling reason for the message. Then a Boolean string with the clauses explained, plus 2 variants if the first returns too few or too many results.

If you get back a JD with "rock star" still in it, or outreach with no comp band mentioned, the optimization pack isn't loaded. Re-paste it.

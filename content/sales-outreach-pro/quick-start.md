# Quick Start — Sales Cold Outreach + Follow-up

Running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project. In "Custom instructions" or "Project knowledge," paste the entire contents of `optimization-pack.md`. Upload the files from `frameworks/`, `templates/`, and `playbooks/` so Claude has them as reference. Start a new conversation in the project. First message: tell Claude your ICP in one sentence, what artifact you want, and the prospect-specific signal. Example: "ICP: VPs of Engineering at Series A SaaS, 50-200 employees. Cold email. Signal: they just raised a B round 3 weeks ago led by [VC]. Value: we cut CI/CD spend by reducing flaky test reruns."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus required). In "Instructions," paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload the markdown files from `frameworks/`, `templates/`, and `playbooks/`. Save the GPT private. Open it. First message: ICP + artifact + signal, same as the Claude example above.

If you don't have Plus, paste `optimization-pack.md` at the top of a regular chat. Same outcome, no persistence.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for ICP, artifact, and signal." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into instructions, save, use the Gem instead of default chat.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run.

ICP: VPs of Engineering at Series A SaaS companies, 50-200 employees, US-based, building React frontends.
Prospect: Sarah Chen, VP Engineering at Beacon Labs. Signal: she just posted on LinkedIn 4 days ago about her team's CI/CD pipeline being a bottleneck after they doubled the engineering team.
Value: we reduce flaky-test reruns by 60%, which cuts CI minutes and the on-call pages that come with them.
Proof: Linear and Vercel are customers.
CTA: 15 min next Tuesday or Wednesday.
Constraint: under 75 words, subject line under 40 characters.

Write the cold email.
```

If you get back an email that:
- References Sarah's specific LinkedIn post about CI/CD pain
- States the value in plain language without "transform" or "revolutionize"
- Has a single ask with proposed times
- Comes in under 75 words
- Ends with a "two things you might want to change" block

...the kit is loaded right. If the email starts with "Hope this finds you well" or "I wanted to reach out," the system prompt didn't load — try pasting it again at the top of the conversation.

# Quick Start — Security Engineer Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team for projects; the prompt also works in a regular chat). In "Custom instructions" or "Project knowledge," paste the entire contents of `optimization-pack.md`. Upload `checklists/threat-model-and-incident-runbook.md` to project knowledge so Claude can pull from it. Start a new conversation and identify the mode: "Threat model mode — I'm adding webhook signing to our API" or "Incident mode — we're seeing odd OAuth callback traffic from one IP block." Claude will ask the intake questions and produce.

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus required). Paste the entire contents of `custom-gpt-instructions.md` into the Instructions field. Use the five conversation starters from that file. In "Knowledge," upload `checklists/threat-model-and-incident-runbook.md`. Save (private to you is fine). Open the GPT and start with the mode and the context.

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Works fine — you just lose the persistent GPT.

## Cursor, Codex, Gemini, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge and ask me for the mode (threat model, review, incident), context, and environment." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into instructions, save, and use that Gem.

---

## Test it works

Once the system prompt is loaded, paste this in:

```
Security review mode. Service description: a Node/Express API that accepts file uploads from authenticated users, stores them in S3, generates presigned URLs for download. JWT for auth (HS256, 24h expiry). Files up to 100MB. No virus scanning currently. Logs go to CloudWatch.
```

If you get back: findings organized by section (auth, authz, input, output, secrets, logs, deps, network), each with severity + CWE reference + concrete fix (e.g., `[High] [CWE-434] Missing MIME type allowlist and antivirus scan on upload — add a Lambda hook on S3 PutObject that scans via ClamAV and quarantines non-allowlisted MIME types`), and a prioritized action list — the kit is loaded right. If you get back "make sure to validate inputs and encrypt at rest," the prompt didn't load — paste it again.

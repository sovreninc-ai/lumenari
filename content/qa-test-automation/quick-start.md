# Quick Start — QA / Test Automation Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team for projects; works in regular chat too). In "Custom instructions" or "Project knowledge," paste the entire contents of `optimization-pack.md`. Upload `patterns/playwright-cypress-flake-reduction.md` to project knowledge. Start a new conversation: "Triage mode — this Playwright test fails about 5% of the time in CI but passes locally. Here's the test and the failure log." Claude will walk the triage matrix.

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus required). Paste the entire contents of `custom-gpt-instructions.md` into the Instructions field. Use the five conversation starters from that file. In "Knowledge," upload `patterns/playwright-cypress-flake-reduction.md`. Save (private is fine). Open the GPT and start with the mode, framework, and context.

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Works fine — you just lose the persistent GPT.

## Cursor, Codex, Gemini, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge and ask me for mode (plan/write/triage/scale), framework (Playwright/Cypress), and context." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into instructions, save, and use that Gem.

---

## Test it works

Once the system prompt is loaded, paste this in:

```
Write mode. Playwright. Feature: a settings page where users can update their email address. After update, the user sees a "Verification email sent" toast and gets logged out within 60 seconds for re-verification. Write a test plan and the happy-path test.
```

If you get back: a test plan with four sections (happy path with re-auth flow, edge cases like same-email-as-current, error paths for taken email and network failure, a11y for the input + toast + redirect), then a Playwright test using `page.getByRole('textbox', { name: /email/i })` and `page.getByRole('button', { name: 'Update email' })` and an assertion on the toast via `expect(page.getByRole('status')).toContainText('Verification email sent')` and a POM scaffold if reuse is expected — the kit is loaded right. If you get back `page.locator('.email-input').fill(...)` and a `page.waitForTimeout(3000)` before the toast assertion, the prompt didn't load — paste it again.

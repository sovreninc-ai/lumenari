# Quick Start — Personal Finance / Budgeting Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and the `templates/` folder to project knowledge. Start a new conversation. First message: tell Claude your currency, country, and what you want help with — "I'm in Canada, CAD, want to build a zero-based budget."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and the files from `templates/`. Save the GPT (private to you is fine). Open it and start with currency/country and what you need.

If you don't have ChatGPT Plus, just paste `optimization-pack.md` at the top of a regular chat. It'll work — you lose the persistent GPT and file uploads.

## Gemini, Codex, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me my currency, country, and what I want help with." Once it does, you're set.

For Gemini Gems specifically: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem instead of default chat.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm in Canada, CAD. Monthly take-home $5,800 (just me). Rent $1,650, utilities ~$180, phone $80, internet $90, groceries ~$500, transit $120, car insurance $1,800/year, debt minimums $310/mo ($4,200 credit card at 21.99%, $9,000 line of credit at 8.5%). Goals: emergency fund $5,000 by year-end, vacation $2,000 in 8 months. Build me a zero-based budget and show me avalanche vs snowball for the debt.
```

If you get back a zero-based budget where every dollar has a job (including a sinking fund for the annual insurance), avalanche and snowball shown side-by-side with months-to-debt-free and total interest for each, named goals with monthly transfer amounts, and a "talk to a fee-only CFP for X" note at the bottom, the kit is loaded right. If you see "just buy VOO," a specific bank or brokerage recommended by name, "skip your daily latte," or a prediction about market returns, the system prompt didn't load — paste it again.

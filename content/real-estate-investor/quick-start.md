# Quick Start — Real Estate Investor Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan for Projects; the prompt works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to project knowledge. Start a new conversation. First message: tell Claude your market, entity, strategy, and the artifact — "Draft an LOI for an SFR purchase in Phoenix, $245K target, 21-day DD, 45-day close."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In "Instructions," paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you). Open it and start with: "Hi, I'm an investor operating in [market], [entity type], [strategy]. Here's the deal and what I need: [paste]."

If you don't have Plus, paste `optimization-pack.md` at the top of a regular chat. It works — you just lose persistence.

## Gemini, Copilot, or any other AI tool

Open the tool. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for market, strategy, track record, deal context, and artifact." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem instead of the default chat.

---

## Test it works

Once the system prompt is loaded, paste this:

```
Test run. Operating in Indianapolis. Entity: ABC Holdings LLC, Indiana. Strategy: buy-and-hold SFR via BRRRR. Track record: 6 doors closed since 2022, 4 currently held, 2 sold. Deal: 1432 N Talbott St, off-market via direct mail. 3/1 SFR, 1,180 sqft, built 1948. Seller wants $115K, I'm targeting $98K. ARV at $185K based on three comps within 0.4 mi closed in last 60 days (a 3/2 at $182K, a 3/1 with garage at $179K, a 3/1.5 at $193K — none have the layout this one does, mine needs a bath added). Rehab budget $52K including the bath addition + 15% contingency. Refi at 70% LTV with my DSCR lender. Want an LOI.
```

If you get back an LOI in the structure (date → parties → price + EMD → DD → financing → closing → title → as-is → exclusivity flagged → confidentiality → non-binding clause → expiration → signature → attorney review flag → disclaimer), with the Indiana counsel-review flag explicit and the EMD/DD numbers consistent with the inputs — the kit is loaded right.

If the output uses "transformational," "won't last," "great opportunity," or any guru language, the system prompt didn't load — paste it again. If the underwriting (separate prompt or in the same response) produces a pro forma without vacancy / capex / PM line items, the system prompt loaded but the model is overriding — call it out and re-anchor with: "Re-read the forbidden content section. No pro formas without the standard line items."

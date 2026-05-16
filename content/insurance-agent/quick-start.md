# Quick Start — Insurance Agent Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan for Projects; the prompt works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to project knowledge. Start a new conversation. First message: tell Claude your licensing state or province, the line you're working on, the carrier, the policy form, and the artifact — "Draft a quote walkthrough for an HO-3 with Travelers in Florida."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In "Instructions," paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you). Open it and start with: "Hi, I'm an independent agent licensed in [state/province]. Here's the artifact and the dec page summary: [paste]."

If you don't have Plus, paste `optimization-pack.md` at the top of a regular chat. It works — you just lose persistence.

## Gemini, Copilot, or any other AI tool

Open the tool. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction, line, carrier, policy form, and artifact." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem instead of the default chat.

---

## Test it works

Once the system prompt is loaded, paste this:

```
Test run. I'm an independent agent licensed in Texas, with the client in Houston. Carrier: Travelers. Policy form: HO-3. Renewal came back at $4,820/year, up from $4,090 last year (up 18%). Client is a homeowner, single-family 2,400 sqft, replaced roof 2022, no claims in 5 years. Carrier cited Houston-area loss costs (wind/hail), reinsurance pricing, and replacement-cost inflation. Wind/hail deductible is 1% of dwelling ($3,600 currently). All-other-perils deductible is $2,500. Tone: honest, options-oriented, not defensive.
```

If you get back a renewal letter in the structure (opening names the increase → what drove it → what you can do → what I don't recommend → next steps + deadline → sign-off → disclaimer footer → verification block), with the deductible math worked, carriers named, and no defensiveness — the kit is loaded right.

If the output uses "comprehensive protection," "peace of mind," "rock-solid coverage," or any phrase that hides the rate increase, the system prompt didn't load — paste it again. If the output asserts that a specific claim "would be covered" against a hypothetical, the system prompt loaded but the model is overriding — call it out and re-anchor with: "Re-read the forbidden content section."

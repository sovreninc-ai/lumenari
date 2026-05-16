# Quick Start — Florist Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to the project knowledge so Claude has them as reference material. Start a new conversation in the project. First message: tell Claude what you need and your source — "I'm sourcing from the Atlanta market this week, late May. I need an event proposal for an 80-guest summer wedding."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "I'm a florist working out of [market/region]. Here's what I need: [document]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for the artifact type, the recipe, audience and price point, and season/source." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm a florist in Calgary, sourcing through United Floral and grower-direct from Hillside Hollow Farms. Late June, peony season is winding down, garden roses are reliable, local foliage is plentiful. I need a wedding bouquet description for a retail proposal — bride bouquet for a 90-guest backyard wedding, June 27 2026. Recipe: 9 David Austin 'Juliet' garden roses (peach), 5 white anemones with dark centers, 7 stems of Italian ruscus, 4 stems of silver dollar eucalyptus trailing, 3 stems of locally grown white astilbe, 2 fronds of leather fern. Hand-tied with peach silk ribbon, ~9 inches across, ~12 inches tall. Bride aesthetic is "garden-grown, slightly wild, not too tight." Price: $385 CAD. Substitution policy applies — Juliet roses require sign-off if subbed.
```

If you get back a 3-5 sentence description that names each stem with the variety, mentions the silk ribbon, includes dimensions, includes the substitution note about Juliet roses requiring sign-off, lists the price in CAD, and ends with a "Things to verify before sending" block, the kit is loaded right. If it called the bouquet "stunning" or said "lush blooms" anywhere, the system prompt didn't load — try pasting it again.

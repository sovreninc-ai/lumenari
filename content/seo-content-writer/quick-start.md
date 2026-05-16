# Quick Start — 60-second setup

Three paragraphs, one per platform. Pick yours, paste, test.

---

## Claude (claude.ai or Claude in the API)

Create a new Project in Claude. Name it "SEO Content Strategist." In the Project's **Instructions** field, paste the full contents of `optimization-pack.md`. Save. Every chat in that Project now runs as a senior SEO strategist — outliner, article writer, meta + schema generator, refresh advisor. For one-off use, paste the optimization pack as the first message in a new chat. Bonus: drop your top-performing existing articles into the Project's knowledge base; the AI will reference your actual URL structure and tone when suggesting internal links.

**Test it:** Start a new chat in the Project and paste the test prompt below.

---

## ChatGPT (Custom GPT or one-off chat)

For a Custom GPT (Plus or Team): go to "My GPTs" → "Create a GPT" → "Configure." In the **Instructions** field, paste `custom-gpt-instructions.md`. Name it "SEO Content Strategist." Description: "Outlines, longform, meta, schema, and refresh playbook — strategist-grade, not freelancer-grade." Enable web browsing if you want it to read live SERPs (otherwise you'll paste the top 10 manually). Save and chat. For one-off use, paste `optimization-pack.md` as the first message in any standard thread.

**Test it:** Open your new GPT and paste the test prompt below.

---

## Gemini, Cursor, Codex (or any other AI)

For **Gemini Advanced**, create a new Gem. Paste the optimization pack into the Gem's instructions field, save, and use that Gem for SEO work. Gemini's live web access is useful here — let it pull current SERPs when you ask. For **Cursor**, paste the optimization pack into `.cursorrules` if you want SEO help inside your code editor for static-site content (MDX, hugo, etc.). For **Codex / GitHub Copilot Chat / any other AI**, paste the optimization pack as the first message in a fresh conversation and re-paste at the start of any new thread.

**Test it:** Use the prompt below to confirm setup.

---

## Paste-able test prompt

```
I run a SaaS comparison blog. Mid-six-figures monthly traffic, DA ~52.

Primary keyword: "best CRM for solopreneurs"
Estimated volume: ~1,900/mo
SERP top 3 are:
1. Zapier's blog (commercial listicle, 4,200 words, 12 tools reviewed)
2. HubSpot's blog (informational + soft-promotional, 2,800 words)
3. A Substack writer's personal review (1,400 words, 5 tools tested over 90 days, very strong POV)

I want to outrank #3 specifically — the personal-review angle is the gap.

Give me:
1. Intent classification + SERP read
2. Full outline with H1, H2s, internal link suggestions
3. Meta title + meta description
4. Schema recommendation
5. One paragraph on the E-E-A-T angle: who should byline this, what experience injection do I need?

Use placeholders if you need them.
```

You should get back: intent classified as commercial (with a note that #3's personal-review angle is the differentiator), a tight outline (probably 7-9 H2s, with featured-snippet-ready section openers), 3-5 named internal-link suggestions, meta in spec, Article + FAQPage schema recommended, and a frank note that this only works if YOU actually tested CRMs for 90 days — otherwise the kit will suggest hiring a writer who did, or partnering with one who has receipts.

If you get back a generic listicle outline with no intent classification and no SERP read, the optimization pack isn't loaded. Re-paste it.

# Quick Start — Machine Learning Engineer Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team for projects; works in regular chat too). In "Custom instructions" or "Project knowledge," paste the entire contents of `optimization-pack.md`. Upload `templates/model-card-and-eval.md` to project knowledge. Start a new conversation: "I'm shipping an intent classifier trained on 6 months of support tickets — help me build the model card and eval framework." Claude will ask the intake questions and produce.

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus required). Paste the entire contents of `custom-gpt-instructions.md` into the Instructions field. Use the five conversation starters from that file. In "Knowledge," upload `templates/model-card-and-eval.md`. Save (private is fine). Open the GPT and start with the regime, eval status, and deploy timeline.

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Works fine — you just lose the persistent GPT.

## Cursor, Codex, Gemini, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge and ask me for regime, eval status, model card status, and deploy timeline." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into instructions, save, and use that Gem.

---

## Test it works

Once the system prompt is loaded, paste this in:

```
LLM application. I have a retrieval-augmented chatbot answering customer support questions. Held-out eval set: 500 labeled Q-A pairs from the last 30 days, frozen. Baseline: previous prompt version. No model card yet, no drift monitoring, deploying next Friday. Help me get to shippable.
```

If you get back: a structured plan with (1) a model card outline filled with the info given and explicit "need from you" markers for missing sections, (2) an eval framework that splits the 500 pairs into slices (question category, length, recency), uses both rule-based ground truth (exact-match on key facts) and LLM-as-judge as a paired signal, computes metrics with bootstrap CIs, (3) an adversarial suite with prompt-injection probes, (4) drift monitoring spec for input embedding shift + response length + refusal rate + customer complaint correlation — the kit is loaded right. If you get back "looks good, ship it!", the prompt didn't load — paste it again.

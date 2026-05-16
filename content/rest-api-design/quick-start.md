# Quick Start — REST API Design Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `patterns/resources-versioning-errors.md` to the project knowledge so Claude can pull from it. Start a new conversation and describe your feature: "I'm adding subscription cancellations to our billing API — design the endpoints." Claude will ask the three intake questions (consumer mix, existing spec or fresh, feature description), then produce the design.

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload `patterns/resources-versioning-errors.md`. Save the GPT (private is fine). Open it and start with: "I'm working on [API name]. Here's the feature: [description]."

If you don't have ChatGPT Plus, just paste `optimization-pack.md` at the top of a regular chat. It works — you just lose the persistent GPT.

## Cursor, Codex, Gemini, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge and ask for consumer mix, existing spec status, and the feature." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into instructions, save, and use that Gem.

---

## Test it works

Once the system prompt is loaded, paste this in:

```
Test run. I have an existing OpenAPI 3.1 spec for an internal+partner API. I'm adding a feature: customers can cancel a subscription, optionally specifying an effective date (immediate or end-of-period). After cancellation, a refund may be issued. Design the endpoints, status codes, and error cases.
```

If you get back: a resource analysis (Subscription, Cancellation as sub-resource), an endpoint like `POST /v1/subscriptions/{id}/cancellations` (or a documented PATCH-with-status alternative + tradeoffs), the 201/404/409/422 status codes mapped, an RFC 7807 example error response, and a "what could go wrong" section covering idempotency and partial refund failure — the kit is loaded right. If you get back `POST /cancelSubscription`, the prompt didn't load — paste it again.

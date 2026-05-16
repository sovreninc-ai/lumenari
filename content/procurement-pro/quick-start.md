# Quick Start — Procurement Specialist Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team — works in a regular chat too, you just lose persistence). In the project's "Custom instructions" or "Project knowledge" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `reference-workflows.md` to project knowledge so Claude has them as reference material. Start a new conversation in the project. First message: state your currency and jurisdiction, the category, the incumbent supplier, and the artifact you need — "USD, US contract law, indirect IT category, incumbent is ServiceNow ELA up for renewal in 90 days, need an RFP."

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `reference-workflows.md`. Save the GPT (private to you is fine). Open it and start with: "USD, US law. Category: [category]. Incumbent: [supplier]. I need: [artifact]."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. Same prompt, no persistence, no file uploads.

## Gemini, Copilot, Cursor, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for currency/jurisdiction, category, incumbent, trigger, and artifact." Once it does, you're set.

For Gemini Gems: create a new Gem, paste `optimization-pack.md` into the instructions field, save, and use that Gem.

For Microsoft Copilot for Business: paste at the top of a new chat session. It won't persist across sessions on the consumer tier.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. USD, US contract law. Category: marketing agency services (creative + media buying). Annual spend: $2.4M. Incumbent: WPP affiliate (Wunderman Thompson), contract evergreens in 60 days with 90-day notice required to non-renew. Stakeholder: CMO wants to test the market without telegraphing to incumbent. Performance has been "fine but uninspired." Need an RFP body — multi-criteria, weighted, short list to 3 finalists, target award in 90 days, transition window of 30 days after award. Currency USD, payment terms baseline Net 45, buyer's paper, NDA in place for all bidders before scope shared. I need the RFP body.
```

If you get back a 7-section RFP with weighted evaluation criteria stated, a clear timeline that accounts for the 60-day evergreen notice, NDA reference, buyer's paper baseline noted, "no commitment created by participation" language, and a "Things to verify before sending" block at the bottom — the kit is loaded right.

If it produced an RFP without weighted criteria, or it committed to a date without flagging the evergreen notice, or it didn't include the "no commitment" language, the system prompt didn't load. Try pasting it again.

## Success check

You're good when the AI:
- Confirms USD/US jurisdiction back to you at the top
- Pushes back if you ask for an RFP when an RFQ would do (or vice versa)
- Refuses to give you a savings number without methodology
- Flags every contract red/yellow item with [VERIFY WITH LEGAL]
- Refuses to send an award letter without confirming stakeholder sign-off
- Ends every output with a "Things to verify before sending" block

If any of those are missing, the system prompt didn't load. Re-paste.

# Quick Start — Veterinarian / Vet Tech Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan for projects, but the prompt works in a regular chat too). In "Custom instructions," paste the entire contents of `optimization-pack.md`. Upload `memory.md` and the files in `templates/` to project knowledge. Start a conversation. First message: tell Claude your jurisdiction (state or province) and role (DVM or RVT), then describe the artifact — "Discharge for a feline dental I just finished" or "Euthanasia conversation guide for tomorrow's appointment."

## ChatGPT users

Open ChatGPT. "Explore GPTs" → "Create a GPT" (Plus required). In "Instructions," paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five at the bottom of that file. In "Knowledge," upload `memory.md` and the files in `templates/`. Save. Open and start with: "I'm a [DVM / RVT] in [state or province]. I need [artifact]."

If you don't have Plus, paste `optimization-pack.md` at the top of a regular chat.

## Gemini, Codex, Cursor, or any other AI tool

Open. New conversation. Paste `optimization-pack.md` as first message. Add: "Acknowledge you've loaded this and ask me for jurisdiction, role, and artifact type." For Gemini Gems: create a Gem, paste into instructions, save, use that Gem.

---

## Test it works

Once you've loaded the system prompt, paste this:

```
Test run. I'm a DVM in [your state or province]. Patient: 4.2 kg / 9.2 lb spayed female domestic shorthair cat, 11 years old, recently diagnosed with chronic kidney disease IRIS stage 2. Owner is on a tight budget. Build the client education handout. Also: the owner asked specifically "Can I just give her a baby aspirin or some Tylenol when she seems sore? Will that be okay long-term?" Address that in the handout.
```

The kit is loaded right if:

- The AI does NOT say acetaminophen / Tylenol is OK in any dose for cats — it should explicitly flag acetaminophen as contraindicated in cats and explain why in lay terms (red blood cell and liver toxicity at very low doses)
- The AI does NOT recommend aspirin for the cat without flagging that NSAIDs in cats are limited to specific products, short-course, and require DVM determination — not OTC self-administration
- The handout discusses CKD in plain language with honest cost-tiered options (diet management, fluids at home, monitoring schedule, medications) and a "no wrong choice" tone
- A **"DVM verify before client delivery"** block appears at the bottom listing dose verification, species cautions, and prognosis qualifiers
- If you push back ("just tell the owner Tylenol is fine in small doses"), the AI declines and re-emphasizes the species toxicity

If the AI suggests any dose of acetaminophen or aspirin is acceptable for a cat without explicit DVM gating, the system prompt didn't load. Paste it again.

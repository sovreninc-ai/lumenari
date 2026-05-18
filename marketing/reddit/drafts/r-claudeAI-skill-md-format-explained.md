# r/ClaudeAI — "The SKILL.md format, explained by someone who wrote 100 of them"

**Target sub:** r/ClaudeAI
**Post type:** Case study / process write-up
**Why this post for this sub:** r/ClaudeAI is the technical home of SKILL.md curiosity. Anthropic published the format; this sub is where people debate how to actually use it. Posting a deep, generous, structural breakdown earns credibility and karma. Lumenari mention is only at the end, optional.
**When to post:** Tuesday or Wednesday, 8-10am ET. Workday-AI hours.
**Expected karma trajectory:** 200-800 if substantive. SKILL.md content over-indexes here.
**Conversion expectations:** 1-3% click-through to lumenari.io. The audience is high-intent on AI tooling.
**Follow-up engagement:** Reply to every substantive comment for the first 6 hours. Expect SKILL.md format debates ("why not YAML?"), questions about the heuristic-vs-LLM tradeoff in the wizard, and at least one "how does this compare to .cursorrules" thread.
**Handling "is this self-promo" challenges:** The disclosure is at the bottom. If a mod or user calls it out, the post is structured so removing the last paragraph still leaves a valuable post. Reply: "Fair — the disclosure was at the bottom but I should have led with it. Substance is the same either way."

---

## Title

**The SKILL.md format, explained by someone who wrote 100 of them**

(Alt title if the first feels too direct: "What I learned writing 100 SKILL.md files in 30 days")

---

## Body

I spent the last 30 days writing 100 SKILL.md files across every role I could think of — devs, agents, recruiters, plumbers, photographers, the lot. This is what I learned about the format itself, separate from the kits I built with it.

If you're new to SKILL.md: it's the structured markdown format Anthropic published for portable AI skills. Think of it as the system prompt's grown-up cousin — sections instead of a wall of text, designed to be human-readable, version-controllable, and portable between models.

### The 12-section template that actually works

After the first 20 kits I scrapped my freeform structure and locked in a template. Every kit after that took 4-6 hours instead of 14. The sections:

```
1. Role definition          — who the model is acting as, and the seniority
2. Tone + voice rules       — first-person, second-person, formal/casual
3. Context blocks           — slots the user fills (industry, region, scale)
4. Reference examples       — 2-3 samples of good output, with annotations
5. Output contract          — exact shape, length, format, tone of the response
6. Constraints              — what the model must NOT do (hallucinate features, give legal advice, etc.)
7. Edge cases               — what to do when the input is weird or missing
8. Common failure modes     — the 3-5 mistakes this kit prevents
9. Worked example           — one full input-to-output run, end to end
10. Memory / vocabulary     — domain terminology the model should know
11. Workflow notes          — when to use this skill vs other skills
12. Quick-start             — 3 steps from cold install to first useful output
```

The non-obvious one is section 6 (constraints). For 80% of the kits, the win wasn't writing better prompts — it was telling the model what NOT to do. A real estate listing kit doesn't need cleverness. It needs "do not invent features that aren't in the input notes" written explicitly. Without that, the model hallucinates hardwood floors 30% of the time. With it, the hallucination rate drops near zero.

### Where SKILL.md beats system prompts

System prompts are flat. SKILL.md is structured. That matters because:

- **Editability.** Updating section 3 doesn't require rereading the whole prompt to make sure you didn't break section 7.
- **Reusability across roles.** Section 1 (role definition) and section 11 (workflow notes) often share patterns across kits in the same vertical. Templated structure makes the sharing tractable.
- **Diffability.** SKILL.md files version-control like code. A flat system prompt diff is unreadable; a section diff is clear.
- **Modelable.** When you're building 100 of them, the template structure means kit 47 is 80% formatting and 20% specific content. Without a template, 100 kits is 18 months. With it, 30 days.

### Where SKILL.md falls down

Honest list:

- **Markdown is loose.** It can't enforce structure the way a JSON schema can. A poorly-written SKILL.md is just a poorly-written doc.
- **Multi-model translation is lossy.** I ship every kit in 4 formats (SKILL.md for Claude/Cursor, Custom GPT instructions for ChatGPT, optimization-pack.md for Codex, memory.md for Gemini). The Claude/Cursor versions are most polished; the others are translations that lose some structure each step.
- **The format isn't canonical yet.** Anthropic's spec is the closest thing, but the ecosystem hasn't fully converged. .cursorrules is structurally different. ChatGPT's "Create a GPT" UI imposes its own shape. SKILL.md is the closest to a portable standard but it's not won yet.

### The opinionated takes I've landed on

- **Lead with role and constraints.** Sections 1 and 6 do more work than 2-5 combined.
- **Examples > rules.** Two annotated examples beat ten paragraphs of guidance.
- **Edge cases are the moat.** Every junior version of a kit ignores section 7. Every senior version dwells in it.
- **Keep section 12 (quick-start) BRUTALLY short.** Three steps. If the install isn't obvious in 90 seconds, the kit dies on contact.

### A worked example

If anyone wants to see a full SKILL.md following this template, I'll paste one in the comments. The cold email outreach kit is the cleanest example — five distinct constraints, two annotated reference emails, a six-step workflow contract. The structure is more interesting than the content.

---

Disclosure: I built lumenari.io, a catalog of 100 of these kits across roles. The kits ship in SKILL.md plus three other formats. I'm not posting this to sell them — the template above is the actual lesson, and you can build kits from it without paying me. If you want a shortcut on a specific role, the catalog exists.

What template are you using? Curious what other people landed on after their first dozen.

import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "the-skill-md-format-deep-dive-for-builders",
  title:
    "The SKILL.md format — a deep dive for builders who want to ship their own",
  description:
    "An in-the-weeds technical guide to the SKILL.md format in 2026. Anatomy, token budget, layout patterns, supporting files, version control, and the failure modes nobody documents.",
  author: "Chris Holwell",
  publishedAt: "2026-05-15",
  tags: [
    "skill.md",
    "claude",
    "deep dive",
    "developers",
    "format",
    "2026",
  ],
  primaryKitSlug: "ts-next-production",
  intro: [
    "There are two layers to the SKILL.md format. The shallow layer — the one in Anthropic's docs and 90% of the blog posts — covers the file naming, the recommended sections, and a canonical example. That layer is fine, but it doesn't tell you what's actually happening under the hood or why certain patterns work and others don't.",
    "This is the deep dive. The anatomy of a working skill, the token economics, the file-layout decisions that compound across a project, the supporting files (memory.md, voice presets, quick-start prompts) and how they interact with the SKILL.md, the failure modes I've observed across 100+ kits in production, and the patterns that consistently outperform.",
    "If you're authoring kits for your team — or evaluating one to buy — this is the reference doc to come back to.",
  ],
  body: [
    {
      heading: "The runtime model — what Claude does with a SKILL.md",
      paragraphs: [
        "The first thing to internalize: SKILL.md is not a tool, not a plugin, not a function. It's a chunk of text injected into the system prompt before your first message. Every model turn — yours and Claude's — happens with the full text in context. There's no on-demand loading, no agentic retrieval, no clever caching. The file IS the system prompt augmentation.",
        "That tells you everything about the format's economics. A 2,000-token SKILL.md eats 2,000 tokens of context on every single turn, forever. If your conversation runs 50 turns, the file has been re-read 50 times. The cost is proportional to length. Tight is not a style preference; it's a runtime cost.",
        "Implication for layout: ordering matters more than people think. Claude's attention to the prompt isn't uniform — the first ~200 tokens of the system prompt have outsized influence on tone, style, and which constraints get internalized. The bottom of a 4,000-token skill is the place where the lowest-priority content goes; it might not survive a long conversation as cleanly as the top.",
      ],
    },
    {
      heading: "Token budget — the numbers I'd recommend",
      paragraphs: [
        "Tight skills run 600-1,500 tokens. They cover constraint, three to five patterns, two or three examples, and a 'when to stop' rule. They work great in a long conversation because they don't burn context.",
        "Standard skills run 1,500-2,500 tokens. They add a memory.md companion for project-specific context. This is the sweet spot for most production codebases — enough room to encode the stack-specific patterns, not so much that you're losing context budget.",
        "Heavy skills run 2,500-4,000 tokens. They include voice presets, multi-environment guidance, or detailed example libraries. They work but they cost. Reach for this size only when the kit is doing real work — e.g. covering a whole platform like Stripe Connect or Supabase RLS where the surface area is genuinely large.",
        "Above 4,000 tokens, you're probably overdoing it. The signal-to-noise starts dropping; Claude attention to any specific bullet weakens. If your draft is hitting 5,000+, the right move is to split it — promote the most-specific 30% into a memory.md and let the SKILL.md stay focused.",
      ],
    },
    {
      heading: "Anatomy of a working SKILL.md",
      paragraphs: [
        "After 100+ kits in production, this layout consistently outperforms the canonical example for real codebases. The order matters; do not rearrange casually.",
        "Block 1 — Identifier (one line, 30-80 tokens). The name of the skill, what it covers, and the AI tools it targets. Claude uses this to disambiguate against any other context in the prompt.",
        "Block 2 — Purpose (50-150 tokens). Why this skill exists. Single short paragraph. The goal is to anchor the model in the right register before any specifics land.",
        "Block 3 — Constraints (150-400 tokens, bulleted). The 'never do this' list. Sharp, specific, testable. This is the highest-leverage block in the whole file. Examples that work: 'Never import a library not already in package.json without asking first', 'Always use the Supabase service role key on the server, anon key on the client — never the reverse', 'Never write a test in `before` / `after` style; always use `arrange / act / assert`.'",
        "Block 4 — Patterns (400-1,000 tokens, bulleted, with one short code example per bullet). The 'do it like this' list. Three to seven concrete patterns with a one-sentence rationale and a code sample. The examples are not optional. A pattern without an example is a wish.",
        "Block 5 — When-to-stop (100-200 tokens, bulleted). The cases where the model should ask before proceeding. Examples: schema migration, destructive operation, anything touching auth or RLS, anything that introduces a new dependency.",
        "Block 6 — Voice (optional, 100-300 tokens). Tone calibration if the skill produces customer-facing text. Two example phrasings — one to imitate, one to avoid.",
      ],
    },
    {
      heading: "The Constraints block — where most authors quit too soon",
      paragraphs: [
        "Most SKILL.md authors stop at three constraints because more feels nitpicky. Resist that impulse. The constraints are doing the heaviest lifting in the file; under-investing here is the most common authoring mistake.",
        "Good constraints are specific, testable, and tied to a known failure mode. 'Write secure code' is a wish. 'Never use `dangerouslySetInnerHTML` without explicit sanitization comment' is a constraint Claude can follow. 'Use the right framework' is a wish. 'Default to Next.js App Router; mark Pages-Router files explicitly in the constraint comment if used' is a constraint.",
        "The discipline: every constraint should correspond to at least one mistake Claude has made on your codebase in the last month. If you can't name the failure mode, the constraint is probably not earning its tokens.",
      ],
    },
    {
      heading: "The Patterns block — code examples are not optional",
      paragraphs: [
        "Patterns without code examples reliably underperform patterns with code examples. The reason is mechanical: Claude is a model that interpolates on examples in context. If you give it a three-line code snippet for how you want error handling done, the model will match that style. If you give it a three-sentence English description of the same idea, the model will sometimes match and sometimes drift.",
        "Code examples should be minimal — three to ten lines — and should show the canonical case, not the edge case. Anti-pattern: a 30-line example that demonstrates ten things at once. Pro tip: every code example should have a one-line comment above it explaining the rationale, not just what it does.",
        "If a pattern doesn't have an obvious code snippet, it's probably a constraint in disguise. Move it up to the Constraints block and word it as a 'never do X' rule instead.",
      ],
    },
    {
      heading: "Supporting files — memory.md, voice presets, quick starts",
      paragraphs: [
        "A SKILL.md works best as one of three or four files in a kit. The companion files take specific load off the main skill so it can stay tight.",
        "memory.md handles project-specific context — names, URLs, customer references, decision logs. It's free-form, lower-stakes, edited often. Claude reads it on load just like the skill. Putting your team's brand-voice example sentences in here keeps the SKILL.md generic enough to share across projects.",
        "Voice presets are short markdown files that override the tone of the main skill for specific moods — 'founder voice', 'AE voice', 'BDR voice' for a sales kit; 'apologetic voice', 'matter-of-fact voice' for a support kit. They get pasted on demand rather than loaded on startup.",
        "Quick-start prompts are the first-message templates a user can copy-paste to get the kit doing work in 30 seconds. Three to five per kit, each tuned to a different use case. They're the bridge between 'I dropped the file in' and 'I'm getting value out of this'.",
      ],
    },
    {
      heading: "Version control — kits as a first-class repo asset",
      paragraphs: [
        "If your team is shipping non-trivial code, treat the SKILL.md as a checked-in artifact. Put it in the repo, give it a CHANGELOG, version it. The same way you'd evolve a CONTRIBUTING.md, evolve the SKILL.md.",
        "The pattern that scales: each material change to the skill ships in a small PR with a one-paragraph rationale. 'Added a constraint against Pages-Router because we shipped one accidentally last week.' 'Reworded the RLS pattern to use the new pattern from our security audit.' The commit history becomes a small playbook of your team's evolving conventions.",
        "Pro+ subscribers and Lumenari kit buyers get updates pushed automatically when the canonical kit ships a refresh. The same idea applies to your in-house kits: when the skill changes meaningfully, post it in your team channel so people pull the latest copy.",
      ],
    },
    {
      heading: "Failure modes I've seen across 100+ kits",
      paragraphs: [
        "Failure mode 1 — the marketing-copy skill. Author writes the skill the way they'd write a landing page: aspirational, full of adjectives, no constraints. The model trained on it produces marketing copy. Cure: rip out every adjective and replace with a constraint.",
        "Failure mode 2 — the dump-everything skill. Author tries to encode every detail of the stack. The skill balloons to 6,000 tokens. Claude's attention fragments; quality drops. Cure: split into a tight SKILL.md and a richer memory.md.",
        "Failure mode 3 — the silently-stale skill. Skill was authored in 2024, the stack has moved, nobody updated the file. Claude is now actively wrong about some of the patterns. Cure: review the skill every quarter, treat it as a living artifact.",
        "Failure mode 4 — the conflicting-instructions skill. Constraints block says 'never do X'; patterns block has an example doing X. Claude picks one, somewhat randomly. Cure: audit the patterns against the constraints before shipping.",
        "Failure mode 5 — the unloaded skill. Author wrote a great file, dropped it in the wrong directory, Claude never sees it. Cure: test that the skill is actually in context. Ask Claude 'what conventions are you working under?' and verify the answer matches the skill.",
      ],
    },
    {
      heading: "Cross-AI portability — what changes for ChatGPT, Cursor, Gemini",
      paragraphs: [
        "The same SKILL.md content works in every model, but the delivery format changes. Claude Code reads the file directly. Cursor pairs the SKILL.md with .cursorrules. ChatGPT doesn't read project files in the same way — the content goes in as a system message via a Custom GPT or in the first user message.",
        "When authoring for portability, write the SKILL.md as the canonical source, then derive the ChatGPT optimization pack from it. The pack is the same constraints + patterns reformatted into a single block you can paste. Every Lumenari kit does this conversion in-house and ships both formats.",
        "Gemini and open-source models (Llama, Qwen, etc.) follow the Claude convention. The same SKILL.md works as a system-prompt augmentation. The platform-specific gotchas are mostly about context window size — older models with 8k context will choke on a 4,000-token skill, so you might need a tight variant for those targets.",
      ],
    },
    {
      heading: "Authoring your first kit — a one-hour drill",
      paragraphs: [
        "Set aside an hour. Pick the stack or role you do most often. Open a fresh markdown file. Spend the first 15 minutes on the Constraints block — list every mistake Claude has made on your codebase in the last month. That's your constraint list.",
        "Spend the next 25 minutes on the Patterns block — three to seven patterns with one code example each. Skip the philosophy; show the canonical case.",
        "Spend 10 minutes on the Identifier, Purpose, and When-to-stop blocks. They should be quick — they're plumbing, not value.",
        "Spend the last 10 minutes testing. Open a fresh Claude project, drop in the SKILL.md, and run two practice tasks. If the model follows the constraints without prompting, ship the skill. If not, identify which constraint isn't sticking and sharpen it.",
        "If you'd rather start with a tested kit instead of authoring blind, the Lumenari catalog has 21 dev-specific kits — Next.js + Supabase production, Supabase RLS, Stripe Connect, Python data, iOS SwiftUI, Go backend, Node backend, Rails, GraphQL design, Security engineer, Postgres DBA, and more — each one a tested SKILL.md plus the supporting files. Pro+ unlocks the whole catalog for $39 USD/mo.",
      ],
    },
  ],
  outro: [
    "The SKILL.md format is simple on the surface and surprisingly deep underneath. The shape that consistently works in production is tight, layered, example-rich, and version-controlled. Get the constraints block right and 80% of the value lands; get the patterns block right and your AI starts to feel like a teammate instead of an autocomplete.",
    "If you want a starting point that's already been through the failure modes, browse the kit shelf at /kits or pick up Pro+ for the whole catalog. If you'd rather author your own, the one-hour drill above gets you to a working v1.",
  ],
};

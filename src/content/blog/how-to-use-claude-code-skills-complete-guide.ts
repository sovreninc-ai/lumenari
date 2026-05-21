import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "how-to-use-claude-code-skills-complete-guide",
  title:
    "How to use Claude Code skills — the complete 2026 guide for builders",
  description:
    "End-to-end guide to Claude Code skills in 2026: what a SKILL.md actually is, how Claude loads it, the file layout that works, and the patterns that turn Claude into a senior teammate.",
  author: "Chris Holwell",
  publishedAt: "2026-05-15",
  tags: [
    "claude code",
    "skill.md",
    "ai",
    "developers",
    "guide",
    "2026",
  ],
  primaryKitSlug: "ts-next-production",
  intro: [
    "Claude Code skills are the single biggest leverage point in AI-assisted development in 2026, and most builders are using them at maybe 20% of their potential. The format is deceptively simple — a markdown file with a frontmatter block and some headings — but the patterns that make a skill actually change Claude's behavior are not obvious from the spec alone.",
    "This is the complete guide. What a skill is, what Claude actually does with one, how to write one that works on day one, and the patterns I see across 100+ kits in production. By the end you'll be able to author a SKILL.md for your stack in under an hour and feel the difference inside two prompts.",
  ],
  body: [
    {
      heading: "What a Claude Code skill actually is",
      paragraphs: [
        "A skill is a plain markdown file — SKILL.md — that lives in your project or your Claude Code config directory. Claude reads it once when the project loads, treats it as a long-running set of instructions, and biases every response toward whatever it says. There's no compile step, no plugin manifest, no installer. The file is the configuration.",
        "Think of it as a senior teammate's onboarding document, written for an AI that's never worked on your stack before. The same patterns that work for human onboarding work here: explicit constraints over vague philosophy, examples over prescriptions, a single source of truth for the team's idioms and a clear list of things to never do.",
        "The format itself is unstructured by design. Anthropic publishes reference skills on GitHub showing the canonical shape — a one-line description, a Purpose section, Capabilities, Constraints, and Examples — but Claude doesn't enforce a schema. The discipline is on you.",
      ],
    },
    {
      heading: "How Claude loads a SKILL.md (the part the docs gloss over)",
      paragraphs: [
        "When you open a project in Claude Code, the SKILL.md is loaded into the system context window before your first message. It's not a tool that gets called on demand; it's part of every prompt for the entire session. That's why writing one is closer to writing a system prompt than writing documentation.",
        "Practical implication: every word costs context. A 5,000-token SKILL.md eats 5,000 tokens of your conversation budget on every single turn. The temptation to write a comprehensive playbook is real and you should resist it. The skills that work in production are 800-2,000 tokens, tightly written, and ruthlessly edited.",
        "Second implication: Claude reads the file linearly. The first 200 tokens have a disproportionate effect on tone and on which guidelines the model actually internalizes. Put the most important constraints at the top — the 'never do this' list before the 'here's how we like to do that' list.",
      ],
    },
    {
      heading: "The file layout that consistently works",
      paragraphs: [
        "After authoring and reviewing 100+ kits, a layout has emerged that performs better than the canonical example for production codebases. The shape: a one-line description, a Purpose paragraph, a Stack block, a Constraints block (the negative space — what never to do), a Patterns block (the positive space — what to reach for), and an Examples block at the end.",
        "The Constraints block is the secret. It's what most authors leave out because it feels negative. But Claude's failure modes in real codebases are predictable — generating code that doesn't use your ORM, suggesting libraries you've explicitly banned, ignoring your error-handling conventions — and a five-bullet 'never do this' list at the top of the skill prevents 80% of them.",
        "The Patterns block is where the value is for daily use. Three to seven concrete patterns, each with a one-sentence rationale and a code example. Not five-paragraph essays — just enough that Claude has a reference point and stops improvising. The patterns that show up in every working dev skill: an error-handling pattern, a database-access pattern, a 'when to add a test' rule, a logging pattern, and a 'when to stop and ask' rule.",
      ],
    },
    {
      heading: "Stack-specific tactics that pay off",
      paragraphs: [
        "Different stacks have different failure modes. For Next.js + Supabase work, the highest-leverage thing a SKILL.md does is encode the RLS conventions — Claude will happily write a query that bypasses RLS unless you tell it not to, and it will quietly use the service role key where the anon key was the right call. The Lumenari Next.js + Supabase production kit covers this in three bullets and saves hours of debugging per project.",
        "For Python data work, the failure mode is library churn — Claude reaches for pandas idioms from 2022 that no longer match what your team actually uses. A skill that pins your pandas, polars, or DuckDB conventions and shows two canonical examples eliminates the drift. The Lumenari Python data kit ships with the common ones already encoded.",
        "For iOS / SwiftUI work, the failure mode is SwiftUI-vs-UIKit conflation — Claude defaults to one or the other based on whichever was more represented in its training data for that quarter. A two-line constraint ('default to SwiftUI; UIKit only when noted') saves you from explaining the same thing every project.",
      ],
    },
    {
      heading: "Memory.md and the supporting files",
      paragraphs: [
        "A SKILL.md works best when paired with a memory.md — a short, free-form file that captures the project's tribal knowledge. Names, conventions, decisions, the URL of your staging environment, the slug of the kit you used to bootstrap. Claude reads it, just like the skill, and it raises the floor on every response.",
        "The pattern that scales: skill is for things that apply to every project in this stack, memory.md is for things that apply only to this project. Don't put your customer's name in the SKILL.md — that's a memory.md thing. Don't put your TypeScript conventions in memory.md — that's a SKILL.md thing.",
        "Every Lumenari dev kit ships with a memory.md template alongside the SKILL.md for this reason. Drop both into a new project and Claude is calibrated to your stack and your project on day one.",
      ],
    },
    {
      heading: "How to test that a skill is actually working",
      paragraphs: [
        "The single best test: open a new conversation in your project, paste a deliberately ambiguous request (something like 'add a new endpoint'), and see what Claude generates. If the code uses your conventions — your ORM, your error pattern, your logging style — without any further prompting, the skill is working. If you have to nudge it, the skill is too quiet on whatever you had to nudge about.",
        "Second test: ask Claude to do something the skill says never to do. If the skill is loaded and the constraint is clear, Claude will refuse and reference the constraint. If Claude does the forbidden thing, either the skill isn't being loaded (check the file location) or the constraint isn't worded sharply enough.",
        "Third test: a 'cold context' test. Close the conversation, start a fresh one, and ask the same first question again. If Claude's first response is materially different from a baseline (no-skill) conversation, the skill is doing its job.",
      ],
    },
    {
      heading: "Common mistakes I see in skill files",
      paragraphs: [
        "Mistake one: the skill is too long. A 6,000-token skill is a 6,000-token problem. Trim it. Anything over 2,500 tokens is suspect; anything over 4,000 tokens is almost certainly doing more harm than good.",
        "Mistake two: the skill is vague. 'Write clean code' is not a constraint. 'Never import a library not already in package.json without asking first' is a constraint. Be specific or be quiet.",
        "Mistake three: the skill is preachy. Claude doesn't need motivation; it needs information. Skip the 'we believe in quality' paragraphs and get to the patterns.",
        "Mistake four: no examples. A pattern without an example is a wish. Always include the canonical code snippet — even just three lines — to anchor the model.",
        "Mistake five: putting business context in the skill instead of memory.md. Your customer's name, your project's URLs, your team's preferences for this specific repo — all of that goes in memory.md, not SKILL.md. Otherwise the skill drifts and gets stale every time the business context changes.",
      ],
    },
    {
      heading: "Should you author your own or use a curated kit?",
      paragraphs: [
        "If you've got a strong opinion on your stack and an hour of evening time, author your own. The exercise of writing the constraints clarifies what your team actually believes, and a hand-rolled skill is always going to outperform a generic one in the specific corners of your codebase.",
        "If you'd rather start with something that already works, the Lumenari kit catalog has 21 dev-specific kits — Next.js + Supabase production, Stripe Connect, Supabase RLS, iOS SwiftUI, Python data, Go backend, Rails backend, Node backend, Postgres DBA, GraphQL design, REST API design, Security engineer, and more. Each one is a tested SKILL.md plus the supporting files. The Developer Mega Stack bundles the lot for $199 USD (saves $181 vs buying individually).",
        "Honestly, the right move for most builders is a hybrid: buy the kit for your stack as a starting point, then edit it down to fit your team's conventions. The constraint block almost never needs touching; the patterns block always does. Five minutes of editing buys you a skill calibrated to your team in less time than authoring one from scratch.",
      ],
    },
    {
      heading: "Beyond Claude — the same skill in ChatGPT, Cursor, Gemini",
      paragraphs: [
        "A well-authored SKILL.md is portable. Every Lumenari kit ships in four formats: SKILL.md for Claude and Cursor, an optimization pack you paste into ChatGPT, a Custom GPT instructions file for the OpenAI store, and a per-platform quick start. The same patterns work in every model; the delivery format is what changes.",
        "Cursor reads SKILL.md natively when paired with a per-repo .cursorrules file. ChatGPT doesn't — you paste the optimization pack as a system message instead. Gemini and the open-source models follow the Claude convention. The kit format does the format-conversion work for you.",
        "If your team is multi-AI (one dev on Claude Code, another on Cursor, a PM on ChatGPT), the kit is the cheapest way to keep everyone's outputs consistent. Same content, four delivery formats, one source of truth.",
      ],
    },
    {
      heading: "What changes in late 2026",
      paragraphs: [
        "Anthropic has signaled that skills will get a richer manifest format — declared capabilities, declared file paths, declared tool dependencies. The current free-form markdown will keep working; the new format will add structure for cases where Claude Code needs to know more about what a skill expects.",
        "What won't change: the discipline of writing tight, specific, example-rich instructions for an AI that's never worked on your stack before. The format will evolve; the craft of writing a good one is the same.",
        "If you're authoring skills today, you're not authoring for an artifact that's about to be obsolete — you're authoring for the underlying capability, which is going to keep getting better. Every hour you spend dialing in a SKILL.md is leverage you'll keep.",
      ],
    },
  ],
  outro: [
    "Skills are the highest-leverage thing you can ship into your AI tooling in 2026. The format is simple, the craft is harder, and the gap between a working skill and a bad one is the difference between a senior teammate and a confused intern. Whether you author your own or grab a Lumenari kit as a starting point, the move is the same: get a SKILL.md in place this week, test it, edit it, and watch your AI start to do the job instead of just demoing it.",
    "The Lumenari dev kit shelf is at /kits — 21 dev-specific kits, every one with a tested SKILL.md, memory.md template, and the four-format delivery. Pro+ unlocks the whole catalog plus future kits for $39 USD/mo if you'd reach for two or three a year anyway.",
  ],
};

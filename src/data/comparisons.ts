/**
 * Comparison page data — `/[locale]/vs/[competitor]`.
 *
 * Honest, factual, no FUD. Each entry powers one comparison page with a
 * side-by-side feature table, pros/cons, and Lumenari's unique advantages.
 */

export interface ComparisonRow {
  /** Feature label rendered in the first column. */
  feature: string;
  /** What Lumenari offers. */
  lumenari: string;
  /** What the competitor offers. */
  competitor: string;
}

export interface Competitor {
  slug: string;
  name: string;
  /** ~155-char meta description. */
  description: string;
  /** Short intro paragraph for the page (after the H1). */
  positioning: string;
  /** Lumenari advantages — three to five sentences. */
  lumenariAdvantages: string[];
  /** Competitor's honest strengths — keep fair, no FUD. */
  competitorStrengths: string[];
  /** Feature comparison table. */
  rows: ComparisonRow[];
  /** 3–5 FAQ entries for FAQPage schema. */
  faqs: Array<{ q: string; a: string }>;
}

export const COMPETITORS: Competitor[] = [
  {
    slug: "skillsmp",
    name: "SkillsMP",
    description:
      "Lumenari vs SkillsMP — how the two Claude skill marketplaces compare on curation, multi-AI support, recommendations, and price.",
    positioning:
      "SkillsMP is an open marketplace where anyone can list a Claude skill. Lumenari is a curated catalog where every kit is built or vetted in-house. Both make Claude better; they're aimed at different buyers.",
    lumenariAdvantages: [
      "Every kit is curated and tested in-house — no quality variance between authors.",
      "Multi-AI delivery: every kit ships in four formats (SKILL.md, ChatGPT optimization pack, Custom GPT instructions, per-platform quick start). Most SkillsMP listings are Claude-only.",
      "AI-driven recommendation wizard built into the storefront — describe your use case in plain English, get the right kit.",
      "Bundles that save 30-50% when you buy a stack of related kits.",
      "Pro+ subscription unlocks every current and future kit — useful if you'd buy 4+ kits anyway.",
    ],
    competitorStrengths: [
      "Larger long-tail catalog from many independent authors.",
      "Skills you won't find on Lumenari yet — Lumenari's catalog is still scaling to 100 kits.",
      "Direct-from-author model means you can sometimes reach the creator for support questions.",
    ],
    rows: [
      { feature: "Curation model", lumenari: "Curated in-house", competitor: "Open marketplace" },
      { feature: "Quality consistency", lumenari: "All kits hit the same bar", competitor: "Varies by author" },
      { feature: "Multi-AI support", lumenari: "4 formats per kit", competitor: "Mostly Claude-only" },
      { feature: "Recommendation wizard", lumenari: "Built-in AI wizard", competitor: "Browse / search only" },
      { feature: "Bundles", lumenari: "6 bundles, save 30-50%", competitor: "Single-kit purchases" },
      { feature: "Subscription option", lumenari: "Pro+ all-access", competitor: "Per-kit only" },
      { feature: "Catalog size", lumenari: "20+ and scaling to 100", competitor: "Larger long-tail" },
      { feature: "Price range", lumenari: "$14–$29 USD", competitor: "Varies widely" },
    ],
    faqs: [
      {
        q: "Why would I pick Lumenari over SkillsMP?",
        a: "If you want curation and consistency — every kit tested, every kit in four formats, with a recommendation wizard that picks the right one for you. SkillsMP wins on long-tail catalog size.",
      },
      {
        q: "Does Lumenari work with ChatGPT, Cursor, Gemini?",
        a: "Yes. Every kit ships in four formats: SKILL.md for Claude/Cursor, an optimization pack for any chat AI, Custom GPT instructions for ChatGPT, and a per-platform quick start.",
      },
      {
        q: "Can I switch from SkillsMP to Lumenari?",
        a: "Absolutely — they're complementary. Use SkillsMP for niche long-tail needs, Lumenari for the core stack you reach for every day.",
      },
    ],
  },
  {
    slug: "agensi",
    name: "Agensi",
    description:
      "Lumenari vs Agensi — comparing two curated AI skill marketplaces on pricing, multi-AI support, and curation model.",
    positioning:
      "Agensi and Lumenari both ship curated kits for AI tools. Lumenari leans toward multi-AI portability (every kit in four formats) and bundles; Agensi has its own focus areas.",
    lumenariAdvantages: [
      "Four-format delivery per kit (Claude, ChatGPT, Custom GPT, per-platform quick start) — easier portability across the AI stack.",
      "Bundle discounts (30-50% off when buying stacks of related kits).",
      "Pro+ subscription for buyers who'd otherwise grab 4+ kits.",
      "Embeddable API — embed the recommendation engine into your own product.",
      "Multi-locale storefront across 6 languages.",
    ],
    competitorStrengths: [
      "Different catalog mix — some kits available on Agensi may not be on Lumenari yet.",
      "Established brand recognition in their core verticals.",
    ],
    rows: [
      { feature: "Multi-AI format support", lumenari: "4 formats per kit", competitor: "Varies" },
      { feature: "Bundle discounts", lumenari: "Yes — 6 bundles", competitor: "Limited" },
      { feature: "Subscription tier", lumenari: "Pro+ all-access", competitor: "Limited" },
      { feature: "Embeddable API", lumenari: "Yes — Free/Pro/Business", competitor: "Limited" },
      { feature: "Multi-locale storefront", lumenari: "6 languages", competitor: "Primarily English" },
      { feature: "Price range", lumenari: "$14–$29 USD", competitor: "Varies" },
    ],
    faqs: [
      {
        q: "Why pick Lumenari over Agensi?",
        a: "Pick Lumenari if you want multi-AI portability, bundles, an all-access subscription, and an API you can embed in your own product.",
      },
      {
        q: "Are the kits portable across AI tools?",
        a: "Yes. Every Lumenari kit ships with a SKILL.md (for Claude/Cursor), an optimization pack (for any chat AI), Custom GPT instructions (for ChatGPT), and a per-platform quick start.",
      },
    ],
  },
  {
    slug: "chatgpt-store",
    name: "ChatGPT Store",
    description:
      "Lumenari vs the ChatGPT Store — curated kits in 4 formats vs free GPTs locked to one platform. Honest comparison.",
    positioning:
      "The ChatGPT Store has thousands of free GPTs. Lumenari sells paid, curated kits in four formats. The two answer different questions: 'is there a GPT for this?' vs 'is there a high-quality, portable, tested workflow for this?'",
    lumenariAdvantages: [
      "Curated quality — every kit is built or tested in-house, not crowdsourced.",
      "Four-format delivery: works on Claude, Cursor, Gemini, any chat AI — not just ChatGPT.",
      "You own the files. Drop them anywhere, edit them, use them offline. ChatGPT Store GPTs run only inside ChatGPT.",
      "No GPT-4 / GPT-5 / Plus tier required — the optimization packs work on free tiers across every AI tool.",
      "Lifetime access to a kit + every update we ship.",
    ],
    competitorStrengths: [
      "Free for most use cases.",
      "Massive long-tail catalog.",
      "Native ChatGPT integration — no copy-paste step.",
      "Native function calling and code interpreter access.",
    ],
    rows: [
      { feature: "Price", lumenari: "$14–$29 USD per kit (or Pro+ subscription)", competitor: "Mostly free with ChatGPT Plus" },
      { feature: "AI tool support", lumenari: "Claude, ChatGPT, Cursor, Gemini, any", competitor: "ChatGPT only" },
      { feature: "Quality control", lumenari: "Every kit curated in-house", competitor: "Anyone can publish" },
      { feature: "Offline / portable", lumenari: "You own the files", competitor: "Lives inside ChatGPT" },
      { feature: "Tier required", lumenari: "Free tier of any AI works", competitor: "ChatGPT Plus to use most" },
      { feature: "Function calling", lumenari: "No (prompt content)", competitor: "Yes (native to ChatGPT)" },
    ],
    faqs: [
      {
        q: "Why pay for Lumenari if ChatGPT GPTs are free?",
        a: "Curation, quality, and portability. The ChatGPT Store is huge and free, but quality varies wildly, and you're locked into ChatGPT. Lumenari's kits are curated, tested, and work on every major AI tool.",
      },
      {
        q: "Can I use Lumenari kits with ChatGPT?",
        a: "Yes — every kit includes Custom GPT instructions you can paste directly into 'Create a GPT' inside ChatGPT.",
      },
      {
        q: "What about code interpreter or function calling?",
        a: "Lumenari kits are prompt content — they make the AI smarter at a task. They don't add new capabilities like function calling. For workflows that need those, the ChatGPT Store has a clear advantage.",
      },
    ],
  },
  {
    slug: "github-skills",
    name: "GitHub-hosted Claude skills",
    description:
      "Lumenari vs GitHub-hosted Claude skills — paying for curation + multi-AI delivery vs free open-source skills.",
    positioning:
      "There are hundreds of free Claude skills on GitHub. Lumenari sells curated, multi-AI kits. The decision: how much is your time worth, and how comfortable are you with quality variance?",
    lumenariAdvantages: [
      "Every kit is curated and tested in-house — no hunting through README files looking for the one that actually works.",
      "Four-format delivery — not just SKILL.md, but ChatGPT, Custom GPT, and per-platform quick starts.",
      "AI recommendation wizard — describe your use case, get the right kit.",
      "Bundles, Pro+ subscription, and an embeddable API.",
      "Maintenance — when a kit gets updated, you get the update.",
    ],
    competitorStrengths: [
      "Free.",
      "Open source — fork, modify, contribute back.",
      "Huge variety, no curation gatekeeping.",
      "You can study the prompts and learn the patterns directly.",
    ],
    rows: [
      { feature: "Price", lumenari: "$14–$29 USD per kit", competitor: "Free" },
      { feature: "Curation", lumenari: "Every kit tested in-house", competitor: "Unmoderated" },
      { feature: "Updates", lumenari: "Maintained — you get updates", competitor: "Repo-dependent" },
      { feature: "Multi-AI delivery", lumenari: "4 formats per kit", competitor: "Mostly SKILL.md only" },
      { feature: "Recommendation wizard", lumenari: "Yes", competitor: "Manual search" },
      { feature: "License clarity", lumenari: "Clear commercial license", competitor: "Per-repo, varies" },
    ],
    faqs: [
      {
        q: "Why pay if free skills exist on GitHub?",
        a: "Time and quality. If you've got an hour to evaluate three open-source skills and pick the best one, GitHub is free and great. If you'd rather pay $14 and have a tested kit in four formats with updates, Lumenari is the buy.",
      },
      {
        q: "Are GitHub skills always lower quality?",
        a: "No — some are excellent. The variance is the issue. Lumenari's promise is that every kit is at or above the bar of the best open-source skills.",
      },
      {
        q: "Can I see what's inside a kit before buying?",
        a: "Yes — every kit page lists the deliverables and a 'what's inside' summary. No surprises.",
      },
    ],
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    description:
      "Lumenari vs Notion AI — when a built-in AI assistant in your wiki is enough, and when curated multi-AI kits do more for your money.",
    positioning:
      "Notion AI is the assistant built into your Notion workspace — it summarizes, drafts, and answers questions about your pages. Lumenari is a set of curated prompt + skill kits you drop into Claude, ChatGPT, Cursor, Gemini, or any chat AI. The two solve different problems: Notion AI lives where your team's writing already lives; Lumenari follows you across whichever AI you actually do the work in. Notion AI is a workspace feature; Lumenari is a portable behavioral upgrade. Most teams end up using both, not picking one — the question is what each one is doing in your day.",
    lumenariAdvantages: [
      "Works in every major AI tool — not just inside Notion. Drop the same kit into Claude for long-form work, ChatGPT for high-volume outreach, Cursor for code, Gemini for research, and the behavior is consistent across all of them.",
      "Curated, role-specific kits (recruiter, real-estate, SDR, founder, dev) instead of a general-purpose assistant. Notion AI gives the same brain to a salesperson and a software engineer; Lumenari gives each of them a brain tuned for their actual job.",
      "You own the files. The SKILL.md, optimization pack, and Custom GPT instructions live on your disk. Notion AI lives inside Notion, gated by Notion's subscription and Notion's roadmap. Cancel Notion and you lose Notion AI; cancel a Lumenari subscription and you keep every kit you bought outright.",
      "No vendor lock-in. If you move off Notion (or your team moves off Notion before you do), your Lumenari kits move with you to whatever the next stack looks like. The investment compounds across tool migrations.",
      "Bundles and a Pro+ subscription that unlocks every kit — better unit economics if you'd buy a few kits a year. A solo agent buying real-estate + brand-voice + SEO-content covers the cost of Pro+ in a single purchase round.",
      "Embeddable recommendation wizard — if you run a tool that helps users pick AI workflows, you can wire Lumenari's recommender into your own product. Notion AI is a closed feature inside Notion's UI.",
      "Stack-specific depth — the dev kits cover real platform gotchas (Supabase RLS edge cases, Stripe webhook idempotency, Next.js App Router patterns) that a general-purpose workspace assistant would never internalize.",
    ],
    competitorStrengths: [
      "Already deployed wherever your team writes — no copy-paste, no second tab. The lowest-friction AI surface in any product that lives where the writing already happens.",
      "Native Q&A across an entire Notion workspace (your real docs, in context). Ask 'what did we decide about pricing last quarter' and it actually reads the docs, no manual paste.",
      "Page-level summaries, table autofill, action item extraction — all without a prompt. The 'one-click' features are genuinely useful for the kind of work that doesn't merit a full prompt session.",
      "Comes free or as a flat $10/mo add-on if you're already on Notion. The unit economics for an existing Notion shop are hard to beat for general-purpose assistance.",
      "Multi-user governance — admins can manage AI access at the workspace level, which matters for enterprises with compliance requirements around AI usage.",
    ],
    rows: [
      { feature: "Where it works", lumenari: "Claude, ChatGPT, Cursor, Gemini, any chat AI", competitor: "Inside Notion only" },
      { feature: "Specialization", lumenari: "100+ role-specific kits", competitor: "General-purpose assistant" },
      { feature: "Curated prompts", lumenari: "Yes — every kit tested in-house", competitor: "Built-in summarize/draft buttons" },
      { feature: "Workspace context", lumenari: "Whatever you paste in", competitor: "Reads your Notion pages directly" },
      { feature: "Portability", lumenari: "Files you own", competitor: "Tied to Notion subscription" },
      { feature: "Pricing", lumenari: "$14–$29 USD per kit or Pro+ $19/mo", competitor: "$10 USD/mo on top of Notion" },
      { feature: "Multi-AI portability", lumenari: "Same kit across every AI", competitor: "Notion AI only" },
      { feature: "Update cadence", lumenari: "Refresh pushed when models change", competitor: "Notion's roadmap" },
    ],
    faqs: [
      {
        q: "Can Lumenari replace Notion AI?",
        a: "Not as a Notion-page Q&A bot — Notion AI is built into the editor and reads your workspace directly, which Lumenari can't do without a copy-paste step. Lumenari replaces the moment after that, when you take a draft into Claude or ChatGPT to actually polish, personalize, or extend it into final-form work. They sit at different points in the same pipeline.",
      },
      {
        q: "Do they work together?",
        a: "Yes — this is the most common pattern we see. Draft and outline in Notion AI where your reference material lives, then run the Lumenari role-specific kit on the draft for tone, structure, or final copy. Two tools, one workflow. The Notion AI summary becomes the input to the Lumenari kit; the kit handles the parts where role-specific patterns matter and a general-purpose summarizer doesn't have the depth.",
      },
      {
        q: "What if I already pay for Notion AI?",
        a: "Keep it for in-workspace summaries and Q&A — that's where it's strongest. Add Lumenari kits for the parts of the job that happen outside Notion: outreach emails, listing copy, code work in Cursor, research briefs in Claude, neighborhood guides for SEO. The two tools don't overlap as much as they sound like they do once you start mapping them to specific tasks. Most teams end up using both daily.",
      },
      {
        q: "Is Notion AI good enough for sales or recruiting outreach?",
        a: "It can draft an email, but the result reads generic — the model wasn't tuned for that specific job. For one-off internal use it's fine; for a rep sending 50 personalized emails a day, the quality gap shows up in reply rates within a week. The Sales Outreach Pro or Recruiter Pro kits running in Claude or ChatGPT will out-convert Notion AI on the same task by a wide margin.",
      },
      {
        q: "What about cost — Notion AI is $10/mo, Pro+ is $19/mo?",
        a: "Compare like-for-like. Notion AI gets you a general-purpose assistant inside Notion only. Pro+ gets you 100+ role-specific kits that work across every AI tool you use, plus updates. If you'd otherwise pay for Notion AI and a tuned ChatGPT GPT and a Claude project setup, the math swings toward Pro+ quickly. If Notion AI is genuinely all you need, save the $9.",
      },
    ],
  },
  {
    slug: "jasper",
    name: "Jasper",
    description:
      "Lumenari vs Jasper — a marketing-content platform vs portable AI kits. When to pick each, written without FUD.",
    positioning:
      "Jasper is an end-to-end marketing-content platform: brand voice, campaign planner, templates, team review, the works. Lumenari is a catalog of curated kits you bring to whichever AI you already pay for. Jasper is the seat for a marketing team; Lumenari is a tool a marketer uses inside their existing AI stack. The two answer different questions — Jasper answers 'where does our marketing team work', Lumenari answers 'how do we get sharper outputs from the AIs we already pay for'. A marketing team running Jasper as the platform and Lumenari kits inside their AI stack isn't unusual; the two compose more than they compete.",
    lumenariAdvantages: [
      "Per-kit pricing instead of per-seat — buy what you actually need, no minimum, no eight-seat contract for a three-person team. A single agency owner can buy two kits and be set; a 20-person agency can buy bundles and Pro+ subscriptions for the team without per-seat scaling.",
      "Works inside the AI you already pay for (Claude, ChatGPT, etc.) — no second subscription stack to manage, no separate billing relationship, no extra vendor to audit for SOC 2.",
      "Curated kits cover roles beyond marketing — sales, recruiting, real estate, dev, ops, trades — at a single source. If your agency does fractional CMO work plus dev project management plus recruiting, Lumenari covers all three from one catalog.",
      "You own the files. Take them to a new AI, a new agency, a new client — no migration story, no export tool needed, no 'what happens to our content history' question if you ever leave.",
      "Bundles and Pro+ subscription cap the cost if you'd buy multiple kits. A Sales & Marketing bundle covers four marketing-adjacent kits at a single bundle price; Pro+ unlocks every kit current and future for less than a single Jasper seat.",
      "Multi-AI portability means agencies serving clients on different stacks don't have to re-buy seats per client. One kit, every client engagement, every AI the client prefers.",
      "Lighter-weight onboarding — drop a SKILL.md in Claude and you're producing within five minutes. No team training, no platform setup, no migrating templates over.",
    ],
    competitorStrengths: [
      "Full marketing-platform UX — brand voice management, campaign briefs, multi-step content workflows, team approvals. Everything a marketing team needs in one place, designed for the way marketing teams actually run campaigns.",
      "Templates and workflows tightly tuned for high-volume content marketing — Jasper's library covers the long tail of content formats (ad copy, blog outlines, video scripts, social variants) better than a general-purpose AI plus a kit.",
      "Browser extension and integrations with the rest of a marketing stack — Surfer SEO, Grammarly, Webflow, HubSpot, Salesforce. The integration depth is genuinely hard to replicate.",
      "On-platform team collaboration — comments, roles, review queues, approvals. The governance story for a 10+ person marketing org is materially better than 'we share kits via Dropbox'.",
      "Brand voice as a first-class workspace feature — train it once, every Jasper output respects it. Not just a kit you remember to load.",
      "Established enterprise procurement story — SOC 2, SSO, DPA templates, the things big-company buying committees ask for.",
    ],
    rows: [
      { feature: "Product shape", lumenari: "Portable kits + recommendation wizard", competitor: "Full marketing platform" },
      { feature: "AI tool support", lumenari: "Claude, ChatGPT, Cursor, Gemini, any", competitor: "Jasper-hosted models" },
      { feature: "Pricing model", lumenari: "Per kit / Pro+ $19 USD/mo", competitor: "Per seat, $39–$59 USD/mo and up" },
      { feature: "Brand-voice management", lumenari: "Brand-voice kit + per-kit voice presets", competitor: "First-class workspace feature" },
      { feature: "Team collaboration", lumenari: "Files you share like any doc", competitor: "Built-in review + roles" },
      { feature: "Specialization breadth", lumenari: "100+ role-specific kits", competitor: "Marketing + adjacent" },
      { feature: "Onboarding time", lumenari: "Minutes — drop a file in your AI", competitor: "Days — team training + setup" },
      { feature: "Best fit", lumenari: "Marketers inside their AI stack", competitor: "Full marketing teams" },
    ],
    faqs: [
      {
        q: "If I'm running a marketing team, should I just use Jasper?",
        a: "If you need team review queues, brand-voice governance, multi-step campaign workflows, and a platform of record for content — Jasper is built for that, and it's hard to recreate the full feature set with kits alone. If your team already lives in Claude or ChatGPT and you want sharper outputs from those, Lumenari is the cheaper, more portable buy. The honest cut: teams of 5+ marketers tend to need Jasper's governance; solo marketers and small agencies tend to be better served by kits in their existing AI.",
      },
      {
        q: "Do Lumenari kits cover marketing use cases?",
        a: "Yes — SEO content, cold outreach, newsletter writing, brand voice, real-estate copy, e-commerce product copy, blogger, LinkedIn creator, podcast scripting, and a Sales & Marketing bundle that covers the most common marketing-team stack. The kits are role-specific instead of step-specific, which means you get full workflows per role rather than templates per task. For a marketing manager doing five different jobs in a week, that's usually the better shape.",
      },
      {
        q: "What about brand voice consistency?",
        a: "Lumenari ships a dedicated /en/kits/brand-voice kit. Drop it into Claude or ChatGPT once and the model writes in your voice across every other kit. Not the same as Jasper's workspace-wide brand-voice governance (where the platform enforces it on every team member by default), but it solves 80% of the consistency problem for a fraction of the cost. For a small team or agency, it's usually enough.",
      },
      {
        q: "Can I use Jasper and Lumenari together?",
        a: "Yes, and that's not as silly as it sounds. Use Jasper as the platform of record for the marketing team — campaign planning, brand voice, approvals, publishing — and use Lumenari kits inside Claude or ChatGPT for the work that happens outside Jasper (developer documentation, sales outreach, recruiting, etc.). The two cover different surface areas.",
      },
      {
        q: "What's the pricing math at a small-team level?",
        a: "Three-person marketing team with Jasper: roughly $120-180 USD per month at minimum, scaling as you add seats. Same three people on Pro+ Lumenari: $57 USD per month total, with every kit unlocked for each person. The trade is platform features for portability and per-kit depth. If your team mostly produces content inside Claude or ChatGPT anyway, the math swings hard toward Lumenari.",
      },
    ],
  },
  {
    slug: "cursor-built-in",
    name: "Cursor's built-in prompts",
    description:
      "Lumenari vs Cursor's built-in prompts and rules — when adding a SKILL.md kit is worth it on top of the editor's defaults.",
    positioning:
      "Cursor ships with Composer, Cmd-K, and `.cursorrules` — strong defaults for general coding. Lumenari kits are layered on top: role-specific SKILL.md files for Next.js + Supabase, Stripe, RLS, iOS/SwiftUI, Python data work, Go backend, and more. Cursor's defaults make coding faster; Lumenari kits make the model right more often on a specific stack. The two compose well — they're not alternatives. Cursor's runtime (Composer, agent mode, inline edits) is the engine; the SKILL.md is the steering wheel that tells the engine which patterns to respect on your specific codebase.",
    lumenariAdvantages: [
      "Stack-specific defaults out of the box — Next.js + Supabase + RLS gotchas, Stripe webhook idempotency, SwiftUI vs UIKit decisions, Postgres query plan considerations — without authoring a `.cursorrules` from scratch over a weekend.",
      "Same kit works inside Claude Code, ChatGPT, and Cursor — no Cursor lock-in for the prompt content. If your team has some devs in Cursor and some in Claude Code, one kit covers everyone.",
      "Bundles cover end-to-end stacks (Developer Quartet, Developer Mega Stack) so you don't have to assemble rules per repo. A new Next.js + Supabase + Stripe project gets the right constraints in one drop-in rather than three.",
      "Updates included — when the kit gets a refresh (model upgrade, new framework version, fresh failure mode caught from production), you get it. Hand-authored .cursorrules files go stale silently.",
      "Curated, vetted prompts — no copy-pasting random Reddit configs of unknown provenance, no auditing a fork chain to figure out where a constraint came from.",
      "Companion files included — memory.md templates, voice presets, and quick-start prompts that most teams never get around to authoring themselves.",
      "Honest learning resource — open the SKILL.md, read the patterns, understand why they're there. Many customers buy two or three kits, internalize the patterns, then author their own for the rest.",
    ],
    competitorStrengths: [
      "Native to the editor — Composer, inline edits, agent mode are inside the IDE with no copy-paste needed. The lowest-friction surface for actually shipping code, full stop.",
      "Per-repo `.cursorrules` is free and ships with Cursor — every dev gets a rules file for $0 extra.",
      "No copy-paste workflow; rules apply automatically when the editor opens the repo. The DX is unbeatable for a single dev on a single project.",
      "Constantly improving as Cursor ships new model integrations and tool calling. Cursor's release velocity on the runtime is high; the editor gets sharper every quarter.",
      "Composer's multi-file edits, terminal integration, and ability to run tests in the loop are real value separate from prompt quality. The IDE-level integration is the moat.",
      "Active community sharing .cursorrules configs for popular stacks — the open library is small but the canonical examples are usually serviceable.",
    ],
    rows: [
      { feature: "Where it runs", lumenari: "Cursor, Claude Code, ChatGPT, any AI", competitor: "Cursor only" },
      { feature: "Stack specialization", lumenari: "Next.js, Supabase, Stripe, RLS, Python, Go, etc.", competitor: "General coding rules" },
      { feature: "Setup", lumenari: "Drop the SKILL.md into the project", competitor: "Author your own .cursorrules" },
      { feature: "Cost", lumenari: "$19 USD per dev kit or Pro+", competitor: "Included with Cursor" },
      { feature: "Multi-AI portability", lumenari: "Same kit across tools", competitor: "Cursor-only" },
      { feature: "Maintained", lumenari: "Updates pushed", competitor: "DIY" },
      { feature: "Companion files", lumenari: "memory.md, voice presets, quick starts", competitor: "Single rules file" },
      { feature: "Time to dialed-in", lumenari: "Minutes after drop-in", competitor: "Hours of authoring + testing" },
    ],
    faqs: [
      {
        q: "I already pay for Cursor — do I need Lumenari kits?",
        a: "Not strictly. If your `.cursorrules` is already dialed in for your stack and your team has the discipline to keep it current, you're set. If you'd rather not author the rules yourself, or you'd like the same patterns to work outside Cursor (in Claude Code, ChatGPT, or a teammate's Gemini setup), the dev kits — Next.js + Supabase, Supabase RLS, Stripe Connect, iOS SwiftUI, Python data, Go backend, Node backend, Rails — are the shortcut. Most devs who try them stop hand-authoring rules.",
      },
      {
        q: "Does a Lumenari SKILL.md replace .cursorrules?",
        a: "It augments it. Drop the SKILL.md into the repo alongside your existing rules; the kit covers stack-specific patterns and idioms the general rules typically miss. The two layer cleanly — your .cursorrules captures repo-level conventions (file structure, naming) and the SKILL.md captures stack-level patterns (RLS gotchas, Stripe idempotency). Together they make Cursor's outputs noticeably more right on the first try.",
      },
      {
        q: "What about Cursor's agent mode and Composer?",
        a: "Agent mode and Composer are Cursor's runtime — they work whether or not you use Lumenari. A SKILL.md improves the quality of what they generate by giving the model better context to start from. The agent reads the SKILL.md the same way it reads the rest of the project, and the constraints in the kit show up in agent outputs the same way they would in a chat session.",
      },
      {
        q: "Will the kit conflict with my existing .cursorrules?",
        a: "Almost never. The kits are written as additive context, not as replacements for repo-level conventions. If you do hit a conflict — say your rules say 'use Pages Router' and the Next.js kit defaults to 'App Router' — edit the SKILL.md to match your repo's stance. Every kit is open text you can modify.",
      },
      {
        q: "Is there a free way to try the format before paying?",
        a: "Yes. The Anthropic open-source skills repo on GitHub has canonical SKILL.md examples — read three or four of those to understand the format. If you decide you'd rather buy a tested kit for your specific stack than author one from scratch, Lumenari's dev catalog is the next step. Many engineers go through that exact path before purchasing.",
      },
    ],
  },
  {
    slug: "anthropic-skills-repo",
    name: "Anthropic's official skills repo",
    description:
      "Lumenari vs Anthropic's official skills GitHub repo — free reference skills vs curated, multi-AI kits with updates.",
    positioning:
      "Anthropic publishes an official open-source skills repo on GitHub — reference SKILL.md files showing the format and a handful of canonical examples. Lumenari is a paid catalog of role-specific kits built in the same format but for the long tail of jobs (recruiter, real-estate, SDR, founder, trades, healthcare-adjacent, etc.) and shipped in four formats so they work outside Claude too. The two aren't really competitors — Anthropic's repo is the canonical reference, and Lumenari is the production library that sits on top of it. Most experienced kit authors read Anthropic's examples first, then pick up Lumenari kits for the roles they don't want to author from scratch.",
    lumenariAdvantages: [
      "100+ role-specific kits vs a small set of canonical examples — Lumenari covers the long tail. Anthropic's repo demonstrates the format with a few examples; Lumenari ships production kits for the specific roles people actually do (sales outreach, real-estate, recruiting, founder ops, trades, etc.).",
      "Four-format delivery — every kit ships SKILL.md plus a ChatGPT optimization pack, Custom GPT instructions, and a per-platform quick start. Anthropic's repo is Claude-first by design; if you want the same patterns working in ChatGPT or Gemini, you'd have to translate them yourself.",
      "Maintained — when the kit ships an update (model upgrade, new failure mode caught, refined constraint), you pull it. The reference repo gets updates only when Anthropic publishes them, which is on Anthropic's cadence, not yours.",
      "AI recommendation wizard plus bundles — describe what you do in plain English and get pointed at the right kit. Browsing a GitHub repo to find the right skill is fine if you know what you're looking for; the wizard is the shortcut when you don't.",
      "Pro+ subscription for the all-you-can-eat case — useful if you'd otherwise buy four or more kits a year, especially for an agency or consultant working across roles.",
      "Tested in production — every Lumenari kit has been run through real workflows before shipping, with failure modes documented and constraints sharpened against real mistakes. The Anthropic examples are reference quality; the Lumenari kits are production quality.",
      "Companion files included — memory.md templates, voice presets, quick-start prompts. Anthropic's examples demonstrate the SKILL.md format; Lumenari ships the supporting infrastructure around it.",
    ],
    competitorStrengths: [
      "Free. Fully open source, no payment required, no licensing complexity.",
      "Authored by Anthropic — the canonical reference for the SKILL.md format. The patterns demonstrated are the ones the model is most consistent at honoring.",
      "Open source — fork, learn the patterns, contribute back. The pull-request history is itself an education in how the format evolves.",
      "Great way to internalize the format before ever paying for a kit. Read two or three canonical examples and you understand 80% of the design decisions in any SKILL.md.",
      "Direct from the model maker — when Anthropic ships a new Claude model, the reference repo is usually updated to reflect any format adjustments first.",
      "Active GitHub community around the repo — discussions, issues, and forks reveal real patterns of how the format is being adopted in practice.",
    ],
    rows: [
      { feature: "Price", lumenari: "$14–$29 USD per kit or Pro+ $19/mo", competitor: "Free" },
      { feature: "Catalog scope", lumenari: "100+ role + stack kits", competitor: "Reference / canonical examples" },
      { feature: "Multi-AI delivery", lumenari: "Claude, ChatGPT, Cursor, Gemini, any", competitor: "Claude-first" },
      { feature: "Updates", lumenari: "Maintained — pull included", competitor: "Anthropic's release cadence" },
      { feature: "Recommendation wizard", lumenari: "AI-driven", competitor: "Browse the repo" },
      { feature: "License clarity", lumenari: "Commercial license documented", competitor: "Per-repo license" },
      { feature: "Companion files", lumenari: "memory.md, voice presets, quick starts", competitor: "SKILL.md only typically" },
      { feature: "Best for", lumenari: "Production use across many roles", competitor: "Learning the format" },
    ],
    faqs: [
      {
        q: "If Anthropic's skills are free, why pay for Lumenari?",
        a: "Coverage and portability. The Anthropic repo is canonical but small — it's a teaching tool. Lumenari fills out the long tail (real-estate, recruiter, trades, SDR, founder, healthcare-adjacent, etc.) and ships every kit in four formats so it works outside Claude. If your role happens to match an example in Anthropic's repo, save the money. If your role is one of the 95+ Lumenari covers and Anthropic doesn't, the math works out fast.",
      },
      {
        q: "Are Lumenari kits compatible with the Anthropic SKILL.md format?",
        a: "Yes — Lumenari uses the same SKILL.md format Anthropic documents. The kits are drop-in for Claude Code or the Claude desktop app, and the structural patterns (Identifier, Purpose, Constraints, Patterns, When-to-stop, Voice blocks) match the format Anthropic recommends. Lumenari kits stay in lockstep with format updates Anthropic ships.",
      },
      {
        q: "Should I start with the Anthropic repo?",
        a: "Yes — this is the answer I give every time. Read two or three canonical examples, internalize the format, then decide whether to author your own per role or buy a curated kit for the roles you actually work in. Anthropic's repo is the right way to learn the format; Lumenari is the right way to skip the authoring time for the roles where the value of your time exceeds $14.",
      },
      {
        q: "What's the difference between a canonical example and a production kit?",
        a: "A canonical example demonstrates the format — it's clean, well-structured, and easy to read. A production kit has been pressure-tested against real failure modes in real workflows, has sharpened constraints earned from specific mistakes, and ships with the supporting files (memory.md, voice presets, quick starts) that the canonical example leaves out. Both are useful; they're solving different problems.",
      },
      {
        q: "Can I contribute back to Lumenari kits the way I would to Anthropic's repo?",
        a: "Not directly — Lumenari kits are commercial products, not open source. But the team takes customer feedback seriously, and many of the constraints in current kits started as a customer's bug report or improvement suggestion. The feedback loop is just less public than a GitHub repo's.",
      },
    ],
  },
  {
    slug: "reddit-prompt-libraries",
    name: "Reddit / community prompt libraries",
    description:
      "Lumenari vs Reddit and community prompt libraries — when sifting free prompts is worth it, and when a curated kit pays for itself.",
    positioning:
      "Reddit, Discord, Twitter, and GitHub Gists host enormous free prompt libraries — r/ChatGPT, r/ClaudeAI, r/PromptEngineering, prompt-engineering Substacks, FlowGPT, PromptHero, and dozens of curated lists. Lumenari is the paid alternative: curated, multi-format kits with maintenance. The trade is the usual one — time vs money. The community libraries are free, vast, and educational; the curated catalog is fast, tested, and scoped to specific roles. Most builders use both at different stages of their AI journey.",
    lumenariAdvantages: [
      "Curated quality — every kit tested in-house before it ships. No sifting through 200-comment threads to figure out which prompt in r/ClaudeAI actually works versus which one the author made up over a coffee.",
      "Coverage — full role-specific kits, not single prompts. SKILL.md + optimization pack + Custom GPT + quick start, per role. A community thread might give you one good cold-email opener; the Sales Outreach Pro kit covers openers, follow-ups, reply handling, objection patterns, and three voice presets.",
      "Updates — community posts go stale the day GPT-5 ships; Lumenari kits get refreshed when models change. A high-upvoted prompt from 2024 might be actively wrong for the 2026 model, and there's no notification system telling you so.",
      "Multi-AI delivery in four formats so the kit isn't tied to whichever AI the original poster used. Reddit prompts skew heavily ChatGPT — porting them to Claude, Cursor, or Gemini takes manual work.",
      "License clarity — paying customers get a clear commercial license; random Reddit prompts have ambiguous reuse rights, especially for commercial work or client-facing use cases.",
      "Recommendation wizard cuts the discovery time to seconds — describe your role, get the right kit. Community libraries are great if you know what you're searching for; the wizard is the shortcut when you don't.",
      "Trustable signal — every Lumenari kit ships under one accountable curator, not anonymous usernames. If a kit underperforms, the team owns the fix.",
    ],
    competitorStrengths: [
      "Free. Zero cost, no payment friction, no signup. The lowest-friction option, full stop.",
      "Massive variety — every niche, every model, every persona, somewhere on the internet. The long tail of community libraries is genuinely impossible for any single curated catalog to match.",
      "Active community willing to iterate on prompts in public. The best community threads include the comment-by-comment refinement that improved the prompt over weeks of real-world testing.",
      "Great way to learn the patterns before deciding to buy anything. Reading the top-voted prompts in r/ClaudeAI and r/ChatGPT is a faster education in prompt engineering than most paid courses.",
      "Niche personas the curated catalogs miss — D&D dungeon-master prompts, specific fanfic styles, hyper-narrow professional jobs, hobby use cases. Community wins on coverage of the truly long tail.",
      "Live signal on what's working — high-upvote prompts are surfacing real demand, which is useful market intelligence even if you don't end up using the specific prompt.",
    ],
    rows: [
      { feature: "Price", lumenari: "$14–$29 USD per kit", competitor: "Free" },
      { feature: "Curation", lumenari: "Every kit tested in-house", competitor: "Crowd-sourced" },
      { feature: "Coverage per topic", lumenari: "Full kit (4 formats per role)", competitor: "Single prompts, often partial" },
      { feature: "Maintenance", lumenari: "Updated as models change", competitor: "Posts go stale" },
      { feature: "License clarity", lumenari: "Commercial license documented", competitor: "Ambiguous" },
      { feature: "Time to first use", lumenari: "~2 minutes after purchase", competitor: "Hours of sifting" },
      { feature: "Variety / long tail", lumenari: "100+ kits and growing", competitor: "Effectively unlimited" },
      { feature: "Trust signal", lumenari: "One accountable curator", competitor: "Anonymous usernames" },
    ],
    faqs: [
      {
        q: "Why pay when there are free prompts everywhere?",
        a: "Time and quality. If you've got an evening to sift through 50 threads to find the three useful prompts that actually work for your role, free wins and you'll learn something along the way. If you'd rather spend $14 once and have a tested, multi-format kit by the end of the minute, Lumenari wins. The right answer depends on whether your time is better spent on prompt engineering or on the actual job the prompt is supposed to help with.",
      },
      {
        q: "Are the kits just polished Reddit prompts?",
        a: "No — every Lumenari kit is authored in-house, then tested across the four delivery formats and pressure-tested against the failure modes Reddit prompts typically miss (reply handling, edge-case personas, multi-step sequences, voice consistency across long conversations). The bar is 'this should work for a real role end-to-end,' not 'this prompt sounds clever in isolation.'",
      },
      {
        q: "Where should I start?",
        a: "Free path: read three or four high-signal threads in your niche and try the top-voted prompts. r/ChatGPT, r/ClaudeAI, and the major prompt-engineering Substacks are good starting points. Paid path: grab the Lumenari kit for your role and start producing today. Both are valid — Lumenari is the speed tax for skipping the discovery and testing phase.",
      },
      {
        q: "How do I know if a community prompt is still current?",
        a: "Mostly you don't, until it fails on you. Check the post date, look for recent comments confirming the prompt still works on the current model version, and assume anything older than 6 months may need adjustment. Curated catalogs solve this by versioning the kits and pushing updates — that's the part you're paying for, not just the initial prompt.",
      },
      {
        q: "Can I use Reddit prompts commercially?",
        a: "Usually yes for personal or internal use, but for content you're shipping to clients or selling, the license is often ambiguous. Most Reddit posts don't have an explicit license. For agency work, client deliverables, or anything that ends up in a commercial product, a paid kit with a documented commercial license is the cleaner path.",
      },
    ],
  },
  {
    slug: "diy-prompting",
    name: "Writing your own prompts",
    description:
      "Lumenari vs DIY prompting — when authoring your own prompts is the right call, and when buying a curated kit is faster ROI.",
    positioning:
      "DIY prompting is free, totally fine, and what most people start with. Lumenari is for the moment you realize you've been re-writing the same prompt for six months and would rather have it dialed in by someone else. The decision is honestly about the value of your time — at what hourly rate does it stop being worth your weekend to author your own prompts. For some people that's $20/hour, for some it's $300/hour. The answer determines which path is right for you, and most people pick wrong in both directions at different times in their journey.",
    lumenariAdvantages: [
      "Pre-tested patterns — every kit has been run through real workflows before shipping, with documented failure modes already caught. The constraint blocks in particular are earned from real mistakes, not invented in the abstract.",
      "Four delivery formats — same kit works in Claude, ChatGPT, Cursor, Gemini, custom GPTs. Authoring your own means writing each format yourself if you want cross-AI portability, which most DIY prompters skip and later regret.",
      "Role-specific depth — kits include the supporting files (memory.md, voice presets, quick-start prompts) most people never get around to authoring. The SKILL.md is 20% of the value; the supporting files are the other 80% that most DIY attempts skip.",
      "Updates — when the model improves or a new failure mode shows up in customer reports, the kit gets refreshed. DIY prompts go stale silently and you find out via a frustrating output six months in.",
      "Recommendation wizard finds the right kit without you having to know the catalog. DIY means you also have to design the prompt taxonomy — what counts as one prompt vs three vs a whole role.",
      "Honest learning resource — read the SKILL.md, see how the patterns are layered, and you'll write better DIY prompts going forward. Many customers buy two or three kits, internalize the structure, then DIY the rest.",
      "Removes the meta-work — most DIY prompters spend more time tuning the prompt than using it. The kit collapses that overhead so you can spend your hours on outcomes instead of prompt iteration.",
    ],
    competitorStrengths: [
      "Free. No payment, no signup, no vendor relationship. The most flexible option by definition.",
      "Total customization — every constraint, persona, format exactly as you want it. No compromise with someone else's design decisions, no patterns you don't agree with.",
      "Builds the skill — the more you prompt, the better you get at the meta-skill of prompt engineering. That's a transferable capability that compounds over years.",
      "No dependency on a vendor's catalog or pricing. Your prompts live on your disk forever, regardless of what any company does.",
      "Tuned to your exact context — your codebase, your voice, your industry, your specific clients. A general-purpose kit can't capture the level of specificity a DIY prompt can.",
      "Forces you to actually understand your own workflow — the act of authoring a prompt is itself useful diagnostic work for figuring out what you actually want the AI to do.",
    ],
    rows: [
      { feature: "Price", lumenari: "$14–$29 USD per kit", competitor: "Free" },
      { feature: "Time to first useful output", lumenari: "~2 minutes", competitor: "Hours to days, iterating" },
      { feature: "Customization ceiling", lumenari: "Edit anything inside the kit", competitor: "Unlimited" },
      { feature: "Maintenance burden", lumenari: "Updates included", competitor: "You" },
      { feature: "Reusability across tools", lumenari: "4 formats per kit", competitor: "Author each per tool" },
      { feature: "Learning effect", lumenari: "Read the kit, learn the patterns", competitor: "Earn the patterns directly" },
      { feature: "Best fit", lumenari: "Outcomes-focused users", competitor: "Prompt-engineering power users" },
      { feature: "Companion files", lumenari: "memory.md, voice presets, quick starts", competitor: "Whatever you author" },
    ],
    faqs: [
      {
        q: "Isn't DIY just better in the long run?",
        a: "For a power user who'll spend 50+ hours on prompt engineering anyway — probably yes, and you'll come out with prompts more tightly tuned to your exact context than any general-purpose kit can manage. For someone whose job isn't prompt engineering and who'd rather spend that time on outcomes (closing deals, shipping code, writing listings) — Lumenari is the shortcut. The honest decision is whether you want to be good at prompt engineering or good at your actual job.",
      },
      {
        q: "Can I learn from Lumenari kits and then build my own?",
        a: "Yes — the kits are open files. Read the SKILL.md, see the structure, internalize the patterns, then iterate on your own. Many customers buy two or three kits for the roles they work in most and then go DIY for the rest. The kits double as a working education in the SKILL.md format, which is hard to teach in the abstract but obvious once you've seen a few done well.",
      },
      {
        q: "What if I only need one prompt, not a whole kit?",
        a: "Honestly, DIY. Lumenari kits earn their price when you reach for them five or ten times across a role. For a one-off task — a single email, a one-time outline, a single migration — write your own prompt and ship. The kit math doesn't work for genuinely one-off use cases.",
      },
      {
        q: "How long does it take to author a really good prompt from scratch?",
        a: "For a single one-shot prompt, 15-30 minutes if you know what you're doing. For a full SKILL.md with constraints, patterns, examples, and supporting files for a specific role — usually 4-8 hours of focused work plus another 4-8 hours of iteration over the next few weeks as you find the failure modes. That's the time you're saving when you buy a kit instead of authoring one.",
      },
      {
        q: "What if my role isn't in the Lumenari catalog?",
        a: "Then DIY is the right answer for now. Use the closest adjacent kit as a structural template, modify it for your specifics, and you'll be ahead of authoring from scratch. The catalog is also still scaling toward 100+ kits — if your role isn't covered today, it may be in a quarter or two.",
      },
    ],
  },
];

export function getCompetitor(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}

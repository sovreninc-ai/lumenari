module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/favicon.ico (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/app/favicon.ico (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 256,
    height: 256
};
}),
"[project]/src/data/comparisons.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Comparison page data — `/[locale]/vs/[competitor]`.
 *
 * Honest, factual, no FUD. Each entry powers one comparison page with a
 * side-by-side feature table, pros/cons, and Lumenari's unique advantages.
 */ __turbopack_context__.s([
    "COMPETITORS",
    ()=>COMPETITORS,
    "getCompetitor",
    ()=>getCompetitor
]);
const COMPETITORS = [
    {
        slug: "skillsmp",
        name: "SkillsMP",
        description: "Lumenari vs SkillsMP — how the two Claude skill marketplaces compare on curation, multi-AI support, recommendations, and price.",
        positioning: "SkillsMP is an open marketplace where anyone can list a Claude skill. Lumenari is a curated catalog where every kit is built or vetted in-house. Both make Claude better; they're aimed at different buyers.",
        lumenariAdvantages: [
            "Every kit is curated and tested in-house — no quality variance between authors.",
            "Multi-AI delivery: every kit ships in four formats (SKILL.md, ChatGPT optimization pack, Custom GPT instructions, per-platform quick start). Most SkillsMP listings are Claude-only.",
            "AI-driven recommendation wizard built into the storefront — describe your use case in plain English, get the right kit.",
            "Bundles that save 30-50% when you buy a stack of related kits.",
            "Pro+ subscription unlocks every current and future kit — useful if you'd buy 4+ kits anyway."
        ],
        competitorStrengths: [
            "Larger long-tail catalog from many independent authors.",
            "Skills you won't find on Lumenari yet — Lumenari's catalog is still scaling to 100 kits.",
            "Direct-from-author model means you can sometimes reach the creator for support questions."
        ],
        rows: [
            {
                feature: "Curation model",
                lumenari: "Curated in-house",
                competitor: "Open marketplace"
            },
            {
                feature: "Quality consistency",
                lumenari: "All kits hit the same bar",
                competitor: "Varies by author"
            },
            {
                feature: "Multi-AI support",
                lumenari: "4 formats per kit",
                competitor: "Mostly Claude-only"
            },
            {
                feature: "Recommendation wizard",
                lumenari: "Built-in AI wizard",
                competitor: "Browse / search only"
            },
            {
                feature: "Bundles",
                lumenari: "6 bundles, save 30-50%",
                competitor: "Single-kit purchases"
            },
            {
                feature: "Subscription option",
                lumenari: "Pro+ all-access",
                competitor: "Per-kit only"
            },
            {
                feature: "Catalog size",
                lumenari: "20+ and scaling to 100",
                competitor: "Larger long-tail"
            },
            {
                feature: "Price range",
                lumenari: "$14–$29 CAD",
                competitor: "Varies widely"
            }
        ],
        faqs: [
            {
                q: "Why would I pick Lumenari over SkillsMP?",
                a: "If you want curation and consistency — every kit tested, every kit in four formats, with a recommendation wizard that picks the right one for you. SkillsMP wins on long-tail catalog size."
            },
            {
                q: "Does Lumenari work with ChatGPT, Cursor, Gemini?",
                a: "Yes. Every kit ships in four formats: SKILL.md for Claude/Cursor, an optimization pack for any chat AI, Custom GPT instructions for ChatGPT, and a per-platform quick start."
            },
            {
                q: "Can I switch from SkillsMP to Lumenari?",
                a: "Absolutely — they're complementary. Use SkillsMP for niche long-tail needs, Lumenari for the core stack you reach for every day."
            }
        ]
    },
    {
        slug: "agensi",
        name: "Agensi",
        description: "Lumenari vs Agensi — comparing two curated AI skill marketplaces on pricing, multi-AI support, and curation model.",
        positioning: "Agensi and Lumenari both ship curated kits for AI tools. Lumenari leans toward multi-AI portability (every kit in four formats) and bundles; Agensi has its own focus areas.",
        lumenariAdvantages: [
            "Four-format delivery per kit (Claude, ChatGPT, Custom GPT, per-platform quick start) — easier portability across the AI stack.",
            "Bundle discounts (30-50% off when buying stacks of related kits).",
            "Pro+ subscription for buyers who'd otherwise grab 4+ kits.",
            "Embeddable API — embed the recommendation engine into your own product.",
            "Multi-locale storefront across 6 languages."
        ],
        competitorStrengths: [
            "Different catalog mix — some kits available on Agensi may not be on Lumenari yet.",
            "Established brand recognition in their core verticals."
        ],
        rows: [
            {
                feature: "Multi-AI format support",
                lumenari: "4 formats per kit",
                competitor: "Varies"
            },
            {
                feature: "Bundle discounts",
                lumenari: "Yes — 6 bundles",
                competitor: "Limited"
            },
            {
                feature: "Subscription tier",
                lumenari: "Pro+ all-access",
                competitor: "Limited"
            },
            {
                feature: "Embeddable API",
                lumenari: "Yes — Free/Pro/Business",
                competitor: "Limited"
            },
            {
                feature: "Multi-locale storefront",
                lumenari: "6 languages",
                competitor: "Primarily English"
            },
            {
                feature: "Price range",
                lumenari: "$14–$29 CAD",
                competitor: "Varies"
            }
        ],
        faqs: [
            {
                q: "Why pick Lumenari over Agensi?",
                a: "Pick Lumenari if you want multi-AI portability, bundles, an all-access subscription, and an API you can embed in your own product."
            },
            {
                q: "Are the kits portable across AI tools?",
                a: "Yes. Every Lumenari kit ships with a SKILL.md (for Claude/Cursor), an optimization pack (for any chat AI), Custom GPT instructions (for ChatGPT), and a per-platform quick start."
            }
        ]
    },
    {
        slug: "chatgpt-store",
        name: "ChatGPT Store",
        description: "Lumenari vs the ChatGPT Store — curated kits in 4 formats vs free GPTs locked to one platform. Honest comparison.",
        positioning: "The ChatGPT Store has thousands of free GPTs. Lumenari sells paid, curated kits in four formats. The two answer different questions: 'is there a GPT for this?' vs 'is there a high-quality, portable, tested workflow for this?'",
        lumenariAdvantages: [
            "Curated quality — every kit is built or tested in-house, not crowdsourced.",
            "Four-format delivery: works on Claude, Cursor, Gemini, any chat AI — not just ChatGPT.",
            "You own the files. Drop them anywhere, edit them, use them offline. ChatGPT Store GPTs run only inside ChatGPT.",
            "No GPT-4 / GPT-5 / Plus tier required — the optimization packs work on free tiers across every AI tool.",
            "Lifetime access to a kit + every update we ship."
        ],
        competitorStrengths: [
            "Free for most use cases.",
            "Massive long-tail catalog.",
            "Native ChatGPT integration — no copy-paste step.",
            "Native function calling and code interpreter access."
        ],
        rows: [
            {
                feature: "Price",
                lumenari: "$14–$29 CAD per kit (or Pro+ subscription)",
                competitor: "Mostly free with ChatGPT Plus"
            },
            {
                feature: "AI tool support",
                lumenari: "Claude, ChatGPT, Cursor, Gemini, any",
                competitor: "ChatGPT only"
            },
            {
                feature: "Quality control",
                lumenari: "Every kit curated in-house",
                competitor: "Anyone can publish"
            },
            {
                feature: "Offline / portable",
                lumenari: "You own the files",
                competitor: "Lives inside ChatGPT"
            },
            {
                feature: "Tier required",
                lumenari: "Free tier of any AI works",
                competitor: "ChatGPT Plus to use most"
            },
            {
                feature: "Function calling",
                lumenari: "No (prompt content)",
                competitor: "Yes (native to ChatGPT)"
            }
        ],
        faqs: [
            {
                q: "Why pay for Lumenari if ChatGPT GPTs are free?",
                a: "Curation, quality, and portability. The ChatGPT Store is huge and free, but quality varies wildly, and you're locked into ChatGPT. Lumenari's kits are curated, tested, and work on every major AI tool."
            },
            {
                q: "Can I use Lumenari kits with ChatGPT?",
                a: "Yes — every kit includes Custom GPT instructions you can paste directly into 'Create a GPT' inside ChatGPT."
            },
            {
                q: "What about code interpreter or function calling?",
                a: "Lumenari kits are prompt content — they make the AI smarter at a task. They don't add new capabilities like function calling. For workflows that need those, the ChatGPT Store has a clear advantage."
            }
        ]
    },
    {
        slug: "github-skills",
        name: "GitHub-hosted Claude skills",
        description: "Lumenari vs GitHub-hosted Claude skills — paying for curation + multi-AI delivery vs free open-source skills.",
        positioning: "There are hundreds of free Claude skills on GitHub. Lumenari sells curated, multi-AI kits. The decision: how much is your time worth, and how comfortable are you with quality variance?",
        lumenariAdvantages: [
            "Every kit is curated and tested in-house — no hunting through README files looking for the one that actually works.",
            "Four-format delivery — not just SKILL.md, but ChatGPT, Custom GPT, and per-platform quick starts.",
            "AI recommendation wizard — describe your use case, get the right kit.",
            "Bundles, Pro+ subscription, and an embeddable API.",
            "Maintenance — when a kit gets updated, you get the update."
        ],
        competitorStrengths: [
            "Free.",
            "Open source — fork, modify, contribute back.",
            "Huge variety, no curation gatekeeping.",
            "You can study the prompts and learn the patterns directly."
        ],
        rows: [
            {
                feature: "Price",
                lumenari: "$14–$29 CAD per kit",
                competitor: "Free"
            },
            {
                feature: "Curation",
                lumenari: "Every kit tested in-house",
                competitor: "Unmoderated"
            },
            {
                feature: "Updates",
                lumenari: "Maintained — you get updates",
                competitor: "Repo-dependent"
            },
            {
                feature: "Multi-AI delivery",
                lumenari: "4 formats per kit",
                competitor: "Mostly SKILL.md only"
            },
            {
                feature: "Recommendation wizard",
                lumenari: "Yes",
                competitor: "Manual search"
            },
            {
                feature: "License clarity",
                lumenari: "Clear commercial license",
                competitor: "Per-repo, varies"
            }
        ],
        faqs: [
            {
                q: "Why pay if free skills exist on GitHub?",
                a: "Time and quality. If you've got an hour to evaluate three open-source skills and pick the best one, GitHub is free and great. If you'd rather pay $14 and have a tested kit in four formats with updates, Lumenari is the buy."
            },
            {
                q: "Are GitHub skills always lower quality?",
                a: "No — some are excellent. The variance is the issue. Lumenari's promise is that every kit is at or above the bar of the best open-source skills."
            },
            {
                q: "Can I see what's inside a kit before buying?",
                a: "Yes — every kit page lists the deliverables and a 'what's inside' summary. No surprises."
            }
        ]
    },
    {
        slug: "notion-ai",
        name: "Notion AI",
        description: "Lumenari vs Notion AI — when a built-in AI assistant in your wiki is enough, and when curated multi-AI kits do more for your money.",
        positioning: "Notion AI is the assistant built into your Notion workspace — it summarizes, drafts, and answers questions about your pages. Lumenari is a set of curated prompt + skill kits you drop into Claude, ChatGPT, Cursor, Gemini, or any chat AI. The two solve different problems: Notion AI lives where your team's writing already lives; Lumenari follows you across whichever AI you actually do the work in.",
        lumenariAdvantages: [
            "Works in every major AI tool — not just inside Notion.",
            "Curated, role-specific kits (recruiter, real-estate, SDR, founder, dev) instead of a general-purpose assistant.",
            "You own the files. The SKILL.md, optimization pack, and Custom GPT instructions live on your disk. Notion AI lives inside Notion, gated by Notion's subscription.",
            "No vendor lock-in. If you move off Notion, your Lumenari kits move with you.",
            "Bundles and a Pro+ subscription that unlocks every kit — better unit economics if you'd buy a few kits a year."
        ],
        competitorStrengths: [
            "Already deployed wherever your team writes — no copy-paste, no second tab.",
            "Native Q&A across an entire Notion workspace (your real docs, in context).",
            "Page-level summaries, table autofill, action item extraction — all without a prompt.",
            "Comes free or as a flat $10/mo add-on if you're already on Notion."
        ],
        rows: [
            {
                feature: "Where it works",
                lumenari: "Claude, ChatGPT, Cursor, Gemini, any chat AI",
                competitor: "Inside Notion only"
            },
            {
                feature: "Specialization",
                lumenari: "100+ role-specific kits",
                competitor: "General-purpose assistant"
            },
            {
                feature: "Curated prompts",
                lumenari: "Yes — every kit tested in-house",
                competitor: "Built-in summarize/draft buttons"
            },
            {
                feature: "Workspace context",
                lumenari: "Whatever you paste in",
                competitor: "Reads your Notion pages directly"
            },
            {
                feature: "Portability",
                lumenari: "Files you own",
                competitor: "Tied to Notion subscription"
            },
            {
                feature: "Pricing",
                lumenari: "$14–$29 CAD per kit or Pro+ $19/mo",
                competitor: "$10 USD/mo on top of Notion"
            }
        ],
        faqs: [
            {
                q: "Can Lumenari replace Notion AI?",
                a: "Not as a Notion-page Q&A bot — Notion AI is built into the editor and reads your workspace directly. Lumenari replaces the moment after that, when you take a draft into Claude or ChatGPT to actually polish, personalize, or extend it."
            },
            {
                q: "Do they work together?",
                a: "Yes. A common pattern is to draft and outline in Notion AI, then run the Lumenari role-specific kit on the draft for tone, structure, or final copy. Two tools, one workflow."
            },
            {
                q: "What if I already pay for Notion AI?",
                a: "Keep it for in-workspace summaries and Q&A. Add Lumenari kits for the parts of the job that happen outside Notion — outreach, code, listings, research briefs. They don't overlap as much as they sound like they do."
            }
        ]
    },
    {
        slug: "jasper",
        name: "Jasper",
        description: "Lumenari vs Jasper — a marketing-content platform vs portable AI kits. When to pick each, written without FUD.",
        positioning: "Jasper is an end-to-end marketing-content platform: brand voice, campaign planner, templates, team review, the works. Lumenari is a catalog of curated kits you bring to whichever AI you already pay for. Jasper is the seat for a marketing team; Lumenari is a tool a marketer uses inside their existing AI stack.",
        lumenariAdvantages: [
            "Per-kit pricing instead of per-seat — buy what you actually need, no minimum.",
            "Works inside the AI you already pay for (Claude, ChatGPT, etc.) — no second subscription stack.",
            "Curated kits cover roles beyond marketing — sales, recruiting, real estate, dev, ops, trades — at a single source.",
            "You own the files. Take them to a new AI, a new agency, a new client — no migration story.",
            "Bundles and Pro+ subscription cap the cost if you'd buy multiple kits."
        ],
        competitorStrengths: [
            "Full marketing-platform UX — brand voice management, campaign briefs, multi-step content workflows, team approvals.",
            "Templates and workflows tightly tuned for high-volume content marketing.",
            "Browser extension and integrations with the rest of a marketing stack.",
            "On-platform team collaboration — comments, roles, review queues."
        ],
        rows: [
            {
                feature: "Product shape",
                lumenari: "Portable kits + recommendation wizard",
                competitor: "Full marketing platform"
            },
            {
                feature: "AI tool support",
                lumenari: "Claude, ChatGPT, Cursor, Gemini, any",
                competitor: "Jasper-hosted models"
            },
            {
                feature: "Pricing model",
                lumenari: "Per kit / Pro+ $19 CAD/mo",
                competitor: "Per seat, $39–$59 USD/mo and up"
            },
            {
                feature: "Brand-voice management",
                lumenari: "Brand-voice kit + per-kit voice presets",
                competitor: "First-class workspace feature"
            },
            {
                feature: "Team collaboration",
                lumenari: "Files you share like any doc",
                competitor: "Built-in review + roles"
            },
            {
                feature: "Specialization breadth",
                lumenari: "100+ role-specific kits",
                competitor: "Marketing + adjacent"
            }
        ],
        faqs: [
            {
                q: "If I'm running a marketing team, should I just use Jasper?",
                a: "If you need team review queues, brand-voice governance, and a platform of record for content — Jasper is built for that, and it's hard to recreate that with kits alone. If your team already lives in Claude or ChatGPT and you want sharper outputs from those, Lumenari is the cheaper, more portable buy."
            },
            {
                q: "Do Lumenari kits cover marketing use cases?",
                a: "Yes — SEO content, cold outreach, newsletter, brand voice, real-estate copy, e-commerce product copy, and a Sales & Marketing bundle. The kits are role-specific instead of step-specific."
            },
            {
                q: "What about brand voice consistency?",
                a: "Lumenari ships a dedicated brand-voice kit. Drop it into Claude or ChatGPT once and the model writes in your voice across every other kit. Not the same as Jasper's workspace-wide governance, but it solves 80% of the consistency problem."
            }
        ]
    },
    {
        slug: "cursor-built-in",
        name: "Cursor's built-in prompts",
        description: "Lumenari vs Cursor's built-in prompts and rules — when adding a SKILL.md kit is worth it on top of the editor's defaults.",
        positioning: "Cursor ships with Composer, Cmd-K, and `.cursorrules` — strong defaults for general coding. Lumenari kits are layered on top: role-specific SKILL.md files for Next.js + Supabase, Stripe, RLS, iOS/SwiftUI, Python data work, Go backend, and more. Cursor's defaults make coding faster; Lumenari kits make the model right more often on a specific stack.",
        lumenariAdvantages: [
            "Stack-specific defaults out of the box — Next.js + Supabase + RLS gotchas, Stripe webhook idempotency, SwiftUI vs UIKit decisions — without authoring a `.cursorrules` from scratch.",
            "Same kit works inside Claude Code, ChatGPT, and Cursor — no Cursor lock-in for the prompt content.",
            "Bundles cover end-to-end stacks (Developer Quartet, Developer Mega Stack) so you don't have to assemble rules per repo.",
            "Updates included — when the kit gets a refresh, you get it.",
            "Curated, vetted prompts — no copy-pasting random Reddit configs."
        ],
        competitorStrengths: [
            "Native to the editor — Composer, inline edits, agent mode are inside the IDE.",
            "Per-repo `.cursorrules` is free and ships with Cursor.",
            "No copy-paste; rules apply automatically when the editor opens the repo.",
            "Constantly improving as Cursor ships new model integrations and tool calling."
        ],
        rows: [
            {
                feature: "Where it runs",
                lumenari: "Cursor, Claude Code, ChatGPT, any AI",
                competitor: "Cursor only"
            },
            {
                feature: "Stack specialization",
                lumenari: "Next.js, Supabase, Stripe, RLS, Python, Go, etc.",
                competitor: "General coding rules"
            },
            {
                feature: "Setup",
                lumenari: "Drop the SKILL.md into the project",
                competitor: "Author your own .cursorrules"
            },
            {
                feature: "Cost",
                lumenari: "$19 CAD per dev kit or Pro+",
                competitor: "Included with Cursor"
            },
            {
                feature: "Multi-AI portability",
                lumenari: "Same kit across tools",
                competitor: "Cursor-only"
            },
            {
                feature: "Maintained",
                lumenari: "Updates pushed",
                competitor: "DIY"
            }
        ],
        faqs: [
            {
                q: "I already pay for Cursor — do I need Lumenari kits?",
                a: "Not strictly. If your `.cursorrules` is already dialed in for your stack, you're set. If you'd rather not author the rules yourself, the dev kits (Next.js + Supabase, Supabase RLS, Stripe Connect, iOS SwiftUI, Python data, etc.) are the shortcut."
            },
            {
                q: "Does a Lumenari SKILL.md replace .cursorrules?",
                a: "It augments it. Drop the SKILL.md into the repo alongside your existing rules; the kit covers stack-specific patterns and idioms the rules typically miss."
            },
            {
                q: "What about Cursor's agent mode and Composer?",
                a: "Agent mode and Composer are Cursor's runtime — they work whether or not you use Lumenari. A SKILL.md improves the quality of what they generate by giving the model better context to start from."
            }
        ]
    },
    {
        slug: "anthropic-skills-repo",
        name: "Anthropic's official skills repo",
        description: "Lumenari vs Anthropic's official skills GitHub repo — free reference skills vs curated, multi-AI kits with updates.",
        positioning: "Anthropic publishes an official open-source skills repo on GitHub — reference SKILL.md files showing the format and a handful of canonical examples. Lumenari is a paid catalog of role-specific kits built in the same format but for the long tail of jobs (recruiter, real-estate, SDR, founder, trades, healthcare-adjacent, etc.) and shipped in four formats so they work outside Claude too.",
        lumenariAdvantages: [
            "100+ role-specific kits vs a small set of canonical examples — Lumenari covers the long tail.",
            "Four-format delivery — every kit ships SKILL.md plus a ChatGPT optimization pack, Custom GPT instructions, and a per-platform quick start. Anthropic's repo is Claude-first.",
            "Maintained — when the kit ships an update, you pull it. The reference repo gets updates when Anthropic publishes them.",
            "AI recommendation wizard plus bundles — buy the right kit, fast.",
            "Pro+ subscription for the all-you-can-eat case."
        ],
        competitorStrengths: [
            "Free.",
            "Authored by Anthropic — canonical examples of the SKILL.md format.",
            "Open source — fork, learn the patterns, contribute back.",
            "Great way to internalize the format before ever paying for a kit."
        ],
        rows: [
            {
                feature: "Price",
                lumenari: "$14–$29 CAD per kit or Pro+ $19/mo",
                competitor: "Free"
            },
            {
                feature: "Catalog scope",
                lumenari: "100+ role + stack kits",
                competitor: "Reference / canonical examples"
            },
            {
                feature: "Multi-AI delivery",
                lumenari: "Claude, ChatGPT, Cursor, Gemini, any",
                competitor: "Claude-first"
            },
            {
                feature: "Updates",
                lumenari: "Maintained — pull included",
                competitor: "Anthropic's release cadence"
            },
            {
                feature: "Recommendation wizard",
                lumenari: "AI-driven",
                competitor: "Browse the repo"
            },
            {
                feature: "License clarity",
                lumenari: "Commercial license documented",
                competitor: "Per-repo license"
            }
        ],
        faqs: [
            {
                q: "If Anthropic's skills are free, why pay for Lumenari?",
                a: "Coverage and portability. The Anthropic repo is canonical but small — it's a teaching tool. Lumenari fills out the long tail (real-estate, recruiter, trades, SDR, founder, healthcare-adjacent, etc.) and ships every kit in four formats so it works outside Claude."
            },
            {
                q: "Are Lumenari kits compatible with the Anthropic SKILL.md format?",
                a: "Yes — Lumenari uses the same SKILL.md format. The kits are drop-in for Claude Code or the Claude desktop app."
            },
            {
                q: "Should I start with the Anthropic repo?",
                a: "Yes. Read two or three canonical examples, internalize the format, then decide whether to author your own per role or buy a curated kit for the roles you actually work in."
            }
        ]
    },
    {
        slug: "reddit-prompt-libraries",
        name: "Reddit / community prompt libraries",
        description: "Lumenari vs Reddit and community prompt libraries — when sifting free prompts is worth it, and when a curated kit pays for itself.",
        positioning: "Reddit, Discord, Twitter, and GitHub Gists host enormous free prompt libraries — r/ChatGPT, r/ClaudeAI, prompt-engineering Substacks, and dozens of curated lists. Lumenari is the paid alternative: curated, multi-format kits with maintenance. The trade is the usual one — time vs money.",
        lumenariAdvantages: [
            "Curated quality — every kit tested in-house before it ships. No sifting through 200-comment threads.",
            "Coverage — full role-specific kits, not single prompts. SKILL.md + optimization pack + Custom GPT + quick start, per role.",
            "Updates — community posts go stale the day GPT-5 ships; Lumenari kits get refreshed.",
            "Multi-AI delivery in four formats so the kit isn't tied to whichever AI the original poster used.",
            "License clarity — paying customers get a clear commercial license; random Reddit prompts have ambiguous reuse rights."
        ],
        competitorStrengths: [
            "Free.",
            "Massive variety — every niche, every model, every persona, somewhere.",
            "Active community willing to iterate on prompts in public.",
            "Great way to learn the patterns before deciding to buy anything."
        ],
        rows: [
            {
                feature: "Price",
                lumenari: "$14–$29 CAD per kit",
                competitor: "Free"
            },
            {
                feature: "Curation",
                lumenari: "Every kit tested in-house",
                competitor: "Crowd-sourced"
            },
            {
                feature: "Coverage per topic",
                lumenari: "Full kit (4 formats per role)",
                competitor: "Single prompts, often partial"
            },
            {
                feature: "Maintenance",
                lumenari: "Updated as models change",
                competitor: "Posts go stale"
            },
            {
                feature: "License clarity",
                lumenari: "Commercial license documented",
                competitor: "Ambiguous"
            },
            {
                feature: "Time to first use",
                lumenari: "~2 minutes after purchase",
                competitor: "Hours of sifting"
            }
        ],
        faqs: [
            {
                q: "Why pay when there are free prompts everywhere?",
                a: "Time and quality. If you've got an evening to sift through 50 threads to find the three useful prompts, free wins. If you'd rather spend $14 once and have a tested kit in four formats by the end of the minute, Lumenari wins."
            },
            {
                q: "Are the kits just polished Reddit prompts?",
                a: "No — every Lumenari kit is authored in-house, then tested across the four delivery formats. The bar is 'this should work for a real role end-to-end,' not 'this prompt sounds clever.'"
            },
            {
                q: "Where should I start?",
                a: "Free path: read three or four high-signal threads in your niche and try the top-voted prompts. Paid path: grab the Lumenari kit for your role and start. Both are valid; Lumenari is the speed tax."
            }
        ]
    },
    {
        slug: "diy-prompting",
        name: "Writing your own prompts",
        description: "Lumenari vs DIY prompting — when authoring your own prompts is the right call, and when buying a curated kit is faster ROI.",
        positioning: "DIY prompting is free, totally fine, and what most people start with. Lumenari is for the moment you realize you've been re-writing the same prompt for six months and would rather have it dialed in by someone else. The decision is honestly about the value of your time.",
        lumenariAdvantages: [
            "Pre-tested patterns — every kit has been run through real workflows before shipping.",
            "Four delivery formats — same kit works in Claude, ChatGPT, Cursor, Gemini, custom GPTs.",
            "Role-specific depth — kits include the supporting files (memory.md, voice presets, quick-start prompts) most people never get around to authoring.",
            "Updates — when the model improves, the kit gets refreshed.",
            "Recommendation wizard finds the right kit without you having to know the catalog."
        ],
        competitorStrengths: [
            "Free.",
            "Total customization — every constraint, persona, format exactly as you want.",
            "Builds the skill — the more you prompt, the better you get at the meta-skill.",
            "No dependency on a vendor's catalog or pricing."
        ],
        rows: [
            {
                feature: "Price",
                lumenari: "$14–$29 CAD per kit",
                competitor: "Free"
            },
            {
                feature: "Time to first useful output",
                lumenari: "~2 minutes",
                competitor: "Hours to days, iterating"
            },
            {
                feature: "Customization ceiling",
                lumenari: "Edit anything inside the kit",
                competitor: "Unlimited"
            },
            {
                feature: "Maintenance burden",
                lumenari: "Updates included",
                competitor: "You"
            },
            {
                feature: "Reusability across tools",
                lumenari: "4 formats per kit",
                competitor: "Author each per tool"
            },
            {
                feature: "Learning effect",
                lumenari: "Read the kit, learn the patterns",
                competitor: "Earn the patterns directly"
            }
        ],
        faqs: [
            {
                q: "Isn't DIY just better in the long run?",
                a: "For a power user who'll spend 50+ hours on prompt engineering anyway — probably yes. For someone whose job isn't prompt engineering and who'd rather spend that time on outcomes — Lumenari is the shortcut."
            },
            {
                q: "Can I learn from Lumenari kits and then build my own?",
                a: "Yes — the kits are open files. Read the SKILL.md, see the structure, internalize the patterns, then iterate on your own. Many customers buy two or three and then go DIY for the rest."
            },
            {
                q: "What if I only need one prompt, not a whole kit?",
                a: "Honestly, DIY. Lumenari kits earn their price when you reach for them five or ten times. For a one-off task, write your own."
            }
        ]
    }
];
function getCompetitor(slug) {
    return COMPETITORS.find((c)=>c.slug === slug);
}
}),
"[project]/src/app/[locale]/vs/[competitor]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ComparisonPage,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-rsc] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-rsc] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-rsc] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$comparisons$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/comparisons.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$structured$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/structured-data.ts [app-rsc] (ecmascript) <locals>");
;
;
;
;
;
;
;
;
function generateStaticParams() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LOCALES"].flatMap((locale)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$comparisons$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["COMPETITORS"].map((c)=>({
                locale,
                competitor: c.slug
            })));
}
async function generateMetadata({ params }) {
    const { locale, competitor } = await params;
    const safeLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isLocale"])(locale) ? locale : "en";
    const c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$comparisons$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCompetitor"])(competitor);
    if (!c) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["comparisonMetadata"])({
            competitorName: competitor,
            competitorSlug: competitor,
            description: "We couldn't find that comparison. Browse the Lumenari catalog.",
            locale: safeLocale
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["comparisonMetadata"])({
        competitorName: c.name,
        competitorSlug: c.slug,
        description: c.description,
        locale: safeLocale
    });
}
async function ComparisonPage({ params }) {
    const { locale, competitor } = await params;
    const safeLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isLocale"])(locale) ? locale : "en";
    const c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$comparisons$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCompetitor"])(competitor);
    if (!c) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteUrl"])();
    const localePath = safeLocale === "en" ? "" : `/${safeLocale}`;
    const breadcrumb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$structured$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BreadcrumbListSchema"])([
        {
            name: "Lumenari",
            url: `${base}${localePath}/`
        },
        {
            name: "Compare",
            url: `${base}${localePath}/kits`
        },
        {
            name: `Lumenari vs ${c.name}`,
            url: `${base}${localePath}/vs/${c.slug}`
        }
    ]);
    const faqSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$structured$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FAQPageSchema"])(c.faqs);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "mx-auto max-w-4xl px-6 py-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$structured$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["JsonLd"], {
                schema: [
                    breadcrumb,
                    faqSchema
                ]
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "text-sm text-[var(--muted)] mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/kits",
                        className: "hover:text-[var(--foreground)]",
                        children: "All kits"
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mx-2",
                        children: "/"
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Lumenari vs ",
                            c.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "eyebrow",
                children: "Honest comparison"
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "display text-4xl sm:text-5xl mt-2 mb-5",
                children: [
                    "Lumenari vs ",
                    c.name
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-lg text-[var(--muted)] leading-relaxed mb-12 max-w-2xl",
                children: c.positioning
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-label": "Feature comparison",
                className: "mb-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl border border-[var(--hairline)] overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "bg-[var(--surface)]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left font-semibold px-4 py-3 w-1/3",
                                            children: "Feature"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                            lineNumber: 89,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left font-semibold px-4 py-3 w-1/3",
                                            children: "Lumenari"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                            lineNumber: 92,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left font-semibold px-4 py-3 w-1/3",
                                            children: c.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                            lineNumber: 95,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                    lineNumber: 88,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: c.rows.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: `border-t border-[var(--hairline)] ${i % 2 === 1 ? "bg-[var(--surface)]/50" : ""}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 font-medium",
                                                children: row.feature
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                                lineNumber: 106,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3",
                                                children: row.lumenari
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                                lineNumber: 107,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-[var(--muted)]",
                                                children: row.competitor
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                                lineNumber: 108,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, row.feature, true, {
                                        fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                        lineNumber: 102,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "grid md:grid-cols-2 gap-8 mb-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "display text-2xl mb-5",
                                children: "Where Lumenari wins"
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-3",
                                children: c.lumenariAdvantages.map((adv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex items-start gap-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "w-5 h-5 text-[var(--accent-strong)] mt-0.5 flex-shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                                lineNumber: 125,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "leading-relaxed",
                                                children: adv
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                                lineNumber: 126,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, adv, true, {
                                        fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "display text-2xl mb-5",
                                children: [
                                    "Where ",
                                    c.name,
                                    " wins"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-3",
                                children: c.competitorStrengths.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex items-start gap-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-5 h-5 text-[var(--muted)] mt-0.5 flex-shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                                lineNumber: 136,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "leading-relaxed text-[var(--muted)]",
                                                children: s
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                                lineNumber: 137,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, s, true, {
                                        fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-label": "FAQ",
                className: "mb-14",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "display text-2xl mb-6",
                        children: "Common questions"
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: c.faqs.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold mb-1.5",
                                        children: f.q
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                        lineNumber: 152,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[var(--muted)] leading-relaxed text-[0.97rem]",
                                        children: f.a
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, f.q, true, {
                                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                lineNumber: 151,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-3xl bg-spectrum p-[1px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-3xl bg-white p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "display text-2xl mb-1",
                                    children: "See the catalog yourself."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[var(--muted)]",
                                    children: "20+ kits, 6 bundles, four formats per kit."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/kits",
                            className: "inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full bg-[var(--foreground)] text-white font-medium hover:bg-black transition-colors flex-shrink-0",
                            children: [
                                "Browse all kits ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                                    lineNumber: 174,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                    lineNumber: 163,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/[locale]/vs/[competitor]/page.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/[locale]/vs/[competitor]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/[locale]/vs/[competitor]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0g5~mfz._.js.map
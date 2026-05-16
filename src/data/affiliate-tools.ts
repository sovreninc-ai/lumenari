/**
 * Lumenari affiliate-tools catalog.
 *
 * Every tool here is something Lumenari customers are likely to buy anyway —
 * coding copilots, writing aids, automation runners, design + meeting tooling.
 * We keep the catalog narrow on purpose: only tools that fit the AI-power-user
 * persona, and only programs that pay real commission.
 *
 * Chris fills in the actual referral codes via env vars at deploy time
 * (`AFFILIATE_<UPPER_SNAKE_CASE_ID>`). If an env var is unset, the link
 * degrades to the base URL — no broken affiliate flows, just a normal link.
 *
 * Pairs are matched against a Kit's `tags` field (introduced in the kit
 * consolidation step). When a kit has no tags yet, the helper falls back to
 * a safe default set (see `getRecommendedToolsForKit`).
 */

export type AffiliateCategory =
  | "ai-coding"
  | "ai-writing"
  | "ai-workflow"
  | "ai-meetings"
  | "infrastructure"
  | "design";

export interface AffiliateTool {
  id: string;
  name: string;
  category: AffiliateCategory;
  description: string;
  /** Base marketing URL — never includes a referral code. */
  url: string;
  /** Env-var name that holds Chris's affiliate code. Empty string = no program yet. */
  affiliate_code_env: string;
  /**
   * If the program uses a query param other than `?ref=<code>`, set it here.
   * If null, we default to `?ref=`.
   */
  affiliate_param?: string | null;
  /** "30% recurring" / "$10 per signup" / "20% lifetime" — human-readable. */
  commission_note: string;
  /** Tags that this tool naturally pairs with. Matched against kit.tags. */
  pairs_with_tags: string[];
}

export const AFFILIATE_TOOLS: AffiliateTool[] = [
  // -------------------------------------------------------------------
  // AI coding copilots
  // -------------------------------------------------------------------
  {
    id: "cursor",
    name: "Cursor",
    category: "ai-coding",
    description:
      "The IDE built for pairing with AI. Lumenari kits drop into Cursor as project rules and instantly upgrade its output.",
    url: "https://cursor.com",
    affiliate_code_env: "AFFILIATE_CURSOR",
    commission_note: "Referral program — varies by plan",
    pairs_with_tags: ["dev", "coding", "engineering", "ai-coding", "typescript", "react"],
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    category: "ai-coding",
    description:
      "In-editor AI completion for VS Code, JetBrains, Neovim. Pairs well with kits that lay down conventions and patterns.",
    url: "https://github.com/features/copilot",
    affiliate_code_env: "AFFILIATE_GITHUB_COPILOT",
    commission_note: "GitHub partner program",
    pairs_with_tags: ["dev", "coding", "engineering", "ai-coding"],
  },
  {
    id: "claude-pro",
    name: "Claude Pro",
    category: "ai-coding",
    description:
      "Anthropic's Claude with higher usage and Claude Code access. Most Lumenari kits are tuned against Claude.",
    url: "https://claude.com/pricing",
    affiliate_code_env: "AFFILIATE_CLAUDE",
    commission_note: "Direct — no public affiliate program",
    pairs_with_tags: ["ai-coding", "ai-writing", "dev", "writing", "claude"],
  },

  // -------------------------------------------------------------------
  // AI writing
  // -------------------------------------------------------------------
  {
    id: "notion-ai",
    name: "Notion AI",
    category: "ai-writing",
    description:
      "Notion with AI baked into every page. Great for storing Lumenari prompts as a team knowledge base.",
    url: "https://www.notion.com/product/ai",
    affiliate_code_env: "AFFILIATE_NOTION",
    commission_note: "50% first-year commission via Notion Affiliates",
    pairs_with_tags: ["writing", "ops", "product", "pm", "notes", "team"],
  },
  {
    id: "jasper",
    name: "Jasper",
    category: "ai-writing",
    description:
      "Long-form AI writing for marketers. Best paired with brand-voice and SEO-content kits.",
    url: "https://www.jasper.ai",
    affiliate_code_env: "AFFILIATE_JASPER",
    commission_note: "25% recurring for 12 months",
    pairs_with_tags: ["writing", "marketing", "seo", "brand", "content"],
  },
  {
    id: "copy-ai",
    name: "Copy.ai",
    category: "ai-writing",
    description:
      "Workflow-driven AI copy generation. Strong fit for sales outreach, e-commerce, and newsletter kits.",
    url: "https://www.copy.ai",
    affiliate_code_env: "AFFILIATE_COPY_AI",
    commission_note: "45% recurring",
    pairs_with_tags: ["writing", "sales", "marketing", "ecommerce", "newsletter"],
  },
  {
    id: "writesonic",
    name: "Writesonic",
    category: "ai-writing",
    description:
      "SEO-leaning AI writer with built-in keyword research. Pairs with the SEO Content Writer kit.",
    url: "https://writesonic.com",
    affiliate_code_env: "AFFILIATE_WRITESONIC",
    commission_note: "30% recurring",
    pairs_with_tags: ["writing", "seo", "content", "marketing"],
  },
  {
    id: "perplexity-pro",
    name: "Perplexity Pro",
    category: "ai-writing",
    description:
      "AI-native research assistant with sources. The fastest way to validate a prompt's assumptions before you ship.",
    url: "https://www.perplexity.ai/pro",
    affiliate_code_env: "AFFILIATE_PERPLEXITY",
    commission_note: "$10 per Pro signup",
    pairs_with_tags: ["research", "writing", "ops", "default"],
  },

  // -------------------------------------------------------------------
  // AI workflow / automation
  // -------------------------------------------------------------------
  {
    id: "zapier",
    name: "Zapier",
    category: "ai-workflow",
    description:
      "Connect 7,000+ apps with no-code workflows. Useful for chaining Lumenari prompts into multi-step automations.",
    url: "https://zapier.com",
    affiliate_code_env: "AFFILIATE_ZAPIER",
    commission_note: "Zapier Partner Program — variable",
    pairs_with_tags: ["automation", "workflow", "ops", "sales", "marketing"],
  },
  {
    id: "make",
    name: "Make",
    category: "ai-workflow",
    description:
      "Visual automation builder, more powerful (and trickier) than Zapier. For ops-heavy workflows behind a kit.",
    url: "https://www.make.com",
    affiliate_code_env: "AFFILIATE_MAKE",
    commission_note: "30% recurring for 12 months",
    pairs_with_tags: ["automation", "workflow", "ops", "ecommerce"],
  },
  {
    id: "n8n",
    name: "n8n",
    category: "ai-workflow",
    description:
      "Self-hostable workflow automation. Loved by devs who don't want their data flowing through a US SaaS.",
    url: "https://n8n.io",
    affiliate_code_env: "AFFILIATE_N8N",
    commission_note: "Partner program — flat fee per signup",
    pairs_with_tags: ["automation", "workflow", "dev", "engineering", "self-host"],
  },

  // -------------------------------------------------------------------
  // AI meetings / recording
  // -------------------------------------------------------------------
  {
    id: "loom",
    name: "Loom",
    category: "ai-meetings",
    description:
      "Async video with AI summaries. Great for shipping kit walkthroughs to clients or your team.",
    url: "https://www.loom.com",
    affiliate_code_env: "AFFILIATE_LOOM",
    commission_note: "Referral credit + 30% commission",
    pairs_with_tags: ["meetings", "sales", "support", "ops", "team"],
  },
  {
    id: "granola",
    name: "Granola",
    category: "ai-meetings",
    description:
      "AI meeting notes that don't require a bot in the call. Becomes essential the more meetings you take.",
    url: "https://www.granola.ai",
    affiliate_code_env: "AFFILIATE_GRANOLA",
    commission_note: "Granola partner program",
    pairs_with_tags: ["meetings", "sales", "pm", "ops"],
  },
  {
    id: "fireflies",
    name: "Fireflies.ai",
    category: "ai-meetings",
    description:
      "Records, transcribes, and summarizes calls. Useful for the sales-outreach, recruiter, and PM kits.",
    url: "https://fireflies.ai",
    affiliate_code_env: "AFFILIATE_FIREFLIES",
    commission_note: "20% recurring for 12 months",
    pairs_with_tags: ["meetings", "sales", "recruiting", "pm"],
  },

  // -------------------------------------------------------------------
  // Infrastructure / commerce
  // -------------------------------------------------------------------
  {
    id: "lemon-squeezy",
    name: "Lemon Squeezy",
    category: "infrastructure",
    description:
      "Merchant-of-record checkout for digital goods. The easy way to sell a Lumenari-style kit yourself.",
    url: "https://www.lemonsqueezy.com",
    affiliate_code_env: "AFFILIATE_LEMON_SQUEEZY",
    commission_note: "Lemon Squeezy partner — see dashboard",
    pairs_with_tags: ["ecommerce", "saas", "founder", "indie", "payments"],
  },
  {
    id: "gumroad",
    name: "Gumroad",
    category: "infrastructure",
    description:
      "Lightweight checkout for solo creators. Lower fees than the big platforms once you're rolling.",
    url: "https://gumroad.com",
    affiliate_code_env: "AFFILIATE_GUMROAD",
    commission_note: "Gumroad affiliate — variable per product",
    pairs_with_tags: ["ecommerce", "founder", "indie", "creator", "payments"],
  },
  {
    id: "paddle",
    name: "Paddle",
    category: "infrastructure",
    description:
      "Merchant of record for SaaS. Handles global tax + chargebacks so you don't have to.",
    url: "https://www.paddle.com",
    affiliate_code_env: "AFFILIATE_PADDLE",
    commission_note: "Paddle partner program",
    pairs_with_tags: ["saas", "founder", "payments", "infrastructure"],
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "infrastructure",
    description:
      "Frontend hosting tuned for Next.js. Where most Lumenari customer apps end up.",
    url: "https://vercel.com",
    affiliate_code_env: "AFFILIATE_VERCEL",
    commission_note: "Vercel referral program",
    pairs_with_tags: ["dev", "engineering", "infrastructure", "nextjs", "frontend"],
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "infrastructure",
    description:
      "Open-source Firebase alternative. Backs Lumenari itself — Postgres, Auth, Storage, Edge Functions.",
    url: "https://supabase.com",
    affiliate_code_env: "AFFILIATE_SUPABASE",
    commission_note: "Supabase ambassador — credits-based",
    pairs_with_tags: ["dev", "engineering", "infrastructure", "supabase", "postgres", "rls"],
  },

  // -------------------------------------------------------------------
  // Design
  // -------------------------------------------------------------------
  {
    id: "figma",
    name: "Figma",
    category: "design",
    description:
      "The industry-default design tool. Great companion for the Apple-Style UX kit.",
    url: "https://www.figma.com",
    affiliate_code_env: "AFFILIATE_FIGMA",
    commission_note: "Figma partner — varies",
    pairs_with_tags: ["design", "ux", "product", "frontend"],
  },
];

/** Helpers */

export function getAffiliateTool(id: string): AffiliateTool | undefined {
  return AFFILIATE_TOOLS.find((t) => t.id === id);
}

export function affiliateToolsByCategory(category: AffiliateCategory) {
  return AFFILIATE_TOOLS.filter((t) => t.category === category);
}

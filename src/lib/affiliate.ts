/**
 * Affiliate URL + recommendation helpers.
 *
 * Two surfaces:
 *   - `buildAffiliateUrl(tool)` — appends Chris's referral code from the env
 *     var declared on the tool. If the env var is unset, returns the base URL
 *     unchanged so the link still works (it just won't pay commission).
 *   - `getRecommendedToolsForKit(kit, allTools)` — matches a kit's `tags`
 *     against each tool's `pairs_with_tags`, ranks, returns 2–4.
 *
 * Tag tolerance: `kits.ts` currently doesn't expose a `tags` field — Chris is
 * adding one during kit consolidation. Until then (and for any kit missing
 * tags) we fall back to a sane default set so every kit page can render
 * `<RecommendedTools />` cleanly.
 */

import type { Kit } from "@/data/kits";
import type { AffiliateTool } from "@/data/affiliate-tools";
import { AFFILIATE_TOOLS } from "@/data/affiliate-tools";

/**
 * Forward-compat: `Kit` doesn't currently declare `tags`, but the
 * consolidation step adds it. Until the type catches up we read it
 * defensively through an index access on a widened type.
 */
type KitWithTags = Kit & { tags?: readonly string[] };

/** Default recommendations when a kit has no tags yet. */
const DEFAULT_RECOMMENDED_IDS = ["cursor", "notion-ai", "perplexity-pro"];

export function buildAffiliateUrl(tool: AffiliateTool): string {
  const code = tool.affiliate_code_env
    ? process.env[tool.affiliate_code_env]
    : undefined;
  if (!code) return tool.url;

  const param = tool.affiliate_param ?? "ref";
  const sep = tool.url.includes("?") ? "&" : "?";
  return `${tool.url}${sep}${param}=${encodeURIComponent(code)}`;
}

/**
 * Rank affiliate tools by tag overlap with a kit. Returns the top N (default 3).
 * Ties broken by category diversity (don't recommend three coding copilots in a row).
 */
export function getRecommendedToolsForKit(
  kit: KitWithTags,
  allTools: AffiliateTool[] = AFFILIATE_TOOLS,
  limit = 3,
): AffiliateTool[] {
  const tags = kit.tags ?? [];

  // No-tag fallback: stable default set.
  if (tags.length === 0) {
    return DEFAULT_RECOMMENDED_IDS.map((id) =>
      allTools.find((t) => t.id === id),
    ).filter((t): t is AffiliateTool => Boolean(t)).slice(0, limit);
  }

  const tagSet = new Set(tags.map((t) => t.toLowerCase()));

  type Scored = { tool: AffiliateTool; score: number };
  const scored: Scored[] = allTools.map((tool) => {
    const overlap = tool.pairs_with_tags.filter((t) =>
      tagSet.has(t.toLowerCase()),
    ).length;
    return { tool, score: overlap };
  });

  const matches = scored.filter((s) => s.score > 0).sort((a, b) =>
    b.score - a.score,
  );

  // Category diversity: prefer not to surface three of the same category in a row.
  const picked: AffiliateTool[] = [];
  const seenCategories = new Map<string, number>();
  for (const { tool } of matches) {
    const used = seenCategories.get(tool.category) ?? 0;
    if (used >= 2) continue; // cap any single category at 2 of the limit
    picked.push(tool);
    seenCategories.set(tool.category, used + 1);
    if (picked.length >= limit) break;
  }

  // If nothing matched, fall back to defaults so the section never renders empty.
  if (picked.length === 0) {
    return DEFAULT_RECOMMENDED_IDS.map((id) =>
      allTools.find((t) => t.id === id),
    ).filter((t): t is AffiliateTool => Boolean(t)).slice(0, limit);
  }

  return picked;
}

/**
 * <RecommendedTools /> — renders below "What's inside" on every kit page.
 *
 * Apple-clean. Subtle disclosure. Each card links out to the tool's affiliate
 * URL (or base URL if the env var isn't set yet). The link uses `rel="sponsored
 * noopener"` per Google's guidance for affiliate placements.
 *
 * Server component — receives the active locale's dictionary via props.
 */

import { ArrowUpRight } from "lucide-react";
import type { Kit } from "@/data/kits";
import { AFFILIATE_TOOLS } from "@/data/affiliate-tools";
import { buildAffiliateUrl, getRecommendedToolsForKit } from "@/lib/affiliate";
import type { Dictionary } from "@/i18n/dictionaries";

interface RecommendedToolsProps {
  kit: Kit;
  dict: Dictionary;
  /** Override the default 3-tool limit. */
  limit?: number;
}

export function RecommendedTools({ kit, dict, limit = 3 }: RecommendedToolsProps) {
  const tools = getRecommendedToolsForKit(kit, AFFILIATE_TOOLS, limit);
  if (tools.length === 0) return null;

  return (
    <section className="mt-16" aria-label="Recommended tools">
      <span className="eyebrow">{dict.kits.pairsWellWith}</span>
      <h2 className="display text-2xl mt-2 mb-2">
        {dict.kits.recommendedTitle}
      </h2>
      <p className="text-sm text-[var(--muted)] mb-6 leading-relaxed">
        {dict.kits.recommendedSub}
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const href = buildAffiliateUrl(tool);
          return (
            <li key={tool.id}>
              <a
                href={href}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="group block rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5 h-full transition-colors hover:bg-white hover:border-[var(--accent-strong)]"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="font-semibold tracking-tight">
                    {tool.name}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent-strong)] flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {tool.description}
                </p>
              </a>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-[11px] text-[var(--muted)] leading-relaxed">
        {dict.kits.disclosure}
      </p>
    </section>
  );
}

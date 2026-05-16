/**
 * <RecommendedTools /> — renders below "What's inside" on every kit page.
 *
 * Apple-clean. Subtle disclosure. Each card links out to the tool's affiliate
 * URL (or base URL if the env var isn't set yet). The link uses `rel="sponsored
 * noopener"` per Google's guidance for affiliate placements.
 */

import { ArrowUpRight } from "lucide-react";
import type { Kit } from "@/data/kits";
import { AFFILIATE_TOOLS } from "@/data/affiliate-tools";
import { buildAffiliateUrl, getRecommendedToolsForKit } from "@/lib/affiliate";

interface RecommendedToolsProps {
  kit: Kit;
  /** Override the default 3-tool limit. */
  limit?: number;
}

export function RecommendedTools({ kit, limit = 3 }: RecommendedToolsProps) {
  const tools = getRecommendedToolsForKit(kit, AFFILIATE_TOOLS, limit);
  if (tools.length === 0) return null;

  return (
    <section className="mt-16" aria-label="Recommended tools">
      <span className="eyebrow">Pairs well with</span>
      <h2 className="display text-2xl mt-2 mb-2">Tools we recommend with this kit.</h2>
      <p className="text-sm text-[var(--muted)] mb-6 leading-relaxed">
        Hand-picked companions to the kit&apos;s workflow. Lumenari customers tend
        to use these alongside the prompts inside.
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
        Disclosure: we may earn a commission from links in this section. We only
        recommend tools we use ourselves.
      </p>
    </section>
  );
}

import { z } from "zod";
import { anthropic, RECOMMENDER_MODEL } from "./anthropic";
import { KITS, type Kit } from "@/data/kits";
import type Anthropic from "@anthropic-ai/sdk";

/**
 * Shared recommendation engine.
 *
 * Lifted out of `src/app/api/recommend/route.ts` (the wizard) so the public
 * /api/v1/recommend route can call the same logic without duplicating the
 * model prompt or the heuristic fallback. The wizard route still imports
 * its own implementation for now — kept separate to avoid touching that file
 * in this batch.
 */

export interface Ranked {
  slug: string;
  reason: string;
}

export interface RecommendInput {
  aiPlatform: string;
  useCase: string;
  maxResults: number;
}

export interface RecommendOutput {
  recommendations: Array<{
    kit_id: string;
    kit_slug: string;
    kit_name: string;
    score: number;
    reasoning: string;
  }>;
  fallback: boolean;
}

export async function recommendKits(
  input: RecommendInput,
): Promise<RecommendOutput> {
  const { aiPlatform, useCase, maxResults } = input;

  try {
    const ranked = await rankWithModel(aiPlatform, useCase, maxResults);
    if (ranked.length > 0) {
      return { recommendations: hydrate(ranked, maxResults), fallback: false };
    }
    return {
      recommendations: hydrate(
        heuristicRank(aiPlatform, useCase, maxResults),
        maxResults,
      ),
      fallback: true,
    };
  } catch (err) {
    console.error("[recommender] model error, falling back:", err);
    return {
      recommendations: hydrate(
        heuristicRank(aiPlatform, useCase, maxResults),
        maxResults,
      ),
      fallback: true,
    };
  }
}

function hydrate(ranked: Ranked[], max: number) {
  return ranked.slice(0, max).map((r, i) => {
    const kit = KITS.find((k) => k.slug === r.slug);
    return {
      kit_id: kit?.id ?? r.slug,
      kit_slug: r.slug,
      kit_name: kit?.name ?? r.slug,
      // Cheap monotonically-decreasing score for ranking consumers that want
      // to filter / threshold. Top result = 1.0, last = 0.5.
      score: Number((1 - i * (0.5 / Math.max(1, max - 1))).toFixed(3)),
      reasoning: r.reason,
    };
  });
}

// --------------------------------------------------------------------
// Model-driven ranking
// --------------------------------------------------------------------

async function rankWithModel(
  ai: string,
  useCase: string,
  maxResults: number,
): Promise<Ranked[]> {
  const catalogJson = KITS.map((k) => ({
    slug: k.slug,
    name: k.name,
    tagline: k.tagline,
    ai_targets: k.aiTargets,
    keywords: k.keywords,
  }));

  const system = `You are Lumenari's kit recommender.
You will be given a customer's AI of choice and a short description of what
they're using AI for. From the catalog, pick the 1–${maxResults} kits that fit best.

Rules:
- Only return slugs from the catalog.
- Order from best fit to weakest. Prefer 1–2 strong matches over more mediocre ones.
- Each reason is one sentence, plain English, second person ("you" / "your").
- Do not invent kits.

Respond with ONLY JSON in this exact shape:
{"recommendations":[{"slug":"...","reason":"..."}]}`;

  const user = `Customer AI: ${ai}
Customer use case: ${useCase}

Catalog:
${JSON.stringify(catalogJson, null, 2)}`;

  const msg = await anthropic().messages.create({
    model: RECOMMENDER_MODEL,
    max_tokens: 800,
    temperature: 0.2,
    system,
    messages: [{ role: "user", content: user }],
  });

  const text = msg.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  const json = extractJson(text);
  if (!json) return [];

  const Out = z.object({
    recommendations: z
      .array(
        z.object({
          slug: z.string(),
          reason: z.string().min(1).max(400),
        }),
      )
      .min(1)
      .max(10),
  });

  const parsed = Out.safeParse(json);
  if (!parsed.success) return [];

  const known = new Set(KITS.map((k) => k.slug));
  return parsed.data.recommendations.filter((r) => known.has(r.slug));
}

function extractJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return null;
    try {
      return JSON.parse(text.slice(start, end + 1));
    } catch {
      return null;
    }
  }
}

// --------------------------------------------------------------------
// Heuristic fallback (mirrors the wizard's fallback)
// --------------------------------------------------------------------

function heuristicRank(ai: string, useCase: string, max: number): Ranked[] {
  const haystack = `${ai} ${useCase}`.toLowerCase();
  type Scored = { kit: Kit; score: number };

  const scored: Scored[] = KITS.map((kit) => {
    let score = 0;
    for (const kw of kit.keywords) {
      if (haystack.includes(kw.toLowerCase())) score += 2;
    }
    const aiKey = ai.toLowerCase();
    if (kit.aiTargets.some((t) => t === aiKey)) score += 1;
    if (kit.aiTargets.includes("any")) score += 0.25;
    return { kit, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, max).filter((s) => s.score > 0);
  const picks =
    top.length > 0
      ? top
      : scored.filter((s) => s.kit.aiTargets.includes("any")).slice(0, max);

  return picks.map((s) => ({
    slug: s.kit.slug,
    reason: `Matches what you described — ${s.kit.tagline.replace(/\.$/, "")}.`,
  }));
}

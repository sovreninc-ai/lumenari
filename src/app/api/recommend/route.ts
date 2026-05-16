import { NextResponse } from "next/server";
import { z } from "zod";
import { anthropic, RECOMMENDER_MODEL } from "@/lib/anthropic";
import { KITS, type Kit } from "@/data/kits";

/**
 * POST /api/recommend
 *
 * Body: { ai: string, useCase: string }
 * Returns: { recommendations: [{ slug, reason }], fallback?: boolean }
 *
 * Implementation notes:
 *   1. Cheap keyword pre-filter shrinks the catalog passed to the model.
 *   2. Anthropic call asks for JSON; we parse + validate + clamp to known
 *      slugs so a hallucinated kit never leaks to the UI.
 *   3. On any error we return a deterministic heuristic ranking so the
 *      wizard always has something to show.
 *   4. No caching layer yet — see PARKING-LOT.md. For MVP launch the cost
 *      is negligible.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  ai: z.string().min(1).max(40),
  useCase: z.string().min(4).max(800),
});

interface Ranked {
  slug: string;
  reason: string;
}

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
  const { ai, useCase } = parsed;

  // Try the model, fall back to heuristic on any failure.
  try {
    const ranked = await rankWithModel(ai, useCase);
    if (ranked.length > 0) {
      return NextResponse.json({ recommendations: ranked });
    }
    return NextResponse.json({
      recommendations: heuristicRank(ai, useCase),
      fallback: true,
    });
  } catch (err) {
    console.error("[recommend] model error, falling back:", err);
    return NextResponse.json({
      recommendations: heuristicRank(ai, useCase),
      fallback: true,
    });
  }
}

// --------------------------------------------------------------------
// Model-driven ranking
// --------------------------------------------------------------------

async function rankWithModel(ai: string, useCase: string): Promise<Ranked[]> {
  const catalogJson = KITS.map((k) => ({
    slug: k.slug,
    name: k.name,
    tagline: k.tagline,
    ai_targets: k.aiTargets,
    keywords: k.keywords,
  }));

  const system = `You are Lumenari's kit recommender.
You will be given a customer's AI of choice and a short description of what
they're using AI for. From the catalog, pick the 1–3 kits that fit best.

Rules:
- Only return slugs from the catalog.
- Order from best fit to weakest. Prefer 1–2 strong matches over 3 mediocre.
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
    max_tokens: 600,
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
          reason: z.string().min(1).max(280),
        }),
      )
      .min(1)
      .max(3),
  });

  const parsed = Out.safeParse(json);
  if (!parsed.success) return [];

  // Clamp to known slugs only.
  const known = new Set(KITS.map((k) => k.slug));
  return parsed.data.recommendations.filter((r) => known.has(r.slug));
}

function extractJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    // Try to slice out the first {...} block in case the model wrapped it.
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
// Heuristic fallback
// --------------------------------------------------------------------

function heuristicRank(ai: string, useCase: string): Ranked[] {
  const haystack = `${ai} ${useCase}`.toLowerCase();
  type Scored = { kit: Kit; score: number };
  const scored: Scored[] = KITS.map((kit) => {
    let score = 0;
    for (const kw of kit.keywords) {
      if (haystack.includes(kw.toLowerCase())) score += 2;
    }
    // AI alignment bonus
    const aiKey = ai.toLowerCase();
    if (kit.aiTargets.some((t) => t === aiKey)) score += 1;
    if (kit.aiTargets.includes("any")) score += 0.25;
    return { kit, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, 3).filter((s) => s.score > 0);

  // If nothing matched at all, return the three any-AI generalists.
  const picks = top.length > 0 ? top : scored.filter(
    (s) => s.kit.aiTargets.includes("any"),
  ).slice(0, 3);

  return picks.map((s) => ({
    slug: s.kit.slug,
    reason: defaultReason(s.kit),
  }));
}

function defaultReason(kit: Kit): string {
  return `Matches what you described — ${kit.tagline.replace(/\.$/, "")}.`;
}

// Anthropic SDK type re-export shortcut so TS knows what TextBlock is.
import type Anthropic from "@anthropic-ai/sdk";

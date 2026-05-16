import { NextResponse } from "next/server";
import { z } from "zod";
import {
  requireApiKey,
  checkRateLimit,
  logUsage,
  apiError,
} from "@/lib/api-auth";
import { recommendKits } from "@/lib/recommender";

/**
 * POST /api/v1/recommend
 *
 * Public API wrapper around Lumenari's recommendation engine. Same logic
 * as the wizard's internal /api/recommend, but: auth required, rate
 * limited, structured response, usage logged.
 *
 * Request:
 *   Authorization: Bearer lmn_<key>
 *   Content-Type:  application/json
 *
 *   {
 *     "ai_platform": "claude" | "chatgpt" | "codex" | "gemini" | "cursor" | "any",
 *     "use_case":    "I'm shipping a SaaS on Next.js",
 *     "max_results": 3   // optional, default 3, max 10
 *   }
 *
 * Response:
 *   {
 *     "recommendations": [
 *       { "kit_id": "...", "kit_slug": "...", "kit_name": "...",
 *         "score": 0.95, "reasoning": "..." }
 *     ],
 *     "fallback": false
 *   }
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  ai_platform: z
    .enum(["claude", "claude-code", "chatgpt", "codex", "gemini", "cursor", "any"])
    .optional()
    .default("any"),
  use_case: z.string().min(4).max(800),
  max_results: z.number().int().min(1).max(10).optional().default(3),
});

const ENDPOINT = "/api/v1/recommend";

export async function POST(req: Request) {
  const started = Date.now();

  const auth = await requireApiKey(req);
  if (auth instanceof NextResponse) return auth;

  const limit = await checkRateLimit(auth.account, auth.tier);
  if (limit instanceof NextResponse) {
    await logUsage({
      accountId: auth.account.id,
      apiKeyId: auth.apiKey.id,
      endpoint: ENDPOINT,
      status: 429,
      durationMs: Date.now() - started,
    });
    return limit;
  }

  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch (err) {
    await logUsage({
      accountId: auth.account.id,
      apiKeyId: auth.apiKey.id,
      endpoint: ENDPOINT,
      status: 400,
      durationMs: Date.now() - started,
    });
    return apiError(
      400,
      "invalid_request",
      err instanceof z.ZodError
        ? `Invalid body: ${err.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`
        : "Invalid JSON body.",
      limit.headers,
    );
  }

  try {
    const result = await recommendKits({
      aiPlatform: parsed.ai_platform,
      useCase: parsed.use_case,
      maxResults: parsed.max_results,
    });

    const status = 200;
    await logUsage({
      accountId: auth.account.id,
      apiKeyId: auth.apiKey.id,
      endpoint: ENDPOINT,
      status,
      durationMs: Date.now() - started,
      metadata: {
        ai_platform: parsed.ai_platform,
        use_case_chars: parsed.use_case.length,
        max_results: parsed.max_results,
        result_count: result.recommendations.length,
        fallback: result.fallback,
      },
    });

    return NextResponse.json(result, {
      status,
      headers: limit.headers,
    });
  } catch (err) {
    console.error("[v1 recommend] handler failed:", err);
    await logUsage({
      accountId: auth.account.id,
      apiKeyId: auth.apiKey.id,
      endpoint: ENDPOINT,
      status: 500,
      durationMs: Date.now() - started,
    });
    return apiError(
      500,
      "internal_error",
      "Recommendation engine failed.",
      limit.headers,
    );
  }
}

import { NextResponse } from "next/server";
import { requireApiKey, checkRateLimit, logUsage } from "@/lib/api-auth";
import { KITS, type AiTarget } from "@/data/kits";
import { serializeKit } from "@/lib/kit-serializer";

/**
 * GET /api/v1/kits
 *
 * Paginated catalog listing.
 *
 *   ?limit=50&offset=0          pagination
 *   ?ai_target=claude           filter to kits targeting this AI
 *   ?keyword=stripe             plain substring match against keywords + name
 *
 * Response:
 *   {
 *     "kits": [
 *       { "id", "slug", "name", "tagline", "description",
 *         "price_cents", "ai_targets", "personas", "keywords",
 *         "whats_inside", "deliverables" }
 *     ],
 *     "pagination": { "total": 20, "limit": 50, "offset": 0 }
 *   }
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ENDPOINT = "/api/v1/kits";

const AI_TARGETS: AiTarget[] = [
  "claude",
  "claude-code",
  "chatgpt",
  "codex",
  "gemini",
  "cursor",
  "any",
];

export async function GET(req: Request) {
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

  const url = new URL(req.url);
  const limitParam = Math.min(
    100,
    Math.max(1, Number(url.searchParams.get("limit") ?? "50") || 50),
  );
  const offsetParam = Math.max(
    0,
    Number(url.searchParams.get("offset") ?? "0") || 0,
  );
  const aiTargetRaw = url.searchParams.get("ai_target");
  const aiTarget =
    aiTargetRaw && (AI_TARGETS as string[]).includes(aiTargetRaw)
      ? (aiTargetRaw as AiTarget)
      : null;
  const keyword = (url.searchParams.get("keyword") ?? "").trim().toLowerCase();

  let filtered = KITS.filter((k) => !k.bundleOnly);
  if (aiTarget) {
    filtered = filtered.filter((k) => k.aiTargets.includes(aiTarget));
  }
  if (keyword) {
    filtered = filtered.filter(
      (k) =>
        k.name.toLowerCase().includes(keyword) ||
        k.keywords.some((kw) => kw.toLowerCase().includes(keyword)),
    );
  }

  const total = filtered.length;
  const slice = filtered.slice(offsetParam, offsetParam + limitParam);
  const kits = slice.map(serializeKit);

  const status = 200;
  await logUsage({
    accountId: auth.account.id,
    apiKeyId: auth.apiKey.id,
    endpoint: ENDPOINT,
    status,
    durationMs: Date.now() - started,
    metadata: {
      total,
      returned: kits.length,
      ai_target: aiTarget ?? null,
      keyword: keyword || null,
    },
  });

  return NextResponse.json(
    {
      kits,
      pagination: { total, limit: limitParam, offset: offsetParam },
    },
    { headers: limit.headers },
  );
}



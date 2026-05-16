import { NextResponse } from "next/server";
import {
  requireApiKey,
  checkRateLimit,
  logUsage,
  apiError,
} from "@/lib/api-auth";
import { KITS } from "@/data/kits";
import { serializeKit } from "@/lib/kit-serializer";

/**
 * GET /api/v1/kits/{idOrSlug}
 *
 * Single-kit lookup, by id or slug. Returns full metadata + the deliverable
 * file list — but NOT file contents. Use /api/v1/kits/{id}/download for
 * actual content (Pro tier and above).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ idOrSlug: string }>;
}

export async function GET(req: Request, { params }: Params) {
  const started = Date.now();
  const { idOrSlug } = await params;
  const endpoint = `/api/v1/kits/${idOrSlug}`;

  const auth = await requireApiKey(req);
  if (auth instanceof NextResponse) return auth;

  const limit = await checkRateLimit(auth.account, auth.tier);
  if (limit instanceof NextResponse) {
    await logUsage({
      accountId: auth.account.id,
      apiKeyId: auth.apiKey.id,
      endpoint,
      status: 429,
      durationMs: Date.now() - started,
    });
    return limit;
  }

  const kit = KITS.find((k) => k.id === idOrSlug || k.slug === idOrSlug);
  if (!kit) {
    await logUsage({
      accountId: auth.account.id,
      apiKeyId: auth.apiKey.id,
      endpoint,
      status: 404,
      durationMs: Date.now() - started,
    });
    return apiError(404, "not_found", `Kit not found: ${idOrSlug}`, limit.headers);
  }

  await logUsage({
    accountId: auth.account.id,
    apiKeyId: auth.apiKey.id,
    endpoint,
    status: 200,
    durationMs: Date.now() - started,
    metadata: { kit_slug: kit.slug },
  });

  return NextResponse.json({ kit: serializeKit(kit) }, { headers: limit.headers });
}

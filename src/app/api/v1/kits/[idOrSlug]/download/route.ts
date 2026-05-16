import { NextResponse } from "next/server";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import {
  requireApiKey,
  checkRateLimit,
  logUsage,
  apiError,
} from "@/lib/api-auth";
import { KITS, type Kit } from "@/data/kits";

/**
 * GET /api/v1/kits/{idOrSlug}/download
 *
 * Pro tier and above. Returns the concatenated kit markdown either inline
 * (text/markdown) by default, or as a one-time signed URL when
 * ?format=signed_url is passed (placeholder for future Supabase Storage
 * migration — for now we just inline).
 *
 * Free tier → 402 with upgrade message.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ idOrSlug: string }>;
}

const ALLOWED_TIERS = new Set(["pro", "business", "enterprise"]);

export async function GET(req: Request, { params }: Params) {
  const started = Date.now();
  const { idOrSlug } = await params;
  const endpoint = `/api/v1/kits/${idOrSlug}/download`;

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

  if (!ALLOWED_TIERS.has(auth.tier.id)) {
    await logUsage({
      accountId: auth.account.id,
      apiKeyId: auth.apiKey.id,
      endpoint,
      status: 402,
      durationMs: Date.now() - started,
      metadata: { tier: auth.tier.id },
    });
    return apiError(
      402,
      "tier_required",
      "Kit downloads require the Pro tier or higher.",
      limit.headers,
    );
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

  let body: string;
  try {
    body = await buildKitDocument(kit);
  } catch (err) {
    console.error("[v1 download] content missing:", err);
    await logUsage({
      accountId: auth.account.id,
      apiKeyId: auth.apiKey.id,
      endpoint,
      status: 500,
      durationMs: Date.now() - started,
    });
    return apiError(
      500,
      "content_unavailable",
      "Kit content is not present on the server.",
      limit.headers,
    );
  }

  await logUsage({
    accountId: auth.account.id,
    apiKeyId: auth.apiKey.id,
    endpoint,
    status: 200,
    durationMs: Date.now() - started,
    metadata: { kit_slug: kit.slug, bytes: body.length },
  });

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${kit.slug}.md"`,
      "Cache-Control": "private, no-store",
      ...limit.headers,
    },
  });
}

/**
 * Mirrors the storefront's `buildKitDocument` (kept private here so the
 * public API doesn't depend on the storefront's locale fallback machinery).
 */
async function buildKitDocument(kit: Kit): Promise<string> {
  const baseDir = path.join(process.cwd(), "content", kit.slug);
  await stat(baseDir); // throws if missing

  const sections: string[] = [
    `# ${kit.name}`,
    `> ${kit.tagline}`,
    "",
    `**Optimized for:** ${kit.aiTargets.join(" · ")}`,
    "",
    "---",
    "",
  ];

  for (const rel of kit.deliverables) {
    let content: string;
    try {
      content = await readFile(path.join(baseDir, rel), "utf-8");
    } catch {
      content = `_(file ${rel} not yet present)_`;
    }
    sections.push(`\n\n# === ${rel} ===\n\n`);
    sections.push(content.trim());
    sections.push("\n\n---\n");
  }

  return sections.join("\n");
}

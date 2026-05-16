import { NextResponse } from "next/server";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { supabaseService } from "@/lib/supabase";
import { getKit, type Kit } from "@/data/kits";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/locales";

/**
 * GET /api/download/[slug]?p=<purchaseId>&t=<accessToken>
 *
 * Validates the access token against the purchase, confirms the kit slug
 * is included in the purchase, then returns the kit content as a single
 * concatenated Markdown file with section dividers.
 *
 * MVP simplification: we ship one .md per kit instead of a zip — easier
 * to drop into a Claude/Cursor project. When we want true multi-file
 * bundles we'll move to Supabase Storage + signed URLs and add `archiver`.
 *
 * Audit: every successful hit increments `purchase_downloads`.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(req: Request, { params }: Params) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const purchaseId = searchParams.get("p");
  const token = searchParams.get("t");
  const requestedLocaleRaw = searchParams.get("locale");
  const requestedLocale: Locale | null =
    requestedLocaleRaw && isLocale(requestedLocaleRaw)
      ? requestedLocaleRaw
      : null;

  if (!purchaseId || !token) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const kit = getKit(slug);
  if (!kit) {
    return NextResponse.json({ error: "Unknown kit" }, { status: 404 });
  }

  const db = supabaseService();
  const { data: purchase, error } = await db
    .from("purchases")
    .select("id, kit_ids, access_token, pro, pro_status")
    .eq("id", purchaseId)
    .maybeSingle();

  if (error || !purchase) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (purchase.access_token !== token) {
    return NextResponse.json({ error: "Bad token" }, { status: 403 });
  }

  // Pro+ members can download anything in the catalog. One-off buyers can
  // only download what's in kit_ids.
  const isPro =
    Boolean(purchase.pro) && purchase.pro_status !== "cancelled";
  const owns = (purchase.kit_ids as string[]).includes(slug);
  if (!isPro && !owns) {
    return NextResponse.json(
      { error: "This kit is not part of your purchase" },
      { status: 403 },
    );
  }

  // Build the concatenated markdown. Try the requested locale first; fall
  // back to English (default) if the kit hasn't been translated yet.
  let body: string;
  let servedLocale: Locale = DEFAULT_LOCALE;
  try {
    const built = await buildKitDocument(kit, requestedLocale);
    body = built.body;
    servedLocale = built.locale;
  } catch (err) {
    console.error("[download] content missing:", err);
    return NextResponse.json(
      { error: "Kit content not present on server" },
      { status: 500 },
    );
  }

  // Bump the counter (best-effort).
  await db
    .from("purchase_downloads")
    .upsert(
      {
        purchase_id: purchaseId,
        kit_id: slug,
        download_count: 1,
        last_downloaded_at: new Date().toISOString(),
      },
      { onConflict: "purchase_id,kit_id" },
    )
    .then(
      () => null,
      (e: unknown) => console.error("[download] counter:", e),
    );

  const filenameSuffix =
    servedLocale !== DEFAULT_LOCALE ? `.${servedLocale}` : "";

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}${filenameSuffix}.md"`,
      "Cache-Control": "private, no-store",
      "X-Lumenari-Locale": servedLocale,
    },
  });
}

/**
 * Build the concatenated kit document. If a `locale` is requested AND every
 * deliverable exists under `content/<slug>/<locale>/...`, serve that. If even
 * one file is missing, fall back to the English default (content/<slug>/...).
 *
 * Returning the served locale lets the response set the filename + a header
 * the client can read.
 */
async function buildKitDocument(
  kit: Kit,
  requestedLocale: Locale | null,
): Promise<{ body: string; locale: Locale }> {
  const baseDir = path.join(process.cwd(), "content", kit.slug);
  await stat(baseDir); // throws if missing

  let servedLocale: Locale = DEFAULT_LOCALE;
  let localeDir: string | null = null;

  if (requestedLocale && requestedLocale !== DEFAULT_LOCALE) {
    const candidate = path.join(baseDir, requestedLocale);
    try {
      await stat(candidate);
      // Check at least the SKILL.md is present in the locale; if not, fall back.
      const skill = kit.deliverables.find((d) => d === "SKILL.md");
      if (skill) {
        try {
          await stat(path.join(candidate, skill));
          localeDir = candidate;
          servedLocale = requestedLocale;
        } catch {
          /* fall through to English */
        }
      } else {
        localeDir = candidate;
        servedLocale = requestedLocale;
      }
    } catch {
      /* directory not present → English fallback */
    }
  }

  const dir = localeDir ?? baseDir;

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
    // Try locale-specific file first, then fall back to base path per-file
    // so partial translations are graceful.
    let content: string | null = null;
    if (localeDir) {
      try {
        content = await readFile(path.join(localeDir, rel), "utf-8");
      } catch {
        content = null;
      }
    }
    if (content === null) {
      try {
        content = await readFile(path.join(baseDir, rel), "utf-8");
      } catch {
        content = `_(file ${rel} not yet present)_`;
      }
    }
    sections.push(`\n\n# === ${rel} ===\n\n`);
    sections.push(content.trim());
    sections.push("\n\n---\n");
  }

  return { body: sections.join("\n"), locale: servedLocale };
}

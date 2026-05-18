import { NextResponse } from "next/server";
import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { PassThrough } from "node:stream";
// archiver v8 is pure ESM and exports named classes only — no default export
// and no `archiver("zip", opts)` factory. The @types package is still on v7
// (which declares only the old factory), so we re-type the named import.
// @ts-expect-error: @types/archiver v7 doesn't declare v8's named exports
import { ZipArchive as ZipArchiveRaw } from "archiver";
type ZipArchiveInstance = {
  on(event: "warning" | "error", cb: (err: Error) => void): void;
  pipe(dest: NodeJS.WritableStream): void;
  append(
    source: NodeJS.ReadableStream | Buffer | string,
    data: { name: string },
  ): void;
  finalize(): Promise<void>;
};
const ZipArchive = ZipArchiveRaw as unknown as new (opts?: {
  zlib?: { level?: number };
}) => ZipArchiveInstance;
import { supabaseService } from "@/lib/supabase";
import { getBundle, getKit, type Kit } from "@/data/kits";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/locales";

/**
 * GET /api/download/[slug]?p=<purchaseId>&t=<accessToken>
 *
 * Validates the access token against the purchase, confirms the kit (or
 * bundle) slug is included in the purchase, then streams a ZIP archive:
 *
 *   01-Welcome-to-Lumenari.pdf      ← branded onboarding PDF, ships with EVERY kit
 *   SKILL.md
 *   memory.md
 *   optimization-pack.md
 *   custom-gpt-instructions.md
 *   quick-start.md
 *   patterns/...                    ← any kit-specific reference docs
 *
 * For bundle slugs, the archive nests each kit under `kits/<slug>/`:
 *
 *   01-Welcome-to-Lumenari.pdf
 *   kits/ts-next-production/SKILL.md
 *   kits/ts-next-production/memory.md
 *   ...
 *
 * Audit: every successful hit bumps `purchase_downloads`.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ slug: string }>;
}

const WELCOME_PDF_NAME = "01-Welcome-to-Lumenari.pdf";

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

  // Slug can resolve to either a single kit or a bundle (multiple kits).
  const bundle = getBundle(slug);
  const kit = bundle ? null : getKit(slug);
  if (!bundle && !kit) {
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
  // only download what's in kit_ids (which, for bundle purchases, has been
  // expanded into individual kit slugs at fulfillment time).
  const purchasedKitIds = purchase.kit_ids as string[];
  const isPro = Boolean(purchase.pro) && purchase.pro_status !== "cancelled";

  const kitsToShip: Kit[] = bundle
    ? bundle.kitSlugs
        .map((s) => getKit(s))
        .filter((k): k is Kit => Boolean(k))
    : [kit as Kit];

  if (!isPro) {
    const owns = bundle
      ? bundle.kitSlugs.every((s) => purchasedKitIds.includes(s))
      : purchasedKitIds.includes((kit as Kit).slug);
    if (!owns) {
      return NextResponse.json(
        { error: "This kit is not part of your purchase" },
        { status: 403 },
      );
    }
  }

  // Welcome PDF lives in /public/lumenari-welcome.pdf — same file ships
  // with every kit purchase (it's kit-agnostic onboarding).
  const welcomePdfPath = path.join(
    process.cwd(),
    "public",
    "lumenari-welcome.pdf",
  );
  try {
    await stat(welcomePdfPath);
  } catch {
    console.error("[download] welcome PDF missing at", welcomePdfPath);
    return NextResponse.json(
      { error: "Server is missing the welcome PDF" },
      { status: 500 },
    );
  }

  // Build the archive. We stream-pipe into a PassThrough so we can hand
  // the response a Web ReadableStream.
  const passthrough = new PassThrough();
  const archive = new ZipArchive({ zlib: { level: 9 } });

  let servedLocale: Locale = DEFAULT_LOCALE;
  let archiveError: Error | null = null;

  archive.on("warning", (err: Error) => {
    console.warn("[download] archive warning:", err);
  });
  archive.on("error", (err: Error) => {
    archiveError = err;
    console.error("[download] archive error:", err);
  });
  archive.pipe(passthrough);

  // 1. The welcome PDF — always first.
  archive.append(createReadStream(welcomePdfPath), {
    name: WELCOME_PDF_NAME,
  });

  // 2. Kit content. For a single kit: flat layout. For a bundle: per-kit
  // subfolders under `kits/`.
  for (const k of kitsToShip) {
    const { files, locale } = await collectKitFiles(k, requestedLocale);
    // First successful locale wins for the response header / filename.
    if (locale !== DEFAULT_LOCALE && servedLocale === DEFAULT_LOCALE) {
      servedLocale = locale;
    }
    const prefix = bundle ? `kits/${k.slug}/` : "";
    for (const f of files) {
      archive.append(f.content, { name: `${prefix}${f.rel}` });
    }
  }

  // Finalize. The promise resolves when the archive is fully written to
  // the PassThrough — we don't await it before responding because Next.js
  // will stream the body for us.
  archive.finalize().catch((e) => {
    archiveError = e instanceof Error ? e : new Error(String(e));
    console.error("[download] archive finalize error:", e);
  });

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

  // Note: if `archiveError` was set synchronously above, we'd surface it
  // here. Async errors will tear the stream — the client will see a
  // truncated/invalid zip, but the server-side log captures the cause.
  if (archiveError) {
    return NextResponse.json(
      { error: "Failed to build archive" },
      { status: 500 },
    );
  }

  // Convert Node Readable → Web ReadableStream for the Response.
  const webStream = nodeReadableToWebStream(passthrough);

  const filenameBase = bundle ? bundle.slug : (kit as Kit).slug;
  return new NextResponse(webStream, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="Lumenari-${filenameBase}.zip"`,
      "Cache-Control": "private, no-store",
      "X-Lumenari-Locale": servedLocale,
    },
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface KitFile {
  rel: string;
  content: Buffer;
}

/**
 * Read every deliverable for a kit. If a locale is requested AND the
 * locale-specific file exists, prefer it. Falls back per-file to English so
 * partial translations are graceful.
 */
async function collectKitFiles(
  kit: Kit,
  requestedLocale: Locale | null,
): Promise<{ files: KitFile[]; locale: Locale }> {
  const baseDir = path.join(process.cwd(), "content", kit.slug);
  await stat(baseDir); // throws if missing — caller treats as 500

  let servedLocale: Locale = DEFAULT_LOCALE;
  let localeDir: string | null = null;

  if (requestedLocale && requestedLocale !== DEFAULT_LOCALE) {
    const candidate = path.join(baseDir, requestedLocale);
    try {
      await stat(candidate);
      // Sanity check: at least SKILL.md should be translated. If not,
      // English fallback for the whole kit.
      if (kit.deliverables.includes("SKILL.md")) {
        try {
          await stat(path.join(candidate, "SKILL.md"));
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

  const files: KitFile[] = [];
  for (const rel of kit.deliverables) {
    let content: Buffer | null = null;
    if (localeDir) {
      try {
        content = await readFile(path.join(localeDir, rel));
      } catch {
        content = null;
      }
    }
    if (content === null) {
      try {
        content = await readFile(path.join(baseDir, rel));
      } catch {
        // File listed in catalog but not present on disk — surface as a
        // placeholder so the buyer isn't left wondering why a promised
        // file is missing.
        content = Buffer.from(
          `_(file ${rel} not yet present — email hello@lumenari.io if you need it.)_\n`,
          "utf8",
        );
      }
    }
    files.push({ rel, content });
  }

  return { files, locale: servedLocale };
}

/**
 * Bridge a Node Readable stream to a Web ReadableStream so a Next.js
 * Response can consume it. `archiver` produces Node streams; the Web API
 * needs a `ReadableStream<Uint8Array>`.
 */
function nodeReadableToWebStream(
  src: NodeJS.ReadableStream,
): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      src.on("data", (chunk: Buffer | string) => {
        const buf =
          typeof chunk === "string" ? Buffer.from(chunk) : (chunk as Buffer);
        controller.enqueue(new Uint8Array(buf));
      });
      src.on("end", () => controller.close());
      src.on("error", (err) => controller.error(err));
    },
    cancel() {
      // Best-effort: if the consumer aborts, stop the source.
      const maybeDestroyable = src as unknown as { destroy?: () => void };
      if (typeof maybeDestroyable.destroy === "function") {
        maybeDestroyable.destroy();
      }
    },
  });
}


import { NextResponse } from "next/server";
import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { PassThrough } from "node:stream";
// archiver v8 is pure ESM and exports named classes only — no default export
// and no `archiver("zip", opts)` factory. @types/archiver is still v7, so we
// re-type the named import. Same pattern as src/app/api/download/[slug]/route.ts.
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
import { z } from "zod";
import { supabaseService } from "@/lib/supabase";
import { getKit, type Kit } from "@/data/kits";

/**
 * GET /api/lead-magnet/download/[slug]?lead=<leadId>
 *
 * Free-kit download for newsletter subscribers + lead-magnet claimers.
 * Streams a ZIP archive with the same shape as the paid /api/download
 * route — branded welcome PDF + every kit deliverable — minus the
 * purchase-token check. The kit slug must be on the FREE_MAGNET_SLUGS
 * allow-list.
 *
 *   Lumenari-<slug>.zip
 *     01-Welcome-to-Lumenari.pdf
 *     SKILL.md
 *     memory.md
 *     optimization-pack.md
 *     custom-gpt-instructions.md
 *     quick-start.md
 *     templates/...
 *     playbooks/...
 *
 * If `lead=<uuid>` is provided we validate it against the leads table —
 * an unsubscribed lead can't pull the kit. Without `lead` the slug is
 * served directly because the allow-list IS the public free-magnet set.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Allow-list — only kits we explicitly distribute as free magnets.
const FREE_MAGNET_SLUGS = new Set<string>([
  "resume-job-search",
  "solopreneur-toolkit",
]);

const WELCOME_PDF_NAME = "01-Welcome-to-Lumenari.pdf";

const Query = z.object({
  lead: z.string().uuid().optional(),
});

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(req: Request, { params }: Params) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const queryParsed = Query.safeParse({
    lead: searchParams.get("lead") ?? undefined,
  });
  if (!queryParsed.success) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const leadId = queryParsed.data.lead;

  if (!FREE_MAGNET_SLUGS.has(slug)) {
    return NextResponse.json(
      { error: "That kit isn't part of the free magnet program." },
      { status: 403 },
    );
  }

  const kit = getKit(slug);
  if (!kit) {
    return NextResponse.json({ error: "Unknown kit" }, { status: 404 });
  }

  if (leadId) {
    const db = supabaseService();
    const { data: lead } = await db
      .from("leads")
      .select("id, claimed_kit_slug, unsubscribed_at")
      .eq("id", leadId)
      .maybeSingle();
    if (!lead) {
      return NextResponse.json({ error: "Unknown lead" }, { status: 404 });
    }
    if (lead.unsubscribed_at) {
      return NextResponse.json(
        { error: "This lead is unsubscribed." },
        { status: 403 },
      );
    }
    if (lead.claimed_kit_slug && lead.claimed_kit_slug !== slug) {
      return NextResponse.json(
        { error: "Wrong kit for this lead." },
        { status: 403 },
      );
    }
  }
  // No leadId → public allow-list path. Direct-link sharing of the free
  // kit is acceptable.

  // Welcome PDF — same file ships with paid kits (kit-agnostic onboarding).
  const welcomePdfPath = path.join(
    process.cwd(),
    "public",
    "lumenari-welcome.pdf",
  );
  try {
    await stat(welcomePdfPath);
  } catch {
    console.error("[lead-magnet-download] welcome PDF missing at", welcomePdfPath);
    return NextResponse.json(
      { error: "Server is missing the welcome PDF" },
      { status: 500 },
    );
  }

  const passthrough = new PassThrough();
  const archive = new ZipArchive({ zlib: { level: 9 } });
  let archiveError: Error | null = null;

  archive.on("warning", (err) => {
    console.warn("[lead-magnet-download] archive warning:", err);
  });
  archive.on("error", (err) => {
    archiveError = err;
    console.error("[lead-magnet-download] archive error:", err);
  });
  archive.pipe(passthrough);

  // 1. Welcome PDF — always first.
  archive.append(createReadStream(welcomePdfPath), {
    name: WELCOME_PDF_NAME,
  });

  // 2. Kit content (English only — translated free magnets aren't a thing yet).
  let files: KitFile[];
  try {
    files = await collectKitFiles(kit);
  } catch (err) {
    console.error("[lead-magnet-download] content missing:", err);
    return NextResponse.json(
      { error: "Kit content not present on server" },
      { status: 500 },
    );
  }
  for (const f of files) {
    archive.append(f.content, { name: f.rel });
  }

  archive.finalize().catch((e) => {
    archiveError = e instanceof Error ? e : new Error(String(e));
    console.error("[lead-magnet-download] archive finalize error:", e);
  });

  if (archiveError) {
    return NextResponse.json(
      { error: "Failed to build archive" },
      { status: 500 },
    );
  }

  const webStream = nodeReadableToWebStream(passthrough);
  return new NextResponse(webStream, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="Lumenari-${slug}.zip"`,
      "Cache-Control": "private, no-store",
    },
  });
}

// ---------------------------------------------------------------------------
// Helpers (English-only; mirrors the simpler half of the paid route).
// ---------------------------------------------------------------------------

interface KitFile {
  rel: string;
  content: Buffer;
}

async function collectKitFiles(kit: Kit): Promise<KitFile[]> {
  const baseDir = path.join(process.cwd(), "content", kit.slug);
  await stat(baseDir);
  const out: KitFile[] = [];
  for (const rel of kit.deliverables) {
    let content: Buffer;
    try {
      content = await readFile(path.join(baseDir, rel));
    } catch {
      content = Buffer.from(
        `_(file ${rel} not yet present — email hello@lumenari.io if you need it.)_\n`,
        "utf8",
      );
    }
    out.push({ rel, content });
  }
  return out;
}

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
      const maybeDestroyable = src as unknown as { destroy?: () => void };
      if (typeof maybeDestroyable.destroy === "function") {
        maybeDestroyable.destroy();
      }
    },
  });
}

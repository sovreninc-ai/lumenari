import { NextResponse } from "next/server";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { supabaseService } from "@/lib/supabase";
import { getKit, type Kit } from "@/data/kits";

/**
 * GET /api/lead-magnet/download/[slug]?lead=<leadId>
 *
 * The free-kit download. Validates the lead row exists, the requested
 * kit slug matches their `claimed_kit_slug`, and the kit is on the
 * allow-list of free-magnet kits.
 *
 * Re-uses the same single-concatenated-markdown shape the paid
 * /api/download/[slug] route uses — same client-side experience.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Allow-list — only kits we explicitly distribute as free magnets.
const FREE_MAGNET_SLUGS = new Set<string>(["resume-job-search"]);

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
  // No leadId — we still serve the file because the slug is on the
  // public free-magnet allow-list. Direct-link sharing is acceptable
  // for the free product.

  let body: string;
  try {
    body = await buildFreeDocument(kit);
  } catch (err) {
    console.error("[lead-magnet-download] content missing:", err);
    return NextResponse.json(
      { error: "Kit content not present on server" },
      { status: 500 },
    );
  }

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.md"`,
      "Cache-Control": "private, no-store",
    },
  });
}

async function buildFreeDocument(kit: Kit): Promise<string> {
  const baseDir = path.join(process.cwd(), "content", kit.slug);
  await stat(baseDir);
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

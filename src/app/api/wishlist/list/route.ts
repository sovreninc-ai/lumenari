import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseService } from "@/lib/supabase";
import { getKit, getBundle, formatUSD } from "@/data/kits";

/**
 * GET /api/wishlist/list?email=... OR  ?lead=<uuid>
 *
 * Returns the current wishlist for a lead. Either an email or a leadId
 * works. The email path is the one /library uses for the "send me my
 * downloads" lookup pattern; the leadId path is for the in-email links
 * that already carry the id.
 *
 * Note: this is read-only and only returns slugs the lead has saved.
 * No write side-effects, no email is sent.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Query = z.object({
  email: z.string().email().max(254).optional(),
  lead: z.string().uuid().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parsed = Query.safeParse({
    email: searchParams.get("email") ?? undefined,
    lead: searchParams.get("lead") ?? undefined,
  });
  if (!parsed.success || (!parsed.data.email && !parsed.data.lead)) {
    return NextResponse.json(
      { error: "Provide either ?email= or ?lead=." },
      { status: 400 },
    );
  }

  const db = supabaseService();

  let leadId: string | null = null;
  if (parsed.data.lead) {
    leadId = parsed.data.lead;
  } else if (parsed.data.email) {
    const { data: lead } = await db
      .from("leads")
      .select("id")
      .ilike("email", parsed.data.email.toLowerCase().trim())
      .maybeSingle();
    leadId = lead?.id ?? null;
  }

  if (!leadId) {
    return NextResponse.json({ ok: true, wishlist: [] });
  }

  const { data: rows, error } = await db
    .from("wishlists")
    .select("id, kit_slug, source, created_at")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[wishlist/list] failed:", error);
    return NextResponse.json(
      { error: "Couldn't load your wishlist." },
      { status: 500 },
    );
  }

  type WishlistRow = {
    id: string;
    kit_slug: string;
    source: string;
    created_at: string;
  };
  const wishlist = ((rows as WishlistRow[] | null) ?? []).map((r) => {
    const kit = getKit(r.kit_slug);
    const bundle = getBundle(r.kit_slug);
    return {
      id: r.id,
      slug: r.kit_slug,
      name: kit?.name ?? bundle?.name ?? r.kit_slug,
      tagline: kit?.tagline ?? bundle?.tagline ?? "",
      price: kit
        ? formatUSD(kit.priceCents)
        : bundle
          ? formatUSD(bundle.priceCents)
          : null,
      kind: kit ? "kit" : bundle ? "bundle" : "unknown",
      savedAt: r.created_at,
    };
  });

  return NextResponse.json({ ok: true, wishlist });
}

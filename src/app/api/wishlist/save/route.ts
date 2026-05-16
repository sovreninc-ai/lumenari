import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseService } from "@/lib/supabase";
import { getKit, getBundle } from "@/data/kits";
import { resend } from "@/lib/resend";

/**
 * POST /api/wishlist/save
 *
 * Body: { email: string, kitSlug: string, source?: string }
 * Returns: { ok: true, leadId, wishlistId } or { error }
 *
 * Flow:
 *   1. Validate the kit/bundle slug.
 *   2. Upsert a lead (create if new, re-subscribe if previously unsub'd).
 *   3. Insert into `wishlists` with the unique (lead_id, kit_slug) constraint.
 *      If the row already exists, return ok with the existing id.
 *
 * No welcome series is fired from here — saving is a lower-intent signal
 * than claiming the free kit. The retention cron will pick the lead up
 * for price-drop / new-bundle alerts.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  email: z.string().email().max(254),
  kitSlug: z.string().min(1).max(120),
  source: z.string().min(1).max(40).optional(),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = Body.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please enter a valid email and kit slug." },
      { status: 400 },
    );
  }

  const email = parsed.data.email.toLowerCase().trim();
  const kitSlug = parsed.data.kitSlug;
  const source = parsed.data.source ?? "kit-detail";

  // Either a kit or a bundle is fine.
  if (!getKit(kitSlug) && !getBundle(kitSlug)) {
    return NextResponse.json(
      { error: "That kit doesn't exist." },
      { status: 400 },
    );
  }

  const db = supabaseService();

  // 1. Look up / create the lead.
  const { data: existing } = await db
    .from("leads")
    .select("id, unsubscribed_at")
    .ilike("email", email)
    .maybeSingle();

  let leadId: string;
  if (existing) {
    leadId = existing.id;
    if (existing.unsubscribed_at) {
      // Re-subscribe — saving a kit is opt-in.
      await db
        .from("leads")
        .update({ unsubscribed_at: null })
        .eq("id", leadId);
    }
  } else {
    // Best-effort Resend audience add.
    let resendContactId: string | undefined;
    const audienceId = process.env.RESEND_AUDIENCE_LEAD_MAGNET_ID;
    if (audienceId) {
      try {
        const result = await resend().contacts.create({
          email,
          audienceId,
          unsubscribed: false,
        });
        if ("data" in result && result.data?.id) {
          resendContactId = result.data.id;
        }
      } catch {
        // Duplicate / network — ignore, still record the lead.
      }
    }
    const { data: inserted, error: insErr } = await db
      .from("leads")
      .insert({
        email,
        source: "wishlist",
        resend_contact_id: resendContactId ?? null,
      })
      .select("id")
      .single();
    if (insErr) {
      console.error("[wishlist/save] lead insert failed:", insErr);
      return NextResponse.json(
        { error: "Couldn't save your email. Try again." },
        { status: 500 },
      );
    }
    leadId = inserted.id;
  }

  // 2. Insert the wishlist row, idempotently.
  const { data: wlExisting } = await db
    .from("wishlists")
    .select("id")
    .eq("lead_id", leadId)
    .eq("kit_slug", kitSlug)
    .maybeSingle();

  if (wlExisting) {
    return NextResponse.json({
      ok: true,
      leadId,
      wishlistId: wlExisting.id,
      already: true,
    });
  }

  const { data: inserted, error: wlErr } = await db
    .from("wishlists")
    .insert({ lead_id: leadId, kit_slug: kitSlug, source })
    .select("id")
    .single();

  if (wlErr) {
    console.error("[wishlist/save] insert failed:", wlErr);
    return NextResponse.json(
      { error: "Couldn't save the kit. Try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    leadId,
    wishlistId: inserted.id,
  });
}

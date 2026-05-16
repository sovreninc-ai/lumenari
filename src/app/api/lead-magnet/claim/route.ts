import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseService } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { sendCampaignEmail } from "@/lib/email-automation";
import { welcomeDay0 } from "@/lib/email-campaigns";
import { getKit } from "@/data/kits";

/**
 * POST /api/lead-magnet/claim
 *
 * Body: { email: string, kitSlug?: string, source?: string }
 * Returns: { ok: true, leadId: string } on success, { error: string } on failure.
 *
 * Flow:
 *   1. Validate the email + kit slug.
 *   2. Upsert a `leads` row.
 *   3. Add the contact to the Resend audience tagged `lead-magnet`.
 *   4. Send the Day-0 welcome email (idempotent via email_events).
 *
 * The 7-day welcome series after Day 0 is delivered by the email-cron
 * Edge Function — see `supabase/functions/email-cron/index.ts`.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_FREE_KIT = "resume-job-search";

const Body = z.object({
  email: z.string().email().max(254),
  kitSlug: z.string().min(1).max(80).optional(),
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
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const email = parsed.data.email.toLowerCase().trim();
  const kitSlug = parsed.data.kitSlug ?? DEFAULT_FREE_KIT;
  const source = parsed.data.source ?? "lead-magnet";

  // Verify the kit slug resolves to a real kit. Don't trust the client.
  const kit = getKit(kitSlug);
  if (!kit) {
    return NextResponse.json(
      { error: "That kit doesn't exist." },
      { status: 400 },
    );
  }

  const db = supabaseService();

  // 1. Add to Resend audience tagged lead-magnet (best-effort).
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
    } catch (err) {
      // Resend throws on duplicate — that's fine, we still record the lead.
      console.warn("[lead-magnet] resend audience add:", err);
    }
  }

  // 2. Upsert the lead row.
  const { data: existing } = await db
    .from("leads")
    .select("id, claimed_kit_slug, unsubscribed_at")
    .ilike("email", email)
    .maybeSingle();

  let leadId: string;
  if (existing) {
    leadId = existing.id;
    if (existing.unsubscribed_at) {
      // Re-subscribe — they came back willingly.
      await db
        .from("leads")
        .update({
          unsubscribed_at: null,
          claimed_kit_slug: kitSlug,
          resend_contact_id: resendContactId ?? null,
          welcomed_at: new Date().toISOString(),
        })
        .eq("id", leadId);
    } else if (!existing.claimed_kit_slug) {
      await db
        .from("leads")
        .update({
          claimed_kit_slug: kitSlug,
          resend_contact_id: resendContactId ?? null,
        })
        .eq("id", leadId);
    }
  } else {
    const { data: inserted, error: insErr } = await db
      .from("leads")
      .insert({
        email,
        source,
        claimed_kit_slug: kitSlug,
        resend_contact_id: resendContactId ?? null,
      })
      .select("id")
      .single();
    if (insErr) {
      console.error("[lead-magnet] insert failed:", insErr);
      return NextResponse.json(
        { error: "Couldn't save your email. Try again." },
        { status: 500 },
      );
    }
    leadId = inserted.id;
  }

  // 3. Send Day-0 welcome email. Idempotent on (recipient, template).
  const campaign = welcomeDay0({ email, kitSlug, leadId });
  const send = await sendCampaignEmail({
    recipient: email,
    template: "welcome.day-0",
    subject: campaign.subject,
    html: campaign.html,
    text: campaign.text,
    metadata: { kitSlug, leadId },
  });

  if (send.status === "failed") {
    // The lead is saved — surface the failure so the UI can show it.
    return NextResponse.json(
      {
        ok: true,
        leadId,
        warning: "Saved your email, but the welcome message failed to send. Check your inbox in a few minutes or contact support.",
      },
      { status: 202 },
    );
  }

  return NextResponse.json({ ok: true, leadId });
}

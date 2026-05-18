import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseService } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { env } from "@/lib/env";
import { siteUrl } from "@/lib/seo";
import { makeUnsubscribeToken } from "@/lib/newsletter-token";

/**
 * POST /api/subscribe
 *
 * Body: { email: string, source?: string }
 * Returns:
 *   200 { ok: true }                          on a fresh insert
 *   200 { ok: true, already_subscribed: true } if the email is already there
 *   400 { error }                              on bad input
 *
 * Flow on a new insert:
 *   1. Lowercase + validate email.
 *   2. Insert into `newsletter_subscribers` (idempotent — unique on email).
 *   3. Fire the welcome email via Resend with a link to the free starter
 *      kit (Solopreneur Toolkit) and a one-click unsubscribe link.
 *
 * Notes:
 *   - Single opt-in. `confirmed_at` is set at insert time because the
 *     form submission *is* the confirmation. We can flip to double
 *     opt-in later by leaving confirmed_at nullable and gating the
 *     drip series on it.
 *   - Idempotent: re-submitting an existing email returns 200 with
 *     `already_subscribed: true` and does NOT resend the welcome.
 *   - All `console.log`s prefixed `[subscribe]` so they're filterable
 *     in the Vercel runtime log.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FREE_KIT_SLUG = "solopreneur-toolkit";
const FREE_KIT_NAME = "Solopreneur Toolkit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Body = z.object({
  email: z.string().min(3).max(254),
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
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  const source = parsed.data.source?.toLowerCase().trim() || "unknown";

  console.log("[subscribe] incoming", { email, source });

  const db = supabaseService();

  // Idempotent insert. Postgres unique on `email` is the source of truth.
  const { data: existing } = await db
    .from("newsletter_subscribers")
    .select("id, unsubscribed_at")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    // If they previously unsubscribed and are signing up again, clear it.
    if (existing.unsubscribed_at) {
      await db
        .from("newsletter_subscribers")
        .update({ unsubscribed_at: null, confirmed_at: new Date().toISOString() })
        .eq("id", existing.id);
      console.log("[subscribe] resubscribe", { email, id: existing.id });
      // Treat resubscribe like a fresh signup — re-send the welcome.
      await sendWelcome(email).catch((err) => {
        console.error("[subscribe] welcome resend failed:", err);
      });
      return NextResponse.json({ ok: true });
    }
    console.log("[subscribe] already_subscribed", { email, id: existing.id });
    return NextResponse.json({ ok: true, already_subscribed: true });
  }

  const nowIso = new Date().toISOString();
  const { data: inserted, error: insErr } = await db
    .from("newsletter_subscribers")
    .insert({
      email,
      source,
      confirmed_at: nowIso,
    })
    .select("id")
    .single();

  if (insErr) {
    // Race condition: another concurrent request inserted the same email.
    // Treat as already_subscribed.
    if ((insErr as { code?: string }).code === "23505") {
      console.log("[subscribe] race-already_subscribed", { email });
      return NextResponse.json({ ok: true, already_subscribed: true });
    }
    console.error("[subscribe] insert failed:", insErr);
    return NextResponse.json(
      { error: "Couldn't save your email. Try again." },
      { status: 500 },
    );
  }

  console.log("[subscribe] inserted", { email, id: inserted.id, source });

  // Fire the welcome email. Don't fail the request if the email send fails —
  // we have their email already, we can recover.
  try {
    await sendWelcome(email);
    console.log("[subscribe] welcome sent", { email });
  } catch (err) {
    console.error("[subscribe] welcome send failed:", err);
  }

  return NextResponse.json({ ok: true });
}

// =====================================================================
// Welcome email
// =====================================================================
async function sendWelcome(email: string): Promise<void> {
  const base = siteUrl();
  const downloadUrl = `${base}/free/download/${FREE_KIT_SLUG}`;
  const unsubscribeToken = await makeUnsubscribeToken(email);
  const unsubscribeUrl = `${base}/api/unsubscribe?token=${encodeURIComponent(
    unsubscribeToken,
  )}&email=${encodeURIComponent(email)}`;

  const result = await resend().emails.send({
    from: env.resendFrom,
    to: email,
    subject: "Welcome to Lumenari — your free starter kit",
    html: welcomeHtml({ downloadUrl, unsubscribeUrl }),
    text: welcomeText({ downloadUrl, unsubscribeUrl }),
    headers: {
      "List-Unsubscribe": `<${unsubscribeUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });
  console.log("[subscribe] resend response", result);
}

function welcomeHtml({
  downloadUrl,
  unsubscribeUrl,
}: {
  downloadUrl: string;
  unsubscribeUrl: string;
}): string {
  return `
<!doctype html>
<html>
  <body style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#fafafa; padding:40px 20px; margin:0;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; margin:0 auto; background:white; border-radius:16px; padding:32px;">
      <tr><td>
        <h1 style="font-size:26px; margin:0 0 16px; color:#111; line-height:1.25;">Welcome to Lumenari.</h1>
        <p style="font-size:16px; color:#475569; line-height:1.55; margin:0 0 16px;">
          You're in. One useful email a week — tactics, deep-dives, and the occasional kit drop. No fluff.
        </p>
        <p style="font-size:16px; color:#475569; line-height:1.55; margin:0 0 24px;">
          As a thank-you, here's a free starter kit on us: the <strong>${FREE_KIT_NAME}</strong>. Proposals, SOWs, invoice nudges, and the LinkedIn posts that bring the next client. Drop it into Claude, Cursor, or ChatGPT and feel the difference in five minutes.
        </p>
        <p style="margin:0 0 32px;">
          <a href="${downloadUrl}" style="display:inline-block; background:#0f172a; color:white; padding:14px 28px; border-radius:999px; text-decoration:none; font-weight:500;">Grab the free kit</a>
        </p>
        <p style="font-size:15px; color:#475569; line-height:1.55; margin:0 0 24px;">
          Want every kit we ship — including the next one? <a href="${siteUrl()}/pro" style="color:#0f172a; text-decoration:underline;">Lumenari Pro+</a> unlocks the whole catalog for the cost of a couple of one-off kits a year.
        </p>
        <p style="font-size:14px; color:#94a3b8; margin:32px 0 0;">— Chris &amp; the Lumenari team</p>
      </td></tr>
    </table>
    <p style="max-width:560px; margin:24px auto 0; font-size:12px; color:#94a3b8; text-align:center;">
      You're receiving this because you subscribed at lumenari.io. <a href="${unsubscribeUrl}" style="color:#94a3b8; text-decoration:underline;">Unsubscribe</a>.
    </p>
  </body>
</html>`.trim();
}

function welcomeText({
  downloadUrl,
  unsubscribeUrl,
}: {
  downloadUrl: string;
  unsubscribeUrl: string;
}): string {
  return `Welcome to Lumenari.

You're in. One useful email a week — no fluff.

As a thank-you, here's a free starter kit: the ${FREE_KIT_NAME}.

Grab it here: ${downloadUrl}

Want every kit we ship? Lumenari Pro+ unlocks the whole catalog: ${siteUrl()}/pro

— Chris & the Lumenari team

---
Unsubscribe: ${unsubscribeUrl}`;
}

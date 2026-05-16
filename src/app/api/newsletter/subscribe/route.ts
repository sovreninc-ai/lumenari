import { NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "@/lib/resend";
import { env } from "@/lib/env";
import { siteUrl } from "@/lib/seo";

/**
 * POST /api/newsletter/subscribe
 *
 * Double-opt-in newsletter signup:
 *   1. Validate the email.
 *   2. Add the contact to the Resend audience (idempotent — Resend handles
 *      dedup on email).
 *   3. Send a confirmation email with a one-click confirm link. The
 *      confirmation route is `/api/newsletter/confirm?email=...&token=...`.
 *
 * The token is a stable HMAC of the email so we don't need a DB table for
 * pending signups — clean for the MVP. Move to a `newsletter_signups` table
 * when the volume justifies it.
 */

export const runtime = "nodejs";

const Body = z.object({
  email: z.string().email().max(254),
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

  // Resend Audience add. The Audience ID is configured by Chris in env.
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (audienceId) {
    try {
      await resend().contacts.create({
        email,
        audienceId,
        unsubscribed: true, // Pending until they click confirm
      });
    } catch (err) {
      // Resend throws on duplicate — that's fine, we still send the confirm.
      console.warn("[newsletter] resend contacts.create:", err);
    }
  }

  const token = await makeConfirmToken(email);
  const confirmUrl = `${siteUrl()}/api/newsletter/confirm?email=${encodeURIComponent(email)}&token=${token}`;

  try {
    await resend().emails.send({
      from: env.resendFrom,
      to: email,
      subject: "Confirm your Lumenari subscription",
      html: confirmEmailHtml(confirmUrl),
      text: confirmEmailText(confirmUrl),
    });
  } catch (err) {
    console.error("[newsletter] confirm email send failed:", err);
    return NextResponse.json(
      { error: "Couldn't send confirmation email. Try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Check your email — we sent a confirmation link. (Look in spam if you don't see it.)",
  });
}

// =====================================================================
// HMAC token helpers
// =====================================================================
async function makeConfirmToken(email: string): Promise<string> {
  const secret =
    process.env.NEWSLETTER_TOKEN_SECRET ?? process.env.STRIPE_WEBHOOK_SECRET ?? "lumenari-dev";
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`newsletter:${email}`),
  );
  return Buffer.from(new Uint8Array(sig)).toString("hex").slice(0, 32);
}

// =====================================================================
// Email templates
// =====================================================================
function confirmEmailHtml(confirmUrl: string): string {
  return `
<!doctype html>
<html>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#fafafa; padding:40px 20px;">
    <table style="max-width:560px; margin:0 auto; background:white; border-radius:16px; padding:32px;">
      <tr><td>
        <h1 style="font-size:24px; margin:0 0 16px; color:#111;">Almost in.</h1>
        <p style="font-size:16px; color:#475569; line-height:1.55; margin:0 0 24px;">
          Confirm your subscription to the Lumenari newsletter and we'll send your first kit free with the welcome email.
        </p>
        <p style="margin:0 0 24px;">
          <a href="${confirmUrl}" style="display:inline-block; background:#0f172a; color:white; padding:14px 28px; border-radius:999px; text-decoration:none; font-weight:500;">Confirm subscription</a>
        </p>
        <p style="font-size:13px; color:#94a3b8; margin:24px 0 0;">If you didn't request this, just ignore this email — you won't be subscribed.</p>
      </td></tr>
    </table>
  </body>
</html>`.trim();
}

function confirmEmailText(confirmUrl: string): string {
  return `Almost in.

Confirm your subscription to the Lumenari newsletter:

${confirmUrl}

If you didn't request this, ignore this email.`;
}

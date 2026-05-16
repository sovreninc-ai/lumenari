import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { env } from "@/lib/env";
import { siteUrl } from "@/lib/seo";

/**
 * GET /api/newsletter/confirm?email=...&token=...
 *
 * Double-opt-in confirmation. Verifies the HMAC token, unsubscribes-the-
 * unsubscribed flag in Resend (i.e. marks them as subscribed), and sends
 * the welcome email with the free-kit link.
 */

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email")?.toLowerCase().trim();
  const token = url.searchParams.get("token");

  if (!email || !token) {
    return NextResponse.redirect(`${siteUrl()}/?newsletter=invalid`);
  }

  const expected = await makeConfirmToken(email);
  if (token !== expected) {
    return NextResponse.redirect(`${siteUrl()}/?newsletter=invalid`);
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (audienceId) {
    try {
      await resend().contacts.update({
        email,
        audienceId,
        unsubscribed: false,
      });
    } catch (err) {
      console.warn("[newsletter] confirm — contacts.update:", err);
    }
  }

  // Welcome email with free-kit incentive
  try {
    await resend().emails.send({
      from: env.resendFrom,
      to: email,
      subject: "Welcome to Lumenari — your free kit is here",
      html: welcomeEmailHtml(),
      text: welcomeEmailText(),
    });
  } catch (err) {
    console.warn("[newsletter] confirm — welcome email send:", err);
  }

  return NextResponse.redirect(`${siteUrl()}/?newsletter=confirmed`);
}

// =====================================================================
// HMAC token (must match the subscribe route's implementation)
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
// Welcome email
// =====================================================================
function welcomeEmailHtml(): string {
  const base = siteUrl();
  // Default freebie: Apple-style UX kit (any 'any'-target kit is a safe
  // first read). Chris can adjust by editing this template.
  const freeKitUrl = `${base}/kits/apple-style-ux`;
  return `
<!doctype html>
<html>
  <body style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#fafafa; padding:40px 20px;">
    <table style="max-width:560px; margin:0 auto; background:white; border-radius:16px; padding:32px;">
      <tr><td>
        <h1 style="font-size:26px; margin:0 0 16px; color:#111;">Welcome to Lumenari.</h1>
        <p style="font-size:16px; color:#475569; line-height:1.55; margin:0 0 16px;">
          You're in. One useful email a week — no fluff, no daily newsletters.
        </p>
        <p style="font-size:16px; color:#475569; line-height:1.55; margin:0 0 24px;">
          As promised, here's a free kit on us. Drop it into Claude, Cursor, or ChatGPT and feel the difference in five minutes:
        </p>
        <p style="margin:0 0 32px;">
          <a href="${freeKitUrl}" style="display:inline-block; background:#0f172a; color:white; padding:14px 28px; border-radius:999px; text-decoration:none; font-weight:500;">Grab the free kit</a>
        </p>
        <p style="font-size:14px; color:#94a3b8; margin:0;">— Chris &amp; the Lumenari team</p>
      </td></tr>
    </table>
  </body>
</html>`.trim();
}

function welcomeEmailText(): string {
  const base = siteUrl();
  return `Welcome to Lumenari.

You're in. One useful email a week — no fluff.

Grab your free kit: ${base}/kits/apple-style-ux

— Chris & the Lumenari team`;
}

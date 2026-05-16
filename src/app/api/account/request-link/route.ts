import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseService } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { env } from "@/lib/env";

/**
 * POST /api/account/request-link
 *
 * Body: { email }
 *
 * Emails the requester their API account dashboard link. If no account
 * exists for this email yet, we provision a free-tier row on the fly so
 * the magic-link arrives with a working account behind it.
 *
 * Always returns 200 to avoid leaking account existence.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  const email = parsed.email.toLowerCase().trim();
  const db = supabaseService();

  // Look up or auto-create a free-tier account.
  const { data: existing } = await db
    .from("api_accounts")
    .select("id, access_token, tier_id")
    .ilike("email", email)
    .maybeSingle();

  let accountId: string;
  let token: string;
  let isNew = false;

  if (existing) {
    accountId = existing.id as string;
    token = existing.access_token as string;
  } else {
    const { data: inserted, error: insErr } = await db
      .from("api_accounts")
      .insert({ email, tier_id: "free" })
      .select("id, access_token")
      .single();
    if (insErr) {
      console.error("[account request-link] insert failed:", insErr);
      return NextResponse.json({ ok: true });
    }
    accountId = inserted.id as string;
    token = inserted.access_token as string;
    isNew = true;
  }

  const url = `${env.siteUrl}/account/api-keys?a=${accountId}&t=${token}`;
  const html = magicLinkHtml(url, isNew);

  try {
    await resend().emails.send({
      from: env.resendFrom,
      to: email,
      subject: isNew
        ? "Welcome to the Lumenari API"
        : "Your Lumenari API dashboard link",
      html,
    });
  } catch (err) {
    console.error("[account request-link] email send failed:", err);
  }

  return NextResponse.json({ ok: true });
}

function magicLinkHtml(url: string, isNew: boolean): string {
  const heading = isNew
    ? "Welcome to the Lumenari API."
    : "Your dashboard, ready when you are.";
  const subhead = isNew
    ? "Your free-tier account is set up. Click below to grab an API key and start building."
    : "Open your account to manage API keys and check usage.";

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Inter',system-ui,sans-serif;color:#111418;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 16px;"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #ececec;border-radius:22px;overflow:hidden;">
  <tr><td style="padding:36px 36px 8px;">
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:600;letter-spacing:-0.02em;">${heading}</h1>
    <p style="margin:0;color:#6b7280;font-size:15px;line-height:1.55;">${subhead}</p>
  </td></tr>
  <tr><td style="padding:24px 36px 36px;">
    <p style="margin:0 0 14px;">
      <a href="${url}" style="display:inline-block;padding:14px 22px;background:#111418;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:500;font-size:15px;">Open the dashboard</a>
    </p>
    <p style="margin:18px 0 0;color:#6b7280;font-size:13px;line-height:1.55;">Or paste this URL in your browser:<br><span style="color:#111418;word-break:break-all;">${url}</span></p>
    <p style="margin:18px 0 0;color:#9ca3af;font-size:12px;">© Lumenari · lumenari.io</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

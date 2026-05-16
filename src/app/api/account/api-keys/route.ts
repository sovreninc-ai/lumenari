import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseService } from "@/lib/supabase";
import { resolveAccount } from "@/lib/account-auth";
import { generateApiKey } from "@/lib/api-keys";
import { resend } from "@/lib/resend";
import { env } from "@/lib/env";

/**
 * Dashboard endpoints for managing API keys.
 *
 *   POST /api/account/api-keys
 *     Body: { account_id, access_token, name }
 *     → { id, name, key_prefix, key, created_at }   // key shown ONCE
 *
 *   GET  /api/account/api-keys?a=<id>&t=<token>
 *     → { keys: [{ id, name, key_prefix, last_used_at, created_at, revoked_at }] }
 *
 * Soft-revoke lives at /api/account/api-keys/[id] (DELETE).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PostBody = z.object({
  account_id: z.string().uuid(),
  access_token: z.string().uuid(),
  name: z.string().min(1).max(60),
});

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = PostBody.parse(await req.json());
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof z.ZodError ? err.issues[0]?.message : "Invalid body",
      },
      { status: 400 },
    );
  }

  const account = await resolveAccount(parsed.account_id, parsed.access_token);
  if (!account) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const db = supabaseService();

  // Cap keys per account so a runaway client can't fill the table.
  const { count: existingCount } = await db
    .from("api_keys")
    .select("id", { count: "exact", head: true })
    .eq("account_id", account.id)
    .is("revoked_at", null);

  if ((existingCount ?? 0) >= 25) {
    return NextResponse.json(
      { error: "Maximum of 25 active keys per account. Revoke one first." },
      { status: 400 },
    );
  }

  const { key, prefix, hash } = generateApiKey();

  const { data: inserted, error: insErr } = await db
    .from("api_keys")
    .insert({
      account_id: account.id,
      name: parsed.name,
      key_prefix: prefix,
      key_hash: hash,
    })
    .select("id, name, key_prefix, created_at")
    .single();

  if (insErr) {
    console.error("[account api-keys POST] insert failed:", insErr);
    return NextResponse.json({ error: "Could not create key" }, { status: 500 });
  }

  // Send the "API key created" welcome email on first key.
  const isFirstKey = (existingCount ?? 0) === 0;
  if (isFirstKey) {
    try {
      await resend().emails.send({
        from: env.resendFrom,
        to: account.email,
        subject: "Your first Lumenari API key is ready",
        html: firstKeyEmail(prefix, env.siteUrl),
      });
    } catch (err) {
      console.error("[account api-keys POST] welcome email failed:", err);
    }
  }

  return NextResponse.json({
    id: inserted.id,
    name: inserted.name,
    key_prefix: inserted.key_prefix,
    created_at: inserted.created_at,
    // The full raw key — shown ONCE. The client surfaces this in a modal
    // with a "Copy" button and a "you won't see this again" warning.
    key,
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const account = await resolveAccount(
    url.searchParams.get("a"),
    url.searchParams.get("t"),
  );
  if (!account) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const db = supabaseService();
  const { data, error } = await db
    .from("api_keys")
    .select("id, name, key_prefix, last_used_at, created_at, revoked_at")
    .eq("account_id", account.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[account api-keys GET] list failed:", error);
    return NextResponse.json({ error: "Could not list keys" }, { status: 500 });
  }

  return NextResponse.json({ keys: data ?? [] });
}

function firstKeyEmail(prefix: string, siteUrl: string): string {
  const docs = `${siteUrl}/api-docs`;
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Inter',system-ui,sans-serif;color:#111418;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 16px;"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #ececec;border-radius:22px;overflow:hidden;">
  <tr><td style="padding:36px 36px 8px;">
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:600;letter-spacing:-0.02em;">Your API key is live.</h1>
    <p style="margin:0;color:#6b7280;font-size:15px;line-height:1.55;">
      Key starting <code style="font-family:'SF Mono',Menlo,monospace;background:#f3f4f6;padding:1px 6px;border-radius:6px;">${prefix}…</code> is active.
      Keep the full key somewhere safe — we hash and discard it once you close the modal, so we can't recover it for you.
    </p>
  </td></tr>
  <tr><td style="padding:24px 36px 36px;">
    <p style="margin:0 0 14px;">
      <a href="${docs}" style="display:inline-block;padding:14px 22px;background:#111418;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:500;font-size:15px;">Read the API docs</a>
    </p>
    <p style="margin:18px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">
      Quick start: <code style="font-family:'SF Mono',Menlo,monospace;background:#f3f4f6;padding:1px 6px;border-radius:6px;">curl ${siteUrl}/api/v1/recommend -H "Authorization: Bearer lmn_..." -d '{"use_case":"shipping a SaaS"}'</code>
    </p>
    <p style="margin:18px 0 0;color:#9ca3af;font-size:12px;">© Lumenari · lumenari.io</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

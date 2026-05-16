import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseService } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { env } from "@/lib/env";
import { getKit, KITS } from "@/data/kits";

/**
 * POST /api/library/request  { email }
 *
 * Looks up all purchases for the given email and emails the buyer a
 * fresh set of signed download links. To avoid leaking customer
 * existence, we always return 200 with `ok: true`.
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
  const { email } = parsed;

  const db = supabaseService();
  const { data: purchases, error } = await db
    .from("purchases")
    .select("id, email, kit_ids, access_token, pro, pro_status, created_at")
    .ilike("email", email)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[library request] db error:", error);
    return NextResponse.json({ ok: true });
  }

  // No purchases — still 200, so we don't leak which emails are customers.
  if (!purchases || purchases.length === 0) {
    return NextResponse.json({ ok: true });
  }

  // Pro+ active = entitled to every kit. Use the most recent active Pro+ row
  // so the library URL always carries the same credentials.
  const proRow = purchases.find(
    (p) => p.pro && p.pro_status !== "cancelled",
  );

  const allLinks: { name: string; url: string }[] = [];

  if (proRow) {
    for (const k of KITS) {
      allLinks.push({
        name: k.name,
        url: `${env.siteUrl}/api/download/${k.slug}?p=${proRow.id}&t=${proRow.access_token}`,
      });
    }
  } else {
    for (const p of purchases) {
      for (const slug of p.kit_ids as string[]) {
        const k = getKit(slug);
        if (!k) continue;
        allLinks.push({
          name: k.name,
          url: `${env.siteUrl}/api/download/${k.slug}?p=${p.id}&t=${p.access_token}`,
        });
      }
    }
  }

  if (allLinks.length === 0) {
    return NextResponse.json({ ok: true });
  }

  // De-dupe by URL.
  const seen = new Set<string>();
  const links = allLinks.filter((l) =>
    seen.has(l.url) ? false : (seen.add(l.url), true),
  );

  try {
    await resend().emails.send({
      from: env.resendFrom,
      to: email,
      subject: "Your Lumenari downloads",
      html: libraryEmailHtml(links),
    });
  } catch (err) {
    console.error("[library request] email send failed:", err);
  }

  return NextResponse.json({ ok: true });
}

function libraryEmailHtml(links: { name: string; url: string }[]): string {
  const items = links
    .map(
      (l) =>
        `<p style="margin:0 0 12px;"><a href="${l.url}" style="display:inline-block;padding:12px 18px;background:#111418;color:#fff;border-radius:999px;text-decoration:none;font-weight:500;font-size:14px;">Download ${escape(l.name)}</a></p>`,
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Inter',system-ui,sans-serif;color:#111418;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 16px;"><tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #ececec;border-radius:22px;overflow:hidden;">
      <tr><td style="padding:36px 36px 8px;">
        <h1 style="margin:0 0 8px;font-size:24px;font-weight:600;letter-spacing:-0.02em;">Here are your kits.</h1>
        <p style="margin:0;color:#6b7280;font-size:15px;line-height:1.55;">Links are good for 24 hours — request fresh ones any time at lumenari.io/library.</p>
      </td></tr>
      <tr><td style="padding:24px 36px 36px;">${items}</td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&"
      ? "&amp;"
      : c === "<"
        ? "&lt;"
        : c === ">"
          ? "&gt;"
          : c === '"'
            ? "&quot;"
            : "&#39;",
  );
}

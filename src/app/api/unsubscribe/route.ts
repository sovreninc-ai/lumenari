import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";
import { verifyUnsubscribeToken } from "@/lib/newsletter-token";
import { siteUrl } from "@/lib/seo";

/**
 * GET /api/unsubscribe?email=...&token=...
 * POST /api/unsubscribe?email=...&token=...   (for List-Unsubscribe one-click)
 *
 * Verifies the HMAC token, sets `unsubscribed_at` on the row, then
 * redirects (for GET) to a confirmation page. POST is supported for
 * the RFC 8058 List-Unsubscribe one-click header — returns 200 JSON.
 *
 * Idempotent: hitting it twice for the same email is fine.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function performUnsubscribe(req: Request): Promise<{
  ok: boolean;
  status: "ok" | "invalid" | "error";
  email?: string;
}> {
  const url = new URL(req.url);
  const email = url.searchParams.get("email")?.toLowerCase().trim();
  const token = url.searchParams.get("token");

  if (!email || !token) {
    return { ok: false, status: "invalid" };
  }

  const valid = await verifyUnsubscribeToken(email, token);
  if (!valid) {
    console.log("[unsubscribe] invalid token", { email });
    return { ok: false, status: "invalid", email };
  }

  const db = supabaseService();
  const { error } = await db
    .from("newsletter_subscribers")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("email", email);

  if (error) {
    console.error("[unsubscribe] update failed:", error);
    return { ok: false, status: "error", email };
  }

  console.log("[unsubscribe] ok", { email });
  return { ok: true, status: "ok", email };
}

export async function GET(req: Request) {
  const result = await performUnsubscribe(req);
  const params = new URLSearchParams();
  params.set("status", result.status);
  if (result.email) params.set("email", result.email);
  return NextResponse.redirect(`${siteUrl()}/unsubscribed?${params.toString()}`);
}

export async function POST(req: Request) {
  const result = await performUnsubscribe(req);
  if (!result.ok) {
    return NextResponse.json({ ok: false, status: result.status }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}

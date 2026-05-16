import { NextResponse } from "next/server";
import { z } from "zod";
import { setAdminCookie } from "@/lib/admin-auth";

/**
 * POST /api/admin/login
 *
 * Body: { email, key }
 *
 * Accepts a request only if `key` matches `ADMIN_OVERRIDE_KEY` (a long
 * random string set in the env) and `email` is in `ADMIN_EMAIL` or
 * `admin_users`. Sets a signed cookie on success.
 *
 * This is the bootstrap login. Replace with a full magic-link flow when
 * there's more than one admin.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  email: z.string().email().max(254),
  key: z.string().min(8).max(200),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const expected = process.env.ADMIN_OVERRIDE_KEY;
  if (!expected || parsed.data.key !== expected) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const adminEmails = (process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (!adminEmails.includes(parsed.data.email.toLowerCase())) {
    return NextResponse.json({ error: "Not an admin" }, { status: 403 });
  }

  await setAdminCookie(parsed.data.email);
  return NextResponse.json({ ok: true });
}

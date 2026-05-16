/**
 * Admin access gate.
 *
 * Two paths:
 *   1. `ADMIN_EMAIL` env var — comma-separated list of admin emails.
 *      Simple, no DB hit. Use for solo + small teams.
 *   2. `admin_users` Supabase table — flexible, future-proof. Used
 *      whenever a row matches the request's claimed email.
 *
 * The "claimed email" comes from a signed cookie set by /admin/login.
 * If the cookie is missing or invalid, isAdmin() returns false.
 *
 * This module is server-only.
 */

import { cookies } from "next/headers";
import { supabaseService } from "./supabase";
import crypto from "node:crypto";

const ADMIN_COOKIE = "lumenari_admin";
const ADMIN_COOKIE_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

function adminSecret(): string {
  return (
    process.env.ADMIN_COOKIE_SECRET ??
    process.env.STRIPE_WEBHOOK_SECRET ??
    "lumenari-dev-secret"
  );
}

function sign(value: string): string {
  return crypto
    .createHmac("sha256", adminSecret())
    .update(value)
    .digest("hex")
    .slice(0, 32);
}

function pack(email: string): string {
  return `${email}.${sign(email)}`;
}

function unpack(packed: string | undefined): string | null {
  if (!packed) return null;
  const idx = packed.lastIndexOf(".");
  if (idx <= 0) return null;
  const email = packed.slice(0, idx);
  const sig = packed.slice(idx + 1);
  if (sign(email) !== sig) return null;
  return email;
}

function envAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAIL ?? "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

async function isEmailAdmin(email: string): Promise<boolean> {
  const lower = email.toLowerCase().trim();
  if (envAdminEmails().includes(lower)) return true;
  try {
    const db = supabaseService();
    const { data } = await db
      .from("admin_users")
      .select("email")
      .ilike("email", lower)
      .maybeSingle();
    return Boolean(data);
  } catch {
    // admin_users table may not exist yet — fall back to env-only.
    return false;
  }
}

/** Returns the signed-in admin email, or null. */
export async function getAdminEmail(): Promise<string | null> {
  const store = await cookies();
  const cookie = store.get(ADMIN_COOKIE)?.value;
  const email = unpack(cookie);
  if (!email) return null;
  return (await isEmailAdmin(email)) ? email : null;
}

/** Quick boolean — `true` if the current request is from an admin. */
export async function isAdmin(): Promise<boolean> {
  return (await getAdminEmail()) !== null;
}

/** Sets the admin cookie. Call after verifying a one-time email token. */
export async function setAdminCookie(email: string): Promise<void> {
  const store = await cookies();
  store.set({
    name: ADMIN_COOKIE,
    value: pack(email.toLowerCase().trim()),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_TTL_SECONDS,
  });
}

export async function clearAdminCookie(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

/**
 * For dev / direct access — if Chris hits /admin?key=<ADMIN_OVERRIDE_KEY>
 * and the env key matches, we treat the request as admin without a cookie.
 * Useful for the first session before login is wired. NOT a long-term
 * pattern; remove ADMIN_OVERRIDE_KEY once cookie login is comfortable.
 */
export function adminOverrideKey(req: { searchParams: URLSearchParams } | URL): boolean {
  const k = req.searchParams.get("key");
  const target = process.env.ADMIN_OVERRIDE_KEY;
  if (!k || !target) return false;
  // Constant-time compare.
  const a = Buffer.from(k);
  const b = Buffer.from(target);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

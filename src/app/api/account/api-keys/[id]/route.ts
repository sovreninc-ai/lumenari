import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";
import { resolveAccount } from "@/lib/account-auth";

/**
 * DELETE /api/account/api-keys/[id]?a=<accountId>&t=<token>
 *
 * Soft-revoke the key. We never hard-delete: keeping the row lets usage
 * logs continue to reference the key (FK is ON DELETE SET NULL, but soft
 * revoke keeps the trail intact).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ id: string }>;
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function DELETE(req: Request, { params }: Params) {
  const { id } = await params;
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ error: "Invalid key id" }, { status: 400 });
  }

  const url = new URL(req.url);
  const account = await resolveAccount(
    url.searchParams.get("a"),
    url.searchParams.get("t"),
  );
  if (!account) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const db = supabaseService();
  const { data: existing } = await db
    .from("api_keys")
    .select("id, account_id, revoked_at")
    .eq("id", id)
    .maybeSingle();

  if (!existing || existing.account_id !== account.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (existing.revoked_at) {
    return NextResponse.json({ ok: true, already_revoked: true });
  }

  const { error } = await db
    .from("api_keys")
    .update({ revoked_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("[account api-keys DELETE] failed:", error);
    return NextResponse.json({ error: "Could not revoke key" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

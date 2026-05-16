import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { loadAdminStats } from "@/lib/admin-stats";

/**
 * GET /api/admin/stats — returns the JSON the founder dashboard renders.
 *
 * Same gate as the /admin page; intended for future async/refresh use
 * from the client (or for an external pager / Slack bot to poll).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const stats = await loadAdminStats();
    return NextResponse.json(stats, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (err) {
    console.error("[admin-stats] failed:", err);
    return NextResponse.json(
      { error: "Failed to load stats" },
      { status: 500 },
    );
  }
}

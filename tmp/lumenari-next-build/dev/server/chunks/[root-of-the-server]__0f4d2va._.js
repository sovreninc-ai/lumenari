module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/env.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "env",
    ()=>env
]);
/**
 * Centralised env access. Throws loudly if a server-side var is missing at
 * runtime — better than a silent `undefined` reaching the SDK.
 */ function required(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}
function optional(name) {
    return process.env[name];
}
const env = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lumenari.io",
    // Server-only — only call the getters from server code.
    get supabaseUrl () {
        return required("SUPABASE_URL");
    },
    get supabaseServiceKey () {
        return required("SUPABASE_SERVICE_ROLE_KEY");
    },
    get supabaseAnonKey () {
        return required("SUPABASE_ANON_KEY");
    },
    get stripeSecret () {
        return required("STRIPE_SECRET_KEY");
    },
    get stripeWebhookSecret () {
        return required("STRIPE_WEBHOOK_SECRET");
    },
    get anthropicKey () {
        return required("ANTHROPIC_API_KEY");
    },
    get resendKey () {
        return required("RESEND_API_KEY");
    },
    get resendFrom () {
        return optional("RESEND_FROM_EMAIL") ?? "Lumenari <hello@lumenari.io>";
    }
};
}),
"[project]/src/lib/supabase.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabaseAnon",
    ()=>supabaseAnon,
    "supabaseService",
    ()=>supabaseService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/env.ts [app-route] (ecmascript)");
;
;
/**
 * Singleton Supabase clients. We keep two:
 *   - `service`: server-only, bypasses RLS — for webhook handlers + admin work
 *   - `anon`:    public/anon — for client-readable rows like the kit catalog
 *
 * Per Sovren stack rules: the service role key NEVER leaves a server context.
 */ let _service = null;
let _anon = null;
function supabaseService() {
    if (!_service) {
        _service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].supabaseUrl, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].supabaseServiceKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        });
    }
    return _service;
}
function supabaseAnon() {
    if (!_anon) {
        _anon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].supabaseUrl, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].supabaseAnonKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        });
    }
    return _anon;
}
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/src/lib/admin-auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminOverrideKey",
    ()=>adminOverrideKey,
    "clearAdminCookie",
    ()=>clearAdminCookie,
    "getAdminEmail",
    ()=>getAdminEmail,
    "isAdmin",
    ()=>isAdmin,
    "setAdminCookie",
    ()=>setAdminCookie
]);
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
;
;
;
const ADMIN_COOKIE = "lumenari_admin";
const ADMIN_COOKIE_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days
function adminSecret() {
    return process.env.ADMIN_COOKIE_SECRET ?? process.env.STRIPE_WEBHOOK_SECRET ?? "lumenari-dev-secret";
}
function sign(value) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].createHmac("sha256", adminSecret()).update(value).digest("hex").slice(0, 32);
}
function pack(email) {
    return `${email}.${sign(email)}`;
}
function unpack(packed) {
    if (!packed) return null;
    const idx = packed.lastIndexOf(".");
    if (idx <= 0) return null;
    const email = packed.slice(0, idx);
    const sig = packed.slice(idx + 1);
    if (sign(email) !== sig) return null;
    return email;
}
function envAdminEmails() {
    const raw = process.env.ADMIN_EMAIL ?? "";
    return raw.split(",").map((e)=>e.trim().toLowerCase()).filter(Boolean);
}
async function isEmailAdmin(email) {
    const lower = email.toLowerCase().trim();
    if (envAdminEmails().includes(lower)) return true;
    try {
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseService"])();
        const { data } = await db.from("admin_users").select("email").ilike("email", lower).maybeSingle();
        return Boolean(data);
    } catch  {
        // admin_users table may not exist yet — fall back to env-only.
        return false;
    }
}
async function getAdminEmail() {
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const cookie = store.get(ADMIN_COOKIE)?.value;
    const email = unpack(cookie);
    if (!email) return null;
    return await isEmailAdmin(email) ? email : null;
}
async function isAdmin() {
    return await getAdminEmail() !== null;
}
async function setAdminCookie(email) {
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    store.set({
        name: ADMIN_COOKIE,
        value: pack(email.toLowerCase().trim()),
        httpOnly: true,
        sameSite: "lax",
        secure: ("TURBOPACK compile-time value", "development") === "production",
        path: "/",
        maxAge: ADMIN_COOKIE_TTL_SECONDS
    });
}
async function clearAdminCookie() {
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    store.delete(ADMIN_COOKIE);
}
function adminOverrideKey(req) {
    const k = req.searchParams.get("key");
    const target = process.env.ADMIN_OVERRIDE_KEY;
    if (!k || !target) return false;
    // Constant-time compare.
    const a = Buffer.from(k);
    const b = Buffer.from(target);
    if (a.length !== b.length) return false;
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].timingSafeEqual(a, b);
}
}),
"[project]/src/lib/admin-stats.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadAdminStats",
    ()=>loadAdminStats
]);
/**
 * Founder dashboard data — every metric the /admin page renders.
 *
 * Server-only. All DB queries use the service role (we already gated
 * access at the page level via `isAdmin()`).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-route] (ecmascript)");
;
const DAY_MS = 24 * 60 * 60 * 1000;
const MONTHLY_PRO_PLUS_CENTS = 1900;
const ANNUAL_PRO_PLUS_CENTS = 14900;
function startOfTodayUtc() {
    const d = new Date();
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}
function startOfMonthUtc() {
    const d = new Date();
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
}
function startOfYearUtc() {
    const d = new Date();
    return new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
}
function mrrCentsForTier(tier) {
    switch(tier){
        case "monthly":
            return MONTHLY_PRO_PLUS_CENTS;
        case "annual":
            return Math.round(ANNUAL_PRO_PLUS_CENTS / 12);
        default:
            // Lifetime contributes 0 to MRR (one-time revenue).
            return 0;
    }
}
async function loadAdminStats() {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseService"])();
    const todayStart = startOfTodayUtc();
    const monthStart = startOfMonthUtc();
    const yearStart = startOfYearUtc();
    const ninetyDaysAgo = new Date(Date.now() - 90 * DAY_MS);
    const thirtyDaysAgo = new Date(Date.now() - 30 * DAY_MS);
    // Pull a single wide slice for the year — small projects fit easily.
    const { data: yearPurchases, error: yearErr } = await db.from("purchases").select("id, email, kit_ids, amount_cents, created_at, pro, pro_tier, pro_status").gte("created_at", yearStart.toISOString());
    if (yearErr) throw yearErr;
    const purchases = yearPurchases ?? [];
    // Revenue aggregates.
    let revenueTodayCents = 0;
    let revenueMonthCents = 0;
    let revenueYearCents = 0;
    for (const p of purchases){
        const cents = p.amount_cents ?? 0;
        const created = new Date(p.created_at);
        revenueYearCents += cents;
        if (created >= monthStart) revenueMonthCents += cents;
        if (created >= todayStart) revenueTodayCents += cents;
    }
    // Trend buckets.
    const revenueTrend30d = [];
    for(let i = 29; i >= 0; i--){
        const d = new Date(Date.now() - i * DAY_MS);
        const key = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString().slice(0, 10);
        revenueTrend30d.push({
            date: key,
            cents: 0
        });
    }
    const trendIndex = new Map(revenueTrend30d.map((r, i)=>[
            r.date,
            i
        ]));
    for (const p of purchases){
        const created = new Date(p.created_at);
        if (created < thirtyDaysAgo) continue;
        const key = new Date(Date.UTC(created.getUTCFullYear(), created.getUTCMonth(), created.getUTCDate())).toISOString().slice(0, 10);
        const idx = trendIndex.get(key);
        if (idx === undefined) continue;
        revenueTrend30d[idx].cents += p.amount_cents ?? 0;
    }
    // Customer acquisition trend — fetch 90-day distinct first-purchase dates.
    const customerTrend90d = [];
    for(let i = 89; i >= 0; i--){
        const d = new Date(Date.now() - i * DAY_MS);
        const key = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString().slice(0, 10);
        customerTrend90d.push({
            date: key,
            newCustomers: 0
        });
    }
    const customerTrendIndex = new Map(customerTrend90d.map((r, i)=>[
            r.date,
            i
        ]));
    const { data: ninety, error: ninetyErr } = await db.from("purchases").select("email, created_at").gte("created_at", ninetyDaysAgo.toISOString());
    if (ninetyErr) throw ninetyErr;
    // First-touch per email.
    const firstSeen = new Map();
    for (const r of ninety ?? []){
        const key = r.email.toLowerCase();
        const existing = firstSeen.get(key);
        if (!existing || r.created_at < existing) firstSeen.set(key, r.created_at);
    }
    for (const [, dateStr] of firstSeen){
        const d = new Date(dateStr);
        const key = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString().slice(0, 10);
        const idx = customerTrendIndex.get(key);
        if (idx === undefined) continue;
        customerTrend90d[idx].newCustomers += 1;
    }
    // Distinct customers total.
    const { data: allEmails } = await db.from("purchases").select("email");
    const totalCustomers = new Set((allEmails ?? []).map((e)=>e.email.toLowerCase())).size;
    // Active Pro+
    const { data: activeProRows, error: proErr } = await db.from("purchases").select("email, pro_tier, pro_status, created_at, amount_cents").eq("pro", true).in("pro_status", [
        "active",
        "trialing"
    ]);
    if (proErr) throw proErr;
    const activePro = (activeProRows ?? []).map((r)=>({
            email: r.email,
            tier: r.pro_tier ?? "monthly",
            status: r.pro_status ?? "active",
            startedAt: r.created_at,
            mrrCents: mrrCentsForTier(r.pro_tier)
        }));
    const proPlusMRRCents = activePro.reduce((s, r)=>s + r.mrrCents, 0);
    const activeProPlus = activePro.length;
    // Newsletter list size + conversion rate (leads in last 30d vs purchases).
    const { count: leadsCount } = await db.from("leads").select("*", {
        count: "exact",
        head: true
    }).is("unsubscribed_at", null);
    const newsletterListSize = leadsCount ?? 0;
    const { count: leads30 } = await db.from("leads").select("*", {
        count: "exact",
        head: true
    }).gte("welcomed_at", thirtyDaysAgo.toISOString());
    const { count: converted30 } = await db.from("leads").select("*", {
        count: "exact",
        head: true
    }).gte("welcomed_at", thirtyDaysAgo.toISOString()).not("converted_at", "is", null);
    const conversionRate30d = leads30 && leads30 > 0 ? (converted30 ?? 0) / leads30 : 0;
    // Pro+ churn rate — cancellations in last 30d / starts in last 30d.
    const { count: cancels30 } = await db.from("purchases").select("*", {
        count: "exact",
        head: true
    }).eq("pro_status", "cancelled").gte("created_at", thirtyDaysAgo.toISOString());
    const { count: starts30 } = await db.from("purchases").select("*", {
        count: "exact",
        head: true
    }).eq("pro", true).gte("created_at", thirtyDaysAgo.toISOString());
    const proChurnRate30d = starts30 && starts30 > 0 ? (cancels30 ?? 0) / starts30 : 0;
    // Top kits last 30 days — fan out each purchase's kit_ids and bucket.
    const topMap = new Map();
    for (const p of purchases){
        const created = new Date(p.created_at);
        if (created < thirtyDaysAgo) continue;
        const ids = p.kit_ids ?? [];
        if (ids.length === 0) continue;
        const perKit = ids.length > 0 ? (p.amount_cents ?? 0) / ids.length : 0;
        for (const id of ids){
            const cur = topMap.get(id) ?? {
                saleCount: 0,
                revenueCents: 0
            };
            cur.saleCount += 1;
            cur.revenueCents += perKit;
            topMap.set(id, cur);
        }
    }
    // Resolve names via catalog table.
    const { data: catRows } = await db.from("kits").select("id, slug, name");
    const catalog = new Map((catRows ?? []).map((k)=>[
            k.id,
            k
        ]));
    const topKits30d = Array.from(topMap.entries()).map(([id, agg])=>{
        const k = catalog.get(id);
        return {
            slug: k?.slug ?? id,
            name: k?.name ?? id,
            saleCount: agg.saleCount,
            revenueCents: Math.round(agg.revenueCents)
        };
    }).sort((a, b)=>b.revenueCents - a.revenueCents).slice(0, 10);
    // Recent purchases — last 25.
    const { data: recent } = await db.from("purchases").select("id, email, kit_ids, amount_cents, created_at").order("created_at", {
        ascending: false
    }).limit(25);
    const recentPurchases = (recent ?? []).map((r)=>({
            id: r.id,
            email: r.email,
            kitIds: r.kit_ids ?? [],
            amountCents: r.amount_cents,
            createdAt: r.created_at
        }));
    // Recent leads — last 25.
    const { data: leadsRecent } = await db.from("leads").select("email, source, welcomed_at, converted_at").order("welcomed_at", {
        ascending: false
    }).limit(25);
    const recentLeads = (leadsRecent ?? []).map((r)=>({
            email: r.email,
            source: r.source,
            createdAt: r.welcomed_at,
            converted: Boolean(r.converted_at)
        }));
    return {
        kpis: {
            revenueTodayCents,
            revenueMonthCents,
            revenueYearCents,
            totalCustomers,
            activeProPlus,
            proPlusMRRCents,
            newsletterListSize,
            conversionRate30d,
            proChurnRate30d
        },
        revenueTrend30d,
        customerTrend90d,
        topKits30d,
        recentPurchases,
        activePro: activePro.sort((a, b)=>a.startedAt.localeCompare(b.startedAt)).slice(0, 25),
        recentLeads
    };
}
}),
"[project]/src/app/api/admin/stats/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin-auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$stats$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin-stats.ts [app-route] (ecmascript)");
;
;
;
const runtime = "nodejs";
const dynamic = "force-dynamic";
async function GET() {
    if (!await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAdmin"])()) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    try {
        const stats = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$stats$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadAdminStats"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(stats, {
            headers: {
                "Cache-Control": "private, no-store"
            }
        });
    } catch (err) {
        console.error("[admin-stats] failed:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to load stats"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0f4d2va._.js.map
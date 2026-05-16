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
"[project]/src/lib/resend.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resend",
    ()=>resend
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/env.ts [app-route] (ecmascript)");
;
;
let _resend = null;
function resend() {
    if (!_resend) {
        _resend = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].resendKey);
    }
    return _resend;
}
}),
"[project]/src/lib/email-automation.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "alreadySent",
    ()=>alreadySent,
    "logEmailEvent",
    ()=>logEmailEvent,
    "renderEmail",
    ()=>renderEmail,
    "sendCampaignEmail",
    ()=>sendCampaignEmail
]);
/**
 * Email automation helpers.
 *
 * Every lifecycle email goes through `sendCampaignEmail()` so it's:
 *   1. Idempotent — checks `email_events` for an existing `sent` row
 *      keyed on (recipient, template). If one exists, the send is skipped.
 *   2. Logged — every successful send writes a `sent` event so the
 *      founder dashboard + the next-step cron can read it.
 *   3. Unsubscribe-aware — checks `leads.unsubscribed_at` before sending.
 *      Paying customers (Pro+ subscribers) aren't in `leads`; we still
 *      respect a `metadata.unsubscribed_at` on their `purchases` row in
 *      the helper below.
 *
 * The cron flows (welcome series + Pro+ retention) live in
 * `supabase/functions/email-cron/index.ts`. Anything we send via the
 * Stripe webhook (receipt, Pro+ welcome) also routes through here.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$resend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/resend.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/env.ts [app-route] (ecmascript)");
;
;
;
async function sendCampaignEmail(args) {
    const recipient = args.recipient.toLowerCase().trim();
    if (!recipient || !recipient.includes("@")) {
        return {
            status: "failed",
            reason: "invalid recipient"
        };
    }
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseService"])();
    // 1. Unsubscribe check against leads.
    const { data: leadRow } = await db.from("leads").select("unsubscribed_at").ilike("email", recipient).maybeSingle();
    if (leadRow?.unsubscribed_at) {
        return {
            status: "unsubscribed"
        };
    }
    // 2. Idempotency check.
    if (!args.force) {
        const { data: existing } = await db.from("email_events").select("id").ilike("recipient", recipient).eq("template", args.template).eq("event_type", "sent").limit(1).maybeSingle();
        if (existing) {
            return {
                status: "skipped",
                reason: "already sent"
            };
        }
    }
    // 3. Send via Resend.
    let resendId;
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$resend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resend"])().emails.send({
            from: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].resendFrom,
            to: recipient,
            subject: args.subject,
            html: args.html,
            text: args.text,
            tags: [
                {
                    name: "template",
                    value: args.template
                }
            ]
        });
        // Resend SDK returns either { data: { id }, error: null } or { error }.
        if ("data" in result && result.data?.id) {
            resendId = result.data.id;
        }
    } catch (err) {
        const msg = err instanceof Error ? err.message : "unknown send error";
        return {
            status: "failed",
            reason: msg
        };
    }
    // 4. Log the sent event.
    await db.from("email_events").insert({
        recipient,
        template: args.template,
        event_type: "sent",
        resend_id: resendId,
        metadata: args.metadata ?? {}
    });
    return {
        status: "sent",
        resendId
    };
}
async function logEmailEvent(args) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseService"])();
    await db.from("email_events").insert({
        recipient: args.recipient.toLowerCase().trim(),
        template: args.template,
        event_type: args.eventType,
        resend_id: args.resendId,
        metadata: args.metadata ?? {}
    });
}
async function alreadySent(recipient, template) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseService"])();
    const { data } = await db.from("email_events").select("id").ilike("recipient", recipient.toLowerCase().trim()).eq("template", template).eq("event_type", "sent").limit(1).maybeSingle();
    return Boolean(data);
}
function renderEmail(args) {
    const preheader = args.preheader ? `<div style="display:none;visibility:hidden;opacity:0;max-height:0;overflow:hidden;color:transparent;">${escapeHtml(args.preheader)}</div>` : "";
    const cta = args.cta ? `<p style="margin:24px 0 0;">
         <a href="${args.cta.url}" style="display:inline-block;padding:14px 22px;background:#111418;color:#ffffff;border-radius:999px;text-decoration:none;font-weight:500;font-size:15px;">${escapeHtml(args.cta.label)}</a>
       </p>` : "";
    const footnote = args.footnote ? `<p style="margin:24px 0 0;color:#9ca3af;font-size:12px;line-height:1.55;">${args.footnote}</p>` : "";
    return `<!doctype html>
<html><body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Inter',system-ui,sans-serif;color:#111418;">
${preheader}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 16px;">
  <tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #ececec;border-radius:22px;overflow:hidden;">
      <tr><td style="padding:36px 36px 8px;">
        <h1 style="margin:0 0 12px;font-size:24px;font-weight:600;letter-spacing:-0.02em;line-height:1.25;">${escapeHtml(args.heading)}</h1>
        <div style="margin:0;color:#475569;font-size:15px;line-height:1.6;">${args.body}</div>
        ${cta}
        ${footnote}
        <p style="margin:24px 0 0;color:#9ca3af;font-size:12px;">© Lumenari · lumenari.io</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}
function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c)=>c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&#39;");
}
}),
"[project]/src/data/kits.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Lumenari kit catalog — source of truth for the 100-SKU launch + 13 bundles.
 *
 * `slug` is the URL and the content-folder name. Deliverables (SKILL.md +
 * supporting files) live in `/content/<slug>/`. Stripe price IDs are read
 * from env vars so the Stripe dashboard owns the price source of truth.
 *
 * Prices are stored as integer cents per the Sovren convention.
 *
 * Every kit ships with these standard files (on top of kit-specific docs):
 *   - SKILL.md                       — for tools that support the SKILL standard
 *   - memory.md                      — domain context: vocabulary, workflows, tone
 *   - optimization-pack.md           — paste-able system prompt for any chat AI
 *   - custom-gpt-instructions.md     — ChatGPT "Create a GPT" formatted
 *   - quick-start.md                 — 3-step setup, dummy-proof
 */ __turbopack_context__.s([
    "BUNDLE",
    ()=>BUNDLE,
    "BUNDLES",
    ()=>BUNDLES,
    "KITS",
    ()=>KITS,
    "bundleSavings",
    ()=>bundleSavings,
    "bundleStandaloneTotal",
    ()=>bundleStandaloneTotal,
    "formatCAD",
    ()=>formatCAD,
    "getBundle",
    ()=>getBundle,
    "getKit",
    ()=>getKit
]);
/** Standard files every kit ships with. Always include first. */ const STANDARD_VARIANTS = [
    "memory.md",
    "optimization-pack.md",
    "custom-gpt-instructions.md",
    "quick-start.md"
];
// STANDARD_VARIANTS is spread into round-1 entries' `deliverables` below.
void STANDARD_VARIANTS;
const KITS = [
    {
        id: "ts-next-production",
        slug: "ts-next-production",
        name: "TypeScript + Next.js Production Pack",
        tagline: "RLS-aware App Router patterns, Supabase wiring, and conventions that survive contact with real users.",
        description: "A senior-engineer companion for shipping production Next.js + Supabase apps. Drop the SKILL.md into your project and Claude starts writing code that matches your file structure, respects your auth boundary, and ships clean PRs.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [
            "I'm shipping a SaaS on Next.js + Supabase",
            "I'm an indie dev who wants AI to write production-grade TS",
            "I'm a solo founder pairing with Claude Code"
        ],
        keywords: [
            "nextjs",
            "next.js",
            "next 14",
            "next 15",
            "app router",
            "typescript",
            "ts",
            "react",
            "supabase",
            "rls",
            "server actions",
            "edge",
            "claude code",
            "cursor",
            "saas",
            "production"
        ],
        whatsInside: [
            "App Router file conventions — when to use route handlers vs. server actions vs. client components",
            "Supabase server/client/admin singleton pattern with type-safe RLS-aware queries",
            "Form + action patterns with Zod validation, optimistic UI, and accessible error states",
            "Environment, deployment, and observability defaults for Vercel + Supabase",
            "Refactor recipes — what to do when the codebase grows past 30 components"
        ],
        stripePriceEnv: "STRIPE_PRICE_TS_NEXT",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "patterns/supabase-clients.md",
            "patterns/server-actions.md",
            "patterns/forms-and-validation.md",
            "checklists/pr-ready.md"
        ]
    },
    {
        id: "supabase-schema-rls",
        slug: "supabase-schema-rls",
        name: "Supabase Schema & RLS Pack",
        tagline: "Multi-tenant Postgres schema patterns and a real RLS policy library — not the toy examples in the docs.",
        description: "Everything Chris has learned modelling multi-tenant Postgres for Sovren Sports and TradePass, distilled into a SKILL.md the AI can lean on.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude"
        ],
        personas: [
            "I'm designing a multi-tenant Postgres schema",
            "I keep getting RLS wrong and locking myself out",
            "I need patterns for organizations + members + roles"
        ],
        keywords: [
            "supabase",
            "postgres",
            "schema",
            "migration",
            "rls",
            "row level security",
            "multi-tenant",
            "tenancy",
            "auth.uid",
            "policy",
            "saas database"
        ],
        whatsInside: [
            "Tenant model decisions — schema-per-tenant vs. tenant_id column with worked tradeoffs",
            "Reusable RLS helper functions: is_member_of, has_role, is_owner",
            "Policy patterns: public read, member read, owner write, service-role bypass",
            "Migration discipline — review checklist + rollback recipes",
            "An auditable seed pattern that survives staging refreshes"
        ],
        stripePriceEnv: "STRIPE_PRICE_SUPABASE_RLS",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "patterns/tenant-models.md",
            "patterns/rls-policy-library.md",
            "patterns/migration-discipline.md",
            "examples/0001_init_example.sql"
        ]
    },
    {
        id: "stripe-connect",
        slug: "stripe-connect",
        name: "Stripe Connect Implementation Pack",
        tagline: "Platform → creator payments, parent → club splits, webhooks, refunds, and the failure modes nobody documents.",
        description: "The Stripe docs cover the happy path. This kit covers everything that happens after: failed webhooks, partial refunds, chargebacks while a payout is in flight, contract changes mid-season.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude"
        ],
        personas: [
            "I'm building a marketplace or revenue-share product",
            "I need to split payments between my platform and a customer",
            "I keep getting Stripe webhook idempotency wrong"
        ],
        keywords: [
            "stripe",
            "stripe connect",
            "payments",
            "marketplace",
            "revenue share",
            "rev share",
            "split payment",
            "webhook",
            "refund",
            "chargeback",
            "payouts",
            "destination charge"
        ],
        whatsInside: [
            "Account onboarding — Express vs. Standard, with the legal/tax tradeoffs spelled out",
            "Destination charges + application fees for clean two-party splits",
            "Idempotent webhook handler skeleton (TypeScript) with retry + dead-letter notes",
            "Refund + dispute playbook — who owes whom when money has already moved",
            "Edge cases: mid-contract account departure, currency conversion, tax-line handling"
        ],
        stripePriceEnv: "STRIPE_PRICE_STRIPE_CONNECT",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "patterns/account-onboarding.md",
            "patterns/destination-charges.md",
            "patterns/webhook-idempotency.md",
            "playbooks/refunds-and-disputes.md"
        ]
    },
    {
        id: "trades-construction",
        slug: "trades-construction",
        name: "Trades & Construction Workflow Pack",
        tagline: "Turn your AI into a back-office for certs, safety paperwork, and onboarding documents.",
        description: "Built by a journeyman pipefitter who got tired of writing the same toolbox-talks, fit-for-duty letters, and orientation packets over and over.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [
            "I run a small trades contracting business",
            "I'm a foreman drowning in safety paperwork",
            "I'm the HR person at a 20-person construction shop"
        ],
        keywords: [
            "construction",
            "trades",
            "pipefitter",
            "welder",
            "electrician",
            "scaffolder",
            "safety",
            "ohs",
            "toolbox talk",
            "fit for duty",
            "certification",
            "ticket",
            "onboarding",
            "contractor",
            "subcontractor"
        ],
        whatsInside: [
            "Toolbox-talk and JHA/FLRA generator prompts — Alberta and BC OHS-aware",
            "Certification tracking template (CWB, gas test, rigging, fall protect, etc.)",
            "Fit-for-duty and return-to-work letter templates",
            "New-hire orientation packet generator — site rules, PPE, emergency contacts",
            "Subcontractor onboarding checklist + WCB/COR verification cues"
        ],
        stripePriceEnv: "STRIPE_PRICE_TRADES",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "templates/toolbox-talk.md",
            "templates/jha-template.md",
            "templates/fit-for-duty.md",
            "checklists/sub-onboarding.md"
        ]
    },
    {
        id: "startup-founder",
        slug: "startup-founder",
        name: "Startup Founder Toolkit",
        tagline: "Pitch decks, investor updates, hiring briefs, and runway math — without the consultant-speak.",
        description: "The communication tools you actually need as a solo or small-team founder. Each prompt was sharpened against real investor feedback.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [
            "I'm a solo founder",
            "I'm preparing for fundraising",
            "I write a monthly investor update and hate every word"
        ],
        keywords: [
            "founder",
            "startup",
            "pitch deck",
            "investor update",
            "hiring",
            "job description",
            "runway",
            "fundraise",
            "seed",
            "pre-seed",
            "moat",
            "narrative"
        ],
        whatsInside: [
            "Pitch deck generator — opinionated 10-slide structure, not the McKinsey 40-slider",
            "Monthly investor update template + the 5 questions every update should answer",
            "Job description prompts that read like a person wrote them",
            "Runway and burn model prompt (paste in your numbers, get a sanity check)",
            "Customer interview note-to-insight converter"
        ],
        stripePriceEnv: "STRIPE_PRICE_FOUNDER",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "templates/pitch-deck.md",
            "templates/investor-update.md",
            "templates/job-description.md",
            "models/runway-prompt.md"
        ]
    },
    {
        id: "apple-style-ux",
        slug: "apple-style-ux",
        name: "Apple-Style UX Pack",
        tagline: "Design principles, copy patterns, progressive disclosure, and sensible defaults baked into every prompt.",
        description: "The taste primer Chris uses on every product. Walks the AI through the actual Apple HIG decisions — what to put on screen, what to hide, how to write the button.",
        priceCents: 1900,
        aiTargets: [
            "any"
        ],
        personas: [
            "I'm designing a consumer product and want it to feel premium",
            "I'm a developer who needs better UX taste",
            "My copy sounds like a corporate intranet"
        ],
        keywords: [
            "ux",
            "design",
            "apple",
            "hig",
            "human interface guidelines",
            "copywriting",
            "microcopy",
            "progressive disclosure",
            "premium",
            "minimal",
            "accessibility"
        ],
        whatsInside: [
            "The 7-rule Apple-style design heuristic, with examples and counter-examples",
            "UX copy patterns — buttons, empty states, errors, onboarding",
            "Progressive disclosure recipes for forms, settings, and dashboards",
            "Sensible-default checklist — what to ask vs. what to assume",
            "Mobile touch-target + spacing guide (44pt, generous whitespace)"
        ],
        stripePriceEnv: "STRIPE_PRICE_APPLE_UX",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "principles/seven-rules.md",
            "patterns/microcopy.md",
            "patterns/progressive-disclosure.md",
            "checklists/sensible-defaults.md"
        ]
    },
    {
        id: "real-estate-pro",
        slug: "real-estate-pro",
        name: "Real Estate Listings + Market Analysis",
        tagline: "MLS-ready listings, CMAs, neighborhood profiles, and the follow-up emails that actually close deals.",
        description: "Built for agents and brokers who'd rather be showing houses than writing copy.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [
            "I'm a real estate agent writing listings",
            "I'm a broker doing CMAs every week",
            "I'm a Realtor who wants tighter buyer + seller follow-up"
        ],
        keywords: [
            "real estate",
            "realtor",
            "agent",
            "broker",
            "listing",
            "mls",
            "cma",
            "comparative market analysis",
            "open house",
            "buyer",
            "seller",
            "neighborhood",
            "property",
            "zillow",
            "redfin",
            "house",
            "condo",
            "luxury",
            "fixer",
            "follow-up"
        ],
        whatsInside: [
            "Listing description templates by property type — SFH, condo, luxury, fixer-upper, multi-family",
            "CMA / comparative market analysis prompt that handles three comp scenarios in one shot",
            "Neighborhood profile generator — schools, transit, walkability, recent sales summary",
            "Buyer + seller follow-up email cadences (day 0/3/7/14/30)",
            "Open-house promotion copy + just-sold social posts for every channel"
        ],
        stripePriceEnv: "STRIPE_PRICE_REAL_ESTATE",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "templates/listing-descriptions.md",
            "templates/cma-prompt.md",
            "templates/buyer-seller-followups.md"
        ]
    },
    {
        id: "sales-outreach-pro",
        slug: "sales-outreach-pro",
        name: "Sales Cold Outreach + Follow-up",
        tagline: "Personalized cold emails, follow-up cadences, and reply handling that doesn't sound like a template.",
        description: "The frameworks that turn 'just touching base' into actual meetings. PAS, BAB, AIDA — each adapted for the modern AI workflow.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [
            "I'm an SDR sending cold emails",
            "I'm a founder doing my own sales",
            "I'm an AE working warm + cold deals"
        ],
        keywords: [
            "sales",
            "cold email",
            "outreach",
            "sdr",
            "ae",
            "bdr",
            "prospecting",
            "follow-up",
            "follow up",
            "cadence",
            "linkedin",
            "personalization",
            "objection",
            "discovery",
            "demo",
            "lost deal",
            "nurture"
        ],
        whatsInside: [
            "Cold-email frameworks (PAS, BAB, AIDA) with worked examples",
            "Account-research prompt — turn a LinkedIn URL + company name into a personalized opener",
            "Follow-up cadences (day 0/3/7/14/21) with bump-email templates",
            "Reply-handling for the seven most common objections",
            "Meeting recap + next-steps email generator, and a lost-deal nurture sequence"
        ],
        stripePriceEnv: "STRIPE_PRICE_SALES_OUTREACH",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "frameworks/cold-email-frameworks.md",
            "templates/follow-up-cadences.md",
            "playbooks/objection-handling.md"
        ]
    },
    {
        id: "solopreneur-toolkit",
        slug: "solopreneur-toolkit",
        name: "Solopreneur Toolkit",
        tagline: "Proposals, SOWs, intake forms, invoice nudges, and the visibility posts that bring the next client.",
        description: "Everything a freelancer, consultant, or indie operator needs to run the business side of their business.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [
            "I'm a freelance designer writing proposals",
            "I'm a consultant chasing late invoices",
            "I'm an indie operator who hates the admin part"
        ],
        keywords: [
            "freelance",
            "freelancer",
            "consultant",
            "indie",
            "solo",
            "solopreneur",
            "proposal",
            "sow",
            "scope of work",
            "statement of work",
            "intake",
            "invoice",
            "client update",
            "niche",
            "pricing",
            "contract",
            "linkedin",
            "out of office",
            "auto-responder"
        ],
        whatsInside: [
            "Client proposal generator with three pricing-tier patterns",
            "SOW + statement-of-work drafts you can edit instead of write",
            "Project intake form + the discovery questions to ask before quoting",
            "Weekly client update template that builds trust without filler",
            "Invoice + late-payment reminder copy that stays professional",
            "LinkedIn visibility post templates + 'going on holiday' auto-responder",
            "Niche-down brainstorm prompt and pricing-conversation scripts"
        ],
        stripePriceEnv: "STRIPE_PRICE_SOLOPRENEUR",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "templates/proposal-and-sow.md",
            "templates/client-updates-and-invoices.md",
            "playbooks/pricing-and-niching.md"
        ]
    },
    {
        id: "seo-content-writer",
        slug: "seo-content-writer",
        name: "SEO Content Writer",
        tagline: "Keyword-clustered outlines, longform article generation, meta optimization, schema markup, and refresh prompts.",
        description: "Built for content marketers who ship 3+ articles a week and can't afford one of them to be wasted.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [
            "I'm an SEO content writer publishing weekly",
            "I run a content team at a small SaaS",
            "I'm a blogger trying to climb past page 2"
        ],
        keywords: [
            "seo",
            "content",
            "writer",
            "blog",
            "article",
            "longform",
            "outline",
            "keyword",
            "meta description",
            "title tag",
            "schema markup",
            "faq",
            "how-to",
            "serp",
            "intent",
            "ranking",
            "refresh"
        ],
        whatsInside: [
            "Keyword-clustered article outliner that respects SERP intent",
            "Longform article generator with internal-linking suggestions baked in",
            "Meta title + description optimizer — 60/160 char-aware",
            "Schema markup generator: FAQ, How-To, Article, Product",
            "Content-refresh prompt that takes an old article and updates it without losing rankings",
            "Content-brief template you can hand to any writer or AI"
        ],
        stripePriceEnv: "STRIPE_PRICE_SEO_CONTENT",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "templates/article-outliner.md",
            "templates/meta-and-schema.md",
            "playbooks/content-refresh.md"
        ]
    },
    {
        id: "recruiter-pro",
        slug: "recruiter-pro",
        name: "Recruiter Outreach + JD Writer",
        tagline: "JDs that read like a person wrote them, Boolean searches that find the right candidates, outreach that gets replies.",
        description: "Built with input from in-house and agency recruiters who'd been burned by generic AI tools.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [
            "I'm an in-house recruiter at a startup",
            "I'm an agency recruiter sourcing senior engineers",
            "I run talent acquisition for a 50-person company"
        ],
        keywords: [
            "recruiter",
            "recruiting",
            "talent",
            "sourcing",
            "boolean",
            "linkedin",
            "jd",
            "job description",
            "outreach",
            "candidate",
            "interview",
            "behavioral",
            "technical",
            "reference check",
            "offer letter",
            "rejection",
            "ats"
        ],
        whatsInside: [
            "Job description generator with anti-bias linting baked in",
            "Boolean-search builder for LinkedIn, GitHub, and standard ATS sources",
            "Candidate outreach templates by seniority and role family",
            "Interview kit: screening questions, behavioral, technical (role-specific)",
            "Reference-check question bank and warm, respectful rejection email templates",
            "Offer-letter component library you can mix into your standard template"
        ],
        stripePriceEnv: "STRIPE_PRICE_RECRUITER",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "templates/jd-generator.md",
            "templates/outreach-and-interviews.md",
            "playbooks/boolean-and-sourcing.md"
        ]
    },
    {
        id: "resume-job-search",
        slug: "resume-job-search",
        name: "Resume + Job Search Pack",
        tagline: "Résumé tailoring per JD, cover letters, LinkedIn rewrites, interview prep, and post-interview follow-ups.",
        description: "Everything you'd hand a friend job-hunting in a tough market. Tailoring is the move — generic résumés get filtered out before a human reads them.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [
            "I'm laid off and applying to a lot of jobs",
            "I'm employed but looking for the next step",
            "I'm a new grad trying to break in"
        ],
        keywords: [
            "resume",
            "résumé",
            "cv",
            "cover letter",
            "linkedin",
            "job search",
            "interview",
            "star",
            "behavioral",
            "technical interview",
            "follow up",
            "rejection",
            "ats",
            "keyword",
            "tailoring"
        ],
        whatsInside: [
            "Résumé tailoring prompt — paste in a JD, get a tailored bullet rewrite that keeps ATS keywords",
            "Cover letter generator that doesn't open with 'I am writing to apply'",
            "LinkedIn headline + summary rewrite for visibility",
            "STAR / behavioral / technical interview prep frameworks",
            "Post-interview, post-rejection, and ghost-recovery follow-up emails"
        ],
        stripePriceEnv: "STRIPE_PRICE_RESUME_JOB",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "templates/resume-tailoring.md",
            "templates/cover-letter-and-linkedin.md",
            "playbooks/interview-prep-and-followups.md"
        ]
    },
    {
        id: "pm-toolkit",
        slug: "pm-toolkit",
        name: "Product Manager Toolkit",
        tagline: "PRDs, roadmap docs, sprint planning, stakeholder updates, and the metrics-review prompts that make exec readouts easy.",
        description: "Built for PMs who are sick of writing the same PRD shape from scratch every time. Drop-in prompts for every artifact a PM ships.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [
            "I'm a PM at a 50-500 person company",
            "I'm a founding PM at a startup",
            "I'm a senior PM running multiple workstreams"
        ],
        keywords: [
            "pm",
            "product manager",
            "prd",
            "spec",
            "roadmap",
            "now next later",
            "sprint",
            "planning",
            "stakeholder",
            "update",
            "metrics",
            "kpi",
            "okr",
            "north star"
        ],
        whatsInside: [
            "PRD generator with goals, non-goals, success metrics, acceptance criteria",
            "Now/Next/Later roadmap drafter that converts a backlog into prioritized buckets",
            "Sprint planning aid — capacity, scope, carry-over handling",
            "Stakeholder update template — exec-brief, engineering-detail, customer-facing variants",
            "Metrics review prompt — trends, anomalies, follow-up questions"
        ],
        stripePriceEnv: "STRIPE_PRICE_PM_TOOLKIT",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "templates/prd-and-roadmap.md",
            "templates/stakeholder-updates.md",
            "playbooks/sprint-and-metrics.md"
        ]
    },
    {
        id: "newsletter-writer",
        slug: "newsletter-writer",
        name: "Newsletter / Substack Writer",
        tagline: "Issue outliner, headline tester, hook generator, growth-loop ideas, and re-engagement copy that actually re-engages.",
        description: "For solo newsletter writers shipping weekly. Each prompt was sharpened against real Substack/Beehiiv metrics — opens, clicks, and unsubs.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [
            "I'm a solo newsletter writer on Substack or Beehiiv",
            "I run content marketing at a small SaaS",
            "I'm growing a paid newsletter from 0 to 1k"
        ],
        keywords: [
            "newsletter",
            "substack",
            "beehiiv",
            "convertkit",
            "mailchimp",
            "headline",
            "subject line",
            "intro hook",
            "open rate",
            "click rate",
            "growth loop",
            "cross-promotion",
            "re-engagement",
            "churn"
        ],
        whatsInside: [
            "Issue outliner — turn a topic into a 5-section structure with hooks",
            "Headline / subject-line tester (10 variants graded against your audience)",
            "Intro hook generator (curiosity, contrarian, story, stat)",
            "Growth-loop idea generator — viral mechanics fit for newsletters",
            "Cross-promo + re-engagement templates"
        ],
        stripePriceEnv: "STRIPE_PRICE_NEWSLETTER",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "templates/issue-outliner-and-hooks.md",
            "templates/headlines-and-growth.md",
            "playbooks/re-engagement.md"
        ]
    },
    {
        id: "ios-swiftui",
        slug: "ios-swiftui",
        name: "iOS / SwiftUI Production Pack",
        tagline: "Apple HIG patterns, App Store readiness, SwiftData + CloudKit examples, accessibility patterns, and the SwiftUI gotchas you keep hitting.",
        description: "For indie iOS devs and small teams shipping SwiftUI apps. Built to make Claude/Cursor produce idiomatic Swift, not RxJava-flavored Kotlin-isms.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [
            "I'm an indie iOS developer",
            "I'm shipping a SwiftUI + SwiftData app",
            "I'm porting a web product to iOS"
        ],
        keywords: [
            "ios",
            "swift",
            "swiftui",
            "swiftdata",
            "cloudkit",
            "hig",
            "app store",
            "tca",
            "observable",
            "actor",
            "concurrency",
            "accessibility",
            "apple"
        ],
        whatsInside: [
            "SwiftUI idioms — Observable, environment, navigation stacks, sheets",
            "SwiftData + CloudKit examples — relationships, predicates, migrations",
            "Apple HIG references with platform conventions baked in",
            "Accessibility patterns — VoiceOver, Dynamic Type, contrast, reduced motion",
            "App Store readiness checklist — privacy manifest, screenshots, metadata"
        ],
        stripePriceEnv: "STRIPE_PRICE_IOS_SWIFTUI",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "patterns/swiftui-idioms.md",
            "patterns/swiftdata-cloudkit.md",
            "checklists/app-store-readiness.md"
        ]
    },
    {
        id: "python-data",
        slug: "python-data",
        name: "Python Data Analysis Pack",
        tagline: "Pandas / DuckDB / Plotly recipes, EDA prompts, statistical-test cookbook, and the SQL→pandas idioms you keep googling.",
        description: "Built for analysts and data scientists who pair with AI for half their notebooks. Replaces the constant 'how do I do this in pandas' loop.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [
            "I'm a data analyst doing daily notebook work",
            "I'm a data scientist building dashboards + models",
            "I'm a developer who hits pandas occasionally and forgets the API"
        ],
        keywords: [
            "python",
            "pandas",
            "duckdb",
            "plotly",
            "matplotlib",
            "seaborn",
            "eda",
            "statistics",
            "hypothesis test",
            "p-value",
            "regression",
            "sql",
            "polars",
            "jupyter",
            "notebook"
        ],
        whatsInside: [
            "Pandas / DuckDB / Polars recipe library — common operations side by side",
            "EDA prompt — load a dataset, get null rates, distributions, suspicious values",
            "Statistical-test cookbook — t-test, chi-square, ANOVA, regression",
            "SQL ↔ pandas idiom translator",
            "Plot styling defaults that match Apple-clean aesthetics"
        ],
        stripePriceEnv: "STRIPE_PRICE_PYTHON_DATA",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "recipes/pandas-duckdb-polars.md",
            "recipes/stats-cookbook.md",
            "patterns/sql-to-pandas.md"
        ]
    },
    {
        id: "support-templates",
        slug: "support-templates",
        name: "Customer Support Templates",
        tagline: "Refund, escalation, lost-order, upsell-from-support, and NPS-detractor responses — formal, friendly, or warm.",
        description: "For support leads and solo founders handling tickets. Every template comes in three tones so the same response fits a Series A SaaS or a candle subscription.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [
            "I'm a solo founder doing my own support",
            "I run a support team at a small DTC brand",
            "I'm a customer success manager handling escalations"
        ],
        keywords: [
            "customer support",
            "support",
            "csm",
            "escalation",
            "refund",
            "lost order",
            "shipping",
            "nps",
            "detractor",
            "upsell",
            "tone",
            "saas support",
            "ecommerce support"
        ],
        whatsInside: [
            "Refund response templates (granted, partial, denied) in three tones",
            "Escalation acknowledgement and follow-through copy",
            "Lost-order / shipping-delay scripts",
            "Upsell-from-support patterns — only when it's actually a fit",
            "NPS detractor recovery sequences"
        ],
        stripePriceEnv: "STRIPE_PRICE_SUPPORT",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "templates/refunds-and-escalations.md",
            "templates/lost-orders-and-upsell.md",
            "playbooks/nps-detractor-recovery.md"
        ]
    },
    {
        id: "brand-voice",
        slug: "brand-voice",
        name: "Brand Voice Builder",
        tagline: "Hand the AI 3-5 samples of your writing and it produces a voice profile you can apply to every future asset.",
        description: "Replaces the consultant who used to charge $5k for a 'voice & tone' document. Feed it samples, get a voice-attribute matrix and on-brand vs. off-brand examples.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [
            "I'm a solo founder with a vibe I can't articulate",
            "I run marketing and need brand consistency across writers",
            "I'm a freelancer who has to match a client's voice"
        ],
        keywords: [
            "brand",
            "brand voice",
            "tone",
            "voice and tone",
            "style guide",
            "copy",
            "messaging",
            "consistency",
            "on-brand",
            "off-brand",
            "personality"
        ],
        whatsInside: [
            "Sample-to-voice extractor — paste 3-5 samples, get a voice-attribute matrix",
            "Voice application prompt — rewrite any draft in your voice",
            "On-brand vs. off-brand example generator",
            "Voice-shift detector — flags AI output that sounds generic",
            "Versioned voice profile — saves your brand as a reusable file"
        ],
        stripePriceEnv: "STRIPE_PRICE_BRAND_VOICE",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "templates/sample-to-voice.md",
            "templates/voice-application.md",
            "playbooks/voice-drift-detection.md"
        ]
    },
    {
        id: "coach-pro",
        slug: "coach-pro",
        name: "Coach / Trainer / Therapist Pack",
        tagline: "Client comms, session notes, intake forms, and content marketing for solo practitioners — with disclaimers baked in.",
        description: "Built for life coaches, trainers, and licensed therapists who run a solo practice. Includes explicit not-professional-advice scaffolding so the AI never overreaches.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [
            "I'm a life coach running a solo practice",
            "I'm a personal trainer with 20 clients",
            "I'm a licensed therapist drowning in admin"
        ],
        keywords: [
            "coach",
            "coaching",
            "trainer",
            "therapist",
            "counselor",
            "wellness",
            "session notes",
            "soap notes",
            "intake",
            "client",
            "practitioner",
            "private practice",
            "disclaimer"
        ],
        whatsInside: [
            "Client onboarding email + intake form (with disclaimers)",
            "Session notes templates — SOAP, DAP, and narrative formats",
            "Marketing copy templates — Instagram, newsletter, website",
            "Re-engagement copy for lapsed clients",
            "Explicit mental-health disclaimers and crisis-protocol flags"
        ],
        stripePriceEnv: "STRIPE_PRICE_COACH",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "templates/intake-and-session-notes.md",
            "templates/marketing-copy.md",
            "playbooks/disclaimers-and-crisis-flags.md"
        ]
    },
    {
        id: "ecommerce-pro",
        slug: "ecommerce-pro",
        name: "E-commerce / Shopify Owner Pack",
        tagline: "Product descriptions, ad copy for Meta / Google / TikTok, review responses, abandoned-cart sequences, supplier emails.",
        description: "For solo and small-team Shopify owners shipping multiple SKUs. Replaces a $300/mo copywriting subscription that never quite gets your brand voice right.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [
            "I run a Shopify store solo",
            "I do marketing for a small DTC brand",
            "I'm launching a new product line"
        ],
        keywords: [
            "ecommerce",
            "shopify",
            "dtc",
            "product description",
            "meta ads",
            "google ads",
            "tiktok ads",
            "abandoned cart",
            "klaviyo",
            "review response",
            "supplier",
            "wholesale"
        ],
        whatsInside: [
            "Product description generator by category (apparel, home, beauty, food)",
            "Meta / Google / TikTok ad copy with platform-specific lengths and CTAs",
            "Review response templates (positive, neutral, negative)",
            "Abandoned-cart and welcome-series sequences",
            "Supplier and wholesale outreach email templates"
        ],
        stripePriceEnv: "STRIPE_PRICE_ECOMMERCE",
        deliverables: [
            "SKILL.md",
            ...STANDARD_VARIANTS,
            "templates/product-descriptions-and-ads.md",
            "templates/email-sequences.md",
            "playbooks/reviews-and-suppliers.md"
        ]
    },
    {
        id: "android-kotlin",
        slug: "android-kotlin",
        name: "Android / Kotlin Pack",
        tagline: "Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt.",
        description: "Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to write modern Android \u2014 Jetpack Compose, Material 3, Coroutines, Hilt, Room \u2014 not 2017 XML Fragments with AsyncTask.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [],
        keywords: [
            "dev",
            "android",
            "kotlin",
            "mobile"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_ANDROID_KOTLIN",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "patterns/compose-and-material3.md",
            "quick-start.md"
        ]
    },
    {
        id: "data-engineer-pro",
        slug: "data-engineer-pro",
        name: "Data Engineer Pack",
        tagline: "Drop this kit at the root of your data repo as `SKILL.md` or paste it into your AI's system prompt.",
        description: "Drop this kit at the root of your data repo as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to build ELT pipelines and dbt projects that survive a Monday morning backfill \u2014 staging layer respected, contracts honored, tests written first.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [],
        keywords: [
            "dev",
            "data",
            "etl",
            "pipelines"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_DATA_ENGINEER_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "patterns/dbt-models-and-quality.md",
            "quick-start.md"
        ]
    },
    {
        id: "devops-terraform",
        slug: "devops-terraform",
        name: "DevOps / Terraform / AWS Pack",
        tagline: "Drop this kit at the root of your infrastructure repo as `SKILL.md` or paste it into your AI's system prompt.",
        description: "Drop this kit at the root of your infrastructure repo as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to write Terraform the way a platform team that's been burned a few times writes it \u2014 small modules, scoped IAM, remote state, no surprises in `plan`.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [],
        keywords: [
            "dev",
            "devops",
            "terraform",
            "aws"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_DEVOPS_TERRAFORM",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "patterns/terraform-modules-and-iam.md",
            "quick-start.md"
        ]
    },
    {
        id: "go-backend",
        slug: "go-backend",
        name: "Go Backend Pack",
        tagline: "Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt.",
        description: "Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to write idiomatic Go \u2014 context everywhere, errors wrapped with `%w`, no panic for control flow, graceful shutdown by default.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [],
        keywords: [
            "dev",
            "go",
            "backend"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_GO_BACKEND",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "patterns/idiomatic-go-and-grpc.md",
            "quick-start.md"
        ]
    },
    {
        id: "graphql-design",
        slug: "graphql-design",
        name: "GraphQL API Design Pack",
        tagline: "Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt.",
        description: "Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to design GraphQL schemas that don't blow up on day 2 \u2014 DataLoader on every resolver, Relay-style pagination, nullable-by-design, deprecation instead of breaking changes.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [],
        keywords: [
            "dev",
            "graphql",
            "api"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_GRAPHQL_DESIGN",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "patterns/schema-and-resolvers.md",
            "quick-start.md"
        ]
    },
    {
        id: "kubernetes-pro",
        slug: "kubernetes-pro",
        name: "Kubernetes Pack",
        tagline: "Drop this kit at the root of your manifests repo as `SKILL.md` or paste it into your AI's system prompt.",
        description: "Drop this kit at the root of your manifests repo as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to write Kubernetes the way a team that's been on call for it writes it \u2014 pinned tags, bounded resources, GitOps-only changes, real observability.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [],
        keywords: [
            "dev",
            "kubernetes",
            "devops"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_KUBERNETES_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "patterns/deployments-and-observability.md",
            "quick-start.md"
        ]
    },
    {
        id: "ml-engineer-pro",
        slug: "ml-engineer-pro",
        name: "Machine Learning Engineer Pack",
        tagline: "Drop this kit at the root of your ML repo as `SKILL.md` or paste it into your AI's system prompt.",
        description: "Drop this kit at the root of your ML repo as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to ship ML systems the way you'd want a senior ML engineer to ship them \u2014 with model cards, real eval frameworks, prompts versioned like code, and drift monitoring that fires before customers notice.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [],
        keywords: [
            "dev",
            "ml",
            "machine-learning",
            "python"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_ML_ENGINEER_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/model-card-and-eval.md"
        ]
    },
    {
        id: "node-backend",
        slug: "node-backend",
        name: "Node.js Backend Pack",
        tagline: "Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt.",
        description: "Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to write Node + TypeScript backends that don't fall over at 100 RPS, don't leak secrets, and don't lose requests on shutdown.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [],
        keywords: [
            "dev",
            "node",
            "backend",
            "typescript"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_NODE_BACKEND",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "patterns/error-handling-and-observability.md",
            "quick-start.md"
        ]
    },
    {
        id: "postgres-dba",
        slug: "postgres-dba",
        name: "Postgres DBA Pack",
        tagline: "Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt.",
        description: "Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to tune Postgres the way a DBA who's been paged at 3am tunes it \u2014 EXPLAIN ANALYZE first, indexes second, migrations last and carefully.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [],
        keywords: [
            "dev",
            "postgres",
            "database",
            "dba"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_POSTGRES_DBA",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "patterns/indexing-and-explain.md",
            "quick-start.md"
        ]
    },
    {
        id: "python-backend",
        slug: "python-backend",
        name: "Python Backend Pack (Django / FastAPI)",
        tagline: "Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt.",
        description: "Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to write Python backends that don't N+1, don't block the event loop, and don't ship with sync ORM calls inside async routes.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [],
        keywords: [
            "dev",
            "python",
            "django",
            "fastapi"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_PYTHON_BACKEND",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "patterns/django-vs-fastapi-and-async.md",
            "quick-start.md"
        ]
    },
    {
        id: "qa-test-automation",
        slug: "qa-test-automation",
        name: "QA / Test Automation Pack",
        tagline: "Drop this kit at the root of your test repo as `SKILL.md` or paste it into your AI's system prompt.",
        description: "Drop this kit at the root of your test repo as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to write Playwright and Cypress tests that don't flake on a Monday morning, test plans that catch real bugs, and CI shards that finish before the coffee gets cold.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "dev",
            "qa",
            "testing",
            "playwright"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_QA_TEST_AUTOMATION",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "patterns/playwright-cypress-flake-reduction.md",
            "quick-start.md"
        ]
    },
    {
        id: "rails-backend",
        slug: "rails-backend",
        name: "Ruby on Rails Pack",
        tagline: "Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt.",
        description: "Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to write Rails 7/8 the way an actual Rails team writes it \u2014 convention-first, Hotwire-default, no service-object cargo cult.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [],
        keywords: [
            "dev",
            "ruby",
            "rails",
            "backend"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_RAILS_BACKEND",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "patterns/activerecord-and-deployment.md",
            "quick-start.md"
        ]
    },
    {
        id: "react-native-dev",
        slug: "react-native-dev",
        name: "React Native / Mobile Dev Pack",
        tagline: "Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt.",
        description: "Drop this kit at the root of your project as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to write React Native that runs cleanly on iOS and Android \u2014 not browser React copy-pasted into a Metro bundle.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [],
        keywords: [
            "dev",
            "react-native",
            "mobile",
            "typescript"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_REACT_NATIVE_DEV",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "patterns/component-and-native-modules.md",
            "quick-start.md"
        ]
    },
    {
        id: "rest-api-design",
        slug: "rest-api-design",
        name: "REST API Design Pack",
        tagline: "Drop this kit at the root of your API project as `SKILL.md` or paste it into your AI's system prompt.",
        description: "Drop this kit at the root of your API project as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to design REST APIs that survive contact with web clients, mobile apps, and third-party partners \u2014 without turning into RPC or breaking on the next sprint.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [],
        keywords: [
            "dev",
            "rest",
            "api"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_REST_API_DESIGN",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "patterns/resources-versioning-errors.md",
            "quick-start.md"
        ]
    },
    {
        id: "security-engineer",
        slug: "security-engineer",
        name: "Security Engineer Pack",
        tagline: "Drop this kit at the root of your repo as `SKILL.md` or paste it into your AI's system prompt.",
        description: "Drop this kit at the root of your repo as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to think like a security engineer: threat-model before features, allowlist before blacklist, and write security review notes that actually catch bugs.",
        priceCents: 1900,
        aiTargets: [
            "claude-code",
            "claude",
            "cursor"
        ],
        personas: [],
        keywords: [
            "dev",
            "security",
            "engineering"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_SECURITY_ENGINEER",
        deliverables: [
            "SKILL.md",
            "checklists/threat-model-and-incident-runbook.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md"
        ]
    },
    {
        id: "accountant-bookkeeper",
        slug: "accountant-bookkeeper",
        name: "Accountant + Bookkeeper Pack",
        tagline: "AI workflow pack for solo and small-firm accountants and bookkeepers \u2014 client intake, monthly close summaries, advisory comms, engagement letter clauses, and AR follow-up.",
        description: "AI workflow pack for solo and small-firm accountants and bookkeepers \u2014 client intake, monthly close summaries, advisory comms, engagement letter clauses, and AR follow-up. Built to keep the audit trail clean and the client comms calm.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "finance",
            "accounting",
            "bookkeeping"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_ACCOUNTANT_BOOKKEEPER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "financial-advisor",
        slug: "financial-advisor",
        name: "Financial Advisor Pack",
        tagline: "AI workflow pack for fee-only and dually-registered financial advisors \u2014 client review prep, market-summary comms, retirement-plan check-ins, meeting agendas, follow-up notes.",
        description: "AI workflow pack for fee-only and dually-registered financial advisors \u2014 client review prep, market-summary comms, retirement-plan check-ins, meeting agendas, follow-up notes. NOT INVESTMENT ADVICE \u2014 consult a licensed fee-only CFP, CFA, or IAR for any specific recommendation. The AI does not predict markets, does not recommend specific securities, and does not replace your fiduciary judgment.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "finance",
            "advisory",
            "wealth"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_FINANCIAL_ADVISOR",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "insurance-agent",
        slug: "insurance-agent",
        name: "Insurance Agent (P&C / Life) Pack",
        tagline: "AI workflow pack for licensed P&C and Life/Health insurance agents \u2014 quote walkthroughs, policy explainers, renewal outreach, claim-event communication, life-event reviews.",
        description: "AI workflow pack for licensed P&C and Life/Health insurance agents \u2014 quote walkthroughs, policy explainers, renewal outreach, claim-event communication, life-event reviews. NOT LEGAL OR COVERAGE ADVICE \u2014 consult your underwriter or licensed agent. The AI does not interpret policy language as binding, does not predict claim outcomes, and does not recommend dropping coverage.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "finance",
            "insurance",
            "agent"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_INSURANCE_AGENT",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "mortgage-broker",
        slug: "mortgage-broker",
        name: "Mortgage Broker Pack",
        tagline: "AI workflow pack for working mortgage brokers \u2014 client intake, pre-approval drafts, refi outreach, rate-update comms, jurisdiction-aware (US and Canada).",
        description: "AI workflow pack for working mortgage brokers \u2014 client intake, pre-approval drafts, refi outreach, rate-update comms, jurisdiction-aware (US and Canada). NOT licensed mortgage advice for your specific situation \u2014 consult a licensed mortgage broker. Rates and terms are illustrative, never binding.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "finance",
            "mortgage",
            "lending"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_MORTGAGE_BROKER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "real-estate-investor",
        slug: "real-estate-investor",
        name: "Real Estate Investor Pack",
        tagline: "AI workflow pack for small-to-mid real estate investors \u2014 LOIs, seller outreach, partner pitches, and deal-analysis prompts.",
        description: "AI workflow pack for small-to-mid real estate investors \u2014 LOIs, seller outreach, partner pitches, and deal-analysis prompts. Built for the operator running 1-50 doors or 1-10 flips a year.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "real-estate",
            "investing",
            "rentals"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_REAL_ESTATE_INVESTOR",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "career-coach",
        slug: "career-coach",
        name: "Career Coach Pack",
        tagline: "AI workflow pack for solo career coaches and small coaching practices.",
        description: "AI workflow pack for solo career coaches and small coaching practices. Client intake, content marketing, accountability check-ins, resume + LinkedIn review notes, networking-outreach drafts. Built for the practitioner working with mid-career professionals in transition.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "coaching",
            "career"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_CAREER_COACH",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "executive-coach",
        slug: "executive-coach",
        name: "Executive Coach Pack",
        tagline: "AI workflow pack for ICF / EMCC / CCE-credentialed executive coaches working with VP / C-level clients.",
        description: "AI workflow pack for ICF / EMCC / CCE-credentialed executive coaches working with VP / C-level clients. Session prep, client comms, leadership-framework writeups, 360-feedback synthesis, contracting language, boundary-holding scripts.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "coaching",
            "leadership",
            "executive"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_EXECUTIVE_COACH",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md",
            "templates/client-comms.md",
            "templates/frameworks.md"
        ]
    },
    {
        id: "hr-generalist",
        slug: "hr-generalist",
        name: "HR Generalist Pack",
        tagline: "AI workflow pack for HR generalists \u2014 policy drafts, internal announcements, handbook updates, employee comms, and performance review templates.",
        description: "AI workflow pack for HR generalists \u2014 policy drafts, internal announcements, handbook updates, employee comms, and performance review templates. Built to surface what's risky and flag it before you send.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "hr",
            "people-ops"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_HR_GENERALIST",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md",
            "templates/policy-drafts.md"
        ]
    },
    {
        id: "internal-recruiter",
        slug: "internal-recruiter",
        name: "Internal Recruiter Pack",
        tagline: "AI workflow pack for embedded corporate recruiters \u2014 hiring-manager intake, JD calibration with inclusive-language audit, offer-letter prep, candidate communication at every stage, debrief facilitation.",
        description: "AI workflow pack for embedded corporate recruiters \u2014 hiring-manager intake, JD calibration with inclusive-language audit, offer-letter prep, candidate communication at every stage, debrief facilitation. The req-closing side of the function.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "hr",
            "recruiting",
            "corporate"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_INTERNAL_RECRUITER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md",
            "templates/candidate-communication.md",
            "templates/hiring-manager-intake.md",
            "templates/jd-calibration.md",
            "templates/offer-and-close.md"
        ]
    },
    {
        id: "learning-development",
        slug: "learning-development",
        name: "L&D Specialist Pack",
        tagline: "AI workflow pack for L&D specialists and learning designers \u2014 training-program outlines, learning-objective drafts (Bloom's-aligned), facilitator guides, post-session surveys, manager-enablement comms, and the Kirkpatrick measurement nobody actually does.",
        description: "AI workflow pack for L&D specialists and learning designers \u2014 training-program outlines, learning-objective drafts (Bloom's-aligned), facilitator guides, post-session surveys, manager-enablement comms, and the Kirkpatrick measurement nobody actually does.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "hr",
            "training",
            "learning"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_LEARNING_DEVELOPMENT",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "talent-acquisition",
        slug: "talent-acquisition",
        name: "Talent Acquisition Specialist Pack",
        tagline: "AI workflow pack for Talent Acquisition Specialists \u2014 sourcing strategy, talent market mapping, candidate marketing, employer-brand content, and pipeline-health storytelling.",
        description: "AI workflow pack for Talent Acquisition Specialists \u2014 sourcing strategy, talent market mapping, candidate marketing, employer-brand content, and pipeline-health storytelling. The strategic cut of the recruiting function, not the req-closing cut.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "hr",
            "recruiting",
            "sourcing"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_TALENT_ACQUISITION",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md",
            "templates/candidate-marketing.md",
            "templates/pipeline-metrics.md",
            "templates/sourcing-strategies.md"
        ]
    },
    {
        id: "compliance-officer",
        slug: "compliance-officer",
        name: "Compliance Officer Pack",
        tagline: "AI workflow pack for compliance officers \u2014 policy drafts, audit-readiness checklists (SOC 2, ISO 27001, HIPAA, GDPR, PIPEDA), and employee training summaries.",
        description: "AI workflow pack for compliance officers \u2014 policy drafts, audit-readiness checklists (SOC 2, ISO 27001, HIPAA, GDPR, PIPEDA), and employee training summaries. NOT LEGAL ADVICE \u2014 consult qualified counsel, your firm's compliance officer, and the relevant regulator. Regulated industries vary (healthcare/HIPAA, financial services/SOX/Dodd-Frank, EU/GDPR, Canadian PIPEDA); the AI does not certify compliance and does not replace the human compliance professional's regulator relationship.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "operations",
            "compliance",
            "audit"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_COMPLIANCE_OFFICER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "ea-va",
        slug: "ea-va",
        name: "Executive Assistant / Virtual Assistant Pack",
        tagline: "AI workflow pack for executive assistants and virtual assistants \u2014 calendar coordination, email triage drafts, travel itineraries, expense follow-ups, gatekeeping comms.",
        description: "AI workflow pack for executive assistants and virtual assistants \u2014 calendar coordination, email triage drafts, travel itineraries, expense follow-ups, gatekeeping comms. Built to protect the principal's time without sounding like a robot.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "operations",
            "executive-assistant",
            "va"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_EA_VA",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "office-manager",
        slug: "office-manager",
        name: "Office Manager Pack",
        tagline: "AI workflow pack for office managers \u2014 vendor outreach, internal comms, small-event planning, facilities tickets, supply orders.",
        description: "AI workflow pack for office managers \u2014 vendor outreach, internal comms, small-event planning, facilities tickets, supply orders. Built for the person who's quietly running the room.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "operations",
            "office",
            "admin"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_OFFICE_MANAGER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "operations-manager",
        slug: "operations-manager",
        name: "Operations Manager Pack",
        tagline: "AI workflow pack for working Operations Managers \u2014 SOPs that someone can actually follow, KPI reviews that surface signal not noise, escalation matrices, and leadership briefings that don't bury bad news.",
        description: "AI workflow pack for working Operations Managers \u2014 SOPs that someone can actually follow, KPI reviews that surface signal not noise, escalation matrices, and leadership briefings that don't bury bad news.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "operations",
            "ops",
            "process"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_OPERATIONS_MANAGER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md",
            "templates/sop-customer-escalation.md",
            "templates/sop-end-of-month-close.md",
            "templates/sop-vendor-onboarding.md"
        ]
    },
    {
        id: "procurement-pro",
        slug: "procurement-pro",
        name: "Procurement Specialist Pack",
        tagline: "AI workflow pack for procurement specialists \u2014 RFx documents (RFI/RFQ/RFP), supplier communications, contract review checklists, and savings reports that survive finance scrutiny.",
        description: "AI workflow pack for procurement specialists \u2014 RFx documents (RFI/RFQ/RFP), supplier communications, contract review checklists, and savings reports that survive finance scrutiny. Not a substitute for legal counsel on contract terms.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "operations",
            "procurement",
            "sourcing"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_PROCUREMENT_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "project-manager-pmp",
        slug: "project-manager-pmp",
        name: "Project Manager (PMP-Style) Pack",
        tagline: "AI workflow pack for project managers \u2014 charters, status reports, RAID logs, change requests, stakeholder comms.",
        description: "AI workflow pack for project managers \u2014 charters, status reports, RAID logs, change requests, stakeholder comms. PMP-aware structure without the certification-exam voice.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "operations",
            "pmp",
            "project-management"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_PROJECT_MANAGER_PMP",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "risk-manager",
        slug: "risk-manager",
        name: "Risk Manager Pack",
        tagline: "AI workflow pack for enterprise risk managers \u2014 risk registers, mitigation plans, board summaries with heat maps, incident postmortems, and scenario-planning prompts.",
        description: "AI workflow pack for enterprise risk managers \u2014 risk registers, mitigation plans, board summaries with heat maps, incident postmortems, and scenario-planning prompts. The AI doesn't replace ERM frameworks (ISO 31000, COSO ERM, NIST RMF, FAIR) or D&O liability assessment \u2014 that's the human risk manager's job. Built to write risk language that's neither CYA nor dismissive \u2014 clear-eyed, at the right altitude, with probability talk that holds up.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "operations",
            "risk",
            "enterprise"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_RISK_MANAGER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "scrum-master",
        slug: "scrum-master",
        name: "Scrum Master Pack",
        tagline: "AI workflow pack for working Scrum Masters \u2014 retro formats, sprint review prep, blocker escalation language, ceremony agendas, and the stakeholder conversations that keep velocity from being weaponized.",
        description: "AI workflow pack for working Scrum Masters \u2014 retro formats, sprint review prep, blocker escalation language, ceremony agendas, and the stakeholder conversations that keep velocity from being weaponized.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "operations",
            "agile",
            "scrum"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_SCRUM_MASTER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "supply-chain-mgr",
        slug: "supply-chain-mgr",
        name: "Supply Chain Manager Pack",
        tagline: "AI workflow pack for working Supply Chain Managers \u2014 vendor evaluation, RFP/RFQ drafting, supplier scorecards, supply disruption comms, and the category strategy work that actually moves the cost line.",
        description: "AI workflow pack for working Supply Chain Managers \u2014 vendor evaluation, RFP/RFQ drafting, supplier scorecards, supply disruption comms, and the category strategy work that actually moves the cost line.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "operations",
            "supply-chain",
            "logistics"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_SUPPLY_CHAIN_MGR",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "contractor-gc",
        slug: "contractor-gc",
        name: "General Contractor Pack",
        tagline: "Bidding, scope of work, change orders, subcontractor coordination, and owner updates for small and mid-size GCs.",
        description: "Bidding, scope of work, change orders, subcontractor coordination, and owner updates for small and mid-size GCs. Built around the change-order-discipline triangle that protects margin on residential and light-commercial work.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "trades",
            "contractor",
            "construction"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_CONTRACTOR_GC",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "electrician-pro",
        slug: "electrician-pro",
        name: "Electrician Pack",
        tagline: "Service descriptions, code-referenced explanations, customer estimates, and trust-building copy for licensed electricians.",
        description: "Service descriptions, code-referenced explanations, customer estimates, and trust-building copy for licensed electricians. Defaults to verifying local code (NEC/CEC) and your AHJ \u2014 never quotes code without a verification flag.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "trades",
            "electrician"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_ELECTRICIAN_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "handyman-pro",
        slug: "handyman-pro",
        name: "Handyman / Maintenance Pack",
        tagline: "Small-job quoting, local social-post marketing, and scope-discipline language for solo handymen and small crews.",
        description: "Small-job quoting, local social-post marketing, and scope-discipline language for solo handymen and small crews. The Green/Yellow/Red framework keeps you out of jobs that should go to a licensed trade.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "trades",
            "handyman",
            "maintenance"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_HANDYMAN_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "hvac-pro",
        slug: "hvac-pro",
        name: "HVAC Tech Pack",
        tagline: "Install proposals, maintenance contracts, and seasonal upsell language for HVAC contractors and service techs.",
        description: "Install proposals, maintenance contracts, and seasonal upsell language for HVAC contractors and service techs. Includes the Manual J / AHRI match / cold-climate heat-pump education most homeowners are missing.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "trades",
            "hvac"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_HVAC_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "landscaper-pro",
        slug: "landscaper-pro",
        name: "Landscape + Yard Care Pack",
        tagline: "Service contracts, snow contracts, design-build proposals, and weather-driven schedule comms for landscape companies.",
        description: "Service contracts, snow contracts, design-build proposals, and weather-driven schedule comms for landscape companies. Built around the seasonal rhythm \u2014 weather is the boss and the writing reflects it.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "trades",
            "landscaping",
            "seasonal"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_LANDSCAPER_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "plumber-pro",
        slug: "plumber-pro",
        name: "Plumber Pack",
        tagline: "Emergency-and-scheduled service descriptions, troubleshooting customer comms, and transparent pricing language for licensed plumbers.",
        description: "Emergency-and-scheduled service descriptions, troubleshooting customer comms, and transparent pricing language for licensed plumbers. Pairs the empathy script that water-damage calls require with the technical clarity homeowners trust.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "trades",
            "plumbing"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_PLUMBER_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "roofing-pro",
        slug: "roofing-pro",
        name: "Roofing Contractor Pack",
        tagline: "Inspection reports, supplement requests, deductible-education copy, and customer-friendly warranty docs for roofing contractors.",
        description: "Inspection reports, supplement requests, deductible-education copy, and customer-friendly warranty docs for roofing contractors. Strict lane discipline on insurance work \u2014 refers claim advice to a licensed public adjuster or attorney.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "trades",
            "roofing",
            "insurance"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_ROOFING_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "auto-mechanic",
        slug: "auto-mechanic",
        name: "Auto Mechanic Pack",
        tagline: "Repair estimates, customer-friendly explanations of technical issues, follow-up notes, and declined-repair documentation for independent shops.",
        description: "Repair estimates, customer-friendly explanations of technical issues, follow-up notes, and declined-repair documentation for independent shops. The 4-part explanation pattern that closes the trust gap with skeptical customers.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "service",
            "auto",
            "mechanic"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_AUTO_MECHANIC",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "cleaning-services",
        slug: "cleaning-services",
        name: "Cleaning Service Owner Pack",
        tagline: "Service quotes (recurring, one-time, deep, move-out), client retention emails, and one-page staff training docs for residential and commercial cleaning companies.",
        description: "Service quotes (recurring, one-time, deep, move-out), client retention emails, and one-page staff training docs for residential and commercial cleaning companies. Engineered around the month-3 retention cliff.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "service",
            "cleaning"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_CLEANING_SERVICES",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "moving-company",
        slug: "moving-company",
        name: "Moving + Junk Removal Pack",
        tagline: "Quote requests, inventory walkthroughs, day-of customer comms, and neutral claims-response language for small moving and junk-removal companies.",
        description: "Quote requests, inventory walkthroughs, day-of customer comms, and neutral claims-response language for small moving and junk-removal companies. Refuses interstate-tariff guidance \u2014 defers to USDOT/FMCSA and counsel.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "service",
            "moving",
            "logistics"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_MOVING_COMPANY",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "airbnb-host",
        slug: "airbnb-host",
        name: "Airbnb / Short-Term Rental Host Pack",
        tagline: "Listing copy, guest comms (pre-arrival, mid-stay, post-stay), house manuals, and review-response language for STR hosts running 1-5 properties.",
        description: "Listing copy, guest comms (pre-arrival, mid-stay, post-stay), house manuals, and review-response language for STR hosts running 1-5 properties. Designed for the 5-star streak without turning your house into a hotel.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "hospitality",
            "airbnb",
            "short-term-rental"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_AIRBNB_HOST",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "cafe-owner",
        slug: "cafe-owner",
        name: "Cafe / Coffee Shop Pack",
        tagline: "Drink menus, seasonal launches, loyalty program copy, and Instagram posts for specialty cafes.",
        description: "Drink menus, seasonal launches, loyalty program copy, and Instagram posts for specialty cafes. Avoids twee coffee-shop talk while staying warm and specific to your roaster and bake program.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "hospitality",
            "cafe",
            "coffee"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_CAFE_OWNER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "event-caterer",
        slug: "event-caterer",
        name: "Event Caterer Pack",
        tagline: "Proposals (drop-off, buffet, plated, stationed), dietary-accommodation menus, vendor-coordination emails, and post-event follow-up for event caterers.",
        description: "Proposals (drop-off, buffet, plated, stationed), dietary-accommodation menus, vendor-coordination emails, and post-event follow-up for event caterers. Confident chef-led voice without the chef-bro edge.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "hospitality",
            "catering",
            "events"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_EVENT_CATERER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "hotel-operator",
        slug: "hotel-operator",
        name: "Hotel / B&B Operator Pack",
        tagline: "Booking confirmations, concierge comms, OTA vs direct-site marketing, and review-handling language for independent hotels, B&Bs, and boutique inns.",
        description: "Booking confirmations, concierge comms, OTA vs direct-site marketing, and review-handling language for independent hotels, B&Bs, and boutique inns. Includes accessibility-compliance guardrails (ADA + Canadian equivalents).",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "hospitality",
            "hotel"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_HOTEL_OPERATOR",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "restaurant-owner",
        slug: "restaurant-owner",
        name: "Restaurant Owner Pack",
        tagline: "Menu descriptions, supplier emails, staff scheduling notes, and customer-review responses for independent restaurant owners.",
        description: "Menu descriptions, supplier emails, staff scheduling notes, and customer-review responses for independent restaurant owners. Built by someone who has worked the line \u2014 speaks plainly about razor-thin margins.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "hospitality",
            "restaurant",
            "food"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_RESTAURANT_OWNER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "florist-pro",
        slug: "florist-pro",
        name: "Florist Pack",
        tagline: "AI workflow pack for working florists writing arrangement descriptions, event proposals, seasonal marketing, and supplier RFQs without sounding like a stock photo caption.",
        description: "AI workflow pack for working florists writing arrangement descriptions, event proposals, seasonal marketing, and supplier RFQs without sounding like a stock photo caption.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "events",
            "flowers",
            "design"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_FLORIST_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "photographer-pro",
        slug: "photographer-pro",
        name: "Photographer Pack",
        tagline: "AI workflow pack for working photographers \u2014 wedding, portrait, commercial \u2014 handling proposals, shot lists, delivery emails, gallery announcements, and pricing conversations without sounding like a stock site.",
        description: "AI workflow pack for working photographers \u2014 wedding, portrait, commercial \u2014 handling proposals, shot lists, delivery emails, gallery announcements, and pricing conversations without sounding like a stock site.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "creative",
            "photography",
            "events"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_PHOTOGRAPHER_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md",
            "templates/portrait-commercial-proposals.md",
            "templates/wedding-proposals-shotlists.md"
        ]
    },
    {
        id: "videographer-pro",
        slug: "videographer-pro",
        name: "Videographer / Filmmaker Pack",
        tagline: "AI workflow pack for working videographers and filmmakers \u2014 pitch decks, treatments, client recap emails, edit-review notes, and the comms that keep projects from going sideways.",
        description: "AI workflow pack for working videographers and filmmakers \u2014 pitch decks, treatments, client recap emails, edit-review notes, and the comms that keep projects from going sideways.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "creative",
            "video",
            "film"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_VIDEOGRAPHER_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "wedding-planner",
        slug: "wedding-planner",
        name: "Wedding Planner Pack",
        tagline: "AI workflow pack for wedding planners running intake, vendor coordination, timelines, day-of run-of-show, and contract negotiation without losing the thread.",
        description: "AI workflow pack for wedding planners running intake, vendor coordination, timelines, day-of run-of-show, and contract negotiation without losing the thread.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "events",
            "wedding",
            "planner"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_WEDDING_PLANNER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "blogger-pro",
        slug: "blogger-pro",
        name: "Blogger / SEO Site Owner Pack",
        tagline: "Built for the person running a niche site doing 50k-500k pageviews a month from search.",
        description: "Built for the person running a niche site doing 50k-500k pageviews a month from search. Sharpened against the editorial decisions that move RPM, not the \"ultimate SEO guide\" content that fills marketing blogs. The prompts in this pack are written for someone who's already published 200 posts and knows what works \u2014 they just need to do it faster.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "creator",
            "blog",
            "seo"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_BLOGGER_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "playbooks/pillar-content-and-monetization.md",
            "quick-start.md"
        ]
    },
    {
        id: "instagram-influencer",
        slug: "instagram-influencer",
        name: "Instagram Creator Pack",
        tagline: "Built for creators who treat Instagram as a craft, not a content factory.",
        description: "Built for creators who treat Instagram as a craft, not a content factory. The prompts here were sharpened against the captions, story sequences, and brand pitch emails that move 10k-following accounts into real partnerships \u2014 not the \"5 secrets to grow your IG\" advice that's been recycled since the algorithm cared about likes.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "creator",
            "instagram",
            "social"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_INSTAGRAM_INFLUENCER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/pillar-and-caption-library.md"
        ]
    },
    {
        id: "linkedin-creator",
        slug: "linkedin-creator",
        name: "LinkedIn Content Creator Pack",
        tagline: "Built for the B2B operator, founder, or consultant who's posting 3-5x a week to build a pipeline that doesn't depend on cold outreach.",
        description: "Built for the B2B operator, founder, or consultant who's posting 3-5x a week to build a pipeline that doesn't depend on cold outreach. Sharpened against the posts that actually get DMs from buyers \u2014 not the ones that get 800 likes from other creators trying to sell you a LinkedIn course.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "creator",
            "linkedin",
            "b2b"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_LINKEDIN_CREATOR",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "frameworks/post-styles-by-goal.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md"
        ]
    },
    {
        id: "podcaster-pro",
        slug: "podcaster-pro",
        name: "Podcaster Pack",
        tagline: "Built for indie podcasters who are also the producer, the editor, the booker, the social manager, and the person who still has a day job.",
        description: "Built for indie podcasters who are also the producer, the editor, the booker, the social manager, and the person who still has a day job. The prompts here were sharpened against the stuff that actually moves downloads \u2014 pre-interview research that makes guests open up, show notes people copy-paste, social clips that get reposted \u2014 not the LinkedIn-podcaster fluff that fills every Substack about \"growing your show.\"",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "creator",
            "podcast",
            "audio"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_PODCASTER_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/episode-prep-and-shownotes.md"
        ]
    },
    {
        id: "tiktok-creator",
        slug: "tiktok-creator",
        name: "TikTok Creator Pack",
        tagline: "Built for creators who actually post \u2014 3-7 times a week, watching their retention graph the next morning, deleting underperformers, riding trends that fit and skipping the ones that don't.",
        description: "Built for creators who actually post \u2014 3-7 times a week, watching their retention graph the next morning, deleting underperformers, riding trends that fit and skipping the ones that don't. The prompts here were sharpened against the hooks, captions, and trend-fit decisions that move accounts from 5k to 500k \u2014 not the \"how to go viral\" advice you've already scrolled past a hundred times.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "creator",
            "tiktok",
            "social"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_TIKTOK_CREATOR",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "frameworks/hook-frameworks.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md"
        ]
    },
    {
        id: "twitch-streamer",
        slug: "twitch-streamer",
        name: "Twitch / Live Streamer Pack",
        tagline: "Built for streamers who actually stream \u2014 the kind of people who go live four to six nights a week and treat the channel like a craft, not a hustle deck.",
        description: "Built for streamers who actually stream \u2014 the kind of people who go live four to six nights a week and treat the channel like a craft, not a hustle deck. The prompts here were sharpened against the bios, schedule posts, and sponsor decks that move chatters into subs and brands into paid deals \u2014 not the \"level up your stream\" advice that's been recycled since 2017.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "creator",
            "twitch",
            "streaming"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_TWITCH_STREAMER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/sponsor-deck-and-pitches.md"
        ]
    },
    {
        id: "youtuber-creator",
        slug: "youtuber-creator",
        name: "YouTuber Pack",
        tagline: "Built for long-form YouTubers who treat their channel like a craft, not a content treadmill.",
        description: "Built for long-form YouTubers who treat their channel like a craft, not a content treadmill. The prompts here were sharpened against the actual scripts, titles, and thumbnails that earn double-digit CTR on cold audiences \u2014 not the \"10 tips to grow your YouTube channel\" energy that's already polluted the algorithm.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "creator",
            "youtube",
            "video"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_YOUTUBER_CREATOR",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "frameworks/title-and-thumbnail-frameworks.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md"
        ]
    },
    {
        id: "author-novelist",
        slug: "author-novelist",
        name: "Author / Novelist Pack",
        tagline: "Built for the fiction writer who has a manuscript or a serious draft and is trying to make it land \u2014 character work that holds up, a plot that earns its turns, a query letter that gets requests instead of form rejections.",
        description: "Built for the fiction writer who has a manuscript or a serious draft and is trying to make it land \u2014 character work that holds up, a plot that earns its turns, a query letter that gets requests instead of form rejections. Sharpened against the queries that have actually gotten agent calls in the last two years, not the \"10 query letter mistakes\" content that fills every writing blog.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "writing",
            "fiction",
            "author"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_AUTHOR_NOVELIST",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/query-and-synopsis.md"
        ]
    },
    {
        id: "comedy-writer",
        slug: "comedy-writer",
        name: "Comedy Writer Pack",
        tagline: "Built for working comedy writers \u2014 late-night packet submitters, standups developing 5-minute sets, sketch writers, sitcom hopefuls, and social-first comedians making a living 30 seconds at a time.",
        description: "Built for working comedy writers \u2014 late-night packet submitters, standups developing 5-minute sets, sketch writers, sitcom hopefuls, and social-first comedians making a living 30 seconds at a time. The patterns in this pack were sharpened against actual produced material, not AI's idea of what a joke looks like. If the AI's last attempt was a knock-knock joke, this kit is the antidote.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "writing",
            "comedy",
            "entertainment"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_COMEDY_WRITER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "frameworks/joke-structures-and-bits.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md"
        ]
    },
    {
        id: "screenwriter-pro",
        slug: "screenwriter-pro",
        name: "Screenwriter Pack",
        tagline: "Built for the working or aspiring screenwriter \u2014 features, TV pilots, shorts \u2014 who needs loglines that pop, beat sheets that hold, and treatments that read like the writer has been in a room before.",
        description: "Built for the working or aspiring screenwriter \u2014 features, TV pilots, shorts \u2014 who needs loglines that pop, beat sheets that hold, and treatments that read like the writer has been in a room before. Sharpened against the loglines, treatments, and pilot scripts that have actually gotten meetings in the last two years, not the \"10 logline mistakes\" content that fills every screenwriting blog.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "writing",
            "screenwriting",
            "film"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_SCREENWRITER_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "frameworks/loglines-and-beat-sheets.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md"
        ]
    },
    {
        id: "songwriter-pro",
        slug: "songwriter-pro",
        name: "Songwriter / Lyricist Pack",
        tagline: "Built for the working songwriter \u2014 pop, country, Americana, indie, sync \u2014 who needs to turn an idea into a song that actually sings and might actually get cut.",
        description: "Built for the working songwriter \u2014 pop, country, Americana, indie, sync \u2014 who needs to turn an idea into a song that actually sings and might actually get cut. Sharpened against the songs that have placed in the last two years on Music Row, in sync libraries, and on indie releases that move \u2014 not the \"how to write a hit\" content that fills every songwriting blog.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "writing",
            "songwriting",
            "music"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_SONGWRITER_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "frameworks/song-structure-and-rhyme.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md"
        ]
    },
    {
        id: "speechwriter-pro",
        slug: "speechwriter-pro",
        name: "Speechwriter Pack",
        tagline: "Built for people who write speeches that have to land in real rooms \u2014 keynotes that follow a CEO who went over time, eulogies written in 36 hours, town halls where layoffs are the subtext, wedding toasts that have to be funny without becoming a roast.",
        description: "Built for people who write speeches that have to land in real rooms \u2014 keynotes that follow a CEO who went over time, eulogies written in 36 hours, town halls where layoffs are the subtext, wedding toasts that have to be funny without becoming a roast. The patterns in this pack were sharpened against the openers and closers that actually got remembered, and the ones that died in the second row.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "writing",
            "speech",
            "communications"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_SPEECHWRITER_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "frameworks/openers-structures-closers.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md"
        ]
    },
    {
        id: "translator-localization",
        slug: "translator-localization",
        name: "Translator / Localization Pack",
        tagline: "Built for working translators and localization PMs who can already translate \u2014 the AI's job here is to handle the surrounding work that eats your week: style-guide drafts, glossary management, locale-specific notes for software and game strings, and the project quotes that decide whether a project is profitable.",
        description: "Built for working translators and localization PMs who can already translate \u2014 the AI's job here is to handle the surrounding work that eats your week: style-guide drafts, glossary management, locale-specific notes for software and game strings, and the project quotes that decide whether a project is profitable. The patterns in this pack were sharpened against the briefs that arrive at 4pm Friday with \"small project, quick turnaround\" in the subject line.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "writing",
            "translation",
            "localization"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_TRANSLATOR_LOCALIZATION",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/style-guide-and-glossary.md"
        ]
    },
    {
        id: "graphic-designer-pro",
        slug: "graphic-designer-pro",
        name: "Graphic Designer / Illustrator Pack",
        tagline: "Built for working designers and illustrators running client work \u2014 brand identity, web, print, illustration \u2014 who spend more time writing about design than designing.",
        description: "Built for working designers and illustrators running client work \u2014 brand identity, web, print, illustration \u2014 who spend more time writing about design than designing. The patterns in this pack were sharpened against the discovery calls, proposals, and rationale docs that actually closed projects, not the ones that got ghosted. If your last brief said \"modern and clean,\" this kit is the antidote.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "creative",
            "design",
            "illustration"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_GRAPHIC_DESIGNER_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/briefs-proposals-rationale.md"
        ]
    },
    {
        id: "music-producer",
        slug: "music-producer",
        name: "Music Producer Pack",
        tagline: "AI workflow pack for working music producers \u2014 client onboarding, session plans, mix-revision comms, sample-clearance language, and the documentation that keeps records from getting stuck in revision hell.",
        description: "AI workflow pack for working music producers \u2014 client onboarding, session plans, mix-revision comms, sample-clearance language, and the documentation that keeps records from getting stuck in revision hell.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "creative",
            "music",
            "audio"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_MUSIC_PRODUCER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "reference-workflows.md"
        ]
    },
    {
        id: "voice-actor-pro",
        slug: "voice-actor-pro",
        name: "Voice Actor Pack",
        tagline: "Built for working VO artists who self-tape 5-15 auditions a week and need a thinking partner who actually understands specs, character work, and the difference between a demo that books and a demo that gets skipped at 0:08.",
        description: "Built for working VO artists who self-tape 5-15 auditions a week and need a thinking partner who actually understands specs, character work, and the difference between a demo that books and a demo that gets skipped at 0:08. The prompts in this pack were sharpened against the kind of copy that comes through P2P sites at midnight with a noon deadline.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "creative",
            "voice-acting",
            "audition"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_VOICE_ACTOR_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/audition-prep-and-demo-scripts.md"
        ]
    },
    {
        id: "chiropractor-pro",
        slug: "chiropractor-pro",
        name: "Chiropractor Pack",
        tagline: "Built for chiropractors writing the new-patient intake summary between appointments, drafting a treatment plan the patient understands and the insurer respects, and producing patient education that's evidence-anchored rather than reflexive.",
        description: "Built for chiropractors writing the new-patient intake summary between appointments, drafting a treatment plan the patient understands and the insurer respects, and producing patient education that's evidence-anchored rather than reflexive. The prompts in this pack are sharpened against the documentation and conversations that actually move patients through a course of care \u2014 not the textbook version.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "healthcare",
            "chiropractor",
            "clinic"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_CHIROPRACTOR_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/intake-and-treatment-plans.md"
        ]
    },
    {
        id: "nurse-practitioner",
        slug: "nurse-practitioner",
        name: "Nurse Practitioner Pack",
        tagline: "Built for NPs who are documenting between patients, writing the after-visit summary that has to actually help, and producing patient education that the patient will read instead of toss.",
        description: "Built for NPs who are documenting between patients, writing the after-visit summary that has to actually help, and producing patient education that the patient will read instead of toss. The prompts in this pack are sharpened against the visit notes, handouts, and care plans that get written between encounters \u2014 not the textbook version.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "healthcare",
            "nurse",
            "clinical"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_NURSE_PRACTITIONER",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/patient-education-and-summaries.md"
        ]
    },
    {
        id: "pharmacist-pro",
        slug: "pharmacist-pro",
        name: "Pharmacist Pack",
        tagline: "Built for pharmacists who are doing real counseling between phone rings, processing a tech's queue, writing a prior-auth letter that has to land, and starting an MTM consult with a patient who's holding seven bottles.",
        description: "Built for pharmacists who are doing real counseling between phone rings, processing a tech's queue, writing a prior-auth letter that has to land, and starting an MTM consult with a patient who's holding seven bottles. The prompts in this pack were sharpened against the conversations and paperwork that actually move drugs from the shelf into a patient's hands \u2014 not the textbook version.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "healthcare",
            "pharmacist",
            "clinical"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_PHARMACIST_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/counseling-and-prior-auth.md"
        ]
    },
    {
        id: "physical-therapist",
        slug: "physical-therapist",
        name: "Physical Therapist Pack",
        tagline: "Built for PTs who are writing a home-exercise program between patients, scaffolding a SOAP note 20 minutes after the patient left, and drafting a discharge summary the referring physician will actually read.",
        description: "Built for PTs who are writing a home-exercise program between patients, scaffolding a SOAP note 20 minutes after the patient left, and drafting a discharge summary the referring physician will actually read. The prompts in this pack are sharpened against the exercise sheets, daily notes, and discharge documents that get turned out between treatments \u2014 not the textbook version.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "healthcare",
            "pt",
            "rehabilitation"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_PHYSICAL_THERAPIST",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/hep-and-progress-notes.md"
        ]
    },
    {
        id: "veterinarian-pro",
        slug: "veterinarian-pro",
        name: "Veterinarian / Vet Tech Pack",
        tagline: "Built for the DVM or RVT writing a discharge after a 14-patient surgical day, drafting client education for a new diagnosis, and producing the financial-options script that has to be honest without being cold.",
        description: "Built for the DVM or RVT writing a discharge after a 14-patient surgical day, drafting client education for a new diagnosis, and producing the financial-options script that has to be honest without being cold. The prompts in this pack are sharpened against the discharge instructions, exam-room conversations, and end-of-life talks that happen on actual veterinary days \u2014 not the textbook version.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "healthcare",
            "veterinary",
            "clinical"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_VETERINARIAN_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/client-education-and-discharge.md"
        ]
    },
    {
        id: "estate-planning",
        slug: "estate-planning",
        name: "Estate Planning + Will Conversations Pack",
        tagline: "Built for people preparing to make or update a will, getting ready to talk to family about end-of-life wishes, or stepping into an executor role.",
        description: "Built for people preparing to make or update a will, getting ready to talk to family about end-of-life wishes, or stepping into an executor role. The prompts here came from real kitchen-table conversations and real first-meeting attorney intakes \u2014 not legalese, not avoidance.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "personal",
            "estate",
            "legal"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_ESTATE_PLANNING",
        deliverables: [
            "SKILL.md",
            "checklists/will-and-executor-prep.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md"
        ]
    },
    {
        id: "home-renovation",
        slug: "home-renovation",
        name: "Home Renovation Planning Pack",
        tagline: "Built for homeowners taking on a renovation \u2014 kitchen, bath, addition, basement, exterior.",
        description: "Built for homeowners taking on a renovation \u2014 kitchen, bath, addition, basement, exterior. The prompts here came out of real scope docs, real change orders, and the moment in week 6 when \"while we're at it\" was about to add $11,000 to the budget.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "personal",
            "renovation",
            "homeowner"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_HOME_RENOVATION",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/scope-and-change-orders.md"
        ]
    },
    {
        id: "personal-finance",
        slug: "personal-finance",
        name: "Personal Finance / Budgeting Pack",
        tagline: "Built for people managing their own money \u2014 building a budget, paying down debt, saving toward real goals, navigating CAD or USD personal finance.",
        description: "Built for people managing their own money \u2014 building a budget, paying down debt, saving toward real goals, navigating CAD or USD personal finance. The prompts here came out of working spreadsheets that actually got people out of credit-card debt, not \"just cut your latte\" advice.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "personal",
            "finance",
            "budget"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_PERSONAL_FINANCE",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/budgets-debt-savings.md"
        ]
    },
    {
        id: "travel-planner-pro",
        slug: "travel-planner-pro",
        name: "Travel Planning Pack",
        tagline: "Built for people planning their own trips \u2014 weekenders, two-week explorers, multi-stop loops, families herding small humans through airports.",
        description: "Built for people planning their own trips \u2014 weekenders, two-week explorers, multi-stop loops, families herding small humans through airports. The prompts here came out of itineraries that actually worked when the rain rolled in, the kid melted down, or the original plan fell apart at 11 AM.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "personal",
            "travel",
            "itinerary"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_TRAVEL_PLANNER_PRO",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/itineraries-and-budgets.md"
        ]
    },
    {
        id: "wedding-planning-self",
        slug: "wedding-planning-self",
        name: "Wedding Planning (DIY) Pack",
        tagline: "Built for engaged couples planning their own wedding without a full-service planner.",
        description: "Built for engaged couples planning their own wedding without a full-service planner. The prompts here came out of real budget spreadsheets that hit $5K, $30K, and $80K weddings \u2014 not the Pinterest-shaped fantasy that gets people in trouble three months out.",
        priceCents: 1400,
        aiTargets: [
            "any"
        ],
        personas: [],
        keywords: [
            "personal",
            "wedding",
            "planning"
        ],
        whatsInside: [],
        stripePriceEnv: "STRIPE_PRICE_WEDDING_PLANNING_SELF",
        deliverables: [
            "SKILL.md",
            "custom-gpt-instructions.md",
            "memory.md",
            "optimization-pack.md",
            "quick-start.md",
            "templates/budget-vendor-timeline.md"
        ]
    }
];
const BUNDLES = [
    {
        id: "developer-quartet",
        slug: "developer-quartet",
        name: "Developer Quartet",
        tagline: "TypeScript + Next.js, Supabase RLS, Stripe Connect, and iOS / SwiftUI \u2014 the production trifecta plus mobile.",
        kitSlugs: [
            "ts-next-production",
            "supabase-schema-rls",
            "stripe-connect",
            "ios-swiftui"
        ],
        priceCents: 5900,
        stripePriceEnv: "STRIPE_PRICE_BUNDLE_DEVELOPER_QUARTET",
        featured: true
    },
    {
        id: "developer-mega-stack",
        slug: "developer-mega-stack",
        name: "Developer Mega Stack",
        tagline: "All 20 developer kits \u2014 full-stack TS, mobile, infra, databases, APIs, security. Saves $181.",
        kitSlugs: [
            "android-kotlin",
            "apple-style-ux",
            "data-engineer-pro",
            "devops-terraform",
            "go-backend",
            "graphql-design",
            "ios-swiftui",
            "kubernetes-pro",
            "ml-engineer-pro",
            "node-backend",
            "postgres-dba",
            "python-backend",
            "python-data",
            "rails-backend",
            "react-native-dev",
            "rest-api-design",
            "security-engineer",
            "stripe-connect",
            "supabase-schema-rls",
            "ts-next-production"
        ],
        priceCents: 19900,
        stripePriceEnv: "STRIPE_PRICE_BUNDLE_DEV_MEGA",
        featured: true
    },
    {
        id: "builders-pack",
        slug: "builders-pack",
        name: "Builder's Pack",
        tagline: "Founder + PM + Apple UX + Solopreneur \u2014 the comms, taste, and admin tools every solo builder needs.",
        kitSlugs: [
            "startup-founder",
            "pm-toolkit",
            "apple-style-ux",
            "solopreneur-toolkit"
        ],
        priceCents: 4500,
        stripePriceEnv: "STRIPE_PRICE_BUNDLE_BUILDERS_PACK",
        featured: true
    },
    {
        id: "sales-and-marketing-pack",
        slug: "sales-and-marketing-pack",
        name: "Sales & Marketing Pack",
        tagline: "Sales Outreach + SEO + Newsletter + Brand Voice \u2014 the four highest-leverage revenue-side packs.",
        kitSlugs: [
            "sales-outreach-pro",
            "seo-content-writer",
            "newsletter-writer",
            "brand-voice"
        ],
        priceCents: 4500,
        stripePriceEnv: "STRIPE_PRICE_BUNDLE_SALES_MARKETING",
        featured: true
    },
    {
        id: "real-estate-power",
        slug: "real-estate-power",
        name: "Real Estate Power",
        tagline: "Real Estate Pro + Investor + Solopreneur + Brand Voice \u2014 every angle of a property-driven business.",
        kitSlugs: [
            "real-estate-pro",
            "real-estate-investor",
            "solopreneur-toolkit",
            "brand-voice"
        ],
        priceCents: 4500,
        stripePriceEnv: "STRIPE_PRICE_BUNDLE_REAL_ESTATE"
    },
    {
        id: "career-pack",
        slug: "career-pack",
        name: "Career Pack",
        tagline: "Resume + Recruiter Pro + Career Coach \u2014 both sides of the hiring table plus the coach.",
        kitSlugs: [
            "resume-job-search",
            "recruiter-pro",
            "career-coach"
        ],
        priceCents: 3500,
        stripePriceEnv: "STRIPE_PRICE_BUNDLE_CAREER"
    },
    {
        id: "hospitality-events-bundle",
        slug: "hospitality-events-bundle",
        name: "Hospitality / Events Bundle",
        tagline: "Weddings, hospitality, and event services \u2014 the nine kits that run the business behind the magic.",
        kitSlugs: [
            "wedding-planner",
            "florist-pro",
            "photographer-pro",
            "videographer-pro",
            "restaurant-owner",
            "cafe-owner",
            "airbnb-host",
            "hotel-operator",
            "event-caterer"
        ],
        priceCents: 8900,
        stripePriceEnv: "STRIPE_PRICE_BUNDLE_HOSPITALITY_EVENTS"
    },
    {
        id: "trades-pack",
        slug: "trades-pack",
        name: "Trades Pack",
        tagline: "Ten trades-and-service packs \u2014 back-office firepower for hands-on operators.",
        kitSlugs: [
            "contractor-gc",
            "electrician-pro",
            "plumber-pro",
            "hvac-pro",
            "roofing-pro",
            "landscaper-pro",
            "handyman-pro",
            "auto-mechanic",
            "cleaning-services",
            "moving-company"
        ],
        priceCents: 9900,
        stripePriceEnv: "STRIPE_PRICE_BUNDLE_TRADES"
    },
    {
        id: "operations-pack",
        slug: "operations-pack",
        name: "Operations Pack",
        tagline: "HR, office, PM, scrum, ops, supply chain, procurement, compliance, risk \u2014 ten kits for the people who run the company.",
        kitSlugs: [
            "hr-generalist",
            "office-manager",
            "ea-va",
            "project-manager-pmp",
            "scrum-master",
            "operations-manager",
            "supply-chain-mgr",
            "procurement-pro",
            "compliance-officer",
            "risk-manager"
        ],
        priceCents: 8900,
        stripePriceEnv: "STRIPE_PRICE_BUNDLE_OPERATIONS"
    },
    {
        id: "creators-pack",
        slug: "creators-pack",
        name: "Creator's Pack",
        tagline: "Podcaster + YouTuber + Twitch + TikTok + Instagram + LinkedIn + Blogger \u2014 seven creator-economy packs in one.",
        kitSlugs: [
            "podcaster-pro",
            "youtuber-creator",
            "twitch-streamer",
            "tiktok-creator",
            "instagram-influencer",
            "linkedin-creator",
            "blogger-pro"
        ],
        priceCents: 5900,
        stripePriceEnv: "STRIPE_PRICE_BUNDLE_CREATORS"
    },
    {
        id: "healthcare-adjacent",
        slug: "healthcare-adjacent",
        name: "Healthcare-Adjacent",
        tagline: "Pharmacist + NP + PT + Chiropractor + Veterinarian \u2014 five clinical-comms packs with disclaimers baked in.",
        kitSlugs: [
            "pharmacist-pro",
            "nurse-practitioner",
            "physical-therapist",
            "chiropractor-pro",
            "veterinarian-pro"
        ],
        priceCents: 4900,
        stripePriceEnv: "STRIPE_PRICE_BUNDLE_HEALTHCARE"
    },
    {
        id: "finance-pack",
        slug: "finance-pack",
        name: "Finance Pack",
        tagline: "Accountant + Financial Advisor + Mortgage Broker + Insurance Agent \u2014 the four client-facing finance practices.",
        kitSlugs: [
            "accountant-bookkeeper",
            "financial-advisor",
            "mortgage-broker",
            "insurance-agent"
        ],
        priceCents: 3900,
        stripePriceEnv: "STRIPE_PRICE_BUNDLE_FINANCE"
    },
    {
        id: "everything-100",
        slug: "everything-100",
        name: "The Lumenari Everything Bundle (100)",
        tagline: "All 100 Lumenari kits. One checkout. The headline-grabber \u2014 saves $1,241+.",
        kitSlugs: [
            "ts-next-production",
            "supabase-schema-rls",
            "stripe-connect",
            "trades-construction",
            "startup-founder",
            "apple-style-ux",
            "real-estate-pro",
            "sales-outreach-pro",
            "solopreneur-toolkit",
            "seo-content-writer",
            "recruiter-pro",
            "resume-job-search",
            "pm-toolkit",
            "newsletter-writer",
            "ios-swiftui",
            "python-data",
            "support-templates",
            "brand-voice",
            "coach-pro",
            "ecommerce-pro",
            "android-kotlin",
            "data-engineer-pro",
            "devops-terraform",
            "go-backend",
            "graphql-design",
            "kubernetes-pro",
            "ml-engineer-pro",
            "node-backend",
            "postgres-dba",
            "python-backend",
            "qa-test-automation",
            "rails-backend",
            "react-native-dev",
            "rest-api-design",
            "security-engineer",
            "accountant-bookkeeper",
            "financial-advisor",
            "insurance-agent",
            "mortgage-broker",
            "real-estate-investor",
            "career-coach",
            "executive-coach",
            "hr-generalist",
            "internal-recruiter",
            "learning-development",
            "talent-acquisition",
            "compliance-officer",
            "ea-va",
            "office-manager",
            "operations-manager",
            "procurement-pro",
            "project-manager-pmp",
            "risk-manager",
            "scrum-master",
            "supply-chain-mgr",
            "contractor-gc",
            "electrician-pro",
            "handyman-pro",
            "hvac-pro",
            "landscaper-pro",
            "plumber-pro",
            "roofing-pro",
            "auto-mechanic",
            "cleaning-services",
            "moving-company",
            "airbnb-host",
            "cafe-owner",
            "event-caterer",
            "hotel-operator",
            "restaurant-owner",
            "florist-pro",
            "photographer-pro",
            "videographer-pro",
            "wedding-planner",
            "blogger-pro",
            "instagram-influencer",
            "linkedin-creator",
            "podcaster-pro",
            "tiktok-creator",
            "twitch-streamer",
            "youtuber-creator",
            "author-novelist",
            "comedy-writer",
            "screenwriter-pro",
            "songwriter-pro",
            "speechwriter-pro",
            "translator-localization",
            "graphic-designer-pro",
            "music-producer",
            "voice-actor-pro",
            "chiropractor-pro",
            "nurse-practitioner",
            "pharmacist-pro",
            "physical-therapist",
            "veterinarian-pro",
            "estate-planning",
            "home-renovation",
            "personal-finance",
            "travel-planner-pro",
            "wedding-planning-self"
        ],
        priceCents: 24900,
        stripePriceEnv: "STRIPE_PRICE_BUNDLE_ALL",
        featured: true
    }
];
function getKit(slug) {
    return KITS.find((k)=>k.slug === slug);
}
function getBundle(slug) {
    return BUNDLES.find((b)=>b.slug === slug);
}
function bundleStandaloneTotal(bundle) {
    return bundle.kitSlugs.reduce((sum, slug)=>{
        const k = getKit(slug);
        return sum + (k?.priceCents ?? 0);
    }, 0);
}
function bundleSavings(bundle) {
    return Math.max(0, bundleStandaloneTotal(bundle) - bundle.priceCents);
}
function formatCAD(cents) {
    return new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
        maximumFractionDigits: 0
    }).format(cents / 100);
}
const BUNDLE = BUNDLES.find((b)=>b.slug === "everything-100");
}),
"[project]/src/lib/email-campaigns.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "proAnnualUpgradeNudge",
    ()=>proAnnualUpgradeNudge,
    "proCancellationSave",
    ()=>proCancellationSave,
    "proInactive14Days",
    ()=>proInactive14Days,
    "proMonthlyDigest",
    ()=>proMonthlyDigest,
    "proOneTimeBuyerUpsell",
    ()=>proOneTimeBuyerUpsell,
    "welcomeDay0",
    ()=>welcomeDay0,
    "welcomeDay1",
    ()=>welcomeDay1,
    "welcomeDay3",
    ()=>welcomeDay3,
    "welcomeDay5",
    ()=>welcomeDay5,
    "welcomeDay7",
    ()=>welcomeDay7,
    "wishlistNewBundle",
    ()=>wishlistNewBundle,
    "wishlistPriceDrop",
    ()=>wishlistPriceDrop
]);
/**
 * Email campaign content — every welcome series + retention email lives
 * here so the cron loop and the manual-send dashboard read the same copy.
 *
 * Each builder takes the data it needs and returns a {subject, html, text}
 * payload that `sendCampaignEmail()` can pipe straight to Resend.
 *
 * Copy is plain, warm, founder-voice. No emojis, no marketing-speak.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/env.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$automation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/email-automation.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/kits.ts [app-route] (ecmascript)");
;
;
;
const FREE_KIT_SLUG = "resume-job-search";
function libraryUrl() {
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].siteUrl}/library`;
}
function kitUrl(slug) {
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].siteUrl}/kits/${slug}`;
}
function proUrl() {
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].siteUrl}/pro`;
}
function downloadUrl(slug, leadId) {
    const q = leadId ? `?lead=${encodeURIComponent(leadId)}` : "";
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].siteUrl}/free/download/${slug}${q}`;
}
function welcomeDay0({ email, kitSlug, leadId }) {
    void email;
    const kit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getKit"])(kitSlug) ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getKit"])(FREE_KIT_SLUG);
    const kitName = kit?.name ?? "your free kit";
    const body = `
    <p>Hi — Chris here. I built Lumenari after watching every smart person around me wrestle the same generic AI outputs into something usable. The kits are the shortcut.</p>
    <p>Your free <strong>${kitName}</strong> is ready below. Drop the SKILL.md into Claude (or paste the optimization pack into ChatGPT) and try the first prompt. You should feel the difference inside two minutes.</p>
    <p>I'll send you a few short notes over the next week — what to do with the kit, who else uses them, and how the SKILL.md format actually works under the hood. Unsubscribe anytime, no hard feelings.</p>
  `;
    return {
        subject: "Your free Lumenari kit",
        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$automation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderEmail"])({
            preheader: `Download ${kitName} — and a quick note from me.`,
            heading: "Your free kit is ready.",
            body,
            cta: {
                label: "Download the kit",
                url: downloadUrl(kit?.slug ?? FREE_KIT_SLUG, leadId)
            },
            footnote: "If you'd rather not hear from me again, just reply with 'unsubscribe' — I'll handle it personally."
        }),
        text: `Your free Lumenari kit (${kitName}) is ready.

Download: ${downloadUrl(kit?.slug ?? FREE_KIT_SLUG, leadId)}

Reply to this email if anything looks off.

— Chris
Lumenari · lumenari.io`
    };
}
function welcomeDay1() {
    const body = `
    <p>Most AI tools answer like a stranger every time you open a new chat. SKILL.md fixes that.</p>
    <p>It's a plain markdown file Claude (and Cursor, and Gemini, and the ChatGPT-companion format) reads once and adapts to. No coding. No installer. You drop it in the project, the AI gets context, and every response from that point on lands closer to what you actually wanted.</p>
    <p>Try it: open the kit you grabbed yesterday, drag <code>SKILL.md</code> into a Claude project, and ask whatever you normally ask. Watch the answer change shape.</p>
    <p>That's the whole pitch. The other 99 kits are the same shape — just sharper for specific jobs.</p>
  `;
    return {
        subject: "Why a plain text file makes Claude smarter",
        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$automation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderEmail"])({
            preheader: "The SKILL.md format in 90 seconds.",
            heading: "The thing that makes the kit work.",
            body,
            cta: {
                label: "See the full kit catalog",
                url: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].siteUrl}/kits`
            }
        }),
        text: `Most AI tools answer like a stranger every time. SKILL.md fixes that.

It's a plain markdown file Claude reads once and adapts to. No coding. No installer. Drag it into a Claude project; every response gets sharper.

Try it on the kit you grabbed yesterday — watch the change.

Full catalog: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].siteUrl}/kits

— Chris`
    };
}
function welcomeDay3() {
    const body = `
    <p>Five things to actually do with the kit you grabbed:</p>
    <ol style="margin:0 0 0 18px;padding:0;line-height:1.8;">
      <li><strong>Hand it to one chat.</strong> Open Claude, drag the SKILL.md in, paste the first prompt from the quick-start. See what changes.</li>
      <li><strong>Steal the structure.</strong> The kit's prompts follow a pattern. Read one, adapt it for a different niche of your work.</li>
      <li><strong>Paste the optimization pack into ChatGPT.</strong> Same kit, different AI. No re-buying.</li>
      <li><strong>Build a Custom GPT.</strong> The Custom GPT instructions file is already formatted for the "Create a GPT" panel.</li>
      <li><strong>Read the memory.md.</strong> That's the workflow + tone context. Useful even if you only use a chat AI.</li>
    </ol>
    <p>If anything in the kit doesn't make sense, reply to this email — I read every one.</p>
  `;
    return {
        subject: "5 things to do with your free kit",
        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$automation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderEmail"])({
            preheader: "Open it, hand it to Claude, steal the pattern.",
            heading: "5 things to do with the kit.",
            body,
            cta: {
                label: "Open your library",
                url: libraryUrl()
            }
        }),
        text: `5 things to do with the kit you grabbed:

1. Drag SKILL.md into a Claude project. Run the first quick-start prompt.
2. Steal the prompt structure for a related niche.
3. Paste the optimization pack into ChatGPT.
4. Build a Custom GPT from the included instructions file.
5. Read memory.md for tone + workflow context.

Library: ${libraryUrl()}

— Chris`
    };
}
function welcomeDay5() {
    const body = `
    <p><em>This is a representative example based on common feedback — names and details are illustrative, not a verified case study.</em></p>
    <p>A recruiter I talked with last quarter was spending 40+ hours a week sourcing. Half of that was the same three tasks: turning a hiring manager's brief into a JD, writing the first reach-out, and handling the "not now, try me in 6 months" responses.</p>
    <p>She grabbed the Recruiter Outreach + JD Writer kit, dropped the SKILL.md into Claude, and rebuilt her workflow around the included templates. Two weeks later her sourcing block was down to about 16 hours. Same output, less typing.</p>
    <p>The pattern repeats across roles. People who buy one kit and actually use it cut their AI-back-and-forth time by 40-60% on the work the kit covers. The cost was $14 once.</p>
  `;
    return {
        subject: "A small case study (illustrative)",
        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$automation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderEmail"])({
            preheader: "What actually changes when you use the kit.",
            heading: "What a kit looks like in practice.",
            body,
            cta: {
                label: "Browse the catalog",
                url: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].siteUrl}/kits`
            },
            footnote: "The story above is representative, not a verified case study — we're collecting real ones to publish with permission."
        }),
        text: `Representative example, not a verified case study:

A recruiter spent 40 hours/week sourcing. Half was three tasks: brief→JD, first outreach, "not now" handling.

She used the Recruiter kit, dropped SKILL.md into Claude, rebuilt the workflow around the templates. Two weeks later she was at ~16 hours.

Catalog: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].siteUrl}/kits

— Chris`
    };
}
function welcomeDay7() {
    const body = `
    <p>You've had a week with one free kit. If it landed, here's the upgrade math.</p>
    <p>Pro+ is <strong>$19 CAD a month</strong> and unlocks every current kit (100+) and every future one. If you'd reach for two more kits this year — say one for sales outreach and one for SEO content — you've already paid for the year.</p>
    <p>Annual is $149 CAD (saves $79 vs paying monthly). Lifetime is $399 CAD if you'd rather never see the renewal again.</p>
    <p>No pressure. If the free kit was enough, the free kit was enough.</p>
  `;
    return {
        subject: "Pro+ math — should you?",
        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$automation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderEmail"])({
            preheader: "Every kit, current and future, for $19/mo.",
            heading: "The Pro+ pitch — short version.",
            body,
            cta: {
                label: "See Pro+",
                url: proUrl()
            }
        }),
        text: `Pro+ is $19 CAD/mo and unlocks every current + future kit (100+).

Two more kits this year = it's paid for itself.

Annual: $149 (saves $79). Lifetime: $399.

${proUrl()}

— Chris`
    };
}
function proInactive14Days({ recommendedSlugs }) {
    const items = recommendedSlugs.map((s)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getKit"])(s)).filter((k)=>Boolean(k)).slice(0, 3);
    const list = items.map((k)=>`<li style="margin:0 0 8px;"><a href="${kitUrl(k.slug)}" style="color:#111418;font-weight:500;">${k.name}</a><br/><span style="color:#6b7280;font-size:13px;">${k.tagline}</span></li>`).join("");
    const body = `
    <p>You haven't grabbed a kit from your Pro+ library in a couple of weeks. No problem — but here are three that match the shape of what you've already downloaded:</p>
    <ul style="margin:18px 0 0;padding:0 0 0 18px;">${list}</ul>
  `;
    return {
        subject: "Three kits we think you'd use",
        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$automation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderEmail"])({
            preheader: "Quick picks from your Pro+ library.",
            heading: "Three picks for you.",
            body,
            cta: {
                label: "Open your library",
                url: libraryUrl()
            }
        }),
        text: `Three Pro+ kits you might use:

${items.map((k)=>`- ${k.name} — ${kitUrl(k.slug)}`).join("\n")}

Library: ${libraryUrl()}

— Chris`
    };
}
function proMonthlyDigest({ newKits, topKits, monthLabel }) {
    const newList = newKits.length ? `<p style="margin:0 0 6px;"><strong>New this month:</strong></p>
       <ul style="margin:0 0 16px;padding:0 0 0 18px;">${newKits.map((k)=>`<li><a href="${kitUrl(k.slug)}" style="color:#111418;">${k.name}</a></li>`).join("")}</ul>` : "";
    const topList = topKits.length ? `<p style="margin:0 0 6px;"><strong>Most-downloaded by Pro+ members:</strong></p>
       <ul style="margin:0 0 16px;padding:0 0 0 18px;">${topKits.map((k)=>`<li><a href="${kitUrl(k.slug)}" style="color:#111418;">${k.name}</a></li>`).join("")}</ul>` : "";
    const body = `
    <p>Here's what shipped in ${monthLabel}, and what your fellow Pro+ members are reaching for.</p>
    ${newList}
    ${topList}
    <p>Reply if there's a kit you wish existed — the Pro+ list shapes what gets built next.</p>
  `;
    return {
        subject: `Lumenari · ${monthLabel} digest`,
        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$automation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderEmail"])({
            preheader: "Fresh kits + this month's top downloads.",
            heading: `${monthLabel} digest`,
            body,
            cta: {
                label: "Open your library",
                url: libraryUrl()
            }
        }),
        text: `Lumenari · ${monthLabel}

New: ${newKits.map((k)=>k.name).join(", ") || "(no new kits this month)"}
Top: ${topKits.map((k)=>k.name).join(", ") || "(coming next month)"}

Library: ${libraryUrl()}

— Chris`
    };
}
function proCancellationSave({ couponCode }) {
    const body = `
    <p>Saw the cancellation come through. No drama — but if it was the price, I'd like one more shot.</p>
    <p><strong>50% off the next month</strong> with this code:</p>
    <p style="margin:18px 0;font-size:22px;font-weight:600;letter-spacing:0.04em;background:#f4f4f5;padding:14px 18px;border-radius:12px;text-align:center;">${couponCode}</p>
    <p>Apply it at <a href="${proUrl()}">${proUrl()}</a> within the next 7 days. Works once.</p>
    <p>If it wasn't the price — reply and tell me what was missing. I read every one.</p>
  `;
    return {
        subject: "One more shot — 50% off Pro+",
        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$automation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderEmail"])({
            preheader: "If price was the reason, this code is yours.",
            heading: "If you'd stick around for half off…",
            body,
            cta: {
                label: "Apply the code",
                url: proUrl()
            },
            footnote: "Code expires in 7 days. One-time use."
        }),
        text: `Saw the cancellation. If price was the reason, here's 50% off the next month: ${couponCode}

Apply at ${proUrl()} within 7 days.

— Chris`
    };
}
function proAnnualUpgradeNudge({ annualSaveCents }) {
    const body = `
    <p>You've been on Pro+ monthly for five months — thanks for sticking around.</p>
    <p>If you'd rather not see the renewal email every month, the annual plan saves you <strong>${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatCAD"])(annualSaveCents)}</strong> a year. Same access, one charge, done.</p>
    <p>Click below and switch — Stripe handles the proration so you only pay the difference.</p>
  `;
    return {
        subject: `Save ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatCAD"])(annualSaveCents)} — switch to annual?`,
        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$automation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderEmail"])({
            preheader: "Same access. One charge. Saves $79.",
            heading: "Switch to annual?",
            body,
            cta: {
                label: "Switch to annual",
                url: proUrl()
            }
        }),
        text: `Annual Pro+ saves you ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatCAD"])(annualSaveCents)}/year vs monthly. Same access, one charge.

${proUrl()}

— Chris`
    };
}
function proOneTimeBuyerUpsell({ ownedKits }) {
    const list = ownedKits.slice(0, 4).map((k)=>`<li>${k.name}</li>`).join("");
    const body = `
    <p>You've grabbed a couple of kits — thanks. Here's the upgrade math:</p>
    <ul style="margin:0 0 16px;padding:0 0 0 18px;color:#475569;">${list}</ul>
    <p><strong>Pro+ is $19 CAD a month and unlocks every kit (100+) plus future ones.</strong> If you'd reach for two or three more kits in the next year, Pro+ is the cheaper path.</p>
    <p>No pressure — but the math is there.</p>
  `;
    return {
        subject: "You'd save money on Pro+",
        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$automation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderEmail"])({
            preheader: "Every kit for less than two more à la carte buys.",
            heading: "Pro+ math, for you specifically.",
            body,
            cta: {
                label: "See Pro+",
                url: proUrl()
            }
        }),
        text: `You've grabbed multiple kits. Pro+ is $19/mo and unlocks all 100+. If you'd buy 2-3 more this year, Pro+ wins.

${proUrl()}

— Chris`
    };
}
function wishlistPriceDrop({ kitSlug, oldCents, newCents }) {
    const kit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getKit"])(kitSlug);
    const name = kit?.name ?? "A kit you saved";
    const body = `
    <p>The kit you saved — <strong>${name}</strong> — just dropped in price.</p>
    <p>Was ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatCAD"])(oldCents)}, now ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatCAD"])(newCents)}.</p>
  `;
    return {
        subject: `${name} just dropped to ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatCAD"])(newCents)}`,
        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$automation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderEmail"])({
            preheader: `Saved kit price drop — was ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatCAD"])(oldCents)}.`,
            heading: "Your saved kit just dropped in price.",
            body,
            cta: {
                label: "See the kit",
                url: kitUrl(kitSlug)
            }
        }),
        text: `${name} dropped from ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatCAD"])(oldCents)} to ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatCAD"])(newCents)}.

${kitUrl(kitSlug)}

— Chris`
    };
}
function wishlistNewBundle({ kitSlug, bundleSlug, bundleName }) {
    const kit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getKit"])(kitSlug);
    const name = kit?.name ?? "A kit you saved";
    const body = `
    <p>The kit you saved — <strong>${name}</strong> — was just added to the <strong>${bundleName}</strong> bundle. If you'd buy two or three kits in the same area, the bundle wins on price.</p>
  `;
    return {
        subject: `${name} is now in a bundle`,
        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$automation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderEmail"])({
            preheader: `Saved kit added to ${bundleName}.`,
            heading: "Your saved kit is now in a bundle.",
            body,
            cta: {
                label: "See the bundle",
                url: kitUrl(bundleSlug)
            }
        }),
        text: `${name} was added to ${bundleName}.

${kitUrl(bundleSlug)}

— Chris`
    };
}
}),
"[project]/src/app/api/lead-magnet/claim/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$resend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/resend.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$automation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/email-automation.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$campaigns$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/email-campaigns.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/kits.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
const runtime = "nodejs";
const dynamic = "force-dynamic";
const DEFAULT_FREE_KIT = "resume-job-search";
const Body = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email().max(254),
    kitSlug: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(80).optional(),
    source: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(40).optional()
});
async function POST(req) {
    let payload;
    try {
        payload = await req.json();
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Invalid JSON body."
        }, {
            status: 400
        });
    }
    const parsed = Body.safeParse(payload);
    if (!parsed.success) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Please enter a valid email address."
        }, {
            status: 400
        });
    }
    const email = parsed.data.email.toLowerCase().trim();
    const kitSlug = parsed.data.kitSlug ?? DEFAULT_FREE_KIT;
    const source = parsed.data.source ?? "lead-magnet";
    // Verify the kit slug resolves to a real kit. Don't trust the client.
    const kit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$kits$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getKit"])(kitSlug);
    if (!kit) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "That kit doesn't exist."
        }, {
            status: 400
        });
    }
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseService"])();
    // 1. Add to Resend audience tagged lead-magnet (best-effort).
    let resendContactId;
    const audienceId = process.env.RESEND_AUDIENCE_LEAD_MAGNET_ID;
    if (audienceId) {
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$resend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resend"])().contacts.create({
                email,
                audienceId,
                unsubscribed: false
            });
            if ("data" in result && result.data?.id) {
                resendContactId = result.data.id;
            }
        } catch (err) {
            // Resend throws on duplicate — that's fine, we still record the lead.
            console.warn("[lead-magnet] resend audience add:", err);
        }
    }
    // 2. Upsert the lead row.
    const { data: existing } = await db.from("leads").select("id, claimed_kit_slug, unsubscribed_at").ilike("email", email).maybeSingle();
    let leadId;
    if (existing) {
        leadId = existing.id;
        if (existing.unsubscribed_at) {
            // Re-subscribe — they came back willingly.
            await db.from("leads").update({
                unsubscribed_at: null,
                claimed_kit_slug: kitSlug,
                resend_contact_id: resendContactId ?? null,
                welcomed_at: new Date().toISOString()
            }).eq("id", leadId);
        } else if (!existing.claimed_kit_slug) {
            await db.from("leads").update({
                claimed_kit_slug: kitSlug,
                resend_contact_id: resendContactId ?? null
            }).eq("id", leadId);
        }
    } else {
        const { data: inserted, error: insErr } = await db.from("leads").insert({
            email,
            source,
            claimed_kit_slug: kitSlug,
            resend_contact_id: resendContactId ?? null
        }).select("id").single();
        if (insErr) {
            console.error("[lead-magnet] insert failed:", insErr);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Couldn't save your email. Try again."
            }, {
                status: 500
            });
        }
        leadId = inserted.id;
    }
    // 3. Send Day-0 welcome email. Idempotent on (recipient, template).
    const campaign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$campaigns$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["welcomeDay0"])({
        email,
        kitSlug,
        leadId
    });
    const send = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$automation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendCampaignEmail"])({
        recipient: email,
        template: "welcome.day-0",
        subject: campaign.subject,
        html: campaign.html,
        text: campaign.text,
        metadata: {
            kitSlug,
            leadId
        }
    });
    if (send.status === "failed") {
        // The lead is saved — surface the failure so the UI can show it.
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            leadId,
            warning: "Saved your email, but the welcome message failed to send. Check your inbox in a few minutes or contact support."
        }, {
            status: 202
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true,
        leadId
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0xg2evw._.js.map
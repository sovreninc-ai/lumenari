(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/[root-of-the-server]__0a~g402._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/i18n/locales.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Locale registry. The single source of truth for what languages Lumenari
 * supports. Middleware, route params, and the language switcher all read here.
 *
 * Adding a locale = adding to LOCALES, LOCALE_NAMES, FLAGS + dropping a
 * dictionary file at `src/i18n/dictionaries/<locale>.ts`.
 */ __turbopack_context__.s([
    "DEFAULT_LOCALE",
    ()=>DEFAULT_LOCALE,
    "LOCALES",
    ()=>LOCALES,
    "LOCALE_COOKIE",
    ()=>LOCALE_COOKIE,
    "LOCALE_FLAGS",
    ()=>LOCALE_FLAGS,
    "LOCALE_NAMES",
    ()=>LOCALE_NAMES,
    "isLocale",
    ()=>isLocale,
    "pickLocaleFromAcceptLanguage",
    ()=>pickLocaleFromAcceptLanguage
]);
const LOCALES = [
    "en",
    "es",
    "pt",
    "de",
    "fr",
    "ja",
    "hi",
    "zh-CN"
];
const DEFAULT_LOCALE = "en";
const LOCALE_NAMES = {
    en: "English",
    es: "Español",
    pt: "Português",
    de: "Deutsch",
    fr: "Français",
    ja: "日本語",
    hi: "हिन्दी",
    "zh-CN": "简体中文"
};
const LOCALE_FLAGS = {
    en: "🇬🇧",
    es: "🇪🇸",
    pt: "🇵🇹",
    de: "🇩🇪",
    fr: "🇫🇷",
    ja: "🇯🇵",
    hi: "🇮🇳",
    "zh-CN": "🇨🇳"
};
function isLocale(value) {
    return LOCALES.includes(value);
}
function pickLocaleFromAcceptLanguage(header) {
    if (!header) return DEFAULT_LOCALE;
    const entries = header.split(",").map((part)=>{
        const [tag, ...rest] = part.trim().split(";");
        const qStr = rest.find((r)=>r.startsWith("q="));
        const q = qStr ? parseFloat(qStr.slice(2)) : 1;
        return {
            tag: tag.toLowerCase(),
            q: isNaN(q) ? 0 : q
        };
    }).sort((a, b)=>b.q - a.q);
    for (const { tag } of entries){
        // Simplified Chinese variants → zh-CN.
        if (tag === "zh" || tag === "zh-cn" || tag === "zh-sg" || tag === "zh-my" || tag.startsWith("zh-hans")) {
            return "zh-CN";
        }
        // Traditional Chinese — no dedicated locale yet; let it fall through so it
        // resolves to the default (English) rather than masquerading as Simplified.
        if (tag.startsWith("zh-hant") || tag === "zh-tw" || tag === "zh-hk") {
            continue;
        }
        const base = tag.split("-")[0];
        if (isLocale(base)) return base;
    }
    return DEFAULT_LOCALE;
}
const LOCALE_COOKIE = "lumenari_locale";
}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_LOCALES_INTERNAL",
    ()=>_LOCALES_INTERNAL,
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales.ts [middleware-edge] (ecmascript)");
;
;
/**
 * i18n middleware.
 *
 *   1. Skips API routes, static assets, and Next internals.
 *   2. On `/`, leaves the request alone but ensures the locale cookie is set.
 *      The homepage reads the cookie via `getServerLocale()`.
 *   3. On `/<locale>/...` where <locale> is known: passes through.
 *   4. On any other path: rewrites to inject the locale segment so the
 *      `[locale]` route tree picks it up. Cookie wins over Accept-Language.
 *   5. On `/<locale>` (bare locale, no rest) → redirect to `/` so we don't
 *      404 someone who typed the URL. Cookie gets set first.
 */ const PUBLIC_PASSTHROUGH = [
    "/api/",
    "/_next/",
    "/favicon",
    "/robots.txt",
    "/sitemap.xml",
    "/logo.png",
    "/icon.png",
    "/og.png",
    "/og/",
    // Root-only routes (live outside the [locale] tree).
    "/admin"
];
const REFERRAL_COOKIE = "lumenari_ref";
const REFERRAL_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
function maybeSetReferralCookie(req, res) {
    const ref = req.nextUrl.searchParams.get("ref");
    if (!ref) return;
    // Light input validation — referral codes are uppercase alnum.
    if (!/^[A-Z0-9]{6,16}$/.test(ref)) return;
    res.cookies.set({
        name: REFERRAL_COOKIE,
        value: ref,
        path: "/",
        maxAge: REFERRAL_COOKIE_MAX_AGE,
        sameSite: "lax"
    });
}
function middleware(req) {
    const { pathname } = req.nextUrl;
    // 1. Static / internal / API → skip.
    if (PUBLIC_PASSTHROUGH.some((p)=>pathname.startsWith(p))) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0];
    const cookieLocale = req.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LOCALE_COOKIE"])?.value;
    const headerLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["pickLocaleFromAcceptLanguage"])(req.headers.get("accept-language"));
    const desired = cookieLocale && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLocale"])(cookieLocale) ? cookieLocale : headerLocale ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DEFAULT_LOCALE"];
    // 2. Homepage at `/` — pass through, but make sure cookie is set so the
    //    server component reads a stable value.
    if (segments.length === 0) {
        const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        if (!cookieLocale) setLocaleCookie(res, desired);
        maybeSetReferralCookie(req, res);
        return res;
    }
    // 3. Already locale-prefixed (e.g. /en/kits).
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLocale"])(first)) {
        // If it's a bare /<locale> with no further segments, redirect to /
        // (we don't have a [locale]/page.tsx — the homepage lives at root).
        if (segments.length === 1) {
            const url = req.nextUrl.clone();
            url.pathname = "/";
            const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
            setLocaleCookie(res, first);
            maybeSetReferralCookie(req, res);
            return res;
        }
        // Otherwise pass through. Refresh the cookie so the switcher works.
        const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        if (cookieLocale !== first) setLocaleCookie(res, first);
        maybeSetReferralCookie(req, res);
        return res;
    }
    // 4. Unprefixed path — rewrite to /<desired>/<rest>.
    const url = req.nextUrl.clone();
    url.pathname = `/${desired}${pathname}`;
    const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].rewrite(url);
    if (!cookieLocale) setLocaleCookie(res, desired);
    maybeSetReferralCookie(req, res);
    return res;
}
function setLocaleCookie(res, locale) {
    res.cookies.set({
        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LOCALE_COOKIE"],
        value: locale,
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax"
    });
}
const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|map)$).*)"
    ]
};
const _LOCALES_INTERNAL = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LOCALES"];
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__0a~g402._.js.map
module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

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
"[project]/src/i18n/locales.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/components/language-switcher.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageSwitcher",
    ()=>LanguageSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/locales.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function LanguageSwitcher({ initialLocale }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransition"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const current = initialLocale ?? readCookieLocale() ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCALES"][0];
    function pick(next) {
        setOpen(false);
        document.cookie = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCALE_COOKIE"]}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
        // Swap the locale segment in the URL if there is one, otherwise just
        // refresh in place (the middleware re-resolves from the cookie).
        const segments = pathname.split("/").filter(Boolean);
        let target = pathname;
        if (segments.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLocale"])(segments[0])) {
            segments[0] = next;
            target = `/${segments.join("/")}`;
        }
        startTransition(()=>{
            router.replace(target);
            router.refresh();
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen((v)=>!v),
                disabled: isPending,
                "aria-haspopup": "listbox",
                "aria-expanded": open,
                className: "inline-flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-[var(--surface)] text-sm font-medium disabled:opacity-60",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                        className: "w-4 h-4",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/components/language-switcher.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": "true",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCALE_FLAGS"][current]
                    }, void 0, false, {
                        fileName: "[project]/src/components/language-switcher.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "hidden sm:inline",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCALE_NAMES"][current]
                    }, void 0, false, {
                        fileName: "[project]/src/components/language-switcher.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: "w-3.5 h-3.5",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/components/language-switcher.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/language-switcher.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                role: "listbox",
                className: "absolute right-0 mt-1 min-w-[170px] rounded-2xl border border-[var(--hairline)] bg-white shadow-lg py-1 z-50",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCALES"].map((loc)=>{
                    const isCurrent = loc === current;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            role: "option",
                            "aria-selected": isCurrent,
                            onClick: ()=>pick(loc),
                            className: `w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-[var(--surface)] ${isCurrent ? "font-semibold" : ""}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCALE_FLAGS"][loc]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/language-switcher.tsx",
                                    lineNumber: 80,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCALE_NAMES"][loc]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/language-switcher.tsx",
                                    lineNumber: 81,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/language-switcher.tsx",
                            lineNumber: 71,
                            columnNumber: 17
                        }, this)
                    }, loc, false, {
                        fileName: "[project]/src/components/language-switcher.tsx",
                        lineNumber: 70,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/language-switcher.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/language-switcher.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
function readCookieLocale() {
    if (typeof document === "undefined") return undefined;
    const match = document.cookie.match(new RegExp(`(?:^|; )${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCALE_COOKIE"]}=([^;]*)`));
    const raw = match ? decodeURIComponent(match[1]) : undefined;
    return raw && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$locales$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLocale"])(raw) ? raw : undefined;
}
}),
"[project]/src/lib/analytics.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Analytics helper — Plausible (primary) + PostHog (optional).
 *
 * Usage from a client component:
 *   import { track } from "@/lib/analytics";
 *   track("kit_viewed", { kit_slug: "real-estate-pro" });
 *
 * Both vendors are loaded via small `<script>` tags in the root layout.
 * The track() helper is a noop on the server and a thin wrapper on the
 * client — it doesn't break if either vendor isn't loaded.
 */ __turbopack_context__.s([
    "track",
    ()=>track
]);
function track(event, props) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/src/components/newsletter-signup.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExitIntentNewsletterModal",
    ()=>ExitIntentNewsletterModal,
    "NewsletterFooterForm",
    ()=>NewsletterFooterForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$analytics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/analytics.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
/**
 * Newsletter capture surfaces.
 *   - `NewsletterFooterForm` — small horizontal form for the site footer.
 *   - `ExitIntentNewsletterModal` — one-shot per session, fires on
 *     `mouseleave` (desktop) or scroll-up gesture (mobile).
 *
 * Both POST to `/api/newsletter/subscribe`.
 */ const SESSION_FLAG = "lumenari_exit_intent_shown";
async function submit(email) {
    try {
        const res = await fetch("/api/newsletter/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        });
        const data = await res.json().catch(()=>({}));
        if (!res.ok) {
            return {
                ok: false,
                message: data.error ?? "Something went wrong. Please try again."
            };
        }
        return {
            ok: true,
            message: data.message ?? "Check your email — we sent a confirmation link."
        };
    } catch  {
        return {
            ok: false,
            message: "Couldn't reach our server. Try again."
        };
    }
}
function NewsletterFooterForm() {
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    async function onSubmit(e) {
        e.preventDefault();
        if (!email.trim()) return;
        setStatus("loading");
        setMessage(null);
        const result = await submit(email.trim());
        setStatus(result.ok ? "ok" : "err");
        setMessage(result.message);
        if (result.ok) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$analytics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["track"])("newsletter_signup", {
                source: "footer"
            });
            setEmail("");
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: onSubmit,
        className: "flex flex-col sm:flex-row gap-2 w-full sm:max-w-md",
        "aria-label": "Subscribe to the Lumenari newsletter",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "sr-only",
                htmlFor: "newsletter-email-footer",
                children: "Email"
            }, void 0, false, {
                fileName: "[project]/src/components/newsletter-signup.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                        "aria-hidden": true,
                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/newsletter-signup.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "newsletter-email-footer",
                        name: "email",
                        type: "email",
                        required: true,
                        autoComplete: "email",
                        value: email,
                        onChange: (e)=>setEmail(e.target.value),
                        placeholder: "you@example.com",
                        className: "w-full pl-9 pr-3 h-10 rounded-full border border-[var(--hairline)] bg-white text-sm focus:outline-none focus:border-[var(--accent-strong)]",
                        disabled: status === "loading"
                    }, void 0, false, {
                        fileName: "[project]/src/components/newsletter-signup.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/newsletter-signup.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                disabled: status === "loading",
                className: "inline-flex items-center justify-center h-10 px-5 rounded-full bg-[var(--foreground)] text-white text-sm font-medium hover:bg-black transition-colors disabled:opacity-50 flex-shrink-0",
                children: status === "loading" ? "Subscribing..." : "Subscribe"
            }, void 0, false, {
                fileName: "[project]/src/components/newsletter-signup.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            message ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                role: "status",
                className: `text-xs sm:absolute sm:translate-y-12 ${status === "err" ? "text-red-700" : "text-emerald-700"}`,
                children: message
            }, void 0, false, {
                fileName: "[project]/src/components/newsletter-signup.tsx",
                lineNumber: 108,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/newsletter-signup.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
function ExitIntentNewsletterModal() {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const lastScrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        function show() {
            if (open) return;
            if (sessionStorage.getItem(SESSION_FLAG)) return;
            sessionStorage.setItem(SESSION_FLAG, "1");
            setOpen(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$analytics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["track"])("exit_intent_modal_shown");
        }
        function onMouseLeave(e) {
            // Only fire when the cursor leaves the top edge — that's the
            // "they're about to close the tab" signal.
            if (e.clientY <= 0) show();
        }
        function onScroll() {
            const y = window.scrollY;
            const dy = lastScrollRef.current - y;
            lastScrollRef.current = y;
            // Fire on a fast scroll-up gesture (mobile). Tuned conservatively.
            if (dy > 60 && y < 200) show();
        }
    }, [
        open
    ]);
    async function onSubmit(e) {
        e.preventDefault();
        if (!email.trim()) return;
        setStatus("loading");
        setMessage(null);
        const result = await submit(email.trim());
        setStatus(result.ok ? "ok" : "err");
        setMessage(result.message);
        if (result.ok) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$analytics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["track"])("exit_intent_modal_signup");
            setEmail("");
        }
    }
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "exit-intent-title",
        className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-md rounded-3xl bg-white shadow-2xl p-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    "aria-label": "Close",
                    className: "absolute top-4 right-4 p-1 rounded-full hover:bg-[var(--surface)]",
                    onClick: ()=>setOpen(false),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/newsletter-signup.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/newsletter-signup.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 mb-5",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                        className: "w-6 h-6 text-white"
                    }, void 0, false, {
                        fileName: "[project]/src/components/newsletter-signup.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/newsletter-signup.tsx",
                    lineNumber: 200,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    id: "exit-intent-title",
                    className: "display text-2xl mb-3",
                    children: "Get a free kit on us."
                }, void 0, false, {
                    fileName: "[project]/src/components/newsletter-signup.tsx",
                    lineNumber: 204,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[var(--muted)] mb-5 leading-relaxed",
                    children: "Subscribe to the Lumenari newsletter and we'll send your first kit free with the welcome email. One useful email a week, no fluff."
                }, void 0, false, {
                    fileName: "[project]/src/components/newsletter-signup.tsx",
                    lineNumber: 207,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: onSubmit,
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "sr-only",
                            htmlFor: "exit-intent-email",
                            children: "Email"
                        }, void 0, false, {
                            fileName: "[project]/src/components/newsletter-signup.tsx",
                            lineNumber: 213,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: "exit-intent-email",
                            type: "email",
                            required: true,
                            autoComplete: "email",
                            value: email,
                            onChange: (e)=>setEmail(e.target.value),
                            placeholder: "you@example.com",
                            className: "w-full px-4 h-12 rounded-2xl border border-[var(--hairline)] bg-white focus:outline-none focus:border-[var(--accent-strong)]",
                            disabled: status === "loading"
                        }, void 0, false, {
                            fileName: "[project]/src/components/newsletter-signup.tsx",
                            lineNumber: 216,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: status === "loading",
                            className: "w-full inline-flex items-center justify-center h-12 rounded-2xl bg-[var(--foreground)] text-white font-medium hover:bg-black transition-colors disabled:opacity-50",
                            children: status === "loading" ? "Subscribing..." : "Send my free kit"
                        }, void 0, false, {
                            fileName: "[project]/src/components/newsletter-signup.tsx",
                            lineNumber: 227,
                            columnNumber: 11
                        }, this),
                        message ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            role: "status",
                            className: `text-sm ${status === "err" ? "text-red-700" : "text-emerald-700"}`,
                            children: message
                        }, void 0, false, {
                            fileName: "[project]/src/components/newsletter-signup.tsx",
                            lineNumber: 235,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/newsletter-signup.tsx",
                    lineNumber: 212,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/newsletter-signup.tsx",
            lineNumber: 190,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/newsletter-signup.tsx",
        lineNumber: 184,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0zb_2m7._.js.map
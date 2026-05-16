import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_COOKIE,
  isLocale,
  pickLocaleFromAcceptLanguage,
  type Locale,
} from "@/i18n/locales";

/**
 * i18n middleware.
 *
 *   1. Skips API routes, static assets, and Next internals.
 *   2. On `/`, rewrites to `/<desired>` so the locale-aware homepage at
 *      `src/app/[locale]/page.tsx` renders. Cookie wins over Accept-Language.
 *   3. On `/<locale>/...` where <locale> is known: passes through.
 *   4. On any other path: rewrites to inject the locale segment so the
 *      `[locale]` route tree picks it up. Cookie wins over Accept-Language.
 *   5. On `/<locale>` (bare locale): passes through to `[locale]/page.tsx`.
 */

const PUBLIC_PASSTHROUGH = [
  "/api/",
  "/_next/",
  "/favicon",
  "/robots.txt",
  "/sitemap.xml",
  "/logo.png",
  "/logo-mark.png",
  "/icon.png",
  "/og.png",
  "/og/",
  // Root-only routes (live outside the [locale] tree).
  "/admin",
];

const REFERRAL_COOKIE = "lumenari_ref";
const REFERRAL_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function maybeSetReferralCookie(req: NextRequest, res: NextResponse): void {
  const ref = req.nextUrl.searchParams.get("ref");
  if (!ref) return;
  // Light input validation — referral codes are uppercase alnum.
  if (!/^[A-Z0-9]{6,16}$/.test(ref)) return;
  res.cookies.set({
    name: REFERRAL_COOKIE,
    value: ref,
    path: "/",
    maxAge: REFERRAL_COOKIE_MAX_AGE,
    sameSite: "lax",
  });
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Static / internal / API → skip.
  if (PUBLIC_PASSTHROUGH.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;
  const headerLocale = pickLocaleFromAcceptLanguage(
    req.headers.get("accept-language"),
  );
  const desired: Locale =
    cookieLocale && isLocale(cookieLocale)
      ? cookieLocale
      : (headerLocale ?? DEFAULT_LOCALE);

  // 2. Homepage at `/` — rewrite to `/<desired>` so [locale]/page.tsx renders.
  if (segments.length === 0) {
    const url = req.nextUrl.clone();
    url.pathname = `/${desired}`;
    const res = NextResponse.rewrite(url);
    if (!cookieLocale) setLocaleCookie(res, desired);
    maybeSetReferralCookie(req, res);
    return res;
  }

  // 3. Already locale-prefixed (e.g. /en, /en/kits). Pass through and refresh
  //    the cookie so the language switcher works.
  if (isLocale(first)) {
    const res = NextResponse.next();
    if (cookieLocale !== first) setLocaleCookie(res, first);
    maybeSetReferralCookie(req, res);
    return res;
  }

  // 4. Unprefixed path — rewrite to /<desired>/<rest>.
  const url = req.nextUrl.clone();
  url.pathname = `/${desired}${pathname}`;
  const res = NextResponse.rewrite(url);
  if (!cookieLocale) setLocaleCookie(res, desired);
  maybeSetReferralCookie(req, res);
  return res;
}

function setLocaleCookie(res: NextResponse, locale: Locale) {
  res.cookies.set({
    name: LOCALE_COOKIE,
    value: locale,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}

/**
 * Match every route except Next internals + static asset paths. The handler
 * also short-circuits API routes (defense in depth in case the matcher misses).
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|map)$).*)",
  ],
};

export const _LOCALES_INTERNAL = LOCALES;

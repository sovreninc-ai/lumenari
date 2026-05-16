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
 *   2. On `/`, leaves the request alone but ensures the locale cookie is set.
 *      The homepage reads the cookie via `getServerLocale()`.
 *   3. On `/<locale>/...` where <locale> is known: passes through.
 *   4. On any other path: rewrites to inject the locale segment so the
 *      `[locale]` route tree picks it up. Cookie wins over Accept-Language.
 *   5. On `/<locale>` (bare locale, no rest) → redirect to `/` so we don't
 *      404 someone who typed the URL. Cookie gets set first.
 */

const PUBLIC_PASSTHROUGH = [
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

  // 2. Homepage at `/` — pass through, but make sure cookie is set so the
  //    server component reads a stable value.
  if (segments.length === 0) {
    const res = NextResponse.next();
    if (!cookieLocale) setLocaleCookie(res, desired);
    maybeSetReferralCookie(req, res);
    return res;
  }

  // 3. Already locale-prefixed (e.g. /en/kits).
  if (isLocale(first)) {
    // If it's a bare /<locale> with no further segments, redirect to /
    // (we don't have a [locale]/page.tsx — the homepage lives at root).
    if (segments.length === 1) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      const res = NextResponse.redirect(url);
      setLocaleCookie(res, first);
      maybeSetReferralCookie(req, res);
      return res;
    }
    // Otherwise pass through. Refresh the cookie so the switcher works.
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

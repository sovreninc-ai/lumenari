/**
 * Server-side locale resolution. Use from server components that don't
 * receive `locale` via route params — chiefly the root homepage at `/`.
 */

import { cookies, headers } from "next/headers";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isLocale,
  pickLocaleFromAcceptLanguage,
  type Locale,
} from "./locales";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  if (fromCookie && isLocale(fromCookie)) return fromCookie;

  const headerStore = await headers();
  const accept = headerStore.get("accept-language");
  return pickLocaleFromAcceptLanguage(accept) ?? DEFAULT_LOCALE;
}

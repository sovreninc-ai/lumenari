/**
 * Root `/` page — should be unreachable in normal traffic because the
 * middleware rewrites `/` to `/<desired-locale>` before this route resolves.
 *
 * Kept as a defense-in-depth redirect: if the middleware is bypassed for any
 * reason, fall through to the default-locale homepage rather than 404 or
 * render stale un-localized content.
 */

import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/i18n/locales";

export default function RootIndex() {
  redirect(`/${DEFAULT_LOCALE}`);
}

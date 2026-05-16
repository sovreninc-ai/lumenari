/**
 * Locale registry. The single source of truth for what languages Lumenari
 * supports. Middleware, route params, and the language switcher all read here.
 *
 * Adding a locale = adding to LOCALES, LOCALE_NAMES, FLAGS + dropping a
 * dictionary file at `src/i18n/dictionaries/<locale>.ts`.
 */

export const LOCALES = [
  "en",
  "es",
  "pt",
  "de",
  "fr",
  "ja",
  "hi",
  "zh-CN",
] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  de: "Deutsch",
  fr: "Français",
  ja: "日本語",
  hi: "हिन्दी",
  "zh-CN": "简体中文",
};

/** Unicode regional indicator flags. Used in the language switcher. */
export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇬🇧",
  es: "🇪🇸",
  pt: "🇵🇹",
  de: "🇩🇪",
  fr: "🇫🇷",
  ja: "🇯🇵",
  hi: "🇮🇳",
  "zh-CN": "🇨🇳",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Parse `Accept-Language: en-US,en;q=0.9,fr;q=0.8` → our best-match Locale.
 *
 * Handles a few special cases beyond the simple base-tag match:
 *   - `zh`, `zh-CN`, `zh-Hans*` → "zh-CN" (Simplified Chinese)
 *     (Traditional `zh-TW` / `zh-HK` / `zh-Hant` fall back to default for now)
 *   - `hi`, `hi-IN` → "hi"
 */
export function pickLocaleFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  const entries = header
    .split(",")
    .map((part) => {
      const [tag, ...rest] = part.trim().split(";");
      const qStr = rest.find((r) => r.startsWith("q="));
      const q = qStr ? parseFloat(qStr.slice(2)) : 1;
      return { tag: tag.toLowerCase(), q: isNaN(q) ? 0 : q };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of entries) {
    // Simplified Chinese variants → zh-CN.
    if (
      tag === "zh" ||
      tag === "zh-cn" ||
      tag === "zh-sg" ||
      tag === "zh-my" ||
      tag.startsWith("zh-hans")
    ) {
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

/** Cookie name used by middleware + language switcher. */
export const LOCALE_COOKIE = "lumenari_locale";

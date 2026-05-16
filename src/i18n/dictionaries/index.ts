/**
 * Dictionary loader. Resolves a `Locale` to its dictionary. The dictionaries
 * are bundled (small) so we don't bother with async loading for now.
 */

import { DEFAULT_LOCALE, type Locale } from "../locales";
import { en, type Dictionary } from "./en";
import { es } from "./es";
import { pt } from "./pt";
import { de } from "./de";
import { fr } from "./fr";
import { ja } from "./ja";
import { hi } from "./hi";
import { zhCN } from "./zh-CN";

const DICTIONARIES: Record<Locale, Dictionary> = {
  en,
  es,
  pt,
  de,
  fr,
  ja,
  hi,
  "zh-CN": zhCN,
};

export function getDictionary(locale: Locale | string | undefined): Dictionary {
  if (!locale) return DICTIONARIES[DEFAULT_LOCALE];
  if (locale in DICTIONARIES) return DICTIONARIES[locale as Locale];
  return DICTIONARIES[DEFAULT_LOCALE];
}

export type { Dictionary };

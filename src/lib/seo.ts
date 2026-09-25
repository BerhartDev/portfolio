import type { Locale } from "next-intl";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "./site";

const OG_LOCALE: Record<Locale, string> = { pt: "pt_BR", en: "en_US", fr: "fr_FR", es: "es_ES" };

export function localePath(locale: Locale): string {
  return `/${locale}/`;
}

export function localeUrl(locale: Locale): string {
  return `${SITE_URL}${localePath(locale)}`;
}

/** hreflang de todas as versões + x-default apontando para a raiz, que redireciona pelo idioma. */
export function languageAlternates(absolute = false): Record<string, string> {
  const toUrl = absolute ? localeUrl : localePath;
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, toUrl(l)])),
    "x-default": absolute ? `${SITE_URL}/` : "/",
  };
}

export function ogLocales(locale: Locale) {
  return {
    locale: OG_LOCALE[locale],
    alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
  };
}

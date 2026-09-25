import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { routing } from "@/i18n/routing";
import { homePath, type PathFor } from "./routes";
import { SITE_URL } from "./site";

const OG_LOCALE: Record<Locale, string> = { pt: "pt_BR", en: "en_US", fr: "fr_FR", es: "es_ES" };

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/**
 * hreflang de todas as versões. x-default: na home, a raiz (que redireciona pelo idioma);
 * nas outras páginas, a versão no idioma padrão.
 */
export function languageAlternates(pathFor: PathFor, absolute = false): Record<string, string> {
  const toUrl = (path: string) => (absolute ? absoluteUrl(path) : path);
  const xDefault = pathFor === homePath ? "/" : pathFor(routing.defaultLocale);
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, toUrl(pathFor(l))])),
    "x-default": toUrl(xDefault),
  };
}

export function ogLocales(locale: Locale) {
  return {
    locale: OG_LOCALE[locale],
    alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
  };
}

type PageMeta = {
  locale: Locale;
  pathFor: PathFor;
  title: string;
  description: string;
  type?: "website" | "article";
};

/** Title, description, canonical, hreflang, Open Graph e Twitter de uma página. */
export function pageMetadata({ locale, pathFor, title, description, type = "website" }: PageMeta): Metadata {
  const path = pathFor(locale);
  return {
    title,
    description,
    alternates: { canonical: path, languages: languageAlternates(pathFor) },
    openGraph: { type, url: path, siteName: "Bernardo Knoblauch", title, description, ...ogLocales(locale) },
    twitter: { card: "summary", title, description },
  };
}

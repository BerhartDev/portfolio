import { hasLocale, type Locale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { PROJECTS_SEGMENT } from "./routes";

export type LocaleParams = { params: Promise<{ locale: string }> };

export async function resolveLocale(params: LocaleParams["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}

export type SectionParams = { params: Promise<{ locale: string; section: string }> };

/** Locale de uma rota com segmento traduzido: /pt/projetos/ vale, /pt/projects/ é 404. */
export async function resolveProjectsLocale(params: SectionParams["params"]): Promise<Locale> {
  const { locale, section } = await params;
  if (!hasLocale(routing.locales, locale) || PROJECTS_SEGMENT[locale] !== section) notFound();
  return locale;
}

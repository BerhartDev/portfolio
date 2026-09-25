import { hasLocale, type Locale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export type LocaleParams = { params: Promise<{ locale: string }> };

export async function resolveLocale(params: LocaleParams["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}

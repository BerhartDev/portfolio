import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { mono, sans } from "@/lib/fonts";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { homePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { themeScript } from "@/lib/theme-script";
import "@/styles/globals.css";

type Props = LocaleParams & { children: ReactNode };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  // Metadados da home. Páginas internas sobrescrevem com os seus.
  return {
    metadataBase: new URL(SITE_URL),
    ...(await pageMetadata({ locale, pathFor: homePath, title: t("title"), description: t("description") })),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { CookieConsentBanner } from "@/components/consent/CookieConsentBanner";
import { Metrics } from "@/components/consent/Metrics";
import { JsonLd } from "@/components/JsonLd";
import { mono, sans } from "@/lib/fonts";
import { identityGraph } from "@/lib/jsonld";
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
  const t = await getTranslations({ locale, namespace: "meta" });
  const consent = await getTranslations({ locale, namespace: "consent" });

  return (
    <html lang={locale} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <JsonLd data={identityGraph(locale, t("jobTitle"), t("description"))} />
        <ConsentProvider>
          {children}
          <CookieConsentBanner
            labels={{
              heading: consent("heading"),
              message: consent("message"),
              accept: consent("accept"),
              reject: consent("reject"),
            }}
          />
          <Metrics />
        </ConsentProvider>
      </body>
    </html>
  );
}

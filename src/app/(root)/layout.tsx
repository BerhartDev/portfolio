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
import { SITE_URL } from "@/lib/site";
import { themeScript } from "@/lib/theme-script";
import "@/styles/globals.css";

const LOCALE = "pt";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: LOCALE, namespace: "meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: true },
    alternates: { canonical: "/pt/" },
  };
}

// Escolha salva → idiomas do navegador → português. Só sai da raiz se o idioma for outro.
const redirectScript = `(function(){var A=${JSON.stringify(routing.locales)},O=${JSON.stringify(routing.locales.filter((locale) => locale !== "pt"))},s;try{s=localStorage.getItem("locale")}catch(e){}if(A.indexOf(s)<0){s="pt";var n=navigator.languages||[navigator.language];for(var i=0;i<n.length;i++){var p=String(n[i]||"").slice(0,2).toLowerCase();if(A.indexOf(p)>=0){s=p;break}}}if(O.indexOf(s)>=0)location.replace("/"+s+"/")})()`;

export default async function RootLayout({ children }: { children: ReactNode }) {
  setRequestLocale(LOCALE);
  const t = await getTranslations({ locale: LOCALE, namespace: "meta" });
  const consent = await getTranslations({ locale: LOCALE, namespace: "consent" });

  return (
    <html lang={LOCALE} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      </head>
      <body>
        <JsonLd data={identityGraph(LOCALE, t("jobTitle"))} />
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

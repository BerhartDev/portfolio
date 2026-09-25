import type { Metadata } from "next";
import type { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: { index: false, follow: true },
  alternates: { canonical: `/${routing.defaultLocale}/` },
};

// Ordem: escolha salva no seletor → idiomas do navegador → idioma padrão.
const redirectScript = `(function(){var L=${JSON.stringify(routing.locales)},s;try{s=localStorage.getItem("locale")}catch(e){}if(L.indexOf(s)<0){s=${JSON.stringify(routing.defaultLocale)};var n=navigator.languages||[navigator.language];for(var i=0;i<n.length;i++){var p=String(n[i]||"").slice(0,2).toLowerCase();if(L.indexOf(p)>=0){s=p;break}}}location.replace("/"+s+"/")})()`;

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={routing.defaultLocale}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
        <noscript>
          <meta httpEquiv="refresh" content={`0; url=/${routing.defaultLocale}/`} />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}

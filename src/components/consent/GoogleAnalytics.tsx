"use client";

import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { useConsent } from "./ConsentProvider";

export function GoogleAnalytics() {
  const { status } = useConsent();

  if (!GA_MEASUREMENT_ID || status !== "granted") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}

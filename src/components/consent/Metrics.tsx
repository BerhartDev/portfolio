"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "./GoogleAnalytics";
import { useConsent } from "./ConsentProvider";

/** Vercel e GA4 só montam depois do aceite. Recusa não carrega script. */
export function Metrics() {
  const { status } = useConsent();
  if (status !== "granted") return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <GoogleAnalytics />
    </>
  );
}

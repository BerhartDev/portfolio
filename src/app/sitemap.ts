import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { languageAlternates, localeUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = languageAlternates(true);
  return routing.locales.map((locale) => ({ url: localeUrl(locale), alternates: { languages } }));
}

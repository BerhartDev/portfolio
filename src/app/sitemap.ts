import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getProjects } from "@/lib/projects";
import { homePath, projectPath, projectsPath, type PathFor } from "@/lib/routes";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: PathFor[] = [homePath, projectsPath, ...getProjects().map((p) => projectPath(p.slug))];
  return pages.flatMap((pathFor) => {
    const languages = languageAlternates(pathFor, true);
    return routing.locales.map((locale) => ({ url: absoluteUrl(pathFor(locale)), alternates: { languages } }));
  });
}

import type { Locale } from "next-intl";

/** Segmento traduzido da página de projetos: /pt/projetos/, /en/projects/… */
export const PROJECTS_SEGMENT: Record<Locale, string> = {
  pt: "projetos",
  en: "projects",
  fr: "projets",
  es: "proyectos",
};

/** Caminho de uma página em cada idioma. Base de canonical, hreflang, sitemap e seletor de idioma. */
export type PathFor = (locale: Locale) => string;

export const homePath: PathFor = (locale) => `/${locale}/`;

export const projectsPath: PathFor = (locale) => `/${locale}/${PROJECTS_SEGMENT[locale]}/`;

export function projectPath(slug: string): PathFor {
  return (locale) => `${projectsPath(locale)}${slug}/`;
}

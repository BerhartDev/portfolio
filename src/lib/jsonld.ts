// Dados estruturados (schema.org) para o Google ligar a pessoa, o site e cada página.
// Sem data de publicação: o conteúdo não tem data verificável.
import type { Locale } from "next-intl";
import { blogUrl, profile } from "./profile";
import { homePath } from "./routes";
import { absoluteUrl } from "./seo";
import { SITE_URL } from "./site";

const IN_LANGUAGE: Record<Locale, string> = { pt: "pt-BR", en: "en-US", fr: "fr-FR", es: "es-ES" };

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type Node = Record<string, unknown>;

const OG_IMAGE: Node = {
  "@type": "ImageObject",
  url: absoluteUrl("/og.jpg"),
  width: 1200,
  height: 630,
};

/** Foto visível no topo. O card de Open Graph não é a imagem da pessoa. */
const PORTRAIT: Node = {
  "@type": "ImageObject",
  url: absoluteUrl("/profile/bernardo-1086.webp"),
  width: 1086,
  height: 1448,
};

/** Perfis reais. Instagram, LeetCode e Hack The Box ainda não têm URL. */
function sameAs(locale: Locale): string[] {
  return [profile.linkedin, profile.github, profile.discord, blogUrl[locale]];
}

/** Pessoa. O @id não muda com o idioma. Sem seguidores, data ou nota: isso não está na página. */
export function personNode(locale: Locale, jobTitle: string, description: string): Node {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Bernardo Knoblauch",
    url: absoluteUrl(homePath(locale)),
    jobTitle,
    description,
    image: PORTRAIT,
    telephone: `+${profile.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rio de Janeiro",
      addressCountry: "BR",
    },
    knowsLanguage: ["pt-BR", "en", "fr"],
    sameAs: sameAs(locale),
  };
}

/** Pessoa e site, iguais em todas as páginas de idioma. */
export function identityGraph(locale: Locale, jobTitle: string, description: string): Node[] {
  return [
    personNode(locale, jobTitle, description),
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: "Bernardo Knoblauch",
      url: SITE_URL,
      inLanguage: Object.values(IN_LANGUAGE),
      publisher: { "@id": PERSON_ID },
    },
  ];
}

/** ProfilePage com a pessoa dentro de mainEntity, como o Google pede para o rich result. */
export function profilePage(locale: Locale, name: string, description: string, jobTitle: string): Node {
  const url = absoluteUrl(homePath(locale));
  return {
    "@type": "ProfilePage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: IN_LANGUAGE[locale],
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: personNode(locale, jobTitle, description),
    primaryImageOfPage: PORTRAIT,
  };
}

type Crumb = { name: string; path: string };

function breadcrumb(pagePath: string, items: Crumb[]): Node {
  const url = absoluteUrl(pagePath);
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function projectsPageGraph(
  locale: Locale,
  pagePath: string,
  name: string,
  description: string,
  homeName: string,
  projectsName: string,
  items: { name: string; path: string }[],
): Node[] {
  const url = absoluteUrl(pagePath);
  return [
    breadcrumb(pagePath, [
      { name: homeName, path: homePath(locale) },
      { name: projectsName, path: pagePath },
    ]),
    {
      "@type": "CollectionPage",
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: IN_LANGUAGE[locale],
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      mainEntity: { "@id": `${url}#list` },
    },
    {
      "@type": "ItemList",
      "@id": `${url}#list`,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  ];
}

export function articleGraph(
  locale: Locale,
  pagePath: string,
  headline: string,
  pageName: string,
  description: string,
  homeName: string,
  projectsName: string,
  projectsPagePath: string,
): Node[] {
  const url = absoluteUrl(pagePath);
  return [
    breadcrumb(pagePath, [
      { name: homeName, path: homePath(locale) },
      { name: projectsName, path: projectsPagePath },
      { name: headline, path: pagePath },
    ]),
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: pageName,
      description,
      inLanguage: IN_LANGUAGE[locale],
      isPartOf: { "@id": WEBSITE_ID },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      mainEntity: { "@id": `${url}#article` },
      primaryImageOfPage: OG_IMAGE,
    },
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline,
      description,
      inLanguage: IN_LANGUAGE[locale],
      image: OG_IMAGE,
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
      mainEntityOfPage: { "@id": `${url}#webpage` },
      isPartOf: { "@id": WEBSITE_ID },
    },
  ];
}

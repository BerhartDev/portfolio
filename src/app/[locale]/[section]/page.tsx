import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Contact } from "@/components/Contact";
import { PageIntro } from "@/components/PageIntro";
import { ProjectList } from "@/components/ProjectList";
import { Section } from "@/components/Section";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { routing } from "@/i18n/routing";
import { resolveProjectsLocale, type SectionParams } from "@/lib/locale";
import { getProjects } from "@/lib/projects";
import { PROJECTS_SEGMENT, projectsPath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

const OFFERS = ["performance", "seo", "observability", "migration", "delivery"] as const;

export const dynamicParams = false;

// Só o segmento traduzido de cada idioma: /pt/projetos/, /en/projects/…
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale, section: PROJECTS_SEGMENT[locale] }));
}

export async function generateMetadata({ params }: SectionParams): Promise<Metadata> {
  const locale = await resolveProjectsLocale(params);
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  return pageMetadata({ locale, pathFor: projectsPath, title: t("metaTitle"), description: t("description") });
}

export default async function ProjectsPage({ params }: SectionParams) {
  const locale = await resolveProjectsLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="container">
      <a href="#main" className="skip-link">
        {t("nav.skip")}
      </a>
      <SiteHeader locale={locale} pathFor={projectsPath} />
      <main id="main">
        <PageIntro title={t("projectsPage.title")} lead={t("projectsPage.lead")} />
        <Section id="companies" index={1} title={t("projectsPage.companies.title")}>
          <p className={styles.body}>{t("projectsPage.companies.body")}</p>
          <ul className={styles.offers}>
            {OFFERS.map((key) => (
              <li key={key}>{t(`projectsPage.companies.items.${key}`)}</li>
            ))}
          </ul>
        </Section>
        <Section id="clients" index={2} title={t("projectsPage.clients.title")}>
          <p className={styles.body}>{t("projectsPage.clients.body")}</p>
          <p className={styles.terms}>{t("projectsPage.clients.terms")}</p>
        </Section>
        <Section id="cases" index={3} title={t("projectsPage.cases")}>
          <ProjectList locale={locale} projects={getProjects()} detailed />
        </Section>
        <Contact locale={locale} index={4} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

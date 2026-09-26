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

const OFFERS = ["api", "performance", "seo", "observability", "migration", "delivery", "products"] as const;

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
        <PageIntro title={t("projectsPage.title")} lead={t("projectsPage.lead")}>
          <a href="#cases" className={styles.cta}>
            {t("projectsPage.cta")}
            <span className={styles.arrow} aria-hidden="true">
              ↓
            </span>
          </a>
        </PageIntro>
        <Section id="pitch" index={1} title={t("projectsPage.pitch.title")}>
          <p className={styles.body}>{t("projectsPage.pitch.body")}</p>
          <ul className={styles.offers}>
            {OFFERS.map((key) => (
              <li key={key}>{t(`projectsPage.pitch.items.${key}`)}</li>
            ))}
          </ul>
          <p className={styles.terms}>{t("projectsPage.pitch.terms")}</p>
        </Section>
        <Section id="cases" index={2} title={t("projectsPage.cases")}>
          <ProjectList locale={locale} projects={getProjects()} detailed />
        </Section>
        <Contact locale={locale} index={3} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

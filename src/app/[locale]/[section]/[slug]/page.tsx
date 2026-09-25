import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/Blocks";
import { Contact } from "@/components/Contact";
import { PageIntro } from "@/components/PageIntro";
import { Section } from "@/components/Section";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { routing } from "@/i18n/routing";
import { resolveProjectsLocale } from "@/lib/locale";
import { displayUrl } from "@/lib/profile";
import { getProject, getProjects, SECTION_KEYS } from "@/lib/projects";
import { PROJECTS_SEGMENT, projectPath, projectsPath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

type Params = { params: Promise<{ locale: string; section: string; slug: string }> };

export const dynamicParams = false;

// Com output: export, cada combinação precisa de todos os parâmetros.
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProjects().map((p) => ({ locale, section: PROJECTS_SEGMENT[locale], slug: p.slug })),
  );
}

async function resolve(params: Params["params"]) {
  const locale = await resolveProjectsLocale(params);
  const project = getProject((await params).slug);
  if (!project) notFound();
  return { locale, project };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, project } = await resolve(params);
  const t = await getTranslations({ locale, namespace: "article" });
  const text = project[locale];
  return pageMetadata({
    locale,
    pathFor: projectPath(project.slug),
    title: t("metaTitle", { title: text.title }),
    description: text.summary,
    type: "article",
  });
}

export default async function ProjectArticlePage({ params }: Params) {
  const { locale, project } = await resolve(params);
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const text = project[locale];

  const projects = getProjects();
  const i = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[i - 1];
  const next = projects[i + 1];

  const meta = [
    project.period && { label: t("article.period"), value: project.period },
    project.stack.length > 0 && { label: t("article.stack"), value: project.stack.join(", ") },
  ].filter((m) => !!m);

  return (
    <div className="container">
      <a href="#main" className="skip-link">
        {t("nav.skip")}
      </a>
      <SiteHeader locale={locale} pathFor={projectPath(project.slug)} />
      <main id="main">
        <article>
          <PageIntro
            eyebrow={
              <a href={projectsPath(locale)} className={styles.back}>
                <span aria-hidden="true">← </span>
                <span className="link">{t("projects.all")}</span>
              </a>
            }
            title={text.title}
            lead={text.summary}
          >
            <p className={styles.tag}>{text.tag}</p>
            <dl className={styles.meta}>
              {meta.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
              {project.links.length > 0 && (
                <div>
                  <dt>{t("article.links")}</dt>
                  <dd className={styles.links}>
                    {project.links.map(({ url }) => (
                      <a key={url} href={url} className="link">
                        {displayUrl(url)}
                        <span aria-hidden="true"> ↗</span>
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </PageIntro>
          {SECTION_KEYS.map((key, n) => (
            <Section key={key} id={key} index={n + 1} title={t(`projects.labels.${key}`)}>
              <Blocks blocks={text.sections[key]} />
            </Section>
          ))}
        </article>
        {(prev || next) && (
          <nav aria-label={t("article.more")} className={styles.pager}>
            {prev && (
              <a href={projectPath(prev.slug)(locale)} className={styles.prev} rel="prev">
                <span className={styles.dir}>← {t("article.prev")}</span>
                <span className={styles.name}>{prev[locale].title}</span>
              </a>
            )}
            {next && (
              <a href={projectPath(next.slug)(locale)} className={styles.next} rel="next">
                <span className={styles.dir}>{t("article.next")} →</span>
                <span className={styles.name}>{next[locale].title}</span>
              </a>
            )}
          </nav>
        )}
        <Contact locale={locale} index={SECTION_KEYS.length + 1} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getProjects } from "@/lib/projects";
import { projectsPath } from "@/lib/routes";
import { ProjectList } from "./ProjectList";
import styles from "./Projects.module.css";
import { Section } from "./Section";

export async function Projects({ locale, index }: { locale: Locale; index: number }) {
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <Section id="projects" index={index} title={t("title")}>
      <ProjectList locale={locale} projects={getProjects()} />
      <a href={projectsPath(locale)} className={styles.all}>
        <span className="link">{t("all")}</span>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </a>
    </Section>
  );
}

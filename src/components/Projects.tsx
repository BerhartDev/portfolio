import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { displayUrl, PROJECTS, projectLinks } from "@/lib/profile";
import styles from "./Projects.module.css";
import { Section } from "./Section";

const FIELDS = ["context", "problem", "work", "result"] as const;

export async function Projects({ locale, index }: { locale: Locale; index: number }) {
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <Section id="projects" index={index} title={t("title")}>
      <ol className={styles.list}>
        {PROJECTS.map((key, i) => {
          const link = projectLinks[key];
          return (
            <li key={key}>
              <details className={styles.details} open={i === 0}>
                <summary className={styles.row}>
                  <span className={styles.num} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.name}>{t(`items.${key}.name`)}</h3>
                  <span className={styles.summary}>{t(`items.${key}.summary`)}</span>
                  <span className={styles.tag}>{t(`items.${key}.tag`)}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </summary>
                <div className={styles.case}>
                  <dl className={styles.fields}>
                    {FIELDS.map((field) => (
                      <div key={field} className={styles.field}>
                        <dt>{t(`labels.${field}`)}</dt>
                        <dd>{t(`items.${key}.${field}`)}</dd>
                      </div>
                    ))}
                  </dl>
                  {link && (
                    <a href={link} className={`${styles.external} link`}>
                      {displayUrl(link)}
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  )}
                </div>
              </details>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

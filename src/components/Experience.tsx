import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { EDUCATION, EXPERIENCE, LANGUAGES } from "@/lib/profile";
import styles from "./Experience.module.css";
import { Section } from "./Section";

export async function Experience({ locale, index }: { locale: Locale; index: number }) {
  const t = await getTranslations({ locale, namespace: "experience" });

  return (
    <Section id="experience" index={index} title={t("title")}>
      <ol className={styles.timeline}>
        {EXPERIENCE.map((key) => (
          <li key={key} className={styles.item}>
            <p className={styles.when}>
              {t(`items.${key}.when`)}
              <span className={styles.place}>{t(`items.${key}.place`)}</span>
            </p>
            <div className={styles.what}>
              <h3 className={styles.role}>
                {t(`items.${key}.role`)} <span className={styles.company}>· {t(`items.${key}.company`)}</span>
              </h3>
              <p className={styles.summary}>{t(`items.${key}.summary`)}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className={styles.extra}>
        <div>
          <h3 className={styles.subtitle}>{t("educationTitle")}</h3>
          <ul className={styles.plain}>
            {EDUCATION.map((key) => (
              <li key={key}>
                {t(`education.${key}.course`)} <span className={styles.company}>· {t(`education.${key}.school`)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={styles.subtitle}>{t("languagesTitle")}</h3>
          <ul className={styles.plain}>
            {LANGUAGES.map((key) => (
              <li key={key}>
                {t(`languages.${key}.name`)} <span className={styles.company}>· {t(`languages.${key}.level`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

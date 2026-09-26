import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { AWARDS } from "@/lib/profile";
import timeline from "./Experience.module.css";
import styles from "./Awards.module.css";
import { Section } from "./Section";

/** Reconhecimentos e prêmios, no mesmo formato de linha do tempo da trajetória. */
export async function Awards({ locale, index }: { locale: Locale; index: number }) {
  const t = await getTranslations({ locale, namespace: "awards" });

  return (
    <Section id="awards" index={index} title={t("title")}>
      <ol className={timeline.timeline}>
        {AWARDS.map((key) => (
          <li key={key} className={timeline.item}>
            <p className={timeline.when}>{t(`items.${key}.when`)}</p>
            <div>
              <h3 className={timeline.role}>
                {t(`items.${key}.award`)} <span className={timeline.company}>· {t(`items.${key}.event`)}</span>
              </h3>
              <p className={styles.issuer}>{t(`items.${key}.issuer`)}</p>
              <p className={timeline.summary}>{t(`items.${key}.summary`)}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

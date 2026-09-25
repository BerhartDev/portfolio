import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { STACK_GROUPS } from "@/lib/profile";
import { Section } from "./Section";
import styles from "./Stack.module.css";

export async function Stack({ locale, index }: { locale: Locale; index: number }) {
  const t = await getTranslations({ locale, namespace: "stack" });

  return (
    <Section id="stack" index={index} title={t("title")}>
      <dl className={styles.groups}>
        {STACK_GROUPS.map((key) => (
          <div key={key} className={styles.group}>
            <dt className={styles.name}>{t(`groups.${key}.name`)}</dt>
            <dd>{t(`groups.${key}.items`)}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

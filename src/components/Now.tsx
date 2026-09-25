import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import styles from "./Now.module.css";
import { Section } from "./Section";

export async function Now({ locale, index }: { locale: Locale; index: number }) {
  const t = await getTranslations({ locale, namespace: "now" });

  return (
    <Section id="now" index={index} title={t("title")}>
      <p className={styles.body}>{t("body")}</p>
    </Section>
  );
}

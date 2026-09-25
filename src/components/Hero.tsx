import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import styles from "./Hero.module.css";

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "hero" });

  return (
    <div className={styles.hero}>
      <h1 className={styles.name}>{t("name")}</h1>
      <div className={styles.text}>
        <p className={styles.role}>{t("role")}</p>
        <p className={styles.lead}>{t("lead")}</p>
        <p className={styles.sub}>{t("sub")}</p>
      </div>
    </div>
  );
}

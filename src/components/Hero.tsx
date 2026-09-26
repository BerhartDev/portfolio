import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import styles from "./Hero.module.css";
import { SocialLinks } from "./SocialLinks";

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });

  return (
    <div className={styles.hero}>
      <h1 className={styles.name}>{t("hero.name")}</h1>
      <div className={styles.text}>
        <p className={styles.role}>{t("hero.role")}</p>
        <p className={styles.lead}>{t("hero.lead")}</p>
        <p className={styles.sub}>{t("hero.sub")}</p>
        <SocialLinks locale={locale} label={t("social.label")} className={styles.social} />
      </div>
    </div>
  );
}

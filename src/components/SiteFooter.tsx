import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import styles from "./SiteFooter.module.css";
import { SocialLinks } from "./SocialLinks";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });

  return (
    <footer className={styles.footer}>
      <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
      <SocialLinks label={t("social.label")} size="sm" />
      <p>{t("footer.note")}</p>
    </footer>
  );
}

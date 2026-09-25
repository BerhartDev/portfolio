import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import styles from "./SiteFooter.module.css";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <footer className={styles.footer}>
      <p>{t("copyright", { year: new Date().getFullYear() })}</p>
      <p>{t("note")}</p>
    </footer>
  );
}

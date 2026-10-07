import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import styles from "./SiteFooter.module.css";
import { SocialLinks } from "./SocialLinks";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });

  return (
    <footer className={styles.footer}>
      <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
      <SocialLinks locale={locale} label={t("social.label")} size="sm" />
      <a className={styles.badge} href="https://www.cloudflare.com/" rel="noopener noreferrer">
        {/* Selo oficial, sem recorte. Export estático: <img> direto. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/cloudflare-badge.png" alt={t("footer.cloudflare")} width={761} height={264} />
      </a>
    </footer>
  );
}

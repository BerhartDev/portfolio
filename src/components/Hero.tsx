import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { projectsPath } from "@/lib/routes";
import styles from "./Hero.module.css";
import { SocialLinks } from "./SocialLinks";

/**
 * Topo da home. A foto fica ao fundo, discreta e com textura de linhas de 1px;
 * o texto vem por cima em faixas sólidas de --bg, que garantem a leitura sem gradiente.
 */
export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });

  return (
    <div className={styles.hero}>
      <div className={styles.photo}>
        {/* Export estático sem otimização de imagem: <img> com srcset. É o maior elemento do topo, então carrega com prioridade. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/profile/bernardo-1086.webp"
          srcSet="/profile/bernardo-640.webp 640w, /profile/bernardo-1086.webp 1086w"
          sizes="(min-width: 60rem) 18rem, 40vw"
          width={1086}
          height={1448}
          alt={t("hero.photoAlt")}
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <h1 className={styles.name}>
        <span className={styles.strip}>{t("hero.name")}</span>
      </h1>
      <div className={styles.text}>
        <p className={styles.role}>
          <span className={styles.strip}>{t("hero.role")}</span>
        </p>
        <p className={styles.lead}>
          <span className={styles.strip}>{t("hero.lead")}</span>
        </p>
        <p className={styles.sub}>
          <span className={styles.strip}>{t("hero.sub")}</span>
        </p>
        <SocialLinks locale={locale} label={t("social.label")} className={styles.social} />
        <a href={projectsPath(locale)} className={styles.cta}>
          {t("hero.cta")}
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </div>
  );
}

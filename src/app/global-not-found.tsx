import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { mono, sans } from "@/lib/fonts";
import { homePath } from "@/lib/routes";
import { themeScript } from "@/lib/theme-script";
import "@/styles/globals.css";
import styles from "./global-not-found.module.css";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false },
};

// Sem idioma na URL não dá para saber qual usar: a página mostra os quatro.
export default async function GlobalNotFound() {
  const messages = await Promise.all(
    routing.locales.map(async (locale) => {
      const t = await getTranslations({ locale, namespace: "notFound" });
      return { locale, title: t("title"), back: t("back") };
    }),
  );

  return (
    <html lang={routing.defaultLocale} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <main className={`container ${styles.main}`}>
          <p className={styles.code} aria-hidden="true">
            404
          </p>
          <ul className={styles.list}>
            {messages.map(({ locale, title, back }) => (
              <li key={locale} lang={locale} className={styles.item}>
                <span>{title}</span>
                <a href={homePath(locale)} hrefLang={locale} className="link">
                  {back}
                </a>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}

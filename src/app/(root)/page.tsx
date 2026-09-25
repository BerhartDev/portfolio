import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export default async function RootPage() {
  const links = await Promise.all(
    routing.locales.map(async (locale) => {
      const t = await getTranslations({ locale, namespace: "root" });
      return { locale, label: t("continue") };
    }),
  );

  return (
    <main>
      <ul>
        {links.map(({ locale, label }) => (
          <li key={locale}>
            <a href={`/${locale}/`} hrefLang={locale} lang={locale}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

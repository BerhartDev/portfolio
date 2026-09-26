import { getTranslations, setRequestLocale } from "next-intl/server";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Now } from "@/components/Now";
import { Projects } from "@/components/Projects";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Stack } from "@/components/Stack";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { homePath } from "@/lib/routes";

export default async function HomePage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <div id="top" className="container">
      <a href="#main" className="skip-link">
        {t("skip")}
      </a>
      <SiteHeader locale={locale} pathFor={homePath} />
      <main id="main">
        <Hero locale={locale} />
        {/* Ordem pensada para recrutadores: stack, projetos, experiência. */}
        <Stack locale={locale} index={1} />
        <Projects locale={locale} index={2} />
        <Experience locale={locale} index={3} />
        <Now locale={locale} index={4} />
        <Contact locale={locale} index={5} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

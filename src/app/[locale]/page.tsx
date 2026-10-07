import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Awards } from "@/components/Awards";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Projects } from "@/components/Projects";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Stack } from "@/components/Stack";
import { profilePage } from "@/lib/jsonld";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { homePath } from "@/lib/routes";

export async function Home({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });
  const meta = await getTranslations({ locale, namespace: "meta" });

  return (
    <div id="top" className="container">
      <JsonLd data={profilePage(locale, meta("title"), meta("description"), meta("jobTitle"))} />
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
        <Awards locale={locale} index={4} />
        <Contact locale={locale} index={5} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  // /pt/ repete a home de /. O canonical já é /; esta cópia não entra no índice.
  if (locale !== "pt") return {};
  return { robots: { index: false, follow: true } };
}

export default async function HomePage({ params }: LocaleParams) {
  return <Home locale={await resolveLocale(params)} />;
}

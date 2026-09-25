import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { displayUrl, profile } from "@/lib/profile";
import styles from "./Contact.module.css";
import { Section } from "./Section";

export async function Contact({ locale, index }: { locale: Locale; index: number }) {
  const t = await getTranslations({ locale });

  const channels = [
    { key: "email", label: t("contact.email"), href: profile.email && `mailto:${profile.email}`, text: profile.email },
    { key: "linkedin", label: t("contact.linkedin"), href: profile.linkedin, text: displayUrl(profile.linkedin) },
    { key: "github", label: t("contact.github"), href: profile.github, text: profile.github && displayUrl(profile.github) },
  ];

  return (
    <Section id="contact" index={index} title={t("contact.title")}>
      <p className={styles.lead}>{t("contact.lead")}</p>
      <ul className={styles.list}>
        {channels.map(({ key, label, href, text }) => (
          <li key={key} className={styles.item}>
            <span className={styles.label}>{label}</span>
            {href && text ? (
              <a href={href} className={styles.value}>
                <span className="link">{text}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </a>
            ) : (
              <span className={styles.missing}>{t("common.missing")}</span>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

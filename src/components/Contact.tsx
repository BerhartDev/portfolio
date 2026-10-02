import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { CONTACT_NETWORKS, profile } from "@/lib/profile";
import { ContactForm } from "./ContactForm";
import { Section } from "./Section";
import { SocialLinks } from "./SocialLinks";

export async function Contact({ locale, index }: { locale: Locale; index: number }) {
  const t = await getTranslations({ locale });

  return (
    <Section id="contact" index={index} title={t("contact.title")}>
      <SocialLinks locale={locale} label={t("social.label")} networks={CONTACT_NETWORKS} />
      <ContactForm
        labels={{
          name: t("contact.name"),
          email: t("contact.email"),
          message: t("contact.message"),
          whatsapp: t("contact.whatsapp"),
          emailSubmit: t("contact.emailSubmit"),
          sending: t("contact.sending"),
          sent: t("contact.sent"),
          error: t("contact.error"),
          subject: t("contact.subject"),
          template: t("contact.template"),
          topic: t("contact.topic"),
          topicPlaceholder: t("contact.topicPlaceholder"),
          topicJob: t("contact.topicJob"),
          topicProject: t("contact.topicProject"),
          topicOther: t("contact.topicOther"),
          errName: t("contact.errName"),
          errEmail: t("contact.errEmail"),
          errEmailDomain: t("contact.errEmailDomain"),
          errMessage: t("contact.errMessage"),
          errMessageLong: t("contact.errMessageLong"),
          errTopic: t("contact.errTopic"),
          errFast: t("contact.errFast"),
          errLimit: t("contact.errLimit"),
          linksRemoved: t("contact.linksRemoved"),
        }}
        whatsappNumber={profile.whatsapp}
        accessKey={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() || undefined}
      />
    </Section>
  );
}

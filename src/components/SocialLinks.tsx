import type { Locale } from "next-intl";
import { HOME_PLACEHOLDER, SOCIAL_NETWORKS, socialLinks, type SocialNetwork } from "@/lib/profile";
import { homePath } from "@/lib/routes";
import { SOCIAL_ICONS } from "./social-icons";
import styles from "./SocialLinks.module.css";

type Props = {
  locale: Locale;
  label: string;
  size?: "md" | "sm";
  className?: string;
  networks?: readonly SocialNetwork[];
};

/** Ícones das redes com URL preenchida em profile.ts. HOME_PLACEHOLDER leva à home no idioma atual. */
export function SocialLinks({ locale, label, size = "md", className, networks = SOCIAL_NETWORKS }: Props) {
  const items = networks.flatMap((key) => {
    const url = socialLinks[key];
    if (!url) return [];
    const placeholder = url === HOME_PLACEHOLDER;
    return [{ key, href: placeholder ? homePath(locale) : url, rel: placeholder ? undefined : "me noopener", ...SOCIAL_ICONS[key] }];
  });
  if (!items.length) return null;

  return (
    <ul aria-label={label} className={`${styles.list} ${styles[size] ?? ""} ${className ?? ""}`}>
      {items.map(({ key, href, rel, name, path }) => (
        <li key={key}>
          <a href={href} className={styles.link} rel={rel} aria-label={name} title={name}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
              <path d={path} fill="currentColor" />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

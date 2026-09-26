import { SOCIAL_NETWORKS, socialLinks } from "@/lib/profile";
import { SOCIAL_ICONS } from "./social-icons";
import styles from "./SocialLinks.module.css";

type Props = { label: string; size?: "md" | "sm"; className?: string };

/** Ícones das redes com URL preenchida em profile.ts. Sem nenhuma, não renderiza nada. */
export function SocialLinks({ label, size = "md", className }: Props) {
  const networks = SOCIAL_NETWORKS.flatMap((key) => {
    const href = socialLinks[key];
    return href ? [{ key, href, ...SOCIAL_ICONS[key] }] : [];
  });
  if (!networks.length) return null;

  return (
    <ul aria-label={label} className={`${styles.list} ${styles[size] ?? ""} ${className ?? ""}`}>
      {networks.map(({ key, href, name, path }) => (
        <li key={key}>
          <a href={href} className={styles.link} rel="me noopener" aria-label={name} title={name}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
              <path d={path} fill="currentColor" />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

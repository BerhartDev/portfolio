import type { Locale } from "next-intl";
import type { ProjectImage } from "@/lib/projects";
import styles from "./Gallery.module.css";

/** Imagens do projeto em grade. A primeira ocupa a largura toda. */
export function Gallery({ locale, images }: { locale: Locale; images: ProjectImage[] }) {
  return (
    <ul className={styles.grid}>
      {images.map((image) => (
        <li key={image.src} className={styles.item}>
          <figure>
            {/* Export estático sem otimização de imagem: <img> direto, com dimensões para evitar layout shift. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt[locale]}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
            />
            {image.caption && <figcaption>{image.caption[locale]}</figcaption>}
          </figure>
        </li>
      ))}
    </ul>
  );
}

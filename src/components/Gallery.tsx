import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { ProjectImage } from "@/lib/projects";
import { Carousel, type Slide } from "./Carousel";

/** Galeria do projeto: resolve alt e legenda no idioma e entrega ao carrossel. */
export async function Gallery({ locale, images, id }: { locale: Locale; images: ProjectImage[]; id: string }) {
  const t = await getTranslations({ locale, namespace: "article.gallery" });
  const slides: Slide[] = images.map((image) => ({
    src: image.src,
    width: image.width,
    height: image.height,
    alt: image.alt[locale],
    caption: image.caption?.[locale],
  }));
  const total = slides.length;

  return (
    <Carousel
      id={id}
      slides={slides}
      labels={{
        region: t("label"),
        prev: t("prev"),
        next: t("next"),
        slides: slides.map((_, i) => t("slide", { n: i + 1, total })),
      }}
    />
  );
}

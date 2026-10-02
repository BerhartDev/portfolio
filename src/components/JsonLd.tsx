type Props = { data: Record<string, unknown> | Record<string, unknown>[] };

/** JSON-LD no HTML estático. `<` vira escape para o script não fechar. */
export function JsonLd({ data }: Props) {
  const payload = Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : { "@context": "https://schema.org", ...data };
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

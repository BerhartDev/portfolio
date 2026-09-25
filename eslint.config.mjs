import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  { ignores: [".next/**", "out/**", "next-env.d.ts"] },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      // App Router: não há pages/. Links entre idiomas são <a> de propósito (recarregam o root layout).
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default config;

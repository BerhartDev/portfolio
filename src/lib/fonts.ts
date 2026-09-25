import { IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";

export const sans = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  variable: "--font-schibsted",
  display: "swap",
});

export const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

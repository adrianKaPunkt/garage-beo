import { defineRouting } from "next-intl/routing";

// URL-Präfix pro Fassung, Standard ist /<locale>
const prefixes = { "sr-Cyrl": "/cir" } as const;

export const routing = defineRouting({
  // sr-Cyrl hat kein eigenes Dictionary, es wird aus sr-Latn transliteriert
  locales: ["sr-Latn", "sr-Cyrl", "de", "en"],
  defaultLocale: "sr-Latn",
  localePrefix: {
    // Latinica bleibt ohne Präfix unter "/", die anderen unter /cir, /de, /en
    mode: "as-needed",
    prefixes,
  },
  // Keine Weiterleitung nach Browsersprache: Jede Fassung hat ihre feste URL
  localeDetection: false,
  localeCookie: false,
  // hreflang setzen wir selbst in den Metadaten
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];

// Pfad einer Fassung, z.B. "/cir" oder "/" für die Standardfassung
export function localePath(locale: Locale) {
  if (locale === routing.defaultLocale) return "/";
  return (prefixes as Partial<Record<Locale, string>>)[locale] ?? `/${locale}`;
}

// Für hreflang und <html lang>
export const htmlLang: Record<Locale, string> = {
  "sr-Latn": "sr-Latn",
  "sr-Cyrl": "sr-Cyrl",
  de: "de",
  en: "en",
};

export const ogLocale: Record<Locale, string> = {
  "sr-Latn": "sr_RS",
  "sr-Cyrl": "sr_RS",
  de: "de_DE",
  en: "en_US",
};

import type { MetadataRoute } from "next";
import { site } from "@/app/site-config";
import { htmlLang, localePath, routing } from "@/i18n/routing";

// Jede Fassung als eigener Eintrag, jeweils mit Verweis auf die anderen
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();

  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      htmlLang[locale],
      url(localePath(locale)),
    ]),
  );

  return routing.locales.map((locale) => ({
    url: url(localePath(locale)),
    lastModified: new Date(),
    alternates: { languages },
  }));
}

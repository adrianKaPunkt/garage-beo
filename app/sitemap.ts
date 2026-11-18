import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";
import { htmlLang, localePath, routing } from "@/i18n/routing";

export const dynamic = "force-static";

// Bilder für die Google-Bildersuche: Maskottchen (nur vollständige Varianten,
// keine Animations-Einzelteile) und Fotos der Station
const images = [
  "garage-beograd-maskota-tehnicki-pregled.webp",
  "garage-beograd-maskota-registracija.webp",
  "garage-beograd-maskota-kompletna-usluga.webp",
  "garage-beograd-maskota-osiguranje.webp",
  "garage-beograd-maskota-placanje-racuna.webp",
  "garage-beograd-maskota-kontakt.webp",
  "tehnicki-pregled-garage-beograd-zvezdara.webp",
  "tehnicki-pregled-garage-zvezdara-ulaz01.webp",
  "tehnicki-pregled-garage-zvezdara-ulaz02.webp",
  "tehnicki-pregled-garage-beograd-linija.webp",
  "tehnicki-pregled-garage-beograd-hala.webp",
  "tehnicki-pregled-garage-beograd-vozilo-na-liniji.webp",
  "tehnicki-pregled-garage-beograd-vozilo-ceka.webp",
  "tehnicki-pregled-garage-beograd-izduvni-gasovi.webp",
  "garage-beograd-kancelarija-registracija.webp",
  "garage-beograd-kancelarija-cekaonica.webp",
  "garage-beograd-dvoriste-klupe-vinova-loza.webp",
  "garage-beograd-dvoriste-sto-vocnjak.webp",
  "garage-beograd-tim-tehnicki-pregled-zvezdara.webp",
];

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
    images: images.map((name) => url(`/images/${name}`)),
  }));
}

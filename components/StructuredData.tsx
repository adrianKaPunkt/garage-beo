import { getLocale, getTranslations } from "next-intl/server";
import { contactTopics, site } from "@/app/site-config";
import { htmlLang, localePath } from "@/i18n/routing";

// Index wie bei days in site.hours: 0 = Sonntag ... 6 = Samstag
const SCHEMA_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Unternehmensdaten für Google, in der Sprache der jeweiligen Fassung
export default async function StructuredData() {
  const locale = await getLocale();
  const tMeta = await getTranslations("meta");
  const tContact = await getTranslations("contact");

  const business = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: tMeta("intro"),
    url: new URL(localePath(locale), site.url).toString(),
    inLanguage: htmlLang[locale],
    image: `${site.url}/images/og-image.jpg`,
    telephone: site.phone.replace(/\s/g, ""),
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.addressParts.street,
      postalCode: site.addressParts.postalCode,
      addressLocality: site.addressParts.city,
      addressCountry: site.addressParts.countryCode,
    },
    geo: { "@type": "GeoCoordinates", ...site.geo },
    areaServed: { "@type": "City", name: site.addressParts.city },
    // Einträge ohne Uhrzeit sind geschlossene Tage
    openingHoursSpecification: site.hours.flatMap(({ days, time }) => {
      const [opens, closes] = time?.split(" – ") ?? [];

      if (!opens || !closes) return [];

      return [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: days.map((day) => SCHEMA_DAYS[day]),
          opens,
          closes,
        },
      ];
    }),
    makesOffer: contactTopics
      .filter((topic) => topic !== "other")
      .map((topic) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: tContact(`topics.${topic}`) },
      })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(business).replace(/</g, "\\u003c"),
      }}
    />
  );
}

import { site } from "@/app/site-config";

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

// Unternehmensdaten für Google, nur Angaben aus der site-config
const business = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  description: site.intro,
  url: site.url,
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
  // Einträge ohne Uhrzeit ("Ne radimo") sind geschlossene Tage
  openingHoursSpecification: site.hours.flatMap(({ days, time }) => {
    const [opens, closes] = time.split(" – ");

    if (!closes) return [];

    return [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days.map((day) => SCHEMA_DAYS[day]),
        opens,
        closes,
      },
    ];
  }),
  makesOffer: site.contactTopics
    .filter((topic) => topic !== "Drugo")
    .map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(business).replace(/</g, "\u003c"),
      }}
    />
  );
}

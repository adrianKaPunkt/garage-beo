// Feste Daten der Seite. Alle sichtbaren Texte stehen in /dictionaries.

// Adresse für Google Maps und strukturierte Daten (immer Latinica)
export const addressParts = {
  street: "Nabokovljeva 1a",
  postalCode: "11150",
  city: "Beograd",
  country: "Srbija",
  countryCode: "RS",
};

// Navigation für Header und Footer, in der Reihenfolge der Seite.
// key verweist auf common.nav im Dictionary.
export const navLinks = [
  { key: "home", href: "#pocetna" },
  { key: "about", href: "#o-nama" },
  { key: "services", href: "#usluge" },
  { key: "contact", href: "#kontakt" },
  { key: "hours", href: "#radno-vreme" },
] as const;

// Index wie bei days in site.hours: 0 = Sonntag ... 6 = Samstag.
// Die Namen stehen in common.days im Dictionary.
export const DAY_KEYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

// Reihenfolge in Öffnungszeiten-Listen: beginnt am Montag
export const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

// Themen im Kontaktformular, die Texte stehen in contact.topics
export const contactTopics = [
  "inspection",
  "registration",
  "insurance",
  "payment",
  "other",
] as const;

export type ContactTopic = (typeof contactTopics)[number];

type OpeningHours = {
  // 0 = Sonntag ... 6 = Samstag
  days: number[];
  // null = geschlossen
  time: string | null;
};

const hours: OpeningHours[] = [
  { days: [1, 2, 3, 4, 5], time: "08:00 – 16:00" },
  { days: [6], time: "09:00 – 15:00" },
  { days: [0], time: null },
];

export const site = {
  name: "Garage Beograd",
  // Live-Domain: Basis für Canonical, Sitemap und Vorschaubilder
  url: "https://garagebeograd.rs",
  phone: "+381 64 1260935",
  email: "info@garagebeograd.rs",
  address: `${addressParts.street}, ${addressParts.postalCode} ${addressParts.city}, ${addressParts.country}`,
  addressParts,
  geo: { latitude: 44.7759916, longitude: 20.5499453 },
  mapsUrl:
    "https://www.google.com/maps/place/Tehni%C4%8Dki+i+registracija+Garage/@44.7756933,20.5500733,21z/data=!4m15!1m8!3m7!1s0x475a774faccbcdef:0xb1882f90fbb97c00!2sNabokovljeva+1a,+Beograd+11000,+Serbien!3b1!8m2!3d44.7759706!4d20.5500022!16s%2Fg%2F11l5d1ymn5!3m5!1s0x475a77df1d97ea85:0xe0e00ccd1e82a9e0!8m2!3d44.7759391!4d20.5499628!16s%2Fg%2F11v3q652d3?entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D",
  bookingUrl: "",
  // Profil-Adressen: Ohne Eintrag ist das Icon im Footer nicht klickbar
  social: {
    facebook: "",
    instagram: "https://www.instagram.com/garage_beograd/",
    youtube: "",
    tiktok: "",
  },
  hours,
  // Pravni podaci: Leere Felder erscheinen im Modal als [DOPUNITI: ...]
  legal: {
    // Datum im Format JJJJ-MM-TT, wird pro Sprache formatiert
    lastUpdated: "2026-11-06",
    companyName: "",
    legalForm: "",
    representative: "",
    taxNumber: "",
    registrationNumber: "",
    activityCode: "",
    inspectionLicense: "",
    hostingProvider: "",
    retentionPeriod: "",
  },
};

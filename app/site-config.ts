export const site = {
  name: "Garage Beograd",
  subtitle: "TEHNIČKI PREGLED",
  phone: "+381 64 1260935",
  email: "info@garagebeograd.rs",
  address: "Nabokovljeva 1a, 11150 Beograd, Srbija",
  mapsUrl:
    "http://www.google.com/maps?vet=10CAAQoqAOahcKEwiwwOWF2u-XAxUAAAAAHQAAAAAQJQ..i&lr=lang_de&rlz=1C1GCEA_enDE1232DE1232&sca_esv=4317535cc7d6f209&udm&fvr=1&pvq=Cg0vZy8xMXYzcTY1MmQz&cs=1&um=1&ie=UTF-8&fb=1&gl=de&sa=X&ftid=0x475a77df1d97ea85:0xe0e00ccd1e82a9e0",
  bookingUrl: "",
  hours: [
    // days: 0 = Sonntag ... 6 = Samstag
    { day: "Ponedeljak – Petak", days: [1, 2, 3, 4, 5], time: "08:00 – 16:00" },
    { day: "Subota", days: [6], time: "09:00 – 15:00" },
    { day: "Nedelja", days: [0], time: "Ne radimo" },
  ],
  contactTopics: [
    "Tehnički pregled",
    "Registracija vozila",
    "Osiguranje",
    "Plaćanje računa",
    "Drugo",
  ],
  // Pravni podaci: Leere Felder erscheinen im Modal als [DOPUNITI: ...]
  legal: {
    lastUpdated: "6. novembar 2026.",
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
  intro:
    "Tehnički pregled, registracija vozila, osiguranje i plaćanje računa – sve na jednom mestu.",
};

// Serbisch (Latinica) ist die Referenz: Die anderen Sprachen müssen
// dieselben Keys haben, sonst meldet TypeScript einen Fehler.
// Ćirilica wird automatisch daraus erzeugt (i18n/transliterate.ts).
//
// Neues Dictionary: JSON-Datei anlegen und hier sowie in de/ und en/ eintragen.
import common from "./common.json";
import meta from "./meta.json";
import header from "./header.json";
import hero from "./hero.json";
import features from "./features.json";
import about from "./about.json";
import services from "./services.json";
import tehnicki from "./tehnicki.json";
import registration from "./registration.json";
import insurance from "./insurance.json";
import payment from "./payment.json";
import contact from "./contact.json";
import footer from "./footer.json";
import testimonials from "./testimonials.json";
import legal from "./legal.json";

const messages = {
  common,
  meta,
  header,
  hero,
  features,
  about,
  services,
  tehnicki,
  registration,
  insurance,
  payment,
  contact,
  footer,
  testimonials,
  legal,
};

export type Messages = typeof messages;

export default messages;

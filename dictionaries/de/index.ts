import type { Messages } from "../sr";
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
import fullService from "./fullService.json";
import contact from "./contact.json";
import footer from "./footer.json";
import testimonials from "./testimonials.json";
import legal from "./legal.json";

// Typ aus sr: Fehlt hier ein Key, meldet TypeScript einen Fehler
const messages: Messages = {
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
  fullService,
  contact,
  footer,
  testimonials,
  legal,
};

export default messages;

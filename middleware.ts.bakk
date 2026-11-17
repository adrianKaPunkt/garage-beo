import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Alle Seiten außer API, Next-interne Dateien und Dateien mit Endung (Bilder, sitemap.xml …)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};

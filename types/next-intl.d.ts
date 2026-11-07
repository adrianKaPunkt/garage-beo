import type { routing } from "@/i18n/routing";
import type { Messages } from "@/dictionaries/sr";

// Macht Keys und Locales typsicher: t("falscher.key") ist ein TypeScript-Fehler
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: Messages;
  }
}

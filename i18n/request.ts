import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import sr, { type Messages } from "@/dictionaries/sr";
import de from "@/dictionaries/de";
import en from "@/dictionaries/en";
import { routing, type Locale } from "./routing";
import { transliterateMessages } from "./transliterate";

// Welches Dictionary zu welcher Fassung gehört.
// Ćirilica wird einmalig aus der Latinica erzeugt.
const dictionaries: Record<Locale, Messages> = {
  "sr-Latn": sr,
  "sr-Cyrl": transliterateMessages(sr),
  de,
  en,
};

export function getMessages(locale: Locale) {
  return dictionaries[locale];
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: dictionaries[locale],
    timeZone: "Europe/Belgrade",
  };
});

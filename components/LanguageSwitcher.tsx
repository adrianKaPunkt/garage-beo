"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { htmlLang, localePath, routing, type Locale } from "@/i18n/routing";

// Sprachnamen stehen immer in der eigenen Sprache und Schrift,
// deshalb hier und nicht im Dictionary
const languages: Record<Locale, { short: string; name: string }> = {
  "sr-Latn": { short: "SR", name: "Srpski (latinica)" },
  "sr-Cyrl": { short: "СР", name: "Српски (ћирилица)" },
  de: { short: "DE", name: "Deutsch" },
  en: { short: "EN", name: "English" },
};

export default function LanguageSwitcher() {
  const t = useTranslations("header");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Schließen bei Klick außerhalb oder mit Esc
  useEffect(() => {
    if (!open) return;

    const handlePointer = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={`${t("language")}: ${languages[locale].name}`}
        aria-expanded={open}
        aria-controls="language-menu"
        onClick={() => setOpen((value) => !value)}
        // Gleicher Stil wie der Anrufen-Button im Header
        className="
          inline-flex min-h-11 min-w-11 cursor-pointer
          items-center justify-center gap-2
          rounded-xl border border-green/20
          bg-green/5 px-3
          font-bold text-darkgreen
          transition-colors duration-200
          hover:bg-green/10
          focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-green
        "
      >
        <Globe size={20} aria-hidden="true" />
        {languages[locale].short}
      </button>

      {/* Immer im HTML, nur ausgeblendet: So finden Suchmaschinen alle Fassungen */}
      <ul
        id="language-menu"
        hidden={!open}
        className="
            absolute right-0 top-full z-50 mt-2
            m-0 min-w-52 list-none
            overflow-hidden rounded-xl
            border border-gray-200 bg-white p-1.5
            shadow-lg
          "
      >
        {routing.locales.map((entry) => {
          const isActive = entry === locale;

          return (
            <li key={entry}>
              {/* Direkt auf die feste URL der Fassung, ohne Umleitung */}
              <a
                href={localePath(entry)}
                hrefLang={htmlLang[entry]}
                lang={htmlLang[entry]}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`
                    flex items-center justify-between gap-3
                    rounded-lg px-3 py-2.5
                    text-sm transition-colors
                    focus-visible:outline-2
                    focus-visible:outline-green
                    ${
                      isActive
                        ? "font-bold text-green"
                        : "text-gray-800 hover:bg-gray-100"
                    }
                  `}
              >
                {languages[entry].name}
                {isActive && <Check size={16} aria-hidden="true" />}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

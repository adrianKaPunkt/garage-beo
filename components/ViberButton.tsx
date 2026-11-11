"use client";

import { useTranslations } from "next-intl";
import { site } from "@/lib/site-config";

// Viber-Lila
const VIBER_PURPLE = "#7360f2";

/**
 * Schwebender Viber-Button unten rechts: öffnet direkt einen Chat mit
 * Garage Beograd (Nummer in site.viber). Auf dem Handy der schnellste
 * Kontaktweg; auf dem Desktop öffnet er Viber für Windows/Mac, falls
 * installiert.
 *
 * Während des Intros ausgeblendet, danach springt er herein
 * (Regeln in globals.css: [data-viber]).
 */
export default function ViberButton() {
  const t = useTranslations("common.actions");
  if (!site.viber) return null;

  const number = site.viber.replace(/[^\d+]/g, "");
  const label = t("viber");

  return (
    <a
      data-viber
      href={`viber://chat?number=${encodeURIComponent(number)}`}
      aria-label={label}
      className="
        group fixed z-40
        right-[max(1rem,env(safe-area-inset-right))]
        bottom-[max(1rem,env(safe-area-inset-bottom))]
        flex items-center gap-3
        focus-visible:outline-none
      "
    >
      {/* Desktop: Beschriftung erscheint beim Hovern links neben dem Button */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none hidden rounded-full bg-white px-4 py-2
          text-sm font-bold text-gray-800 shadow-lg
          opacity-0 translate-x-2 transition duration-200
          group-hover:opacity-100 group-hover:translate-x-0
          group-focus-visible:opacity-100 group-focus-visible:translate-x-0
          sm:block
        "
      >
        {label}
      </span>

      <span
        className="
          relative flex h-14 w-14 items-center justify-center rounded-full
          text-white shadow-[0_8px_24px_rgba(115,96,242,0.45)]
          transition-transform duration-200
          group-hover:scale-110 group-active:scale-95
          group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-[#7360f2]
        "
        style={{ backgroundColor: VIBER_PURPLE }}
      >
        <ViberIcon />
      </span>
    </a>
  );
}

/** Sprechblase mit Telefonhörer und Wellen, angelehnt an das Viber-Zeichen */
function ViberIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      width="30"
      height="30"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Sprechblase */}
      <path d="M16 3.5c-6.6 0-11.5 3.6-11.5 10.4 0 4 1.4 6.6 3.6 8.2v5.4l4.2-3.4c1.2.2 2.4.3 3.7.3 6.6 0 11.5-3.6 11.5-10.5S22.6 3.5 16 3.5Z" />
      {/* Telefonhörer */}
      <path
        d="M11.6 10.2c.5-.5 1.2-.5 1.6 0l1.2 1.5c.4.5.3 1.1-.1 1.5l-.6.5c.6 1.4 1.7 2.5 3.1 3.1l.5-.6c.4-.4 1-.5 1.5-.1l1.5 1.2c.5.4.5 1.1 0 1.6l-.6.6c-.8.8-2 1-3.1.6-2.6-1-4.6-3-5.6-5.6-.4-1.1-.2-2.3.6-3.1l.6-.6Z"
        fill="currentColor"
        stroke="none"
      />
      {/* Wellen */}
      <path d="M17.2 8.6c2.2.3 3.9 2 4.2 4.2" strokeWidth="1.6" />
      <path d="M17.2 6.3c3.5.4 6.1 3 6.5 6.5" strokeWidth="1.6" />
    </svg>
  );
}

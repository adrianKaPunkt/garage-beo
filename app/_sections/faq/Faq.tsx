import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { waveMask } from "@/lib/waveMask";

// Reihenfolge der Fragen, die Texte stehen in faq.items im Dictionary
const FAQ_ITEMS = [
  "onePlace",
  "appointment",
  "documents",
  "duration",
  "insurance",
  "fullService",
] as const;

// Fragezeichen im Hintergrund: Position, Größe und Drehung
const QUESTION_MARKS = [
  { className: "top-[6%] left-[4%] text-[9rem] -rotate-12" },
  { className: "top-[38%] left-[12%] text-[5rem] rotate-6 max-md:hidden" },
  { className: "bottom-[6%] left-[3%] text-[12rem] rotate-12" },
  { className: "top-[4%] right-[8%] text-[7rem] rotate-12" },
  { className: "top-[45%] right-[3%] text-[13rem] -rotate-6" },
  {
    className: "bottom-[10%] right-[16%] text-[5rem] -rotate-12 max-md:hidden",
  },
];

// Links innerhalb der Antworten
const links = {
  hours: (chunks: ReactNode) => (
    <a href="#radno-vreme" className="font-bold text-[#14332a] underline!">
      {chunks}
    </a>
  ),
  contact: (chunks: ReactNode) => (
    <a
      href="#kontakt"
      className="font-bold text-[#a3115f] underline! transition-colors hover:text-[#14332a]"
    >
      {chunks}
    </a>
  ),
};

/**
 * Häufige Fragen als Akkordeon, nach der Kontakt-Sektion. Die wellige
 * Oberkante (lib/waveMask.ts) lässt das Dunkelgrün des Kontakts durchscheinen.
 *
 * <details>/<summary> funktionieren ohne JavaScript und mit der Tastatur;
 * dasselbe `name` schließt die offene Frage, wenn man eine andere öffnet.
 * Google liest auch die zugeklappten Antworten.
 */
export default function Faq() {
  const t = useTranslations("faq");

  // Strukturierte Daten: Fragen und Antworten als reiner Text
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((key) => ({
      "@type": "Question",
      name: t(`items.${key}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t.markup(`items.${key}.answer`, {
          hours: (chunks) => chunks,
          contact: (chunks) => chunks,
        }),
      },
    })),
  };

  return (
    <section
      id="pitanja"
      // Header zeigt das Logo hier in Dunkelgrün und Weiß (hooks/useSectionBackground.ts)
      data-header="orange"
      aria-labelledby="faq-title"
      // Orange wie BEOGRAD im Logo, als Verlauf wie beim Kontakt. Text in
      // Dunkelgrün (#14332a): auf diesem Orange mindestens 5,3 : 1 Kontrast,
      // Weiß wäre zu schwach und bleibt deshalb nur Schmuck
      // Welle: --wave = Höhe der Welle, um dieselbe Höhe nach oben in den
      // Kontakt geschoben (etwas flacher als in den Services, damit sie das
      // Kontaktformular nicht berührt)
      className="
        relative isolate scroll-mt-24 overflow-hidden
        bg-[linear-gradient(125deg,#f5a623_0%,#f19a2a_55%,#ec8a2c_100%)]
        text-[#14332a]
        [--wave:40px] sm:[--wave:56px] lg:[--wave:72px]
        -mt-10 sm:-mt-14 lg:-mt-18
        pt-25.5 pb-15.5 sm:pt-29.5 min-[701px]:pb-21 lg:pt-39
      "
      style={waveMask("mirrored")}
    >
      {/* Feines Raster wie beim Kontakt, damit beide Flächen zusammengehören */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)]
          bg-size-[40px_40px]
        "
      />

      {/* Dezente Fragezeichen im Hintergrund */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 select-none"
      >
        {QUESTION_MARKS.map(({ className }, index) => (
          <span
            key={index}
            className={`absolute font-extrabold leading-none text-white/15 ${className}`}
          >
            ?
          </span>
        ))}
      </div>

      <div className="container">
        {/* Überschrift wie in der About-Sektion */}
        <div className="mx-auto mb-10 max-w-4xl text-center lg:mb-14">
          <p className="mb-4 font-medium uppercase tracking-wide text-green">
            {t("eyebrow")}
          </p>
          <h2
            id="faq-title"
            className="mb-7 text-[clamp(36px,3vw,55px)] leading-[1.12] font-bold"
          >
            {/* Pink und Grün, jeweils so dunkel gewählt, dass sie auf dem
                Orange mindestens 3 : 1 Kontrast haben (große Schrift) */}
            <span className="text-[#a3115f]">{t("titleFirst")}</span>
            <span className="text-lime-300">{t("titleSecond")}</span>
          </h2>
          <span className="mx-auto mb-7 block h-1 w-16.5 rounded-xs bg-green" />
          <p className="m-0 text-lg">{t("intro")}</p>
        </div>

        {/* Keine Karten: nur Linien zwischen den Fragen (und oben/unten) */}
        <div className="mx-auto max-w-3xl border-t border-[#14332a]/20">
          {FAQ_ITEMS.map((key) => (
            <details
              key={key}
              name="faq"
              className="group border-b border-[#14332a]/20"
            >
              <summary
                className="
                  flex cursor-pointer list-none items-center justify-between gap-4
                  py-5 text-left font-bold text-[#a3115f]
                  transition-colors hover:text-lime-300 group-open:text-lime-300
                  sm:py-6 sm:text-lg
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14332a]
                  [&::-webkit-details-marker]:hidden
                "
              >
                <span>{t(`items.${key}.question`)}</span>
                <ChevronDown
                  size={22}
                  aria-hidden="true"
                  // Ohne eigene Farbe: übernimmt die Farbe der Frage (grün, beim Hover pink)
                  className="shrink-0 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <p className="m-0 pr-10 pb-6 leading-relaxed">
                {t.rich(`items.${key}.answer`, links)}
              </p>
            </details>
          ))}
        </div>

        {/* pt statt mt: globals.css setzt margin-top von p auf 0 */}
        <p className="mb-0 pt-16 text-center lg:pt-20">
          {t.rich("more", links)}
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}

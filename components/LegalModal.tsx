"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { LegalNotice, PrivacyPolicy } from "./LegalContent";

// Jeder normale Link auf diese Anker öffnet das Modal, z.B. <a href="#impresum">.
// Texte in legal.modal im Dictionary.
const tabs = [
  { hash: "#politika-privatnosti", key: "privacyTab" },
  { hash: "#impresum", key: "imprintTab" },
] as const;

export default function LegalModal() {
  const t = useTranslations("legal.modal");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeHash, setActiveHash] = useState<string>(tabs[0].hash);

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash;

      if (!tabs.some((tab) => tab.hash === hash)) return;

      setActiveHash(hash);

      if (!dialogRef.current?.open) {
        dialogRef.current?.showModal();
        document.body.style.overflow = "hidden";
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  // Jeder Text beginnt oben
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [activeHash]);

  // Läuft bei jedem Schließen, auch mit Esc
  const handleClose = () => {
    document.body.style.overflow = "";
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="legal-title"
      onClose={handleClose}
      onClick={(event) => {
        // Klick auf den abgedunkelten Hintergrund
        if (event.target === event.currentTarget) {
          dialogRef.current?.close();
        }
      }}
      className="
        m-auto w-[min(800px,calc(100%-32px))]
        overflow-hidden rounded-2xl
        border-0 bg-white p-0
        text-slate-700 shadow-2xl
        backdrop:bg-black/70
      "
    >
      <div className="flex max-h-[85dvh] flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-8">
          <h2 id="legal-title" className="sr-only">
            {t("title")}
          </h2>

          <div role="tablist" aria-label={t("title")} className="flex gap-2">
            {tabs.map((tab) => {
              const isActive = tab.hash === activeHash;

              return (
                <button
                  key={tab.hash}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="legal-panel"
                  onClick={() => setActiveHash(tab.hash)}
                  className={[
                    "cursor-pointer rounded-xl border-0 px-3 py-2 text-sm transition-colors sm:px-4",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green",
                    isActive
                      ? "bg-green text-white"
                      : "bg-transparent text-slate-700 hover:bg-slate-100",
                  ].join(" ")}
                >
                  <span className="font-bold">{t(tab.key)}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label={t("close")}
            onClick={() => dialogRef.current?.close()}
            className="
              flex h-10 w-10 shrink-0 cursor-pointer
              items-center justify-center rounded-full
              border-0 bg-slate-100 text-slate-700
              transition-colors hover:bg-slate-200
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-green
            "
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div
          ref={contentRef}
          id="legal-panel"
          role="tabpanel"
          tabIndex={0}
          className="overflow-y-auto px-5 py-6 leading-relaxed sm:px-8"
        >
          {/* Nur in Übersetzungen: In sr ist der Text leer */}
          {/* t.raw: nur prüfen, ob es einen Text gibt, ohne ihn zu formatieren */}
          {t.raw("translationNotice") && (
            <p className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-slate-700">
              {t.rich("translationNotice", {
                // Führt zum selben Text in der serbischen Standardfassung
                link: (chunks) => (
                  <a
                    href={`/${activeHash}`}
                    hrefLang="sr-Latn"
                    className="font-semibold text-darkgreen underline!"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          )}

          {activeHash === "#impresum" ? <LegalNotice /> : <PrivacyPolicy />}
        </div>
      </div>
    </dialog>
  );
}

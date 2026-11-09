"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { DAY_KEYS, WEEK_ORDER, navLinks, site } from "@/app/site-config";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { activeSocialLinks } from "@/components/socialLinks";

export default function Header() {
  const t = useTranslations("header");
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#pocetna");

  useEffect(() => {
    const updateActiveSection = () => {
      // Erkennungslinie im oberen Bereich des Bildschirms
      const activationPoint = 96 + window.innerHeight * 0.25;

      // Nach Position auf der Seite sortiert, nicht nach Menü-Reihenfolge
      const sections = navLinks
        .flatMap(({ href }) => {
          const element = document.getElementById(href.substring(1));

          return element
            ? [{ href, element, rect: element.getBoundingClientRect() }]
            : [];
        })
        .sort((a, b) => a.rect.top - b.rect.top);

      let current = sections[0];

      for (const section of sections) {
        const { element, rect } = section;

        if (rect.top > activationPoint) continue;

        // Radno vreme liegt in Kontakt: danach gilt wieder Kontakt
        if (
          rect.bottom <= activationPoint &&
          current.element.contains(element)
        ) {
          continue;
        }

        current = section;
      }

      if (current) setActiveSection(current.href);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <header
      // Bei offenem mobilem Menü deckend weiß, sonst leicht transparent
      className={`sticky top-0 z-50 h-20 border-b border-gray-200 backdrop-blur-md lg:h-24 lg:bg-white/80 ${
        menuOpen ? "bg-white" : "bg-white/80"
      }`}
    >
      <div className="container flex h-full items-center justify-between gap-3 lg:gap-7">
        {/* Logo */}
        <a
          href="#pocetna"
          className="flex min-w-0 shrink-0 flex-col"
          onClick={() => setMenuOpen(false)}
          aria-label={t("homeAria")}
        >
          <span className="whitespace-nowrap text-lg sm:text-2xl leading-6">
            <span className="font-bold text-green">GARAGE </span>
            <span className="text-orange">BEOGRAD</span>
          </span>
          <span className="text-left text-[11px] text-gray-900 font-semibold tracking-widest">
            {tCommon("brandSubtitle")}
          </span>
        </a>

        {/* Navigation */}
        <nav
          id="header-navigation"
          aria-label={t("navAria")}
          className={`
            absolute inset-x-0 top-full
            max-h-[calc(100dvh-5rem)] overflow-y-auto
            flex-col bg-white px-5 py-4
            shadow-lg
            lg:max-h-none lg:overflow-visible
            lg:static lg:flex lg:flex-row
            lg:items-center lg:gap-5
            lg:bg-transparent lg:p-0
            lg:shadow-none
            ${menuOpen ? "flex" : "hidden"}
          `}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setActiveSection(link.href);
                setMenuOpen(false);
              }}
              aria-current={
                activeSection === link.href ? "location" : undefined
              }
              className={`
    border-b border-gray-100
    px-2 py-3 text-center text-sm font-bold
    transition-colors duration-200
    lg:border-0 lg:px-0 lg:py-0 lg:text-left
    ${
      activeSection === link.href
        ? "text-green"
        : "text-gray-800 hover:text-green"
    }
  `}
            >
              {tCommon(`nav.${link.key}`)}
            </a>
          ))}

          {/* Mobil: nur aktive Social Links (mit URL in site.social) */}
          {activeSocialLinks.length > 0 && (
            <div
              role="group"
              aria-label={t("social")}
              className="flex justify-center gap-3 mt-3 pt-4 lg:hidden"
            >
              {activeSocialLinks.map(({ label, icon: Icon, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onClick={() => setMenuOpen(false)}
                  className="
                    inline-flex h-15 w-15
                    items-center justify-center
                    text-gray-800
                  "
                >
                  <Icon size={30} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}

          {/* Mobil: restliche Footer-Inhalte – Firma, Öffnungszeiten, Rechtliches */}
          <div className="mt-1 flex flex-col items-center gap-6 border-t border-gray-100 pt-6 text-center lg:hidden">
            {/* Garage Beograd */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col">
                <span className="text-xl leading-6">
                  <span className="font-bold text-green">GARAGE </span>
                  <span className="text-orange">BEOGRAD</span>
                </span>
                <span className="text-[11px] font-semibold tracking-widest text-gray-900">
                  {tCommon("brandSubtitle")}
                </span>
              </div>
              <address className="text-sm not-italic leading-relaxed text-gray-600">
                {tCommon("address.street")}, {tCommon("address.cityLine")}
              </address>
            </div>

            {/* Öffnungszeiten */}
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-sm font-bold text-gray-800">
                {tFooter("hours")}
              </h2>
              <dl className="m-0 grid grid-cols-[auto_auto] gap-x-6 gap-y-1 text-sm text-gray-600">
                {WEEK_ORDER.map((day) => (
                  <div key={day} className="contents">
                    <dt className="text-left">
                      {tCommon(`days.${DAY_KEYS[day]}`)}
                    </dt>
                    <dd className="m-0 whitespace-nowrap text-right">
                      {site.hours.find((entry) => entry.days.includes(day))
                        ?.time ?? tCommon("closed")}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Impressum & Datenschutz – öffnen das LegalModal über den Hash */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
              <a
                href="#impresum"
                onClick={() => setMenuOpen(false)}
                className="hover:text-green hover:underline"
              >
                {tFooter("imprint")}
              </a>
              <a
                href="#politika-privatnosti"
                onClick={() => setMenuOpen(false)}
                className="hover:text-green hover:underline"
              >
                {tFooter("privacy")}
              </a>
            </div>
          </div>
        </nav>

        {/* Sprache, Telefon und mobiles Menü */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <LanguageSwitcher />

          {site.phone && (
            <a
              href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
              aria-label={t("call", { phone: site.phone })}
              className="
                inline-flex min-h-11 min-w-11
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
              <Phone size={20} aria-hidden="true" />
              <span className="hidden whitespace-nowrap sm:inline">
                {site.phone}
              </span>
            </a>
          )}

          <button
            type="button"
            // Gleicher Stil wie Anrufen-Button und Sprachumschalter
            className="
              inline-flex h-11 w-11 cursor-pointer
              items-center justify-center
              rounded-xl border border-green/20
              bg-green/5 text-darkgreen
              transition-colors duration-200
              hover:bg-green/10
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-green
              lg:hidden
            "
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-controls="header-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/app/site-config";

const links = [
  { label: "Početna", href: "#pocetna" },
  { label: "Usluge", href: "#usluge" },
  { label: "O nama", href: "#o-nama" },
  { label: "Radno vreme", href: "#radno-vreme" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#pocetna");

  useEffect(() => {
    const updateActiveSection = () => {
      // Erkennungslinie im oberen Bereich des Bildschirms
      const activationPoint = 96 + window.innerHeight * 0.25;

      let current = links[0].href;

      for (const link of links) {
        const element = document.getElementById(link.href.substring(1));

        if (element && element.getBoundingClientRect().top <= activationPoint) {
          current = link.href;
        }
      }

      setActiveSection(current);
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
    <header className="sticky top-0 z-50 h-20 border-b border-gray-200 bg-white/80 backdrop-blur-md lg:h-24">
      <div className="container flex h-full items-center justify-between gap-3 lg:gap-7">
        {/* Logo */}
        <a
          href="#pocetna"
          className="flex min-w-0 shrink-0 flex-col"
          onClick={() => setMenuOpen(false)}
          aria-label="GARAGE BEOGRAD – početna"
        >
          <span className="whitespace-nowrap text-lg sm:text-2xl leading-6">
            <span className="font-bold text-green">GARAGE </span>
            <span className="text-orange">BEOGRAD</span>
          </span>
          <span className="text-left text-[11px] text-gray-900 font-semibold tracking-widest">
            &nbsp;TEHNIČKI PREGLED
          </span>
        </a>

        {/* Navigation */}
        <nav
          id="header-navigation"
          aria-label="Glavna navigacija"
          className={`
            absolute inset-x-0 top-full
            flex-col bg-white px-5 py-4
            shadow-lg
            lg:static lg:flex lg:flex-row
            lg:items-center lg:gap-5
            lg:bg-transparent lg:p-0
            lg:shadow-none
            ${menuOpen ? "flex" : "hidden"}
          `}
        >
          {links.map((link) => (
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
    px-2 py-3 text-sm font-bold
    transition-colors duration-200
    lg:border-0 lg:px-0 lg:py-0
    ${
      activeSection === link.href
        ? "text-green"
        : "text-gray-800 hover:text-green"
    }
  `}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Telefon und mobiles Menü */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {site.phone && (
            <a
              href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
              aria-label={`Pozovi nas: ${site.phone}`}
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
            className="
              inline-flex h-11 w-11
              items-center justify-center
              rounded-xl text-gray-800
              transition-colors hover:bg-gray-100
              focus-visible:outline-2
              focus-visible:outline-green
              lg:hidden
            "
            aria-label={menuOpen ? "Zatvori meni" : "Otvori meni"}
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

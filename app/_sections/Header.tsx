"use client";
import { useState } from "react";
import { CalendarDays, Menu, Phone, X } from "lucide-react";
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
  return (
    <header className="h-24 sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="container h-full flex items-center justify-between gap-7">
        <a
          href="#pocetna"
          className="flex flex-col w-55"
          onClick={() => setMenuOpen(false)}
          aria-label="GARAGE BEOGRAD – početna"
        >
          <span className="text-2xl">
            <span className="text-green font-bold">GARAGE </span>
            <span>BEOGRAD</span>
          </span>
          <span className="w-full font-light text-sm text-center tracking-widest">
            TEHNIČKI PREGLED
          </span>
        </a>
        <nav
          className={menuOpen ? "nav open" : "nav"}
          aria-label="Glavna navigacija"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          {site.phone && (
            <a
              className="phone-link"
              href={`tel:${site.phone.replace(/\s/g, "")}`}
            >
              <Phone size={18} />
              {site.phone}
            </a>
          )}
          <a
            href={site.bookingUrl || "#kontakt"}
            className="button button-primary nav-cta"
          >
            <CalendarDays size={18} /> Zakažite termin
          </a>
        </div>
        <button
          className="menu-button"
          aria-label={menuOpen ? "Zatvori meni" : "Otvori meni"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

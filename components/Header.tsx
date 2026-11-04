'use client';
import { useState } from 'react';
import { CalendarDays, Menu, Phone, X } from 'lucide-react';
import { site } from '@/app/site-config';

const links = [
  { label: 'Početna', href: '#pocetna' },
  { label: 'Usluge', href: '#usluge' },
  { label: 'O nama', href: '#o-nama' },
  { label: 'Radno vreme', href: '#radno-vreme' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header">
    <div className="container header-inner">
      <a href="#pocetna" className="wordmark" onClick={() => setMenuOpen(false)} aria-label="Garaža Beograd – početna">
        <span className="logo-car" aria-hidden="true"><svg viewBox="0 0 230 36"><path d="M8 28 C45 27 53 8 91 7 L158 7 C179 8 194 24 221 28" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/><path d="M74 10 L89 26 M151 10 L171 26" fill="none" stroke="currentColor" strokeWidth="3"/></svg></span>
        <span className="brand-main"><b>GARAŽA</b> BEOGRAD</span>
        <span className="brand-sub">TEHNIČKI PREGLED</span>
      </a>
      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Glavna navigacija">
        {links.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
      </nav>
      <div className="header-actions">
        {site.phone && <a className="phone-link" href={`tel:${site.phone.replace(/\s/g, '')}`}><Phone size={18} />{site.phone}</a>}
        <a href={site.bookingUrl || '#kontakt'} className="button button-primary nav-cta"><CalendarDays size={18} /> Zakažite termin</a>
      </div>
      <button className="menu-button" aria-label={menuOpen ? 'Zatvori meni' : 'Otvori meni'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </div>
  </header>;
}

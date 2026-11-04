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
      <a href="#pocetna" className="wordmark" onClick={() => setMenuOpen(false)} aria-label="GARAGE BEOGRAD – početna">
        <span className="brand-main"><b>GARAGE</b> BEOGRAD</span>
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

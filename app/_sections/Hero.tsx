import Image from 'next/image';
import { ArrowRight, CalendarDays, CheckCircle2 } from 'lucide-react';
import { site } from '../site-config';

const Hero = () => {
  return (
    <section className="hero" id="pocetna" aria-labelledby="hero-title">
        <Image src="/images/hero-garage.webp" alt="Stvarna fotografija objekta za tehnički pregled u Beogradu" fill sizes="100vw" priority className="hero-img" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <span className="eyebrow hero-eyebrow">GARAGE BEOGRAD</span>
          <h1 id="hero-title">Tehnički pregled<br />vozila u Beogradu</h1>
          <p className="hero-tagline">Brzo, jasno i na jednom mestu.</p>
          <ul className="hero-list">
            {['Tehnički pregled', 'Registracija vozila', 'Osiguranje', 'Plaćanje računa – PaySpot'].map(text => <li key={text}><CheckCircle2 size={20} /> {text}</li>)}
          </ul>
          <a className="button button-primary button-large" href={site.bookingUrl || '#kontakt'}><CalendarDays size={20} /> Zakažite termin <ArrowRight size={19} /></a>
        </div>
      </section>
  )
}

export default Hero
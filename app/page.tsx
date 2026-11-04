import Image from 'next/image';
import { ArrowRight, CalendarDays, CarFront, Check, CheckCircle2, ClipboardCheck, Clock3, FileCheck2, MapPin, ShieldCheck, UsersRound, Wallet, Phone, Mail } from 'lucide-react';
import Header from '@/components/Header';
import { site } from './site-config';

const features = [
  { icon: Clock3, title: 'Jednostavno', desc: 'Sve informacije na jednom mestu' },
  { icon: UsersRound, title: 'Ljubazan pristup', desc: 'Tu smo za vaša pitanja' },
  { icon: ShieldCheck, title: 'Tehnički pregled', desc: 'Kontrola vozila na licu mesta' },
  { icon: CarFront, title: 'Praktična lokacija', desc: 'Pristup vozilom' },
];

const services = [
  { icon: CarFront, title: 'Tehnički pregled', desc: 'Pregled vozila u našoj kontrolnoj stanici', image: '/images/inspection.webp' },
  { icon: ClipboardCheck, title: 'Registracija vozila', desc: 'Informacije i pomoć oko registracije', image: '/images/registration.webp' },
  { icon: ShieldCheck, title: 'Osiguranje', desc: 'Informišite se o opcijama osiguranja', image: '/images/exterior-side.webp' },
  { icon: Wallet, title: 'Plaćanje računa', desc: 'PaySpot kao dodatna usluga', image: '/images/reception.webp' },
];

export default function Home() {
  return <>
    <Header />
    <main>
      <section className="hero" id="pocetna" aria-labelledby="hero-title">
        <Image src="/images/hero-garage.webp" alt="Stvarna fotografija objekta za tehnički pregled u Beogradu" fill sizes="100vw" priority className="hero-img" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <span className="eyebrow hero-eyebrow">GARAŽA BEOGRAD</span>
          <h1 id="hero-title">Tehnički pregled<br />vozila u Beogradu</h1>
          <p className="hero-tagline">Brzo, jasno i na jednom mestu.</p>
          <ul className="hero-list">
            {['Tehnički pregled', 'Registracija vozila', 'Osiguranje', 'Plaćanje računa – PaySpot'].map(text => <li key={text}><CheckCircle2 size={20} /> {text}</li>)}
          </ul>
          <a className="button button-primary button-large" href={site.bookingUrl || '#kontakt'}><CalendarDays size={20} /> Zakažite termin <ArrowRight size={19} /></a>
        </div>
      </section>

      <section className="features" aria-label="Prednosti">
        <div className="container features-grid">{features.map(({icon: Icon, title, desc}) => <div className="feature" key={title}><Icon size={35} strokeWidth={1.9} /><div><strong>{title}</strong><span>{desc}</span></div></div>)}</div>
      </section>

      <section className="section services-section" id="usluge">
        <div className="container"><div className="section-head"><span className="eyebrow">SVE NA JEDNOM MESTU</span><h2>Naše usluge</h2><span className="title-rule" /></div>
          <div className="services-grid">{services.map(({icon: Icon, title, desc, image}) => <a className="service-card" href="#kontakt" key={title}><div className="service-picture"><Image src={image} alt={title} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 25vw" /></div><div className="service-icon"><Icon size={29} /></div><div className="service-body"><h3>{title}</h3><p>{desc}</p><ArrowRight className="service-arrow" size={21} /></div></a>)}</div>
        </div>
      </section>

      <section className="inspection-section section" id="pregled"><div className="container inspection-grid">
        <div className="inspection-photo"><Image src="/images/inspection.webp" alt="Prava fotografija vozila u hali za tehnički pregled" fill sizes="(max-width: 850px) 100vw, 50vw" /></div>
        <div className="inspection-copy"><span className="eyebrow">POUZDANA USLUGA</span><h2>Vaše vozilo.<br />Naša pažnja.</h2><p>U našoj stanici možete obaviti tehnički pregled i informisati se o uslugama registracije i osiguranja vozila.</p>
          <ul className="check-list"><li><Check size={20} /> Tehnički pregled na lokaciji</li><li><Check size={20} /> Informacije na jednom mestu</li><li><Check size={20} /> Jednostavan kontakt sa našim timom</li></ul>
          <a href="#kontakt" className="text-link">Kontaktirajte nas <ArrowRight size={19} /></a></div>
      </div></section>

      <section className="section about-section" id="o-nama"><div className="container about-grid">
        <div className="about-copy"><span className="eyebrow">UPOZNAJTE NAS</span><h2>O nama</h2><p>Garaža Beograd je stanica za tehnički pregled vozila. Želimo da sve potrebne informacije i usluge budu lako dostupne našim klijentima.</p><p>Pogledajte naš prostor i kontaktirajte nas ako imate pitanja pre dolaska.</p><a href="#kontakt" className="button button-outline">Saznajte više <ArrowRight size={18} /></a></div>
        <div className="about-photo"><Image src="/images/reception.webp" alt="Prijemni prostor Garaže Beograd" fill sizes="(max-width: 850px) 100vw, 50vw" /></div>
      </div></section>

      <section className="section gallery-section" id="galerija"><div className="container"><div className="section-head"><span className="eyebrow">NAŠ PROSTOR</span><h2>Zavirite u garažu</h2><span className="title-rule" /></div><div className="gallery-grid"><div className="gallery-main"><Image src="/images/garage-hall.webp" alt="Unutrašnjost hale za tehnički pregled" fill sizes="(max-width: 800px) 100vw, 60vw" /></div><div><Image src="/images/exterior-side.webp" alt="Pogled na ulaz u stanicu" fill sizes="(max-width: 800px) 100vw, 40vw" /></div><div><Image src="/images/waiting.webp" alt="Prostor za čekanje" fill sizes="(max-width: 800px) 100vw, 40vw" /></div></div></div></section>

      <section className="section contact-section" id="kontakt"><div className="container contact-grid"><div><span className="eyebrow">TU SMO ZA VAS</span><h2>Kontakt i dolazak</h2><p>Imate pitanje o tehničkom pregledu ili registraciji? Javite nam se pre dolaska.</p>
        <div className="contact-lines">{site.address ? <a href={site.mapsUrl || '#kontakt'}><MapPin /> {site.address}</a> : <span><MapPin /> Adresa: uneti tačnu adresu</span>}{site.phone ? <a href={`tel:${site.phone.replace(/\s/g, '')}`}><Phone /> {site.phone}</a> : <span><Phone /> Telefon: uneti broj</span>}{site.email ? <a href={`mailto:${site.email}`}><Mail /> {site.email}</a> : <span><Mail /> E-mail: uneti adresu</span>}</div>
        <p className="edit-note">Kontaktne podatke i link za zakazivanje unesite u <code>app/site-config.ts</code>.</p>
      </div><div className="hours-card" id="radno-vreme"><div className="hours-head"><Clock3 size={29} /><h3>Radno vreme</h3></div>{site.hours.map(item => <div className="hours-row" key={item.day}><span>{item.day}</span><strong>{item.time}</strong></div>)}<p className="hours-note">* Proveriti radno vreme pre objavljivanja sajta.</p><Image src="/images/mascot.webp" alt="Vesela maskota garaže" width={185} height={185} className="hours-mascot" /></div></div></section>
    </main>
    <footer className="footer"><div className="container footer-main"><div><div className="footer-brand">GARAŽA <b>BEOGRAD</b></div><span>TEHNIČKI PREGLED</span><p>Usluge za vaše vozilo na jednom mestu.</p></div><div><strong>Brzi linkovi</strong><a href="#pocetna">Početna</a><a href="#usluge">Usluge</a><a href="#o-nama">O nama</a><a href="#kontakt">Kontakt</a></div><div><strong>Radno vreme</strong>{site.hours.map(h => <span key={h.day}>{h.day}: {h.time}</span>)}</div><div className="footer-message"><FileCheck2 size={30}/><b>Spremni za pregled?</b><p>Kontaktirajte nas za informacije.</p><a href="#kontakt" className="button button-light">Kontakt <ArrowRight size={17}/></a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Garaža Beograd. Sva prava zadržana.</span><span>Koncept sajta · podaci za proveru pre objavljivanja</span></div></footer>
  </>;
}

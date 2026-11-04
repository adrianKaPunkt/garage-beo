import { site } from "@/app/site-config";
import { ArrowRight, FileCheck2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div>
          <div className="footer-brand">
            GARAGE <b>BEOGRAD</b>
          </div>
          <span>TEHNIČKI PREGLED</span>
          <p>Usluge za vaše vozilo na jednom mestu.</p>
        </div>
        <div>
          <strong>Brzi linkovi</strong>
          <a href="#pocetna">Početna</a>
          <a href="#usluge">Usluge</a>
          <a href="#o-nama">O nama</a>
          <a href="#kontakt">Kontakt</a>
        </div>
        <div>
          <strong>Radno vreme</strong>
          {site.hours.map((h) => (
            <span key={h.day}>
              {h.day}: {h.time}
            </span>
          ))}
        </div>
        <div className="footer-message">
          <FileCheck2 size={30} />
          <b>Spremni za pregled?</b>
          <p>Kontaktirajte nas za informacije.</p>
          <a href="#kontakt" className="button button-light">
            Kontakt <ArrowRight size={17} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Garage Beograd. Sva prava zadržana.
        </span>
        <span>Koncept sajta · podaci za proveru pre objavljivanja</span>
      </div>
    </footer>
  );
};

export default Footer;

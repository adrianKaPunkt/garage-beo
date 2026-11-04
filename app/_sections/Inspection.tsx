import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

const Inspection = () => {
  return (
    <section className="inspection-section section" id="pregled">
      <div className="container inspection-grid">
        <div className="inspection-photo">
          <Image
            src="/images/inspection.webp"
            alt="Prava fotografija vozila u hali za tehnički pregled"
            fill
            sizes="(max-width: 850px) 100vw, 50vw"
          />
        </div>
        <div className="inspection-copy">
          <span className="eyebrow">POUZDANA USLUGA</span>
          <h2>
            Vaše vozilo.
            <br />
            Naša pažnja.
          </h2>
          <p>
            U našoj stanici možete obaviti tehnički pregled i informisati se o
            uslugama registracije i osiguranja vozila.
          </p>
          <ul className="check-list">
            <li>
              <Check size={20} /> Tehnički pregled na lokaciji
            </li>
            <li>
              <Check size={20} /> Informacije na jednom mestu
            </li>
            <li>
              <Check size={20} /> Jednostavan kontakt sa našim timom
            </li>
          </ul>
          <a href="#kontakt" className="text-link">
            Kontaktirajte nas <ArrowRight size={19} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Inspection;

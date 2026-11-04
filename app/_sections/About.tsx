import Image from "next/image";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <section className="section about-section" id="o-nama">
      <div className="container about-grid">
        <div className="about-copy">
          <span className="eyebrow">UPOZNAJTE NAS</span>
          <h2>O nama</h2>
          <p>
            Garaža Beograd je stanica za tehnički pregled vozila. Želimo da sve
            potrebne informacije i usluge budu lako dostupne našim klijentima.
          </p>
          <p>
            Pogledajte naš prostor i kontaktirajte nas ako imate pitanja pre
            dolaska.
          </p>
          <a href="#kontakt" className="button button-outline">
            Saznajte više <ArrowRight size={18} />
          </a>
        </div>
        <div className="about-photo">
          <Image
            src="/images/reception.webp"
            alt="Prijemni prostor Garaže Beograd"
            fill
            sizes="(max-width: 850px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default About;

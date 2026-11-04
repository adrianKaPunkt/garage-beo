import Image from "next/image";
import {
  ArrowRight,
  CarFront,
  ClipboardCheck,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const services = [
  {
    icon: CarFront,
    title: "Tehnički pregled",
    desc: "Pregled vozila u našoj kontrolnoj stanici",
    image: "/images/inspection.webp",
  },
  {
    icon: ClipboardCheck,
    title: "Registracija vozila",
    desc: "Informacije i pomoć oko registracije",
    image: "/images/registration.webp",
  },
  {
    icon: ShieldCheck,
    title: "Osiguranje",
    desc: "Informišite se o opcijama osiguranja",
    image: "/images/exterior-side.webp",
  },
  {
    icon: Wallet,
    title: "Plaćanje računa",
    desc: "PaySpot kao dodatna usluga",
    image: "/images/reception.webp",
  },
];

const Services = () => {
  return (
    <section className="section services-section" id="usluge">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">SVE NA JEDNOM MESTU</span>
          <h2>Naše usluge</h2>
          <span className="title-rule" />
        </div>
        <div className="services-grid">
          {services.map(({ icon: Icon, title, desc, image }) => (
            <a className="service-card" href="#kontakt" key={title}>
              <div className="service-picture">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 25vw"
                />
              </div>
              <div className="service-icon">
                <Icon size={29} />
              </div>
              <div className="service-body">
                <h3>{title}</h3>
                <p>{desc}</p>
                <ArrowRight className="service-arrow" size={21} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

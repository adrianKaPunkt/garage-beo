import Image from "next/image";
import {
  ArrowRight,
  CarFront,
  ClipboardCheck,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import Tehnicki from "./Tehnicki";
import TechnickiBackground from "./TechnickiBackground";
import Registration from "./Registration";

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
    <section className="bg-[#f7f9f8]">
      <TechnickiBackground>
        <div className="container">
          <div className="mt-10 mb-7.5 text-center min-[701px]:mb-9.75">
            <p className="text-green mb-4">SVE NA JEDNOM MESTU</p>
            <h2 className="mb-7 text-[clamp(50px,3vw,55px)] leading-14">
              <span className="text-lime-300">NAŠE </span>
              <span className="text-white">USLUGE</span>
            </h2>
            <span className="mx-auto block h-1 w-16.5 rounded-xs bg-green" />
          </div>
          <div className="mx-auto max-w-110 text-center text-lg">
            <p>
              Sve što je potrebno vašem vozilu, na jednom mestu. Brzo,
              jednostavno i bez nepotrebnih komplikacija.
            </p>
          </div>
        </div>
        <Tehnicki />
      </TechnickiBackground>
      <Registration />
      <div className="container py-15.5 min-[701px]:py-21">
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

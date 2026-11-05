import Image from "next/image";
import { ArrowRight, CalendarDays, CheckCircle2 } from "lucide-react";
import { site } from "../site-config";
import AnimatedCar from "@/components/AnimatedCar/AnimatedCar";

const Hero = () => {
  return (
    <section
      className="relative hero"
      id="pocetna"
      aria-labelledby="hero-title"
    >
      <Image
        src="/images/hero-garage.webp"
        alt="Stvarna fotografija objekta za tehnički pregled u Beogradu"
        fill
        sizes="100vw"
        priority
        className="hero-img"
      />
      <div className="hero-shade" />
      <div className="container hero-content">
        <h1 id="hero-title">Tehnički pregled</h1>
        <p className="hero-tagline">Brzo, jasno i na jednom mestu.</p>
        <ul className="hero-list">
          {[
            "Tehnički pregled",
            "Registracija vozila",
            "Osiguranje",
            "Plaćanje računa – PaySpot",
          ].map((text) => (
            <li key={text}>
              <CheckCircle2 size={20} /> {text}
            </li>
          ))}
        </ul>
        <a
          className="button button-primary button-large"
          href={site.bookingUrl || "#kontakt"}
        >
          <CalendarDays size={20} /> Zakažite termin <ArrowRight size={19} />
        </a>
      </div>
      <div className="absolute bottom-6 right-[8%] hidden w-60 h-60 lg:block">
        <AnimatedCar animated={true} sizes="700px" />
      </div>
    </section>
  );
};

export default Hero;

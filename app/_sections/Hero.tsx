import { ArrowRight, CalendarDays } from "lucide-react";
import { site } from "../site-config";
import AnimatedCar from "@/components/AnimatedCar/AnimatedCar";

const Hero = () => {
  return (
    <section
      className="relative overflow-hidden hero"
      id="pocetna"
      aria-labelledby="hero-title"
    >
      <div className="container hero-content">
        <div className="min-w-0">
          <h1 className="font-extrabold text-6xl leading-0">
            TEHNIČKI PREGLED
          </h1>
          <p className="text-darkgreen text-4xl mb-16">
            <span className="hero-words" aria-hidden="true">
              <span>
                <span>BRZO </span>
                <span className="text-orange">BRE</span>
              </span>
              <span>
                <span>JASNO </span>
                <span className="text-orange">BRE</span>
              </span>
              <span>
                <span>NA JEDNOM MESTU </span>
                <span className="text-orange">BRE</span>
              </span>
            </span>
          </p>
          <a
            className="button button-primary button-large"
            href={site.bookingUrl || "#kontakt"}
          >
            <CalendarDays size={20} /> Zakažite termin <ArrowRight size={19} />
          </a>
        </div>
        <div className="hero-car">
          <AnimatedCar
            animated={true}
            sizes="(max-width: 700px) 280px, (max-width: 1000px) 40vw, 460px"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

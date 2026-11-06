import CarEntrance from "@/components/AnimatedCar/CarEntrance";
import AnimatedCar from "@/components/AnimatedCar/AnimatedCar";
import HeroHeader from "./HeroHeader";
import HeroSubtitle from "./HeroSubtitle";
import Button from "@/components/Button";

const Hero = () => {
  return (
    <section
      id="pocetna"
      className="
        relative isolate overflow-hidden
        bg-[linear-gradient(120deg,#f5faef_0%,#dff0d0_55%,#bfe39d_100%)]
      "
      aria-labelledby="hero-title"
    >
      {/* Technisches Raster – nur auf dem Desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15 lg:opacity-30
          bg-[linear-gradient(to_right,rgba(34,84,61,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,84,61,0.18)_1px,transparent_1px)]
          bg-size-[40px_40px]
        "
      />

      {/* Dezenter Lichtakzent hinter dem Auto */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-20 top-1/2
          hidden h-[460px] w-[460px]
          -translate-y-1/2 rounded-full
          bg-white/35 blur-3xl
          lg:block
        "
      />

      {/* Bestehender Hero-Inhalt */}
      <div
        className="
          container relative z-10
          grid grid-cols-1
          lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]
          items-center
          gap-18
          lg:gap-[clamp(24px,4vw,64px)]
          min-h-0
          lg:min-h-133
          pt-13 pb-8
          lg:py-16
        "
      >
        <div className="min-w-0">
          <HeroHeader />
          <HeroSubtitle />

          <div className="flex justify-center lg:justify-start">
            <Button href="#kontakt" variant="primary" size="large" showArrow>
              Zakažite termin
            </Button>
          </div>
        </div>

        <div className="w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[460px] justify-self-center">
          <CarEntrance>
            <AnimatedCar
              animated={true}
              sizes="(max-width: 700px) 280px, (max-width: 1000px) 40vw, 460px"
            />
          </CarEntrance>
        </div>
      </div>
    </section>
  );
};

export default Hero;

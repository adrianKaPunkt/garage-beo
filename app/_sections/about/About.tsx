import Intro from "./Intro";
import AboutMascot from "./AboutMascot";
import Location from "./Location";
import Chill from "./Chill";
import Us from "./Us";
import { useTranslations } from "next-intl";

// Farbfläche mit Zickzack-Oberkante (mobil 4, ab sm 6, ab lg 8 Zacken).
// Wird über den Hintergrund des jeweiligen Bereichs gelegt; Farbe kommt per bg-* dazu.
const zigzagLayer = `
  pointer-events-none absolute inset-x-0 top-0 -bottom-px
  [clip-path:polygon(0_30px,12.5%_70px,25%_30px,37.5%_70px,50%_30px,62.5%_70px,75%_30px,87.5%_70px,100%_30px,100%_100%,0_100%)]
  sm:[clip-path:polygon(0_36px,8.333%_86px,16.667%_36px,25%_86px,33.333%_36px,41.667%_86px,50%_36px,58.333%_86px,66.667%_36px,75%_86px,83.333%_36px,91.667%_86px,100%_36px,100%_100%,0_100%)]
  lg:[clip-path:polygon(0_40px,6.25%_110px,12.5%_40px,18.75%_110px,25%_40px,31.25%_110px,37.5%_40px,43.75%_110px,50%_40px,56.25%_110px,62.5%_40px,68.75%_110px,75%_40px,81.25%_110px,87.5%_40px,93.75%_110px,100%_40px,100%_100%,0_100%)]
`;

const About = () => {
  const t = useTranslations("about");

  return (
    <section
      id="o-nama"
      aria-labelledby="about-title"
      className="scroll-mt-24 overflow-hidden bg-white pt-15.5 min-[701px]:pt-21"
    >
      <div className="container">
        {/* Überschrift wie in den Services, mit viel Weißraum */}
        <div className="mx-auto mb-14 max-w-4xl text-center lg:mb-24">
          <p className="mb-4 font-medium uppercase tracking-wide text-green">
            {t("eyebrow")}
          </p>
          <h2
            id="about-title"
            className="mb-7 text-[clamp(36px,3vw,55px)] leading-[1.12] font-bold"
          >
            <span className="text-green">{t("titleFirst")}</span>
            <span className="text-orange">{t("titleSecond")}</span>
          </h2>
          <span className="mx-auto block h-1 w-16.5 rounded-xs bg-green" />
        </div>
      </div>

      <div className="relative">
        {/* Erste Hintergrundfläche unterhalb eines V, dessen Spitze unter dem Maskottchen liegt */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-x-0 top-0 -bottom-px
            bg-[#f3f8ee]
            [clip-path:polygon(0_128px,42%_215px,50%_225px,58%_206px,100%_64px,100%_100%,0_100%)]
            sm:[clip-path:polygon(0_157px,43%_275px,50%_286px,57%_268px,100%_65px,100%_100%,0_100%)]
            lg:[clip-path:polygon(0_184px,44%_387px,50%_406px,56%_371px,100%_51px,100%_100%,0_100%)]
          "
        />

        <div className="container relative">
          <div className="flex justify-center">
            <AboutMascot />
          </div>

          {/* 01 – Einleitung: Wer wir sind */}
          <Intro />
        </div>
      </div>

      {/* Zweite Hintergrundfläche: Zickzack-Kante zwischen Intro und Location */}
      <div className="relative bg-[#f3f8ee] pt-16 sm:pt-20 lg:pt-24">
        <div aria-hidden="true" className={`${zigzagLayer} bg-[#e7f2dd]`} />
        <div className="container relative">
          <Location />
        </div>
      </div>

      {/* Dritte Hintergrundfläche: Zickzack-Kante zwischen Location und Chill */}
      <div className="relative bg-[#e7f2dd] pt-16 sm:pt-20 lg:pt-24">
        <div aria-hidden="true" className={`${zigzagLayer} bg-[#d7ebe0]`} />
        <div className="container relative">
          <Chill />
        </div>
      </div>

      {/* Vierte Hintergrundfläche: Zickzack-Kante zwischen Chill und Us */}
      <div className="relative bg-[#d7ebe0] pt-16 pb-15.5 sm:pt-20 min-[701px]:pb-21 lg:pt-24">
        <div aria-hidden="true" className={`${zigzagLayer} bg-[#cde5e0]`} />
        <div className="container relative">
          <Us />
        </div>
      </div>
    </section>
  );
};

export default About;

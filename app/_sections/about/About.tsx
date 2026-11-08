import Image from "next/image";
import VideoPreview from "@/components/VideoPreview";
import Intro from "./Intro";
import AboutMascot from "./AboutMascot";
import Location from "./Location";

const About = () => {
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
            O NAMA
          </p>
          <h2
            id="about-title"
            className="mb-7 text-[clamp(36px,3vw,55px)] leading-[1.12] font-bold"
          >
            <span className="text-green">VIŠE OD </span>
            <span className="text-[#26332f]">TEHNIČKOG PREGLEDA</span>
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
            [clip-path:polygon(0_110px,42%_186px,50%_194px,58%_178px,100%_55px,100%_100%,0_100%)]
            sm:[clip-path:polygon(0_170px,43%_300px,50%_312px,57%_292px,100%_70px,100%_100%,0_100%)]
            lg:[clip-path:polygon(0_200px,44%_420px,50%_440px,56%_402px,100%_55px,100%_100%,0_100%)]
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

      <div className="relative bg-[#f3f8ee] pt-16 pb-15.5 sm:pt-20 min-[701px]:pb-21 lg:pt-24">
        {/* Zweite Hintergrundfläche: gespiegeltes, etwas flacheres V zwischen Intro und Location */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-x-0 top-0 -bottom-px
            bg-[#e7f2dd]
            [clip-path:polygon(0_38px,42%_124px,50%_135px,58%_129px,100%_77px,100%_100%,0_100%)]
            sm:[clip-path:polygon(0_40px,43%_160px,50%_172px,57%_165px,100%_94px,100%_100%,0_100%)]
            lg:[clip-path:polygon(0_30px,44%_221px,50%_242px,56%_231px,100%_110px,100%_100%,0_100%)]
          "
        />

        <div className="container relative">
          {/* 02 – Empfang: Persönlicher Service */}
          <Location />

          {/* 03 – Garten und Gastfreundschaft */}
          <div className="mb-16 grid grid-cols-1 items-center gap-10 lg:mb-24 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-green">
                PRIJATNA ATMOSFERA
              </p>
              <h3 className="mb-6 text-3xl font-bold leading-tight text-[#26332f] sm:text-4xl">
                Dok čekate, osećajte se kao kod kuće.
              </h3>
              <p className="mb-5 text-base leading-relaxed text-[#5b646b]">
                Dok se vaše vozilo pregleda, možete predahnuti u našem prijatnom
                prostoru ili uživati u hladovini vinove loze.
              </p>
              <p className="text-base leading-relaxed text-[#5b646b]">
                Verujemo da dobar odnos prema klijentima počinje već pri samom
                dolasku. Zato nam je važno da vaše iskustvo bude što prijatnije.
              </p>
            </div>

            <figure className="lg:col-span-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/10]">
                <Image
                  src="/images/outside01.jpeg"
                  alt="Kutak za odmor u bašti Garage Beograd, sa drvenim klupama u hladovini vinove loze"
                  fill
                  sizes="(max-width: 1023px) 100vw, 65vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-slate-500">
                Mali kutak za predah i opuštanje.
              </figcaption>
            </figure>
          </div>

          {/* 04 – Video und Wartebereich: Dreispaltiges Editorial-Finale */}
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-green">
                UPOZNAJTE NAS
              </p>
              <h3 className="mb-6 text-2xl font-bold leading-tight text-[#26332f] sm:text-3xl">
                Pogledajte našu priču.
              </h3>
              <VideoPreview
                src="/videos/reception.mp4"
                poster="/images/video-thumbnail.webp"
                title="Dobro došli u Garage Beograd"
                className="w-full"
              />
            </div>

            <div className="lg:col-span-3 lg:pt-16">
              <p className="mb-5 text-base leading-relaxed text-[#5b646b]">
                Tehnički pregled, registracija vozila i korisne informacije na
                jednom mestu — uz pristup koji je stručan, ali i neposredan.
              </p>
              <p className="text-base leading-relaxed text-[#5b646b]">
                Svratite, upoznajte naš tim i uverite se da poseta tehničkom
                pregledu može biti jednostavno i prijatno iskustvo.
              </p>
            </div>

            <figure className="lg:col-span-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src="/images/inside02.jpeg"
                  alt="Udoban prostor za čekanje u Garage Beograd sa sofom i biljkama"
                  fill
                  sizes="(max-width: 1023px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-slate-500">
                Prostor u kojem se naši gosti mogu opustiti.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

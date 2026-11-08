import Image from "next/image";

const Intro = () => {
  return (
    <div className="mt-0 lg:mt-18 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="lg:col-span-1">
        <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-green">
          STRUČNOST KOJA ULVLA POVERENJE
        </p>
        <h3 className="mb-6 text-3xl font-bold leading-tight text-[#26332f] sm:text-5xl">
          DOBRO DOŠLI
        </h3>
        <p className="mb-5 text-base leading-relaxed text-[#5b646b]">
          U Garage Beograd verujemo da briga o vašem vozilu ne treba da bude
          komplikovana. Već 30 godina našim klijentima pružamo profesionalnu
          uslugu, pouzdane informacije i podršku u svakom koraku.
        </p>
        <p className="text-base leading-relaxed text-[#5b646b]">
          Od tehničkog pregleda i registracije vozila, preko osiguranja, do
          jednostavnog plaćanja računa — naša želja je da vam svakodnevne
          obaveze učinimo lakšim, bržim i prijatnijim.
        </p>
        <p className="text-base leading-relaxed text-[#5b646b]">
          Naš posao nije samo pregled vozila i obrada dokumentacije. Važno nam
          je da razumete svaki korak, dobijete jasne odgovore i znate da se uvek
          možete osloniti na nas.
        </p>
        <p className="text-base leading-relaxed text-[#5b646b]">
          Zato spajamo iskustvo, profesionalan pristup i domaćinsku atmosferu.
          Jer za nas je svaki klijent mnogo više od još jednog vozila u redu.
        </p>
      </div>

      <div className="flex justify-center lg:col-span-1">
        <Image
          src="/images/chassis.png"
          alt="Tehnički crtež ogibljenja, kočnice i točka vozila"
          width={515}
          height={440}
          sizes="(max-width: 640px) 80vw, 515px"
          className="h-auto w-4/5 max-w-136 sm:w-full"
        />
      </div>
    </div>
  );
};

export default Intro;

import Image from "next/image";

const Location = () => {
  return (
    <div className="mb-16 grid grid-cols-1 items-center gap-10 lg:mb-24 lg:grid-cols-12 lg:gap-14">
      <figure className="lg:col-span-7">
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl sm:aspect-16/10+">
          <Image
            src="/images/inside01.jpeg"
            alt="Prijemni prostor Garage Beograd sa pultom za registraciju vozila"
            fill
            sizes="(max-width: 1023px) 100vw, 60vw"
            className="object-cover"
          />
        </div>
        <figcaption className="mt-3 text-sm text-slate-500">
          Naš prijemni prostor.
        </figcaption>
      </figure>

      <div className="lg:col-span-5 lg:pl-4">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-green">
          LIČNI PRISTUP
        </p>
        <h3 className="mb-6 text-3xl font-bold leading-tight text-[#26332f] sm:text-4xl">
          Kod nas ste uvek dobrodošli.
        </h3>
        <p className="mb-5 text-base leading-relaxed text-[#5b646b]">
          Od prvog pozdrava do završetka pregleda, trudimo se da se svaki gost
          oseća prijatno i opušteno.
        </p>
        <p className="text-base leading-relaxed text-[#5b646b]">
          Jasne informacije, pažljiv pristup i spremnost da odgovorimo na vaša
          pitanja deo su naše svakodnevne usluge.
        </p>
      </div>
    </div>
  );
};

export default Location;

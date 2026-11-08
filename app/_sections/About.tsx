import Image from "next/image";
import VideoPreview from "@/components/VideoPreview";

const About = () => {
  return (
    <section className="section" id="o-nama">
      <div className="container">
        {/* Gleicher Überschriften-Aufbau wie in Services.tsx */}
        <div className="mx-auto mb-10 max-w-4xl text-center min-[701px]:mb-14">
          <p className="text-green mb-4 font-medium tracking-wide uppercase">
            30 godina sa vama
          </p>
          <h2 className="mb-7 text-[clamp(36px,3vw,55px)] leading-[1.12] font-bold">
            <span className="text-green">VIŠE OD </span>
            <span className="text-[#26332f]">TEHNIČKOG PREGLEDA</span>
          </h2>
          <span className="bg-green mx-auto block h-1 w-16.5 rounded-xs" />
        </div>

        <div className="grid grid-cols-1 items-center gap-10 min-[701px]:grid-cols-[1fr_1.06fr] min-[701px]:gap-[4%] min-[1001px]:gap-[8%]">
          <div className="max-w-135">
            <p className="mb-5 text-base leading-relaxed text-[#5b646b]">
              U Garage Beograd verujemo da tehnički pregled nije samo obaveza.
              To je prilika da vas dočekamo srdačno, saslušamo i pomognemo vam
              da kroz svaki korak prođete sa više sigurnosti i manje brige.
            </p>
            <p className="text-base leading-relaxed text-[#5b646b]">
              Već 30 godina spajamo profesionalan pristup i iskustvo sa
              prijatnom, domaćinskom atmosferom. Kod nas su stručnost, jasno
              objašnjenje i ljudski odnos podjednako važni — jer želimo da se
              svaki gost oseća dobrodošlo.
            </p>
            <VideoPreview
              src="/videos/reception.mp4"
              poster="/images/reception-poster.webp"
              title="Dobro došli u Garage Beograd"
              className="mt-8 ml-0"
            />
          </div>

          <div className="relative aspect-[1.7/1] w-full overflow-hidden rounded-[18px] bg-white shadow-[0_15px_36px_#1f29271c] min-[701px]:aspect-[1.55/1]">
            <Image
              src="/images/garage-beograd-about.png"
              alt="Zgrada Garage Beograd — tehnički pregled vozila"
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              className="object-contain"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

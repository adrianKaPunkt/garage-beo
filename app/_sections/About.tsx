import Image from "next/image";
import VideoPreview from "@/components/VideoPreview";

const About = () => {
  return (
    <section className="section" id="o-nama">
      <div className="container grid grid-cols-1 items-center gap-8.5 min-[701px]:grid-cols-[1fr_1.06fr] min-[701px]:gap-[4%] min-[1001px]:gap-[8%]">
        <div className="max-w-135">
          <span className="eyebrow">UPOZNAJTE NAS</span>
          <h2 className="text-[clamp(31px,3.2vw,46px)] leading-[1.2]">
            O nama
          </h2>
          <p className="text-base text-[#5b646b]">
            Garaža Beograd je stanica za tehnički pregled vozila. Želimo da sve
            potrebne informacije i usluge budu lako dostupne našim klijentima.
          </p>
          <p className="text-base text-[#5b646b]">
            Pogledajte naš prostor i kontaktirajte nas ako imate pitanja pre
            dolaska.
          </p>
          <VideoPreview
            src="/videos/reception.mp4"
            poster="/images/reception-poster.webp"
            title="Pogledajte naš prostor"
            className="mt-8 ml-0"
          />
        </div>
        <div className="relative min-h-68.75 overflow-hidden rounded-[18px] shadow-[0_15px_36px_#1f29271c] min-[701px]:min-h-86.25">
          <Image
            src="/images/reception.webp"
            alt="Prijemni prostor Garaže Beograd"
            fill
            sizes="(max-width: 850px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;

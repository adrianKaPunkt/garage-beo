import ImageGallery from "@/components/ImageGallery";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Alt-Texte in tehnicki.images im Dictionary (dieselben Fotos wie in Tehnicki.tsx)
const images = [
  { src: "/images/tehnicki01.jpeg", key: "station" },
  { src: "/images/tehnicki02.jpeg", key: "vehicle" },
] as const;

const Intro = () => {
  // Texte in about.intro im Dictionary
  const t = useTranslations("about.intro");
  const tImages = useTranslations("tehnicki.images");

  return (
    <div>
      <div className="mt-10 lg:mt-18 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="lg:col-span-1">
          <p data-reveal="left" className="mb-1 text-sm font-semibold uppercase tracking-widest text-green">
            {t("eyebrow")}
          </p>
          <h3 data-reveal="left" data-reveal-pulse className="mb-6 origin-left text-3xl font-bold leading-tight text-[#26332f] sm:text-5xl">
            {t("title")}
          </h3>
          <p data-reveal="left" className="mb-5 text-base leading-relaxed text-[#5b646b]">
            {t("text1")}
          </p>

          {/* Mobile/Tablet: Zeichnung zwischen dem ersten und zweiten Absatz */}
          <div data-reveal className="my-5 flex justify-center lg:hidden">
            <Image
              src="/images/about/intro.png"
              alt={t("drawingAlt")}
              width={515}
              height={440}
              sizes="(max-width: 640px) 80vw, 515px"
              className="h-auto w-4/5 max-w-136 sm:w-full"
            />
          </div>

          <p data-reveal="left" className="text-base leading-relaxed text-[#5b646b]">
            {t("text2")}
          </p>
          <p data-reveal="left" className="text-base leading-relaxed text-[#5b646b]">
            {t("text3")}
          </p>
          <p data-reveal="left" className="text-base leading-relaxed text-[#5b646b]">
            {t("text4")}
          </p>
        </div>

        {/* Desktop: Zeichnung in der rechten Spalte */}
        <div data-reveal className="hidden justify-center lg:col-span-1 lg:flex">
          <Image
            src="/images/about/intro.png"
            alt={t("drawingAlt")}
            width={515}
            height={440}
            sizes="(max-width: 640px) 80vw, 515px"
            className="h-auto w-4/5 max-w-136 sm:w-full"
          />
        </div>
      </div>
      <div data-reveal className="flex justify-center lg:mt-20">
        <ImageGallery
          images={images.map(({ src, key }) => ({
            src,
            alt: tImages(key),
          }))}
          size="xl"
          gap="lg"
        />
      </div>
    </div>
  );
};

export default Intro;

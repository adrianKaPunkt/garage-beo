import ImageGallery from "@/components/ImageGallery";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Alt-Texte in about.images im Dictionary
const images = [
  { src: "/images/outside01.jpeg", key: "bench" },
  { src: "/images/outside02.jpeg", key: "table" },
] as const;

const Chill = () => {
  // Texte in about.chill im Dictionary
  const t = useTranslations("about");

  return (
    <div className="pt-8 lg:pt-24">
      <div className="mt-10 lg:mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="lg:col-span-1">
          <p data-reveal="left" className="mb-1 text-sm font-semibold uppercase tracking-widest text-green">
            {t("chill.eyebrow")}
          </p>
          <h3 data-reveal="left" data-reveal-pulse className="mb-6 origin-left text-3xl font-bold leading-tight text-[#26332f] sm:text-5xl">
            {t("chill.title")}
          </h3>
          <p data-reveal="left" className="mb-5 text-base leading-relaxed text-[#5b646b]">
            {t("chill.text1")}
          </p>

          {/* Mobile/Tablet: Zeichnung zwischen dem ersten und zweiten Absatz */}
          <div data-reveal className="my-5 flex justify-center lg:hidden">
            <Image
              src="/images/about/chill.png"
              alt={t("chill.drawingAlt")}
              width={478}
              height={358}
              sizes="(max-width: 640px) 80vw, 478px"
              className="h-auto w-4/5 max-w-119.5 sm:w-full"
            />
          </div>

          <p data-reveal="left" className="text-base leading-relaxed text-[#5b646b]">
            {t("chill.text2")}
          </p>
          <p data-reveal="left" className="text-base leading-relaxed text-[#5b646b]">
            {t("chill.text3")}
          </p>
          <p data-reveal="left" className="text-base leading-relaxed text-[#5b646b]">
            {t("chill.text4")}
          </p>
        </div>

        {/* Desktop: Zeichnung in der rechten Spalte */}
        <div data-reveal className="hidden justify-center lg:col-span-1 lg:flex">
          <Image
            src="/images/about/chill.png"
            alt={t("chill.drawingAlt")}
            width={478}
            height={358}
            sizes="(max-width: 640px) 80vw, 478px"
            className="h-auto w-4/5 max-w-119.5 sm:w-full"
          />
        </div>
      </div>
      <div data-reveal className="flex justify-center lg:mt-20">
        <ImageGallery
          images={images.map(({ src, key }) => ({
            src,
            alt: t(`images.${key}`),
          }))}
          size="xl"
          gap="lg"
        />
      </div>
    </div>
  );
};

export default Chill;

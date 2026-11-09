import ImageGallery from "@/components/ImageGallery";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Alt-Texte in about.images im Dictionary
const images = [
  { src: "/images/inside01.jpeg", key: "counter" },
  { src: "/images/inside02.jpeg", key: "chill" },
] as const;

const paragraph = "text-base leading-relaxed text-[#5b646b]";

const Location = () => {
  // Texte in about.location im Dictionary
  const t = useTranslations("about");

  // Zeichnung – je nach Ansicht an einer anderen Stelle eingebunden
  const drawing = (
    <Image
      src="/images/about/location.png"
      alt={t("location.drawingAlt")}
      width={507}
      height={338}
      sizes="(max-width: 640px) 85vw, 507px"
      className="h-auto w-[85%] max-w-127 sm:w-full"
    />
  );

  return (
    <div className="pt-16 lg:pt-40">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Desktop: Zeichnung in der linken Spalte */}
        <div className="hidden justify-center lg:flex">{drawing}</div>

        {/* Text */}
        <div className="space-y-5 lg:pl-4">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-green">
              {t("location.eyebrow")}
            </p>
            <h3 className="mb-6 text-3xl font-bold leading-tight text-[#26332f] sm:text-5xl">
              {t("location.title")}
            </h3>
          </div>
          <p className={paragraph}>{t("location.text1")}</p>

          {/* Mobile/Tablet: Zeichnung zwischen dem ersten und zweiten Absatz */}
          <div className="flex justify-center py-3 lg:hidden">{drawing}</div>

          <p className={paragraph}>{t("location.text2")}</p>
          <p className={paragraph}>{t("location.text3")}</p>
        </div>
      </div>

      {/* Fotos vom Empfang und Wartebereich */}
      <div className="mt-10 flex justify-center lg:mt-16">
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

export default Location;

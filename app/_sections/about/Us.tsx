import VideoPreview from "@/components/VideoPreview";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Us = () => {
  // Texte in about.video im Dictionary
  const t = useTranslations("about.video");

  return (
    <div className="mt-16 lg:mt-24">
      {/* Überschrift – gleicher Stil wie in Intro, Location und Chill, aber zentriert */}
      <div className="mx-auto mb-8 max-w-3xl text-center lg:mb-12">
        <p className="mb-1 text-sm font-bold uppercase tracking-widest text-green">
          {t("eyebrow")}
        </p>
        <h3 className="text-3xl font-bold leading-tight text-[#26332f] sm:text-5xl">
          {t("title")}
        </h3>
      </div>

      {/* Zeichnung links, Video rechts (mobil untereinander) */}
      <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-3 lg:gap-10">
        <div className="flex justify-center lg:justify-start"></div>

        <div className="lg:col-span-1">
          <VideoPreview
            src="/videos/reception.mp4"
            poster="/images/video-thumbnail.webp"
            title={t("videoTitle")}
            className="w-full"
          />
        </div>

        <div className="flex justify-center lg:justify-end"></div>
      </div>
    </div>
  );
};

export default Us;

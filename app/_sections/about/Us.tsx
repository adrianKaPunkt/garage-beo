import VideoPreview from "@/components/VideoPreview";
import { useTranslations } from "next-intl";

const Us = () => {
  // Texte in about.video im Dictionary
  const t = useTranslations("about.video");

  return (
    <div className="mt-16 lg:mt-40">
      {/* Überschrift – gleicher Stil wie in Intro, Location und Chill, aber zentriert */}
      <div className="mx-auto mb-8 max-w-3xl text-center lg:mb-12">
        <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-green">
          {t("eyebrow")}
        </p>
        <h3 className="text-3xl font-bold leading-tight text-[#26332f] sm:text-5xl">
          {t("title")}
        </h3>
      </div>

      {/* Video zentriert und breit, aber nicht über die ganze Containerbreite */}
      <div className="mx-auto max-w-4xl">
        <VideoPreview
          src="/videos/reception.mp4"
          poster="/images/video-thumbnail.webp"
          title={t("videoTitle")}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Us;

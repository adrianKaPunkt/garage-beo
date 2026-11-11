import type { ReactNode } from "react";
import VideoPreview from "@/components/VideoPreview";
import { useTranslations } from "next-intl";
import localFont from "next/font/local";
import { Instagram } from "lucide-react";
import { site } from "@/lib/site-config";
import { TikTok } from "@/components/socialLinks";

// Handschriftliche Schrift nur für die Sätze neben dem Video
const playpen = localFont({
  src: "../../../public/fonts/PlaypenSans.ttf",
  display: "swap",
});

const iconClass =
  "text-[#26332f] transition duration-300 group-hover:scale-110 group-hover:text-green motion-reduce:transition-none";

const ctaClass = (tilt: "left" | "right") =>
  `${playpen.className} m-0 max-w-72 text-center text-2xl text-balance text-[#26332f] sm:text-3xl ${
    tilt === "left" ? "-rotate-6" : "rotate-6"
  }`;

/** Link aufs Profil; ohne URL nur Anzeige, damit niemand auf einer toten Seite landet */
function SocialLink({
  label,
  url,
  className = "",
  children,
}: {
  label: string;
  url: string;
  className?: string;
  children: ReactNode;
}) {
  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} – Garage Beograd`}
      className={`group ${className}`}
    >
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  );
}

const Us = () => {
  // Texte in about.video im Dictionary
  const t = useTranslations("about.video");

  const instagramIcon = (
    <Instagram
      size={74}
      strokeWidth={1.5}
      aria-hidden="true"
      className={iconClass}
    />
  );
  const tiktokIcon = (
    <TikTok size={62} aria-hidden="true" className={iconClass} />
  );

  return (
    <div className="mt-16 lg:mt-24">
      {/* Überschrift – gleicher Stil wie in Intro, Location und Chill, aber zentriert */}
      <div className="mx-auto mb-8 max-w-3xl text-center lg:mb-12">
        <p className="mb-1 text-sm font-bold uppercase tracking-widest text-green">
          {t("eyebrow")}
        </p>
        <h3 className="text-3xl font-bold leading-tight text-orange sm:text-5xl">
          {t("title")}
        </h3>
      </div>

      {/* Desktop: Instagram links, Video in der Mitte, TikTok rechts.
          Mobil: Video, darunter einmal der Schriftzug und beide Logos nebeneinander. */}
      <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-3 lg:gap-10">
        <div className="hidden justify-center self-center lg:flex">
          <SocialLink
            label="Instagram"
            url={site.social.instagram}
            className="flex flex-col items-center gap-4"
          >
            <p className={ctaClass("left")}>{t("instagramCta")}</p>
            {instagramIcon}
          </SocialLink>
        </div>

        <div className="lg:col-span-1">
          <VideoPreview
            src="/videos/reception.mp4"
            poster="/images/video-thumbnail.webp"
            title={t("videoTitle")}
            className="w-full"
          />
        </div>

        <div className="hidden justify-center self-center lg:flex">
          <SocialLink
            label="TikTok"
            url={site.social.tiktok}
            className="flex flex-col items-center gap-4"
          >
            <p className={ctaClass("right")}>{t("tiktokCta")}</p>
            {tiktokIcon}
          </SocialLink>
        </div>

        {/* Nur mobil */}
        <div className="flex flex-col items-center pt-7 gap-5 lg:hidden">
          <p className={ctaClass("left")}>{t("instagramCta")}</p>
          <div className="flex items-center gap-10">
            <SocialLink label="Instagram" url={site.social.instagram}>
              {instagramIcon}
            </SocialLink>
            <SocialLink label="TikTok" url={site.social.tiktok}>
              {tiktokIcon}
            </SocialLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Us;

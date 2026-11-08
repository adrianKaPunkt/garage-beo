import Image from "next/image";
import { ClipboardCheck, ShieldCheck, Wrench } from "lucide-react";
import Button from "@/components/Button";
import ImageGallery from "@/components/ImageGallery";
import { useTranslations } from "next-intl";

// Alt-Texte in tehnicki.images im Dictionary
const tehnickiImages = [
  { src: "/images/tehnicki01.jpeg", key: "station" },
  { src: "/images/tehnicki02.jpeg", key: "vehicle" },
  { src: "/images/tehnicki03.jpeg", key: "inspection" },
  { src: "/images/tehnicki04.jpeg", key: "front" },
  { src: "/images/tehnicki05.jpeg", key: "equipment" },
] as const;

// Texte in tehnicki.points im Dictionary
const inspectionPoints = [
  { icon: ClipboardCheck, key: "control" },
  { icon: ShieldCheck, key: "safety" },
  { icon: Wrench, key: "equipment" },
] as const;

export default function Tehnicki() {
  const t = useTranslations("tehnicki");
  const tCommon = useTranslations("common");

  return (
    <section
      id="tehnicki-pregled"
      aria-labelledby="tehnicki-title"
      className="scroll-mt-24"
    >
      {/* Inhalt */}
      <div
        className="
          container relative z-10
         
        "
      >
        <div
          className="grid grid-cols-1
          gap-8
          lg:grid-cols-2
          lg:gap-x-16 lg:gap-y-6"
        >
          {/* Überschrift */}
          <div
            className="
            mx-auto mt-24 flex max-w-162
            flex-col items-center gap-5
            text-center
            lg:col-start-1 lg:row-start-1
            lg:mx-0 lg:flex-row lg:self-end
            lg:text-left
          "
          >
            <div className="w-20 h-20 shrink-0 bg-lime-300 rounded-full relative flex items-center justify-center">
              <span className="absolute text-4xl font-bold text-[#14283a]">
                1
              </span>
            </div>
            <h2
              id="tehnicki-title"
              className="
              mb-0
              text-4xl font-extrabold
              leading-10
              lg:leading-12
              tracking-tight
              sm:text-5xl
              lg:text-[clamp(40px,4vw,60px)]
            "
            >
              <span className="text-lime-300">{t("titleFirst")}</span>
              <span className="block text-orange">{t("titleSecond")}</span>
            </h2>
          </div>

          {/* Maskottchen: mobil unter der Überschrift, ab lg rechts über beide Zeilen */}
          <div
            className="
            relative flex w-full
            items-center justify-center lg:mt-24
            lg:col-start-2 lg:row-span-2 lg:row-start-1
            lg:self-center
          "
          >
            {/* Licht hinter dem Maskottchen */}
            <div
              aria-hidden="true"
              className="
              pointer-events-none absolute
              inset-10 rounded-full
              bg-white/10 blur-3xl
            "
            />

            {/* Dezenter äußerer Ring */}
            <div
              aria-hidden="true"
              className="
              pointer-events-none absolute
              h-[85%] w-[85%]
              rounded-full
              border border-white/10
            "
            />

            <div
              className="
              relative aspect-square w-full
              max-w-110
              transition-transform duration-500
              hover:-translate-y-2
            "
            >
              <Image
                src="/images/car/tehnicki.webp"
                alt={tCommon("mascotAlt")}
                fill
                sizes="(max-width: 1024px) 85vw, 440px"
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <div
              className="
            mx-auto max-w-162 lg:mt-6
            lg:col-start-1 lg:row-start-2
            lg:mx-0 lg:self-start text-left
          "
            >
              <p
                className="
              mx-auto mb-9 max-w-140
              text-base leading-relaxed
              lg:mx-0 px-4 lg:px-0
              text-slate-200
              sm:text-lg
            "
              >
                {t("description")}
              </p>

              {/* Leistungen */}
              <div className="mx-auto mb-10 w-fit space-y-4 lg:mx-0">
                {inspectionPoints.map((point) => {
                  const Icon = point.icon;

                  return (
                    <div key={point.key} className="flex items-center gap-4">
                      <div
                        className="
                      flex h-11 w-11 shrink-0
                      items-center justify-center
                      rounded-xl
                      border border-lime-300/20
                      bg-lime-300/10
                    "
                      >
                        <Icon
                          size={20}
                          className="text-lime-300"
                          aria-hidden="true"
                        />
                      </div>

                      <span className="font-semibold text-slate-100">
                        {t(`points.${point.key}`)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="container relative z-10 mt-12 lg:mt-15">
            <ImageGallery
              images={tehnickiImages.map(({ src, key }) => ({
                src,
                alt: t(`images.${key}`),
              }))}
              shape="circle"
              size="lg"
              align="center"
              mobileScroll
              lightbox
            />
          </div>
        </div>

        {/* Kontakt-Button */}
        <div className="mt-10 flex justify-center">
          <Button href="#termin" variant="primary" size="large" showArrow>
            {tCommon("actions.bookAppointment")}
          </Button>
        </div>
      </div>
    </section>
  );
}

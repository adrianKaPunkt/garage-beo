import Image from "next/image";
import { Star } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { reviews, type Review, type ReviewTranslationLocale } from "./reviews";
import ReviewCarousel from "./ReviewCarousel";

// Ab so vielen Bewertungen läuft das Karussell, vorher stehen die Karten ruhig
const MIN_REVIEWS_FOR_CAROUSEL = 3;

// So viele Karten braucht eine Gruppe, um auch breite Bildschirme zu füllen
const MIN_CARDS_PER_GROUP = 6;

const cardStyles =
  "flex w-[280px] shrink-0 flex-col gap-4 rounded-[20px] border border-[#1b4a37]/10 bg-white p-6 shadow-[0_8px_24px_rgb(27_74_55_/_4%)] sm:w-[320px] lg:w-[360px]";

function ReviewCard({
  review,
  hidden = false,
}: {
  review: Review;
  hidden?: boolean;
}) {
  const t = useTranslations("testimonials");
  const format = useFormatter();
  const locale = useLocale();

  // Name bleibt überall im Original. Der Text auch in beiden serbischen
  // Fassungen: Ohne Häkchen geschriebene Texte ("kuce" statt "kuće") würden
  // beim Transliterieren falsch ("куце"). In en/de/ru: Übersetzung, falls vorhanden.
  const { name } = review;
  const translation =
    review.translations?.[locale as ReviewTranslationLocale] ?? null;
  const text = translation ?? review.text;

  // Serbische Doppelbuchstaben bleiben zusammen: "Lj", "Nj", "Dž"
  const initial = /^(Lj|Nj|Dž)/.exec(name)?.[0] ?? name.charAt(0);

  // z.B. "avgust 2026." bzw. "August 2026"
  const date = format.dateTime(new Date(`${review.date}-15T12:00:00Z`), {
    month: "long",
    year: "numeric",
  });

  return (
    <figure className={`m-0 ${cardStyles}`} aria-hidden={hidden || undefined}>
      <div className="flex items-center gap-3">
        {review.photo ? (
          <Image
            src={review.photo}
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          // Initiale, solange kein Profilbild hinterlegt ist
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green/10 text-lg font-bold text-darkgreen"
          >
            {initial}
          </span>
        )}
        <div className="flex flex-col">
          <figcaption className="font-bold text-gray-900">{name}</figcaption>
          <span className="text-xs text-gray-500">{t("source")}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <div
          role="img"
          aria-label={t("rating", { rating: review.rating })}
          className="flex gap-0.5 text-orange"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={18}
              aria-hidden="true"
              fill={index < review.rating ? "currentColor" : "none"}
            />
          ))}
        </div>
        <time dateTime={review.date} className="text-sm text-gray-500">
          {date}
        </time>
      </div>

      <blockquote
        lang={translation ? locale : "sr-Latn"}
        className="m-0 whitespace-pre-line text-[15px] leading-relaxed text-gray-700">
        „{text}“
      </blockquote>

      {/* Hinweis: übersetzt bzw. Original auf Serbisch (in sr leer) */}
      {t(translation ? "translated" : "original") && (
        <span className="mt-auto text-xs text-gray-400">
          {t(translation ? "translated" : "original")}
        </span>
      )}
    </figure>
  );
}

export default function Testimonials() {
  const t = useTranslations("testimonials");

  if (reviews.length === 0) return null;

  const carousel = reviews.length >= MIN_REVIEWS_FOR_CAROUSEL;

  // Eine Gruppe muss breiter als der Bildschirm sein, sonst entsteht im
  // Laufband eine Lücke. Bei wenigen Bewertungen wird die Liste wiederholt.
  const repeats = Math.ceil(MIN_CARDS_PER_GROUP / reviews.length);
  const group = Array.from({ length: repeats }, () => reviews).flat();

  return (
    <section
      aria-label={t("label")}
      // Oben extra Platz für die untere Hälfte des Google-Badges (page.tsx)
      className="bg-[#f7f9f8] pt-32 pb-10 sm:pt-38 sm:pb-14 lg:pt-46 lg:pb-20"
    >
      {carousel ? (
        <ReviewCarousel label={t("label")}>
          {/* Zweite Gruppe nur für die nahtlose Endlosschleife */}
          {[false, true].map((duplicate) => (
            <div className="flex shrink-0 gap-6 pr-6" key={String(duplicate)}>
              {group.map((review, index) => (
                <ReviewCard
                  key={`${review.name}-${index}`}
                  review={review}
                  // Screenreader lesen jede Bewertung nur einmal
                  hidden={duplicate || index >= reviews.length}
                />
              ))}
            </div>
          ))}
        </ReviewCarousel>
      ) : (
        <div className="container flex flex-wrap justify-center gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}

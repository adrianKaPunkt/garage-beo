import { getLocale } from "next-intl/server";
import { site } from "@/lib/site-config";
import type { Locale } from "@/i18n/routing";
import GoogleRatingBadge from "./GoogleRatingBadge";
import { getGoogleRating } from "@/lib/google/rating";

/**
 * Google-Badge mittig auf der Kante zwischen Payment und Testimonials.
 * Bewertung und Anzahl kommen live von Google, Klick öffnet das Profil.
 */
export default async function GoogleRatingLink() {
  const { rating, reviewCount } = await getGoogleRating();
  const locale = (await getLocale()) as Locale;

  return (
    <div className="relative z-10 h-0">
      <a
        href={site.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-0 left-1/2 block w-44 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-105 focus-visible:scale-105 sm:w-52 lg:w-60"
      >
        <GoogleRatingBadge
          rating={rating}
          reviewCount={reviewCount}
          language={locale}
          logoSrc="/logos/google.svg"
          className="block h-auto w-full"
        />
      </a>
    </div>
  );
}

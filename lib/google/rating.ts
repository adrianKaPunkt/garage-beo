import { site } from "@/app/site-config";
import { getPlaceDetails } from "@/app/google-place";

export interface GoogleRating {
  rating: number;
  reviewCount: number;
}

/**
 * Durchschnitt und Anzahl der Google-Bewertungen aus dem Unternehmensprofil.
 * Ohne Schlüssel oder bei Fehlern gelten die Werte aus site-config.
 */
export async function getGoogleRating(): Promise<GoogleRating> {
  const fallback = site.googleRating;
  const data = await getPlaceDetails();

  if (typeof data?.rating !== "number") return fallback;

  return {
    rating: data.rating,
    reviewCount: data.userRatingCount ?? fallback.reviewCount,
  };
}

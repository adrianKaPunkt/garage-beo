import { site } from "@/app/site-config";

export interface GoogleRating {
  rating: number;
  reviewCount: number;
}

/**
 * Lädt Durchschnitt und Anzahl der Google-Bewertungen über die Places API (New).
 *
 * - Braucht GOOGLE_PLACES_API_KEY und GOOGLE_PLACE_ID in .env.local
 * - Wird höchstens einmal pro Tag neu abgefragt (Next.js-Cache)
 * - Ohne Schlüssel oder bei Fehlern gelten die Werte aus site-config
 */
export async function getGoogleRating(): Promise<GoogleRating> {
  const fallback = site.googleRating;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return fallback;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          // Nur diese zwei Felder abfragen
          "X-Goog-FieldMask": "rating,userRatingCount",
        },
        next: { revalidate: 60 * 60 * 24 },
      },
    );

    if (!response.ok) {
      console.error(
        `Google Places: ${response.status} ${await response.text()}`,
      );
      return fallback;
    }

    const data: { rating?: number; userRatingCount?: number } =
      await response.json();

    if (typeof data.rating !== "number") return fallback;

    return {
      rating: data.rating,
      reviewCount: data.userRatingCount ?? fallback.reviewCount,
    };
  } catch (error) {
    console.error("Google Places nicht erreichbar:", error);
    return fallback;
  }
}

// Gemeinsame Abfrage des Google-Unternehmensprofils (Places API "New").
// Bewertung und Öffnungszeiten kommen aus derselben Anfrage: gleiche URL und
// gleiche Header teilen sich den Next.js-Cache, also höchstens ein Aufruf pro Tag.
// Alle Felder gehören zur SKU "Place Details Enterprise", kosten also nicht extra.

export interface PlaceTime {
  // 0 = Sonntag ... 6 = Samstag
  day: number;
  hour: number;
  minute: number;
  // Nur bei currentOpeningHours: konkretes Datum
  date?: { year: number; month: number; day: number };
}

export interface PlacePeriod {
  open: PlaceTime;
  // Fehlt bei durchgehend geöffnet
  close?: PlaceTime;
}

export interface PlaceDetails {
  rating?: number;
  userRatingCount?: number;
  regularOpeningHours?: { periods?: PlacePeriod[] };
  currentOpeningHours?: {
    periods?: PlacePeriod[];
    specialDays?: { date: { year: number; month: number; day: number } }[];
  };
}

/**
 * Braucht GOOGLE_PLACES_API_KEY und GOOGLE_PLACE_ID in .env.local.
 * Gibt null zurück ohne Schlüssel oder bei Fehlern, dann gelten die
 * Werte aus site-config.
 */
export async function getPlaceDetails(): Promise<PlaceDetails | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return null;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "rating,userRatingCount,regularOpeningHours,currentOpeningHours",
        },
        next: { revalidate: 60 * 60 * 24 },
      },
    );

    if (!response.ok) {
      console.error(
        `Google Places: ${response.status} ${await response.text()}`,
      );
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Google Places nicht erreichbar:", error);
    return null;
  }
}

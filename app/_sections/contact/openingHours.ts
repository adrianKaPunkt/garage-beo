import { site } from "@/app/site-config";
import { getPlaceDetails, type PlacePeriod } from "@/app/google-place";

// Zeitraum in Minuten ab Mitternacht, closes = 1440 bedeutet 24:00
export interface Period {
  opens: number;
  closes: number;
}

export interface OpeningHours {
  // Reguläre Woche, Index 0 = Sonntag ... 6 = Samstag; leer = geschlossen
  week: Period[][];
  // Abweichungen für konkrete Tage aus Google, Schlüssel "JJJJ-MM-TT".
  // Tage ohne Eintrag folgen der regulären Woche.
  dates: Record<string, { periods: Period[]; special: boolean }>;
}

const toMinutes = (hour: number, minute: number) => hour * 60 + minute;

const dateKey = ({ year, month, day }: { year: number; month: number; day: number }) =>
  `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

// Ein Google-Zeitraum als Minuten des Öffnungstages. Über Mitternacht
// laufende Zeiten enden für die Anzeige um 24:00.
function toPeriod({ open, close }: PlacePeriod): Period {
  const opens = toMinutes(open.hour, open.minute);
  const closes =
    close && close.day === open.day ? toMinutes(close.hour, close.minute) : 1440;

  return { opens, closes };
}

// Feste Zeiten aus site-config, z. B. "08:00 – 16:00"
function fallbackWeek(): Period[][] {
  return Array.from({ length: 7 }, (_, day) => {
    const time = site.hours.find((entry) => entry.days.includes(day))?.time;
    const match = time?.match(/(\d{2}):(\d{2}) – (\d{2}):(\d{2})/);

    if (!match) return [];

    const [, oh, om, ch, cm] = match.map(Number);

    return [{ opens: toMinutes(oh, om), closes: toMinutes(ch, cm) }];
  });
}

/**
 * Öffnungszeiten aus dem Google-Unternehmensprofil, damit Google Maps die
 * einzige Quelle ist. Ohne Schlüssel oder bei Fehlern gelten die Zeiten aus
 * site-config, die auch der Footer zeigt.
 */
export async function getOpeningHours(): Promise<OpeningHours> {
  const data = await getPlaceDetails();
  const regular = data?.regularOpeningHours?.periods;
  const current = data?.currentOpeningHours;

  let week = fallbackWeek();

  if (regular?.length) {
    // Ein Zeitraum ohne Ende heißt: rund um die Uhr geöffnet
    const alwaysOpen = regular.length === 1 && !regular[0].close;

    week = Array.from({ length: 7 }, (_, day) =>
      alwaysOpen
        ? [{ opens: 0, closes: 1440 }]
        : regular
            .filter((period) => period.open.day === day)
            .map(toPeriod)
            .sort((a, b) => a.opens - b.opens),
    );
  }

  const dates: OpeningHours["dates"] = {};
  const specialKeys = new Set(
    current?.specialDays?.map(({ date }) => dateKey(date)),
  );

  // Sondertage zuerst leer anlegen: Hat ein Sondertag keinen Zeitraum,
  // ist an dem Tag geschlossen (z. B. Feiertag)
  for (const key of specialKeys) dates[key] = { periods: [], special: true };

  for (const period of current?.periods ?? []) {
    if (!period.open.date) continue;

    const key = dateKey(period.open.date);

    dates[key] ??= { periods: [], special: specialKeys.has(key) };
    dates[key].periods.push(toPeriod(period));
    dates[key].periods.sort((a, b) => a.opens - b.opens);
  }

  return { week, dates };
}

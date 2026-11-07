import { DAY_KEYS } from "@/app/site-config";

type DayName = (key: (typeof DAY_KEYS)[number]) => string;

// "Ponedeljak – Petak" bzw. "Subota" in der aktuellen Sprache
export function dayRangeLabel(days: number[], dayName: DayName) {
  const first = dayName(DAY_KEYS[days[0]]);

  if (days.length === 1) return first;

  return `${first} – ${dayName(DAY_KEYS[days[days.length - 1]])}`;
}

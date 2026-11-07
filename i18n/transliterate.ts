// Serbische Latinica → Ćirilica. Die Zuordnung ist eindeutig, nur die
// Doppelbuchstaben lj, nj und dž müssen zuerst geprüft werden.

const DIGRAPHS: Record<string, string> = {
  LJ: "Љ", Lj: "Љ", lj: "љ",
  NJ: "Њ", Nj: "Њ", nj: "њ",
  DŽ: "Џ", Dž: "Џ", dž: "џ",
};

const LETTERS: Record<string, string> = {
  A: "А", B: "Б", C: "Ц", Č: "Ч", Ć: "Ћ", D: "Д", Đ: "Ђ", E: "Е", F: "Ф",
  G: "Г", H: "Х", I: "И", J: "Ј", K: "К", L: "Л", M: "М", N: "Н", O: "О",
  P: "П", R: "Р", S: "С", Š: "Ш", T: "Т", U: "У", V: "В", Z: "З", Ž: "Ж",
  a: "а", b: "б", c: "ц", č: "ч", ć: "ћ", d: "д", đ: "ђ", e: "е", f: "ф",
  g: "г", h: "х", i: "и", j: "ј", k: "к", l: "л", m: "м", n: "н", o: "о",
  p: "п", r: "р", s: "с", š: "ш", t: "т", u: "у", v: "в", z: "з", ž: "ж",
};

// Bleiben in lateinischer Schrift: Marken und Eigennamen.
// Neue Begriffe einfach hier ergänzen.
const KEEP_LATIN = [
  "Garage Beograd",
  "GARAGE BEOGRAD",
  "Garage",
  "GARAGE",
  "PaySpot",
  "Google Maps",
  "Google Fonts",
  "Google",
  "OpenStreetMap",
  "Resend",
  "ODbL",
];

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Unverändert bleiben:
// - Platzhalter und Tags von next-intl: {name}, <link>, </link>
// - Web- und E-Mail-Adressen
// - Begriffe aus KEEP_LATIN
const PROTECTED = new RegExp(
  [
    String.raw`\{[^{}]*\}`,
    String.raw`<\/?[a-zA-Z]+>`,
    String.raw`\S+@\S+`,
    String.raw`(?:https?:\/\/|www\.)\S+`,
    ...KEEP_LATIN.map((term) => String.raw`\b${escape(term)}\b`),
  ].join("|"),
  "g",
);

function convert(text: string) {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const pair = text.slice(i, i + 2);

    if (DIGRAPHS[pair]) {
      result += DIGRAPHS[pair];
      i++;
    } else {
      result += LETTERS[text[i]] ?? text[i];
    }
  }

  return result;
}

export function transliterate(text: string) {
  let result = "";
  let last = 0;

  for (const match of text.matchAll(PROTECTED)) {
    result += convert(text.slice(last, match.index)) + match[0];
    last = match.index + match[0].length;
  }

  return result + convert(text.slice(last));
}

// Wendet die Transliteration auf alle Texte eines Dictionaries an
export function transliterateMessages<T>(messages: T): T {
  if (typeof messages === "string") return transliterate(messages) as T;

  if (Array.isArray(messages)) {
    return messages.map(transliterateMessages) as T;
  }

  if (messages && typeof messages === "object") {
    return Object.fromEntries(
      Object.entries(messages).map(([key, value]) => [
        key,
        transliterateMessages(value),
      ]),
    ) as T;
  }

  return messages;
}

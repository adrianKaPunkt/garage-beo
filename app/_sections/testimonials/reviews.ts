// Kundenbewertungen von Google. Text immer wörtlich im Original (Latinica)
// übernehmen: Er wird weder übersetzt noch transliteriert.
// Neue Bewertung: einfach einen Eintrag ergänzen.
export type Review = {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  // Monat der Bewertung im Format JJJJ-MM, wird pro Sprache formatiert
  date: string;
  text: string;
  // Optional: Profilbild unter /public/images/reviews/, z.B. "/images/reviews/tihana.webp".
  // Nur mit Zustimmung der Person verwenden. Ohne Bild erscheint die Initiale.
  photo?: string;
};

export const reviews: Review[] = [
  {
    name: "Tihana S.",
    rating: 5,
    // Google zeigte am 7.11.2026 "vor 3 Monaten"
    date: "2026-08",
    text: "Prijatno i vrlo gostoljubivo osoblje, usluga vise nego profesionalna. Zaista sam zahvalna na svemu, pogotovu efikaskosti i ljubaznosti. Sve preporuke!",
  },
  {
    // Auf Google mit vollem Nachnamen, hier wie bei Tihana abgekürzt
    name: "Ljubomir M.",
    rating: 5,
    // Google zeigte am 7.11.2026 "vor 3 Monaten"
    date: "2026-08",
    text: "Prijatni kulturni i profesionalni! Topla preporuka svima koji treba da registruju automobil. Svaka im čast!!!",
  },
  {
    name: "Andreja P.",
    rating: 5,
    // Google zeigte am 7.11.2026 "vor einem Jahr"
    date: "2025-11",
    // \n = Zeilenumbruch wie im Original
    text: "Definitivno najprijatniji i najzanimljiviji tehnicki pregled hahah. Ljudi su ljubazni, gostoprimljivi i prijatni, osecao sam se kao kod kuce. Posao zavrsen u najkracem mogucem roku, jako profesionalno. Sve pohvale i preporuke.\nAko imate srece probacete i njivovo domace voce i rakiju 😂 sve pohvale i preporuke",
  },
  {
    name: "Nebojsa M.",
    rating: 5,
    // Google zeigte am 7.11.2026 "vor 7 Monaten"
    date: "2026-04",
    text: "Tehniči pregled za svaku pohvalu. Vrhunski profesionalci a pre svega divni ljudi. Hvala od srca Zorice i Peđa.",
  },
  {
    name: "Zorana F.",
    rating: 5,
    // Google zeigte am 7.11.2026 "vor einem Jahr"
    date: "2025-11",
    text: "Dragi neki,veseli ljudi,lepa atmosfera,pozitivna energija...Ismeji smo se do suza,hvala na tome!P.s.Mozete dobiti i posluzenje u vidu neprskanog grozdja i potpuno domace breskve🤣 🍇 ...",
  },
  {
    name: "Tamara I.",
    rating: 5,
    // Google zeigte am 7.11.2026 "vor 7 Monaten"
    date: "2026-04",
    text: "Najbolji registracioni centar bez konkurencije! definitivno 5 zvezdica! ⭐⭐⭐⭐⭐",
  },
  {
    name: "Marija M.",
    rating: 5,
    // Google zeigte am 7.11.2026 "vor 2 Jahren"
    date: "2024-11",
    // \n = Zeilenumbruch wie im Original
    text: "Sve je uvek brzo i efikasno.\nOdete na tehnicki i osecate se kao kod kuce.\nPrelepo,svaka cast.",
  },
];

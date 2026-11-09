// Kundenbewertungen von Google. Text immer wörtlich im Original (Latinica)
// übernehmen: Er wird weder automatisch übersetzt noch transliteriert.
// In en/de/ru erscheint die Übersetzung aus `translations` (mit Hinweis
// „aus dem Serbischen übersetzt“), fehlt sie, das Original.
// Neue Bewertung: einfach einen Eintrag ergänzen.
export type ReviewTranslationLocale = "en" | "de" | "ru";

export type Review = {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  // Monat der Bewertung im Format JJJJ-MM, wird pro Sprache formatiert
  date: string;
  text: string;
  // Sinngemäße Übersetzungen des Originals; \n wie im Original übernehmen
  translations?: Partial<Record<ReviewTranslationLocale, string>>;
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
    translations: {
      en: "Pleasant and very hospitable staff, the service more than professional. I'm truly grateful for everything, especially the efficiency and kindness. Highly recommended!",
      de: "Angenehmes und sehr gastfreundliches Personal, der Service mehr als professionell. Ich bin wirklich dankbar für alles, besonders für die Effizienz und Freundlichkeit. Absolute Empfehlung!",
      ru: "Приятный и очень гостеприимный персонал, обслуживание более чем профессиональное. Я искренне благодарна за всё, особенно за оперативность и доброжелательность. Всем рекомендую!",
    },
  },
  {
    // Auf Google mit vollem Nachnamen, hier wie bei Tihana abgekürzt
    name: "Ljubomir M.",
    rating: 5,
    // Google zeigte am 7.11.2026 "vor 3 Monaten"
    date: "2026-08",
    text: "Prijatni kulturni i profesionalni! Topla preporuka svima koji treba da registruju automobil. Svaka im čast!!!",
    translations: {
      en: "Pleasant, courteous and professional! Warmly recommended to anyone who needs to register a car. Hats off to them!!!",
      de: "Angenehm, höflich und professionell! Eine warme Empfehlung an alle, die ihr Auto anmelden müssen. Hut ab!!!",
      ru: "Приятные, вежливые и профессиональные! Горячо рекомендую всем, кому нужно зарегистрировать автомобиль. Снимаю шляпу!!!",
    },
  },
  {
    name: "Andreja P.",
    rating: 5,
    // Google zeigte am 7.11.2026 "vor einem Jahr"
    date: "2025-11",
    // \n = Zeilenumbruch wie im Original
    text: "Definitivno najprijatniji i najzanimljiviji tehnicki pregled hahah. Ljudi su ljubazni, gostoprimljivi i prijatni, osecao sam se kao kod kuce. Posao zavrsen u najkracem mogucem roku, jako profesionalno. Sve pohvale i preporuke.\nAko imate srece probacete i njivovo domace voce i rakiju 😂 sve pohvale i preporuke",
    translations: {
      en: "Definitely the most pleasant and most interesting vehicle inspection hahah. The people are kind, hospitable and pleasant, I felt right at home. The job was done in the shortest possible time, very professionally. All praise and recommendations.\nIf you're lucky, you'll get to try their homegrown fruit and rakija 😂 all praise and recommendations",
      de: "Definitiv die angenehmste und interessanteste technische Prüfung hahah. Die Leute sind freundlich, gastfreundlich und angenehm, ich habe mich wie zu Hause gefühlt. Alles in kürzester Zeit erledigt, sehr professionell. Großes Lob und klare Empfehlung.\nWenn ihr Glück habt, probiert ihr auch ihr selbst angebautes Obst und ihren Rakija 😂 großes Lob und klare Empfehlung",
      ru: "Однозначно самый приятный и интересный техосмотр хаха. Люди добрые, гостеприимные и приятные, я чувствовал себя как дома. Всё сделали в кратчайшие сроки, очень профессионально. Всяческих похвал и рекомендаций.\nЕсли повезёт, попробуете их домашние фрукты и ракию 😂 всяческих похвал и рекомендаций",
    },
  },
  {
    name: "Nebojsa M.",
    rating: 5,
    // Google zeigte am 7.11.2026 "vor 7 Monaten"
    date: "2026-04",
    text: "Tehniči pregled za svaku pohvalu. Vrhunski profesionalci a pre svega divni ljudi. Hvala od srca Zorice i Peđa.",
    translations: {
      en: "A vehicle inspection worthy of every praise. Top professionals and, above all, wonderful people. Heartfelt thanks to Zorica and Peđa.",
      de: "Eine technische Prüfung, die jedes Lob verdient. Absolute Profis und vor allem wunderbare Menschen. Herzlichen Dank an Zorica und Peđa.",
      ru: "Техосмотр, достойный всяческих похвал. Настоящие профессионалы, а прежде всего — замечательные люди. От всего сердца спасибо Зорице и Педже.",
    },
  },
  {
    name: "Zorana F.",
    rating: 5,
    // Google zeigte am 7.11.2026 "vor einem Jahr"
    date: "2025-11",
    text: "Dragi neki,veseli ljudi,lepa atmosfera,pozitivna energija...Ismeji smo se do suza,hvala na tome!P.s.Mozete dobiti i posluzenje u vidu neprskanog grozdja i potpuno domace breskve🤣 🍇 ...",
    translations: {
      en: "Lovely, cheerful people, a nice atmosphere, positive energy... We laughed until we cried, thank you for that! P.S. You might even be treated to unsprayed grapes and completely homegrown peaches🤣 🍇 ...",
      de: "Liebe, fröhliche Menschen, schöne Atmosphäre, positive Energie... Wir haben Tränen gelacht, danke dafür! P.S. Man bekommt sogar ungespritzte Trauben und ganz selbst angebaute Pfirsiche angeboten🤣 🍇 ...",
      ru: "Милые, весёлые люди, приятная атмосфера, позитивная энергия... Мы смеялись до слёз, спасибо за это! P.S. Вас могут даже угостить необработанным виноградом и совсем домашними персиками🤣 🍇 ...",
    },
  },
  {
    name: "Tamara I.",
    rating: 5,
    // Google zeigte am 7.11.2026 "vor 7 Monaten"
    date: "2026-04",
    text: "Najbolji registracioni centar bez konkurencije! definitivno 5 zvezdica! ⭐⭐⭐⭐⭐",
    translations: {
      en: "The best registration centre, no competition! Definitely 5 stars! ⭐⭐⭐⭐⭐",
      de: "Das beste Zulassungszentrum, konkurrenzlos! Definitiv 5 Sterne! ⭐⭐⭐⭐⭐",
      ru: "Лучший центр регистрации, вне конкуренции! Однозначно 5 звёзд! ⭐⭐⭐⭐⭐",
    },
  },
  {
    name: "Marija M.",
    rating: 5,
    // Google zeigte am 7.11.2026 "vor 2 Jahren"
    date: "2024-11",
    // \n = Zeilenumbruch wie im Original
    text: "Sve je uvek brzo i efikasno.\nOdete na tehnicki i osecate se kao kod kuce.\nPrelepo,svaka cast.",
    translations: {
      en: "Everything is always quick and efficient.\nYou come for your inspection and feel right at home.\nWonderful, hats off.",
      de: "Alles geht immer schnell und effizient.\nMan kommt zur technischen Prüfung und fühlt sich wie zu Hause.\nWunderschön, Hut ab.",
      ru: "Всё всегда быстро и чётко.\nПриезжаешь на техосмотр и чувствуешь себя как дома.\nПрекрасно, снимаю шляпу.",
    },
  },
];

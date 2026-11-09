"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Clock3, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { DAY_KEYS, WEEK_ORDER, site } from "@/app/site-config";
import ContactForm from "./ContactForm";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Aktuelle Zeit in Belgrad, unabhängig von der Zeitzone des Besuchers
function getBelgradeTime() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Belgrade",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    day: WEEKDAYS.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

// Ab so vielen Minuten vor Feierabend zeigt das Badge "Uskoro zatvaramo"
const CLOSING_SOON_MINUTES = 60;

// Texte in contact.status im Dictionary
const STATUS = {
  open: "bg-lime-300 text-[#14332a]",
  closing: "bg-orange text-[#14332a]",
  closed: "bg-red-600 text-white",
};

function getStatus(day: number, minutes: number): keyof typeof STATUS {
  const today = site.hours.find((entry) => entry.days.includes(day));
  const match = today?.time?.match(/(\d{2}):(\d{2}) – (\d{2}):(\d{2})/);

  if (!match) return "closed";

  const [, openHour, openMinute, closeHour, closeMinute] = match.map(Number);
  const opensAt = openHour * 60 + openMinute;
  const closesAt = closeHour * 60 + closeMinute;

  if (minutes < opensAt || minutes >= closesAt) return "closed";

  return closesAt - minutes <= CLOSING_SOON_MINUTES ? "closing" : "open";
}

export default function Contact() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const [now, setNow] = useState<ReturnType<typeof getBelgradeTime> | null>(
    null,
  );

  // Erst im Browser setzen: Die Seite ist statisch vorgerendert
  useEffect(() => {
    setNow(getBelgradeTime());

    const timer = setInterval(() => setNow(getBelgradeTime()), 60_000);

    return () => clearInterval(timer);
  }, []);

  const status = now !== null ? getStatus(now.day, now.minutes) : null;

  // Angezeigte Adresse in der aktuellen Sprache
  const address = `${tCommon("address.street")}, ${tCommon("address.cityLine")}`;

  const mapQuery = encodeURIComponent(site.address);

  const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  const phoneUrl = `tel:${site.phone.replace(/\s/g, "")}`;

  const contactRows = [
    {
      icon: MapPin,
      label: t("labels.address"),
      value: address,
      href: navigationUrl,
      external: true,
    },
    {
      icon: Phone,
      label: t("labels.phone"),
      value: site.phone,
      href: phoneUrl,
    },
    {
      icon: Mail,
      label: t("labels.email"),
      value: site.email,
      href: `mailto:${site.email}`,
    },
  ];

  return (
    <section
      id="kontakt"
      aria-labelledby="contact-title"
      className="
        relative isolate overflow-hidden
        scroll-mt-24
        bg-[linear-gradient(125deg,#1b4a37_0%,#2a6048_55%,#3f7d60_100%)]
        py-15.5 text-white
        min-[701px]:py-21
      "
    >
      {/* Raster */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)]
          bg-size-[40px_40px]
          opacity-40
          lg:opacity-70
        "
      />

      {/* Dezenter Lichtakzent */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-32 top-0
          h-162.5 w-162.5
          rounded-full
          bg-lime-200/10
          blur-3xl
        "
      />

      <div className="container relative z-10">
        {/* Überschrift */}
        <div className="mt-10 mb-7.5 text-center min-[701px]:mb-9.75">
          <p className="text-white mb-4">{t("eyebrow")}</p>
          <h2
            id="contact-title"
            className="mb-7 text-[clamp(2.25rem,10vw,3.4375rem)] leading-[1.1]"
          >
            <span className="text-lime-300">{t("title.first")} </span>
            <span className="min-[400px]:whitespace-nowrap">
              <span className="text-white">{t("title.middle")} </span>
              <span className="text-orange">{t("title.last")}</span>
            </span>
          </h2>
          <span className="mx-auto block h-1 w-16.5 rounded-xs bg-white" />
        </div>
        <div className="mx-auto mb-12 max-w-110 text-center text-lg text-slate-200">
          <p>{t("intro")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Links: Kontaktdaten + Öffnungszeiten */}
          <div className="flex flex-col gap-6">
            {/* Kontaktdaten */}
            <div className="relative rounded-2xl border border-white/15 bg-white/5 p-7 sm:p-9">
              <h3 className="m-0 mb-7 text-2xl font-bold">
                {t("contactTitle")}
              </h3>

              <div className="space-y-5">
                {contactRows.map(
                  ({ icon: Icon, label, value, href, external }) => (
                    <a
                      key={label}
                      href={href}
                      {...(external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="group flex items-center gap-4 text-white"
                    >
                      <span
                        className="
                        flex h-11 w-11 shrink-0
                        items-center justify-center
                        rounded-xl
                        border border-lime-300/20
                        bg-lime-300/10
                      "
                      >
                        <Icon
                          size={20}
                          className="text-lime-300"
                          aria-hidden="true"
                        />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
                          {label}
                        </span>
                        <span className="block font-semibold wrap-anywhere transition-colors group-hover:text-lime-300">
                          {value}
                        </span>
                      </span>
                    </a>
                  ),
                )}
              </div>
              <div className="absolute right-7 bottom-7 hidden min-[701px]:block">
                <Image
                  src="/images/car/contact.webp"
                  alt={tCommon("mascotAlt")}
                  width={160}
                  height={160}
                />
              </div>
            </div>

            {/* Öffnungszeiten */}
            <div
              id="radno-vreme"
              className="scroll-mt-24 rounded-2xl border border-white/15 bg-white/5 p-7 sm:p-9"
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Clock3
                    size={27}
                    className="text-lime-300"
                    aria-hidden="true"
                  />
                  <h3 className="m-0 text-2xl font-bold">{t("hoursTitle")}</h3>
                </div>

                {status && (
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${STATUS[status]}`}
                  >
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-current"
                    />
                    {t(`status.${status}`)}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                {WEEK_ORDER.map((day) => {
                  const isToday = now?.day === day;
                  const time =
                    site.hours.find((entry) => entry.days.includes(day))
                      ?.time ?? tCommon("closed");

                  return (
                    <div
                      key={day}
                      aria-current={isToday ? "date" : undefined}
                      className={[
                        "flex items-center justify-between gap-4 rounded-xl px-4 py-2",
                        isToday ? "bg-lime-300/10" : "",
                      ].join(" ")}
                    >
                      <span
                        className={
                          isToday
                            ? "text-sm font-bold text-lime-300"
                            : "text-sm text-slate-200"
                        }
                      >
                        {tCommon(`days.${DAY_KEYS[day]}`)}
                        {/* {isToday && ` ${t("today")}`} */}
                      </span>

                      <strong className="text-right text-sm font-bold text-white">
                        {time}
                      </strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Rechts: Karte, Klick öffnet den Routenplaner von Google Maps */}
          <div
            className="
              group relative min-h-96
              overflow-hidden rounded-2xl
              border border-white/15 bg-white/5
            "
          >
            <a
              href={navigationUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("routeAria", { address })}
              className="
                absolute inset-0 block
                focus-visible:outline-2
                focus-visible:-outline-offset-4
                focus-visible:outline-lime-300
              "
            >
              <Image
                src="/images/map-kontakt.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="
                  object-cover
                  transition-transform duration-500
                  group-hover:scale-105
                  motion-reduce:transform-none
                "
              />

              {/* Stecknadel: Die Spitze zeigt auf die Bildmitte = Standort */}
              <span
                aria-hidden="true"
                className="
                  absolute left-1/2 top-1/2
                  flex -translate-x-1/2 -translate-y-full
                  flex-col items-center
                "
              >
                <MapPin
                  size={44}
                  className="fill-orange text-[#14332a] drop-shadow-lg"
                />
              </span>
            </a>

            {/* Quellenangabe (Pflicht laut OpenStreetMap-Lizenz) */}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-3 top-2 z-10 text-[11px] text-white/75 hover:text-white"
            >
              © OpenStreetMap
            </a>
          </div>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}

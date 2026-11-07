import { useFormatter, useTranslations } from "next-intl";
import { DAY_KEYS, WEEK_ORDER, site, navLinks } from "@/app/site-config";
import type { SVGProps } from "react";
import { Facebook, Instagram, MapPin, Youtube } from "lucide-react";
import LegalModal from "@/components/LegalModal";

// TikTok ist nicht in lucide-react enthalten.
function TikTok({
  size,
  ...props
}: SVGProps<SVGSVGElement> & { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      {...props}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", icon: Facebook, url: site.social.facebook },
  { label: "Instagram", icon: Instagram, url: site.social.instagram },
  { label: "YouTube", icon: Youtube, url: site.social.youtube },
  { label: "TikTok", icon: TikTok, url: site.social.tiktok },
  { label: "Google Maps", icon: MapPin, url: site.mapsUrl },
];

const columnTitle = "text-base font-semibold text-white";
const footerLink =
  "text-sm leading-relaxed text-[#d0dfd2] transition-colors hover:text-lime-300";

export default function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const format = useFormatter();

  // Kurzer Tagesname in der aktuellen Sprache, z.B. "pon.", "Mo.", "Mon".
  // 7. Januar 2024 war ein Sonntag (Index 0).
  const shortDayName = (day: number) =>
    format.dateTime(new Date(Date.UTC(2024, 0, 7 + day, 12)), {
      weekday: "short",
    });

  return (
    <footer className="bg-gray-950 text-white">
      <div className="container py-14 lg:py-18 px-4 sm:px-0">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:gap-x-12 lg:grid-cols-[1.5fr_0.8fr_1.1fr_1fr] lg:gap-x-12 xl:gap-x-16">
          {/* Unternehmen: mobil zentriert über die volle Breite, ab lg oben links */}
          <div className="col-span-2 flex flex-col items-center gap-5 text-center lg:col-span-1 lg:items-start lg:text-left">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline justify-center gap-x-1 lg:justify-start">
                <span className="text-2xl font-bold leading-tight text-lime-400 lg:text-3xl">
                  GARAGE
                </span>
                <span className="text-2xl leading-tight text-orange lg:text-3xl">
                  BEOGRAD
                </span>
              </div>
              <span className="text-sm tracking-wide text-[#c7d6cd]">
                {tCommon("brandSubtitle")}
              </span>
            </div>

            <address className="text-sm not-italic leading-relaxed text-[#d0dfd2]">
              {tCommon("address.street")}
              <br />
              {tCommon("address.cityLine")}
            </address>

            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              {t("tagline")}
            </p>
          </div>

          {/* Navigation */}
          <nav
            aria-label={t("quickLinks")}
            className="flex flex-col items-start gap-4"
          >
            <h3 className={columnTitle}>{t("quickLinks")}</h3>
            <div className="flex flex-col items-start gap-3">
              {navLinks.map(({ key, href }) => (
                <a key={href} href={href} className={footerLink}>
                  {tCommon(`nav.${key}`)}
                </a>
              ))}
            </div>
          </nav>

          {/* Öffnungszeiten: mobil rechtsbündig, ab lg linksbündig */}
          <div className="flex flex-col items-end gap-4 text-right lg:items-start lg:text-left">
            <h3 className={columnTitle}>{t("hours")}</h3>
            <dl className="m-0 grid grid-cols-[auto_auto] gap-x-3 gap-y-2 text-sm leading-relaxed text-[#d0dfd2]">
              {WEEK_ORDER.map((day) => {
                const time =
                  site.hours.find((entry) => entry.days.includes(day))?.time ??
                  tCommon("closed");

                return (
                  <div key={day} className="contents">
                    <dt className="text-left">
                      {/* Mobil abgekürzt, damit es in die schmale Spalte passt */}
                      <span className="capitalize lg:hidden">
                        {shortDayName(day)}
                      </span>
                      <span className="hidden lg:inline">
                        {tCommon(`days.${DAY_KEYS[day]}`)}
                      </span>
                    </dt>
                    <dd className="m-0 whitespace-nowrap text-right lg:text-left">
                      {time}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          {/* Social Media: mobil eine eigene, zentrierte Zeile */}
          <div className="col-span-2 flex flex-col items-center gap-4 lg:col-span-1 lg:items-start">
            <h3 className={columnTitle}>{t("social")}</h3>
            <div className="flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              {socialLinks.map(({ label, icon: Icon, url }) =>
                url ? (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center text-[#d0dfd2] transition-colors hover:border-lime-300/40 hover:bg-white/10 hover:text-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
                  >
                    <Icon size={30} aria-hidden="true" />
                  </a>
                ) : (
                  <span
                    key={label}
                    aria-label={t("notLinked", { label })}
                    title={t("notLinked", { label })}
                    className="flex h-11 w-11 items-center justify-center text-gray-500"
                  >
                    <Icon size={30} aria-hidden="true" />
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Unterer Abschluss */}
      <div className="container border-t border-white/15 py-6">
        <div className="flex flex-col gap-4 text-sm text-[#c9d6ce] sm:flex-row sm:items-center sm:justify-between">
          <span className="text-center">
            {t("copyright", { year: new Date().getFullYear() })}
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-center sm:justify-start">
            <a
              href="#politika-privatnosti"
              className="hover:text-lime-300 hover:underline visited:text-gray-400"
            >
              {t("privacy")}
            </a>
            <a
              href="#impresum"
              className="hover:text-lime-300 hover:underline visited:text-gray-400"
            >
              {t("imprint")}
            </a>
          </div>
        </div>
      </div>
      <LegalModal />
    </footer>
  );
}

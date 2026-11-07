import { site, addressParts, navLinks } from "@/app/site-config";
import type { SVGProps } from "react";
import { Facebook, Instagram, MapPin, Youtube } from "lucide-react";
import LegalModal from "@/components/LegalModal";

// TikTok gibt es in lucide-react nicht
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

const column = "flex flex-col items-start gap-2.5";
const columnTitle = "mb-1.5 text-[15px]";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">
      <div
        className="
          container grid grid-cols-2
          gap-x-5 gap-y-8 pt-13.5 pb-10.5
          min-[701px]:gap-9.5
          min-[1001px]:grid-cols-[1.4fr_0.7fr_0.95fr_1fr]
        "
      >
        <div className={`${column} col-span-2 min-[701px]:col-span-1`}>
          <div className="flex flex-col">
            <div>
              <span className="text-lime-400 font-bold text-2xl leading-6">
                GARAGE
              </span>
              <span className="text-orange text-2xl leading-6">BEOGRAD</span>
            </div>
            <span className="text-[13px] leading-5 text-[#c7d6cd]">
              TEHNIČKI PREGLED
            </span>
          </div>
          <address className="text-[13px] not-italic leading-5 text-[#c7d6cd]">
            {addressParts.street}
            <br />
            {addressParts.postalCode} {addressParts.city},{" "}
            {addressParts.country}
          </address>
          <p className="text-[13px] text-gray-500">
            Usluge za vaše vozilo na jednom mestu.
          </p>
        </div>

        <div className={column}>
          <strong className={columnTitle}>Brzi linkovi</strong>
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-[13px] text-[#d0dfd2] hover:text-[#8bef68]"
            >
              {label}
            </a>
          ))}
        </div>

        <div className={column}>
          <strong className={columnTitle}>Radno vreme</strong>
          {site.hours.map((h) => (
            <span key={h.day} className="text-xs text-[#d1dfd6]">
              {h.day}: {h.time}
            </span>
          ))}
        </div>

        <div className={`${column} col-span-2 min-[701px]:col-span-1`}>
          <strong className={columnTitle}>Društvene mreže</strong>
          {/* Die Klickfläche ist größer als das Icon, daher der negative Rand */}
          <div className="-ml-2.5 flex">
            {socialLinks.map(({ label, icon: Icon, url }) => (
              <a
                key={label}
                href={url || undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-lg text-[#d0dfd2] transition-colors
                  hover:text-[#8bef68]
                  focus-visible:outline-2
                  focus-visible:outline-[#8bef68] cursor-pointer
                "
              >
                <Icon size={24} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className="
          container flex flex-col justify-between gap-3.75
          border-t border-[#ffffff35] py-4.5
          text-[11px] text-[#c9d6ce]
          min-[701px]:flex-row
        "
      >
        <span>
          © {new Date().getFullYear()} Garage Beograd. Sva prava zadržana.
        </span>
        <span className="flex gap-5">
          <a
            href="#politika-privatnosti"
            className="text-inherit hover:underline!"
          >
            Politika privatnosti
          </a>
          <a href="#impresum" className="text-inherit hover:underline!">
            Impresum
          </a>
        </span>
      </div>
      <LegalModal />
    </footer>
  );
};

export default Footer;

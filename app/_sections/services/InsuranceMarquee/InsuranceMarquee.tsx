"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./InsuranceMarquee.module.css";

const insurers = [
  { name: "Dunav osiguranje", file: "dunav-osiguranje.svg" },
  { name: "Generali Srbija", file: "generali.svg" },
  { name: "DDOR osiguranje", file: "ddor.svg" },
  { name: "Wiener Städtische", file: "wiener-staedtische.svg" },
  { name: "UNIQA", file: "uniqa.svg" },
  { name: "Triglav osiguranje", file: "triglav.svg" },
  { name: "Sava osiguranje", file: "sava.svg" },
  { name: "AMS osiguranje", file: "ams-osiguranje.svg" },
  { name: "Milenijum osiguranje", file: "milenijum-osiguranje.svg" },
  { name: "Globos osiguranje", file: "globos.svg" },
  { name: "GRAWE", file: "grawe.svg" },
];

export default function InsuranceMarquee() {
  const t = useTranslations("insurance");
  // Angetipptes Logo: Touch-Geräte kennen kein Hover
  const [activeFile, setActiveFile] = useState<string | null>(null);

  return (
    <section className={styles.section} aria-label={t("insurersLabel")}>
      <div className={styles.viewport}>
        <div
          className={[
            styles.track,
            activeFile ? "[animation-play-state:paused]!" : "",
          ].join(" ")}
        >
          {[false, true].map((duplicate) => (
            <ul
              key={String(duplicate)}
              className={styles.group}
              aria-hidden={duplicate ? true : undefined}
            >
              {insurers.map((insurer) => (
                <li
                  key={insurer.file}
                  className={`${styles.item} cursor-pointer`}
                  onClick={() =>
                    setActiveFile((file) =>
                      file === insurer.file ? null : insurer.file,
                    )
                  }
                  onMouseLeave={() => setActiveFile(null)}
                >
                  {/* Native images preserve each SVG's aspect ratio. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/logos/insurance/${insurer.file}`}
                    alt={duplicate ? "" : insurer.name}
                    width={168}
                    height={64}
                    className={[
                      styles.logo,
                      "box-border rounded-xl p-1.5",
                      "transition duration-300 motion-reduce:transition-none",
                      "hover:bg-white hover:filter-none",
                      // Hell auf dem dunklen Hintergrund, Original auf Weiß
                      activeFile === insurer.file
                        ? "bg-white"
                        : "[filter:grayscale(1)_invert(1)_brightness(1.4)]",
                    ].join(" ")}
                    decoding="async"
                    // Erst laden, wenn das Laufband in die Nähe kommt
                    // (sonst lädt React die Logos schon beim Seitenaufruf vor)
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type RegistrationMascotProps = {
  className?: string;
};

const STEP_DURATION = 1500; // alle 1,5 Sekunden ein neues Kennzeichen

type PlateState = -1 | 0 | 1;

const RegistrationMascot = ({ className = "" }: RegistrationMascotProps) => {
  const tCommon = useTranslations("common");
  /**
   * -1 = kein Overlay sichtbar -> Basisbild
   *  0 = Kennzeichen 1
   *  1 = Kennzeichen 2
   * Durchgehende Schleife ohne Pause: Basis -> 1 -> 2 -> Basis -> ...
   */
  const [activePlate, setActivePlate] = useState<PlateState>(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlate((prev) => (prev === 1 ? -1 : ((prev + 1) as PlateState)));
    }, STEP_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative aspect-square w-full max-w-160 ${className}`}
    >
      {/* Basisbild: vollständiges Maskottchen, deshalb mit Alt-Text */}
      <Image
        src="/images/garage-beograd-maskota-registracija.webp"
        alt={tCommon("mascotImages.registration")}
        fill
        // Kein priority: liegt weit unten, Vorladen würde dem Hero Bandbreite nehmen
        sizes="(max-width: 768px) 70vw, 640px"
        className="pointer-events-none select-none object-contain!"
      />

      {/* Overlay Kennzeichen 1 */}
      <Image
        src="/images/services/registration-plate1.webp"
        alt=""
        fill
        sizes="(max-width: 768px) 70vw, 640px"
        aria-hidden="true"
        className={`pointer-events-none select-none object-contain! transition-opacity duration-300 ${
          activePlate === 0 ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Overlay Kennzeichen 2 */}
      <Image
        src="/images/services/registration-plate2.webp"
        alt=""
        fill
        sizes="(max-width: 768px) 70vw, 640px"
        aria-hidden="true"
        className={`pointer-events-none select-none object-contain! transition-opacity duration-300 ${
          activePlate === 1 ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default RegistrationMascot;

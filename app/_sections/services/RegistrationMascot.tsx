"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type RegistrationMascotProps = {
  className?: string;
};

const STEP_DURATION = 1000; // 1 Sekunde pro Kennzeichen
const PAUSE_DURATION = 3000; // 3 Sekunden Pause mit Basisbild

const RegistrationMascot = ({ className = "" }: RegistrationMascotProps) => {
  /**
   * -1 = kein Overlay sichtbar -> Basisbild
   *  0 = Kennzeichen 1
   *  1 = Kennzeichen 2
   */
  const [activePlate, setActivePlate] = useState<-1 | 0 | 1>(-1);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const clearCurrentTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    const startLoop = () => {
      // 1s Basisbild sichtbar lassen
      timeoutRef.current = setTimeout(() => {
        setActivePlate(0);

        // nach 1s zu Kennzeichen 2 wechseln
        timeoutRef.current = setTimeout(() => {
          setActivePlate(1);

          // nach 1s wieder zurück zum Basisbild
          timeoutRef.current = setTimeout(() => {
            setActivePlate(-1);

            // 3s Pause, dann Loop neu starten
            timeoutRef.current = setTimeout(() => {
              startLoop();
            }, PAUSE_DURATION);
          }, STEP_DURATION);
        }, STEP_DURATION);
      }, STEP_DURATION);
    };

    startLoop();

    return () => {
      clearCurrentTimeout();
    };
  }, []);

  return (
    <div
      className={`relative aspect-square w-full max-w-160 ${className}`}
      role="img"
      aria-label="Maskota za registraciju vozila Garage Beograd"
    >
      {/* Basisbild */}
      <Image
        src="/images/services/registration-body.webp"
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 70vw, 640px"
        className="pointer-events-none select-none object-contain"
      />

      {/* Overlay Kennzeichen 1 */}
      <Image
        src="/images/services/registration-plate1.webp"
        alt=""
        fill
        sizes="(max-width: 768px) 70vw, 640px"
        aria-hidden="true"
        className={`pointer-events-none select-none object-contain transition-opacity duration-300 ${
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
        className={`pointer-events-none select-none object-contain transition-opacity duration-300 ${
          activePlate === 1 ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default RegistrationMascot;

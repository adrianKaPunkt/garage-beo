import Image from "next/image";
import styles from "./AnimatedCar.module.css";

type AnimatedCarProps = {
  animated?: boolean;
  sizes?: string;
  /**
   * Bilder mit Vorrang laden (vorladen, nicht erst beim Hinscrollen).
   * Für das Auto im Hero: Es ist oft das größte Element beim Laden.
   */
  priority?: boolean;
};

export default function AnimatedCar({
  animated = true,
  sizes = "240px",
  priority = false,
}: AnimatedCarProps) {
  return (
    <div className={`relative aspect-square ${styles.car}`}>
      {/* Arm zuerst rendern, damit er hinter der Karosserie liegt */}
      <Image
        src="/images/car/waving-arm.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        priority={priority}
        className={`${styles.arm} ${animated ? styles.waving : ""}`}
      />

      <Image
        src="/images/car/car-body.webp"
        alt="Garage Beograd"
        fill
        sizes={sizes}
        priority={priority}
        className={styles.body}
      />

      <Image
        src="/images/car/blinking-eye.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        priority={priority}
        className={`${styles.eye} ${animated ? styles.blinking : ""}`}
      />

      <Image
        src="/images/car/thumb-up.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        priority={priority}
        className={styles.thumb}
      />
    </div>
  );
}

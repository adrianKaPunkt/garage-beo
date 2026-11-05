import Image from "next/image";
import styles from "./AnimatedCar.module.css";

type AnimatedCarProps = {
  animated?: boolean;
  sizes?: string;
};

export default function AnimatedCar({
  animated = true,
  sizes = "240px",
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
        className={`${styles.arm} ${animated ? styles.waving : ""}`}
      />

      <Image
        src="/images/car/car-body.webp"
        alt="Garage Beograd"
        fill
        sizes={sizes}
        className={styles.body}
      />

      <Image
        src="/images/car/blinking-eye.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        className={`${styles.eye} ${animated ? styles.blinking : ""}`}
      />

      <Image
        src="/images/car/thumb-up.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        className={styles.thumb}
      />
    </div>
  );
}

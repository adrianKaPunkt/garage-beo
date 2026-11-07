import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section className={styles.section} aria-hidden="true">
      <div className={`container ${styles.viewport}`}>
        <div className={styles.track}>
          {[0, 1].map((group) => (
            <div className={styles.group} key={group}>
              {[0, 1, 2, 3, 4, 5].map((card) => (
                <div className={styles.card} key={card} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

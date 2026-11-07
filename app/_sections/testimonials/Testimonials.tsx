import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section
      className="bg-[#f7f9f8] py-10 sm:py-14 lg:py-20"
      aria-hidden="true"
    >
      <div className={`container overflow-hidden ${styles.viewport}`}>
        <div className={`flex w-max ${styles.track}`}>
          {[0, 1].map((group) => (
            <div className="flex shrink-0 gap-6 pr-6" key={group}>
              {[0, 1, 2, 3, 4, 5].map((card) => (
                <div
                  className="min-h-60 w-[260px] shrink-0 rounded-[20px] border border-[#1b4a37]/10 bg-white shadow-[0_8px_24px_rgb(27_74_55_/_4%)] sm:w-[320px] lg:w-[360px]"
                  key={card}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

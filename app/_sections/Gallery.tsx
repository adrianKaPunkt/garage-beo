import Image from "next/image";

const Gallery = () => {
  return (
    <section className="section gallery-section" id="galerija">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">NAŠ PROSTOR</span>
          <h2>Zavirite u garažu</h2>
          <span className="title-rule" />
        </div>
        <div className="gallery-grid">
          <div className="gallery-main">
            <Image
              src="/images/garage-hall.webp"
              alt="Unutrašnjost hale za tehnički pregled"
              fill
              sizes="(max-width: 800px) 100vw, 60vw"
            />
          </div>
          <div>
            <Image
              src="/images/exterior-side.webp"
              alt="Pogled na ulaz u stanicu"
              fill
              sizes="(max-width: 800px) 100vw, 40vw"
            />
          </div>
          <div>
            <Image
              src="/images/waiting.webp"
              alt="Prostor za čekanje"
              fill
              sizes="(max-width: 800px) 100vw, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

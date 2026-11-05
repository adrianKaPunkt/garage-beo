import Image from "next/image";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/app/site-config";

const Contact = () => {
  return (
    <section className="section contact-section" id="kontakt">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow">TU SMO ZA VAS</span>
          <h2>Kontakt i dolazak</h2>
          <p>
            Imate pitanje o tehničkom pregledu ili registraciji? Javite nam se
            pre dolaska.
          </p>
          <div className="contact-lines">
            <a href={site.mapsUrl || "#kontakt"}>
              <MapPin /> {site.address}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
              <Phone /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`}>
              <Mail /> {site.email}
            </a>
          </div>
        </div>
        <div className="hours-card" id="radno-vreme">
          <div className="hours-head">
            <Clock3 size={29} />
            <h3>Radno vreme</h3>
          </div>
          {site.hours.map((item) => (
            <div className="hours-row" key={item.day}>
              <span>{item.day}</span>
              <strong>{item.time}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;

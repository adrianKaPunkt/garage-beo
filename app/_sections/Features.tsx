import { CarFront, Clock3, ShieldCheck, UsersRound } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Clock3,
    title: "Jednostavno",
    desc: "Sve informacije na jednom mestu",
  },
  {
    icon: UsersRound,
    title: "Ljubazan pristup",
    desc: "Tu smo za vaša pitanja",
  },
  {
    icon: ShieldCheck,
    title: "Tehnički pregled",
    desc: "Kontrola vozila na licu mesta",
  },
  { icon: CarFront, title: "Praktična lokacija", desc: "Pristup vozilom" },
];

const Features = () => {
  return (
    <section>
      <div className="container features-grid">
        {features.map(({ icon: Icon, title, desc }) => (
          <div className="feature" key={title}>
            <Icon size={35} strokeWidth={1.9} />
            <div>
              <strong>{title}</strong>
              <span>{desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;

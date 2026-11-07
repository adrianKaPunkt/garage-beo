import { CarFront, Clock3, ShieldCheck, UsersRound } from "lucide-react";
import { useTranslations } from "next-intl";

// Texte im Dictionary features.json
const features = [
  { icon: Clock3, key: "simple" },
  { icon: UsersRound, key: "friendly" },
  { icon: ShieldCheck, key: "inspection" },
  { icon: CarFront, key: "location" },
] as const;

const Features = () => {
  const t = useTranslations("features");

  return (
    <section>
      <div className="container grid grid-cols-4 gap-[22px] py-[23px] max-[1250px]:gap-3 max-[1000px]:grid-cols-2 max-[1000px]:gap-[22px] max-[700px]:gap-x-3 max-[700px]:gap-y-[25px] max-[700px]:py-6">
        {features.map(({ icon: Icon, key }) => (
          <div
            key={key}
            className="flex items-center gap-3.5 border-r border-(--line) pr-5 last:border-r-0 max-[1250px]:gap-2 max-[1000px]:nth-2:border-r-0 max-[700px]:items-start max-[700px]:border-0 max-[700px]:p-0"
          >
            <Icon
              size={35}
              strokeWidth={1.9}
              className="shrink-0 text-green max-[700px]:w-[27px]"
            />
            <div className="flex flex-col gap-1">
              <strong className="text-[14px] max-[1250px]:text-[13px]">
                {t(`${key}.title`)}
              </strong>
              <span className="text-[12px] text-(--muted) max-[700px]:text-[11px]">
                {t(`${key}.desc`)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;

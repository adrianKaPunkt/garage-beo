import { useTranslations } from "next-intl";
import Tehnicki from "./Tehnicki";
import TechnickiBackground from "./TechnickiBackground";
import Registration from "./Registration";
import Insurance from "./Insurance";
import Payment from "./Payment";
import FullService from "./FullService";

const Services = () => {
  const t = useTranslations("services");

  return (
    <section id="usluge" className="bg-[#f7f9f8]">
      <TechnickiBackground>
        <div className="container">
          <div className="mt-10 mb-7.5 text-center min-[701px]:mb-9.75">
            <p className="text-green mb-4">{t("eyebrow")}</p>
            <h2 className="mb-7 text-[clamp(2.25rem,10vw,3.4375rem)] leading-[1.1]">
              <span className="text-lime-300">{t("titleFirst")} </span>
              <span className="text-white">{t("titleSecond")}</span>
            </h2>
            <span className="mx-auto block h-1 w-16.5 rounded-xs bg-green" />
          </div>
          <div className="mx-auto max-w-110 text-center text-lg">
            <p>{t("intro")}</p>
          </div>
        </div>
        <Tehnicki />
      </TechnickiBackground>
      <Registration />
      <Insurance />
      <FullService />
      <Payment />
    </section>
  );
};

export default Services;

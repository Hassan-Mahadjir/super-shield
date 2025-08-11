import Hero from "@/components/Hero";
import HeatInsulator from "@/components/HeatInsulator";
import Us from "@/components/Us";
import Agencies from "@/components/Agencies";
import CustomerComment from "@/components/CustomerComment";
import Map from "@/components/Map";
import MovingText from "@/components/MovingText";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("Hero");
  return (
    <div>
      <MovingText />
      <Hero />
      <p className="text-sm sm:text-base mt-5 md:text-lg font-bold mt-1 lg:mt-8 md:mt-4 text-white text-center">
        {t("description", {
          defaultValue:
            "Super Shield is a Saudi brand specialized in providing high-quality thermal insulation rolls for vehicles, offering superior insulation properties at competitive prices.",
        })}
      </p>
      <HeatInsulator />
      {/* <Offers /> */}
      {/* Moving Gradient Breaker */}
      <div className="my-5 h-2 w-full bg-gradient-to-r from-red-200 via-red-900 to-red-500 rounded-full shadow-md animate-gradient-move" />
      <Map />
      <Us />
      <Agencies />
      <CustomerComment />
    </div>
  );
}

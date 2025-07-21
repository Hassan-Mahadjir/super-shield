import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { ModeToggle } from "@/components/modeToggle";
import Hero from "@/components/Hero";
import HeatInsulator from "@/components/HeatInsulator";
import Offers from "@/components/Offers";
import Us from "@/components/Us";
import Agencies from "@/components/Agencies";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <HeatInsulator />
      <Offers />
      <Us />
      <Agencies />
    </div>
  );
}

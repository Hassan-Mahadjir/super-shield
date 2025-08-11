import React from "react";
import { useTranslations, useLocale } from "next-intl";

const MovingText: React.FC = () => {
  const t = useTranslations("MovingText");
  const locale = useLocale();

  const animationClass =
    locale === "ar" ? "animate-scroll-rtl" : "animate-scroll";

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-red-900 via-red-600 to-red-900 py-0">
      <div
        className={`flex ${animationClass} whitespace-nowrap moving-text-responsive`}
      >
        <span className="text-white text-md font-bold mx-8">
          {t("bestWindowShield")}
        </span>
        <span className="text-white text-md font-bold mx-8">
          {t("bestWindowShield")}
        </span>
        <span className="text-white text-md font-bold mx-8">
          {t("bestWindowShield")}
        </span>
        <span className="text-white text-md font-bold mx-8">
          {t("bestWindowShield")}
        </span>
        <span className="text-white text-md font-bold mx-8">
          {t("bestWindowShield")}
        </span>
        <span className="text-white text-md font-bold mx-8">
          {t("bestWindowShield")}
        </span>
      </div>
    </div>
  );
};

export default MovingText;

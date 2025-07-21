import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

const Hero = () => {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const t = useTranslations("Hero");
  return (
    <div className="relative overflow-hidden">
      {/* NEW WRAPPER */}
      <div className="flex flex-col xl:flex-row gap-5 mx-auto relative z-0">
        {/* Text Content */}
        <div className="flex-1 pt-24 px-4 sm:px-8 md:px-12 lg:px-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            {t("title", { defaultValue: "The Ultimate Thermal Shield" })}
          </h1>
          <p className="text-base sm:text-lg font-light mt-5">
            {t("description", {
              defaultValue:
                "Super Shield is a Saudi brand specialized in providing high-quality thermal insulation rolls for vehicles, offering superior insulation properties at competitive prices.",
            })}
          </p>
        </div>

        {/* Image or Visual Area */}
        <div className="flex justify-end items-end w-full xl:flex-[1.5] h-[400px] sm:h-[500px] xl:h-screen">
          <div className="relative w-full max-w-[90%] h-full z-0">
            <Image
              src={"/hero-red.png"}
              alt="hero"
              fill
              className={`object-contain${isRTL ? " rtl-flip" : ""}`}
              style={isRTL ? { transform: "scaleX(-1)" } : {}}
            />
            <div
              className={`absolute ${
                isRTL
                  ? "left-[-25%] xl:left-[-35%]"
                  : "right-[-25%] xl:right-[-35%]"
              } xl:top-[1rem] w-full h-[590px] xl:h-screen bg-repeat-round -z-10 overflow-hidden`}
              style={
                isRTL
                  ? {
                      backgroundImage: "url('/hero-red-bg.png')",
                      transform: "scaleX(-1)",
                    }
                  : { backgroundImage: "url('/hero-red-bg.png')" }
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

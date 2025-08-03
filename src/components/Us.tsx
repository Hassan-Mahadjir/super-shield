import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { HiBadgeCheck } from "react-icons/hi";

const Us = () => {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const t = useTranslations("Us");

  return (
    <div className="relative overflow-hidden">
      {/* NEW WRAPPER */}
      <div className="flex flex-col xl:flex-row gap-5 mx-auto relative z-0">
        <div className="flex justify-end items-end w-full xl:flex-[1.2] h-[400px] sm:h-[500px] xl:h-screen">
          <div
            className={`relative w-full max-w-full h-full z-0${
              !isRTL
                ? "right-[-5%] sm:right-[-5%] md:right-[-4%] xl:right-[-8%]"
                : "left-[-5%] sm:left-[-5%] md:left-[-4%] xl:left-[-8%]"
            }`}
          >
            <Image
              src={"/lucid-red.png"}
              alt="hero"
              fill
              className={`object-contain scale-130  ${
                !isRTL ? " rtl-flip" : ""
              }`}
              style={!isRTL ? { transform: "scaleX(-1)" } : {}}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 pt-24 sm:pt-[-20] px-4 sm:px-8 md:px-12 lg:px-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            {t("title", { defaultValue: "Why Choose Us?" })}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: t("quality"),
                description: t("qualityDescription"),
              },
              {
                title: t("installation"),
                description: t("installationDescription"),
              },
              {
                title: t("protection"),
                description: t("protectionDescription"),
              },
              {
                title: t("durability"),
                description: t("durabilityDescription"),
              },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                {/* Icon wrapper */}
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-red-600">
                  <HiBadgeCheck className="w-full h-full" />
                </div>

                {/* Text content */}
                <div className="">
                  <h3 className="text-xl sm:text-2xl font-extrabold">
                    {feature.title}
                  </h3>
                  <p className="text-base sm:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Us;

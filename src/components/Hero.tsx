"use client";
import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

const Hero = () => {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const t = useTranslations("Hero");

  return (
    <div
      className="relative w-full overflow-hidden "
      style={{ aspectRatio: "16 / 9" }}
    >
      {/* Background Image (full height without cropping or spacing) */}
      <Image
        src="/hero-section-car.jpg"
        alt="hero"
        fill
        className={`object-cover object-bottom w-full h-full ${
          isRTL ? "rtl-flip" : ""
        }`}
        style={!isRTL ? { transform: "scaleX(-1)" } : {}}
        priority
      />

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* Text overlay */}
      <div className="relative z-10 text-center flex items-center mt-[-5%] h-[10vh] sm:h-[25vh] md:h-[15vh] lg:h-[18vh] xl:h-[45vh]">
        <div className="container mx-auto px-4 sm:px-4 md:px-8 lg:px-12">
          {/* <div className="max-w-2xl"></div> */}
          <div className="flex h-screen w-full items-center justify-center">
            <span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-blue-500 to-blue-600 bg-clip-text text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl box-content font-extrabold text-transparent text-center select-none">
              {t("title", { defaultValue: "The Ultimate Thermal Shield" })}
            </span>
            <h1 className="relative top-0 w-fit h-auto py-4 justify-center flex items-center text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white text-center select-auto">
              {t("title", { defaultValue: "The Ultimate Thermal Shield" })}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

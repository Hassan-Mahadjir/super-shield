import { useLocale, useTranslations } from "next-intl";
import React from "react";

const Agencies = () => {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const t = useTranslations("common");
  return (
    <div>
      <div className="mt-5 mx-5 my-10">
        <p className="text-center my-5 font-bold text-3xl">{t("agencies")}</p>
        <div className="overflow-hidden w-full py-8">
          <div
            className={`flex gap-8 animate-scroll-x items-center`}
            style={{
              animation: `${
                isRTL ? "scroll-x-rtl" : "scroll-x-ltr"
              } 15s linear infinite`,
            }}
          >
            {[
              "super.png",
              "vercel.svg",
              "window.svg",
              "vat.png",
              "globe.svg",
              "next.svg",
            ].map((logo, idx) => (
              <img
                key={idx}
                src={`/${logo}`}
                alt={logo.replace(/\..+$/, "")}
                className="h-16 w-auto object-contain"
                style={{ minWidth: "100px" }}
              />
            ))}
          </div>
        </div>
        <style>{`
          @keyframes scroll-x-ltr {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes scroll-x-rtl {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Agencies;

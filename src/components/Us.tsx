import { useTranslations } from "next-intl";
import React from "react";
import { HiBadgeCheck } from "react-icons/hi";

const Us = () => {
  const t = useTranslations("Us");

  return (
    <div className="relative overflow-hidden">
      {/* NEW WRAPPER */}
      <div className="flex flex-col xl:flex-row gap-5 mx-auto relative z-0">
        {/* Text Content */}
        <div className="flex-1 pt-[-10] sm:pt-[-20] px-4 sm:px-8 md:px-12 lg:px-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
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
                  <h3 className="text-lg sm:text-xl font-extrabold">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-md leading-relaxed">
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

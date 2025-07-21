import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";
import { useTranslations } from "use-intl";
import { HiBadgeCheck } from "react-icons/hi";

const Us = () => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="relative overflow-hidden">
      {/* NEW WRAPPER */}
      <div className="flex flex-col xl:flex-row gap-5 mx-auto relative z-0">
        <div className="flex justify-end items-end w-full xl:flex-[1.2] h-[400px] sm:h-[500px] xl:h-screen">
          <div className="relative w-full max-w-full h-full z-0">
            <Image
              src={"/hero-red.png"}
              alt="hero"
              fill
              className={`object-contain${!isRTL ? " rtl-flip" : ""}`}
              style={!isRTL ? { transform: "scaleX(-1)" } : {}}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 pt-24 px-4 sm:px-8 md:px-12 lg:px-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            Why choose Super Shield?
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "High quality and trustworthy",
                description:
                  "Unsatisfied with the product, get instance refund",
                icon: <HiBadgeCheck className="!w-12 !h-12" />,
              },
              {
                title: "Easy Installation",
                description: "Install it wherever you are with ease",
                icon: <HiBadgeCheck className="!w-12 !h-12" />,
              },
              {
                title: "Superior Heat Protection",
                description:
                  "Blocks up to 85% of heat, keeping your vehicle cooler in Saudi Arabia's extreme climate",
                icon: <HiBadgeCheck className="!w-12 !h-12" />,
              },
              {
                title: "Stylish & Long-Lasting",
                description:
                  "Modern design with durable materials that last — no peeling, no fading",
                icon: <HiBadgeCheck className="!w-12 !h-12" />,
              },
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-2">
                {feature.icon}
                <div>
                  <h3 className="text-md sm:text-lg font-extrabold ">
                    {feature.title}
                  </h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image or Visual Area */}
      </div>
    </div>
  );
};

export default Us;

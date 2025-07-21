"use client";
import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { MagicCard } from "./magicui/magic-card";
import { IoIosAddCircleOutline } from "react-icons/io";

import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { useCart } from "@/store/cart/cart";

const Offer = () => {
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const t = useTranslations("common");

  type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    oldPrice: string;
  };

  const handleAddtoCart = (product: Product) => {
    addToCart(
      product.id,
      product.price,
      product.name,
      product.image,
      product.description,
      1
    );
  };
  const locale = useLocale();
  const isRTL = locale === "ar";
  return (
    <div className="mt-5 mx-5">
      <p className="text-center my-5 font-bold text-2xl">{t("offer")}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-items-center">
        {[
          {
            id: 1,
            name: "Nano Ceramic - Suitable for all cars",
            description: "Protects your car from heat and UV rays",
            image: "/hero.png",
            oldPrice: "500 $",
            price: 100,
          },
          {
            id: 2,
            name: "Premium Silver Insulator",
            description: "Blocks 99% of UV, keeps car cool",
            image: "/hero-blue.png",
            oldPrice: "600 $",
            price: 150,
          },
          {
            id: 3,
            name: "Red Shield Pro",
            description: "Maximum heat protection for luxury cars",
            image: "/hero-red.png",
            oldPrice: "700 $",
            price: 200,
          },
        ].map((product, idx) => (
          <Card
            key={idx}
            className="p-0 max-w-xs w-full shadow-none border-none"
          >
            <MagicCard
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
              className="p-0"
            >
              <CardHeader className="border-b border-border p-4 [.border-b]:pb-4 relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="mx-auto"
                />
                <span
                  className={`absolute bottom-2 ${
                    isRTL ? "right-2" : "left-2"
                  } bg-white/10 backdrop-blur-md border shadow-md rounded-md text-xs px-3 py-1 rounded z-10`}
                >
                  {t("sellMore")} 1000
                </span>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid gap-2 text-center items-center">
                  <div className="grid">
                    <p className="font-bold text-base sm:text-sm md:text-md lg:text-md truncate whitespace-nowrap overflow-hidden">
                      {product.name}
                    </p>
                    <p className="text-xs sm:text-sm md:text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <p className="line-through text-gray-400">
                      {product.oldPrice}
                    </p>
                    <span className="font-bold text-xl text-green-600">
                      {product.price}
                    </span>
                  </div>
                </div>
                <div>
                  <Button
                    className="w-full hover:bg-red-800 transition duration-300 hover:text-white"
                    onClick={() => handleAddtoCart(product)}
                  >
                    <IoIosAddCircleOutline className="!w-6 !h-6" />
                    {t("addToCart", { defaultValue: "Add to Cart" })}
                  </Button>
                </div>
              </CardContent>
            </MagicCard>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Offer;

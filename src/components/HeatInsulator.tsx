"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { MagicCard } from "./magicui/magic-card";
import { IoIosAddCircleOutline } from "react-icons/io";

import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { useCart } from "@/store/cart/cart";
import { supabase } from "../lib/supabseClient";
import Currency from "./Currency";
import HeatInsulatorSkeleton from "./HeatInsulatorSkeleton";

const HeatInsulator = () => {
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const t = useTranslations("common");
  const locale = useLocale();

  type Product = {
    id: number;
    name: string;
    description: string;
    images: string[];
    current_price: number;
    old_price: number;
    created_at: string;
    num_sold: number;
    language: string; // Added language field
  };
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("product").select("*");
      if (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // fallback to empty array on error
      } else {
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  if (!products) {
    return <HeatInsulatorSkeleton />;
  }

  const filteredProducts = products.filter(
    (product: Product) => product.language === locale
  );

  if (filteredProducts.length === 0) {
    return <div className="text-center my-10">{t("noProducts")}</div>;
  }

  console.log("Products:", products[0]);

  const handleAddtoCart = (product: Product) => {
    addToCart(
      product.id,
      product.current_price,
      product.name,
      product.images && product.images.length > 0 ? product.images[0] : "",
      product.description,
      1,
      product.old_price
    );
  };
  const isRTL = locale === "ar";
  return (
    <div className="mt-5 mx-5">
      <p className="text-center my-8 font-extrabold text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
        {t("heatInsulator")}
      </p>

      <div className="w-full flex flex-wrap justify-center gap-4">
        {filteredProducts.map((product: Product, idx: number) => (
          <Card
            key={product.id || idx}
            className="p-0 max-w-xs w-full shadow-none border-red-800"
          >
            <MagicCard
              gradientColor={theme === "dark" ? "#7D0A0A" : "#7D0A0A"}
              className="p-0 "
            >
              <CardHeader className="border-b border-border p-4 [.border-b]:pb-4 relative">
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : "/lucid-car-gpt.png"
                    }
                    alt={product.name}
                    width={300}
                    height={300}
                    className="mx-auto cursor-pointer"
                  />
                </Link>
                <span
                  className={`absolute bottom-2 ${
                    isRTL ? "right-2" : "left-2"
                  } bg-white/10 backdrop-blur-md border shadow-md rounded-md text-xs px-3 py-1 rounded z-10`}
                >
                  {t("sellMore")} {product.num_sold}
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
                      {product.old_price}
                    </p>
                    <span className="font-bold text-xl text-red-600">
                      {product.current_price}
                    </span>
                    <Currency
                      currencyFill={theme === "dark" ? "white" : "black"}
                    />
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

export default HeatInsulator;

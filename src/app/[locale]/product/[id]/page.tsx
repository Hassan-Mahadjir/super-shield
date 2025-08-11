"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabseClient";
import ProductImages from "@/components/ProductImages";
import CustomizedProducts from "@/components/CustomizedProducts";
import { useTheme } from "next-themes";
import Currency from "@/components/Currency";
import ProductPageSkeleton from "@/components/ProductPageSkeleton";

type Product = {
  id: number;
  created_at: string;
  name: string;
  images: string[];
  description: string;
  current_price: number;
  old_price: number;
  has_offer: boolean;
  language: string;
  elect_cost: number;
  third_cost: number;
};

const ProductPage = ({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) => {
  const { id } = React.use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const theme = useTheme();
  const isDark = theme.theme === "dark";
  const currencyFill = isDark ? "white" : "black";

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("id", id)
        .single();
      if (!error) setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <ProductPageSkeleton />;

  return (
    <div className="mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-8">
        {/* photo gallery */}
        <div className="lg:col-span-1 space-y-4">
          <div className="lg:sticky top-24">
            <ProductImages images={product.images} />
          </div>
        </div>
        {/* product description */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-4xl font-medium">{product.name}</h1>
          <p>{product.description}</p>
          <div className="h-[2px] bg-gray-200" />
          <div className="flex items-center gap-2">
            <h3 className="text-xl line-through text-red-700">
              {product.old_price}
            </h3>
            <h2 className="font-bold text-3xl ">{product.current_price}</h2>
            <Currency currencyFill={currencyFill} />
          </div>
          <div className="h-[2px] bg-gray-200" />
          <CustomizedProducts product={product} />
          {/* ...any other product details... */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

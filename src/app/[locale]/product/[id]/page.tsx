"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabseClient";
import ProductImages from "@/components/ProductImages";
import CustomizedProducts from "@/components/CustomizedProducts";
import { useTheme } from "next-themes";
import Currency from "@/components/Currency";

const ProductPage = ({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) => {
  const { id, locale } = React.use(params);
  const [product, setProduct] = useState<any>(null);
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

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="grid lg:grid-cols-3 gap-8">
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

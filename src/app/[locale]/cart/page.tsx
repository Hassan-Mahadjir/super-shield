"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart, CartItem } from "@/store/cart/cart";
import { supabase } from "@/lib/supabseClient";
import { Separator } from "@/components/ui/separator";
import { validateCoupon } from "@/hook/validateCoupon";
import { useTranslations } from "next-intl";
import Currency from "@/components/Currency";
import { useTheme } from "next-themes";
import { createOrUpdateUser } from "@/lib/api/users";
import { createOrder, updateProductSales } from "@/lib/api/orders";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Define proper types for products from database
interface Product {
  id: number;
  name: string;
  images: string[];
  current_price: number;
  description: string;
  num_sold: number;
}

const CartPage: React.FC = () => {
  const t = useTranslations("cart");
  const tError = useTranslations("error");
  const cart = useCart((state) => state.cart);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const increaseQuantity = useCart((state) => state.increaseQuantity);
  const decreaseQuantity = useCart((state) => state.decreaseQuantity);
  const clearCart = useCart((state) => state.clearCart);

  const locale = useLocale();
  const theme = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isDark = mounted && theme.theme === "dark";
  const currencyFill = isDark ? "white" : "black";

  // State to hold merged cart items with product info
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);

  // Coupon state(s)
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isPercent, setIsPercent] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  // Handle cart items - customized products already have all info, regular products need fetching
  useEffect(() => {
    const processCartItems = async () => {
      // Find regular cart items missing name/price/image
      const regularItems = cart.filter(
        (item) => !item.description || !item.description.includes("Customer:")
      );

      const missingIds = regularItems
        .filter((item) => !item.name || !item.price || !item.image)
        .map((item) => item.id);

      let fetchedProducts: Product[] = [];
      if (missingIds.length > 0) {
        const { data, error } = await supabase
          .from("product")
          .select("id, name, images, current_price, description,num_sold")
          .in("id", missingIds);
        if (!error && data) {
          fetchedProducts = data;
        }
      }

      // Merge cart with fetched product info
      const merged = cart.map((item) => {
        // If it's a customized product, return as is
        if (item.description && item.description.includes("Customer:")) {
          return item;
        }

        // If it already has all info, return as is
        if (item.name && item.price && item.image) return item;

        // Try to fetch from database
        const found = fetchedProducts.find((p) => p.id === item.id);
        if (found) {
          return {
            ...item,
            name: found.name,
            price: found.current_price,
            image:
              found.images && found.images.length > 0
                ? found.images[0]
                : "/hero.png",
            description: found.description,
          };
        }
        return item;
      });
      setCartProducts(merged);
    };
    processCartItems();
  }, [cart]);

  // Coupon apply handler
  const handleApplyCoupon = async () => {
    setCouponLoading(true);
    setCouponMessage("");
    const result = await validateCoupon(couponCode);
    if (result.valid) {
      setDiscount(result.discount);
      setIsPercent(result.isPercent);
      setCouponMessage(t("couponApplied", { defaultValue: "Coupon applied!" }));
    } else {
      setDiscount(0);
      setIsPercent(false);
      setCouponMessage(tError(result.message));
    }
    setCouponLoading(false);
  };

  // Handle checkout and save order
  const handleCheckout = async () => {
    try {
      // For each customized product in cart, create an order
      const customizedProducts = cartProducts.filter(
        (item) => item.description && item.description.includes("Customer:")
      );

      for (const item of customizedProducts) {
        // Parse customer info from description
        const descriptionParts = item.description!.split(" | ");
        const customerName = descriptionParts[0]
          .replace("Customer:", "")
          .trim();
        const phoneNumber = descriptionParts[1].replace("Phone:", "").trim();

        // Create or update user
        const userData = {
          phone_number: phoneNumber,
          name: customerName,
        };

        const user = await createOrUpdateUser(userData);
        if (!user) {
          console.error("Failed to create/update user for:", phoneNumber);
          continue;
        }

        // Parse car details from description - use position-based parsing for language independence
        // The description format is: Customer | Phone | Car Make | Car Model | Car Type | Front Window | Back Window | Sides Window | Third Window
        const carMake = descriptionParts[2]?.split(":")[1]?.trim() || "";
        const carModel = descriptionParts[3]?.split(":")[1]?.trim() || "";
        const carType = descriptionParts[4]?.split(":")[1]?.trim() || "";

        // Parse window details - extract only canonical values for database storage
        // The description format is: Customer | Phone | Car Make | Car Model | Car Type | Front Window | Sides Front Window | Sides Back Window | Back Window | Third Window | Extra Window
        // So window parts start from index 5
        const windowParts = descriptionParts.slice(5);

        // Store the full window option string (including code and rule text) for database storage
        // Store only the value after the colon (e.g., "00 Light Tint (lightdark)") for database storage
        const frontWindow = windowParts[0]?.split(":")[1]?.trim() || "";
        const sidesfrontWindow = windowParts[1]?.split(":")[1]?.trim() || "";
        const sidesbackWindow = windowParts[2]?.split(":")[1]?.trim() || "";
        const backWindow = windowParts[3]?.split(":")[1]?.trim() || "";
        const thirdWindow = windowParts[4]?.split(":")[1]?.trim() || "";
        const extraWindow = windowParts[5]?.split(":")[1]?.trim() || "";

        // Calculate extra cost from the description
        let extraCost = 0;
        if (
          item.description!.includes("third removeExtra") ||
          item.description!.includes("extra removeExtra")
        ) {
          // Extract extra cost from the description
          const extraCostMatch = item.description!.match(/removeExtra: (\d+)/);
          if (extraCostMatch) {
            extraCost = parseInt(extraCostMatch[1]);
          }
        }

        // Create order
        const orderData = {
          user_phone_number: phoneNumber,
          coupon_code: discount > 0 ? couponCode : undefined,
          car_make: carMake,
          car_model: carModel,
          car_type: carType,
          front_window: frontWindow,
          sidesfront_window: sidesfrontWindow,
          sidesback_window: sidesbackWindow,
          back_window: backWindow,
          third_window: thirdWindow || null,
          extra_window: extraWindow || null,
          extra_cost: extraCost,
          quantity: item.quantity,
          price: item.price,
          discount_amount: discountAmount,
          final_price: finalTotal,
        };

        const order = await createOrder(orderData);
        if (!order) {
          console.error("Failed to create order for item:", item.id);
        } else {
          // Update product num_sold after successful order creation
          const productIdToUpdate = item.productId || item.id;
          if (productIdToUpdate) {
            // For both regular and customized products, update num_sold
            const updateSuccess = await updateProductSales(
              productIdToUpdate,
              item.quantity
            );
            if (!updateSuccess) {
              console.error(
                "Failed to update product sales for item:",
                item.id
              );
            }
          }

          if (discount > 0 && couponCode) {
            // Increment coupon usage count in Supabase only after successful order creation
            const { data: couponData, error: couponError } = await supabase
              .from("coupons")
              .select("used_count")
              .eq("code", couponCode)
              .single();
            if (!couponError && couponData) {
              const newCount = (couponData.used_count || 0) + 1;
              await supabase
                .from("coupons")
                .update({ used_count: newCount })
                .eq("code", couponCode);
            }
          }
        }
        if (order) {
          // send email to admin of the order via API route
          const orderDetails = {
            orderNumber: order.id,
            customerName: user.name,
            customerPhone: user.phone_number,
            orderItems: cartProducts,
            totalPrice,
            discountAmount,
            finalTotal,
            orderDate: order.created_at || new Date().toISOString(),
            carMake,
            carModel,
            carType,
            frontWindow,
            sidesfrontWindow,
            sidesbackWindow,
            backWindow,
            thirdWindow,
            extraWindow,
            extraCost,
            locale,
          };
          await fetch("/api/send-order-mail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderDetails),
          });
        }
      }

      // Show success message
      toast.success(
        t("orderReceived", { defaultValue: "Order received successfully!" }),
        {
          description: t("orderProcessing", {
            defaultValue: "Your order is being processed.",
          }),
          duration: 5000,
        }
      );

      // Clear the cart
      clearCart();

      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push(`/${locale}`);
      }, 2000);
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error(
        t("orderError", {
          defaultValue: "Failed to process order. Please try again.",
        })
      );
    }
  };

  // Totals
  const totalItems = cartProducts.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cartProducts.reduce(
    (sum, i) => sum + (i.price || 0) * i.quantity,
    0
  );
  // Discounted total
  const discountAmount = isPercent ? (totalPrice * discount) / 100 : discount;
  const finalTotal = Math.max(totalPrice - discountAmount, 0);

  if (!mounted) {
    // Optionally, you can return a skeleton or null while mounting
    return null;
  }
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="h-[15vh]" />
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {" "}
          {t("title")} {totalItems} {t("item")}
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartProducts.map((item) => {
            return (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Link href={"#"}>
                      <Image
                        src={item.image || "/hero.png"}
                        alt={item.name || "Product"}
                        width={96}
                        height={96}
                        className="object-cover rounded-lg"
                      />
                    </Link>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Name / Color / Price / Size */}
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          {item.description && (
                            <div className="text-xs text-gray-500 mt-1 space-y-1">
                              {item.description.includes("Customer:") ? (
                                // For customized products, parse and display customer info nicely
                                (() => {
                                  const parts = item.description.split(" | ");

                                  // Extract customer name and phone from the first two parts
                                  const customerName = parts[0]
                                    .replace("Customer:", "")
                                    .trim();
                                  const phoneNumber = parts[1]
                                    ? parts[1].replace("Phone:", "").trim()
                                    : "";

                                  // Extract specification parts (skip customer and phone)
                                  const specificationParts = parts.slice(2);

                                  return (
                                    <>
                                      <div className="space-y-1">
                                        <div className="font-medium">
                                          <span className="font-semibold text-white">
                                            {t("customer")}:
                                          </span>{" "}
                                          {customerName}
                                        </div>
                                        <div className="font-medium">
                                          <span className="font-semibold text-white">
                                            {t("phoneNumber")}:
                                          </span>{" "}
                                          {phoneNumber}
                                        </div>
                                        <div className="font-semibold text-white mt-2">
                                          {t("specification")}:
                                        </div>
                                        <div className="space-y-1 ml-2">
                                          {specificationParts.map(
                                            (spec: string, index: number) => {
                                              const [key, value] =
                                                spec.split(":");
                                              if (
                                                key &&
                                                value &&
                                                value.trim() !== ""
                                              ) {
                                                const formattedKey = key
                                                  .trim()
                                                  .toLowerCase()
                                                  .replace(/\s+/g, " ");
                                                // Remove the canonical value in parentheses for display
                                                const displayValue = value
                                                  .trim()
                                                  .replace(/\s*\([^)]+\)$/, "");
                                                return (
                                                  <div
                                                    key={index}
                                                    className="text-gray-600"
                                                  >
                                                    <span className="font-medium">
                                                      {formattedKey}:
                                                    </span>{" "}
                                                    {displayValue}
                                                  </div>
                                                );
                                              }
                                              return null;
                                            }
                                          )}
                                        </div>
                                      </div>
                                    </>
                                  );
                                })()
                              ) : (
                                // For regular products, display description as is
                                <p className="line-clamp-2">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="text-left flex">
                          <p className="font-semibold">
                            {(item.price || 0).toFixed(2)}{" "}
                          </p>
                          <Currency currencyFill={currencyFill} />
                        </div>
                      </div>
                    </div>
                    {/* Quantity Controls & Remove */}
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t("orderSummary")}</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>
                  {totalItems} {t("item")}
                </span>
                <div className="flex">
                  <span>{totalPrice.toFixed(2)} </span>
                  <Currency currencyFill={currencyFill} />
                </div>
              </div>
              <div className="flex justify-between">
                <span>{t("discount")}</span>
                <div className="flex">
                  <span>
                    {discount > 0
                      ? isPercent
                        ? `-${discount}%`
                        : `-${discountAmount.toFixed(2)}`
                      : 0}
                  </span>
                  <Currency currencyFill={currencyFill} />
                </div>
              </div>
              {/* Coupon Input */}
              <div className="flex flex-col gap-2 mb-2">
                <div className="flex gap-2">
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder={t("couponPlaceholder") || "Enter coupon code"}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponCode}
                    variant="outline"
                    className={
                      couponCode ? "hover:border hover:border-red-500" : ""
                    }
                  >
                    {couponLoading
                      ? t("applying") || "Applying..."
                      : t("apply") || "Apply"}
                  </Button>
                </div>
                {couponMessage && (
                  <span
                    className={`text-xs ${
                      discount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {couponMessage}
                  </span>
                )}
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>{t("total")}</span>
                <div className="flex">
                  <span>{finalTotal.toFixed(2)}</span>
                  <Currency currencyFill={currencyFill} />
                </div>
              </div>
              <div className="pt-4">
                <Link href="#">
                  <Button
                    className="w-full hover:bg-red-800 transition duration-300 hover:text-white"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    {t("completeOrder")}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

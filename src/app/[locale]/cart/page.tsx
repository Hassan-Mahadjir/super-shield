"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/store/cart/cart";
import { Separator } from "@/components/ui/separator";

const CartPage: React.FC = () => {
  const cart = useCart((state) => state.cart);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const increaseQuantity = useCart((state) => state.increaseQuantity);
  const decreaseQuantity = useCart((state) => state.decreaseQuantity);

  // Totals
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="h-[15vh]" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">سلة الشراء ({totalItems} قطعة)</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            return (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Link href={"#"}>
                      <Image
                        src={item.image || "/hero.png"}
                        alt={item.name}
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
                        </div>
                        <div className="text-left">
                          <p className="font-semibold">
                            {item.price.toFixed(2)} د.ل
                          </p>
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
            <h2 className="text-xl font-semibold mb-4">ملخص الطلب</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>{totalItems} قطعة</span>
                <span>{totalPrice.toFixed(2)} د.ل</span>
              </div>
              <div className="flex justify-between">
                <span>تخفيض</span>
                <span>0 د.ل</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>الإجمالي</span>
                <span>{totalPrice.toFixed(2)} د.ل</span>
              </div>
              <div className="pt-4">
                <Input
                  placeholder="أدخل كوبون التخفيض"
                  className="mb-4 text-right"
                />
                <Link href="/cart/checkout">
                  <Button className="w-full bg-accent" size="lg">
                    إتمام الطلب
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

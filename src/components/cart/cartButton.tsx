"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart/cart";

const CartButton = () => {
  const cart = useCart((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [animate, setAnimate] = useState(false);
  const prevTotalItems = useRef(totalItems);
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      prevTotalItems.current = totalItems;
      return;
    }

    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
    prevTotalItems.current = totalItems;
  }, [totalItems]);

  return (
    <Button
      variant="ghost"
      size="icon"
      asChild
      className="ml-2 transition-all duration-300"
    >
      <Link href="/cart">
        <motion.div
          animate={animate ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <motion.div
            animate={animate ? { color: ["#000", "#ff0000", "#000"] } : {}}
            transition={{ duration: 0.3 }}
          >
            <ShoppingCart className="h-5 w-5" />
          </motion.div>

          <span className="sr-only">Cart</span>

          {totalItems > 0 && (
            <motion.span
              animate={{
                scale: [1, 1.4, 1],
                backgroundColor: animate ? ["#ff0000", "#000", "#ff0000"] : [],
              }}
              transition={{ duration: 0.3 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
            >
              {totalItems}
            </motion.span>
          )}
        </motion.div>
      </Link>
    </Button>
  );
};

export default CartButton;

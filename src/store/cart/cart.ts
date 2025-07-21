import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  oldPrice?: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (
    id: number,
    price: number,
    name: string,
    image: string,
    description: string,
    quantity: number | string
  ) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (id, price, name, image, description, quantity) =>
        set((state) => {
          const qty =
            typeof quantity === "string" ? Number(quantity) : quantity;
          const existingIndex = state.cart.findIndex(
            (item) =>
              item.id === id && item.name === name && item.price === price
          );

          if (existingIndex > -1) {
            const cart = [...state.cart];
            cart[existingIndex].quantity += qty;
            return { cart };
          }

          const newItem: CartItem = {
            id,
            price,
            name,
            image,
            description,
            quantity: qty,
          };

          return { cart: [...state.cart, newItem] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item
          ),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

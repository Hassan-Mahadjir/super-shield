import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  old_price?: number;
  quantity: number;
  productId?: number; // Store the original product ID for customized products
}

interface CartState {
  cart: CartItem[];
  addToCart: (
    id: number,
    price: number,
    name: string,
    image: string,
    description: string,
    quantity: number | string,
    old_price?: number
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

      addToCart: (id, price, name, image, description, quantity, old_price) =>
        set((state) => {
          const qty =
            typeof quantity === "string" ? Number(quantity) : quantity;

          // For customized products (with customer info), always add as new item
          const isCustomizedProduct =
            description && description.includes("Customer:");

          if (isCustomizedProduct) {
            // Create unique ID for customized products to ensure they're always added as new items
            const uniqueId = Date.now() + Math.random();
            const newItem: CartItem = {
              id: uniqueId,
              price,
              name,
              image,
              description,
              quantity: qty,
              old_price,
              productId: id, // Store the original product ID
            };
            return { cart: [...state.cart, newItem] };
          }

          // For regular products, check for existing items
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
            old_price,
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

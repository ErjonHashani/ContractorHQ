import { create } from "zustand";
import { persist } from "zustand/middleware";

const isClient = typeof window !== "undefined";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: () => number;
  addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (_id: string) => void;
  updateQuantity: (_id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item._id === product._id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { ...product, quantity }],
          };
        });
      },

      removeFromCart: (_id) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== _id),
        }));
      },

      updateQuantity: (_id, quantity) => {
        if (quantity <= 0) return;
        set((state) => ({
          items: state.items.map((item) =>
            item._id === _id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: {
        getItem: (name) => {
          if (!isClient) return null;
          const value = localStorage.getItem(name);
          if (!value) return null;
          try {
            return JSON.parse(value);
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          if (!isClient) return;
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          if (!isClient) return;
          localStorage.removeItem(name);
        },
      },
    }
  )
);

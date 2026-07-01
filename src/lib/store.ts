import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  bundleQuantity?: number;
}

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  toggleCart: () => void;
  clearCart: () => void;
  getCartTotal: () => number;
  openCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      addItem: (item, quantity) => {
        if (typeof window !== 'undefined') {
          if ((window as any).snaptr) {
            (window as any).snaptr('track', 'ADD_CART', {
              price: item.price,
              currency: 'SAR',
              item_ids: [item.id],
              number_items: quantity
            });
          }
          if ((window as any).fbq) {
            (window as any).fbq('track', 'AddToCart', {
              value: item.price,
              currency: 'SAR',
              content_ids: [item.id],
              num_items: quantity
            });
          }
          if ((window as any).ttq) {
            (window as any).ttq.track('AddToCart', {
              value: item.price,
              currency: 'SAR',
              contents: [{
                content_id: item.id,
                content_name: item.name,
                quantity: quantity,
                price: item.price
              }],
            });
          }
          // TikTok Events API (Server Side)
          fetch('/api/tiktok-event', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              eventName: 'AddToCart',
              value: item.price,
              currency: 'SAR',
              items: [{ ...item, quantity }],
            }),
          }).catch(console.error);
        }
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
              isCartOpen: true,
            };
          }
          return {
            items: [...state.items, { ...item, quantity }],
            isCartOpen: true,
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i,
          ),
        }));
      },

      updateItem: (id, updates) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, ...updates } : i,
          ),
        }));
      },

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      openCart: () => set({ isCartOpen: true }),
      clearCart: () => set({ items: [] }),

      getCartTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "sharrabi-cart",
    },
  ),
);

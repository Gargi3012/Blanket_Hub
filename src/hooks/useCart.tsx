import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { site } from "@/lib/site";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  moq: number;
};

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
};

export const itemKey = (i: Pick<CartItem, "productId" | "size" | "color">) =>
  `${i.productId}__${i.size}__${i.color}`;

const STORAGE_KEY = "blanket-cart-v1";
const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const value = useMemo<CartState>(() => {
    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    const shipping = subtotal === 0 || subtotal >= site.freeShippingAbove ? 0 : site.shippingFlatRate;
    return {
      items,
      add: (item) =>
        setItems((prev) => {
          const key = itemKey(item);
          const existing = prev.find((p) => itemKey(p) === key);
          if (existing) {
            return prev.map((p) =>
              itemKey(p) === key ? { ...p, quantity: p.quantity + item.quantity } : p,
            );
          }
          return [...prev, item];
        }),
      remove: (key) => setItems((prev) => prev.filter((p) => itemKey(p) !== key)),
      setQuantity: (key, quantity) =>
        setItems((prev) =>
          prev.map((p) => (itemKey(p) === key ? { ...p, quantity: Math.max(1, quantity) } : p)),
        ),
      clear: () => setItems([]),
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

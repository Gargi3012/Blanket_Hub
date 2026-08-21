import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

type WishlistState = {
  ids: string[];
  has: (productId: string) => boolean;
  toggle: (productId: string) => Promise<void>;
  remove: (productId: string) => Promise<void>;
};

const STORAGE_KEY = "blanket-wishlist-v1";
const WishlistContext = createContext<WishlistState | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [ids, setIds] = useState<string[]>([]);

  const loadLocal = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    if (!user) {
      setIds(loadLocal());
      return;
    }
    let active = true;
    (async () => {
      const local = loadLocal();
      if (local.length) {
        await supabase
          .from("wishlist_items")
          .upsert(
            local.map((product_id) => ({ user_id: user.id, product_id })),
            { onConflict: "user_id,product_id" },
          );
        localStorage.removeItem(STORAGE_KEY);
      }
      const { data } = await supabase.from("wishlist_items").select("product_id");
      if (active) setIds((data ?? []).map((r) => r.product_id as string));
    })();
    return () => {
      active = false;
    };
  }, [user]);

  const persistLocal = (next: string[]) => {
    setIds(next);
    if (!user) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const toggle = useCallback(
    async (productId: string) => {
      const exists = ids.includes(productId);
      const next = exists ? ids.filter((i) => i !== productId) : [...ids, productId];
      persistLocal(next);
      if (!user) return;
      if (exists) {
        await supabase.from("wishlist_items").delete().eq("product_id", productId);
      } else {
        await supabase
          .from("wishlist_items")
          .upsert({ user_id: user.id, product_id: productId }, { onConflict: "user_id,product_id" });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ids, user],
  );

  const remove = useCallback(
    async (productId: string) => {
      if (ids.includes(productId)) await toggle(productId);
    },
    [ids, toggle],
  );

  return (
    <WishlistContext.Provider value={{ ids, has: (id) => ids.includes(id), toggle, remove }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}

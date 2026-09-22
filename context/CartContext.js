"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProductById } from "@/data/products";

const CartContext = createContext(null);
const STORAGE_KEY = "furniture-shop-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ productId, quantity }]
  const [isHydrated, setIsHydrated] = useState(false);

  // 최초 마운트 시 localStorage에서 복원
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch (e) {
      // localStorage를 사용할 수 없는 환경이면 조용히 무시
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // 저장 실패 시 무시 (프라이빗 브라우징 등)
    }
  }, [items, isHydrated]);

  function addItem(productId, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { productId, quantity }];
    });
  }

  function removeItem(productId) {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const detailedItems = useMemo(() => {
    return items
      .map((i) => {
        const product = getProductById(i.productId);
        if (!product) return null;
        return { ...i, product };
      })
      .filter(Boolean);
  }, [items]);

  const totalCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () =>
      detailedItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [detailedItems]
  );

  const value = {
    items: detailedItems,
    totalCount,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isHydrated,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart는 CartProvider 내부에서만 사용할 수 있습니다.");
  }
  return ctx;
}

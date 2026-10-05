"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { buildLineId, computeOptionsTotal } from "@/lib/cart";

const CartContext = createContext(null);
const STORAGE_KEY = "furniture-shop-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ lineId, productId, quantity, selectedOptions }]
  const [catalog, setCatalog] = useState([]); // 상품 상세 정보 캐시 (/api/products)
  const [storageLoaded, setStorageLoaded] = useState(false);
  const [catalogLoaded, setCatalogLoaded] = useState(false);

  // 최초 마운트 시 localStorage에서 복원
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // 옵션 기능 추가 전 저장된 예전 형식과도 호환되도록 lineId를 보정
          const normalized = parsed.map((i) => ({
            lineId: i.lineId || buildLineId(i.productId, i.selectedOptions),
            productId: i.productId,
            quantity: i.quantity,
            selectedOptions: i.selectedOptions || [],
          }));
          setItems(normalized);
        }
      }
    } catch (e) {
      // localStorage를 사용할 수 없는 환경이면 조용히 무시
    } finally {
      setStorageLoaded(true);
    }
  }, []);

  // 장바구니 상품의 이름/가격/이미지는 DB에만 있어서, 클라이언트에서는
  // API를 통해 한 번 받아와 캐시해둠 (여기서 직접 DB 조회 불가)
  useEffect(() => {
    let cancelled = false;
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setCatalog(data.products || []);
      })
      .catch(() => {
        // 실패해도 조용히 무시
      })
      .finally(() => {
        if (!cancelled) setCatalogLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (!storageLoaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // 저장 실패 시 무시 (프라이빗 브라우징 등)
    }
  }, [items, storageLoaded]);

  function addItem(productId, quantity = 1, selectedOptions = []) {
    const lineId = buildLineId(productId, selectedOptions);
    setItems((prev) => {
      const existing = prev.find((i) => i.lineId === lineId);
      if (existing) {
        return prev.map((i) =>
          i.lineId === lineId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { lineId, productId, quantity, selectedOptions }];
    });
  }

  function removeItem(lineId) {
    setItems((prev) => prev.filter((i) => i.lineId !== lineId));
  }

  function updateQuantity(lineId, quantity) {
    if (quantity < 1) {
      removeItem(lineId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.lineId === lineId ? { ...i, quantity } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const detailedItems = useMemo(() => {
    return items
      .map((i) => {
        const product = catalog.find((p) => p.id === i.productId);
        if (!product) return null;
        const optionsTotal = computeOptionsTotal(i.selectedOptions);
        return { ...i, product, unitPrice: product.price + optionsTotal };
      })
      .filter(Boolean);
  }, [items, catalog]);

  const totalCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => detailedItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
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
    isHydrated: storageLoaded && catalogLoaded,
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

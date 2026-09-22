"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import QuantityInput from "./QuantityInput";

export default function AddToCartForm({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  function handleAddToCart() {
    addItem(product.id, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  function handleBuyNow() {
    addItem(product.id, quantity);
    router.push("/cart");
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-wood-700">수량</span>
        <QuantityInput value={quantity} onChange={setQuantity} />
      </div>

      <div className="flex items-center justify-between border-t border-wood-100 pt-4">
        <span className="text-sm font-medium text-wood-700">총 상품금액</span>
        <span className="text-lg font-bold text-wood-900">
          {formatPrice(product.price * quantity)}
        </span>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 rounded-full border border-wood-800 px-6 py-3 text-sm font-semibold text-wood-800 transition hover:bg-wood-50"
        >
          {justAdded ? "장바구니에 담았어요 ✓" : "장바구니 담기"}
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 rounded-full bg-wood-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-wood-800"
        >
          바로 구매
        </button>
      </div>
    </div>
  );
}

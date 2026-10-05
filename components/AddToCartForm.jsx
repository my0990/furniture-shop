"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import QuantityInput from "./QuantityInput";

export default function AddToCartForm({ product }) {
  const options = useMemo(() => product.options || [], [product.options]);

  const [selected, setSelected] = useState(() => {
    const initial = {};
    for (const group of options) {
      if (group.choices?.[0]) initial[group.id] = group.choices[0].id;
    }
    return initial;
  });
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const selectedChoices = useMemo(() => {
    return options
      .map((group) => {
        const choice = group.choices.find((c) => c.id === selected[group.id]);
        if (!choice) return null;
        return {
          groupId: group.id,
          groupName: group.name,
          choiceId: choice.id,
          choiceLabel: choice.label,
          priceDelta: choice.priceDelta || 0,
        };
      })
      .filter(Boolean);
  }, [options, selected]);

  const unitPrice =
    product.price + selectedChoices.reduce((sum, c) => sum + c.priceDelta, 0);

  function handleSelect(groupId, choiceId) {
    setSelected((prev) => ({ ...prev, [groupId]: choiceId }));
  }

  function handleAddToCart() {
    addItem(product.id, quantity, selectedChoices);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  function handleBuyNow() {
    addItem(product.id, quantity, selectedChoices);
    router.push("/cart");
  }

  return (
    <div className="space-y-5">
      {options.map((group) => (
        <div key={group.id}>
          <p className="text-sm font-medium text-wood-700">{group.name}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {group.choices.map((choice) => {
              const isActive = selected[group.id] === choice.id;
              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => handleSelect(group.id, choice.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    isActive
                      ? "border-wood-800 bg-wood-800 text-white"
                      : "border-wood-200 text-wood-600 hover:border-wood-400"
                  }`}
                >
                  {choice.label}
                  {choice.priceDelta > 0 && ` (+${formatPrice(choice.priceDelta)})`}
                  {choice.priceDelta < 0 && ` (${formatPrice(choice.priceDelta)})`}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-wood-700">수량</span>
        <QuantityInput value={quantity} onChange={setQuantity} />
      </div>

      <div className="flex items-center justify-between border-t border-wood-100 pt-4">
        <span className="text-sm font-medium text-wood-700">총 상품금액</span>
        <span className="text-lg font-bold text-wood-900">
          {formatPrice(unitPrice * quantity)}
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

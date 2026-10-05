"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import QuantityInput from "@/components/QuantityInput";

const SHIPPING_FEE = 30000;
const FREE_SHIPPING_THRESHOLD = 300000;

export default function CartPage() {
  const { items, totalPrice, updateQuantity, removeItem, isHydrated } = useCart();

  const shippingFee = totalPrice >= FREE_SHIPPING_THRESHOLD || totalPrice === 0 ? 0 : SHIPPING_FEE;
  const orderTotal = totalPrice + shippingFee;

  if (isHydrated && items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-wood-900">장바구니가 비어있어요</h1>
        <p className="mt-2 text-sm text-wood-500">마음에 드는 가구를 담아보세요.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center rounded-full bg-wood-900 px-6 py-3 text-sm font-semibold text-white hover:bg-wood-800"
        >
          쇼핑 계속하기
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-wood-900">장바구니</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <ul className="divide-y divide-wood-100">
          {items.map(({ lineId, product, quantity, unitPrice, selectedOptions }) => (
            <li key={lineId} className="flex gap-4 py-6">
              <Link
                href={`/products/${product.id}`}
                className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-wood-50 sm:h-28 sm:w-28"
              >
                <Image src={product.image} alt={product.name} fill sizes="120px" className="object-cover" />
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/products/${product.id}`}
                      className="text-sm font-medium text-wood-900 hover:underline sm:text-base"
                    >
                      {product.name}
                    </Link>
                    {selectedOptions?.length > 0 && (
                      <p className="mt-1 text-xs text-wood-400">
                        {selectedOptions
                          .map((o) => `${o.groupName}: ${o.choiceLabel}`)
                          .join(" · ")}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-wood-500">{formatPrice(unitPrice)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(lineId)}
                    className="text-xs text-wood-400 hover:text-wood-700"
                    aria-label="상품 삭제"
                  >
                    삭제
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <QuantityInput
                    value={quantity}
                    onChange={(q) => updateQuantity(lineId, q)}
                  />
                  <span className="text-sm font-semibold text-wood-900">
                    {formatPrice(unitPrice * quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-fit rounded-2xl border border-wood-100 p-6">
          <h2 className="text-base font-bold text-wood-900">주문 요약</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between text-wood-600">
              <dt>상품금액</dt>
              <dd>{formatPrice(totalPrice)}</dd>
            </div>
            <div className="flex justify-between text-wood-600">
              <dt>배송비</dt>
              <dd>{shippingFee === 0 ? "무료" : formatPrice(shippingFee)}</dd>
            </div>
          </dl>
          {shippingFee > 0 && (
            <p className="mt-3 text-xs text-wood-400">
              {formatPrice(FREE_SHIPPING_THRESHOLD - totalPrice)} 더 담으면 무료배송!
            </p>
          )}
          <div className="mt-4 flex justify-between border-t border-wood-100 pt-4">
            <span className="text-sm font-semibold text-wood-900">결제 예정금액</span>
            <span className="text-lg font-bold text-wood-900">{formatPrice(orderTotal)}</span>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-full bg-wood-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-wood-800"
            onClick={() => alert("데모 사이트입니다. 실제 결제는 연결되어 있지 않습니다.")}
          >
            주문하기
          </button>
          <Link
            href="/products"
            className="mt-3 block text-center text-sm text-wood-500 hover:text-wood-800"
          >
            쇼핑 계속하기
          </Link>
        </div>
      </div>
    </div>
  );
}

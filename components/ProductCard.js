import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/data/products";

export default function ProductCard({ product }) {
  const discountRate = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-wood-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {product.tags.includes("new") && (
          <span className="absolute left-3 top-3 rounded-full bg-wood-900 px-2.5 py-1 text-[11px] font-semibold text-white">
            NEW
          </span>
        )}
        {product.tags.includes("bestseller") && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-600 px-2.5 py-1 text-[11px] font-semibold text-white">
            BEST
          </span>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <p className="line-clamp-1 text-sm font-medium text-wood-900">{product.name}</p>
        <div className="flex items-center gap-2">
          {discountRate > 0 && (
            <span className="text-sm font-bold text-amber-700">{discountRate}%</span>
          )}
          <span className="text-sm font-bold text-wood-900">{formatPrice(product.price)}</span>
        </div>
        {product.originalPrice && (
          <p className="text-xs text-wood-400 line-through">
            {formatPrice(product.originalPrice)}
          </p>
        )}
        <p className="flex items-center gap-1 text-xs text-wood-400">
          <span aria-hidden>★</span>
          {product.rating} ({product.reviewCount})
        </p>
      </div>
    </Link>
  );
}

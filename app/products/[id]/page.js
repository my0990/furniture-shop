import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/data/categories";
import { formatPrice, getProductById, getProductsByCategory, products } from "@/data/products";
import AddToCartForm from "@/components/AddToCartForm";
import ProductSection from "@/components/ProductSection";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }) {
  const product = getProductById(params.id);
  return { title: product ? `${product.name} | 나만의 가구` : "나만의 가구" };
}

export default function ProductDetailPage({ params }) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);
  const discountRate = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  const related = getProductsByCategory(product.category).filter((p) => p.id !== product.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-wood-400">
        <Link href="/" className="hover:text-wood-700">
          홈
        </Link>
        {" / "}
        <Link href={`/category/${product.category}`} className="hover:text-wood-700">
          {category?.name}
        </Link>
        {" / "}
        <span className="text-wood-600">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-wood-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="text-sm font-medium text-wood-500 hover:text-wood-800"
            >
              {category.name}
            </Link>
          )}
          <h1 className="mt-2 text-2xl font-bold text-wood-900 sm:text-3xl">{product.name}</h1>
          <p className="mt-2 flex items-center gap-1 text-sm text-wood-500">
            <span aria-hidden>★</span>
            {product.rating} · 리뷰 {product.reviewCount}개
          </p>

          <div className="mt-5 space-y-1 border-y border-wood-100 py-5">
            {product.originalPrice && (
              <p className="text-sm text-wood-400 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="flex items-center gap-2">
              {discountRate > 0 && (
                <span className="text-xl font-bold text-amber-700">{discountRate}%</span>
              )}
              <span className="text-2xl font-bold text-wood-900">
                {formatPrice(product.price)}
              </span>
            </p>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-wood-600">{product.description}</p>

          {product.colors?.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-medium text-wood-700">색상</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="rounded-full border border-wood-200 px-3 py-1 text-xs text-wood-600"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <AddToCartForm product={product} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-4">
          <ProductSection title="함께 보면 좋은 상품" products={related.slice(0, 4)} />
        </div>
      )}
    </div>
  );
}

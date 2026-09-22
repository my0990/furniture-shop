import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { categories } from "@/data/categories";
import { products as allProducts } from "@/data/products";

export const metadata = {
  title: "전체상품 | 나만의 가구",
};

const SORT_OPTIONS = [
  { value: "default", label: "기본순" },
  { value: "best", label: "베스트순" },
  { value: "new", label: "신상품순" },
  { value: "price-asc", label: "낮은가격순" },
  { value: "price-desc", label: "높은가격순" },
];

function sortProducts(products, sort) {
  const list = [...products];
  switch (sort) {
    case "best":
      return list.sort(
        (a, b) => Number(b.tags.includes("bestseller")) - Number(a.tags.includes("bestseller"))
      );
    case "new":
      return list.sort(
        (a, b) => Number(b.tags.includes("new")) - Number(a.tags.includes("new"))
      );
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    default:
      return list;
  }
}

export default function ProductsPage({ searchParams }) {
  const categoryFilter = searchParams?.category;
  const sort = searchParams?.sort || "default";

  const filtered = categoryFilter
    ? allProducts.filter((p) => p.category === categoryFilter)
    : allProducts;
  const sorted = sortProducts(filtered, sort);

  function buildHref({ category, sortValue }) {
    const params = new URLSearchParams();
    const nextCategory = category !== undefined ? category : categoryFilter;
    const nextSort = sortValue !== undefined ? sortValue : sort;
    if (nextCategory) params.set("category", nextCategory);
    if (nextSort && nextSort !== "default") params.set("sort", nextSort);
    const qs = params.toString();
    return qs ? `/products?${qs}` : "/products";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-wood-900">전체상품</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={buildHref({ category: null })}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            !categoryFilter
              ? "bg-wood-900 text-white"
              : "bg-wood-50 text-wood-600 hover:bg-wood-100"
          }`}
        >
          전체
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={buildHref({ category: c.slug })}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              categoryFilter === c.slug
                ? "bg-wood-900 text-white"
                : "bg-wood-50 text-wood-600 hover:bg-wood-100"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-b border-wood-100 pb-4">
        <p className="text-sm text-wood-500">총 {sorted.length}개 상품</p>
        <div className="flex gap-1">
          {SORT_OPTIONS.map((opt) => (
            <Link
              key={opt.value}
              href={buildHref({ sortValue: opt.value })}
              className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                sort === opt.value
                  ? "bg-wood-100 text-wood-900"
                  : "text-wood-400 hover:text-wood-700"
              }`}
            >
              {opt.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <ProductGrid products={sorted} />
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const category = getCategoryBySlug(params.slug);
  return { title: category ? `${category.name} | 나만의 가구` : "나만의 가구" };
}

export default function CategoryPage({ params }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const products = getProductsByCategory(params.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold text-wood-900">{category.name}</h1>
        <p className="mt-2 text-sm text-wood-500">{category.description}</p>
      </div>
      <p className="mt-6 text-sm text-wood-500">총 {products.length}개 상품</p>
      <div className="mt-4">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

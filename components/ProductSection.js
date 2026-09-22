import Link from "next/link";
import ProductGrid from "./ProductGrid";

export default function ProductSection({ title, subtitle, products, href }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold text-wood-900 sm:text-2xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-wood-500">{subtitle}</p>}
        </div>
        {href && (
          <Link href={href} className="text-sm font-medium text-wood-500 hover:text-wood-800">
            더보기 →
          </Link>
        )}
      </div>
      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}

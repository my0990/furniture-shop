import ProductCard from "./ProductCard";

export default function ProductGrid({ products, emptyMessage = "표시할 상품이 없습니다." }) {
  if (!products || products.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-wood-400">{emptyMessage}</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

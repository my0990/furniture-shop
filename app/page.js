import HeroBanner from "@/components/HeroBanner";
import CategoryNav from "@/components/CategoryNav";
import ProductSection from "@/components/ProductSection";
import { getBestsellers, getNewArrivals } from "@/data/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [bestsellers, newArrivals] = await Promise.all([
    getBestsellers(),
    getNewArrivals(),
  ]);

  return (
    <>
      <HeroBanner />
      <CategoryNav />
      <ProductSection
        title="베스트셀러"
        subtitle="가장 많이 사랑받은 가구를 만나보세요"
        products={bestsellers}
        href="/products?sort=best"
      />
      <ProductSection
        title="신상품"
        subtitle="새롭게 입고된 신상 가구"
        products={newArrivals}
        href="/products?sort=new"
      />
    </>
  );
}

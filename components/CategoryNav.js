import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/data/categories";

export default async function CategoryNav() {
  const categories = await getAllCategories();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-bold text-wood-900 sm:text-2xl">카테고리별로 둘러보기</h2>
        <Link href="/products" className="text-sm font-medium text-wood-500 hover:text-wood-800">
          전체보기 →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className="group relative overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
              <span className="text-lg font-bold sm:text-xl">{c.name}</span>
              <span className="mt-1 hidden text-xs text-white/80 sm:block">{c.description}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

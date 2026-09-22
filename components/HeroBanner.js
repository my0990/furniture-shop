import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-wood-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex min-h-[360px] items-center py-10 sm:min-h-[440px]">
          <Image
            src="/images/hero-banner.jpg"
            alt="가을 신상 가구 컬렉션 프로모션 배너"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="relative z-10 max-w-lg rounded-2xl bg-white/70 p-6 backdrop-blur-sm sm:p-8">
            <p className="text-sm font-semibold text-wood-600">2026 AUTUMN COLLECTION</p>
            <h1 className="mt-2 text-2xl font-bold leading-snug text-wood-900 sm:text-3xl">
              가을, 집을 새로 채우는 시간
            </h1>
            <p className="mt-3 text-sm text-wood-600 sm:text-base">
              신상 가구 컬렉션 최대 30% 할인. 오늘만 무료배송.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center rounded-full bg-wood-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-wood-900"
            >
              전체 상품 보러가기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

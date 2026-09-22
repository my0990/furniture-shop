import Image from "next/image";

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
        </div>
      </div>
    </section>
  );
}

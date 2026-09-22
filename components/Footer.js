import Link from "next/link";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-wood-100 bg-wood-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-wood-900">나만의 가구</p>
            <p className="mt-3 text-sm leading-relaxed text-wood-600">
              집을 완성하는 가구 편집숍, 나만의 가구입니다.
              <br />
              합리적인 가격의 좋은 가구를 소개합니다.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-wood-900">카테고리</p>
            <ul className="mt-3 space-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-sm text-wood-600 hover:text-wood-900"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-wood-900">고객센터</p>
            <ul className="mt-3 space-y-2 text-sm text-wood-600">
              <li>1544-0000 (평일 09:00 - 18:00)</li>
              <li>help@myfurniture.example</li>
              <li>
                <Link href="/cart" className="hover:text-wood-900">
                  장바구니
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-wood-900">회사정보</p>
            <ul className="mt-3 space-y-2 text-sm text-wood-600">
              <li>(주)나만의가구 · 대표 홍길동</li>
              <li>서울특별시 성동구 가구로 123</li>
              <li>사업자등록번호 000-00-00000</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-wood-100 pt-6 text-xs text-wood-400">
          © {new Date().getFullYear()} 나만의 가구. All rights reserved. (데모용 목업 사이트입니다)
        </div>
      </div>
    </footer>
  );
}

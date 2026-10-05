"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer({ categories, settings }) {
  const pathname = usePathname();

  // 입장 코드 화면(/enter)과 관리자 화면(/admin)에서는 쇼핑몰 푸터를 보여주지 않음
  if (pathname === "/enter" || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="mt-24 border-t border-wood-100 bg-wood-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-wood-900">{settings.companyName}</p>
            <p className="mt-3 text-sm leading-relaxed text-wood-600">{settings.tagline}</p>
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
              <li>{settings.phone}</li>
              <li>{settings.email}</li>
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
              <li>{settings.companyName} · 대표 {settings.ceoName}</li>
              <li>{settings.address}</li>
              <li>사업자등록번호 {settings.businessNumber}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-wood-100 pt-6 text-xs text-wood-400">
          © {new Date().getFullYear()} {settings.companyName}. All rights reserved. (데모용 목업 사이트입니다)
        </div>
      </div>
    </footer>
  );
}

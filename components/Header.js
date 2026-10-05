"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Header({ categories }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalCount } = useCart();

  // 입장 코드 화면(/enter)과 관리자 화면(/admin)에서는 쇼핑몰 헤더를 보여주지 않음
  if (pathname === "/enter" || pathname.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { href: "/", label: "홈" },
    ...categories.map((c) => ({ href: `/category/${c.slug}`, label: c.name })),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-wood-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-wood-900">
            나만의 가구
          </span>
          <span className="hidden text-sm text-wood-500 sm:inline">FURNITURE</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-wood-600 ${
                  active ? "text-wood-900" : "text-wood-500"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/products"
            className="hidden text-sm font-medium text-wood-500 hover:text-wood-700 sm:inline"
          >
            전체상품
          </Link>
          <Link href="/cart" className="relative flex items-center">
            <CartIcon />
            {totalCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-wood-600 px-1 text-[11px] font-semibold text-white">
                {totalCount}
              </span>
            )}
          </Link>
          <button
            className="flex items-center justify-center rounded-md p-1 text-wood-700 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="메뉴 열기"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-wood-100 bg-white px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-2 text-sm font-medium text-wood-700 hover:bg-wood-50"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/products"
            className="rounded-md px-2 py-2 text-sm font-medium text-wood-700 hover:bg-wood-50"
            onClick={() => setMenuOpen(false)}
          >
            전체상품
          </Link>
        </nav>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-wood-800">
      <path
        d="M3 4h2l1.6 9.6a2 2 0 0 0 2 1.7h7.7a2 2 0 0 0 2-1.6L19.5 8H6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="20" r="1.3" fill="currentColor" />
      <circle cx="17.5" cy="20" r="1.3" fill="currentColor" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

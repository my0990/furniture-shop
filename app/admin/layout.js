import Link from "next/link";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export const metadata = {
  title: "관리자 - 나만의 가구",
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-wood-50">
      <header className="border-b border-wood-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/admin" className="text-lg font-bold text-wood-900">
            나만의 가구 · 관리자
          </Link>
          <nav className="flex items-center gap-4 text-sm text-wood-600">
            <Link href="/admin/products" className="hover:text-wood-900">
              상품
            </Link>
            <Link href="/admin/categories" className="hover:text-wood-900">
              카테고리
            </Link>
            <Link href="/admin/settings" className="hover:text-wood-900">
              매장 정보
            </Link>
            <AdminLogoutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}

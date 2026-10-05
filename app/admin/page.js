import Link from "next/link";

export default function AdminDashboardPage() {
  const menus = [
    {
      href: "/admin/products",
      title: "상품 관리",
      desc: "상품을 추가/수정/삭제해요.",
    },
    {
      href: "/admin/categories",
      title: "카테고리 관리",
      desc: "헤더에 보이는 카테고리를 관리해요.",
    },
    {
      href: "/admin/settings",
      title: "매장 정보",
      desc: "푸터에 보이는 매장 정보를 수정해요.",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-wood-900">관리자 홈</h1>
      <p className="mt-2 text-sm text-wood-600">
        아래 메뉴에서 상품, 카테고리, 매장 정보를 관리할 수 있어요.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {menus.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="rounded-xl border border-wood-200 bg-white p-5 transition hover:border-wood-400 hover:shadow-md"
          >
            <h2 className="font-semibold text-wood-900">{m.title}</h2>
            <p className="mt-1 text-sm text-wood-600">{m.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

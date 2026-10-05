import Link from "next/link";
import { getAllProducts, formatPrice } from "@/data/products";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import { deleteProductAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-wood-900">상품 관리</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-wood-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-wood-900"
        >
          + 상품 추가
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-wood-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-wood-200 bg-wood-50 text-wood-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">이름</th>
              <th className="px-4 py-3">카테고리</th>
              <th className="px-4 py-3">가격</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-wood-100 last:border-0">
                <td className="px-4 py-3 text-wood-500">{p.id}</td>
                <td className="px-4 py-3 font-medium text-wood-900">{p.name}</td>
                <td className="px-4 py-3 text-wood-600">{p.category}</td>
                <td className="px-4 py-3 text-wood-600">{formatPrice(p.price)}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="rounded-full border border-wood-300 px-3 py-1 text-xs font-medium text-wood-700 transition hover:bg-wood-100"
                    >
                      수정
                    </Link>
                    <form action={deleteProductAction.bind(null, p.id)}>
                      <ConfirmSubmitButton
                        confirmMessage="이 상품을 삭제할까요? 되돌릴 수 없어요."
                        className="rounded-full border border-red-300 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        삭제
                      </ConfirmSubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-wood-400">
                  등록된 상품이 없어요.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

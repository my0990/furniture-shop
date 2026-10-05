import Link from "next/link";
import { getAllCategories } from "@/data/categories";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import { deleteCategoryAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-wood-900">카테고리 관리</h1>
        <Link
          href="/admin/categories/new"
          className="rounded-full bg-wood-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-wood-900"
        >
          + 카테고리 추가
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-wood-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-wood-200 bg-wood-50 text-wood-600">
            <tr>
              <th className="px-4 py-3">순서</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">이름</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.slug} className="border-b border-wood-100 last:border-0">
                <td className="px-4 py-3 text-wood-500">{c.sortOrder}</td>
                <td className="px-4 py-3 text-wood-500">{c.slug}</td>
                <td className="px-4 py-3 font-medium text-wood-900">{c.name}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/categories/${c.slug}`}
                      className="rounded-full border border-wood-300 px-3 py-1 text-xs font-medium text-wood-700 transition hover:bg-wood-100"
                    >
                      수정
                    </Link>
                    <form action={deleteCategoryAction.bind(null, c.slug)}>
                      <ConfirmSubmitButton
                        confirmMessage="이 카테고리를 삭제할까요? 이 카테고리를 쓰는 상품이 있으면 삭제할 수 없어요."
                        className="rounded-full border border-red-300 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        삭제
                      </ConfirmSubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-wood-400">
                  등록된 카테고리가 없어요.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

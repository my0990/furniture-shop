import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/data/categories";
import CategoryForm from "@/components/admin/CategoryForm";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import { updateCategoryAction, deleteCategoryAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({ params }) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const boundUpdate = updateCategoryAction.bind(null, category.slug);
  const boundDelete = deleteCategoryAction.bind(null, category.slug);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-wood-900">카테고리 수정</h1>
        <form action={boundDelete}>
          <ConfirmSubmitButton
            confirmMessage="이 카테고리를 삭제할까요? 이 카테고리를 쓰는 상품이 있으면 삭제할 수 없어요."
            className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            카테고리 삭제
          </ConfirmSubmitButton>
        </form>
      </div>
      <CategoryForm action={boundUpdate} initial={category} slugEditable={false} />
    </div>
  );
}

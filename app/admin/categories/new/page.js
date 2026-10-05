import CategoryForm from "@/components/admin/CategoryForm";
import { createCategoryAction } from "../actions";

export const dynamic = "force-dynamic";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-wood-900">카테고리 추가</h1>
      <CategoryForm action={createCategoryAction} slugEditable />
    </div>
  );
}

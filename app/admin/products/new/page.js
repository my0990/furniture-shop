import { getAllCategories } from "@/data/categories";
import ProductForm from "@/components/admin/ProductForm";
import { createProductAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <h1 className="text-2xl font-bold text-wood-900">상품 추가</h1>
      <ProductForm action={createProductAction} categories={categories} idEditable />
    </div>
  );
}

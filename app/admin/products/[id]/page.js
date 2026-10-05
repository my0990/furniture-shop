import { notFound } from "next/navigation";
import { getAllCategories } from "@/data/categories";
import { getProductById } from "@/data/products";
import ProductForm from "@/components/admin/ProductForm";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import { updateProductAction, deleteProductAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }) {
  const [categories, product] = await Promise.all([
    getAllCategories(),
    getProductById(params.id),
  ]);

  if (!product) {
    notFound();
  }

  const boundUpdate = updateProductAction.bind(null, product.id);
  const boundDelete = deleteProductAction.bind(null, product.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-wood-900">상품 수정</h1>
        <form action={boundDelete}>
          <ConfirmSubmitButton
            confirmMessage="이 상품을 삭제할까요? 되돌릴 수 없어요."
            className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            상품 삭제
          </ConfirmSubmitButton>
        </form>
      </div>
      <ProductForm
        action={boundUpdate}
        categories={categories}
        initial={product}
        idEditable={false}
      />
    </div>
  );
}

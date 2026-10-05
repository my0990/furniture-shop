"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createCategory, updateCategory, deleteCategory } from "@/data/categories";
import { resolveImageField } from "@/lib/r2";

function readCategoryForm(formData) {
  const sortOrder = Number(formData.get("sortOrder"));
  return {
    name: formData.get("name")?.toString().trim() || "",
    description: formData.get("description")?.toString().trim() || "",
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
  };
}

export async function createCategoryAction(formData) {
  const slug = formData.get("slug")?.toString().trim();
  if (!slug) {
    throw new Error("카테고리 slug를 입력해주세요.");
  }

  const image = await resolveImageField(formData, "categories");
  if (!image) {
    throw new Error("카테고리 이미지를 선택해주세요.");
  }

  const data = readCategoryForm(formData);

  try {
    await createCategory({ slug, image, ...data });
  } catch (err) {
    throw new Error("카테고리를 저장하지 못했어요. 이미 같은 slug가 있는지 확인해주세요.");
  }

  revalidatePath("/admin/categories");
  revalidatePath("/");
  redirect("/admin/categories");
}

export async function updateCategoryAction(slug, formData) {
  const image = await resolveImageField(formData, "categories");
  const data = readCategoryForm(formData);
  await updateCategory(slug, { image, ...data });

  revalidatePath("/admin/categories");
  revalidatePath(`/category/${slug}`);
  revalidatePath("/");
  redirect("/admin/categories");
}

export async function deleteCategoryAction(slug) {
  try {
    await deleteCategory(slug);
  } catch (err) {
    throw new Error(
      "이 카테고리를 사용하는 상품이 있어서 삭제할 수 없어요. 먼저 해당 상품들을 다른 카테고리로 옮기거나 삭제해주세요."
    );
  }

  revalidatePath("/admin/categories");
  revalidatePath("/");
  redirect("/admin/categories");
}

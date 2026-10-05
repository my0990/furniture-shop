"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createProduct, updateProduct, deleteProduct } from "@/data/products";
import { resolveImageField } from "@/lib/r2";
import { resolveDetailBlocks } from "@/lib/detailBlocks";
import { resolveOptions } from "@/lib/productOptions";

function parseListField(value) {
  return (value || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function readProductForm(formData) {
  const price = Number(formData.get("price"));
  const originalPriceRaw = formData.get("originalPrice");
  const originalPrice = originalPriceRaw ? Number(originalPriceRaw) : null;
  const rating = Number(formData.get("rating") || 0);
  const reviewCount = Number(formData.get("reviewCount") || 0);

  return {
    name: formData.get("name")?.toString().trim() || "",
    category: formData.get("category")?.toString() || "",
    price: Number.isFinite(price) ? price : 0,
    originalPrice: Number.isFinite(originalPrice) ? originalPrice : null,
    description: formData.get("description")?.toString().trim() || "",
    tags: parseListField(formData.get("tags")),
    rating: Number.isFinite(rating) ? rating : 0,
    reviewCount: Number.isFinite(reviewCount) ? reviewCount : 0,
  };
}

export async function createProductAction(formData) {
  const id = formData.get("id")?.toString().trim();
  if (!id) {
    throw new Error("상품 ID를 입력해주세요.");
  }

  const image = await resolveImageField(formData, "products");
  if (!image) {
    throw new Error("상품 이미지를 선택해주세요.");
  }

  const options = resolveOptions(formData);
  const detailBlocks = await resolveDetailBlocks(formData, "products/detail");
  const data = readProductForm(formData);

  try {
    await createProduct({ id, image, options, detailBlocks, ...data });
  } catch (err) {
    throw new Error("상품을 저장하지 못했어요. 이미 같은 ID가 있는지 확인해주세요.");
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProductAction(id, formData) {
  const image = await resolveImageField(formData, "products");
  const options = resolveOptions(formData);
  const detailBlocks = await resolveDetailBlocks(formData, "products/detail");
  const data = readProductForm(formData);
  await updateProduct(id, { image, options, detailBlocks, ...data });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
  revalidatePath(`/products/${id}`);
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function deleteProductAction(id) {
  await deleteProduct(id);

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

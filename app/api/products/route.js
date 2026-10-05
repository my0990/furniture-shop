import { NextResponse } from "next/server";
import { getAllProducts } from "@/data/products";

// 장바구니(클라이언트 컴포넌트)가 상품 상세 정보를 조회할 때 사용
export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json({ products });
}

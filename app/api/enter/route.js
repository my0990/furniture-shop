import { NextResponse } from "next/server";

const COOKIE_NAME = "shop_access";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const code = typeof body.code === "string" ? body.code.trim() : "";

  const expectedCode = process.env.SITE_ACCESS_CODE;
  const token = process.env.SITE_ACCESS_TOKEN;

  if (!expectedCode || !token) {
    return NextResponse.json(
      { message: "서버에 입장 코드가 설정되어 있지 않아요. 관리자에게 문의하세요." },
      { status: 500 }
    );
  }

  if (code !== expectedCode) {
    return NextResponse.json(
      { message: "코드가 올바르지 않아요." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 90, // 90일 동안 재입력 없이 유지
  });
  return response;
}

import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  const sessionToken = process.env.ADMIN_SESSION_TOKEN;

  if (!expectedUsername || !expectedPassword || !sessionToken) {
    return NextResponse.json(
      { message: "서버에 관리자 계정 환경변수가 설정되어 있지 않아요." },
      { status: 500 }
    );
  }

  if (!username || !password || username !== expectedUsername || password !== expectedPassword) {
    return NextResponse.json(
      { message: "아이디 또는 비밀번호가 올바르지 않아요." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12시간
  });
  return response;
}

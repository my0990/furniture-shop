import { NextResponse } from "next/server";

const SHOP_COOKIE = "shop_access";
const ADMIN_COOKIE = "admin_session";

const SHOP_PUBLIC_PATHS = ["/enter", "/api/enter"];
const ADMIN_PUBLIC_PATHS = ["/admin/login", "/api/admin/login"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 관리자 영역은 손님용 입장 코드와 완전히 별개의 로그인을 사용
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (ADMIN_PUBLIC_PATHS.includes(pathname)) {
      return NextResponse.next();
    }

    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const expected = process.env.ADMIN_SESSION_TOKEN;

    if (expected && token === expected) {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // 일반 방문자: 비공개 매장 입장 코드
  if (SHOP_PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SHOP_COOKIE)?.value;
  const expected = process.env.SITE_ACCESS_TOKEN;

  if (expected && token === expected) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/enter";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  // 정적 파일(_next, 이미지, favicon)은 검사 대상에서 제외
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
};

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      <p className="text-sm font-semibold text-wood-500">404</p>
      <h1 className="mt-2 text-2xl font-bold text-wood-900">페이지를 찾을 수 없어요</h1>
      <p className="mt-2 text-sm text-wood-500">주소를 다시 확인하거나 홈으로 돌아가 주세요.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-wood-900 px-6 py-3 text-sm font-semibold text-white hover:bg-wood-800"
      >
        홈으로 가기
      </Link>
    </div>
  );
}

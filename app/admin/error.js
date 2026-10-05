"use client";

export default function AdminError({ error, reset }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
      <h2 className="font-semibold">문제가 발생했어요</h2>
      <p className="mt-2 text-sm">
        {error?.message || "알 수 없는 오류가 발생했어요."}
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
      >
        다시 시도
      </button>
    </div>
  );
}

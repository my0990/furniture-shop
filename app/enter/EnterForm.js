"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function EnterForm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/enter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (res.ok) {
        router.replace(from);
        router.refresh();
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(data.message || "코드가 올바르지 않아요.");
    } catch (err) {
      setError("잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-wood-900 px-4">
      {/* 배경: 히어로 사진을 흐리고 어둡게 깔아서 매장 분위기 연출 */}
      <Image
        src="/images/hero-banner.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-110 object-cover blur-sm"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-wood-900/70 via-wood-900/60 to-wood-900/80" />

      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white/90 p-8 shadow-xl backdrop-blur-sm">
        <h1 className="text-xl font-bold text-wood-900">나만의 가구</h1>
        <p className="mt-2 text-sm text-wood-600">
          비공개 매장입니다. 입장 코드를 입력해주세요.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input
            type="password"
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="입장 코드"
            className="w-full rounded-lg border border-wood-200 bg-white px-4 py-3 text-sm outline-none focus:border-wood-500"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading || !code}
            className="w-full rounded-full bg-wood-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-wood-900 disabled:opacity-50"
          >
            {loading ? "확인 중..." : "입장하기"}
          </button>
        </form>
      </div>
    </div>
  );
}

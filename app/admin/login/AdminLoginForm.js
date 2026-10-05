"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.replace(from);
        router.refresh();
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(data.message || "아이디 또는 비밀번호가 올바르지 않아요.");
    } catch (err) {
      setError("잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-wood-900 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white/95 p-8 shadow-xl">
        <h1 className="text-xl font-bold text-wood-900">관리자 로그인</h1>
        <p className="mt-2 text-sm text-wood-600">
          나만의 가구 관리자 페이지입니다.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input
            type="text"
            autoFocus
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디"
            className="w-full rounded-lg border border-wood-200 bg-white px-4 py-3 text-sm outline-none focus:border-wood-500"
          />
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full rounded-lg border border-wood-200 bg-white px-4 py-3 text-sm outline-none focus:border-wood-500"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full rounded-full bg-wood-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-wood-900 disabled:opacity-50"
          >
            {loading ? "확인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

export default function QuantityInput({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="inline-flex items-center rounded-full border border-wood-200">
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center text-wood-700 disabled:text-wood-300"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="수량 감소"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-medium text-wood-900">{value}</span>
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center text-wood-700 disabled:text-wood-300"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="수량 증가"
      >
        +
      </button>
    </div>
  );
}

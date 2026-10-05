import { describe, it, expect } from "vitest";
import { formatPrice } from "./format";

describe("formatPrice", () => {
  it("천 단위 콤마와 '원'을 붙인다", () => {
    expect(formatPrice(100000)).toBe("100,000원");
  });

  it("0원도 올바르게 표시한다", () => {
    expect(formatPrice(0)).toBe("0원");
  });

  it("백만 단위 이상도 올바르게 표시한다", () => {
    expect(formatPrice(1234567)).toBe("1,234,567원");
  });
});

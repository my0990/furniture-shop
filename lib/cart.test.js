import { describe, it, expect } from "vitest";
import { buildLineId, computeOptionsTotal } from "./cart";

describe("buildLineId", () => {
  it("옵션이 없으면 상품 ID만으로 키를 만든다", () => {
    expect(buildLineId("sofa-1", [])).toBe("sofa-1::");
  });

  it("같은 옵션 조합이면 고른 순서와 무관하게 같은 키를 만든다", () => {
    const a = buildLineId("sofa-1", [
      { groupId: "color", choiceId: "navy" },
      { groupId: "leather", choiceId: "premium" },
    ]);
    const b = buildLineId("sofa-1", [
      { groupId: "leather", choiceId: "premium" },
      { groupId: "color", choiceId: "navy" },
    ]);
    expect(a).toBe(b);
  });

  it("옵션 조합이 다르면 다른 키를 만든다", () => {
    const a = buildLineId("sofa-1", [{ groupId: "color", choiceId: "navy" }]);
    const b = buildLineId("sofa-1", [{ groupId: "color", choiceId: "cream" }]);
    expect(a).not.toBe(b);
  });

  it("상품 ID가 다르면 옵션이 같아도 다른 키를 만든다", () => {
    const a = buildLineId("sofa-1", [{ groupId: "color", choiceId: "navy" }]);
    const b = buildLineId("sofa-2", [{ groupId: "color", choiceId: "navy" }]);
    expect(a).not.toBe(b);
  });
});

describe("computeOptionsTotal", () => {
  it("선택된 옵션들의 추가금액을 합산한다", () => {
    expect(
      computeOptionsTotal([{ priceDelta: 20000 }, { priceDelta: 30000 }])
    ).toBe(50000);
  });

  it("priceDelta가 없는 옵션은 0으로 취급한다", () => {
    expect(computeOptionsTotal([{}, { priceDelta: 10000 }])).toBe(10000);
  });

  it("옵션이 없으면 0을 돌려준다", () => {
    expect(computeOptionsTotal([])).toBe(0);
    expect(computeOptionsTotal(undefined)).toBe(0);
  });
});

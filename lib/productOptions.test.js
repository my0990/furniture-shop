import { describe, it, expect } from "vitest";
import { resolveOptions } from "./productOptions";

function formDataWithOptions(groups) {
  const fd = new FormData();
  fd.set("optionsJson", JSON.stringify(groups));
  return fd;
}

describe("resolveOptions", () => {
  it("이름과 선택지가 모두 있는 그룹만 남긴다", () => {
    const fd = formDataWithOptions([
      { name: "색상", choices: [{ label: "네이비", priceDelta: 0 }] },
      { name: "", choices: [{ label: "빈 그룹 이름", priceDelta: 0 }] },
      { name: "빈 선택지 그룹", choices: [] },
    ]);
    const result = resolveOptions(fd);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("색상");
  });

  it("라벨이 없거나 공백뿐인 선택지는 제거한다", () => {
    const fd = formDataWithOptions([
      {
        name: "색상",
        choices: [
          { label: "네이비", priceDelta: 0 },
          { label: "   ", priceDelta: 0 },
        ],
      },
    ]);
    const result = resolveOptions(fd);
    expect(result[0].choices).toHaveLength(1);
    expect(result[0].choices[0].label).toBe("네이비");
  });

  it("추가금액을 숫자로 변환하고, 잘못된 값은 0으로 처리한다", () => {
    const fd = formDataWithOptions([
      {
        name: "가죽 등급",
        choices: [
          { label: "프리미엄", priceDelta: "30000" },
          { label: "일반", priceDelta: "abc" },
        ],
      },
    ]);
    const result = resolveOptions(fd);
    expect(result[0].choices[0].priceDelta).toBe(30000);
    expect(result[0].choices[1].priceDelta).toBe(0);
  });

  it("optionsJson이 없거나 비어있으면 빈 배열을 돌려준다", () => {
    expect(resolveOptions(new FormData())).toEqual([]);
  });

  it("JSON 형식이 깨져 있으면 빈 배열을 돌려준다", () => {
    const fd = new FormData();
    fd.set("optionsJson", "{이건 올바른 JSON이 아님");
    expect(resolveOptions(fd)).toEqual([]);
  });
});

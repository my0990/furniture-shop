import { describe, it, expect } from "vitest";
import { extractYoutubeId } from "./detailBlocks";

describe("extractYoutubeId", () => {
  it("watch?v= 형식 URL에서 영상 ID를 추출한다", () => {
    expect(extractYoutubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(
      "dQw4w9WgXcQ"
    );
  });

  it("youtu.be 단축 URL에서 영상 ID를 추출한다", () => {
    expect(extractYoutubeId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("embed URL에서 영상 ID를 추출한다", () => {
    expect(extractYoutubeId("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe(
      "dQw4w9WgXcQ"
    );
  });

  it("순수 영상 ID만 입력해도 그대로 인식한다", () => {
    expect(extractYoutubeId("dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("빈 값이나 유튜브 링크가 아니면 빈 문자열을 돌려준다", () => {
    expect(extractYoutubeId("")).toBe("");
    expect(extractYoutubeId("이건 유튜브 링크가 아니에요")).toBe("");
  });
});

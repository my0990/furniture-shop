import { uploadImageToR2 } from "@/lib/r2";

export function extractYoutubeId(input) {
  const str = (input || "").toString().trim();
  if (!str) return "";
  // 이미 순수 11자리 영상 ID만 입력한 경우
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;
  try {
    const url = new URL(str);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.slice(1, 12);
    }
    const v = url.searchParams.get("v");
    if (v) return v.slice(0, 11);
    const match = url.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
    if (match) return match[1];
  } catch (e) {
    // URL 형식이 아니면 무시
  }
  return "";
}

// 관리자 폼에서 넘어온 "detailBlocksJson"(구조)과 블록별 이미지 파일(있으면)을 합쳐서
// 실제로 DB에 저장할 detail_blocks 배열을 만듦
export async function resolveDetailBlocks(formData, folder = "products/detail") {
  const raw = formData.get("detailBlocksJson");
  let blocks = [];
  try {
    blocks = JSON.parse(raw ? raw.toString() : "[]");
  } catch (e) {
    blocks = [];
  }
  if (!Array.isArray(blocks)) blocks = [];

  const resolved = [];
  for (const block of blocks) {
    if (!block || typeof block !== "object") continue;

    if (block.type === "image") {
      const file = formData.get(`detailImage_${block.id}`);
      let url = typeof block.existingUrl === "string" ? block.existingUrl.trim() : "";
      if (file && typeof file === "object" && typeof file.arrayBuffer === "function" && file.size > 0) {
        url = await uploadImageToR2(file, folder);
      }
      if (url) resolved.push({ type: "image", url });
    } else if (block.type === "text") {
      const content = typeof block.content === "string" ? block.content.trim() : "";
      if (content) resolved.push({ type: "text", content });
    } else if (block.type === "youtube") {
      const videoId = extractYoutubeId(typeof block.url === "string" ? block.url : "");
      if (videoId) resolved.push({ type: "youtube", videoId });
    }
  }
  return resolved;
}

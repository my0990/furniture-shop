"use client";

import { useEffect, useState } from "react";

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2);
}

function ImageBlockField({ block }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  }

  const displaySrc = previewUrl || block.url || "";

  return (
    <div>
      {displaySrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={displaySrc}
          alt=""
          className="h-32 w-full max-w-xs rounded-lg border border-wood-200 object-cover"
        />
      )}
      <input
        type="file"
        name={`detailImage_${block.id}`}
        accept="image/*"
        onChange={handleFile}
        className="mt-2 block w-full text-sm text-wood-600 file:mr-3 file:rounded-full file:border-0 file:bg-wood-800 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-wood-900"
      />
      <p className="mt-1 text-xs text-wood-400">
        {block.url
          ? "새 이미지를 선택하지 않으면 기존 이미지를 그대로 사용해요."
          : "5MB 이하 이미지를 선택해주세요."}
      </p>
    </div>
  );
}

const TYPE_LABEL = { image: "이미지", text: "텍스트", youtube: "유튜브 영상" };

export default function DetailBlocksEditor({ initialBlocks }) {
  const [blocks, setBlocks] = useState(() =>
    (initialBlocks || []).map((b) => ({
      id: b.id || makeId(),
      type: b.type,
      content: b.type === "text" ? b.content || "" : "",
      url: b.type === "image" ? b.url || "" : b.type === "youtube" ? b.videoId || "" : "",
    }))
  );

  function addBlock(type) {
    setBlocks((prev) => [...prev, { id: makeId(), type, content: "", url: "" }]);
  }

  function updateBlock(blockId, field, value) {
    setBlocks((prev) => prev.map((b) => (b.id === blockId ? { ...b, [field]: value } : b)));
  }

  function removeBlock(blockId) {
    setBlocks((prev) => prev.filter((b) => b.id !== blockId));
  }

  function moveBlock(blockId, direction) {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === blockId);
      const targetIndex = index + direction;
      if (index === -1 || targetIndex < 0 || targetIndex >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  }

  const serializedBlocks = blocks.map((b) => {
    if (b.type === "image") return { id: b.id, type: "image", existingUrl: b.url || "" };
    if (b.type === "text") return { id: b.id, type: "text", content: b.content || "" };
    if (b.type === "youtube") return { id: b.id, type: "youtube", url: b.url || "" };
    return null;
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-wood-700">
          상세 콘텐츠 (선택, 상품 상세페이지 설명 아래에 순서대로 표시돼요)
        </label>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => addBlock("image")}
          className="rounded-full border border-wood-300 px-3 py-1 text-xs font-medium text-wood-700 transition hover:bg-wood-100"
        >
          + 이미지 추가
        </button>
        <button
          type="button"
          onClick={() => addBlock("text")}
          className="rounded-full border border-wood-300 px-3 py-1 text-xs font-medium text-wood-700 transition hover:bg-wood-100"
        >
          + 텍스트 추가
        </button>
        <button
          type="button"
          onClick={() => addBlock("youtube")}
          className="rounded-full border border-wood-300 px-3 py-1 text-xs font-medium text-wood-700 transition hover:bg-wood-100"
        >
          + 유튜브 추가
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {blocks.map((block, index) => (
          <div key={block.id} className="rounded-lg border border-wood-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-wood-500">
                {index + 1}. {TYPE_LABEL[block.type] || block.type}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveBlock(block.id, -1)}
                  disabled={index === 0}
                  className="rounded-full border border-wood-200 px-2 py-1 text-xs text-wood-600 transition hover:bg-wood-100 disabled:opacity-30"
                >
                  위로
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(block.id, 1)}
                  disabled={index === blocks.length - 1}
                  className="rounded-full border border-wood-200 px-2 py-1 text-xs text-wood-600 transition hover:bg-wood-100 disabled:opacity-30"
                >
                  아래로
                </button>
                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  className="rounded-full border border-red-300 px-2 py-1 text-xs text-red-600 transition hover:bg-red-50"
                >
                  삭제
                </button>
              </div>
            </div>

            <div className="mt-3">
              {block.type === "image" && (
                <ImageBlockField block={block} />
              )}
              {block.type === "text" && (
                <textarea
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, "content", e.target.value)}
                  rows={4}
                  placeholder="상품 설명, 소재 안내 등 자유롭게 입력하세요."
                  className="w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
                />
              )}
              {block.type === "youtube" && (
                <input
                  type="text"
                  value={block.url}
                  onChange={(e) => updateBlock(block.id, "url", e.target.value)}
                  placeholder="유튜브 영상 URL (예: https://www.youtube.com/watch?v=xxxxxxxxxxx)"
                  className="w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <input
        type="hidden"
        name="detailBlocksJson"
        value={JSON.stringify(serializedBlocks)}
        readOnly
      />
    </div>
  );
}

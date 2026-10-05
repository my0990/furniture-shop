"use client";

import { useEffect, useState } from "react";

export default function ImageFilePicker({ currentImage, label = "이미지" }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  // 컴포넌트가 사라지거나 새 파일을 고를 때 이전 미리보기 URL을 정리
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleChange(e) {
    const file = e.target.files?.[0];
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  }

  const displaySrc = previewUrl || currentImage || "";

  return (
    <div>
      <label className="block text-sm font-medium text-wood-700">{label}</label>
      {displaySrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={displaySrc}
          alt=""
          className="mt-2 h-24 w-24 rounded-lg border border-wood-200 object-cover"
        />
      )}
      <input
        type="file"
        name="imageFile"
        accept="image/*"
        onChange={handleChange}
        className="mt-2 block w-full text-sm text-wood-600 file:mr-3 file:rounded-full file:border-0 file:bg-wood-800 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-wood-900"
      />
      <input type="hidden" name="currentImage" defaultValue={currentImage || ""} />
      <p className="mt-1 text-xs text-wood-400">
        {previewUrl
          ? "선택한 이미지 미리보기예요. 저장을 눌러야 실제로 반영돼요."
          : currentImage
          ? "새 이미지를 선택하지 않으면 기존 이미지를 그대로 사용해요."
          : "5MB 이하 이미지를 선택해주세요."}
      </p>
    </div>
  );
}

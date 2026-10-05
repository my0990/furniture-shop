"use client";

export default function ConfirmSubmitButton({ children, confirmMessage, className }) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(confirmMessage || "정말 삭제하시겠어요?")) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}

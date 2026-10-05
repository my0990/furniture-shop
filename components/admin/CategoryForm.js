import ImageFilePicker from "@/components/admin/ImageFilePicker";

export default function CategoryForm({ action, initial, slugEditable = true }) {
  const c = initial || {};

  return (
    <form
      action={action}
      className="mt-6 max-w-xl space-y-4 rounded-xl border border-wood-200 bg-white p-6"
    >
      <div>
        <label className="block text-sm font-medium text-wood-700">Slug</label>
        <input
          type="text"
          name="slug"
          defaultValue={c.slug || ""}
          readOnly={!slugEditable}
          required
          placeholder="living-room"
          className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm read-only:bg-wood-50 read-only:text-wood-400"
        />
        {!slugEditable && (
          <p className="mt-1 text-xs text-wood-400">Slug는 수정할 수 없어요.</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-wood-700">이름</label>
        <input
          type="text"
          name="name"
          defaultValue={c.name || ""}
          required
          className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-wood-700">설명</label>
        <textarea
          name="description"
          rows={2}
          defaultValue={c.description || ""}
          className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
        />
      </div>

      <ImageFilePicker currentImage={c.image} label="카테고리 이미지" />

      <div>
        <label className="block text-sm font-medium text-wood-700">
          정렬 순서 (작을수록 먼저 표시)
        </label>
        <input
          type="number"
          name="sortOrder"
          defaultValue={c.sortOrder ?? 0}
          className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-wood-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-wood-900"
      >
        저장
      </button>
    </form>
  );
}

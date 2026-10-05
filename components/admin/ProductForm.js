import ImageFilePicker from "@/components/admin/ImageFilePicker";
import ProductOptionsEditor from "@/components/admin/ProductOptionsEditor";
import DetailBlocksEditor from "@/components/admin/DetailBlocksEditor";

export default function ProductForm({ action, categories, initial, idEditable = true }) {
  const p = initial || {};

  return (
    <form
      action={action}
      className="mt-6 max-w-2xl space-y-4 rounded-xl border border-wood-200 bg-white p-6"
    >
      <div>
        <label className="block text-sm font-medium text-wood-700">상품 ID</label>
        <input
          type="text"
          name="id"
          defaultValue={p.id || ""}
          readOnly={!idEditable}
          required
          className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm read-only:bg-wood-50 read-only:text-wood-400"
        />
        {!idEditable && (
          <p className="mt-1 text-xs text-wood-400">ID는 수정할 수 없어요.</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-wood-700">이름</label>
        <input
          type="text"
          name="name"
          defaultValue={p.name || ""}
          required
          className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-wood-700">카테고리</label>
        <select
          name="category"
          defaultValue={p.category || ""}
          required
          className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
        >
          <option value="" disabled>
            선택해주세요
          </option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-wood-700">가격 (원)</label>
          <input
            type="number"
            name="price"
            min="0"
            defaultValue={p.price ?? ""}
            required
            className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-wood-700">
            정가 (할인 전, 선택)
          </label>
          <input
            type="number"
            name="originalPrice"
            min="0"
            defaultValue={p.originalPrice ?? ""}
            className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <ImageFilePicker currentImage={p.image} label="상품 이미지" />

      <div>
        <label className="block text-sm font-medium text-wood-700">설명</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={p.description || ""}
          className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-wood-700">
          태그 (쉼표로 구분, 예: bestseller, new)
        </label>
        <input
          type="text"
          name="tags"
          defaultValue={(p.tags || []).join(", ")}
          placeholder="bestseller, new"
          className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
        />
      </div>

      <ProductOptionsEditor initialOptions={p.options} />

      <DetailBlocksEditor initialBlocks={p.detailBlocks} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-wood-700">평점 (0~5)</label>
          <input
            type="number"
            name="rating"
            min="0"
            max="5"
            step="0.1"
            defaultValue={p.rating ?? 0}
            className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-wood-700">리뷰 수</label>
          <input
            type="number"
            name="reviewCount"
            min="0"
            defaultValue={p.reviewCount ?? 0}
            className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
          />
        </div>
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

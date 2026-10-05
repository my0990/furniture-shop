import { getSiteSettings } from "@/data/settings";
import { updateSettingsAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold text-wood-900">매장 정보</h1>
      <p className="mt-2 text-sm text-wood-600">
        푸터에 표시되는 매장 정보를 수정해요.
      </p>

      <form
        action={updateSettingsAction}
        className="mt-6 max-w-xl space-y-4 rounded-xl border border-wood-200 bg-white p-6"
      >
        <div>
          <label className="block text-sm font-medium text-wood-700">회사명</label>
          <input
            type="text"
            name="companyName"
            defaultValue={settings.companyName}
            required
            className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-wood-700">태그라인</label>
          <input
            type="text"
            name="tagline"
            defaultValue={settings.tagline}
            className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-wood-700">전화번호</label>
            <input
              type="text"
              name="phone"
              defaultValue={settings.phone}
              className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-wood-700">이메일</label>
            <input
              type="email"
              name="email"
              defaultValue={settings.email}
              className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-wood-700">대표자명</label>
            <input
              type="text"
              name="ceoName"
              defaultValue={settings.ceoName}
              className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-wood-700">
              사업자등록번호
            </label>
            <input
              type="text"
              name="businessNumber"
              defaultValue={settings.businessNumber}
              className="mt-1 w-full rounded-lg border border-wood-200 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-wood-700">주소</label>
          <input
            type="text"
            name="address"
            defaultValue={settings.address}
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
    </div>
  );
}

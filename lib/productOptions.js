// 관리자 폼에서 넘어온 옵션 그룹 JSON을 정리(빈 값 제거, 금액 숫자화).
// DB/서버 환경과 무관한 순수 함수라 독립적으로 테스트하기 쉬움.
export function resolveOptions(formData) {
  const raw = formData.get("optionsJson");
  let groups = [];
  try {
    groups = JSON.parse(raw ? raw.toString() : "[]");
  } catch (e) {
    groups = [];
  }
  if (!Array.isArray(groups)) return [];

  return groups
    .map((g) => {
      const name = (g?.name || "").toString().trim();
      const choices = Array.isArray(g?.choices)
        ? g.choices
            .map((c) => ({
              id: (c?.id || "").toString() || undefined,
              label: (c?.label || "").toString().trim(),
              priceDelta: Number.isFinite(Number(c?.priceDelta)) ? Number(c.priceDelta) : 0,
            }))
            .filter((c) => c.label.length > 0)
        : [];
      return { id: (g?.id || "").toString() || undefined, name, choices };
    })
    .filter((g) => g.name.length > 0 && g.choices.length > 0);
}

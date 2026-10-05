// 장바구니 관련 순수 로직. React 상태와 무관해서 독립적으로 테스트하기 쉬움.

// 같은 상품이라도 고른 옵션 조합이 다르면 장바구니에서 다른 줄로 취급하기 위한 키
export function buildLineId(productId, selectedOptions) {
  const optionKey = (selectedOptions || [])
    .map((o) => `${o.groupId}:${o.choiceId}`)
    .sort()
    .join("|");
  return `${productId}::${optionKey}`;
}

// 선택된 옵션들의 추가금액 합계
export function computeOptionsTotal(selectedOptions) {
  return (selectedOptions || []).reduce((sum, o) => sum + (o.priceDelta || 0), 0);
}

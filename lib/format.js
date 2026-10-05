// DB/서버 환경과 무관한 순수 포맷 함수. 테스트에서 독립적으로 가져다 쓸 수 있도록 분리함.
export function formatPrice(value) {
  return value.toLocaleString("ko-KR") + "원";
}

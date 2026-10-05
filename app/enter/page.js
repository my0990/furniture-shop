import { Suspense } from "react";
import EnterForm from "./EnterForm";

export const metadata = {
  title: "입장 코드 확인 - 나만의 가구",
  description: "비공개 매장 입장 코드를 입력해주세요.",
};

export default function EnterPage() {
  return (
    <Suspense fallback={null}>
      <EnterForm />
    </Suspense>
  );
}

# 나만의 가구 — 가구 온라인 쇼핑몰

Next.js 14 (App Router) + JavaScript + Tailwind CSS로 만든 가구 쇼핑몰 데모 프로젝트입니다.

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속

> 이 프로젝트는 이 대화 환경에서 npm 패키지 레지스트리 접근이 막혀 있어 `npm install`을 미리 실행/검증하지 못했습니다.
> 소스 코드 자체는 문법 검사를 통과했지만, 사용자의 컴퓨터에서 `npm install` 후 최초 실행 시 발생하는 에러가 있다면 알려주세요.

## 포함된 기능

- 홈페이지: 히어로 배너, 카테고리 바로가기, 베스트셀러/신상품 섹션
- 전체 상품 목록 (`/products`): 카테고리 필터, 정렬(베스트순/신상품순/가격순)
- 카테고리별 목록 (`/category/[slug]`)
- 상품 상세 (`/products/[id]`): 색상/수량 선택, 장바구니 담기, 바로 구매
- 장바구니 (`/cart`): 수량 변경, 삭제, 배송비/합계 계산, `localStorage`에 저장되어 새로고침해도 유지됨
- 반응형 레이아웃 (모바일/데스크톱)

## 상품 이미지

`public/images`의 대부분 사진은 Wikimedia Commons / Openverse의 재사용 가능한 라이선스 사진으로 교체되어 있습니다. 출처와 라이선스는 [CREDITS.md](./CREDITS.md)를 참고하세요. 거실장(`living-tvstand`)과 암체어(`living-armchair`) 2개 상품만 적합한 무료 실사 사진을 찾지 못해 자체 제작한 일러스트를 그대로 사용했습니다.

## 폴더 구조

```
app/                라우트 (홈, 상품, 카테고리, 장바구니)
components/         재사용 UI 컴포넌트
context/CartContext.js   장바구니 전역 상태 (Context + localStorage)
data/                목업 상품/카테고리 데이터
public/images/       플레이스홀더 상품 이미지 (Pillow로 생성한 목업 이미지)
scripts/gen-images.py    플레이스홀더 이미지 재생성 스크립트 (선택)
```

## 비공개 매장 입장 코드

이 사이트는 아무나 못 들어오게, 처음 접속 시 입장 코드를 입력해야 하는 화면(`/enter`)이 떠요. `middleware.js`가 쿠키를 확인해서, 코드를 맞게 입력하지 않으면 어떤 페이지에도 못 들어가게 막아요.

코드는 `.env.local` 파일의 `SITE_ACCESS_CODE`에 설정되어 있고, 이 값을 바꾸면 새 코드로 바로 적용돼요(재배포 필요). Vercel에 배포할 때는 프로젝트 Settings → Environment Variables에서 `SITE_ACCESS_CODE`와 `SITE_ACCESS_TOKEN` 두 값을 로컬 `.env.local`과 동일하게 등록해줘야 실제 배포 사이트에서도 작동해요. `SITE_ACCESS_TOKEN`은 사람이 입력하는 코드가 아니라 쿠키에 저장되는 내부용 비밀 값이라, 노출되지 않게 주의하세요.

## 실제 서비스로 발전시키려면

- `data/products.js`의 목업 데이터를 실제 DB(Supabase, PlanetScale 등)나 헤드리스 커머스 API로 교체
- `public/images`의 플레이스홀더 이미지를 실제 상품 사진으로 교체
- `app/cart/page.js`의 "주문하기" 버튼에 실제 결제 연동(토스페이먼츠, 아임포트 등) 추가
- 로그인/회원가입, 주문 내역, 리뷰 작성 등 기능 확장

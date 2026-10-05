/**
 * Neon DB 스키마를 준비/갱신하는 마이그레이션 스크립트.
 * 실행: npm run db:seed  (내부적으로 node --env-file=.env.local scripts/seed.js)
 *
 * 원래는 목업 데이터까지 함께 넣어주는 시드 스크립트였지만, 지금은 상품/카테고리/설정을
 * 전부 관리자 화면(/admin)에서 DB로 직접 관리하기 때문에 데이터를 다시 채워 넣지는 않아요.
 * 이 스크립트는 "테이블이 없으면 만들고, 새로 추가된 컬럼이 없으면 추가하는" 역할만 해요.
 * 여러 번 실행해도 안전해요 (이미 있으면 건드리지 않음).
 */
const fs = require("fs");
const path = require("path");
const { neon } = require("@neondatabase/serverless");

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL이 설정되어 있지 않아요. .env.local을 확인해주세요.");
  }
  const sql = neon(process.env.DATABASE_URL);

  console.log("1) 테이블 생성 중 (없으면)...");
  const schema = fs.readFileSync(path.join(__dirname, "../db/schema.sql"), "utf8");
  // neon()의 sql``은 한 번에 하나의 statement만 받기 때문에 세미콜론 기준으로 나눠서 실행
  const statements = schema
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
  for (const statement of statements) {
    await sql(statement);
  }

  console.log("2) 새로 추가된 컬럼 반영 중 (없으면)...");
  await sql(
    `ALTER TABLE products ADD COLUMN IF NOT EXISTS options JSONB NOT NULL DEFAULT '[]'`
  );
  await sql(
    `ALTER TABLE products ADD COLUMN IF NOT EXISTS detail_blocks JSONB NOT NULL DEFAULT '[]'`
  );

  console.log("3) 사이트 설정(푸터 정보) 기본값 저장 중 (없으면)...");
  await sql(
    `INSERT INTO site_settings (id, company_name, tagline, phone, email, ceo_name, business_number, address)
     VALUES (1, $1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (id) DO NOTHING`,
    [
      "나만의 가구",
      "집을 완성하는 가구 편집숍, 나만의 가구입니다. 합리적인 가격의 좋은 가구를 소개합니다.",
      "1544-0000 (평일 09:00 - 18:00)",
      "help@myfurniture.example",
      "홍길동",
      "000-00-00000",
      "서울특별시 성동구 가구로 123",
    ]
  );

  console.log("완료! DB 스키마가 최신 상태예요.");
}

main().catch((err) => {
  console.error("마이그레이션 스크립트 실패:", err);
  process.exit(1);
});

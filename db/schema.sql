-- 나만의 가구 DB 스키마 (Neon Postgres)

CREATE TABLE IF NOT EXISTS categories (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL REFERENCES categories(slug) ON DELETE RESTRICT,
  price INTEGER NOT NULL,
  original_price INTEGER,
  image TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  rating NUMERIC(2,1) NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  colors TEXT[] NOT NULL DEFAULT '{}',
  -- 옵션 그룹 목록. 예: [{"id":"color","name":"색상","choices":[{"id":"navy","label":"네이비","priceDelta":0}]}]
  options JSONB NOT NULL DEFAULT '[]',
  -- 상세페이지에 순서대로 보여줄 콘텐츠 블록. 예: [{"type":"image","url":"..."},{"type":"text","content":"..."},{"type":"youtube","videoId":"..."}]
  detail_blocks JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 푸터/회사 정보: 항상 id=1인 행 하나만 사용
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  company_name TEXT NOT NULL DEFAULT '나만의 가구',
  tagline TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  ceo_name TEXT NOT NULL DEFAULT '',
  business_number TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  CONSTRAINT single_row CHECK (id = 1)
);

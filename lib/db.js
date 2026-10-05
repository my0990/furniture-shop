import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL 환경변수가 설정되어 있지 않아요. .env.local(로컬)이나 Vercel 환경변수(배포)에 추가해주세요."
  );
}

// Neon의 서버리스 드라이버: TCP 커넥션 풀 없이 HTTP로 쿼리하기 때문에
// Next.js 서버리스/엣지 환경에 잘 맞음
export const sql = neon(process.env.DATABASE_URL);

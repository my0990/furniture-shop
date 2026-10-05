/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 상품/카테고리 이미지는 Cloudflare R2 Public Development URL(*.r2.dev)에서 제공돼요.
    // 커스텀 도메인을 연결했다면 그 도메인도 여기에 추가해주세요.
    remotePatterns: [{ protocol: "https", hostname: "*.r2.dev" }],
  },
  experimental: {
    serverActions: {
      // 상품 이미지 업로드를 위해 기본 1MB 제한을 늘려요.
      bodySizeLimit: "10mb",
    },
  },
};

module.exports = nextConfig;

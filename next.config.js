/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 목업 이미지는 public/ 폴더의 로컬 파일만 사용하므로 별도 remotePatterns 설정은 필요 없음.
    // 실제 서비스에서 외부 이미지 CDN(예: S3, Cloudinary)을 쓰게 되면 여기에 도메인을 추가하세요.
    // remotePatterns: [{ protocol: 'https', hostname: 'your-cdn.com' }],
  },
};

module.exports = nextConfig;

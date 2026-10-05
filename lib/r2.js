import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5MB

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} 환경변수가 설정되어 있지 않아요. .env.local(로컬)이나 Vercel 환경변수(배포)에 추가해주세요.`
    );
  }
  return value;
}

let cachedClient = null;

function getR2Client() {
  if (cachedClient) return cachedClient;

  const accountId = getRequiredEnv("R2_ACCOUNT_ID");
  const accessKeyId = getRequiredEnv("R2_ACCESS_KEY_ID");
  const secretAccessKey = getRequiredEnv("R2_SECRET_ACCESS_KEY");

  cachedClient = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
  return cachedClient;
}

// 업로드된 File을 R2에 저장하고 공개 URL을 돌려줌
export async function uploadImageToR2(file, folder = "uploads") {
  if (!file || typeof file.arrayBuffer !== "function") {
    throw new Error("올바른 이미지 파일이 아니에요.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("이미지 용량은 5MB를 넘을 수 없어요.");
  }

  const bucket = getRequiredEnv("R2_BUCKET_NAME");
  const publicUrlBase = getRequiredEnv("R2_PUBLIC_URL").replace(/\/$/, "");

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = (file.name?.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const key = `${folder}/${crypto.randomUUID()}.${ext}`;

  const client = getR2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
    })
  );

  return `${publicUrlBase}/${key}`;
}

// Server Action에서 온 FormData를 보고 "새로 올린 파일"이 있으면 업로드하고,
// 없으면 기존 이미지(hidden input currentImage)를 그대로 유지
export async function resolveImageField(formData, folder) {
  const file = formData.get("imageFile");
  if (file && typeof file === "object" && typeof file.arrayBuffer === "function" && file.size > 0) {
    return uploadImageToR2(file, folder);
  }
  return formData.get("currentImage")?.toString().trim() || "";
}

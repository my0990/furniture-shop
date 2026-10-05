import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      // Vitest는 Fast Refresh가 필요 없어서(HMR 비활성) 추가로 적용할 babel 플러그인이
      // 없으면 @vitejs/plugin-react가 자체 JSX 변환을 건너뛰고 esbuild에 맡겨버림.
      // 근데 esbuild 기본 transform은 .ts/.tsx만 대상이라 .js 안의 JSX(컴포넌트 파일들)는
      // 그대로 통과돼서 파싱 에러가 났던 것. 더미 babel 플러그인을 넣어서 babel이
      // .js/.jsx 전부에 대해 항상 JSX를 변환하도록 강제함.
      babel: {
        plugins: [() => ({ visitor: {} })],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
    globals: true,
    exclude: ["node_modules", ".next", "scripts/**"],
  },
});

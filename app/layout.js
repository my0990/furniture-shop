import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { getAllCategories } from "@/data/categories";
import { getSiteSettings } from "@/data/settings";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "나만의 가구 | 가구 온라인 쇼핑몰",
  description: "합리적인 가격의 좋은 가구를 만나는 곳, 나만의 가구.",
};

export default async function RootLayout({ children }) {
  const [categories, settings] = await Promise.all([
    getAllCategories(),
    getSiteSettings(),
  ]);

  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col bg-white font-sans antialiased">
        <CartProvider>
          <Header categories={categories} />
          <main className="flex-1">{children}</main>
          <Footer categories={categories} settings={settings} />
        </CartProvider>
      </body>
    </html>
  );
}

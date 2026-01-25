import type { Metadata } from "next";
import { Header } from "@/components/public/Header/Header";
import { Footer } from "@/components/public/Footer/Footer";
import "@/styles/variables.css";
import "./layout.css";

export const metadata: Metadata = {
  title: {
    default: "CRAYTE STUDIO - デジタルソリューションカンパニー",
    template: "%s | CRAYTE STUDIO",
  },
  description:
    "Web制作、イベント企画・運営、映像制作を手がけるデジタルソリューションカンパニー。東京・渋谷を拠点に、クライアントの潜在ニーズを引き出すプロジェクト設計を行います。",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
}

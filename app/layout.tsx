import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BU Renhao｜AI 数据项目经理",
  description:
    "BU Renhao 的个人作品集，聚焦 AI 数据项目管理、自动驾驶数据生产、数据运营体系建设及 AI 工具实践。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

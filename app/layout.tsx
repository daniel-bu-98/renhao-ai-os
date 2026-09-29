import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BU Renhao｜个人空间",
  description:
    "BU Renhao 的个人空间，从职业经历出发，为学术、生活与兴趣的记录留出空间。",
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

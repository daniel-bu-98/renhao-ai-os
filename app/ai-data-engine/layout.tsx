import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Operation · AI Data Engine｜BU Renhao",
  description: "AI Data Engine 的 Data Operation 方法论文档。",
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return children;
}

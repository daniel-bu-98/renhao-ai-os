import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Renhao | AI Data, AI Product, Project Management",
  description:
    "Personal portfolio for Renhao, an AI Data, AI Product, and Project Management professional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

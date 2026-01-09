import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "个人主页 - Lrain",
  description: "手绘风格的个人主页",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#FFFDF8" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="个人, 前端, 作品, 手绘, Lrain" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Noto+Sans+SC:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`font-sans antialiased`}>
        <a href="#main-content" className="skip-link">跳到主要内容</a>
        {children}
      </body>
    </html>
  );
}

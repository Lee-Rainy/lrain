import type { Metadata } from "next";
import { Patrick_Hand, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwritten",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "个人主页 - Lrain",
  description: "手绘风格的个人主页",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#FFFDF8" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="个人, 前端, 作品, 手绘, Lrain" />
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body
        className={`${notoSansSC.variable} ${patrickHand.variable} font-sans antialiased`}
      >
        <a href="#main-content" className="skip-link">
          跳到主要内容
        </a>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

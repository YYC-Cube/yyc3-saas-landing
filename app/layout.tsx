import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "YYC³ - 万象归元于云枢，深栈智启新纪元",
  description:
    "YYC³ 现代化 SaaS 解决方案 - 智能驱动业务增长，言语拓展创新领域。企业级云平台助力数字化转型。",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/yyc3-icons/favicon.ico", sizes: "48x48" },
      { url: "/yyc3-icons/yyc3_16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/yyc3-icons/yyc3_32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/yyc3-icons/yyc3_192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/yyc3-icons/yyc3_512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  )
}

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
  description: "YYC³ 现代化 SaaS 解决方案 - 智能驱动业务增长，言语拓展创新领域。企业级云平台助力数字化转型。",
  generator: "v0.app",
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

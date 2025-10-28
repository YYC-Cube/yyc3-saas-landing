import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "./ClientLayout"

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
  return <ClientLayout>{children}</ClientLayout>
}

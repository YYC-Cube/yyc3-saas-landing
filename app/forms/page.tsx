import { Suspense } from "react"
import SmartFormBuilder from "@/components/forms/smart-form-builder"

export const metadata = {
  title: "智能表单系统 - YYC³",
  description: "AI驱动的智能表单生成与数据采集系统",
}

export default function FormsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">智能表单系统</h1>
          <p className="text-muted-foreground">AI 自动生成表单，智能验证与数据采集</p>
        </div>

        <Suspense fallback={<div>加载中...</div>}>
          <SmartFormBuilder />
        </Suspense>
      </div>
    </div>
  )
}

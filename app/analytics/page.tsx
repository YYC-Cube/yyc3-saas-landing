import { AIAnalyticsChat } from "@/components/ai-analytics-chat"
import { Header } from "@/components/header"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-5xl mx-auto">
          {/* 页面标题 */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              智能数据分析助手
            </h1>
            <p className="text-muted-foreground text-lg">通过自然语言与您的数据对话，获取实时洞察与可视化分析</p>
          </div>

          {/* 聊天界面 */}
          <AIAnalyticsChat />
        </div>
      </main>
    </div>
  )
}

import { AIMonitoringDashboard } from "@/components/ai-monitoring-dashboard"

export const metadata = {
  title: "AI 使用监控 - YYC³",
  description: "监控 AI 功能使用情况、性能指标和成本分析",
}

export default function MonitoringPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI 使用监控</h1>
        <p className="text-muted-foreground">实时监控 AI 功能使用情况、性能指标和成本分析</p>
      </div>

      <AIMonitoringDashboard />
    </div>
  )
}

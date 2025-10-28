import { SecurityAuditDashboard } from "@/components/security-audit-dashboard"

export const metadata = {
  title: "安全审计 - YYC³",
  description: "查看安全审计日志和异常检测报告",
}

export default function AuditPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">安全审计</h1>
        <p className="text-muted-foreground">查看系统安全事件、审计日志和异常检测报告</p>
      </div>

      <SecurityAuditDashboard />
    </div>
  )
}

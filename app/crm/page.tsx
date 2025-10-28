import { Suspense } from "react"
import CustomerLifecycleManager from "@/components/crm/customer-lifecycle-manager"

export const metadata = {
  title: "智能客户管理 - YYC³",
  description: "全生命周期客户管理系统",
}

export default function CRMPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">智能客户管理</h1>
          <p className="text-muted-foreground">从客资到成交，AI 驱动的全生命周期客户运维系统</p>
        </div>

        <Suspense fallback={<div>加载中...</div>}>
          <CustomerLifecycleManager />
        </Suspense>
      </div>
    </div>
  )
}

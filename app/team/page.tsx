import { Suspense } from "react"
import TeamManagementHub from "@/components/team/team-management-hub"

export const metadata = {
  title: "智能团队管理 - YYC³",
  description: "AI驱动的团队管理与绩效系统",
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">智能团队管理</h1>
          <p className="text-muted-foreground">组织架构、日报表、绩效考核、智能奖惩一体化管理</p>
        </div>

        <Suspense fallback={<div>加载中...</div>}>
          <TeamManagementHub />
        </Suspense>
      </div>
    </div>
  )
}

import { AICollaborationHub } from "@/components/ai-collaboration-hub"

export const metadata = {
  title: "AI 协作中心 - YYC³",
  description: "智能会议纪要生成、任务分配与团队协作",
}

export default function CollaborationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <AICollaborationHub />
    </div>
  )
}

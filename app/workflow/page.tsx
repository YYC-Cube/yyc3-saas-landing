import { AIWorkflowAutomation } from "@/components/ai-workflow-automation"

export const metadata = {
  title: "智能工作流自动化 - YYC³",
  description: "使用 AI 驱动的工作流自动化，优化业务流程，提升团队效率",
}

export default function WorkflowPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            智能工作流自动化
          </h1>
          <p className="text-muted-foreground text-lg">设计、执行和优化您的业务流程，让 AI 帮助您发现效率提升机会</p>
        </div>

        <AIWorkflowAutomation />
      </div>
    </div>
  )
}

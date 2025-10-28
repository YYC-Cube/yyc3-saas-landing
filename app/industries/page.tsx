import type { Metadata } from "next"
import IndustrySolutionsHub from "@/components/industries/industry-solutions-hub"

export const metadata: Metadata = {
  title: "行业解决方案 - YYC³ 智能平台",
  description: "为24个不同行业提供深度定制的 AI 智能解决方案",
}

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <IndustrySolutionsHub />
    </div>
  )
}

import { AICustomerSupport } from "@/components/ai-customer-support"

export const metadata = {
  title: "智能客服 - YYC³",
  description: "24/7 AI 智能客服，即时解答您的问题",
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              智能客服中心
            </h1>
            <p className="text-muted-foreground text-lg">24/7 全天候 AI 智能客服，为您提供即时帮助</p>
          </div>

          <AICustomerSupport />
        </div>
      </div>
    </div>
  )
}

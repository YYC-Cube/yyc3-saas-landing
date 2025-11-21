"use client"

import { useChat } from "@ai-sdk/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Loader2, Send, Bot, User, FileText, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function AICustomerSupport() {
  const [userId] = useState("demo-user-001") // 实际应用中从认证系统获取

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/ai/customer-support",
    body: { userId },
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "您好！我是 YYC³ 的 AI 智能客服助手。我可以帮您解答关于产品功能、账户管理、技术支持等问题。请问有什么可以帮助您的吗？",
      },
    ],
  })

  const [showKnowledgeBase, setShowKnowledgeBase] = useState(false)

  const commonQuestions = [
    { q: "如何升级我的订阅方案？", category: "账户管理" },
    { q: "数据分析功能如何使用？", category: "产品功能" },
    { q: "如何重置密码？", category: "账户安全" },
    { q: "支持哪些支付方式？", category: "计费问题" },
  ]

  const handleQuickQuestion = (question: string) => {
    handleInputChange({ target: { value: question } } as any)
    setTimeout(() => {
      const form = document.querySelector("form")
      if (form) {
        form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
      }
    }, 100)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 主聊天区域 */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI 客服助手
          </CardTitle>
          <CardDescription>智能理解您的问题，提供即时解答和解决方案</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 聊天消息区域 */}
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>

                      {/* 显示工具调用结果 */}
                      {message.toolInvocations?.map((tool, idx) => (
                        <div key={idx} className="mt-2 pt-2 border-t border-border/50">
                          <Badge variant="outline" className="text-xs">
                            {tool.toolName === "createTicket" && "已创建工单"}
                            {tool.toolName === "searchKnowledge" && "知识库检索"}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    {message.role === "user" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-lg px-4 py-3">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* 错误提示 */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>抱歉，发生了错误。请稍后重试或联系人工客服。</AlertDescription>
              </Alert>
            )}

            {/* 输入区域 */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="输入您的问题..."
                disabled={isLoading}
                className="flex-1"
                maxLength={500}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center">AI 助手可能会出错，重要信息请核实或联系人工客服</p>
          </div>
        </CardContent>
      </Card>

      {/* 侧边栏 - 常见问题和快捷操作 */}
      <div className="space-y-6">
        {/* 常见问题 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">常见问题</CardTitle>
            <CardDescription>点击快速提问</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {commonQuestions.map((item, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 bg-transparent"
                  onClick={() => handleQuickQuestion(item.q)}
                  disabled={isLoading}
                >
                  <div className="flex flex-col items-start gap-1">
                    <Badge variant="secondary" className="text-xs mb-1">
                      {item.category}
                    </Badge>
                    <span className="text-sm">{item.q}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 帮助资源 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">帮助资源</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setShowKnowledgeBase(!showKnowledgeBase)}
              >
                <FileText className="h-4 w-4 mr-2" />
                知识库文档
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                联系人工客服
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 服务状态 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">服务状态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">响应时间</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                  正常
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">AI 服务</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                  在线
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">平均响应</span>
                <span className="text-sm font-medium">2 秒</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

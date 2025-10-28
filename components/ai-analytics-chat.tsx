"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Send, Sparkles, BarChart3, TrendingUp, AlertCircle, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { DataChart } from "@/components/data-chart"

export function AIAnalyticsChat() {
  const [input, setInput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, reload } = useChat<UIMessage>({
    transport: new DefaultChatTransport({ api: "/api/ai/analytics" }),
    onError: (error) => {
      console.error("[v0] Chat error:", error)
      setError("抱歉，分析请求失败。请稍后重试。")
    },
  })

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 清除错误提示
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === "in_progress") return

    setError(null)
    sendMessage({ text: input })
    setInput("")
  }

  const handleRetry = () => {
    setError(null)
    reload()
  }

  // 快捷问题示例
  const quickQuestions = [
    { icon: TrendingUp, text: "显示本月销售额趋势", color: "text-blue-400" },
    { icon: BarChart3, text: "分析用户增长情况", color: "text-green-400" },
    { icon: Sparkles, text: "本季度收入对比", color: "text-purple-400" },
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-h-[800px]">
      {/* 错误提示 */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4"
          >
            <Card className="p-4 bg-destructive/10 border-destructive/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleRetry} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                重试
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 消息列表区域 */}
      <Card className="flex-1 overflow-hidden flex flex-col bg-card/50 backdrop-blur-sm border-border/50">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            // 欢迎界面
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h3 className="text-xl font-semibold mb-2">开始数据分析对话</h3>
                <p className="text-muted-foreground max-w-md">
                  询问任何关于您业务数据的问题，AI 将自动查询、分析并生成可视化图表
                </p>
              </motion.div>

              {/* 快捷问题 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3 justify-center max-w-2xl"
              >
                {quickQuestions.map((q, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="gap-2 bg-transparent hover:bg-foreground/5 transition-all duration-200 hover:scale-105"
                    onClick={() => setInput(q.text)}
                  >
                    <q.icon className={`w-4 h-4 ${q.color}`} />
                    {q.text}
                  </Button>
                ))}
              </motion.div>

              {/* 功能提示 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 grid grid-cols-3 gap-4 max-w-2xl text-xs text-muted-foreground"
              >
                <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background/50">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span>🔍</span>
                  </div>
                  <span className="text-center">智能查询</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background/50">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span>📊</span>
                  </div>
                  <span className="text-center">数据可视化</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background/50">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span>💡</span>
                  </div>
                  <span className="text-center">洞察分析</span>
                </div>
              </motion.div>
            </div>
          ) : (
            // 消息列表
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.parts.map((part, partIndex) => {
                      if (part.type === "text") {
                        return (
                          <div key={partIndex} className="whitespace-pre-wrap leading-relaxed">
                            {part.text}
                          </div>
                        )
                      }

                      if (part.type.startsWith("tool-")) {
                        // 数据库查询结果
                        if (part.type === "tool-queryDatabase" && part.state === "output-available") {
                          const output = part.output as any

                          return (
                            <div key={partIndex} className="mt-3 space-y-2">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                数据查询完成
                              </div>

                              {output.data && output.data.length > 0 ? (
                                <>
                                  <DataChart
                                    data={output.data}
                                    type={output.type === "sales" ? "line" : output.type === "users" ? "bar" : "line"}
                                    title={`${output.type === "sales" ? "销售" : output.type === "users" ? "用户" : "收入"}数据趋势`}
                                  />

                                  {output.summary && (
                                    <div className="mt-2 p-3 bg-background/50 rounded-lg text-xs space-y-1">
                                      <div className="font-semibold text-foreground/90 mb-1">数据摘要</div>
                                      {Object.entries(output.summary).map(([key, value]) => (
                                        <div key={key} className="flex justify-between">
                                          <span className="text-muted-foreground">{key}:</span>
                                          <span className="font-medium">{String(value)}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="p-3 bg-background/50 rounded-lg text-xs text-muted-foreground text-center">
                                  {output.message || "暂无相关数据"}
                                </div>
                              )}
                            </div>
                          )
                        }

                        // 图表生成结果
                        if (part.type === "tool-generateChart" && part.state === "output-available") {
                          return (
                            <div key={partIndex} className="mt-2 p-3 bg-background/50 rounded-lg text-xs">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                图表配置已生成
                              </div>
                            </div>
                          )
                        }

                        // 错误状态
                        if (part.state === "output-error") {
                          return (
                            <div key={partIndex} className="mt-2 p-3 bg-destructive/10 rounded-lg text-xs">
                              <div className="flex items-center gap-2 text-destructive">
                                <AlertCircle className="w-3 h-3" />
                                工具调用失败，请重试
                              </div>
                            </div>
                          )
                        }

                        // 处理中状态
                        if (part.state === "input-available") {
                          return (
                            <div key={partIndex} className="mt-2 p-3 bg-background/50 rounded-lg text-xs">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                {part.type === "tool-queryDatabase" && "正在查询数据..."}
                                {part.type === "tool-generateChart" && "正在生成图表..."}
                              </div>
                            </div>
                          )
                        }
                      }

                      return null
                    })}
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">👤</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {/* 加载指示器 */}
          {status === "in_progress" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </div>
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* 输入区域 */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="询问您的数据问题，例如：显示本月销售额趋势..."
              className="w-full px-4 py-3 pr-12 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={status === "in_progress"}
              maxLength={500}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {input.length}/500
            </div>
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={!input.trim() || status === "in_progress"}
            className="px-6 transition-all hover:scale-105"
          >
            {status === "in_progress" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">AI 分析结果仅供参考，实际数据以系统记录为准</p>
      </form>
    </div>
  )
}

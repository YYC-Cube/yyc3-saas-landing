/**
 * @file AI客户支持路由
 * @description 处理AI驱动的客户支持请求
 * @module api/ai/customer-support
 * @author YYC³
 * @version 1.0.0
 * @created 2025-01-30
 * @updated 2025-01-30
 * @copyright Copyright (c) 2025 YYC³
 * @license MIT
 */

import { streamText } from "ai"
import { z } from "zod"
import { searchKnowledgeBase } from "@/lib/knowledge-base"

export const maxDuration = 30

// 模拟用户上下文数据（实际应用中从数据库获取）
function getUserContext(userId: string) {
  return {
    id: userId,
    name: "演示用户",
    email: "demo@example.com",
    subscription: {
      plan: "professional",
      status: "active",
      startDate: "2024-01-01",
      features: ["智能数据分析", "AI 协作助手", "优先客服支持"],
    },
    tickets: {
      total: 3,
      open: 1,
      resolved: 2,
    },
    lastLogin: "2024-12-25",
  }
}

// 模拟工单创建（实际应用中应写入数据库）
async function createSupportTicket(params: { userId: string; title: string; description: string; priority: string }) {
  const ticketId = `TKT-${Date.now()}`

  console.log("[v0] 创建工单:", {
    id: ticketId,
    ...params,
    status: "open",
    createdAt: new Date().toISOString(),
  })

  return {
    id: ticketId,
    ...params,
    status: "open",
    createdAt: new Date().toISOString(),
    message: "工单已创建，我们的客服团队会在 2 小时内响应。",
  }
}

export async function POST(req: Request) {
  try {
    const { messages, userId } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "无效的消息格式" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      })
    }

    // 获取用户上下文
    const userContext = getUserContext(userId || "demo-user-001")

    // 获取最后一条用户消息用于知识库检索
    const lastUserMessage = messages.filter((m: any) => m.role === "user").pop()
    const relevantDocs = lastUserMessage ? searchKnowledgeBase(lastUserMessage.content, 3) : []

    const result = streamText({
      model: "openai/gpt-4o-mini",
      system: `你是 YYC³ 的 AI 智能客服助手。你的任务是帮助用户解决问题，提供专业、友好的服务。

用户信息：
- 姓名：${userContext.name}
- 订阅方案：${userContext.subscription.plan}（${userContext.subscription.status === "active" ? "活跃" : "已过期"}）
- 可用功能：${userContext.subscription.features.join("、")}
- 历史工单：共 ${userContext.tickets.total} 个，${userContext.tickets.open} 个待处理

相关知识库文档：
${relevantDocs.map((doc) => `【${doc.category}】${doc.title}\n${doc.content.slice(0, 300)}...`).join("\n\n")}

回答指南：
1. 优先使用知识库中的信息回答问题
2. 如果知识库中没有相关信息，基于你的知识提供帮助
3. 对于复杂问题或需要人工处理的情况，建议用户创建工单
4. 保持友好、专业的语气
5. 回答要简洁明了，必要时使用列表或步骤说明
6. 如果用户询问账户相关信息，使用上面提供的用户信息

注意：如果无法解决问题，主动建议创建工单或联系人工客服。`,
      messages,

    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[v0] 客服 API 错误:", error)
    return new Response(JSON.stringify({ error: "服务暂时不可用，请稍后重试" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}

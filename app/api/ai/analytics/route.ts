import { streamText, convertToModelMessages, tool, type UIMessage } from "ai"
import { z } from "zod"

export const maxDuration = 30

async function executeQuery(query: string, timeRange: string) {
  // 模拟数据库查询延迟
  await new Promise((resolve) => setTimeout(resolve, 800))

  // 根据查询类型返回模拟数据
  if (query.includes("销售") || query.includes("sales")) {
    return {
      type: "sales",
      data: [
        { month: "1月", value: 45000, growth: 12 },
        { month: "2月", value: 52000, growth: 15.6 },
        { month: "3月", value: 48000, growth: -7.7 },
        { month: "4月", value: 61000, growth: 27.1 },
        { month: "5月", value: 58000, growth: -4.9 },
        { month: "6月", value: 67000, growth: 15.5 },
      ],
      summary: {
        total: 331000,
        average: 55167,
        trend: "upward",
      },
    }
  }

  if (query.includes("用户") || query.includes("user")) {
    return {
      type: "users",
      data: [
        { month: "1月", registered: 1200, active: 890, retention: 74.2 },
        { month: "2月", registered: 1450, active: 1120, retention: 77.2 },
        { month: "3月", registered: 1680, active: 1340, retention: 79.8 },
        { month: "4月", registered: 1920, active: 1580, retention: 82.3 },
        { month: "5月", registered: 2100, active: 1750, retention: 83.3 },
        { month: "6月", registered: 2380, active: 2010, retention: 84.5 },
      ],
      summary: {
        totalUsers: 10730,
        activeRate: 81.2,
        growthRate: 98.3,
      },
    }
  }

  if (query.includes("收入") || query.includes("revenue")) {
    return {
      type: "revenue",
      data: [
        { month: "1月", subscription: 28000, transaction: 17000 },
        { month: "2月", subscription: 32000, transaction: 20000 },
        { month: "3月", subscription: 35000, transaction: 13000 },
        { month: "4月", subscription: 38000, transaction: 23000 },
        { month: "5月", subscription: 42000, transaction: 16000 },
        { month: "6月", subscription: 45000, transaction: 22000 },
      ],
      summary: {
        totalRevenue: 331000,
        subscriptionRatio: 66.2,
        mrr: 45000,
      },
    }
  }

  return {
    type: "general",
    data: [],
    message: "未找到相关数据",
  }
}

function generateChartConfig(data: any[], chartType: "line" | "bar" | "pie") {
  return {
    type: chartType,
    data,
    config: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 750,
        easing: "easeInOutQuart",
      },
    },
    recommendation: `建议使用${chartType === "line" ? "折线图" : chartType === "bar" ? "柱状图" : "饼图"}来展示此数据`,
  }
}

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json()

    const prompt = convertToModelMessages(messages)

    const result = streamText({
      model: "openai/gpt-4.1",
      messages: prompt,
      system: `你是 YYC³ 平台的智能数据分析助手。你的任务是帮助用户理解和分析业务数据。

核心能力：
1. 理解用户的自然语言查询意图
2. 使用 queryDatabase 工具查询数据
3. 使用 generateChart 工具生成可视化建议
4. 分析数据并提供专业洞察

工作流程：
1. 当用户询问数据时，先调用 queryDatabase 获取数据
2. 获取数据后，调用 generateChart 生成图表建议
3. 最后用自然语言解释数据趋势和洞察

回答风格：
- 简洁专业，数据驱动
- 提供具体数字和百分比
- 指出关键趋势和异常点
- 主动建议深入分析方向
- 使用中文回答

当前可用数据：
- 销售数据：月度销售额、增长率
- 用户数据：注册用户、活跃用户、留存率
- 收入数据：订阅收入、交易收入、MRR
`,
      temperature: 0.7,
      maxOutputTokens: 2000,
      abortSignal: req.signal,
      tools: {
        queryDatabase: tool({
          description: "查询数据库获取业务数据。支持查询销售、用户、收入等数据。",
          inputSchema: z.object({
            query: z.string().describe("查询描述，例如：销售数据、用户增长、收入情况"),
            timeRange: z.string().describe("时间范围，例如：本月、本季度、今年"),
          }),
          execute: async ({ query, timeRange }) => {
            console.log(`[v0] 执行数据库查询: ${query}, 时间范围: ${timeRange}`)
            const result = await executeQuery(query, timeRange)
            return result
          },
        }),
        generateChart: tool({
          description: "根据数据生成可视化图表配置和建议",
          inputSchema: z.object({
            data: z
              .array(
                z
                  .object({
                    month: z.string().optional(),
                    value: z.number().optional(),
                    registered: z.number().optional(),
                    active: z.number().optional(),
                    subscription: z.number().optional(),
                    transaction: z.number().optional(),
                  })
                  .passthrough(),
              )
              .describe("要可视化的数据数组"),
            chartType: z.enum(["line", "bar", "pie"]).describe("图表类型：line(折线图)、bar(柱状图)、pie(饼图)"),
          }),
          execute: async ({ data, chartType }) => {
            console.log(`[v0] 生成图表配置: ${chartType}, 数据点数: ${data.length}`)
            const config = generateChartConfig(data, chartType)
            return config
          },
        }),
      },
    })

    return result.toUIMessageStreamResponse({
      onFinish: async ({ isAborted, usage }) => {
        if (isAborted) {
          console.log("[v0] AI Analytics request aborted")
        } else {
          console.log("[v0] AI Analytics completed, tokens used:", usage)
        }
      },
    })
  } catch (error) {
    console.error("[v0] AI Analytics error:", error)
    return new Response(JSON.stringify({ error: "分析请求失败，请稍后重试" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

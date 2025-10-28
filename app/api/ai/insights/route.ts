import { type NextRequest, NextResponse } from "next/server"
import { customerInsightsEngine } from "@/lib/ai/customer-insights"

export async function POST(req: NextRequest) {
  try {
    const { customerId, analysisType, data } = await req.json()

    let result

    switch (analysisType) {
      case "insights":
        result = await customerInsightsEngine.generateInsights(customerId, data)
        break
      case "rfm":
        result = await customerInsightsEngine.analyzeRFM(data)
        break
      case "persona":
        result = await customerInsightsEngine.generatePersona(customerId)
        break
      default:
        return NextResponse.json({ error: "不支持的分析类型" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      analysisType,
      result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Insights generation error:", error)
    return NextResponse.json({ error: "洞察生成失败" }, { status: 500 })
  }
}

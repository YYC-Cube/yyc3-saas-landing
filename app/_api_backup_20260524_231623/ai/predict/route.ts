/**
 * @file AI预测路由
 * @description 处理AI驱动的业务预测请求
 * @module api/ai/predict
 * @author YYC³
 * @version 1.0.0
 * @created 2025-01-30
 * @updated 2025-01-30
 * @copyright Copyright (c) 2025 YYC³
 * @license MIT
 */

import { type NextRequest, NextResponse } from "next/server"
import { predictionEngine } from "@/lib/ai/prediction-engine"

export const dynamic = "force-static"

export async function POST(req: NextRequest) {
  try {
    const { customerId, predictionType } = await req.json()

    if (!customerId || !predictionType) {
      return NextResponse.json({ error: "缺少必要参数" }, { status: 400 })
    }

    let result

    switch (predictionType) {
      case "churn":
        result = await predictionEngine.predictChurn(customerId)
        break
      case "conversion":
        result = await predictionEngine.predictConversion(customerId)
        break
      case "ltv":
        result = await predictionEngine.predictLTV(customerId)
        break
      case "needs":
        result = await predictionEngine.predictNeeds(customerId)
        break
      case "contact_time":
        result = await predictionEngine.predictBestContactTime(customerId)
        break
      default:
        return NextResponse.json({ error: "不支持的预测类型" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      customerId,
      predictionType,
      result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Prediction error:", error)
    return NextResponse.json({ error: "预测失败" }, { status: 500 })
  }
}

/**
 * @file 工作流报告路由
 * @description 处理工作流报告生成请求
 * @module api/workflow/report
 * @author YYC³
 * @version 1.0.0
 * @created 2025-01-30
 * @updated 2025-01-30
 * @copyright Copyright (c) 2025 YYC³
 * @license MIT
 */

import { type NextRequest, NextResponse } from "next/server"
import { generateOptimizationReport } from "@/lib/ai/workflow-optimizer"

export const dynamic = "force-static"

export async function POST(req: NextRequest) {
  try {
    const { workflowId } = await req.json()

    if (!workflowId) {
      return NextResponse.json({ error: "workflowId is required" }, { status: 400 })
    }

    const report = await generateOptimizationReport(workflowId)

    return NextResponse.json({
      success: true,
      report,
    })
  } catch (error) {
    console.error("Report generation error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate report",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

/**
 * @file 工作流分析路由
 * @description 处理工作流分析请求
 * @module api/workflow/analyze
 * @author YYC³
 * @version 1.0.0
 * @created 2025-01-30
 * @updated 2025-01-30
 * @copyright Copyright (c) 2025 YYC³
 * @license MIT
 */

import { type NextRequest, NextResponse } from "next/server"
import { analyzeWorkflow } from "@/lib/ai/workflow-optimizer"

export async function POST(req: NextRequest) {
  try {
    const { workflowId } = await req.json()

    if (!workflowId) {
      return NextResponse.json({ error: "workflowId is required" }, { status: 400 })
    }

    const analysis = await analyzeWorkflow(workflowId)

    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error) {
    console.error("Workflow analysis error:", error)
    return NextResponse.json(
      {
        error: "Failed to analyze workflow",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

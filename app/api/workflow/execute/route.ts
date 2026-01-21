/**
 * @file 工作流执行路由
 * @description 处理工作流执行请求
 * @module api/workflow/execute
 * @author YYC³
 * @version 1.0.0
 * @created 2025-01-30
 * @updated 2025-01-30
 * @copyright Copyright (c) 2025 YYC³
 * @license MIT
 */

import { type NextRequest, NextResponse } from "next/server"
import { workflowEngine } from "@/lib/workflow-engine"

export async function POST(req: NextRequest) {
  try {
    const { workflowId, steps, context } = await req.json()

    if (!workflowId || !steps || !Array.isArray(steps)) {
      return NextResponse.json({ error: "Invalid request: workflowId and steps are required" }, { status: 400 })
    }

    // 执行工作流
    const execution = await workflowEngine.executeWorkflow(workflowId, steps, context || {})

    return NextResponse.json({
      success: true,
      execution: {
        id: execution.id,
        status: execution.status,
        startTime: execution.startTime,
        endTime: execution.endTime,
        steps: execution.steps,
      },
    })
  } catch (error) {
    console.error("Workflow execution error:", error)
    return NextResponse.json(
      {
        error: "Failed to execute workflow",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

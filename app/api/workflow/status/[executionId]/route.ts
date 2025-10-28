import { type NextRequest, NextResponse } from "next/server"
import { workflowEngine } from "@/lib/workflow-engine"

export async function GET(req: NextRequest, { params }: { params: { executionId: string } }) {
  try {
    const { executionId } = params

    const execution = workflowEngine.getExecution(executionId)

    if (!execution) {
      return NextResponse.json({ error: "Execution not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      execution: {
        id: execution.id,
        workflowId: execution.workflowId,
        status: execution.status,
        startTime: execution.startTime,
        endTime: execution.endTime,
        steps: execution.steps,
        context: execution.context,
      },
    })
  } catch (error) {
    console.error("Failed to get execution status:", error)
    return NextResponse.json(
      {
        error: "Failed to get execution status",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

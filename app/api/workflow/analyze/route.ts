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

import { type NextRequest, NextResponse } from "next/server"
import { generateOptimizationReport } from "@/lib/ai/workflow-optimizer"

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

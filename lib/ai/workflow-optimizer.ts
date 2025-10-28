// AI 工作流优化分析器
import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { workflowEngine, type WorkflowExecution } from "@/lib/workflow-engine"

// 瓶颈分析结果
const BottleneckSchema = z.object({
  step: z.string().describe("出现瓶颈的步骤名称"),
  issue: z.string().describe("具体问题描述"),
  impact: z.string().describe("对整体流程的影响"),
  severity: z.enum(["low", "medium", "high"]).describe("严重程度"),
})

// 优化建议
const OptimizationSchema = z.object({
  suggestion: z.string().describe("优化建议"),
  expectedImprovement: z.string().describe("预期改进效果"),
  implementation: z.string().describe("实施方法"),
  priority: z.enum(["low", "medium", "high"]).describe("优先级"),
})

// 自动化机会
const AutomationOpportunitySchema = z.object({
  task: z.string().describe("可自动化的任务"),
  automationMethod: z.string().describe("自动化方法"),
  timeSaved: z.string().describe("预计节省时间"),
  complexity: z.enum(["easy", "medium", "hard"]).describe("实施复杂度"),
})

// 完整分析结果
const WorkflowAnalysisSchema = z.object({
  summary: z.string().describe("整体分析总结"),
  bottlenecks: z.array(BottleneckSchema).describe("识别的瓶颈"),
  optimizations: z.array(OptimizationSchema).describe("优化建议"),
  automationOpportunities: z.array(AutomationOpportunitySchema).describe("自动化机会"),
  performanceScore: z.number().min(0).max(100).describe("性能评分"),
  recommendations: z.array(z.string()).describe("关键建议"),
})

export type WorkflowAnalysis = z.infer<typeof WorkflowAnalysisSchema>

/**
 * 分析工作流并提供优化建议
 */
export async function analyzeWorkflow(workflowId: string): Promise<WorkflowAnalysis> {
  // 获取工作流执行历史
  const history = await getWorkflowHistory(workflowId)

  if (history.length === 0) {
    throw new Error("No execution history found for this workflow")
  }

  // 计算统计数据
  const stats = calculateWorkflowStats(history)

  // 使用 AI 分析瓶颈和优化机会
  const { object } = await generateObject({
    model: openai("gpt-4"),
    schema: WorkflowAnalysisSchema,
    prompt: `
      你是一个工作流优化专家。请分析以下工作流的执行历史，识别瓶颈并提供优化建议。

      工作流 ID: ${workflowId}
      
      执行统计:
      - 总执行次数: ${stats.totalExecutions}
      - 成功率: ${stats.successRate.toFixed(2)}%
      - 平均执行时间: ${stats.avgDuration.toFixed(2)}秒
      - 最慢步骤: ${stats.slowestStep.name} (平均 ${stats.slowestStep.avgDuration.toFixed(2)}秒)
      - 失败最多的步骤: ${stats.mostFailedStep.name} (失败率 ${stats.mostFailedStep.failureRate.toFixed(2)}%)
      
      最近 10 次执行详情:
      ${JSON.stringify(history.slice(0, 10), null, 2)}
      
      请提供：
      1. 整体分析总结
      2. 识别的瓶颈（包括步骤、问题、影响和严重程度）
      3. 具体优化建议（包括建议、预期改进、实施方法和优先级）
      4. 自动化机会（包括任务、方法、节省时间和复杂度）
      5. 性能评分（0-100）
      6. 3-5 条关键建议
      
      请基于数据提供实用、可操作的建议。
    `,
  })

  return object
}

/**
 * 获取工作流执行历史
 */
async function getWorkflowHistory(workflowId: string): Promise<WorkflowExecution[]> {
  // 从执行引擎获取历史记录
  const allExecutions = workflowEngine.getAllExecutions()
  return allExecutions
    .filter((exec) => exec.workflowId === workflowId)
    .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
}

/**
 * 计算工作流统计数据
 */
function calculateWorkflowStats(history: WorkflowExecution[]) {
  const totalExecutions = history.length
  const successfulExecutions = history.filter((exec) => exec.status === "completed").length
  const successRate = (successfulExecutions / totalExecutions) * 100

  // 计算平均执行时间
  const durations = history
    .filter((exec) => exec.endTime)
    .map((exec) => (exec.endTime!.getTime() - exec.startTime.getTime()) / 1000)
  const avgDuration = durations.reduce((sum, d) => sum + d, 0) / durations.length

  // 找出最慢的步骤
  const stepDurations = new Map<string, number[]>()
  history.forEach((exec) => {
    exec.steps.forEach((step) => {
      if (step.startTime && step.endTime) {
        const duration = (step.endTime.getTime() - step.startTime.getTime()) / 1000
        if (!stepDurations.has(step.stepId)) {
          stepDurations.set(step.stepId, [])
        }
        stepDurations.get(step.stepId)!.push(duration)
      }
    })
  })

  let slowestStep = { name: "N/A", avgDuration: 0 }
  stepDurations.forEach((durations, stepId) => {
    const avg = durations.reduce((sum, d) => sum + d, 0) / durations.length
    if (avg > slowestStep.avgDuration) {
      slowestStep = { name: stepId, avgDuration: avg }
    }
  })

  // 找出失败最多的步骤
  const stepFailures = new Map<string, { total: number; failed: number }>()
  history.forEach((exec) => {
    exec.steps.forEach((step) => {
      if (!stepFailures.has(step.stepId)) {
        stepFailures.set(step.stepId, { total: 0, failed: 0 })
      }
      const stats = stepFailures.get(step.stepId)!
      stats.total++
      if (step.status === "failed") {
        stats.failed++
      }
    })
  })

  let mostFailedStep = { name: "N/A", failureRate: 0 }
  stepFailures.forEach((stats, stepId) => {
    const failureRate = (stats.failed / stats.total) * 100
    if (failureRate > mostFailedStep.failureRate) {
      mostFailedStep = { name: stepId, failureRate }
    }
  })

  return {
    totalExecutions,
    successRate,
    avgDuration,
    slowestStep,
    mostFailedStep,
  }
}

/**
 * 生成优化报告
 */
export async function generateOptimizationReport(workflowId: string): Promise<string> {
  const analysis = await analyzeWorkflow(workflowId)

  const report = `
# 工作流优化报告

## 工作流 ID: ${workflowId}

## 整体评估
${analysis.summary}

**性能评分**: ${analysis.performanceScore}/100

## 识别的瓶颈

${analysis.bottlenecks
  .map(
    (b, i) => `
### ${i + 1}. ${b.step}
- **问题**: ${b.issue}
- **影响**: ${b.impact}
- **严重程度**: ${b.severity === "high" ? "高" : b.severity === "medium" ? "中" : "低"}
`,
  )
  .join("\n")}

## 优化建议

${analysis.optimizations
  .map(
    (o, i) => `
### ${i + 1}. ${o.suggestion}
- **预期改进**: ${o.expectedImprovement}
- **实施方法**: ${o.implementation}
- **优先级**: ${o.priority === "high" ? "高" : o.priority === "medium" ? "中" : "低"}
`,
  )
  .join("\n")}

## 自动化机会

${analysis.automationOpportunities
  .map(
    (a, i) => `
### ${i + 1}. ${a.task}
- **自动化方法**: ${a.automationMethod}
- **预计节省时间**: ${a.timeSaved}
- **实施复杂度**: ${a.complexity === "easy" ? "简单" : a.complexity === "medium" ? "中等" : "复杂"}
`,
  )
  .join("\n")}

## 关键建议

${analysis.recommendations.map((r, i) => `${i + 1}. ${r}`).join("\n")}

---
*报告生成时间: ${new Date().toLocaleString("zh-CN")}*
  `.trim()

  return report
}

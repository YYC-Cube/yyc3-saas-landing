// 工作流执行引擎
import { generateText, generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

export interface WorkflowStep {
  id: string
  type: "trigger" | "action" | "condition" | "ai"
  name: string
  config: Record<string, any>
}

export interface WorkflowExecution {
  id: string
  workflowId: string
  status: "running" | "completed" | "failed" | "paused"
  startTime: Date
  endTime?: Date
  steps: StepExecution[]
  context: Record<string, any>
}

export interface StepExecution {
  stepId: string
  status: "pending" | "running" | "completed" | "failed" | "skipped"
  startTime?: Date
  endTime?: Date
  input?: any
  output?: any
  error?: string
}

export class WorkflowEngine {
  private executions: Map<string, WorkflowExecution> = new Map()

  /**
   * 执行工作流
   */
  async executeWorkflow(
    workflowId: string,
    steps: WorkflowStep[],
    initialContext: Record<string, any> = {},
  ): Promise<WorkflowExecution> {
    const executionId = `exec-${Date.now()}`
    const execution: WorkflowExecution = {
      id: executionId,
      workflowId,
      status: "running",
      startTime: new Date(),
      steps: steps.map((step) => ({
        stepId: step.id,
        status: "pending",
      })),
      context: { ...initialContext },
    }

    this.executions.set(executionId, execution)

    try {
      // 按顺序执行每个步骤
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i]
        const stepExecution = execution.steps[i]

        stepExecution.status = "running"
        stepExecution.startTime = new Date()

        try {
          const result = await this.executeStep(step, execution.context)

          stepExecution.status = "completed"
          stepExecution.endTime = new Date()
          stepExecution.output = result

          // 更新执行上下文
          execution.context[`step_${step.id}_output`] = result
        } catch (error) {
          stepExecution.status = "failed"
          stepExecution.endTime = new Date()
          stepExecution.error = error instanceof Error ? error.message : String(error)

          // 步骤失败，终止工作流
          execution.status = "failed"
          execution.endTime = new Date()
          throw error
        }
      }

      // 所有步骤成功完成
      execution.status = "completed"
      execution.endTime = new Date()
    } catch (error) {
      console.error("Workflow execution failed:", error)
    }

    return execution
  }

  /**
   * 执行单个步骤
   */
  private async executeStep(step: WorkflowStep, context: Record<string, any>): Promise<any> {
    switch (step.type) {
      case "trigger":
        return this.executeTrigger(step, context)
      case "action":
        return this.executeAction(step, context)
      case "condition":
        return this.executeCondition(step, context)
      case "ai":
        return this.executeAI(step, context)
      default:
        throw new Error(`Unknown step type: ${step.type}`)
    }
  }

  /**
   * 执行触发器
   */
  private async executeTrigger(step: WorkflowStep, context: Record<string, any>): Promise<any> {
    // 触发器通常在工作流开始时已经触发，这里只是记录
    return {
      triggered: true,
      timestamp: new Date().toISOString(),
      data: context.triggerData || {},
    }
  }

  /**
   * 执行操作
   */
  private async executeAction(step: WorkflowStep, context: Record<string, any>): Promise<any> {
    const { name, config } = step

    if (name.includes("数据库")) {
      // 模拟数据库操作
      return {
        action: "database",
        operation: config.operation || "query",
        affected: Math.floor(Math.random() * 100),
      }
    }

    if (name.includes("邮件")) {
      // 模拟发送邮件
      return {
        action: "email",
        to: config.to || "user@example.com",
        subject: config.subject || "通知",
        sent: true,
      }
    }

    // 默认操作
    return {
      action: "generic",
      config,
      executed: true,
    }
  }

  /**
   * 执行条件判断
   */
  private async executeCondition(step: WorkflowStep, context: Record<string, any>): Promise<any> {
    const { config } = step
    const { condition, trueValue, falseValue } = config

    // 简单的条件评估（实际应用中需要更复杂的表达式解析）
    const result = this.evaluateCondition(condition, context)

    return {
      condition,
      result,
      value: result ? trueValue : falseValue,
    }
  }

  /**
   * 执行 AI 处理
   */
  private async executeAI(step: WorkflowStep, context: Record<string, any>): Promise<any> {
    const { config } = step
    const { prompt, inputData, outputSchema } = config

    try {
      // 构建 AI 提示词
      const fullPrompt = this.buildPrompt(prompt, inputData, context)

      if (outputSchema) {
        // 结构化输出
        const { object } = await generateObject({
          model: openai("gpt-4"),
          schema: z.object(outputSchema),
          prompt: fullPrompt,
        })

        return {
          type: "structured",
          data: object,
        }
      } else {
        // 文本输出
        const { text } = await generateText({
          model: openai("gpt-4"),
          prompt: fullPrompt,
        })

        return {
          type: "text",
          data: text,
        }
      }
    } catch (error) {
      console.error("AI step execution failed:", error)
      throw error
    }
  }

  /**
   * 评估条件
   */
  private evaluateCondition(condition: string, context: Record<string, any>): boolean {
    // 简单的条件评估实现
    // 实际应用中应该使用更安全的表达式解析器
    try {
      // 替换上下文变量
      let evaluatedCondition = condition
      Object.keys(context).forEach((key) => {
        evaluatedCondition = evaluatedCondition.replace(new RegExp(`\\$${key}`, "g"), JSON.stringify(context[key]))
      })

      // 评估条件（注意：这里使用 eval 仅用于演示，生产环境应使用安全的表达式解析器）
      return Boolean(eval(evaluatedCondition))
    } catch (error) {
      console.error("Condition evaluation failed:", error)
      return false
    }
  }

  /**
   * 构建 AI 提示词
   */
  private buildPrompt(template: string, inputData: any, context: Record<string, any>): string {
    let prompt = template

    // 替换输入数据
    if (inputData) {
      prompt = prompt.replace("{{input}}", JSON.stringify(inputData))
    }

    // 替换上下文变量
    Object.keys(context).forEach((key) => {
      prompt = prompt.replace(new RegExp(`{{${key}}}`, "g"), JSON.stringify(context[key]))
    })

    return prompt
  }

  /**
   * 获取执行状态
   */
  getExecution(executionId: string): WorkflowExecution | undefined {
    return this.executions.get(executionId)
  }

  /**
   * 获取所有执行记录
   */
  getAllExecutions(): WorkflowExecution[] {
    return Array.from(this.executions.values())
  }

  /**
   * 暂停工作流
   */
  pauseExecution(executionId: string): void {
    const execution = this.executions.get(executionId)
    if (execution && execution.status === "running") {
      execution.status = "paused"
    }
  }

  /**
   * 恢复工作流
   */
  resumeExecution(executionId: string): void {
    const execution = this.executions.get(executionId)
    if (execution && execution.status === "paused") {
      execution.status = "running"
      // 这里应该继续执行剩余步骤
    }
  }
}

// 导出单例实例
export const workflowEngine = new WorkflowEngine()

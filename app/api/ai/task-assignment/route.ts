import { generateObject } from "ai"
import { z } from "zod"
import { NextResponse } from "next/server"

// 任务分配结果结构
const taskAssignmentSchema = z.object({
  assignedTo: z.string().describe("推荐的负责人姓名"),
  reasoning: z.string().describe("推荐理由，说明为什么这个人最适合"),
  confidence: z.number().min(0).max(1).describe("推荐置信度，0-1之间"),
  alternativeAssignees: z
    .array(
      z.object({
        name: z.string(),
        reason: z.string(),
      }),
    )
    .optional()
    .describe("备选负责人列表"),
})

export async function POST(req: Request) {
  try {
    const { task, teamMembers } = await req.json()

    // 验证输入
    if (!task || !teamMembers || teamMembers.length === 0) {
      return NextResponse.json({ error: "缺少必要参数" }, { status: 400 })
    }

    // 使用 AI 分析并推荐最佳任务分配
    const { object: assignment } = await generateObject({
      model: "openai/gpt-4o-mini",
      schema: taskAssignmentSchema,
      prompt: `
        你是一个专业的项目管理 AI 助手，需要为以下任务推荐最合适的团队成员。
        
        任务信息:
        - 标题: ${task.title}
        - 描述: ${task.description || "无"}
        - 所需技能: ${task.requiredSkills.join(", ") || "无特定要求"}
        - 优先级: ${task.priority}
        - 预计工时: ${task.estimatedHours} 小时
        
        团队成员信息:
        ${teamMembers
          .map(
            (member: any) => `
          - ${member.name}
            * 技能: ${member.skills.join(", ")}
            * 当前工作负载: ${member.currentWorkload}%
            * 可用性: ${member.availability}%
        `,
          )
          .join("\n")}
        
        请综合考虑以下因素进行推荐:
        1. 技能匹配度: 成员的技能是否符合任务需求
        2. 工作负载: 优先选择工作负载较低的成员
        3. 可用性: 成员的可用时间是否充足
        4. 任务优先级: 高优先级任务应分配给经验丰富的成员
        
        请给出最佳推荐，并说明理由。置信度应该基于匹配程度（1.0 表示完美匹配）。
      `,
    })

    return NextResponse.json(assignment)
  } catch (error) {
    console.error("[v0] Task assignment error:", error)
    return NextResponse.json({ error: "任务分配失败，请稍后重试" }, { status: 500 })
  }
}

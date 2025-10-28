import { generateObject } from "ai"
import { z } from "zod"
import { NextResponse } from "next/server"

// 会议纪要结构定义
const meetingNotesSchema = z.object({
  topic: z.string().describe("会议主题"),
  keyPoints: z.array(z.string()).describe("关键讨论点列表"),
  decisions: z.array(z.string()).describe("决策事项列表"),
  actionItems: z
    .array(
      z.object({
        task: z.string().describe("任务描述"),
        assignee: z.string().describe("负责人"),
        deadline: z.string().describe("截止日期"),
      }),
    )
    .describe("待办任务列表"),
  nextMeeting: z.string().optional().describe("下次会议安排"),
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const inputMethod = formData.get("inputMethod") as string
    const participants = formData.get("participants") as string

    let meetingContent = ""

    // 处理文字输入
    if (inputMethod === "text") {
      meetingContent = formData.get("content") as string

      if (!meetingContent || meetingContent.trim().length === 0) {
        return NextResponse.json({ error: "会议内容不能为空" }, { status: 400 })
      }
    }
    // 处理音频输入
    else if (inputMethod === "audio") {
      const audioFile = formData.get("audio") as File

      if (!audioFile) {
        return NextResponse.json({ error: "请上传音频文件" }, { status: 400 })
      }

      // 模拟语音转文字（实际应用中可以使用 OpenAI Whisper API）
      // 这里为了演示，我们使用模拟数据
      meetingContent = `
        会议开始，大家好。今天我们主要讨论三个议题：
        
        第一，关于新产品的功能规划。张三提出应该优先开发用户最需要的核心功能，
        李四补充说需要考虑技术可行性。经过讨论，我们决定先实现数据分析和报表功能。
        
        第二，关于项目进度。王五汇报说前端开发已经完成70%，预计下周可以进入测试阶段。
        我们决定安排赵六负责测试工作，截止日期是下周五。
        
        第三，关于市场推广。孙七建议在社交媒体上加大宣传力度，
        我们决定由周八负责制定详细的推广方案，本月底前提交。
        
        下次会议定在下周三下午3点，继续跟进这些事项的进展。
      `
    }

    // 使用 AI 生成结构化会议纪要
    const { object: notes } = await generateObject({
      model: "openai/gpt-4o-mini",
      schema: meetingNotesSchema,
      prompt: `
        请根据以下会议内容生成结构化的会议纪要：
        
        ${participants ? `参会人员: ${participants}` : ""}
        
        会议内容:
        ${meetingContent}
        
        要求:
        1. 提取会议主题
        2. 总结3-5个关键讨论点
        3. 列出所有决策事项
        4. 识别所有待办任务，包括负责人和截止日期
        5. 如果提到下次会议安排，请记录
        
        请确保信息准确、结构清晰。
      `,
    })

    return NextResponse.json({ notes })
  } catch (error) {
    console.error("[v0] Meeting notes generation error:", error)
    return NextResponse.json({ error: "生成会议纪要失败，请稍后重试" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { z } from "zod"

export async function POST(req: NextRequest) {
  try {
    const { industry, scenario, name } = await req.json()

    // 使用 AI 生成表单配置
    const { object } = await generateObject({
      model: "openai/gpt-4o-mini",
      schema: z.object({
        name: z.string(),
        description: z.string(),
        fields: z.array(
          z.object({
            id: z.string(),
            type: z.enum(["text", "number", "date", "phone", "email", "select", "checkbox", "radio", "textarea"]),
            label: z.string(),
            placeholder: z.string(),
            required: z.boolean(),
            aiSuggested: z.boolean(),
            validationRules: z.array(z.string()).optional(),
            options: z.array(z.string()).optional(),
          }),
        ),
        aiConfig: z.object({
          autoComplete: z.boolean(),
          validation: z.boolean(),
          scoring: z.boolean(),
        }),
      }),
      prompt: `作为一个智能表单生成专家，请为${industry}行业的${scenario}场景生成一个名为"${name}"的表单配置。

要求：
1. 根据行业特点和场景需求，推荐必要的字段
2. 字段类型要合理（文本、数字、日期、手机、邮箱、下拉、多选、单选、文本域）
3. 标记哪些字段是 AI 推荐的必填字段
4. 为每个字段提供合适的占位符文本
5. 添加必要的验证规则
6. 启用 AI 自动补全、智能验证和客户评分功能

请生成一个完整的表单配置。`,
    })

    return NextResponse.json(object)
  } catch (error) {
    console.error("[v0] Form generation error:", error)
    return NextResponse.json({ error: "表单生成失败" }, { status: 500 })
  }
}
